// store/project.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialUserState, userAdapter } from './user.entity';
import { UserActions } from './user.actions';

export const e6userReducer = createReducer(
    initialUserState,
    on(UserActions.loadUser, state => ({
        ...state,
        loading: true
    })),
    on(UserActions.loadUserSuccess, (state, { users }) =>
        userAdapter.setAll(users, { ...state, loading: false })
    ),
    on(UserActions.addUserSuccess, (state, { user }) =>
        userAdapter.addOne(user, state)
    ),
    on(UserActions.updateUserSuccess, (state, { user }) =>
        userAdapter.updateOne({ id: user.id, changes: user }, state)
    ),
    on(UserActions.deleteUserSuccess, (state, { user }) =>
        userAdapter.removeOne(user.id, state)
    )
);
