module.exports = function(controller) {
  let mem = controller.storage.memory;
  // I changed the pattern name in JSON file from 'yuan-education' to 'yuan-edu' because of the hear conflicts
  // I hear to RegExp 'education' 
  controller.hears(new RegExp('education'),'message,direct_message', async(bot, message) => {

    //console.log('I heard education');
    mem.chosenCategory = "education";

    if (!mem.chosenCreator) {
      await bot.reply(message, {
        text: `I'm sorry. Who would you like to talk to?`,
        quick_replies: [
          { title: "Justin", payload: "I want to talk to Justin Lieu." },
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
        text: `Which one are you interested in?`,
        quick_replies: mem.replies,
      });
    }
  });
}