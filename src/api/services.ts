import { USERS_ENDPOINT, getUserEndpoint, getUsersPageEndpoint } from './endpoints';
import { API_URL, API_TOKEN } from '../utils/constants';
import { handleApiResponse } from '../utils/errors';
import { isDevMode, mockDelay } from '../utils/devMode';
import { getMockUserList, getMockUser, createMockUser, updateMockUser } from '../mocks/mockData';
import type {
  UserListResponse,
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  CreateUserResponse,
  UpdateUserResponse,
} from '../types/user';

export const getUsersService = async (page: number = 1): Promise<UserListResponse> => {
  if (isDevMode()) {
    await mockDelay();
    return getMockUserList(page);
  }

  const url = `${API_URL}${getUsersPageEndpoint(page)}`;
  const response = await fetch(url, {
    headers: {
      'x-api-key': API_TOKEN,
    },
  });
  await handleApiResponse(response);
  return response.json();
};

export const getUserService = async (id: number): Promise<UserResponse> => {
  if (isDevMode()) {
    await mockDelay();
    const mockUser = getMockUser(id);
    if (!mockUser) {
      throw new Error(`User with id ${id} not found`);
    }
    return mockUser;
  }

  const url = `${API_URL}${getUserEndpoint(id)}`;
  const response = await fetch(url, {
    headers: {
      'x-api-key': API_TOKEN,
    },
  });
  await handleApiResponse(response);
  return response.json();
};

export const createUserService = async (
  userData: CreateUserRequest
): Promise<CreateUserResponse> => {
  if (isDevMode()) {
    await mockDelay();
    return createMockUser(userData);
  }

  const url = `${API_URL}${USERS_ENDPOINT}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_TOKEN,
    },
    body: JSON.stringify(userData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const updateUserService = async (
  id: number,
  userData: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  if (isDevMode()) {
    await mockDelay();
    return updateMockUser(userData);
  }

  const url = `${API_URL}${getUserEndpoint(id)}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_TOKEN,
    },
    body: JSON.stringify(userData),
  });
  await handleApiResponse(response);
  return response.json();
};

export const deleteUserService = async (id: number): Promise<void> => {
  if (isDevMode()) {
    await mockDelay();
    return;
  }

  const url = `${API_URL}${getUserEndpoint(id)}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'x-api-key': API_TOKEN,
    },
  });
  await handleApiResponse(response);
};
