module.exports = function(controller) {
  let mem = controller.storage.memory;

  controller.hears(new RegExp('job history'),'message,direct_message', async(bot, message) => {

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
      let replies = [];
      mem.currentPatterns.forEach((pattern) => {
        replies.push(pattern);
      })
      replies.push({
        title: "Not interested",
        payload: "I'm not interested in this.",
      });
      
      await bot.reply(message, {
        text: `I have lots of experience. Which one are you interested in?`,
        // quick_replies: [
        //   {
        //     title: mem.currentPattern,
        //     payload: mem.currentPattern,
        //   },
        //   {
        //     title: mem.currentPattern,
        //     payload: mem.currentPattern,
        //   },
        //   {
        //     title: "Not interested",
        //     payload: "I'm not interested in this.",
        //   },
        // ],
        quick_replies: replies,
      });
    }
  });
}