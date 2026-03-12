import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetail from '../UserDetail';
import * as services from '../../api/services';

vi.mock('../../api/services');

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockUser = {
  data: {
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg',
  },
};

describe('UserDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading spinner initially', () => {
    vi.mocked(services.getUserService).mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display user information after loading', async () => {
    vi.mocked(services.getUserService).mockResolvedValue(mockUser);

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('George Bluth')).toBeInTheDocument();
      expect(screen.getByText('george.bluth@reqres.in')).toBeInTheDocument();
    });
  });

  it('should render edit and delete buttons', async () => {
    vi.mocked(services.getUserService).mockResolvedValue(mockUser);

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('userDetail.edit')).toBeInTheDocument();
      expect(screen.getByText('userDetail.delete')).toBeInTheDocument();
    });
  });

  it('should display user avatar', async () => {
    vi.mocked(services.getUserService).mockResolvedValue(mockUser);

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const avatar = screen.getByAltText('George Bluth');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', mockUser.data.avatar);
    });
  });

  it('should display error message when user not found', async () => {
    vi.mocked(services.getUserService).mockRejectedValue(new Error('Not found'));

    render(
      <MemoryRouter initialEntries={['/user/999']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error al cargar el usuario')).toBeInTheDocument();
    });
  });

  it('should show back button', async () => {
    vi.mocked(services.getUserService).mockResolvedValue(mockUser);

    render(
      <MemoryRouter initialEntries={['/user/1']}>
        <Routes>
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('common.back')).toBeInTheDocument();
    });
  });
});
