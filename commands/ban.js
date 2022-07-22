const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const settings = require("../settings.json");
const { PermissionFlagsBits } = require("discord-api-types/v10");
module.exports = {
    name: "ban",
    description: "Zbanowanie użytkonwika",
    data: function () {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption(option =>
                option.setName("użytkownik").setDescription("Oznaczenie użytkownika").setRequired(true))
            .addStringOption(option=>
                option.setName("powód").setDescription("Powód").setRequired(false))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    },
    execute: async (interaction, client) => {
        let member = interaction.options.getMember("użytkownik");
        let reason = interaction.options.getString("powód") || "Nie podano powodu";
        interaction.reply({embeds: [new Discord.EmbedBuilder().setTitle("Zbanowano użytkownika").setColor("Blurple").setDescription(`Zbanowano użytkownika ${member} za ${reason}`)], ephemeral: true })
        member.ban({reason: reason}).catch(err=>console.log(err));
        return;
    }
}