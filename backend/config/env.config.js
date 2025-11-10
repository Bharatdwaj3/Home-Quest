require('dotenv').config();


const PORT = process.env.PORT || 5000;
const SESSION_SECRECT = process.env.SESSION_SECRECT || 'defaultSessionsecret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rooms';

const JWT_SECRECT = process.env.JWT_SECRECT || 'defaultjwtsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const GOOGLE_CLIENT_SECRET=process.env.Google_CLIENT_SECRET || 'someSerect';
const GOOGLE_CALLBACK_URI=process.Google_CALLBACK_URI || 'someUri';
const GOOGLE_CLIENT_ID=process.env.Google_CLIENT_ID || 'SomeID';

const DISCORD_CLIENT_SECRET=process.env.Discord_CLIENT_SECRET || 'someSerect';
const DISCORD_CALLBACK_URI=process.env.Discord_CALLBACK_URI || 'someUri';
const DISCORD_CLIENT_ID=process.env.Discord_CLIENT_ID || 'SomeID';

module.exports = {  
    PORT, MONGO_URI, SESSION_SECRECT, 
    JWT_SECRECT, JWT_EXPIRES_IN,
    GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URI, GOOGLE_CLIENT_ID,
    DISCORD_CLIENT_SECRET, DISCORD_CALLBACK_URI, DISCORD_CLIENT_ID

};