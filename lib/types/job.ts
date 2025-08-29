export type CareerLevel =
  | "Internship"
  | "EntryLevel"
  | "Associate"
  | "Junior"
  | "MidLevel"
  | "Senior"
  | "Staff"
  | "Principal"
  | "Lead"
  | "Manager"
  | "SeniorManager"
  | "Director"
  | "SeniorDirector"
  | "VP"
  | "SVP"
  | "EVP"
  | "CLevel"
  | "Founder"
  | "NotSpecified";

export type JobType = "full-time" | "part-time" | "contract" | "internship";

export interface Salary {
  min?: number;
  max?: number;
  currency?: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: Salary;
  type: JobType;
  remote: boolean;
  tags: string[];
  applicationUrl?: string;
  applicationEmail?: string;
  postedAt: string;
  expiresAt?: string;
  isActive: boolean;
  featured: boolean;
}

// Utility function to format salary
export function formatSalary(salary?: Salary): string {
  if (!salary || (!salary.min && !salary.max)) {
    return "Salary not specified";
  }

  const currency = salary.currency || "USD";
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (salary.min && salary.max) {
    return `${formatAmount(salary.min)} - ${formatAmount(salary.max)}`;
  } else if (salary.min) {
    return `From ${formatAmount(salary.min)}`;
  } else if (salary.max) {
    return `Up to ${formatAmount(salary.max)}`;
  }

  return "Salary not specified";
}

// Utility function to normalize annual salary for comparison
export function normalizeAnnualSalary(salary?: Salary): number | null {
  if (!salary || (!salary.min && !salary.max)) {
    return null;
  }

  // Use the minimum salary if available, otherwise use maximum
  const amount = salary.min || salary.max || 0;

  // Assume all salaries are already annual
  return amount;
}
