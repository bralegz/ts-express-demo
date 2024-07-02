import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadUserData, preloadVehiclesData } from "./helpers/preloadData";


const initializeApp = async () => {
  await AppDataSource.initialize();
  await preloadUserData();
  await preloadVehiclesData();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
};

initializeApp();