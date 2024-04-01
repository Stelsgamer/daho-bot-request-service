const Markup = require('telegraf/markup')

const goMenuBtn = Markup.inlineKeyboard([
    [Markup.button.callback('Меню', 'scene_enter_startScene')]
])


const startSceneBtns = Markup.inlineKeyboard([
    [Markup.button.callback('Контакты', 'scene_enter_myRequestsScene'), Markup.button.callback('Мои заявки', 'scene_enter_myRequestsScene')],
    [Markup.button.callback('Подать заявку', 'scene_enter_newRequestScene')]
])






module.exports = {
    goMenuBtn,
    startSceneBtns
}