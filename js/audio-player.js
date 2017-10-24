$(function(){

  var audio;


  // AUDIO INITIALIZER

  function initAudio(element){

    audio = new Audio('media/' + element.attr('file'));

    $("#song-title").empty();
    $("#song-artist").empty();
    $("#song-album").empty();

    $("#song-title").html(element.attr('song'));
    $("#song-artist").html(element.attr('artist'));
    $("#song-album").html(element.attr('album'));
    $("#cover").attr("src", "imgs/" + element.attr('cover'));

    element.addClass('active');
    showDuration();
  }


  // TIME DURATION UPDATE [PROGRESS BAR AND TIME INFOS]

  function showDuration(){

    $(audio).bind('timeupdate', function(){

      var s1 = parseInt(audio.currentTime % 60);
      var m1 = parseInt((audio.currentTime / 60) % 60);
      var s0 = parseInt((audio.duration - audio.currentTime) % 60);
      var m0 = parseInt(((audio.currentTime - audio.duration) / 60) % 60);

      if (s1 < 10) { s1 = '0' + s1; }
      if (s0 < 10) { s0 = '0' + s0; }

      $('#time-start').html(m1 + ':' + s1);
      $('#time-end'  ).html(m0 + ':' + s0);

      var value = 0;

      if (audio.currentTime > 0) {
        value = Math.floor((100 / audio.duration) * audio.currentTime);
      }

      $('.audio-player-progress-bar').css('width', value + '%');

      // autoplay next song
      if (audio.currentTime >= (audio.duration)){
        $('#forward').trigger('click');
      }
    });
  }


  // PLAY-PAUSE BUTTON

  $("#playpause").click(function(){
    if($(this).hasClass("fa-play")){
      $(this).removeClass("fa-play").addClass("fa-pause");
      audio.play();
      showDuration();
    } else if ($(this).hasClass("fa-pause")){
      $(this).removeClass("fa-pause").addClass("fa-play");
      audio.pause();
    }
  });


  // MOVE TO NEXT TRACK [CLICK ON NEXT BUTTON]

  $('#forward').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    $('#playlist li.active').removeClass("active");
    if (next.length == 0) {
      next = $('#playlist li:first-child');
    }
    if($("#playpause").hasClass("fa-play")){
      $("#playpause").removeClass("fa-play").addClass("fa-pause");
    }
    initAudio(next);
    audio.play();
    showDuration();
  });


  // MOVE TO PREVIOUS TRACK [CLICK ON PREVIOUS BUTTON]

  $('#backward').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    $('#playlist li.active').removeClass("active");
    if (prev.length == 0) {
      prev = $('#playlist li:last-child');
    }
    if($("#playpause").hasClass("fa-play")){
      $("#playpause").removeClass("fa-play").addClass("fa-pause");
    }
    initAudio(prev);
    audio.play();
    showDuration();
  });


  // RANDOM SORT OF PLAYLIST TRACKS [CLICK ON RANDOM BUTTON]

  $('#random').click(function(){
    var parent = $("#playlist");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
  });


  // SHOW-HIDE PLAYLIST [CLICK ON PLAYLIST BUTTON]

  $('#show-playlist').click(function(){
    $("#playlist").slideToggle();
  });


  // CHANGE TRACK [CLICK ON TRACK IN THE PLAYLIST]

  $('#playlist li').click(function () {
    audio.pause();
    $('#playlist li.active').removeClass("active");
    initAudio($(this));
    audio.play();
    showDuration();
  });


  // MOVE ON TRACK [CLICK ON DURATION BAR]

  $('.audio-player-progress').on('click', function(e) {
    var percent = Math.floor(100 * e.offsetX / $('.audio-player-progress').width());
    audio.currentTime = percent * audio.duration / 100;
  });


  // SHOW-HIDE AUDIO BUTTONS [HOVER ON CURRENT SONG INFOS]

  $('#controler').hover(function() {
    $('#audio-control').show();
    $('#infos-song').hide();
  },
  function() {
    $('#audio-control').hide();
    $('#infos-song').show();
  });


  // SHOW-HIDE AUDIO BUTTONS [HOVER ON ALBUM COVER]

  $('#audio-image').hover(function() {
    $('#audio-control').show();
    $('#infos-song').hide();
  },
  function() {
    $('#audio-control').hide();
    $('#infos-song').show();
  });


  // SHOW-HIDE AUDIO BUTTONS [HOVER ON HEADER]

  $('.header').hover(function() {
    $('#audio-control').show();
    $('#infos-song').hide();
  },
  function() {
    $('#audio-control').hide();
    $('#infos-song').show();
  });


  // ON PAGE REFRESH -> PLAY FIRST SONG

  initAudio($('#playlist li:first-child'));
  audio.play();
  $('#playpause').trigger('click');
  $('#playpause').trigger('click');
});
