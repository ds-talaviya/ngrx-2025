import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user.model';

// 1. State interface
export interface UserState extends EntityState<User> {
    loading: boolean;
    error: any;
}

// 2. Entity adapter
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: (user) => user.id,
    sortComparer: false,
});

// 3. Initial state
export const initialUserState: UserState = userAdapter.getInitialState({
    loading: false,
    error: null,
});
