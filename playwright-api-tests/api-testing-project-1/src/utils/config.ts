import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: 'https://gorest.co.in/public/v2',
  token: process.env.GOREST_API_TOKEN as string,
};