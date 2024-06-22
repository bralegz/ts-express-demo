import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (token === "auth") next();
  else res.status(400).json({ message: "Not authenticated" });
};

export default auth;
