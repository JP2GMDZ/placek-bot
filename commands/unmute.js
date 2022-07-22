const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const settings = require("../settings.json");
const { PermissionFlagsBits } = require("discord-api-types/v10");
module.exports = {
    name: "unmute",
    description: "Odciszenie użytkownika",
    data: function () {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption(option =>
                option.setName("użytkownik").setDescription("Oznaczenie użytkownika").setRequired(true)) 
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    },
    execute: async (interaction, client) => {
        let member = interaction.options.getMember("użytkownik");
        interaction.reply({ embeds: [new Discord.EmbedBuilder().setTitle("Odciszono użytkownika").setColor("Blurple").setDescription(`Odciszono użytkownika ${member}`)], ephemeral: true })
        await member.timeout(1).catch(err=>console.log(err));
        return;
    }
}