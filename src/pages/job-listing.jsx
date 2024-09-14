import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded } = useUser();
  /////////////////
  // JOB LOGIC
  ////////////////
  // import Job data with costum hook
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  // fetch job data if loaded + re-render when search values update
  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  /////////////////////
  // COMPANIES LOGIC
  ////////////////////
  // import Companies data with costum hook
  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);
  // fetch companies data if loaded
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  // search function
  const handleSearch = () => {};

  ///////////////////
  // SPINNER
  // if page not loaded show spinner
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      {/* TITLE */}
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      {/* SEARCH FILTERS */}
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button variant="blue" type="submit" className="h-full md:w-28">
          Search
        </Button>
      </form>

      {/* SPINNER */}
      {/* if jobs are loading show spinner */}
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {/* JOBS */}
      {/* if jobs are loaded */}
      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😥</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
