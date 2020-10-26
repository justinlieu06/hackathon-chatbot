module.exports = function(controller) {
  let mem = controller.storage.memory;

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('very cool'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'Thank you!');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('sup'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'How do you do?');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('bye'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'Bye!');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('how are you'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'Good! How are you?');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('im good'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'Glad to hear!');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('hows the weather'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, 'The weather is great here in the digital world!');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('thank'),'message,direct_message', async(bot, message) => {
    await bot.reply(message, `You're welcome!`);
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('what is your name'),'message,direct_message', async(bot, message) => {
    if (mem.chosenCreator === 'justin_lieu') await bot.reply(message, 'My name is Justin Lieu');
    else if (mem.chosenCreator === 'yuanyuan_zhou') await bot.reply(message, 'My name is Yuan Zhou');
    else await bot.reply(message, `You haven't chosen a creator yet. Would you like to speak to Justin Lieu or Yuan Zhou?`);
  });

}
