import type { UserRole, UserRoles } from '../types/roles';

const STORAGE_KEY = 'user_roles';

export const roleStorage = {
  getUserRole(userId: number): UserRole {
    const roles = this.getAllRoles();
    return roles[userId] || null;
  },

  setUserRole(userId: number, role: UserRole): void {
    const roles = this.getAllRoles();
    if (role === null) {
      delete roles[userId];
    } else {
      roles[userId] = role;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
  },

  getAllRoles(): UserRoles {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  },

  clearAllRoles(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
