/**
* @Author: rajasekhar
* @Date:   2016-10-13T16:05:56+05:30
* @Last modified by:   rajasekhar
* @Last modified time: 2016-10-13T16:15:50+05:30
*/



Meteor.methods({
  tailer: function(filepath){
    var BufferedFileLineReaderSync = require('buffered-file-line-reader-sync');
    var filename = "/home/rajasekhar/Desktop/testfile.txt";
    if(!filepath){ filepath = filename; }
    var options = {
      encoding: 'utf8',
      buffersize: 8192
    }
    bufferedReader = new BufferedFileLineReaderSync(filename, options);
    while(bufferedReader.hasNextLine()){
      console.log("line " + bufferedReader.nextLine());
    }
  }
});
