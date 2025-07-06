import { ApiResult, Category, CreateCategoryDTO, DeleteCategoryParams, ListCategoriesParams, UpdateCategoryDTO } from './api.types';
import api from './client';

export async function listCategories(input: ListCategoriesParams): Promise<ApiResult<Category[]>>{
  const res = await api.get('/categories', {
    params: { ...input },
  });
  return res.data;
}

export async function createCategory(data: CreateCategoryDTO) {
  const res = await api.post('/categories', { ...data });
  return res.data;
}

export async function updateCategory(data: UpdateCategoryDTO) {
  const res = await api.put('/categories', { ...data });
  return res.data;
}

export async function deleteCategory(data: DeleteCategoryParams) {
  const res = await api.delete(`/categories?id=${data.id}`);
  return res.data;
}
