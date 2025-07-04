export const hardcodedUser = {
  email: "admin@teampulse.dev",
  password: "password123",
};

export function authenticateUser(email: string, password: string): boolean {
  return email === hardcodedUser.email && password === hardcodedUser.password;
}
