import projects from "./projects.json";
import experience from "./experience.json";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  tech: string[];
};

export async function getProjects(): Promise<Project[]> {
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 500));
  return projects;
}

export async function getExperience(): Promise<Experience[]> {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  return experience;
}
