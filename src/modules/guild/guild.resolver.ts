import { Resolver, Arg, Mutation } from "type-graphql";
import Guild from "../../entity/Guild";
import { GuildService } from "../../service/guild.service";

@Resolver(of => Guild)
export class GuildResolver {
  constructor(private readonly guildService: GuildService) {}

  @Mutation(returns => Guild, { nullable: true})
  async addGuild(@Arg("guildId", type => String) guildId: string, @Arg("name", type => String) name: string) {
    return await this.guildService.addGuild(guildId, name);
  }

}