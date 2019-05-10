import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity
} from "typeorm";
import Emote from "./Emote";
import User from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class EmoteCount extends BaseEntity {
  public constructor(data?: EmoteCount) {
    super();
    if (data) {
      this.emote = data.emote;
      this.user = data.user;
      this.count = data.count || 0;
    }
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ManyToOne(typeOf => Emote, emote => emote.emoteCounts)
  emote: Emote;

  @Field(typeOf => User)
  @ManyToOne(typeOf => User, user => user.emoteCounts)
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

  addCount(add: number) {
    this.count += add;
  }
}
