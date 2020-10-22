# BerryBot
BerryBot is a resume bot that allows people to talk to Justin and Yuan's avatars and explore their resumes.

This bot is powered by [a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 

Visit: [BerryBot](https://berrychatbot.herokuapp.com/)

## Features
### Greeting
Once the page loads, the user is greeted by the bot. Then the user can choose which one's avatar they are going to talk to.
![](https://github.com/JustinLieu06/hackathon-chatbot/blob/development/public/images/bot_window.png)

### Reading file dynamically
We utilize the JSON schema for resumes. In order to read resume file dynamically, we use `controller.storage.memory` to store avatar's name and `controller.middleware.send` to read the JSON file and process the data.  
