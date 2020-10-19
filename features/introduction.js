/*
Introduction Prompt
*/

const { BotkitConversation } = require('botkit');

module.exports = function (controller) {
  let mem = controller.storage.memory; 

  /* intro conversation */
  let introConvo = new BotkitConversation('intro', controller);

  introConvo.say('Welcome, new human! Justin Lieu and Yuan Zhou are my creators. They are both open to work.');
  
  // ask a question, handle the response with a function
  introConvo.ask('What is your name?', async(response, convo, bot, full_message) => {
    mem.username = response;
    await bot.say('Hi ' + response + '!');
  }, {key: 'name'});

  introConvo.say({
    text: "Who do you want to talk to?",
    quick_replies: async (template, vars) => {
      return [
        { title: 'Justin', 
          payload: 'I would like to speak to Justin Lieu.', 
        },
        {
          title: 'Yuan',
          payload: 'I would like to speak to Yuan Zhou.',
        },
      ];
    },
  });

  controller.addDialog(introConvo);
  




  /* on events for introduction */
  // respond to the `hello` event, fired when a web chat begins with a new user
  controller.on("hello", async (bot, message) => {
    await bot.beginDialog('intro');
  });

  // respond to the 'welcome_back event, fired when a web chat reconnects
  controller.on("welcome_back", async (bot, message) => {
    if (mem.username){
      bot.reply(message, `Welcome back, ${mem.username}! What can I do for you >.<`);
    } else {
      bot.reply(message, "Welcome back, human! What can I do for you >.<");
    }
  });


};
