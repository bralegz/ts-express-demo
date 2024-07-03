import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number): Promise<User> {
    const user = await this.findOneBy({ id });

    if (!user) {
      throw new Error("User not found");
    } 

    return user
  }
});

export default UserRepository;
