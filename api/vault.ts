import { ApiResult, CreateVaultDTO, DeleteVaultParams, UpdateVaultDTO, Vault } from './api.types';
import api from './client';

export async function listVaults(userId: string, page: number, pageSize = 10): Promise<ApiResult<Vault[]>> {
  const res = await api.get('/vaults', {
    params: { userId, page, pageSize },
  });
  return res.data;
}

export async function createVault(data: CreateVaultDTO): Promise<ApiResult<Vault>>{
  const res = await api.post('/vaults', data);
  return res.data;
}

export async function updateVault(data: UpdateVaultDTO): Promise<ApiResult<Vault>>{
  const res = await api.put('/vaults', data);
  return res.data;
}

export async function deleteVault(data: DeleteVaultParams) {
  const res = await api.delete(`/vaults/${data.id}`);
  return res.data;
}