const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require("discord-api-types/v10");
module.exports = {
    name: "clear",
    aliases: [],
    description: "Czyszczenie czatu",
    data:  function() {return new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .addIntegerOption(option =>
            option.setName("ilość").setDescription("Ilość wiadomości").setRequired(true).setMinValue(1).setMaxValue(50))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    },
    execute: async (interaction, client)=> {
        let number = interaction.options.getInteger("ilość");
        client.channels.cache.get(interaction.channelId).bulkDelete(number);
        interaction.reply({content: `Usunięto ${number} wiadomości`, ephemeral: true});
        return;
    },
}