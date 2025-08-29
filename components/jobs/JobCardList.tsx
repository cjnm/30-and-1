"use client";

import { Job } from "@/lib/types/job";
import { JobCard } from "@/components/jobs/JobCard";

export function JobCardList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
