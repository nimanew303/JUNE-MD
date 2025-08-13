const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/nimanew303/NIMA-V5-new');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = 
           `🔸  \`NIMA-V5 𝙸𝙽𝙵𝙾.\` \n\n`;
    txt += `🔸  *Name* : ${json.name}\n`;
    txt += `🔸  *Watchers* : ${json.watchers_count}\n`;
    txt += `🔸  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `🔸  *Last Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
    txt += `🔸  *REPO* : ${json.html_url}\n`;
    txt += `🔸  *Forks* : ${json.forks_count}\n`;
    txt += `🔸  *Stars* : ${json.stargazers_count}\n`;
    txt += `🔸  කරුණාකර තරුව rate කිරීමට කරුණාවන්ත වන්න⭐ \n\n`;
    txt += `> _⎋NIMA-V5_`;

    // Use the local asset image
    const imgPath = path.join(__dirname, '../assets/june_repos.jpg');
    const imgBuffer = fs.readFileSync(imgPath);

    await sock.sendMessage(chatId, { image: imgBuffer, caption: txt }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: '❌ අසාර්ථකයි. නැවත උත්සහ කරන්න.' }, { quoted: message });
  }
}

module.exports = githubCommand; 
