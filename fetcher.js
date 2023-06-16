const URL = process.argv[2];
const localPath = process.argv[3];
const request = require('request');
const fs = require('fs');

const fetcher = function(URLCmd, pathCmd) {
  request(`${URLCmd}`, (error, response, body) => {
    console.log(`URL: ${URLCmd}`); //prints URL input for easy spell check in console
    console.log(`local path: ${pathCmd}`);//prints local path input for easy spell check in console
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //when request has error
    if (error) {
      console.log(`URL ${URLCmd} is invalid`);//telling user URL is invalid when request fails
      console.log('error:', error); //Print the atual error message
      return;
    }
    //when no error appears, take the data received and write it to a file in your local filesystem when there is no error from request
    fs.writeFile(`${pathCmd}`, body , err => {
      //when there is an error accessing local file
      if (err) {
        console.log(`local path ${pathCmd} is invalid`);//telling user local path is invalid when accessing local path fails
        console.error(err);//Print the atual error message
        return;
      }
      // when file written successfully, check the size of file
      fs.stat(`${pathCmd}`, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Downloaded and saved ${stats.size} bytes to ${pathCmd}`);
      });
    });
  });
};

fetcher(URL, localPath);