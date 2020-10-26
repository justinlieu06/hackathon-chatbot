//javascript promise library
const _ = require("lodash");
const fs = require("fs").promises;

module.exports = function (controller) {
  let mem = controller.storage.memory;
  mem.replies = [];
  mem.filePath = "";
    
  async function myBotkitMiddleware(bot, message, next) {

    if (mem.chosenCreator !== undefined){
      // read json files
      //mem.filePath = `features/json/${mem.chosenCreator}/${mem.chosenFile}`; 
      mem.filePath = `features/json/${mem.chosenCreator}.json`; 
     
      let data = await fs.readFile(mem.filePath, "utf8")
      let hears = JSON.parse(data)

      if (mem.replies.length !== 0) mem.replies = [];
      if (hears && _.isArray(hears[mem.chosenCategory])) {
        hears[mem.chosenCategory].forEach((h) => {          
          mem.replies.push({ title: h.patterns[0], payload: h.patterns[0] });
          
          // use async and await here to make sure the message can be heard and the reply can be sent synchronously
          controller.hears(h.patterns, h.events, async(bot, message) => {
            for (i = 0; i < h.response.length; i++){
             
                await bot.reply(message, h.response[i])
              }
              await bot.beginDialog("creator_info");
          });
        });

      }  
      mem.replies.push({
        title: "Go back",
        payload: "Main Menu",
      });
      mem.replies.push({
        title: "Help",
        payload: "Help",
      });
    }
   
    next();
}  
  
  // use send middleware to modify the reply right before sending it back 
  controller.middleware.send.use(myBotkitMiddleware);

}