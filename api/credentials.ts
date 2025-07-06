import { ApiResult, Credential, ListCredentialsParams } from './api.types';
import api from './client';

export async function listCredentials(input: ListCredentialsParams): Promise<ApiResult<Credential[]>> {
  const res = await api.get('/credentials', {
    params: { ...input },
  });

  return res.data;
}

export async function createCredential(data: {
  name?: string;
  description?: string;
  primaryCredential?: string;
  secondaryCredential?: string;
  vaultId?: string;
  categoryId?: string;
}) {
  const res = await api.post('/credentials', data);
  return res.data;
}
