const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-380658545846-379071222896-5jxTpFfiI17oMu59pFfsXyz3',
    name: 'jokebot'

});

//Start Handler
bot.on('start', () => {
const params = {

    icon_emoji : ':smiley:'

}
bot.postMessageToChannel(
    'general', 'Get Ready To Smile @Jokebot',
    params
);

});

/// error Handler
bot.on('error', (err) => console.log(err));

bot.on('Message', (data) => {
if(data.type !== 'message'){
    return;

}
handleMessage(data.text);
});

function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();

    }else if(message.includes(' yomama')) {
        yoMamaJoke();

    } else if (message.includes(' random')){
        randomJoke();
    } else if (message.includes(' help')) {
        runHelp();
    }


}

// Tell joke by API
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
       const joke = res.data.value.joke;

       const params = {

        icon_emoji : ':laughing:'
    
    };
    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`,params);
    });
}

// Tell a Yo Mama Joke
function yoMamaJoke() {
    axios.get('http://api.yomomma.info').then(res => {
       const joke = res.data.joke;

       const params = {

        icon_emoji : ':laughing:'
    
    };
    bot.postMessageToChannel('general', `Yo Mama: ${joke}`,params);
    });
}

//Tell random Joke
function randomJoke() {
    const rand = Math.floor(Math.random() *2) +1;
    if(rand === 1) {
        chuckJoke();

    } else if (rand ===2 ){
        yoMamaJoke();
    }

}

//show Help Text
function runHelp() {
    const params = {

        icon_emoji : ':question:'
    
    };
    bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get ajoke` ,params);
  

}