const { Telegraf } = require('telegraf')
const { Airgram, Auth, prompt } = require('airgram')
const app = require('express')()
const axios = require('axios').default

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
        await axios.get('http://metodosemprerico.kinghost.net:21563/revive')
        await ctx.reply('Sempre Rico reviveu MANUALMENTE')
        console.log('Sempre Rico reviveu MANUALMENTE')
    } catch (err) {
        await ctx.reply('Sempre Rico não conseguiu reviver MANUALMENTE')
        console.log('Erro ao reviver Sempre Rico MANUALMENTE', err)
    }
})

bot.command('ww', async ctx => {
    try {
        console.log('Revivendo Win ou Win MANUALMENTE')
        await axios.get('https://serene-dusk-48270.herokuapp.com/revive')
        await ctx.reply('Win ou Win reviveu MANUALMENTE')
        console.log('Win ou Win reviveu MANUALMENTE')
    } catch (err) {
        await ctx.reply('Win ou Win não conseguiu reviver MANUALMENTE')
        console.log('Erro ao reviver Win ou Win MANUALMENTE', err)
    }
})

bot.launch()

  setInterval(async () => {
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
                await axios.get('http://metodosemprerico.kinghost.net:21563/revive')
                await bot.telegram.sendMessage(721557882, 'Sempre Rico reviveu')
                console.log('Sempre Rico reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Sempre Rico não conseguiu reviver')
                console.log('Erro ao reviver Sempre Rico', err)
            }
        }
      }

      try {
        await airgram.api.sendMessage({chatId: 1282624834, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseWinOuWin()
        console.log('DEU BOM WIN OU WIN')
      } catch (err) {
        if (!messageWinOuWinAnswered) {
            await bot.telegram.sendMessage(721557882, 'Win Ou Win não respondendo')
            console.log('DEU RUIM WIN OU WIN')
            try {
                console.log('Revivendo Win ou Win')
                await axios.get('https://4e7620c23911.ngrok.io/revive')
                await bot.telegram.sendMessage(721557882, 'Win ou Win reviveu')
                console.log('Win ou Win reviveu')
            } catch (err) {
                await bot.telegram.sendMessage(721557882, 'Win ou Win não conseguiu reviver')
                console.log('Erro ao reviver Win ou Win', err)
            }
        }
      }
    }, 300000)

    const promiseTraderInfalivel = () => (new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('DENTRO DA PROMISE', messageTraderInfalivelAnswered)
            if (messageTraderInfalivelAnswered) {
                messageTraderInfalivelAnswered = false
                resolve()
            } else {
                reject()
            }
        }, 30000)
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
        }, 30000)
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
        }, 30000)
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
        if (ctx.update.message.chatId == 1282624834 && ctx.update.message.content._ === 'messageText' && ctx.update.message.content.text.text.startsWith('Olá, sou')) {
            console.log('RECEBENDO RESPOSTA DE WIN OU WIN')
            messageWinOuWinAnswered = true
        }
    }
    return next()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))