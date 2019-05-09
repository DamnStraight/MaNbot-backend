import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import Emote from "../../entity/Emote";
import { EmoteService } from "../../service/emote.service";
import { AddEmoteInput } from '../../modules/emote/input/AddEmoteInput';

@Resolver(of => Emote)
export class EmoteResolver {
  constructor(private readonly emoteService: EmoteService) {}

  /**
   * Creates user if it doesn't exist, otherwise returns existing
   *
   * @param userId
   */
  @Mutation(returns => [Emote], { nullable: true })
  async addEmotes(@Arg("data") emotes: AddEmoteInput): Promise<Emote | null> {
    return null;
  }
}