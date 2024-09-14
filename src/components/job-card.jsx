import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  // useStates
  const [saved, setSaved] = useState(savedInit);

  // import data from costum hook
  const {
    fn: fnSavedJob,
    data: savedJob,
    loading: loadingSavedJob,
  } = useFetch(saveJob, { alreadySaved: saved });

  // import user data from clerk
  const { user } = useUser();

  const handleSavedJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  // toggles saved job based if savedJob is empty or not
  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {!isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {/* LOGO */}
          {job.company && (
            <img
              className="h-6"
              src={job.company.logo_url}
              alt={`logo of the company called ${job.company.name}`}
            />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {/* if recruiter its own job */}

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSavedJob}
            disabled={loadingSavedJob}>
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} stroke="red" />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
