const { BotkitConversation } = require("botkit");

module.exports = function(controller) {
  let mem = controller.storage.memory; 

  /* help conversation */
  let helpConvo = new BotkitConversation("help", controller);

  helpConvo.say(
    "Type justin to talk to his avatar."
  );

  helpConvo.say("Type yuan to talk to her avatar.");

  controller.addDialog(helpConvo);

  controller.interrupts("help", "message", async (bot, message) => {
    // start a help dialog, then eventually resume any ongoing dialog
    await bot.beginDialog("help");
  });
}