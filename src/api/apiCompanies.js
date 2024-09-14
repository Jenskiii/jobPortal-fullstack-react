import supabaseClient from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  // fetch all companies
  const { data, error } = await supabase.from("companies").select("*");

  // if error throw console.log
  if (error) {
    console.log("Error Fetching Companies:", error);
    return null;
  }

  return data;
}
