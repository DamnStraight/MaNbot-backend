import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import Emote from "./Emote";
import User from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class EmoteCount {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(type => Emote, emote => emote.emoteCounts)
  emote: Emote;

  @Field(type => User)
  @ManyToOne(type => User, user => user.emoteCounts)
  user: User;

  @Field()
  @CreateDateColumn({ name: "date_created" })
  createdDate: Date;

  @Field()
  @UpdateDateColumn({ name: "date_updated" })
  updatedDate: Date;

  @Field()
  @Column()
  count: number;
}
