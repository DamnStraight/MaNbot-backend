import { Service } from "typedi";
import User from "../entity/User";
import { getRepository } from "typeorm";

import serviceDebug from "../util/serviceDebug";

@Service()
export class UserService {
  /**
   * Get a single User entity if it exists
   *
   * @param id
   */
  async getOne(id: string) {
    serviceDebug("event", "user", `Querying getOne() with id { ${id} }`);
    try {
      return await User.findOneOrFail(id, { relations: ["emoteCounts", "emoteCounts.emote"]});
    } catch(err) {
      return undefined;
    }
  }

  /**
   * Get all user entities
   */
  async getAll() {
    try {
      const userRepository = await getRepository(User);

      serviceDebug("event", "user", `Querying getAll()`);

      return await userRepository.find();
    } catch (err) {
      return [];
    }
  }

  /**
   * Add user if it does not exist, in both cases returns a User entity
   *
   * @param userId
   */
  async addUser(userId: string) {
    const maybeUser = await this.getOne(userId);

    if (maybeUser) return maybeUser;

    serviceDebug("event", "user", `Creating user with id { ${userId} }`);

    try {
      const newUser = await User.insert(new User(userId));

      return { id: userId, ...newUser.generatedMaps[0] } as User;
    } catch (err) {
      serviceDebug("error", "user", `Error creating user: ${err}`);

      return null;
    }
  }
}
