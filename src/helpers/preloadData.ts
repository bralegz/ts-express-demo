import { AppDataSource, UserModel } from "../config/data-source";

const user1 = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: 30,
  active: true
};

const user2 = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  age: 25,
  active: false
};

const user3 = {
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  age: 28,
  active: true
};

const user4 = {
  name: "Bob Brown",
  email: "bob.brown@example.com",
  age: 32,
  active: false
};

export const preloadData = async () => {
  //group together all the operations you want to be part of the transaction
  await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
    const checkUsersDatabase = await UserModel.find();

    if (checkUsersDatabase.length) return console.log("Data already preloaded");

    const userOne = await UserModel.create(user1);
    const userTwo = await UserModel.create(user2);
    const userThree = await UserModel.create(user3);
    const userFour = await UserModel.create(user4);

    //if one of these saves fails, it won't save any of them
    await transactionalEntityManager.save(userOne);
    await transactionalEntityManager.save(userTwo);
    await transactionalEntityManager.save(userThree);
    await transactionalEntityManager.save(userFour);

    console.log("Data preloaded successfully");
  });
};
