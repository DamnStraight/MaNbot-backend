import { Service } from "typedi";
import Guild from "../entity/Guild";
import { ApolloError } from "apollo-server-core";

@Service()
export class GuildService {
  /**
   * Create and persist a new guild
   *
   * @param guildId
   * @param name
   */
  async addGuild(guildId: string, name: string) {
    try {
      const maybeGuild = await Guild.findOne(guildId);

      if (maybeGuild) return maybeGuild;

      return await Guild.save(new Guild({ id: guildId, name } as Guild));
    } catch (err) {
      throw new ApolloError("Out here");
    }
  }
}
