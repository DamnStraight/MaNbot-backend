import { Entity, BaseEntity, PrimaryColumn, OneToMany, ManyToOne, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Message from "./Message";
import Guild from "./Guild";

@ObjectType()
@Entity()
export default class Channel extends BaseEntity {
  constructor(data?: Channel) {
    super();
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @ManyToOne(type => Guild, guild => guild.channels)
  guild: Guild;

  @Field(type => [Message])
  @OneToMany(type => Message, message => message.channel)
  messages: Message[];
}