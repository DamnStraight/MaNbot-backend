import { Resolver, Mutation, Arg } from "type-graphql";
import Channel from "../../entity/Channel";
import { ChannelService } from "../../service/channel.service";
import AddChannelInput from "./input/AddChannelInput";

@Resolver(of => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(returns => [Channel])
  async addChannels(
    @Arg("guildId") guildId: string,
    @Arg("channels", returns => [AddChannelInput]) channels: [AddChannelInput]
  ) {
    return await this.channelService.addChannels(guildId, channels);
  }
}
