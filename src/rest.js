'use strict';

var request = require('request');

let headers = {};

exports.setHeader = function setHeader(name, value) {
    headers[name] = value;
}

exports.clearHeader = function clearHeader(name) {
    delete headers[name];
}

exports.resetHeaders = function resetHeaders() {
    headers = {};
}

exports.get = function get(uri) {
    return req('GET', uri, null);
}

exports.put = function put(uri, body) {
    return req('PUT', uri, body);
}

exports.post = function post(uri, body) {
    return req('POST', uri, body);
}

function req(method, uri, body, callback) {
    return new Promise((resolve, reject) => {
        try {
            var config = {
                method: method,
                uri: uri,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            Object.keys(headers).forEach(function (name) {
                let value = headers[name];
                if (value === null || value === undefined) {
                    delete config.headers[name];
                } else {
                    config.headers[name] = value;
                }
            });

            if (body) {
                config.body = JSON.stringify(body);
            }

            request(config, function (error, response, body) {
                if (error) {
                    if (error.code === "ECONNREFUSED") {
                        console.log('The remote host ' + error.address + ' refused to connect. Your host configuration may be incorrect');
                        process.exit();
                    }
                    throw error;
                } else {
                    var res = { status: response.statusCode };
                    if (body == "") {
                        res.data = null;
                    } else {
                        res.data = response.statusCode >= 200 && response.statusCode <= 299 ? JSON.parse(body) : body;
                    }
                    resolve(res);
                }
            });
        } catch (err) {
            console.log(method + ' request failed ' + err);
            reject(err);
        }
    });
}