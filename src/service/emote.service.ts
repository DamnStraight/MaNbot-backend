import { Service } from "typedi";
import Emote from "../entity/Emote";
import { getRepository } from "typeorm";

import serviceDebug from "../util/serviceDebug";
import { AddEmoteInput } from "src/modules/emote/input/AddEmoteInput";

@Service()
export class EmoteService {
  /**
   * Find a single emote by id and return it if it exists
   * @param id
   */
  async getOne(id: string) {
    serviceDebug("event", "emote", `Querying getOne() with id { ${id} }`);
    return await Emote.findOne(id);
  }

  /**
   * Returns all existing emotes
   */
  async getAll() {
    try {
      const emoteRepository = await getRepository(Emote);

      serviceDebug("event", "emote", `Querying getAll()`);

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

    serviceDebug("event", "emote", `Creating emote with id { ${emoteId} }`);

    try {
      const newUser = await Emote.insert(new Emote());

      return { id: emoteId, ...newUser.generatedMaps[0] } as Emote;
    } catch (err) {
      serviceDebug("error", "emote", `Error creating user: ${err}`);

      return null;
    }
  }

  /**
   * Add many emotes at once, return the result
   * @param emoteDtos
   */
  async addEmotes(emoteDtos: AddEmoteInput[]) {
    const emoteModels: Emote[] = emoteDtos.map(
      emote => new Emote({ id: emote.id, name: emote.name } as Emote)
    );

    try {
      const savedEmotes: Emote[] = await Emote.save(emoteModels);

      return savedEmotes;
    } catch (err) {
      serviceDebug(
       "error",
        "emote",
        `Error adding emotes in addEmotes(): ${err}`
      );

      return [];
    }
  }

}
