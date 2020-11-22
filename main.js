const { Telegraf } = require('telegraf')
const { Airgram, Auth, prompt } = require('airgram')
const app = require('express')()
const axios = require('axios').default
const mysql = require('mysql2');
const util = require('util');
const dotenv = require('dotenv').config()

const bot = new Telegraf('1383007158:AAHhiSvbgH6jYnwlH2c4_PZnIYH-uhTKnl8')

const airgram = new Airgram({
  apiId: 1485371,
  apiHash: "662c661df7d0b41601f6cb8ae2ef35d6",
  command: "./libtdjson.so",
  logVerbosityLevel: 0
})

airgram.use(new Auth({
  code: () => prompt('Insira por favor o código enviado pro seu Telegram:'),
  phoneNumber: () => prompt('Insira por favor seu telefone no formato internacional:')
}))

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dateStrings: true
    })

    connection.connect(function(err) {             
      if(err) {                                     
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                    
    });                                     
                                            
    connection.on('error', function(err) {
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                                  
      }
    });
  }

void (async function () {
    const { response: chats } = await airgram.api.getChats({
      limit: 10,
      offsetChatId: 0,
      offsetOrder: '9223372036854775807'
    })
    console.log('[My chats] ', chats)
  })()

  let messageSempreRicoAnswered = false;
  let messageTraderInfalivelAnswered = false;
  let messageWinOuWinAnswered = false;
  let messageSempreRicoTestAnswered = false;
  let messageSempreRicoFreeAnswered = false;

  bot.command('mti', async ctx => {
    try {
        console.log('Revivendo Trader Infalível MANUALMENTE')
        await axios.get('http://metodotraderinfalivel.kinghost.net:21571/revive')
        await ctx.reply('Trader Infalível reviveu MANUALMENTE')
        console.log('Trader Infalível reviveu')
    } catch (err) {
        await ctx.reply('Trader Infalível não conseguiu reviver MANUALMENTE')
        console.log('Erro ao reviver Trader Infalível MANUALMENTE', err)
    }
})

bot.command('msr', async ctx => {
    try {
        console.log('Revivendo Sempre Rico MANUALMENTE')
        await axios.get('http://bot.sosvestibular.com/Health/revive')
        await ctx.reply('Sempre Rico reviveu MANUALMENTE')
        console.log('Sempre Rico reviveu MANUALMENTE')
    } catch (err) {
        await ctx.reply('Sempre Rico não conseguiu reviver MANUALMENTE')
        console.log('Erro ao reviver Sempre Rico MANUALMENTE', err)
    }
})

bot.command('ww', async ctx => {
    const query = util.promisify(connection.query).bind(connection)
    const [response] = await query(`select url from URLs where id=1`);
    const url = response.url
    console.log(url)
    try {
        console.log('Revivendo Win ou Win MANUALMENTE')
        await axios.get(`${url}/revive`)
        await ctx.reply('Win ou Win reviveu MANUALMENTE')
        console.log('Win ou Win reviveu MANUALMENTE')
    } catch (err) {
        await ctx.reply('Win ou Win não conseguiu reviver MANUALMENTE')
        console.log('Erro ao reviver Win ou Win MANUALMENTE', err)
    }
})

bot.command('msrf', async ctx => {
    try {
        console.log('Revivendo Sempre Rico Gratuito MANUALMENTE')
        await axios.get('http://bot.sosvestibular.com/HealthGratuito/revive')
        await ctx.reply('Sempre Rico Gratuito reviveu MANUALMENTE')
        console.log('Sempre Rico Gratuito reviveu MANUALMENTE')
    } catch (err) {
        await ctx.reply('Sempre Rico Gratuito não conseguiu reviver MANUALMENTE')
        console.log('Erro ao reviver Sempre Rico Gratuito MANUALMENTE', err)
    }
})


bot.launch()

  setInterval(async () => {
      handleDisconnect();

      console.log('COMECOU A ENVIAR MENSAGENS')
      try {
        await airgram.api.sendMessage({chatId: 980218936, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseTraderInfalivel()
        console.log('DEU BOM TRADER INFALIVEL')
      } catch (err) {
        if (!messageTraderInfalivelAnswered) {
            await bot.telegram.sendMessage(721557882, 'Trader Infalível não respondendo')
            console.log('DEU RUIM TRADER INFALIVEL')
            try {
                console.log('Revivendo Trader Infalível')
                await axios.get('http://metodotraderinfalivel.kinghost.net:21571/revive')
                await bot.telegram.sendMessage(721557882, 'Trader Infalível reviveu')
                console.log('Trader Infalível reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Trader Infalível não conseguiu reviver')
                console.log('Erro ao reviver Trader Infalível', err)
            }
        }
      }

      try {
        await airgram.api.sendMessage({chatId: 1122807041, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseSempreRico()
        console.log('DEU BOM SEMPRE RICO')
      } catch (err) {
        if (!messageSempreRicoAnswered) {
            await bot.telegram.sendMessage(721557882, 'Sempre Rico não respondendo')
            console.log('DEU RUIM SEMPRE RICO')
            try {
                console.log('Revivendo Sempre Rico')
                await axios.get('http://bot.sosvestibular.com/Health/revive')
                await bot.telegram.sendMessage(721557882, 'Sempre Rico reviveu')
                console.log('Sempre Rico reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Sempre Rico não conseguiu reviver')
                console.log('Erro ao reviver Sempre Rico', err)
            }
        }
      }

      try {
        await airgram.api.sendMessage({chatId: 1491828853, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseSempreRicoGratuito()
        console.log('DEU BOM SEMPRE RICO GRATUITO')
      } catch (err) {
        if (!messageSempreRicoAnswered) {
            await bot.telegram.sendMessage(721557882, 'Sempre Rico Gratuito não respondendo')
            console.log('DEU RUIM SEMPRE RICO GRATUITO')
            try {
                console.log('Revivendo Sempre Rico Gratuito')
                await axios.get('http://bot.sosvestibular.com/HealthGratuito/revive')
                await bot.telegram.sendMessage(721557882, 'Sempre Rico Gratuito reviveu')
                console.log('Sempre Rico Gratuito reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Sempre Rico Gratuito não conseguiu reviver')
                console.log('Erro ao reviver Sempre Rico Gratuito', err)
            }
        }
      }

      try {
        await airgram.api.sendMessage({chatId: 1268417828, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseSempreRicoTeste()
        console.log('DEU BOM TESTE SEMPRE RICO')
      } catch (err) {
        if (!messageSempreRicoAnswered) {
            await bot.telegram.sendMessage(721557882, 'Teste Sempre Rico não respondendo')
            console.log('DEU RUIM TESTE SEMPRE RICO')
            try {
                console.log('Revivendo Teste Sempre Rico')
                await axios.get('http://bot.sosvestibular.com/HealthTeste/revive')
                await bot.telegram.sendMessage(721557882, 'Teste Sempre Rico reviveu')
                console.log('Teste Sempre Rico reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Teste Sempre Rico não conseguiu reviver')
                console.log('Erro ao reviver Teste Sempre Rico', err)
            }
        }
      }

      let url;
      try {
        const query = util.promisify(connection.query).bind(connection)
        const [response] = await query(`select url from URLs where id=1`);
        url = response.url
        console.log(url)
        await airgram.api.sendMessage({chatId: 1282624834, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseWinOuWin()
        console.log('DEU BOM WIN OU WIN')
      } catch (err) {
        if (!messageWinOuWinAnswered) {
            await bot.telegram.sendMessage(721557882, 'Win Ou Win não respondendo')
            console.log('DEU RUIM WIN OU WIN')
            try {
                console.log('Revivendo Win ou Win')
                await axios.get(`${url}/revive`)
                await bot.telegram.sendMessage(721557882, 'Win ou Win reviveu')
                console.log('Win ou Win reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Win ou Win não conseguiu reviver')
                console.log('Erro ao reviver Win ou Win', err)
            }
        }
      }
    }, 180000)

    const promiseTraderInfalivel = () => (new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DENTRO DA PROMISE', messageTraderInfalivelAnswered)
            if (messageTraderInfalivelAnswered) {
                messageTraderInfalivelAnswered = false
                resolve()
            } else {
                reject()
            }
        }, 10000)
    }));
    
    const promiseSempreRico = () => (new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DENTRO DA PROMISE', messageSempreRicoAnswered)
            if (messageSempreRicoAnswered) {
                messageSempreRicoAnswered = false
                resolve()
            } else {
                reject()
            }
        }, 10000)
    }));

    const promiseSempreRicoGratuito = () => (new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DENTRO DA PROMISE', messageSempreRicoFreeAnswered)
            if (messageSempreRicoFreeAnswered) {
                messageSempreRicoFreeAnswered = false
                resolve()
            } else {
                reject()
            }
        }, 10000)
    }));

    const promiseSempreRicoTeste = () => (new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DENTRO DA PROMISE', messageSempreRicoTestAnswered)
            if (messageSempreRicoTestAnswered) {
                messageSempreRicoTestAnswered = false
                resolve()
            } else {
                reject()
            }
        }, 10000)
    }));

    const promiseWinOuWin = () => (new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DENTRO DA PROMISE', messageWinOuWinAnswered)
            if (messageWinOuWinAnswered) {
                messageWinOuWinAnswered = false
                resolve()
            } else {
                reject()
            }
        }, 10000)
    }));


airgram.on('updateNewMessage', (ctx, next) => {
    if (!ctx.update.message.isOutgoing) {
        if (ctx.update.message.chatId == 980218936 && ctx.update.message.content._ === 'messageText' && ctx.update.message.content.text.text.startsWith('Olá, sou')) {
            console.log('RECEBENDO RESPOSTA DE TRADER INFALIVEL')
            messageTraderInfalivelAnswered = true
        }
        if (ctx.update.message.chatId == 1122807041 && ctx.update.message.content._ === 'messageText' && ctx.update.message.content.text.text.startsWith('Olá, sou')) {
            console.log('RECEBENDO RESPOSTA DE TRADER SEMPRE RICO')
            messageSempreRicoAnswered = true
        }
        if (ctx.update.message.chatId == 1491828853 && ctx.update.message.content._ === 'messageText' && ctx.update.message.content.text.text.startsWith('Olá, sou')) {
            console.log('RECEBENDO RESPOSTA DE TRADER SEMPRE RICO GRATUITO')
            messageSempreRicoFreeAnswered = true
        }
        if (ctx.update.message.chatId == 1268417828 && ctx.update.message.content._ === 'messageText' && ctx.update.message.content.text.text.startsWith('Olá, sou')) {
            console.log('RECEBENDO RESPOSTA DE TESTE TRADER SEMPRE RICO')
            messageSempreRicoTestAnswered = true
        }
        if (ctx.update.message.chatId == 1282624834 && ctx.update.message.content._ === 'messageText' && ctx.update.message.content.text.text.startsWith('Olá, sou')) {
            console.log('RECEBENDO RESPOSTA DE WIN OU WIN')
            messageWinOuWinAnswered = true
        }
    }
    return next()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))