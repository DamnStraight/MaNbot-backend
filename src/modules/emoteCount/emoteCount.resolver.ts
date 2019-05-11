import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import { EmoteCount } from "../../entity/EmoteCount";
import { EmoteCountService } from "../../service/emoteCount.service";
import { SaveEmoteCountInput } from "./input/SaveEmoteCountInput";

@Resolver(of => EmoteCount)
export class EmoteCountResolver {
  constructor(private readonly emoteCountService: EmoteCountService) {}

  @Query(returns => EmoteCount, { nullable: true })
  async emoteCount(
    @Arg("userId") userId: string,
    @Arg("emoteId") emoteId: string
  ): Promise<EmoteCount | null> {
    return await this.emoteCountService.getByUserIdEmoteId(userId, emoteId);
  }

  @Mutation(returns => EmoteCount, { nullable: true })
  async saveEmoteCount(
    @Arg("userId") userId: string,
    @Arg("emoteId") emoteId: string,
    @Arg("add", type => Int) add: number
  ) {
    return await this.emoteCountService.saveOrUpdateEmoteCount(
      userId,
      emoteId,
      add
    );
  }

  @Mutation(returns => EmoteCount, { nullable: true })
  async saveEmoteCounts(
    @Arg("userId") userId: string,
    @Arg("data", type => [SaveEmoteCountInput])
    emoteCounts: SaveEmoteCountInput[]
  ) {
    return await this.emoteCountService.saveOrUpdateEmoteCounts(
      userId,
      emoteCounts
    );
  }
}
