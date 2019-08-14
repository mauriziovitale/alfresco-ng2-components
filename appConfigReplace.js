// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const fs = require('fs');

fs.readFile('./docs/release-notes/RelNote250.md', (err, appConfigString) => {
    if (err) throw err;
    let appConfig = JSON.parse(appConfigString);
    console.log(appConfig);
});
