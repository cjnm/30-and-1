import { useState, useEffect } from "react";
import type { Job } from "@/lib/types/job";

export interface JobsResponse {
  jobs: Job[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UseJobsOptions {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  type?: string;
  remote?: boolean;
}

export function useJobs(options: UseJobsOptions = {}) {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (options.page) params.append("page", options.page.toString());
        if (options.limit) params.append("limit", options.limit.toString());
        if (options.search) params.append("search", options.search);
        if (options.location) params.append("location", options.location);
        if (options.type) params.append("type", options.type);
        if (options.remote !== undefined)
          params.append("remote", options.remote.toString());

        const response = await fetch(`/api/jobs?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [
    options.page,
    options.limit,
    options.search,
    options.location,
    options.type,
    options.remote,
  ]);

  return { data, loading, error, refetch: () => setLoading(true) };
}

export function useJob(id: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/jobs/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch job");
        }

        const result = await response.json();
        setJob(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  return { job, loading, error };
}
