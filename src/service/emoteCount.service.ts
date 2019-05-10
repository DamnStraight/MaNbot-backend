import { Service } from "typedi";
import { getRepository } from "typeorm";
import serviceDebug from "../util/serviceDebug";
import { EmoteCount } from "../entity/EmoteCount";
import { EmoteService } from "./emote.service";
import { UserService } from "./user.service";
import { ApolloError } from "apollo-server-core";

@Service()
export class EmoteCountService {
  constructor(
    private readonly emoteService: EmoteService,
    private readonly userService: UserService
  ) {}

  async getByUserIdEmoteId(userId: string, emoteId: string) {
    try {
      const maybeEmoteCount = await EmoteCount.findOneOrFail({
        where: { user: { id: userId }, emote: { id: emoteId } },
        relations: ["user", "emote"]
      });

      return maybeEmoteCount || null;
    } catch (err) {
      serviceDebug(
        "error",
        "emoteCount",
        `Error finding EmoteCount in getByUserEmote(${userId}, ${emoteId})`
      );

      throw new ApolloError('Oops! Database error :(', '500');
    }
  }

  async saveOrUpdateEmoteCount(userId: string, emoteId: string, add: number) {
    const maybeEmoteCount = await this.getByUserIdEmoteId(userId, emoteId);

    if (maybeEmoteCount) {
      maybeEmoteCount.addCount(add);

      return await maybeEmoteCount.save();
    } else {
      const maybeEmote = await this.emoteService.getOne(emoteId);
      const maybeUser = await this.userService.getOne(userId);

      if (!maybeEmote || !maybeUser)
        throw new ApolloError("User or emote does not exist", "404");

      return await EmoteCount.save(
        new EmoteCount({
          emote: maybeEmote,
          user: maybeUser,
          count: add
        } as EmoteCount)
      );
    }
  }
}
