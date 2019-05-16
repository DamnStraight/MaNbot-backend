import { ApolloError } from "apollo-server-core";
import { Service } from "typedi";
import { getRepository } from "typeorm";
import Emote from "../entity/Emote";
import Guild from "../entity/Guild";
import { AddEmoteInput } from "../modules/emote/input/AddEmoteInput";
import appDebugger from "../util/appDebugger";

@Service()
export class EmoteService {
  private eventLogger = appDebugger("service", "emote", "event");
  private errorLogger = appDebugger("service", "emote", "error");

  /**
   * Find a single emote by id and return it if it exists
   * @param id
   */
  async getOne(id: string) {
    this.eventLogger(`Querying getOne() with id { ${id} }`);
    return await Emote.findOne(id);
  }

  /**
   * Returns all existing emotes
   */
  async getAll() {
    try {
      const emoteRepository = await getRepository(Emote);

      this.eventLogger(`Querying getAll()`);

      return await emoteRepository.find();
    } catch (err) {
      return [];
    }
  }

  /**
   * Add a single emote and return it if successful
   * @param emoteId
   */
  async addEmote(emoteId: string) {
    const maybeEmote = await this.getOne(emoteId);

    if (maybeEmote) return maybeEmote;

    this.eventLogger(`Creating emote with id { ${emoteId} }`);

    try {
      const newUser = await Emote.insert(new Emote());

      return { id: emoteId, ...newUser.generatedMaps[0] } as Emote;
    } catch (err) {
      this.errorLogger(`Error creating user: ${err}`);

      return null;
    }
  }

  /**
   * Add many emotes at once, return the result
   * @param emoteDtos
   */
  async addEmotes(
    guildId: string,
    emoteDtos: AddEmoteInput[]
  ): Promise<Emote[]> {
    try {
      const guild = await Guild.findOne(guildId);

      if (!guild) throw new ApolloError("Guild doesn't exist");

      const emoteModels: Emote[] = emoteDtos.map(
        emote => new Emote({ id: emote.id, name: emote.name, guild } as Emote)
      );

      this.eventLogger(`Querying addEmotes() with guildId: \"${guildId}\"`);

      const savedEmotes: Emote[] = await Emote.save(emoteModels);

      this.eventLogger(`addEmotes() ran successfully`);

      return savedEmotes;
    } catch (err) {
      this.errorLogger(`Error adding emotes in addEmotes(): ${err}`);

      throw new ApolloError("Database error occured");
    }
  }
}
