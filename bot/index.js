const { Telegraf, Scenes, session} = require('telegraf')
const { message } = require('telegraf/filters')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const startScene = require("./scenes/StartScene")
const helpScene = require("./scenes/HelpScene")
dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

const stage = new Scenes.Stage([startScene, helpScene])
bot.use(session())
bot.use(stage.middleware())


bot.command("start", async(ctx) => {
    try{
        await ctx.deleteMessage()
        return await ctx.scene.enter("startScene")
    }catch (e) {
        return await ctx.reply("Ошибка в выводе главного блока")
    }
})

bot.command("help", async(ctx) => {
    try{
        await ctx.deleteMessage()
        return await ctx.scene.enter("helpScene")
    }catch (e) {
        return await ctx.reply("Ошибка в выводе листа с командами")
    }
})

////////////// Не читает здесь стэйт, когда находится в сцене



bot.action(/.+/, async(ctx) => {
    try{
        const actionNuggets = ctx.match[0].split("_")

        if (actionNuggets[0] === 'scene'){

            if (actionNuggets[1] === 'enter'){

                // console.log(ctx.scenete)

                await ctx.answerCbQuery()
                return await ctx.scene.enter(actionNuggets[2])
            }
        }

        await ctx.answerCbQuery("🕓 Перезагрузка бота...")
        await ctx.scene.enter("startScene")
    }catch (e) {
        return await ctx.reply(`Ошибка в обработке глобального колбэка: ${e}`)
    }

})











// Отлов случайного текста и флуда в чате с ботом
bot.on(message("text"), async (ctx) => {

    if (ctx.chat.type === 'private'){
        try{
            await ctx.deleteMessage()
            const {message_id} = await ctx.reply("Действие не распознано!")


            const lastMessageId = ctx.scene.lastMessageId || []

            lastMessageId.push(message_id)

            ctx.state.lastMessageId = lastMessageId


            return await ctx.scene.enter("helpScene")
        }catch (e) {
            return await ctx.reply(`Ошибка: ${e}`)
        }
    }
})


const start = async () => {
    try {

        mongoose.connect(process.env.MONGO_URL)

        const mongoDB = await mongoose.connection



        await mongoDB.on('connected', async() => {
            console.log("MongoDB - online")
            console.log("-----------")
            console.log("Bot started")
            console.log("-----------")
            await bot.launch()
        })
        await mongoDB.on('error', (error) => {
            console.log('MongoDB error: ', error)
            console.log("-----------")
        })



    } catch (e) {
        console.log(e);
    }
}


start();