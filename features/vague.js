module.exports = function(controller) {
    let mem = controller.storage.memory;
    console.log('I heard vague number')
    /* hears for numbers*/
    controller.hears(
      new RegExp(/^\d+$/),
      ["message", "direct_message"],
      async (bot, message) => {
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
          await bot.beginDialog("creator_info");
        }
      }
    );
}