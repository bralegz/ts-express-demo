import { AppDataSource, UserModel, VehicleModel } from "../config/data-source";
import { CreateVehicleDto } from "../dto/CreateVehicleDto";
import { Vehicle } from "../entities/Vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find({
    relations: {
      user: true
    }
  });
  return vehicles;
};

export const createVehicleService = async (vehicle: CreateVehicleDto): Promise<Vehicle | void> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    await queryRunner.startTransaction();
    const newVehicle = await VehicleModel.create(vehicle);
    await queryRunner.manager.save(newVehicle);

    const user = await UserModel.findOneBy({ id: vehicle.userId });

    if (!user) throw Error("User does not exist");

    newVehicle.user = user;
    await queryRunner.manager.save(newVehicle);
    await queryRunner.commitTransaction();

    return newVehicle;
  } catch (error) {
    await queryRunner.rollbackTransaction();

    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw Error("Unknown error")
    }
  } finally {
    await queryRunner.release();
  }
};
