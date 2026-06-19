import { APIRequestContext } from '@playwright/test';
import { User } from '../../types/user.types';

export class UsersAPI {
  constructor(private request: APIRequestContext) {}

  createUser(data: User) {
    return this.request.post('/users', { data });
  }

  getUsers() {
    return this.request.get('/users');
  }

  updateUser(id: number, data: Partial<User>) {
    return this.request.put(`/users/${id}`, { data });
  }

  deleteUser(id: number) {
    return this.request.delete(`/users/${id}`);
  }

  getUserById(id: number) {
    return this.request.get(`/users/${id}`);
  }
}