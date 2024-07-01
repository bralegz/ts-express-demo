import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadData } from "./helpers/preloadData";

// AppDataSource.initialize().then(res => {
//   console.log("Database connected successfully")
//   preloadData().then(res => {
//     server.listen(PORT, () => {
//       console.log(`server listening on port ${PORT}`);
//     });
//   })
// });



const initializeApp = async () => {
  await AppDataSource.initialize();
  await preloadData();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
};

initializeApp();