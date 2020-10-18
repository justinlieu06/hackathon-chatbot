const { BotkitConversation } = require('botkit');

module.exports = function(controller) {

  //GLOBAL VARIABLES///////////////////////////////////////////////////////

  let justinResume = {
    jobHistory: "filler",
    education: "filler2",
    techStack: "filler3",
    contactInfo: `My contact info is: email: filler4@gmail.com phone number: 444-444-4444`,
  };

  let yuanResume = {
    jobHistory: "filler5",
    education: "filler6",
    techStack: "filler7",
    contactInfo: "filler8",
  };

  //access memory object of controller's storage
  let mem = controller.storage.memory; 




  //CONVERSATIONS///////////////////////////////////////////////////////

  /* intro conversation */
  let introConvo = new BotkitConversation('intro', controller);
  
  // ask a question, handle the response with a function
  introConvo.ask('Hi! What is your name?', async(response, convo, bot, full_message) => {
    await bot.say('Hi ' + response + '!');
  }, {key: 'name'});

  introConvo.say({
    text: "Who do you want to talk to?",
    quick_replies: async (template, vars) => {
      return [
        { title: 'Justin', 
          payload: 'I would like to speak to Justin Lieu.', 
        },
        {
          title: 'Yuan',
          payload: 'I would like to speak to Yuan Zhou.',
        },
      ];
    },
  });

  controller.addDialog(introConvo);
  


  /* creator information conversation */
  let creatorInfoConvo = new BotkitConversation('creator_info', controller);

  creatorInfoConvo.say({
    text: "What would you like to know about me?",
    quick_replies: async (template, vars) => {
      return [
        { title: 'Job History', 
          payload: 'What is your job history?', 
        },
        {
          title: 'Education',
          payload: 'What is your educational background?',
        },
        {
          title: 'Tech Stack',
          payload: 'What tech stacks do you know?',
        },
        {
          title: 'Contact Info',
          payload: 'What is your contact info?',
        },
      ];
    },
  });

  controller.addDialog(creatorInfoConvo);


  /* */
  // convo.ask('Do you want to eat a taco?', [
  //   {
  //       pattern: 'yes',
  //       type: 'string',
  //       handler: async(response_text, convo, bot, full_message) => {
  //           return await convo.gotoThread('yes_taco');
  //       }
  //   },
  //   {
  //       pattern: 'no',
  //       type: 'string',
  //       handler: async(response_text, convo, bot, full_message) => {
  //           return await convo.gotoThread('no_taco');
  //       }
  //   },
  //   {
  //       default: true,
  //       handler: async(response_text, convo, bot, full_message) => {
  //           await bot.say('I do not understand your response!');
  //           // start over!
  //           return await convo.repeat();
  //       }
  //   }
  // ], {key: 'tacos'});





  //CONTROLLER HEARS//////////////////////////////////////////////////

  /* introduction */
  controller.hears(new RegExp('start'), 'message,direct_message', async (bot, message) => {
    await bot.beginDialog('intro');
  });



  /* choosing digital avatar*/
  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('justin lieu'),'message,direct_message', async(bot, message) => {
    mem.chosenCreator = 'justin';
    await bot.reply(message, `Hi, I am Justin Lieu's digital avatar!`);
    await bot.beginDialog('creator_info');
  });

  controller.hears(async (message) => message.text && message.text.toLowerCase().includes('yuan zhou'),'message,direct_message', async(bot, message) => {
    mem.chosenCreator = 'yuan';
    await bot.reply(message, `Hi, I am Yuan Zhou's digital avatar!`);
    await bot.beginDialog('creator_info');
  });



  /* resume info */
  controller.hears(new RegExp('job history'),'message,direct_message', async(bot, message) => {
    let chosenResume = chooseResume();
    if (!chosenResume) {
      await bot.reply(message,{
        text: `I'm sorry. Who would you like to talk to?`,
        quick_replies: [
          { title: 'Justin', 
            payload: 'I want to talk to Justin Lieu.', 
          },
          {
            title: 'Yuan',
            payload: 'I want to talk to Yuan Zhou.',
          },
        ]
      });
    } else {
      await bot.reply(message,{
            text: `${chosenResume.jobHistory}`,
            quick_replies: [
              {
                title: 'Very cool!',
                payload: 'Very cool!',
              },
              {
                title: 'Ask more',
                payload: 'Can you tell me more about yourself?'
              }
            ]
        });
    }
  });

  controller.hears(new RegExp('education'),'message,direct_message', async(bot, message) => {
    let chosenResume = chooseResume();
    if (!chosenResume) {
      await bot.reply(message,{
        text: `I'm sorry. Who would you like to talk to?`,
        quick_replies: [
          { title: 'Justin', 
            payload: 'I want to talk to Justin.', 
          },
          {
            title: 'Yuan',
            payload: 'I want to talk to Yuan Zhou.',
          },
        ]
      });
    } else {
      await bot.reply(message,{
            text: `${chosenResume.education}`,
            quick_replies: [
              {
                title: 'Very cool!',
                payload: 'Very cool!',
              },
              {
                title: 'Ask more',
                payload: 'Can you tell me more about yourself?'
              }
            ]
        });
    }
  });

  controller.hears(new RegExp('tech stack'),'message,direct_message', async(bot, message) => {
    let chosenResume = chooseResume();
    if (!chosenResume) {
      await bot.reply(message,{
        text: `I'm sorry. Who would you like to talk to?`,
        quick_replies: [
          { title: 'Justin', 
            payload: 'I want to talk to Justin Lieu.', 
          },
          {
            title: 'Yuan',
            payload: 'I want to talk to Yuan Zhou.',
          },
        ]
      });
    } else {
      await bot.reply(message,{
            text: `${chosenResume.techStack}`,
            quick_replies: [
              {
                title: 'Very cool!',
                payload: 'Very cool!',
              },
              {
                title: 'Ask more',
                payload: 'Can you tell me more about yourself?'
              }
            ]
        });
    }
  });

  controller.hears(new RegExp('contact'),'message,direct_message', async(bot, message) => {
    let chosenResume = chooseResume();
    if (!chosenResume) {
      await bot.reply(message,{
        text: `I'm sorry. Who would you like to talk to?`,
        quick_replies: [
          { title: 'Justin', 
            payload: 'I want to talk to Justin Lieu.', 
          },
          {
            title: 'Yuan',
            payload: 'I want to talk to Yuan Zhou.',
          },
        ]
      });
    } else {
      await bot.reply(message,{
            text: `${chosenResume.contactInfo}`,
            quick_replies: [
              {
                title: 'Very cool!',
                payload: 'Very cool!',
              },
              {
                title: 'Ask more',
                payload: 'Can you tell me more about yourself?'
              }
            ]
        });
    }
  });




  /* Repeat creator info conversation */
  controller.hears(new RegExp('Can you tell me more about yourself?'),'message,direct_message', async(bot, message) => {
    await bot.beginDialog('creator_info');
  });




  //HELPER FUNCTIONS///////////////////////////////////////////////////

  /* decides which resume to use */
  function chooseResume(){
    if (mem.chosenCreator === 'justin') {
      return justinResume;
    }
    else if (mem.chosenCreator === 'yuan') {
      return yuanResume;
    }
  }





}