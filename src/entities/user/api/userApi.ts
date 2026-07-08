import type { User } from "../model/types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`${USERS_URL}/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to load user");
  }

  return (await response.json()) as User;
};
