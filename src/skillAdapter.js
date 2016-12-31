
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var AlexaSkill = require('./AlexaSkill');
var pokeapi = require('./pokeapi');

var PokeAPISkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
PokeAPISkill.prototype = Object.create(AlexaSkill.prototype);
PokeAPISkill.prototype.constructor = PokeAPISkill;

PokeAPISkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("PokeAPISkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

PokeAPISkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("PokeAPISkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the PokeAPI! You can ask about Pokemon!";
    var repromptText = "You can ask about Pokemon!";
    response.ask(speechOutput, repromptText);
};

PokeAPISkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("PokeAPISkill onSessionEnded requestId: " + sessionEndedRequest.requestId
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
    "TypeIntent": function (intent, session, response) {
        pokeapi.getPokemon(intent.slots.pokemon.value).then(res => {
            var types = "";
            for (type of res.data.types) {
                types += type.type.name + " ";
            }
            var speechOutput = `${intent.slots.pokemon.value} is a ${types}pokemon.`;
            var cardTitle = intent.slots.pokemon.value;
            var cardContent = speechOutput;
            response.tellWithCard(speechOutput, cardTitle, cardContent);
        });
    },
    "NumberIntent": function (intent, session, response) {
        pokeapi.getPokemon(intent.slots.pokemon.value).then(res => {
            var speechOutput = `${intent.slots.pokemon.value} is number ${res.data.id}.`;
            var cardTitle = intent.slots.pokemon.value;
            var cardContent = speechOutput;
            response.tellWithCard(speechOutput, cardTitle, cardContent);
        });
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask about Pokemon!", "You can ask about Pokemon!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var pokeAPISkill = new PokeAPISkill();
    pokeAPISkill.execute(event, context);
};

