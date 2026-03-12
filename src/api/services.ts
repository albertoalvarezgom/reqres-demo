import { USERS_ENDPOINT, getUserEndpoint, getUsersPageEndpoint } from "./endpoints";
import { API_URL, API_TOKEN } from "../utils/constants";
import type { 
  UserListResponse, 
  UserResponse, 
  CreateUserRequest, 
  UpdateUserRequest,
  CreateUserResponse,
  UpdateUserResponse
} from "../types/user";

export const getUsersService = async (page: number = 1): Promise<UserListResponse> => {
  const url = `${API_URL}${getUsersPageEndpoint(page)}`;
  const response = await fetch(url, {
    headers: {
      'x-api-key': API_TOKEN,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const getUserService = async (id: number): Promise<UserResponse> => {
  const url = `${API_URL}${getUserEndpoint(id)}`;
  const response = await fetch(url, {
    headers: {
      'x-api-key': API_TOKEN,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const createUserService = async (userData: CreateUserRequest): Promise<CreateUserResponse> => {
  const url = `${API_URL}${USERS_ENDPOINT}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_TOKEN,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

export const updateUserService = async (id: number, userData: UpdateUserRequest): Promise<UpdateUserResponse> => {
  const url = `${API_URL}${getUserEndpoint(id)}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_TOKEN,
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
};

export const deleteUserService = async (id: number): Promise<void> => {
  const url = `${API_URL}${getUserEndpoint(id)}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_TOKEN,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};