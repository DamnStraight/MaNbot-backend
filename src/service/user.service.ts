import { Service } from "typedi";
import User from "../entity/User";
import { getRepository } from "typeorm";

@Service()
export class UserService {
  async getOne(id: number) {
    return await User.findOne(id);
  }

  async getAll() {
    try {
      const userRepository = await getRepository(User);

      return await userRepository.find();
    } catch (err) {
      console.log("Somethin wen't wrong");

      return [];
    }
  }
}
