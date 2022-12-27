import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import schedule from 'node-schedule';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN_BOT;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/start/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const welcomeMessage = "Benvenuto " + msg.chat.first_name + "!\nVai al sito per restare aggiornato su tutte le novita:\nhttp://www.sangioacchinopartinico.it"
  bot.sendMessage(chatId, welcomeMessage);

  schedule.scheduleJob('0 0 8 * * *', function(){
    const welcomeMessage = "Buongiorno " + msg.chat.first_name + "!\nClicca qui per maggiori informazioni:\nhttp://www.sangioacchinopartinico.it/orario-delle-messe"
    bot.sendMessage(chatId, welcomeMessage);
  });
  
  //scheduled Job to Happy Christmas
  schedule.scheduleJob('0 0 0 28 12 2022', function(){
    const welcomeMessage = "Buon Anno!"
    bot.sendMessage(chatId, welcomeMessage);
  });
    
});

bot.onText(/\/prova/, async (msg, match) => {

  bot.sendMessage(chatId, (new Date()).toDateString());
});


bot.onText(/\/orari/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  const chatId = msg.chat.id;
  const orari = "Ecco gli orari delle messe:\n\n- Giorni feriali -> 18:00\n- Messa della Vigilia (Sabato) -> 18:30\n- Giorni festivi -> 9:00/11:00/18:30\n\n"
  const welcomeMessage = "Clicca qui per maggiori informazioni:\nhttp://www.sangioacchinopartinico.it/orario-delle-messe"
  bot.sendMessage(chatId, orari + welcomeMessage);
});

bot.onText(/\/info/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const welcomeMessage = msg.chat.first_name + " vai al sito per restare aggiornato su tutte le novita:\nhttp://www.sangioacchinopartinico.it"
  bot.sendMessage(chatId, welcomeMessage);
});

// Matches "/echo [whatever]"
bot.onText(/\/eventi/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  try {
    fetch('http://localhost:3000/events').then(async res => {
        const json = await res.json();
        bot.sendMessage(chatId, json.events.toString());
    }).catch( err => {
        bot.sendMessage(chatId, "err");

    })

  } catch (error) {
    
  }



    //bot.sendMessage(chatId, res);


});

// Listen for any kind of message. There are different kinds of
// messages.
/*bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});*/