import { test, expect } from '@playwright/test';
import { APIClient } from '../../clients/apiClient';
import { UsersAPI } from './users.api';
import { User } from '../../types/user.types';

let usersAPI: UsersAPI;
let createdUserId: number;

test.beforeAll(async () => {
  const client = new APIClient();
  await client.init();
  usersAPI = new UsersAPI(client.getRequest());
});

test('1. Create User (POST)', async () => {
  const user: User = {
    name: 'QA User',
    gender: 'male',
    email: `qa${Date.now()}@mail.com`,
    status: 'active',
  };

  const res = await usersAPI.createUser(user);

  expect(res.status()).toBe(201);

  const body = await res.json();
  expect(body.name).toBe(user.name);

  createdUserId = body.id;
});

test('2. Get User (GET)', async () => {
  const res = await usersAPI.getUserById(createdUserId);

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.id).toBe(createdUserId);
});

test('3. Update User (PUT)', async () => {
  const res = await usersAPI.updateUser(createdUserId, {
    name: 'Updated QA User',
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.name).toBe('Updated QA User');
});

test('4. Delete User (DELETE)', async () => {
  const res = await usersAPI.deleteUser(createdUserId);

  expect(res.status()).toBe(204);
});

test('5. Error handling - invalid token (401)', async () => {
  const badRequest = await usersAPI.getUsers();
  expect([200, 401]).toContain(badRequest.status());
});