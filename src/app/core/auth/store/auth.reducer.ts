import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.interface';
import * as AuthActions from './auth.actions';

export interface AuthState {
    loggedIn: boolean;
    user: User | null;
}

export const initialState: AuthState = {
    loggedIn: false,
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, { user }) => ({
        ...state,
        loggedIn: true,
        user: { ...user },
    })),
    on(AuthActions.logout, (state) => ({ ...state, loggedIn: false, user: null })),
    on(AuthActions.logoutSuccess, (state) => ({ ...state, user: null }))
);
  