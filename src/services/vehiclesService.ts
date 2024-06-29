import { UserModel, VehicleModel } from "../config/data-source";
import { CreateVehicleDto } from "../dto/CreateVehicleDto";
import { Vehicle } from "../entities/Vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find();
  return vehicles;
};

export const createVehicleService = async (vehicle: CreateVehicleDto): Promise<Vehicle> => {
  const newVehicle = await VehicleModel.create(vehicle);
  await VehicleModel.save(newVehicle);

  //once the vehocle is created we need to specify the relation with the user
  const user = await UserModel.findOneBy({
    id: vehicle.userId // find the user with the id specified in the vehicle creation
  });

  //if user is different than null then save the new vehicle into the 'vehicle' property in users table
  if (user) {
    user.vehicle = newVehicle;
    await UserModel.save(user);
  } else {
    throw new Error("User doesn't exist")
  }
  return newVehicle;
};
