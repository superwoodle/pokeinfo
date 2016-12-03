var rest = require('./rest');
const POKEAPI_SERVICE_HOST = 'http://pokeapi.co/api/v2/';
var path = {};
path.api = POKEAPI_SERVICE_HOST;
path.pokemon = path.api + "pokemon";

/**
 * Gets pokemon info by name
 *
 * @param {string} deviceId - Device Id
 */
exports.getPokemon = function getPokemon(pokemonName) {
    var url = path.pokemon + '/' + pokemonName.toLowerCase();
    console.log(url);
    return rest.get(url);
}