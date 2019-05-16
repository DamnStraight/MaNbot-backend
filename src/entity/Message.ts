import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  JoinColumn
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import User from "./User";
import Channel from "./Channel";
import { MessagePayload } from "src/modules/message/payload/MessagePayload";

@ObjectType()
@Entity()
export default class Message extends BaseEntity {
  public constructor(data?: Message) {
    super();
    if (data) {
      this.userId = data.userId;
      this.content = data.content;
      this.dateSent = data.dateSent;
      this.channelId = data.channelId;
      this.profileImage = data.profileImage;
      this.userName = data.userName;
    }
  }

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateSent: Date;

  @Column()
  userName: string;

  @Column()
  profileImage: string;

  @Column({ type: "string" })
  channelId: string;

  @Field(type => Channel)
  @ManyToOne(type => Channel, channel => channel.messages)
  @JoinColumn({ name: "channelId" })
  channel: Channel;

  @Column({ type: "string" })
  userId: string;

  @Field(typeOf => User)
  @ManyToOne(type => User, user => user.messages)
  @JoinColumn({ name: "userId" })
  user: User;

  @Field()
  @Column({ type: "text" })
  content: string;

  @Field()
  @CreateDateColumn({ name: "date_created" })
  createDate: Date;

  @Field()
  @UpdateDateColumn({ name: "date_updated" })
  updateDate: Date;

  toPayload(): MessagePayload {
    return {
      userName: this.userName,
      profileImage: this.profileImage,
      content: this.content,
      dateSent: this.dateSent,
      channelId: this.channelId
    } as MessagePayload;
  }
}

@ObjectType()
export class SubscriptionMessage {
  @Field()
  userName: string;
  @Field()
  profileImage: string;
  @Field()
  content: string;
  @Field()
  dateSent: Date;
}
