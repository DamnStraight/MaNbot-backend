import { Resolver, Query, Arg, Int } from "type-graphql";
import User from "../../entity/User";
import { UserService } from "../../service/user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(type => User, { nullable: true })
  async user(@Arg("userId", () => Int) userId: number) {
    return await this.userService.getOne(userId);
  }

  @Query(type => [User])
  async users() {
    return await this.userService.getAll();
  }
}
