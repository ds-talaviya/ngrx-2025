import { Project } from "./project";
import { User } from "./user";

export interface Task {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    priority: string,
    user: User,
    project: Project,
    status: string
}