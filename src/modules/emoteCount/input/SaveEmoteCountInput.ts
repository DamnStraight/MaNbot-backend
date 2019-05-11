import { InputType, Field, Int } from "type-graphql";

@InputType()
export class SaveEmoteCountInput {
  @Field()
  emoteId: string;

  @Field(type => Int)
  count: number;
}