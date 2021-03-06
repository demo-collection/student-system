import { RematchDispatcher, RematchDispatcherAsync } from '@rematch/core';

export interface StudentItem {
  id: number;
  name: string;
  number: number;
  gender: string;
  phone: string;
  age?: number;
  grade?: number;
  classNumber?: number;
  email?: number;
  address?: number;
  birthday?: number;
}

export interface StudentState {
  studentList: StudentItem[];
  loading: boolean;
  menuKey: string;
}

export interface StudentAction {
  updateDispatch: RematchDispatcher;

  getListEffect: RematchDispatcherAsync;
}
