if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    client.user.setActivity('U WOT M8?', {type: 'WATCHING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX)) return;
    const args = msg.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(command);

    if (command === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(process.env.TOKEN);
