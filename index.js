const { config } = require("dotenv");

const { Client, Collection, Partials, GatewayIntentBits, InteractionType } = require("discord.js");
const Discord = require('discord.js');
const fs = require("fs")
config({
    path: __dirname + "/.env"
});

const client = new Client({
    intents: [
       GatewayIntentBits.MessageContent,
       GatewayIntentBits.GuildMessages,
       GatewayIntentBits.Guilds,
       GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.User]
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
//slash commands
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const settings = require("./settings.json")
const clientId = settings.clientId;
const guildId = settings.guildId

const commands = [];
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.execute) commands.push(command.data().toJSON());
}
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
(async () => {
    try {
        console.log('Ładowanie komend slash(/).');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log('Pomyślnie załadowano komendy slash(/).');
    } catch (error) {
        console.error(error);
    }
})();

client.on("guildMemberAdd", (member)=>{
    const embed = new Discord.EmbedBuilder()
        .setTitle("Dołączył nowy użytkownik!")
        .setDescription(`**${member.user.username}#${member.user.discriminator}** dołączył do serwera, aktualnie na serwerze jest **${client.guilds.cache.get(settings.guildId).memberCount}** użytkowników!`)
        .setColor("Blurple");
    client.channels.cache.get(settings.welcomeChannel).send({ embeds: [embed] });
})

client.on("guildMemberRemove", (member)=>{
    const embed = new Discord.EmbedBuilder()
        .setTitle("Opuścił nas użytkownik!")
        .setDescription(`**${member.user.username}#${member.user.discriminator}** opuścił nasz serwer, aktualnie na serwerze jest **${client.guilds.cache.get(settings.guildId).memberCount}** użytkowników!`)
        .setColor("Blurple");
    client.channels.cache.get(settings.welcomeChannel).send({ embeds: [embed] });
})

client.on('interactionCreate', async interaction => {
    if (interaction.type!==InteractionType.ApplicationCommand) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania komendy', ephemeral: true });
    }
});


client.login(process.env.TOKEN)