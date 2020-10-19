//javascript promise library
const Q = require("q");
const _ = require("lodash");
const fs = require("fs");

module.exports = function (controller) {
  let mem = controller.storage.memory;
  mem.replies = [];
  mem.filePath = "";

  function myBotkitMiddleware(bot, message, next) {
    console.log("BOTKIT MIDDLEWARE");
    console.log(mem.replies);
    console.log('----------------');

    loadHears()
      .then((hears) => {
        if (mem.replies.length !== 0) mem.replies = [];

        if (hears && _.isArray(hears)) {          
          hears.forEach((h) => {

            mem.replies.push({title: h.patterns[0], payload: h.patterns[0]});

            controller.hears(h.patterns, h.events, (bot, message) => {
              bot.reply(message, h.response);
            });
          });
        }

        mem.replies.push({
          title: "Not interested",
          payload: "I'm not interested in this.",
        });

      })
      .fail((err) => {
        console.error(err);
      });
    next();
  }

  function loadFile(bot, message, next){
    mem.filePath = `features/json/${mem.chosenCreator}/${mem.chosenFile}`;
    next();

  }
  
  // read json files
  function loadHears() {
    //https://www.npmjs.com/package/q
    const deferred = Q.defer();
    console.log(mem.filePath);
    fs.readFile(mem.filePath, "utf8", (err, data) => {

      if (err) {
        deferred.reject(err);
        return err;
      }

      deferred.resolve(JSON.parse(data));
    });

    return deferred.promise;
  }

  controller.middleware.ingest.use(myBotkitMiddleware);
  controller.middleware.receive.use(loadFile);
  // controller.middleware.send.use(myBotkitMiddleware);

  // controller.middleware.receive.use(function(bot, message, next) {

  //   // do something...
  //   // message.extrainfo = 'foo';
  //   next();

// });

}