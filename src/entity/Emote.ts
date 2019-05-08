import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  BaseEntity
} from "typeorm";
import { EmoteCount } from "./EmoteCount";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export default class Emote extends BaseEntity {
  public constructor(data?: Emote) {
    super();
    if (data) {
      this.id = data.id;
      this.name = data.name;
    }
  }

  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ default: false })
  deleted: boolean;

  @Field()
  @CreateDateColumn({ name: "date_created" })
  createdDate: Date;

  @Field()
  @UpdateDateColumn({ name: "date_updated" })
  updatedDate: Date;

  @Field(type => [EmoteCount])
  @OneToMany(type => EmoteCount, emoteCount => emoteCount.emote)
  emoteCounts: EmoteCount[];
}