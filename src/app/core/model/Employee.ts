import { Project } from "./Project";

export interface Employee {    
    name: string;
    role: string;
    salary: number,
    manager: string;
    gcm: string;
    projects: Project[];
    skills: string[];
    certification: string[];

}