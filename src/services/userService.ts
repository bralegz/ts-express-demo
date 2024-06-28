import IUser from "../interfaces/IUser";
import UserDto from "../dto/userDto";

let users: IUser[] = [
  {
    id: 1,
    name: "lucas",
    age: 22,
    email: "lucas@gmail.com",
    active: true,
  },
];

let id: number = 2;

export const createUserService = async (userData: UserDto): Promise<IUser> => {
  const newUser: IUser = {
    id,
    name: userData.name,
    age: userData.age,
    email: userData.email,
    active: userData.active,
  };

  users.push(newUser);
  id++;
  return newUser;
};

export const getUsersService = async (): Promise<IUser[]> => {
  return users;
};

export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter((user: IUser) => {
    return user.id !== id;
  });
};
