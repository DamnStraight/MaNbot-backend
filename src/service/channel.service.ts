import { ApolloError } from "apollo-server-core";
import { Service } from "typedi";
import Channel from "../entity/Channel";
import Guild from "../entity/Guild";
import AddChannelInput from "../modules/channel/input/AddChannelInput";
import appDebugger from "../util/appDebugger";

@Service()
export class ChannelService {
  private eventLogger = appDebugger("service", "channel", "event");
  private errorLogger = appDebugger("service", "channel", "error");

  /**
   * Add a set of channels to a provided guild
   *
   * @param guildId
   * @param channels
   */
  async addChannels(guildId: string, channels: AddChannelInput[]) {
    try {
      const guild = await Guild.findOne(guildId);

      if (!guild) throw new ApolloError("Guild doesn't exist");

      let newChannel;
      const newChannels: Channel[] = channels.map(channel => {
        newChannel = new Channel({
          id: channel.channelId,
          name: channel.name
        } as Channel);
        newChannel.guild = guild;
        return newChannel;
      });

      return await Channel.save(newChannels);
    } catch (err) {
      this.errorLogger(`Error in addChannels() - ${err}`);
      throw new ApolloError("Failed to add channels");
    }
  }
}
