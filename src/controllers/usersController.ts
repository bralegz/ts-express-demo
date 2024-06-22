import { Request, Response } from "express";
import { getUsersService, createUserService, deleteUSerService } from "../services/userService";
import IUser from "../interfaces/IUser";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, active } = req.body;
  const newUser: IUser = await createUserService({ name, email, active });

  res.status(200).json(newUser);
};

export const getUsers = async () => {};

export const deleteUser = async () => {};
