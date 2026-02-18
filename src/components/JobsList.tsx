import React from "react";
import useJobs from "../hooks/useJobs";

const JobsList = () => {
  const { data, isLoading, error } = useJobs();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;
  if (!data || data.length === 0) return <p>No jobs found</p>;

  return (
    <ul>
      {data.map((job) => (
        <li key={job.title}>{job.title}</li>
      ))}
    </ul>
  );
};

export default JobsList;
