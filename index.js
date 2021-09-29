require('./us2gb');
require('./exclusions');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const toBritish = (text) => {
    const oldParts = text.split(' ');
    let newParts = [];
    oldParts.forEach((word) => {
        word = word.toLowerCase();
        word = us2gb[word] || word;
        if (!exclusions.includes(word)) {
            if (word.endsWith('er')) {
                word = word.slice(0, -2) + 'uh';
            }
            if (word.startsWith('t') || word.startsWith(':') || word.endsWith('t')) {
                let firstLetter = word.slice(0, 1);
                let lastLetter = word.slice(-1);
                word = firstLetter + word.slice(1, -1).replaceAll('t', "\'") + lastLetter;
            } else {
                word = word.replaceAll('t', "\'");
            }
            if (word.endsWith('f')) {
                word = word.slice(0, -1) + "\'";
            }
        }
        newParts.push(word.toUpperCase());
    });
    return ':flag_gb: ' + newParts.join(' ');
}

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    client.user.setActivity('Ur fcking messages', {type: 'WATCHING'});
});

client.on('messageCreate', async msg => {
    if (!msg.content.startsWith(process.env.PREFIX)) return;
    const args = msg.content.slice(process.env.PREFIX.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    const messages = await msg.channel.messages.fetch({ limit: 2 });
    const lastMessage = messages.last().content;

    if (command === 'britbot') {
        if (args.length > 0) {
            msg.channel.send(toBritish(args.join(' ')));
        } else {
            if (!lastMessage.startsWith('!') && !lastMessage.startsWith(':flag_gb:')) {
                msg.channel.send(toBritish(lastMessage));
            } else {
                msg.channel.send(':flag_gb: U FCKIN WOT M8?');
            }
        }
    }
});

client.login(process.env.TOKEN);
