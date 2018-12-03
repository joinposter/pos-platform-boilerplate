var r = require('request');
var md5 = require('md5');
var fs = require('fs');
var shell = require('shelljs');
var manifest = require('./manifest.json');

var URL = 'http://platform.joinposter.com/api/application.uploadPOSPlatformBundle?format=json';
var FILENAME = 'bundle.js';

(function () {
    console.log('Started bundle build, you will see a message in a minute...');

    if (!shell.exec('webpack --env.p')) {
        console.log('Error while preparing build');
        return;
    }

    fs.readFile(FILENAME, function (err, buf) {
        if (!err) {
            var fileMd5 = md5(buf),
                signParts = [
                    manifest.applicationId,
                    fileMd5,
                    manifest.applicationSecret
                ],
                sign = md5(signParts.join(':'));

            var formData = {
                application_id: manifest.applicationId,
                sign: sign,
                bundle: fs.createReadStream(__dirname + '/' + FILENAME)
            };

            r.post({
                url: URL,
                formData: formData

            }, function (err, response, body) {

                if (!err) {
                    try {
                        body = JSON.parse(body);

                        if (body.error) {
                            throw new Error(JSON.stringify(body));
                        }

                        console.log('Bundle successfully sent to Poster');

                    } catch (e) {
                        console.log('Error while send bundle to Poster...');
                        console.log(e);
                    }

                } else {
                    console.log('Error while send bundle to Poster...');
                    console.log(err);
                }
            });

        } else {
            console.log('Error while reading ' + fileName);
            console.log(err);
        }
    });

})();
