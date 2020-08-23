const { Telegraf } = require('telegraf')
const { Airgram, Auth, prompt } = require('airgram')
const app = require('express')()

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

  const promiseTraderInfalivel = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('DENTRO DA PROMISE', messageTraderInfalivelAnswered)
        if (messageTraderInfalivelAnswered) {
            messageTraderInfalivelAnswered = false
            resolve()
        } else {
            reject()
        }
    }, 30000)
});

const promiseSempreRico = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('DENTRO DA PROMISE', messageSempreRicoAnswered)
        if (messageSempreRicoAnswered) {
            messageSempreRicoAnswered = false
            resolve()
        } else {
            reject()
        }
    }, 30000)
});

  setInterval(async () => {
      try {
        await airgram.api.sendMessage({chatId: 1206925936, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseTraderInfalivel
        await airgram.api.sendMessage({chatId: 1122807041, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
        await promiseSempreRico
        console.log('DEU BOM')
      } catch (err) {
        if (!messageTraderInfalivelAnswered) {
            bot.telegram.sendMessage(721557882, 'Trader Infalível não respondendo')
            console.log('DEU RUIM')
        }
        if (!messageSempreRicoAnswered) {
            bot.telegram.sendMessage(721557882, 'Sempre Rico não respondendo')
            console.log('DEU RUIM')
        }
      }
    }, 600000)

airgram.on('updateNewMessage', (ctx, next) => {
    if (!ctx.update.message.isOutgoing) {
        if (ctx.update.message.chatId === 1206925936) {
            messageTraderInfalivelAnswered = true
        }
        if (ctx.update.message.chatId === 1122807041) {
            messageSempreRicoAnswered = true
        }
    }
    return next()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))