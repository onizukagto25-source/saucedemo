# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/example.spec.ts >> Users API >> 1. Create User (POST)
- Location: src/tests/api/example.spec.ts:21:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 404
```

```
TypeError: client.dispose is not a function
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { APIClient } from '../../clients/apiClient';
  3  | import { UsersAPI } from './users.api';
  4  | import { User } from '../../types/user.types';
  5  | 
  6  | test.describe.serial('Users API', () => {
  7  |   let client: APIClient;
  8  |   let usersAPI: UsersAPI;
  9  |   let createdUserId: number | undefined;
  10 | 
  11 |   test.beforeAll(async () => {
  12 |     client = new APIClient();
  13 |     await client.init();
  14 |     usersAPI = new UsersAPI(client.getRequest());
  15 |   });
  16 | 
  17 |   test.afterAll(async () => {
> 18 |     if (client) await client.dispose();
     |                              ^ TypeError: client.dispose is not a function
  19 |   });
  20 | 
  21 |   test('1. Create User (POST)', async () => {
  22 |     const user: User = {
  23 |       name: 'QA User',
  24 |       gender: 'male',
  25 |       email: `qa${Date.now()}@mail.com`,
  26 |       status: 'active',
  27 |     };
  28 | 
  29 |     const res = await usersAPI.createUser(user);
  30 |     expect(res.status()).toBe(201);
  31 | 
  32 |     const body = await res.json();
  33 |     expect(body.name).toBe(user.name);
  34 | 
  35 |     createdUserId = body.id;
  36 |   });
  37 | 
  38 |   test('2. Get User (GET)', async () => {
  39 |     expect(createdUserId).toBeDefined();
  40 |     const res = await usersAPI.getUserById(createdUserId!);
  41 |     expect(res.status()).toBe(200);
  42 | 
  43 |     const body = await res.json();
  44 |     expect(body.id).toBe(createdUserId);
  45 |   });
  46 | 
  47 |   test('3. Update User (PUT)', async () => {
  48 |     expect(createdUserId).toBeDefined();
  49 |     const res = await usersAPI.updateUser(createdUserId!, { name: 'Updated QA User' });
  50 |     expect(res.status()).toBe(200);
  51 | 
  52 |     const body = await res.json();
  53 |     expect(body.name).toBe('Updated QA User');
  54 |   });
  55 | 
  56 |   test('4. Delete User (DELETE)', async () => {
  57 |     expect(createdUserId).toBeDefined();
  58 |     const res = await usersAPI.deleteUser(createdUserId!);
  59 |     expect(res.status()).toBe(204);
  60 |   });
  61 | 
  62 |   test('5. Error handling - invalid token (401)', async () => {
  63 |     const badRequest = await usersAPI.getUsers();
  64 |     expect([200, 401]).toContain(badRequest.status());
  65 |   });
  66 | });
```