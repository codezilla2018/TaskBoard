import { Account } from './../ account/ account.interface';

export interface UserI{
    $key?: string;
    firstName:string,
    lastName:string,
    account:Account,
    role:string
}
