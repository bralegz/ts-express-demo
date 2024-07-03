import { Request, Response } from "express";
import { createVehicleService, getVehiclesService } from "../services/vehiclesService";

export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  const vehicles = await getVehiclesService();

  res.status(200).json(vehicles);
  return;
};

export const createVehicle = async (req: Request, res: Response) => {
  const { brand, color, model, year, userId } = req.body;

  try {
    const newVehicle = await createVehicleService({
      brand,
      color,
      model,
      year,
      userId
    });

    res.status(201).json(newVehicle);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    } else {
      res.status(500).json({ err: "Unknown error" });
    }
  }
};
