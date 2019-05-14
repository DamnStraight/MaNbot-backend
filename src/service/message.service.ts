import { Service } from "typedi";
import Message from '../entity/Message';
import { ApolloError } from "apollo-server-core";

@Service()
export class MessageService {
  async addMessage(message: Message) {
    try {
       return await Message.save(message);
    } catch (err) {
      throw new ApolloError(" Error saving message");
    }
  }
}