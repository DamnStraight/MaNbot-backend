import {
  Resolver,
  Subscription,
  Mutation,
  Arg,
  PubSub,
  PubSubEngine,
  Root
} from "type-graphql";
import Message, { SubscriptionMessage } from "../../entity/Message";
import { MessageService } from "../../service/message.service";
import { AddMessageInput } from "./input/AddMessageInput";
import { MessagePayload } from "./payload/MessagePayload";

@Resolver(of => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Subscription(returns => SubscriptionMessage, { topics: "MESSAGES" })
  newMessage(@Root() messagePayload: MessagePayload) {
    return {
      userName: messagePayload.userName,
      content: messagePayload.content,
      dateSent: messagePayload.dateSent,
      profileImage: messagePayload.profileImage
    } as SubscriptionMessage;
  }

  @Mutation(returns => Message, { nullable: true })
  async addMessage(
    @Arg("data", type => AddMessageInput) data: AddMessageInput,
    @PubSub() pubSub: PubSubEngine
  ) {
    const message = await this.messageService.addMessage(data.toModel());
    await pubSub.publish("MESSAGES", message.toPayload());
  }
}
