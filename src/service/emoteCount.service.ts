import { ApolloError } from "apollo-server-core";
import { Service } from "typedi";
import { EmoteCount } from "../entity/EmoteCount";
import { SaveEmoteCountInput } from "../modules/emoteCount/input/SaveEmoteCountInput";
import asyncForEach from "../util/asyncForeach";
import appDebugger from "../util/appDebugger";
import { EmoteService } from "./emote.service";
import { UserService } from "./user.service";

@Service()
export class EmoteCountService {
  constructor(
    private readonly emoteService: EmoteService,
    private readonly userService: UserService
  ) {}

  private eventLogger = appDebugger("service", "emoteCount", "event");
  private errorLogger = appDebugger("service", "emoteCount", "error");

  /**
   * Return the EmoteCount object for a a matching User and Emote
   *
   * @param userId
   * @param emoteId
   */
  async getByUserIdEmoteId(userId: string, emoteId: string) {
    try {
      const maybeEmoteCount = await EmoteCount.findOne({
        where: { user: { id: userId }, emote: { id: emoteId } },
        relations: ["user", "emote"]
      });

      return maybeEmoteCount || null;
    } catch (err) {
      this.errorLogger(
        `Error finding EmoteCount in getByUserEmote(${userId}, ${emoteId})`
      );

      throw new ApolloError("Oops! Database error :(", "500");
    }
  }

  /**
   * Add an emote count tracker if one does not exist, otherwise add to existing result
   *
   * @param userId
   * @param emoteId
   * @param add Amount of times emote used
   */
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

  /**
   * Save Multiple emotes and their respective counts at once (Not really)
   *
   * @param userId
   * @param emoteCounts
   */
  async saveOrUpdateEmoteCounts(
    userId: string,
    emoteCounts: SaveEmoteCountInput[]
  ) {
    asyncForEach(emoteCounts, async emote => {
      await this.saveOrUpdateEmoteCount(userId, emote.emoteId, emote.count);
    });
  }
}
