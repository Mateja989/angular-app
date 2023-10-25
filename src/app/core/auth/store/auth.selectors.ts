// auth.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.loggedIn
);

export const selectLoggedInUser = createSelector(
  selectAuthState,
  (state) => state.user
);
