// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token, prefix } = require('../config.json');
const { VideoDownloader } = require('./video_downloader.js');
const path = require('path');
const { resolve } = require('path/posix');
// import VideoDownloader from './video_downloader'

// Create a new client instance
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	] 
});

// When the client is ready, run this code (only once)
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in.`);
});


client.on('messageCreate', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command == 'hoje') {
		localPath = path.join('src', 'media', 'hoje-vai-ter-festinha.mp4');
		message.reply({
			files: [localPath]
		});
	} else if (command == 'juan') {
		localPath = path.join('src', 'media', 'juan.mp4');
		message.reply({
			files: [localPath]
		});
	}
	
	if (command === 'video') {
		if (args.length > 0) {
			isUrl = false;
			try {
				url = new URL(args[0]);
				if (url.host === 'www.youtube.com') {
					
					filePath = '';
					VideoDownloader(url.href, path).then(
						(res) => {
							setTimeout(() => {
								message.reply({
									files: [res]
								})
							}, 2500)
						})
					} else {
					message.reply({
						content: 'No momento, só consigo baixar vídeos do Youtube.'
					});
				}

			} catch (error) {
				message.reply({
					content: 'O primeiro parametro precisa ser uma URL, .video <URL>'
				});
			}
		}
	}
	
});


// https://www.youtube.com/watch?v=H9aC5AGY9YU

// Login to Discord with your client's token
client.login(token);