/**
* @Author: rajasekhar
* @Date:   2016-10-13T15:18:30+05:30
* @Last modified by:   rajasekhar
* @Last modified time: 2016-10-13T18:48:45+05:30
*/



import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

// var lineReader = require('line-reader');
var LineNavigator = require('line-navigator');

Template.filepick.events({
  'change #file_pick'(event, instance) {
    // console.log("file " + JSON.stringify(event.target.files[0]));
    var file = event.target.files[0];
    var nooflines = instance.find('#line_count').value;
    Session.set('lineCount', 0);

    console.log("tail lines " + nooflines);
    if(!nooflines){
      nooflines = 5;
    }

    var reader = new FileReader();
    reader.onload = function(e){
      var lines = e.target.result.split("\n");
      var lineCount = lines.length - 1;
      if(lineCount == 0){ lineCount = 1; }
      Session.set('lineCount', lineCount);
    };
    reader.readAsText(file);
    var lineCount = 0;
    Meteor.setTimeout(function(){
      lineCount = Session.get('lineCount');
      console.log("lineCount " + lineCount);
      var startIndex = lineCount-nooflines;
      if(startIndex < 0){ startIndex = 0}

      var readFile = true;

      var navigator = new LineNavigator(file);

      var endFile = false;
      // while(!endFile){
        navigator.readLines(startIndex, nooflines, function(err, index, lines, isEof, progress){
          endFile = isEof;
          lines.map(function(line){
            console.log("line " + line);
            $('#tail-log').append(line + "<br>");
            startIndex++;
          });
        });
      // }
    }, 1000);
  },

  'click #file_submit'(event, instance){
    var filepath = instance.find('#file_pick').val;
    // Meteor.call('tailer', filepath, function(err, res){});
    if(filepath === ""){
      filepath = "/home/rajasekhar/Desktop/testfile.txt";
    }
    var navigator = new LineNavigator(filepath);
    navigator.readLines(0, 10, function(err, index, line, isEof, progress){
      console.log("line " + line);
    });
  }
});


// var readSync = Meteor.wrapAsync(navigator.readLines);
// while(readFile){
//   navigator.readSomeLines(startIndex, function(err, index, lines, isEof, progress){
//     startIndex = lines.length;
//     lineCount = lineCount + lines.length;
//     readFile = !isEof;
//   });
// }
// lineReader.eachLine(file, function(line, last){
//   if(!line){
//     return false;
//   }
//   console.log(line);
// });
