const {Scenes} =  require("telegraf");
const startSceneBtns = require("../buttons/InlineKeyboards").startSceneBtns


const startScene = new Scenes.BaseScene('startScene')


startScene.enter(async (ctx, next) => {
    const {message_id} = await ctx.replyWithPhoto(
        {
            source: `./public/img/background${Math.floor(Math.random() * 2)}.jpg`
        },
        {
            caption: `Добро пожаловать в чат официального бота ДАХО\\. `,
            parse_mode: 'MarkdownV2',
            ...startSceneBtns
        }
    )

    const lastMessageId = ctx.state.lastMessageId || []

    lastMessageId.push(message_id)

    ctx.state.lastMessageId = lastMessageId
})

//catch callback
// startScene.action(/.+/, async (ctx) => {
//
//
//     await ctx.answerCbQuery();
//
//     if (ctx.match[0] === "call_newRequest"){
//         await ctx.deleteMessage(ctx.scene.state.lastId)
//         return await ctx.scene.enter('newRequest')
//     }
//
//     if (ctx.match[0] === "call_myRequests"){
//         await ctx.deleteMessage(ctx.scene.state.lastId)
//         return await ctx.scene.enter('myRequests')
//     }
//
//
// });


module.exports = startScene