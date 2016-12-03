
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var AlexaSkill = require('./AlexaSkill');
var pokeapi = require('./pokeapi');


/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var PokeAPISkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
PokeAPISkill.prototype = Object.create(AlexaSkill.prototype);
PokeAPISkill.prototype.constructor = PokeAPISkill;

PokeAPISkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

PokeAPISkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the PokeAPI!";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

PokeAPISkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

PokeAPISkill.prototype.intentHandlers = {
    // register custom intent handlers
    "HowBigIntent": function (intent, session, response) {
        pokeapi.getPokemon(intent.slots.pokemon.value).then(res => {
            var speechOutput = `${intent.slots.pokemon.value} weighs ${res.data.weight / 10} kilograms and is ${res.data.height / 10} meters tall.`;
            var cardTitle = intent.slots.pokemon.value;
            var cardContent = speechOutput;
            response.tellWithCard(speechOutput, cardTitle, cardContent);
        });
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask how big pizza is", "You can ask how big pizza is!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new PokeAPISkill();
    helloWorld.execute(event, context);
};

