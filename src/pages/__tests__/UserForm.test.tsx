import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserForm from '../UserForm';
import * as services from '../../api/services';

vi.mock('../../api/services');

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.minLength) return `Min ${options.minLength} characters`;
      return key;
    },
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

describe('UserForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Create Mode', () => {
    it('should render create form with empty fields', () => {
      render(
        <MemoryRouter initialEntries={['/user/new']}>
          <Routes>
            <Route path="/user/:id" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByLabelText(/userForm.firstName/i)).toHaveValue('');
      expect(screen.getByLabelText(/userForm.lastName/i)).toHaveValue('');
      expect(screen.getByLabelText(/userForm.email/i)).toHaveValue('');
    });

    it('should display validation errors for empty required fields', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/user/new']}>
          <Routes>
            <Route path="/user/:id" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      const submitButton = screen.getByRole('button', { name: /userForm.create/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getAllByText('userForm.required')).toHaveLength(3);
      });
    });

    it('should validate minimum length for first name', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/user/new']}>
          <Routes>
            <Route path="/user/:id" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      const firstNameInput = screen.getByPlaceholderText(/userForm.firstNamePlaceholder/i);
      await user.type(firstNameInput, 'A');

      const submitButton = screen.getByRole('button', { name: /userForm.create/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/user/new']}>
          <Routes>
            <Route path="/user/:id" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      const emailInput = screen.getByPlaceholderText(/userForm.emailPlaceholder/i);
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /userForm.create/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('userForm.invalidEmail')).toBeInTheDocument();
      });
    });

    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      vi.mocked(services.createUserService).mockResolvedValue({
        id: '123',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        createdAt: new Date().toISOString(),
      });

      render(
        <MemoryRouter initialEntries={['/user/new']}>
          <Routes>
            <Route path="/user/:id" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      await user.type(screen.getByPlaceholderText(/userForm.firstNamePlaceholder/i), 'John');
      await user.type(screen.getByPlaceholderText(/userForm.lastNamePlaceholder/i), 'Doe');
      await user.type(
        screen.getByPlaceholderText(/userForm.emailPlaceholder/i),
        'john.doe@example.com'
      );

      const submitButton = screen.getByRole('button', { name: /userForm.create/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(services.createUserService).toHaveBeenCalledWith({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
        });
      });
    });
  });

  describe('Edit Mode', () => {
    it('should load and display existing user data', async () => {
      vi.mocked(services.getUserService).mockResolvedValue(mockUser);

      render(
        <MemoryRouter initialEntries={['/user/1/edit']}>
          <Routes>
            <Route path="/user/:id/edit" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/userForm.firstNamePlaceholder/i)).toHaveValue('George');
        expect(screen.getByPlaceholderText(/userForm.lastNamePlaceholder/i)).toHaveValue('Bluth');
        expect(screen.getByPlaceholderText(/userForm.emailPlaceholder/i)).toHaveValue(
          'george.bluth@reqres.in'
        );
      });
    });

    it('should submit update with loaded user data', async () => {
      const user = userEvent.setup();
      vi.mocked(services.getUserService).mockResolvedValue(mockUser);
      vi.mocked(services.updateUserService).mockResolvedValue({
        first_name: 'George',
        last_name: 'Bluth',
        email: 'george.bluth@reqres.in',
        updatedAt: new Date().toISOString(),
      });

      render(
        <MemoryRouter initialEntries={['/user/1/edit']}>
          <Routes>
            <Route path="/user/:id/edit" element={<UserForm />} />
          </Routes>
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/userForm.lastNamePlaceholder/i)).toHaveValue('Bluth');
      });

      const submitButton = screen.getByRole('button', { name: /userForm.update/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(services.updateUserService).toHaveBeenCalledWith(1, {
          first_name: 'George',
          last_name: 'Bluth',
          email: 'george.bluth@reqres.in',
        });
      });
    });
  });

  it('should render cancel button', () => {
    render(
      <MemoryRouter initialEntries={['/user/new']}>
        <Routes>
          <Route path="/user/:id" element={<UserForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /common.cancel/i })).toBeInTheDocument();
  });
});
