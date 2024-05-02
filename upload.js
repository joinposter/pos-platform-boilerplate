import r from 'request';
import md5 from 'md5';
import fs from 'fs';
import shell from 'shelljs';
import manifest from './manifest.json' assert { type: 'json'};

const URL = 'https://platform.joinposter.com/api/application.uploadPOSPlatformBundle?format=json';
const FILENAME = 'dist/bundle.js';

(function () {
  console.log('Started bundle build, you will see a message in a minute...');

  if (!shell.exec('yarn build')) {
    console.log('Error while preparing build');
    return;
  }

  fs.readFile(FILENAME, (err, buf) => {
    if (!err) {
      const fileMd5 = md5(buf),
        signParts = [
          manifest.applicationId,
          fileMd5,
          manifest.applicationSecret,
        ],
        sign = md5(signParts.join(':'));

      const formData = {
        application_id: manifest.applicationId,
        sign,
        bundle: fs.createReadStream(`./${FILENAME}`),
      };

      r.post({
        url: URL,
        formData,
      }, (err, response, body) => {
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
      console.log(`Error while reading ${FILENAME}`);
      console.log(err);
    }
  });
}());
