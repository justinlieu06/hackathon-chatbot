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

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('what is your name'),'message,direct_message', async(bot, message) => {
    if (controller.storage.memory === 'justin') await bot.reply(message, 'My name is Justin Lieu');
    else if (controller.storage.memory === 'yuan') await bot.reply(message, 'My name is Yuan Zhou');
    else await bot.reply(message, `You haven't chosen a creator yet. Would you like to speak to Justin Lieu or Yuan Zhou?`);
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('what is your name'),'message,direct_message', async(bot, message) => {
    if (controller.storage.memory === 'justin') await bot.reply(message, 'My name is Justin Lieu');
    else if (controller.storage.memory === 'yuan') await bot.reply(message, 'My name is Yuan Zhou');
    else await bot.reply(message, `You haven't chosen a creator yet. Would you like to speak to Justin Lieu or Yuan Zhou?`);
  });


  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('what is your name'),'message,direct_message', async(bot, message) => {
    if (controller.storage.memory === 'justin_lieu') await bot.reply(message, 'My name is Justin Lieu');
    else if (controller.storage.memory === 'yuanyuan_zhou') await bot.reply(message, 'My name is Yuan Zhou');
    else await bot.reply(message, `You haven't chosen a creator yet. Would you like to speak to Justin Lieu or Yuan Zhou?`);
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('tell me about yourself'),'message,direct_message', async(bot, message) => {
    if (controller.storage.memory === 'justin_lieu') {
      await bot.reply(
        message, 
        `I am a self-driven and dedicated software engineer with a passion for problem solving, and improving lives. I absolutely love creating optimized products that others can enjoy, and have extensive experience in full stack development via Ruby on Rails, Redux, and ReactJS. Open to opportunities! Check out my web portfolio at https://justinlieu06.github.io/ and reach me at justinlieu06@gmail.com.

        Additional skills: Ruby, JavaScript, Java, C, C++, C#, Python, SQL, HTML5, CSS3, jQuery, Scala, Matlab, Bash, ARM Assembly, Unix, Linux, Git, AWS, MongoDB, Express.js, Node.js `
      );
    }
    else if (controller.storage.memory === 'yuanyuan_zhou') {
      await bot.reply(
        message, 
        `I'm a software engineer and I'm always a big fan of detective novels and suspense movies.

        When I was a little kid, I was fascinated with Detective Conan, a Japanese detective anime. I enjoyed watching Conan solve cases with his exceptional sleuthing skill and I was addicted to guessing the culprit in every single case.
        
        As I grew up, I became interested in math and science. Solving problems has always intrigued me. I did not realize how much I loved programming until I successfully built a job-search app in only one week. Since then, debugging has become my favorite "detective game". Stack traces are my "investigation files" and test cases are my "assistants".
        
        I love taking challenges and I really want to find a company to crack down the most interesting cases. If you are looking for an enthusiastic problem solver and a quick learner, feel free to reach out to me at bettinazhounyu@gmail.com!
        
        My specialties: Ruby on Rails, React, Redux, Javascript, Mongoose, Express, Node.js, MongoDB, Oracle SQL, R, R Shiny, Python `
      );
    }
    else await bot.reply(message, `You haven't chosen a creator yet. Would you like to speak to Justin Lieu or Yuan Zhou?`);
  });

}
