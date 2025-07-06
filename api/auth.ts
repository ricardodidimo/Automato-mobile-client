import { ApiResult, AuthenticatedUser } from './api.types';
import api from './client';

export async function login(email: string, password: string): Promise<ApiResult<AuthenticatedUser>> {
  const res = await api.post('/login', { email, password });
  return res.data;
}

export async function register(name: string, email: string, plainPassword: string) {
  const res = await api.post('/register', { name, email, plainPassword });
  return res.data;
}
