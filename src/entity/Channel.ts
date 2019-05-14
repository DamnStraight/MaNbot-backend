import { Entity, BaseEntity, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Message from "./Message";
import Guild from "./Guild";

@ObjectType()
@Entity()
export default class Channel extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @ManyToOne(type => Guild, guild => guild.channels)
  guild: Guild;

  @Field(type => [Message])
  @OneToMany(type => Message, message => message.channel)
  messages: Message[];
}