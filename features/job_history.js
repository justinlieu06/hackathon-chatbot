module.exports = function(controller) {
  let mem = controller.storage.memory;

  controller.hears(
    new RegExp("job"),
    "message,direct_message",
    async (bot, message) => {
      console.log("I heard job history");
      mem.chosenCategory = "job history";

      if (!mem.chosenCreator) {
        //await bot.reply(message, {
        await bot.reply(message, {
          text: `I'm sorry. Who would you like to talk to?`,
          quick_replies: [
            {
              title: "Justin",
              payload: "I want to talk to Justin Lieu.",
            },
            {
              title: "Yuan",
              payload: "I want to talk to Yuanyuan Zhou.",
            },
          ],
        });
      } else {
        // clear preloaded mem.replies
        if (mem.replies.length !== 0) mem.replies = [];
        await bot.reply(message, {
          text: `I have lots of job experience. Which one are you interested in?`,
          quick_replies: mem.replies,
        });
      }
    }
  );

}