import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { EmoteCount } from "./EmoteCount";
import { ObjectType, Field, ID } from "type-graphql";
import Guild from "./Guild";

@ObjectType()
@Entity()
export default class Emote extends BaseEntity {
  public constructor(data?: Emote) {
    super();
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.guild = data.guild;
    }
  }

  @Field()
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

  @Field(type => Guild)
  @ManyToOne(type => Guild, guild => guild.emotes)
  guild: Guild;
}
