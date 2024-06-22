import { Request, Response } from "express";
import { getUsersService, createUserService, deleteUserService } from "../services/userService";
import IUser from "../interfaces/IUser";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, active } = req.body;
  const newUser: IUser = await createUserService({ name, email, active });

  res.status(200).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users: IUser[] = await getUsersService();
  res.status(200).json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  await deleteUserService(Number(id));
  res.status(200).json({ message: "User deleted correctly" });
};
