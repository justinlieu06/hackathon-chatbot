const Q = require("q");
const _ = require("lodash");
const fs = require("fs");

module.exports = function (controller) {
    controller.hears('menu', 'message', async (bot, message) => {

        await bot.reply(message, {
            text: 'About me',
            quick_replies: [
                {
                    title: "Job experience",
                    payload: "job-experience",
                },
                {
                    title: "Help",
                    payload: "help"
                }
            ]
        });
    });
   
    controller.hears('job-experience', "message", async (bot, message) => {

        await bot.reply(message, {
            text: 'I have lots of experience, which one are you interested in?',
            quick_replies: [
                {
                    title: "Experience 1",
                    payload: "j-1",
                },
                {
                    title: "Experience 2",
                    payload: "j-2"
                }
            ]
        });
    });
    
    function myBotkitMiddleware(bot, message, next) {
      loadHears()
        .then((hears) => {
          if (hears && _.isArray(hears)) {
            hears.forEach((h) => {
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
    
    // read yuan.json file

    function loadHears() {
      const deferred = Q.defer();

      fs.readFile("features/yuan.json", "utf8", (err, data) => {
        if (err) {
          deferred.reject(err);
          return err;
        }

        deferred.resolve(JSON.parse(data));
      });

      return deferred.promise;
    }

    controller.middleware.ingest.use(myBotkitMiddleware);
}