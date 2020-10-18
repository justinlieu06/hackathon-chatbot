
module.exports = function (controller) {
    controller.hears('menu', 'message', async (bot, message) => {

        await bot.reply(message, {
            text: 'About me',
            quick_replies: [
                {
                    title: "Job experience",
                    payload: "job-experience",
                },
                {
                    title: "Help",
                    payload: "help"
                }
            ]
        });
    });

    controller.hears('job-experience', "message,direct_message", async (bot, message) => {

        await bot.reply(message, {
            text: 'I have lots of experience, which one are you interested in?',
            quick_replies: [
                {
                    title: "Experience 1",
                    payload: "job-experience-1",
                },
                {
                    title: "Experience 2",
                    payload: "job-experience-2"
                }
            ]
        });
    });
}