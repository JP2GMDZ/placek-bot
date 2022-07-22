const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const settings = require("../settings.json");
const { PermissionFlagsBits } = require("discord-api-types/v10");
module.exports = {
    name: "mute",
    description: "Wyciszenie użytkownika",
    data: function () {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption(option =>
                option.setName("użytkownik").setDescription("Oznaczenie użytkownika").setRequired(true))
            .addNumberOption(option =>
                option.setName("czas").setDescription("Czas wyciszenia").setRequired(true)
                .addChoices(
                    { name: "5m", value: 5 * 60 * 1000},
                    { name: "10m", value: 10 * 60 * 1000},
                    { name: "30m", value: 30 * 60 * 1000},
                    { name: "1h", value: 60 * 60 * 1000},
                    { name: "6h", value: 6 * 60 * 60 * 1000},
                    { name: "12h", value: 12 * 60 * 60 * 1000},
                    { name: "1d", value: 24 * 60 * 60 * 1000}
                ))
            .addStringOption(option=>
                option.setName("powód").setDescription("Powód wyciszenia").setRequired(false))    
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    },
    execute: async (interaction, client) => {
        let member = interaction.options.getMember("użytkownik");
        let reason = interaction.options.getString("powód") || "Nie podano powodu";
        let time = interaction.options.get("czas").value;
        interaction.reply({ embeds: [new Discord.EmbedBuilder().setTitle("Wyciszono użytkownika").setColor("Blurple").setDescription(`Wyciszono użytkownika ${member}`)], ephemeral: true })
        await member.timeout(time, reason).catch(err=>console.log(err));

        return;
    }
}