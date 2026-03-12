export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface UserResponse {
  data: User;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
}

export interface CreateUserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string;
}

export interface UpdateUserResponse {
  first_name: string;
  last_name: string;
  email: string;
  updatedAt: string;
}
