// user.selectors.ts
import { createFeatureSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.entity';

// 1. Feature key
export const selectUserState = createFeatureSelector<UserState>('users');

// 2. Entity selectors
const {
    selectAll, // give all users array
    selectEntities, // user object stored in entities
    selectIds, // gives user ids array
    selectTotal // gives no of users
} = userAdapter.getSelectors(selectUserState);

// 3. Export selectors
export const selectAllUsers = selectAll;
export const selectUserEntities = selectEntities;
export const selectUserLoading = (state: UserState) => state.loading;
export const selectUserError = (state: UserState) => state.error;
