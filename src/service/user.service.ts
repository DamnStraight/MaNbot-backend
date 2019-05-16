import { ApolloError } from "apollo-server-core";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import Guild from "../entity/Guild";
import User from "../entity/User";
import appDebugger from "../util/appDebugger";

@Service()
export class UserService {
  private eventLogger = appDebugger("service", "user", "event");

  /**
   * Get a single User entity if it exists
   *
   * @param id
   */
  async getOne(id: string) {
    this.eventLogger(`Querying getOne() with id { ${id} }`);
    try {
      return await User.findOneOrFail(id, {
        relations: ["emoteCounts", "emoteCounts.emote"]
      });
    } catch (err) {
      throw new ApolloError("Error getting user");
    }
  }

  /**
   * Get all user entities
   */
  async getAll() {
    try {
      const userRepository = await getRepository(User);

      this.eventLogger(`Querying getAll()`);

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

    this.eventLogger(`Creating user with id { ${userId} }`);

    try {
      const newUser = await User.insert(new User(userId));

      return { id: userId, ...newUser.generatedMaps[0] } as User;
    } catch (err) {
      this.eventLogger(`Error creating user: ${err}`);

      return null;
    }
  }

  /**
   * Add a given list of users and associate them with given guild
   *
   * @param guildId
   * @param users
   */
  async addUsers(guildId: string, users: string[]) {
    try {
      const guild = await Guild.findOne(guildId);

      if (!guild) throw new ApolloError("Guild doesn't exist");

      let newUser;
      const userModels: User[] = users.map(user => {
        newUser = new User(user);
        newUser.guilds.push(guild);
        return newUser;
      });

      const savedUsers: User[] = await User.save(userModels);

      return savedUsers;
    } catch (err) {
      throw new ApolloError("Error saving users");
    }
  }
}
