import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserList from '../UserList';
import * as services from '../../api/services';

vi.mock('../../api/services');

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

const mockUsers = {
  data: [
    {
      id: 1,
      email: 'george.bluth@reqres.in',
      first_name: 'George',
      last_name: 'Bluth',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    },
    {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    },
  ],
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading spinner initially', () => {
    vi.mocked(services.getUsersService).mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<UserList />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render user list after loading', async () => {
    vi.mocked(services.getUsersService).mockResolvedValue(mockUsers);

    renderWithRouter(<UserList />);

    await waitFor(() => {
      expect(screen.getByText(/George/)).toBeInTheDocument();
      expect(screen.getByText(/Janet/)).toBeInTheDocument();
    });
  });

  it('should display user emails', async () => {
    vi.mocked(services.getUsersService).mockResolvedValue(mockUsers);

    renderWithRouter(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('george.bluth@reqres.in')).toBeInTheDocument();
      expect(screen.getByText('janet.weaver@reqres.in')).toBeInTheDocument();
    });
  });

  it('should render create user button', async () => {
    vi.mocked(services.getUsersService).mockResolvedValue(mockUsers);

    renderWithRouter(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('userList.createUser')).toBeInTheDocument();
    });
  });

  it('should display error message when API fails', async () => {
    vi.mocked(services.getUsersService).mockRejectedValue(new Error('API Error'));

    renderWithRouter(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('Error al cargar los usuarios')).toBeInTheDocument();
    });
  });

  it('should render pagination controls', async () => {
    vi.mocked(services.getUsersService).mockResolvedValue(mockUsers);

    renderWithRouter(<UserList />);

    await waitFor(() => {
      expect(screen.getByText('userList.previous')).toBeInTheDocument();
      expect(screen.getByText('userList.next')).toBeInTheDocument();
    });
  });
});
