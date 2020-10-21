const { BotkitConversation } = require('botkit');

module.exports = function(controller) {
  let mem = controller.storage.memory; 

  //file paths
  let justinResumePath = "json/justin_lieu_resume.json";
  let yuanResumePath = "json/yuan_zhou_resume.json";

  /* creator information conversation */
  let creatorInfoConvo = new BotkitConversation('creator_info', controller);

  creatorInfoConvo.say({
    text: "What would you like to know about me?",
    quick_replies: async (template, vars) => {
      return [
        { 
          title: "Job History", 
          payload: "What is your job history?" 
        },
        {
          title: "Education",
          payload: "What is your educational background?",
        },
        {
          title: "Tech Stack",
          payload: "What tech stacks do you know?",
        },
        {
          title: "Contact Info",
          payload: "What is your contact info?",
        },
        {
          title: "Reselect bot",
          payload: "reselect bot",
        },
      ];
    },
  });

  controller.addDialog(creatorInfoConvo);


  /* hears for choosing digital avatar*/
  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('justin lieu'),'message,direct_message', async(bot, message) => {
    mem.chosenCreator = 'justin_lieu.json';
    console.log('justin selected');
    await bot.reply(message, `Hi, I am Justin Lieu's digital avatar!`);
    await bot.beginDialog('creator_info');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('yuan zhou'),'message,direct_message', async(bot, message) => {
    mem.chosenCreator = 'yuan_zhou.json';
    console.log('yuan selected');
    await bot.reply(message, `Hi, I am Yuanyuan Zhou's digital avatar!`);
    await bot.beginDialog('creator_info');
  });

  /* Repeat creator info conversation */
  controller.hears(
    [
      new RegExp(`Main Menu`),
      new RegExp(`What else are you interested in?`),
    ],
    "message,direct_message",
    async (bot, message) => {
      await bot.beginDialog("creator_info");
    }
  );
}