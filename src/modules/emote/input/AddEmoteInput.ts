import { InputType, Field } from "type-graphql";

@InputType()
export class AddEmoteInput {
  @Field()
  id: string;

  @Field()
  name: string;
}