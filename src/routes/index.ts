import { Router } from "express";
import { createUser, deleteUser, getUsers } from "../controllers/usersController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/", createUser);

router.get("/", auth, getUsers);

router.delete("/:id", deleteUser);

export default router;
