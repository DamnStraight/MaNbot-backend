import { BaseEntity, Entity, PrimaryColumn, OneToMany, Column, ManyToMany, JoinTable } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import Channel from "./Channel";
import Emote from "./Emote";
import User from "./User";

@ObjectType()
@Entity()
export default class Guild extends BaseEntity {
  public constructor(data?: Guild) {
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
  @Column({ nullable: false })
  name: string;

  @Field(type => [Channel])
  @OneToMany(type => Channel, channel => channel.guild)
  channels: Channel[];

  @Field(type => [Emote])
  @OneToMany(type => Emote, emote => emote.guild)
  emotes: Emote[];

  @ManyToMany(type => User, user => user.guilds)
  @JoinTable()
  users: User[];
}