import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  BaseEntity,
  ManyToMany
} from "typeorm";
import { EmoteCount } from "./EmoteCount";
import { ObjectType, Field } from "type-graphql";
import Message from "./Message";
import Guild from "./Guild";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  public constructor(data?: string) {
    super();
    if (data) this.id = data;
  }

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @CreateDateColumn({ name: "date_created" })
  createdDate: Date;

  @Field()
  @UpdateDateColumn({ name: "date_updated" })
  updatedDate: Date;

  @Field(type => [EmoteCount])
  @OneToMany(type => EmoteCount, emoteCount => emoteCount.user)
  emoteCounts: EmoteCount[];

  @Field(type => [Message])
  @OneToMany(type => Message, message => message.user, { lazy: true })
  messages: Promise<Message[]>;

  @ManyToMany(type => Guild, guild => guild.users)
  guilds: Guild[];
}