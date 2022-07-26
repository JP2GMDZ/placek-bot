const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const settings = require("../settings.json");
const { PermissionFlagsBits } = require("discord-api-types/v10");
module.exports = {
    name: "kick",
    description: "Wyrzucenie użytkonwika",
    data: function () {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption(option =>
                option.setName("użytkownik").setDescription("Oznaczenie użytkownika").setRequired(true))
            .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    },
    execute: async (interaction, client) => {
        let member = interaction.options.getMember("użytkownik");
        interaction.reply({embeds: [new Discord.EmbedBuilder().setTitle("Wyrzucono użytkownika").setColor("Blurple").setDescription(`Wyrzucono użytkownika ${member}`)], ephemeral: true })
        member.kick();
        return;
    }
}