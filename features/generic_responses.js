module.exports = function(controller) {

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('very cool'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'Thank you');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('sup'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'suppp');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('what is your name'),'message,direct_message', async(bot, message) => {
    if (controller.storage.memory === 'justin') await bot.reply(message, 'My name is Justin Lieu');
    else if (controller.storage.memory === 'yuan') await bot.reply(message, 'My name is Yuan Zhou');
    else await bot.reply(message, `You haven't chosen a creator yet. Would you like to speak to Justin Lieu or Yuan Zhou?`);
  });
}