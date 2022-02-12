import { Client } from 'discord.js';

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'DIRECT_MESSAGES']
}).once('ready', () => console.log('✅ Thor Music Bot is ready!'));

export default client;
