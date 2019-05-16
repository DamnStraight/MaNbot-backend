import { ApolloError } from "apollo-server-core";
import { Service } from "typedi";
import Message from "../entity/Message";
import appDebugger from "../util/appDebugger";

@Service()
export class MessageService {
  private eventLogger = appDebugger("service", "message", "event");
  private errorLogger = appDebugger("service", "message", "error");

  /**
   * Save a new discord message including the posting user's details
   *
   * @param message
   */
  async addMessage(message: Message) {
    try {
      const newMessage = await Message.save(message);

      this.eventLogger(`Successfully ran addMessage()`);

      return newMessage;
    } catch (err) {
      this.errorLogger(`Error adding a message in addMessage() - ${err}`);
      throw new ApolloError(" Error saving message");
    }
  }
}
