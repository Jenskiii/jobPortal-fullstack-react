import supabaseClient from "@/utils/supabase";
////////////////////
// FETCH JOBS
///////////////////
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  // SEARCH QUERY
  let query = supabase
    .from("jobs")
    // selects all jobs
    // gets the name, logo of the company
    // and fetches all saved jobs
    .select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

  // SEARCH FILTERS
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  // returns only the titles that match searchQuery
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  // if error throw console.log
  if (error) {
    console.log("Error fetching jobs:", error);
    return null;
  }

  // else return data
  return data;
}

////////////////////
// SAVE JOB
///////////////////
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  // if already saved, delete job
  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    // if error throw console.log
    if (deleteError) {
      console.log("Error deleting saved job:", deleteError);
      return null;
    }

    return data;
  }

  // insert saved job
  else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert(saveData)
      .select();

    // if error throw console.log
    if (insertError) {
      console.log("Error fetching jobs:", insertError);
      return null;
    }

    return data;
  }
}
