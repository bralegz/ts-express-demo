import { Request, Response } from "express";
import { getUsersService, createUserService, deleteUserService, getUserByIdService } from "../services/userService";
import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, active, age } = req.body;
  const newUser: User = await createUserService({ name, email, active, age });

  res.status(200).json(newUser);
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await getUsersService();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const numId: number = Number(id);

  if(isNaN(numId)) {
    res.status(404).json({ msg: "Invalid id" });
    return
  }

  const userFound: User | null = await getUserByIdService(numId);

  if(!userFound) {
     res.status(400).json({msg: "User not found"});
     return
  }

  res.status(200).send({user: userFound})
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;
try {
  const userDeleted: void | Error = await deleteUserService(Number(id));


  res.status(200).json({ message: "User deleted successfully" });
} catch (error) {
  if (error instanceof Error) {
    res.status(400).json({ msg: error.message });
  } else {
    // Handle any other types of thrown values (e.g., strings, numbers)
    res.status(500).json({ msg: "An unknown error occurred" });
  } 
}
  
};
