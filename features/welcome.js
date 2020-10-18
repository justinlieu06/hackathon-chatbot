module.exports = function (controller) {
  
  // respond to the `hello` event, fired when a web chat begins with a new user
  controller.on("hello", async (bot, message) => {
    bot.reply(message, "Welcome, new human! What can I do for you?");
  });

  // respond to the 'welcome_back event, fired when a web chat reconnects
  controller.on("welcome_back", async (bot, message) => {
    bot.reply(message, "Welcome back, new human! What can I do for you >.<");
  });


};
