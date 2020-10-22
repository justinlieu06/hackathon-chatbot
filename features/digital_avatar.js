const { BotkitConversation } = require('botkit');

module.exports = function(controller) {
  let mem = controller.storage.memory;

  //file paths
  let justinResumePath = "json/justin_lieu_resume.json";
  let yuanResumePath = "json/yuan_zhou_resume.json";

  /* creator information conversation */
  let creatorInfoConvo = new BotkitConversation("creator_info", controller);

  creatorInfoConvo.say({
    text: "What would you like to know about me?",
    quick_replies: async (template, vars) => {
      return [
        {
          title: "Job History",
          payload: "What is your job history?",
        },
        {
          title: "Education",
          payload: "What is your educational background?",
        },
        {
          title: "Tech Stack",
          payload: "What tech stacks do you know?",
        },
        {
          title: "Contact Info",
          payload: "What is your contact info?",
        },
        {
          title: "Reselect bot",
          payload: "reselect bot",
        },
      ];
    },
  });

  controller.addDialog(creatorInfoConvo);

  /* hears for choosing digital avatar*/
  controller.hears(
    async (message) =>
      message.text &&
      (message.text.toLowerCase().includes("justin lieu") ||
        message.text.toLowerCase().includes("justin")),
    "message,direct_message",
    async (bot, message) => {
      mem.chosenCreator = "justin_lieu";
      //console.log("justin selected");
      // clear preloaded mem.replies
      if (mem.replies.length !== 0) mem.replies = [];
      await bot.reply(message, `Hi, I am Justin Lieu's digital avatar!`);
      await bot.beginDialog("creator_info");
    }
  );

  controller.hears(
    async (message) =>
      message.text &&
      (message.text.toLowerCase().includes("yuanyuan") ||
        message.text.toLowerCase().includes("yuan")),
    "message,direct_message",
    async (bot, message) => {
      mem.chosenCreator = "yuanyuan_zhou";
      //console.log("yuan selected");
      // clear preloaded mem.replies
      if (mem.replies.length !== 0) mem.replies = [];
      await bot.reply(message, `Hi, I am Yuanyuan Zhou's digital avatar!`);
      await bot.beginDialog("creator_info");
    }
  );

  /* Repeat creator info conversation */
  controller.hears(
    ["menu", "Menu", "who", "Who", "person"],
    "message,direct_message",
    async (bot, message) => {
      //console.log(message.text)
      if (!mem.chosenCreator) {
        //await bot.reply(message, {
        await bot.reply(message, {
          text: `I'm sorry. Who would you like to talk to?`,
          quick_replies: [
            {
              title: "Justin",
              payload: "I want to talk to Justin Lieu.",
            },
            {
              title: "Yuan",
              payload: "I want to talk to Yuanyuan Zhou.",
            },
          ],
        });
      } else {
        // clear preloaded mem.replies
        if (mem.replies.length !== 0) mem.replies = [];
        await bot.reply(
          message,
          `You are talking to ${mem.chosenCreator}'s avatar`
        );
        await bot.beginDialog("creator_info");
      }
    }
  );

  // /* Return who the user is talking to */
  // controller.hears(
  //   ["who", "Who", "person"],
  //   "message,direct_message",
  //   async (bot, message) => {
  //     //console.log(message.text)
  //     if (!mem.chosenCreator) {
  //       //await bot.reply(message, {
  //       await bot.reply(message, {
  //         text: `I'm sorry. Who would you like to talk to?`,
  //         quick_replies: [
  //           {
  //             title: "Justin",
  //             payload: "I want to talk to Justin Lieu.",
  //           },
  //           {
  //             title: "Yuan",
  //             payload: "I want to talk to Yuanyuan Zhou.",
  //           },
  //         ],
  //       });
  //     } else {
  //       // clear preloaded mem.replies
  //       if (mem.replies.length !== 0) mem.replies = [];
  //       await bot.reply(message, `You are talking to ${mem.chosenCreator}'s avatar`)
  //     }
  //   }
  // );
}