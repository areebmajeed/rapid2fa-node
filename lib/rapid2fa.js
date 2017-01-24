/**
 * Simple functions to communicate with Rapid 2FA API.
 *
 * @author Areeb Majeed
 * @copyright 2017 Rapid 2FA
 * @license https://opensource.org/licenses/MIT MIT License
 *
 * @link https://rapid2fa.com/
 */
 
"use strict";

var needle = require('needle');
const API_ENDPOINT = "https://rapid2fa.com/api/";

class Rapid2FA {

    constructor(options) {

        this.api_key = options.api_key;
        this.api_secret = options.api_secret;
        this.api_endpoint = API_ENDPOINT;

    }

    /**
     * Generate a settings page by sending POST data to Rapid 2FA.
     * Throw exception on error.
     */

    generateSettingsPage(user, callback) {

        needle.post(API_ENDPOINT, {
            api_key: this.api_key,
            api_secret: this.api_secret,
            method: 'edit_profile_2fa',
            user: user
        }, function(err, resp, body) {

            callback(body);

        });

    }

    /**
     * Generate a hosted page or simply a user session.
     */

    generate2FASession(user, callback) {

        needle.post(API_ENDPOINT, {
            api_key: this.api_key,
            api_secret: this.api_secret,
            method: 'create_2fa_session',
            user: user
        }, function(err, resp, body) {

            callback(body);

        });

    }

    /**
     * Validate the session hash returned by the user.
     */

    handleVerification(hash, callback) {

        needle.post(API_ENDPOINT, {
            api_key: this.api_key,
            api_secret: this.api_secret,
            method: 'verify_authentication',
            hash: hash
        }, function(err, resp, body) {

            callback(body);

        });

    }

}

var user = 1;

const rapid2fa = new Rapid2FA({
    api_key: '5d1c6bdad9bdf9ba416462eea1ab75623466899bb4561be09855c4baf19026be',
    api_secret: '4b04335465df00c157a23377a3e4cdb4435022991538e29529a11eaa90eaef57'
});

rapid2fa.generateSettingsPage(user, function(response) {

    console.log(response);

});

export default Rapid2FA;
