import { InputType, Field } from "type-graphql";
import Channel from "../../../entity/Channel";

@InputType()
export default class AddChannelInput {
  @Field()
  channelId: string;

  @Field()
  name: string;

  public toModel(): Channel {
    return new Channel({
      id: this.channelId,
      name: this.name,
    } as Channel);
  }
}