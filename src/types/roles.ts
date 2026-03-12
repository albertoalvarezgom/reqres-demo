export type UserRole = 'admin' | 'developer' | 'designer' | null;

export interface UserRoles {
  [userId: number]: UserRole;
}
