# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/users.crud.spec.ts >> 3. Update User (PUT)
- Location: src/tests/api/users.crud.spec.ts:42:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { APIClient } from '../../clients/apiClient';
  3  | import { UsersAPI } from './users.api';
  4  | import { User } from '../../types/user.types';
  5  | 
  6  | let usersAPI: UsersAPI;
  7  | let createdUserId: number;
  8  | 
  9  | test.beforeAll(async () => {
  10 |   const client = new APIClient();
  11 |   await client.init();
  12 |   usersAPI = new UsersAPI(client.getRequest());
  13 | });
  14 | 
  15 | test('1. Create User (POST)', async () => {
  16 |   const user: User = {
  17 |     name: 'QA User',
  18 |     gender: 'male',
  19 |     email: `qa${Date.now()}@mail.com`,
  20 |     status: 'active',
  21 |   };
  22 | 
  23 |   const res = await usersAPI.createUser(user);
  24 | 
  25 |   expect(res.status()).toBe(201);
  26 | 
  27 |   const body = await res.json();
  28 |   expect(body.name).toBe(user.name);
  29 | 
  30 |   createdUserId = body.id;
  31 | });
  32 | 
  33 | test('2. Get User (GET)', async () => {
  34 |   const res = await usersAPI.getUserById(createdUserId);
  35 | 
  36 |   expect(res.status()).toBe(200);
  37 | 
  38 |   const body = await res.json();
  39 |   expect(body.id).toBe(createdUserId);
  40 | });
  41 | 
  42 | test('3. Update User (PUT)', async () => {
  43 |   const res = await usersAPI.updateUser(createdUserId, {
  44 |     name: 'Updated QA User',
  45 |   });
  46 | 
> 47 |   expect(res.status()).toBe(200);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  48 | 
  49 |   const body = await res.json();
  50 |   expect(body.name).toBe('Updated QA User');
  51 | });
  52 | 
  53 | test('4. Delete User (DELETE)', async () => {
  54 |   const res = await usersAPI.deleteUser(createdUserId);
  55 | 
  56 |   expect(res.status()).toBe(204);
  57 | });
  58 | 
  59 | test('5. Error handling - invalid token (401)', async () => {
  60 |   const badRequest = await usersAPI.getUsers();
  61 |   expect([200, 401]).toContain(badRequest.status());
  62 | });
```