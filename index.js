if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    client.user.setActivity('U WOT M8?', {type: 'WATCHING'});
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.login(process.env.TOKEN);
