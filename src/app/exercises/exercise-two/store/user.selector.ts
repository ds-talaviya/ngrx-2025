import { createFeatureSelector } from "@ngrx/store";
import { User } from "../models/user";

export const getAllUsers = createFeatureSelector<User[]>('users');