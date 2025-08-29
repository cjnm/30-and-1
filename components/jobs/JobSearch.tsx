"use client";

import { useState } from "react";
import { Job } from "@/lib/types/job";

export function JobSearch({
  jobs,
  onSearch,
}: {
  jobs: Job[];
  onSearch: (filtered: Job[]) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value.toLowerCase()) ||
        job.company.toLowerCase().includes(value.toLowerCase()) ||
        (job.workplace_city?.toLowerCase() || "").includes(
          value.toLowerCase()
        ) ||
        (job.workplace_country?.toLowerCase() || "").includes(
          value.toLowerCase()
        )
    );

    onSearch(filtered);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={handleSearch}
        className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
