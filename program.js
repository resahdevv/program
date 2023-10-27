const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
require("./config/setting");

module.exports = eza = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const fatkuns = (m.quoted || m);
    const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m;
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";


    if (autobio === true) {
      const targetDate = new Date("2023-10-31T00:00:00");
      const jakartaTimezone = 'Asia/Jakarta';
      const options = { timeZone: jakartaTimezone };

      // Tanggal dan waktu saat ini dalam zona waktu Asia/Jakarta
      const currentDate = new Date().toLocaleString('en-US', options);
      const currentDateObj = new Date(currentDate);
      
      // Hitung selisih waktu antara target dan saat ini
      const timeDifference = targetDate - currentDateObj;

      // Hitung hari, jam, menit, dan detik
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
      
      // Cek apakah sudah mencapai target
      if (timeDifference <= 0) {
        await client.updateProfileStatus(`Happy Birthday Sayang❤`);
      } else {
        await client.updateProfileStatus(`Beauty's Birthday❤ ${days}Hari->${hours}Jam->${minutes}Menit->${seconds}Detik`);
      }

    }

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgGreen("[ PESAN ]")), color(argsLog, "turquoise"), chalk.magenta("Dari"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ PESAN ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("Group"),
        chalk.green(groupName)
      );
    }

    if (isCmd2) {
      switch (command) {
        case "tiuplilin": {
          const reactionMessage = {
            react: {
              text: "💖", // use an empty string to remove the reaction
              key: quoted.key
            }
          }
          client.sendMessage(sender, reactionMessage);
          const imageFilePath = 'assets/kue.jpg'; // Gantilah dengan path gambar Anda.
          const caption = '_Ini kuenya ayang🎂_\n\n*[ NYANYI 🎉 ]*\nPANJANG UMURNYA PANJANG UMURNYA\nPANJANG UMURNYA SERTA MULIA\nSERTA MULIA SERTA MULIA\nSELAMAT ULANG TAHUN EZA UCAPKAN\nSELAMAT PANJANG UMUR EZA KAN DOAKAN\nSELAMAT SEJAHTERA SEHAT SENTOSA\nSELAMAT PANJANG UMUR DAN BAHAGIA\n\n*[ TIUP LILINYA 🕯 ]*\nTIUP LILINYA TIUP LILINYA\nTIUP LILINYA SEKARANG JUGA\nSEKARANG JUGA SEKARANG JUGA\n\n```Kalo mau tiup lilinya ketik``` *#tiup*';
          fs.readFile(imageFilePath, (error, data) => {
            if (error) {
              console.error('Gagal membaca file gambar:', error);
              return;
            }
            // Kirim gambar ke obrolan dengan caption.
            client.sendImage(m.chat, data, caption)
          });       
        }
        break;
        case "tiup" : {
          const reactionMessage = {
            react: {
              text: "🥰", // use an empty string to remove the reaction
              key: quoted.key
            }
          }
          await client.sendMessage(sender, reactionMessage);
          await client.sendMessage(sender, {text: '```Berhasil tiup lilinya❤️```'});
          setTimeout(function() {
            client.sendMessage(sender, {text: '```Ayang dapet kado dari eza🎁 tungguin yahh()\n\nLagi ngambil kado...```'});
          }, 5000); // Penundaan 5000 milidetik (5 detik)
          const imageFilePath = 'assets/kado.jpg'; // Gantilah dengan path gambar Anda.
          const caption = '_Ini kadonya 🎁 sayang kalo ayang mau buka_ ```Ketika aja``` #bukakado\n\n\n```Semoga ayang suka sama kadonya❣️```';
          fs.readFile(imageFilePath, (error, data) => {
            if (error) {
              console.error('Gagal membaca file gambar:', error);
              return;
            }
            setTimeout(function() {
              client.sendImage(m.chat, data, caption)
            }, 8000); // Penundaan 5000 milidetik (5 detik)
          });
        }
        break;
        case "bukakado" : {
          const reactionMessage = {
            react: {
              text: "🫶🏻", // use an empty string to remove the reaction
              key: quoted.key
            }
          }
          await client.sendMessage(sender, reactionMessage);
          const imageFilePath = 'assets/isi_kado.jpg'; // Gantilah dengan path gambar Anda.
          const caption = '```Makasih Yah Sayangggg```';
          fs.readFile(imageFilePath, (error, data) => {
            if (error) {
              console.error('Gagal membaca file gambar:', error);
              return;
            }
            reply('```Lagi buka kado buat ayang...```')
            setTimeout(function() {
              client.sendImage(m.chat, data, caption)
            }, 5000); // Penundaan 5000 milidetik (5 detik)
            setTimeout(function() {
              client.sendMessage(sender, {text: '```Acara selesai jangan lupa bbo ayang```'})
            }, 10000); // Penundaan 5000 milidetik (5 detik)
          });
        }
        break;
        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("COMMAND", "cyan"), color(`${prefix}${command}`, "turquoise"), color("NOT FOUND", "red"));
              client.sendMessage(m.chat, {text: `*_Command Tidak Tersedia Silahkan Ketik ${prefix}menu Untuk Menampilkan Menu Yang Tersedia Terimakasih!..._*`})
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("COMMAND", "cyan"), color(`${prefix}${command}`, "turquoise"), color("NOT FOUND", "red"));
              client.sendMessage(m.chat, {text: `*_Command Tidak Tersedia Silahkan Ketik ${prefix}menu Untuk Menampilkan Menu Yang Tersedia Terimakasih!..._*`})
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
