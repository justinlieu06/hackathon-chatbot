const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
  let mem = controller.storage.memory; 

  /* help conversation */
  let helpConvo = new BotkitConversation("help", controller);

  helpConvo.say(
    "You can type `justin` to talk to his avatar."
  );

  helpConvo.say("You can type `yuan` to talk to her avatar.");

  helpConvo.say("Then you can select what you are interested in and explore her/his experience.");

  helpConvo.say("You can also type 'tell me about yourself' to get an overview of the avatar you're speaking with or 'menu' to get a list of options.");

  helpConvo.say("Have fun!");

  controller.addDialog(helpConvo);

  controller.interrupts("help", "message", async (bot, message) => {
    // start a help dialog, then eventually resume any ongoing dialog
    await bot.beginDialog("help");
  });
}