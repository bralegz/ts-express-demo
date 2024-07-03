import UserDto from "../dto/userDto";
import UserRepository from "../repositories/UserRepository";
import { User } from "../entities/User";

export const createUserService = async (userData: UserDto): Promise<User> => {
  const createdUser = await UserRepository.create(userData);
  const savedUser = await UserRepository.save(createdUser);

  return savedUser;
};

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({
    relations: {
      vehicles: true
    }
  });
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const foundUser = await UserRepository.findOneBy({ id });

  return foundUser;
};

export const deleteUserService = async (id: number): Promise<void | Error> => {
  try {
    const userDeleted = await UserRepository.delete(id);
  } catch (error) {
    throw new Error("User couldnt be deleted");
  }
};
