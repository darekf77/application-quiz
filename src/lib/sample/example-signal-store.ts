// users.store.ts
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface User {
  id: number;
  name: string;
  role: 'admin' | 'developer' | 'tester';
}

type UsersState = {
  users: User[];
  selectedUserId: number | null;
};

const initialState: UsersState = {
  users: [
    { id: 1, name: 'Darek', role: 'developer' },
    { id: 2, name: 'Masha', role: 'tester' },
    { id: 3, name: 'Krzysiek', role: 'developer' },
  ],
  selectedUserId: null,
};

export const UsersStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withMethods(store => ({
    selectUser(id: number) {
      patchState(store, { selectedUserId: id });
    },

    addUser(user: User) {
      patchState(store, {
        users: [...store.users(), user],
      });
    },

    removeUser(id: number) {
      patchState(store, {
        users: store.users().filter(u => u.id !== id),
      });
    },
  })),
);


const store = new UsersStore();

// store.addUser()
