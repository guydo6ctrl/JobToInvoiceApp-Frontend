import React from "react";
import { useParams } from "react-router-dom";
import useJobs from "../../hooks/useJobs";

const JobsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: jobs, isLoading, error } = useJobs();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading job</p>;

  const job = jobs?.find((inv) => inv.id === Number(id));
  if (!job) return <p>JOb not found</p>;

  return (
    <div>
      <h2>Job #{job.number}</h2>
    </div>
  );
};

export default JobsDetailPage;
