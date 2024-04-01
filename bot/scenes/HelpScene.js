const {Scenes} =  require("telegraf");
const goMenuBtn = require("../buttons/InlineKeyboards").goMenuBtn


const helpScene = new Scenes.BaseScene('helpScene')

helpScene.enter(async (ctx, next) => {

    const {message_id} = await ctx.replyWithHTML(
        "Список доступных команд:\n\n" +
        "<b>Перезапуск бота - </b> /start\n" +
        "<b>Получить временный пароль авторизации - </b> /auth\n" +
        "<b>Контакты команды разработчиков - </b> /developers\n" +
        "<b>Сообщить об ошибке - </b> /error\n", {
            ...goMenuBtn
        })

    const lastMessageId = ctx.state.lastMessageId

    lastMessageId.push(message_id)


    ctx.state.lastMessageId = lastMessageId

})

helpScene.action(/.+/, async(ctx) => {

    if(ctx.state.lastMessageId){
        for(const lastMessageId of ctx.state.lastMessageId){

            await ctx.deleteMessage(lastMessageId)
        }
    }
})



module.exports = helpScene