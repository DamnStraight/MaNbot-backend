import { InputType, Field } from "type-graphql";
import Message from "../../../entity/Message";

@InputType()
export class AddMessageInput {
  @Field()
  userId: string;

  @Field()
  channelId: string;

  @Field()
  userName: string;

  @Field()
  dateSent: string;

  @Field()
  profileImage: string;

  @Field()
  content: string;

  public toModel() {
    return new Message({
      userId: this.userId,
      content: this.content,
      channelId: this.channelId,
      userName: this.userName,
      dateSent: new Date(this.dateSent),
      profileImage: this.profileImage,
    } as Message);
  }
}
