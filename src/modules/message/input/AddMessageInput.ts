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
  dateSent: Date;

  @Field()
  profileImage: string;

  @Field()
  content: string;

  public toModel() {
    return new Message({
      userId: this.userId,
      content: this.content
    } as Message);
  }
}
