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

  let messageAnswered = false;

  setInterval(() => {
    airgram.api.sendMessage({chatId: 1206925936, inputMessageContent: {_: 'inputMessageText', text: {_: 'formattedText', text: 'Oi'} }})
    .then(res => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (messageAnswered) {
                    messageAnswered = false
                    resolve()
                } else {
                    reject()
                }
            }, 30000)
        });
    })
    .then(res => console.log('DEU BOM'))
    .catch(err => {
        bot.telegram.sendMessage(721557882, 'Deu ruim')
        console.log('DEU RUIM')
    })
}, 60000)

airgram.on('updateNewMessage', (ctx, next) => {
    if (!ctx.update.message.isOutgoing) {
        messageAnswered = true;
        console.log('RESPOSTA',ctx.update.message.content.text)
    }
    return next()
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))