import { Router } from "express";
import { createUser, deleteUser, getUsers } from "../controllers/usersController";

const router: Router = Router();

router.post("/", createUser);

router.get("/", getUsers);

router.delete("/:id", deleteUser);

export default router;
