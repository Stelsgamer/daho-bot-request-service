const {Scenes} =  require("telegraf");
const goMenuBtn = require("../buttons/InlineKeyboards").goMenuBtn


const helpScene = new Scenes.BaseScene('helpScene')

helpScene.enter(async (ctx) => {

    const {message_id} = await ctx.replyWithHTML(
        "Список доступных команд:\n\n" +
        "<b>Перезапуск бота - </b> /start\n" +
        "<b>Получить временный пароль авторизации - </b> /auth\n" +
        "<b>Контакты команды разработчиков - </b> /developers\n" +
        "<b>Сообщить об ошибке - </b> /error\n", {
            ...goMenuBtn
        })

    const lastMessageFromState = ctx.state.lastMessagesId

    const lastMessagesId = [message_id]
    if(lastMessageFromState)lastMessagesId.push(lastMessageFromState)

    ctx.session.__scenes.state.lastMessagesId = lastMessagesId



})

module.exports = helpScene