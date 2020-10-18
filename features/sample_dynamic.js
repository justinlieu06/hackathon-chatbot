const { BotkitConversation } = require('botkit');

module.exports = function(controller){

    let dialog = new BotkitConversation('sample_dialog', controller);
    
    dialog.ask('What would you like the quick reply to say?', [], 'reply_title');
    dialog.say({
        text: 'Here is your dynamic button:',
        quick_replies: async (template, vars) => { return [{ title: vars.reply_title, payload: vars.reply_title }] }
    });
    controller.addDialog(dialog);

    controller.hears('ask', 'message', async (bot, message) => {
        await bot.beginDialog('sample_dialog');
    });
}