import UserDto from "../dto/userDto";
import { UserModel } from "../config/data-source";
import { User } from "../entities/User";

export const createUserService = async (userData: UserDto): Promise<User> => {
  const createdUser = await UserModel.create(userData);
  const savedUser = await UserModel.save(createdUser);

  return savedUser;
};

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find({
    relations: {
      vehicles: true
    }
  });
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const foundUser = await UserModel.findOneBy({ id });

  return foundUser;
};

export const deleteUserService = async (id: number): Promise<void | Error> => {
  try {
    const userDeleted = await UserModel.delete(id);
  } catch (error) {
    throw new Error("User couldnt be deleted");
  }
};
