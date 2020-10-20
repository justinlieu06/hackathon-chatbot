module.exports = function(controller) {
  let mem = controller.storage.memory;

  controller.hears(new RegExp('tech stack'),'message,direct_message', async(bot, message) => {

    console.log('I heard tech stack');

    mem.chosenFile = "tech_stacks.json";

    if (!mem.chosenCreator) {
      await bot.reply(message, {
        text: `I'm sorry. Who would you like to talk to?`,
        quick_replies: [
          { title: "Justin", payload: "I want to talk to Justin Lieu." },
          {
            title: "Yuan",
            payload: "I want to talk to Yuan Zhou.",
          },
        ],
      });
    } else {
      
      await bot.reply(message, {
        text: `I have lots of experience. Which one are you interested in?`,
        quick_replies: mem.replies,
      });

    }
  });
}