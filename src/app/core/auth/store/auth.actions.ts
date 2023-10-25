// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.interface';

export const login = createAction(
    '[Auth] Login', 
     props<{ user : User }>()
);
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');


