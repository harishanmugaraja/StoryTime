const express = require('express');
const cors = require('cors');
const fs = require('fs');
const api = express();

const port = 8080;

api.use(express.json())
api.use(express.urlencoded());
api.use(cors({
    origin: '*'
}));

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

api.post('/generate', (req, res) => {
    if(!req.body.story){
        console.log("Received story: "+ req.body.story);
    }

    var story = req.body.story;
    var splitLines = story.match(/[^\.!\?]+[\.!\?]+/g);
    console.log(splitLines);

    var hash = makeid(5);
    var filename = "prompts.txt";
    var filedata = "";
    splitLines.forEach(line => {
        filedata = filedata + line.trim() + "\n"
    });
    filedata = filedata.trim();
    fs.writeFile("stories/"+hash+"/"+filename, filedata, function (err) {
        if (err) return console.log(err);
        console.log('Failed to write to file')
    });
    return "Success";
});

api.listen(port, () => console.log(`StoryTime api listening on port ${port}!`))