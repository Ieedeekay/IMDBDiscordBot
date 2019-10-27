const Discord = require('discord.js');
const IMDB = require('imdb-api');

const client = new Discord.Client();
const apiKey = "1322d070"

// Prefix's
const searchPrefix = 'imdb!search ';

/**
 * Handles sent messages
 */
client.on('message', msg => {
    handleCommands(msg);
})

/**
 * Handles the possible commands in the message sent by a user
 * @param {Discord.Message} msg The message that was sent by the user
 */
const handleCommands = (msg) => {
    if (msg.content.startsWith(searchPrefix)) {
        IMDB.search({
            name: msg.content.substr(searchPrefix.length)
        }, {
            apiKey
        })
            .then(res => {
                IMDB.get({ id: res.results[0].imdbid }, { apiKey }).then(res => {
                    const { actors, director, imdbid, imdburl, languages, metascore, plot, poster, rating, title, type, writer, year }
                        = res;
                    const exampleEmbed = new Discord.RichEmbed()
                        .setColor('#F3FF00')
                        .setImage(poster)
                        .setTitle(title)
                        .setAuthor(director, '', imdburl)
                        .setDescription(plot)
                        .addBlankField()
                        .addField('Actors', actors, true)
                        .addField('Writers', writer , true)
                        .addBlankField()
                        .addField('Metascore', metascore, true)
                        .addField('Rating', rating, true)
                        .addField('Languages', languages, true)
                        .addField('Type', type, true)
                        .addField('IMDB ID', imdbid, true)
                        .addField('Year Released', year, true)
                        .setTimestamp()

                    msg.reply(exampleEmbed)
                    // msg.reply(res.results[0].title)
                })
            })
            .catch(err => {
                if (err.message.startsWith('Movie not found!:'))
                    msg.reply(" Sorry Pal, can't find it :shrug:")
            });
    }
}

/**
 * Handles when the client is ready and activated
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
})

client.login("NjM4MDI0OTgzNDA2MzEzNDcy.XbWtLQ.wXBKypV6g00xoLHfBGYgiKaiEj4");