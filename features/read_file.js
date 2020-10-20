//javascript promise library
const _ = require("lodash");
const fs = require("fs").promises;

module.exports = function (controller) {
  let mem = controller.storage.memory;
  mem.replies = [];
  mem.filePath = "";
    
  async function myBotkitMiddleware(bot, message, next) {

    if (mem.chosenFile !== undefined){
      // read json files
      mem.filePath = `features/json/${mem.chosenCreator}/${mem.chosenFile}`;  
      const data = await fs.readFile(mem.filePath, "utf8")
      const hears = JSON.parse(data)

      if (mem.replies.length !== 0) mem.replies = [];
  
      if (hears && _.isArray(hears)) {
        hears.forEach((h) => {          
          mem.replies.push({ title: h.patterns[0], payload: h.patterns[0] });
          
          // use async and await here to make sure the message can be heard and the reply can be sent asynchronously
          controller.hears(h.patterns, h.events, async(bot, message) => {
            await bot.reply(message, h.response);
          });
        });

      }  
      mem.replies.push({
        title: "Not interested",
        payload: "I'm not interested in this.",
      });
    }
   
    next();
}  
  
  // use send middleware to modify the reply right before sending it back 
  controller.middleware.send.use(myBotkitMiddleware);

}