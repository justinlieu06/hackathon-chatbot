//javascript promise library
const Q = require("q");
const _ = require("lodash");
const fs = require("fs");

module.exports = function (controller) {
  let mem = controller.storage.memory; 

  mem.currentPatterns = [];

  function myBotkitMiddleware(bot, message, next) {
    loadHears()
      .then((hears) => {
        if (hears && _.isArray(hears)) {          
          hears.forEach((h) => {
            console.log(h);

            mem.currentPatterns.push(h.patterns);
            controller.hears(h.patterns, h.events, (bot, message) => {
              bot.reply(message, h.response);
            });
          });
        }
      })
      .fail((err) => {
        console.error(err);
      });
    next();
  }
  
  // read json files
  function loadHears() {
    //https://www.npmjs.com/package/q
    const deferred = Q.defer();

    console.log(mem.chosenPath);

    // fs.readFile(`${mem.chosenPath}`, "utf8", (err, data) => {
    fs.readFile('../json/yuan_zhou_resume.json', "utf8", (err, data) => {

      if (err) {
        deferred.reject(err);
        return err;
      }

      deferred.resolve(JSON.parse(data));
    });

    return deferred.promise;
  }

  controller.middleware.ingest.use(myBotkitMiddleware);














  // controller.hears(new RegExp('education'),'message,direct_message', async(bot, message) => {
  //   if (!mem.chosenPath) {
  //     await bot.reply(message, {
  //       text: `I'm sorry. Who would you like to talk to?`,
  //       quick_replies: [
  //         { title: "Justin", payload: "I want to talk to Justin Lieu." },
  //         {
  //           title: "Yuan",
  //           payload: "I want to talk to Yuan Zhou.",
  //         },
  //       ],
  //     });
  //   } else {
  //     await bot.reply(message, {
  //       text: `Which education are you interested in?`,
  //       quick_replies: [
  //         {
  //           title: "e-1",
  //           payload: "e-1",
  //         },
  //         {
  //           title: "e-2",
  //           payload: "e-2",
  //         },
  //         {
  //           title: "Ask more",
  //           payload: "Can you tell me more about yourself?",
  //         },
  //       ],
  //     });
  //   }
  // });








  // controller.hears(new RegExp('job history'),'message,direct_message', async(bot, message) => {
  //   console.log("job history");

  //   if (!mem.chosenPath) {
  //     await bot.reply(message, {
  //       text: `I'm sorry. Who would you like to talk to?`,
  //       quick_replies: [
  //         { title: "Justin", payload: "I want to talk to Justin Lieu." },
  //         {
  //           title: "Yuan",
  //           payload: "I want to talk to Yuan Zhou.",
  //         },
  //       ],
  //     });
  //   } else {
  //     await bot.reply(message, {
  //       text: `I have lots of experience. Which one are you interested in?`,
  //       quick_replies: [
  //         {
  //           title: "j-1",
  //           payload: "j-1",
  //         },
  //         {
  //           title: "j-2",
  //           payload: "j-2",
  //         },
  //         {
  //           title: "Ask more",
  //           payload: "Can you tell me more about yourself?",
  //         },
  //       ],
  //     });
  //   }
  // });

}