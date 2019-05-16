import { Resolver, Query, Arg, Int, Mutation } from "type-graphql";
import User from "../../entity/User";
import { UserService } from "../../service/user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { nullable: true })
  async user(@Arg("userId") userId: string): Promise<User | undefined> {
    return await this.userService.getOne(userId);
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await this.userService.getAll();
  }

  /**
   * Creates user if it doesn't exist, otherwise returns existing
   *
   * @param userId
   */
  @Mutation(returns => User, { nullable: true })
  async addUser(@Arg("userId") userId: string): Promise<User | null> {
    return await this.userService.addUser(userId);
  }

  @Mutation(returns => [User], { nullable: true })
  async addUsers(@Arg("guildId") guildId: string, @Arg("users", type => String) users: string[]) {
    return await this.userService.addUsers(guildId, users);
  }
}