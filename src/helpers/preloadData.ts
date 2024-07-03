import { AppDataSource } from "../config/data-source";
import UserRepository from "../repositories/UserRepository";
import VehicleRepository from "../repositories/VehicleRepository";

const preloadUsers = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    active: true
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
    active: false
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    active: true
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    age: 32,
    active: false
  }
];

const preloadVehicles = [
  {
    brand: "Toyota",
    color: "Red",
    model: "Corolla",
    year: 2020,
    userId: 1
  },
  {
    brand: "Honda",
    color: "Blue",
    model: "Civic",
    year: 2018,
    userId: 1
  },
  {
    brand: "Ford",
    color: "Black",
    model: "Mustang",
    year: 2021,
    userId: 4
  },
  {
    brand: "Chevrolet",
    color: "White",
    model: "Camaro",
    year: 2019,
    userId: 3
  }
];

export const preloadUserData = async () => {
  //group together all the operations you want to be part of the transaction
  await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
    const users = await UserRepository.find();

    if (users.length) return console.log("Data already preloaded");

    // for await will allow us to perform async operations inside a for loop
    //this loop will go through all of the users in the array and save each one individually
    //if one of these saves fails, it won't save any of them
    for await (const user of preloadUsers) {
      const newUser = await UserRepository.create(user);
      await transactionalEntityManager.save(newUser);
    }

    console.log("User data preloaded successfully");
  });
};

export const preloadVehiclesData = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const vehiclePromises = preloadVehicles.map(async (vehicle) => {
    const newVehicle = VehicleRepository.create(vehicle);
    await queryRunner.manager.save(newVehicle);

    const user = await UserRepository.findOneBy({ id: vehicle.userId });

    //an error inside a promise will reject the promise
    if (!user) throw Error("Couldn't add user to vehicle");

    newVehicle.user = user;
    await queryRunner.manager.save(newVehicle);
  });

  try {
    /*
    The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.
  */
    await queryRunner.startTransaction();
    await Promise.all(vehiclePromises);
    console.log("Vehicle data preloaded successfully");
    await queryRunner.commitTransaction();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error");
    }

    //rollback the transactions if there was an error
    await queryRunner.rollbackTransaction();
  } finally {
    //All started transactions must finsih, Either with a rollback or with a commit and then release.
    console.log("Preload attempt completed");
    await queryRunner.release();
  }
};
