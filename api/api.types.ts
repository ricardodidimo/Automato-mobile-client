export interface AuthenticateUserDTO {
  email?: string | null;
  password?: string | null;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  token: string;
}

export type ApiResult<T> = {
  data: T;
  errors: string[];
  success: boolean;
};

export interface CreateCategoryDTO {
  name: string;
  userId: string;
}

export interface CreateCredentialsDTO {
  name?: string | null;
  description?: string | null;
  primaryCredential?: string | null;
  secondaryCredential?: string | null;
  vaultId?: string | null;
  categoryId?: string | null;
}

export interface CreateUserDTO {
  name?: string | null;
  email?: string | null;
  plainPassword?: string | null;
}

export interface CreateVaultDTO {
  name?: string | null;
  description?: string | null;
  accessCode?: string | null;
  userID?: string | null;
}

export interface UpdateCategoryDTO {
  categoryId?: string | null;
  name?: string | null;
}

export interface UpdateCredentialsDTO {
  credentialsId?: string | null;
  vaultAccessCode?: string | null;
  name?: string | null;
  description?: string | null;
  primaryCredential?: string | null;
  secondaryCredential?: string | null;
  vaultId?: string | null;
  categoryId?: string | null;
}

export interface UpdateVaultDTO {
  vaultId?: string | null;
  name?: string | null;
  description?: string | null;
  accessCode?: string | null;
}

export interface DeleteCategoryParams {
  id: string;
}

export interface ListCategoriesParams {
  userId: string;
  page: number;
  pageSize?: number;
}

export interface DeleteCredentialsParams {
  id: string;
  accessCode: string;
}

export interface ListCredentialsParams {
  vaultId: string;
  accessCode: string;
  categoryId?: string;
  page: number;
  pageSize: number;
}

export interface DeleteVaultParams {
  id: string;
  accessCode: string;
}

export interface ListVaultsParams {
  userId: string;
  page: number;
  pageSize?: number;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
}

export interface Credential {
  id: string;
  name: string;
  description?: string;
  primaryCredential: string;
  secondaryCredential: string;
  vaultId: string;
  categoryId?: string;
}

export interface Vault {
  id: string;
  name: string;
  description?: string;
  accessCode?: string;
  userID: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
