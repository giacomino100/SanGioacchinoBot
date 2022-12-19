import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';


// replace the value below with the Telegram token you receive from @BotFather
const token = '5696084881:AAHognvG1xaAkfLjciD40mU3SQZVsDcDIdQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/start/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const welcomeMessage = "Benvenuto " + msg.chat.first_name + "\nVai al sito per restare aggiornato su tutte le novita: http://www.sangioacchinopartinico.it"
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