import { ApiResult, CreateCredentialsDTO, Credential, DeleteCredentialsParams, ListCredentialsParams, UpdateCredentialsDTO } from './api.types';
import api from './client';

export async function listCredentials(input: ListCredentialsParams): Promise<ApiResult<Credential[]>> {
  const res = await api.get('/credentials', {
    params: { ...input },
  });

  return res.data;
}

export async function createCredential(data: CreateCredentialsDTO): Promise<ApiResult<Credential>> {
  const res = await api.post('/credentials', data);
  return res.data;
}

export async function updateCredential(data: UpdateCredentialsDTO): Promise<ApiResult<Credential>> {
  const res = await api.patch('/credentials', data);
  return res.data;
}

export async function deleteCredential(data: DeleteCredentialsParams) {
  const res = await api.delete(`/credentials?id=${data.id}&accessCode=${data.accessCode}`);
  return res.data;
}