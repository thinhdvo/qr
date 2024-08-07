import inquirer from 'inquirer';
import fs from "fs";
import qr from 'qr-image';
import { appendFile } from "node:fs"

inquirer
    .prompt([
        /* Pass your questions in here */
        {
            name: "URL",
            message: "Type your URL: "
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        var qr_svg = qr.image(answers.URL);
        qr_svg.pipe(fs.createWriteStream(answers.URL + ".png"));
        appendFile('qr.txt', `${answers.URL}\n`, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });