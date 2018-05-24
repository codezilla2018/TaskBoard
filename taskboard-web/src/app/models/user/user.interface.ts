import { TaskI } from './../task/task.interface';
export interface UserI{
    $key?: string;
    firstName?:string,
    lastName?:string,
    email?:string
    role?:string,
    gender?:string,
    uid?:string,
    tasks?:TaskI[]
}
