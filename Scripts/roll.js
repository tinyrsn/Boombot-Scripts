/**/// Description: Boombot rolls a dice and returns a number between 1 and 6
/**///
/**/// Dependencies: None
/**///
/**/// Author: https://github.com/tinyrsn
/**///
/**/// Notes: None
exports.trigger = '/roll';
exports.listed = true;
exports.script = function(boombot, data) {
  var rndm = Math.floor((Math.random() * 6)+1);
  boombot.bot.speak(data.name+", you rolled a "+rndm+".");
}