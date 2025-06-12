import { createFeatureSelector } from "@ngrx/store";
import { User } from "../model/user";

export const getAllUser = createFeatureSelector<User[]>('effectUsers');