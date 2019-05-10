import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  BaseEntity
} from "typeorm";
import { EmoteCount } from "./EmoteCount";
import { ObjectType, Field } from "type-graphql";

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
}
