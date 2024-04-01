const {Scenes} =  require("telegraf");


const newRequestScene = new Scenes.BaseScene('newRequestScene')


newRequestScene.enter(async (ctx) => {

    await ctx.reply("Отправьте ФИО в ответном сообщении")

})

//catch callback
newRequestScene.action(/.+/, async (ctx) => {


    await ctx.answerCbQuery();

    // if (ctx.match[0] === "call_newRequest"){
    //     await ctx.deleteMessage(ctx.scene.state.lastId)
    //     return await ctx.scene.enter('newRequest')
    // }
    //
    // if (ctx.match[0] === "call_myRequests"){
    //     await ctx.deleteMessage(ctx.scene.state.lastId)
    //     return await ctx.scene.enter('myRequests')
    // }


});


module.exports = newRequestScene