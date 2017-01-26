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

    handleVerification(user, hash, callback) {

        needle.post(API_ENDPOINT, {
            api_key: this.api_key,
            api_secret: this.api_secret,
            method: 'verify_authentication',
            user: user,
            hash: hash
        }, function(err, resp, body) {

            callback(body);

        });

    }

}

module.exports = Rapid2FA;
