const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('node:child_process');
// const exec = require('await-exec');
const api = express();
const port = 8080;
var most_recent_hash;

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

api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

api.get('/download', (req, res) => {
  res.download("stories/"+most_recent_hash+"/movie.avi")
});

api.post('/generate', async (req, res) => {

    if(!req.body.story){
        console.log("Received story: "+ req.body.story);
    }

    var story = req.body.story;
    var splitLines = story.match(/[^\.!\?]+[\.!\?]+/g);
    console.log(splitLines);

    var hash = makeid(5);
    most_recent_hash = hash;
    var filename = "prompts.txt";
    var filedata = "";
    splitLines.forEach(line => {
        filedata = filedata + line.trim() + "\n"
    });
    filedata = filedata.trim();
    fs.mkdirSync("stories/"+hash+"/", {recursive: true})
    fs.writeFile("stories/"+hash+"/"+filename, filedata, function (err) {
        if (err) return console.log(err);
        console.log('Wrote to file!')
    });


    // await exec('python scripts/txt2img.py --from-file stories/'+hash+'/prompts.txt --ddim_steps 128 --scale 7.5 --H 256 --W 320 --n_iter 1 --n_samples 1 --outdir stories/'+hash+' --seed '+ (Math.floor(Math.random() * 10000000) + 1)+'');

    // await exec('python generator.py '+hash+'');


    exec('python scripts/txt2img.py --from-file stories/'+hash+'/prompts.txt --ddim_steps 128 --scale 7.5 --H 256 --W 320 --n_iter 1 --n_samples 1 --outdir stories/'+hash+' --seed '+ (Math.floor(Math.random() * 10000000) + 1)+'' , (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
          // log and return if we encounter an error
          console.error("could not execute command: ", err)
          return
      }
      // log the output received from the command
      console.log("Output: \n", output)
      exec('python generator.py '+hash+'', (err, output) => {
        // once the command has completed, the callback function is called
        if (err) {
            // log and return if we encounter an error
            console.error("could not execute command: ", err)
            return
        }
        // log the output received from the command
        console.log("Output: \n", output)
        console.log("downloading now!")
        res.redirect('/download');
      });
    });



});

api.listen(port, () => console.log(`StoryTime api listening on port ${port}!`))
