import { Service } from "typedi";
import Emote from "../entity/Emote";
import { getRepository } from "typeorm";

import serviceDebug from "../util/serviceDebug";

@Service()
export class EmoteService {
  async getOne(id: string) {
    serviceDebug("event", "emote", `Querying getOne() with id { ${id} }`);
    return await Emote.findOne(id);
  }

  async getAll() {
    try {
      const emoteRepository = await getRepository(Emote);

      serviceDebug("event", "emote", `Querying getAll()`);

      return await emoteRepository.find();
    } catch (err) {
      return [];
    }
  }

  async addEmote(emoteId: string) {
    const maybeEmote = await this.getOne(emoteId);

    if (maybeEmote) return maybeEmote;

    serviceDebug("event", "user", `Creating user with id { ${emoteId} }`);

    try {
      const newUser = await Emote.insert(new Emote());

      return { id: emoteId, ...newUser.generatedMaps[0] } as Emote;
    } catch (err) {
      serviceDebug("error", "emote", `Error creating user: ${err}`);

      return null;
    }
  }
}
