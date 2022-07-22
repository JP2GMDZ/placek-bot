const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const settings = require("../settings.json");
const { PermissionFlagsBits } = require("discord-api-types/v10");
module.exports = {
    name: "embed",
    description: "Wysłanie embeda",
    data: function () {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption(option=>
                option.setName("tytuł").setDescription("Tytuł").setRequired(true)
            )
            .addStringOption(option=>
                option.setName("opis").setDescription("Wiadomość w embedzie").setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    },
    execute: async (interaction, client) => {
        let title = interaction.options.getString("tytuł");
        let desc = interaction.options.getString("opis");
        client.channels.cache.get(interaction.channelId).send({ embeds: [new Discord.EmbedBuilder().setTitle(title).setColor("Blurple").setDescription(desc)] });
        interaction.reply({content: "Pomyślnie wysałno embeda", ephemeral: true});
        return;
    }
}