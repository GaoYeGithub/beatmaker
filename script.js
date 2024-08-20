$(document).ready(function() {
  var sounds = [
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0025.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0010.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/SD0000.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/RS.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/OH25.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/MA.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CY0010.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CH.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CB.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/BD0010.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/BD0000.mp3'),
    new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/CP.mp3')
  ];

  var recording = [];
  var isRecording = false;

  $('#volume').on('input', function() {
    var volume = $(this).val();
    sounds.forEach(function(sound) {
      sound.volume = volume;
    });
  });

  function playSound(padIndex) {
    sounds[padIndex].currentTime = 0;
    sounds[padIndex].play();

    if (isRecording) {
      recording.push({ padIndex: padIndex, time: Date.now() });
    }
  }

  $('.box').mousedown(function() {
    var index = $(this).index();
    playSound(index);
  });

  $(window).keydown(function(e) {
    var code = e.keyCode;
    var index = $(".box[data-code='" + code + "']").index();
    if (index !== -1) {
      playSound(index);
      $(".box[data-code='" + code + "']").addClass("active");
    }
  });

  $(window).keyup(function(e) {
    var code = e.keyCode;
    $(".box[data-code='" + code + "']").removeClass("active");
  });

  $('#record').click(function() {
    recording = [];
    isRecording = true;
  });

  $('#playback').click(function() {
    if (recording.length > 0) {
      isRecording = false;
      var startTime = recording[0].time;
      recording.forEach(function(note) {
        setTimeout(function() {
          playSound(note.padIndex);
        }, note.time - startTime);
      });
    }
  });
});
