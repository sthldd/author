$(function(){
  $.get('/lyric.json').then(function(object){
     let {lyric} = object
     let array = lyric.split('\n')
     let regex = /^\[(.+)\](.*)$/
     array = array.map(function(string,index){
        let matches = string.match(regex)
        if(matches){
            return {time:matches[1],words:matches[2]}
        }
         
     })
     console.log(array)
     let $lyric = $('.lyric')
     array.map(function(object){
       let $p = $('<p/>')
       $p.attr('data-time',object.time).text(object.words)
       $p.appendTo($lyric.children('.lines'))
    })
  })

  let audio = document.createElement('audio')
  audio.src = 'http://dl.stream.qqmusic.qq.com/C400001XdWPc3zSK8E.m4a?vkey=A6D198708073FC36887509ABBE29EF0781F1A770540EA871A22025EA47FEC0A1A7225FB6C25BB5D667A51E921E13B8C0CE041CEF4CB0219D&guid=1559421735&uin=1209624528&fromtag=66'
  audio.oncanplay = function(){
    audio.play()
    $('.disc-container').addClass('playing')
  }
  $('.icon-pause').on('click',function(){
    audio.pause()
    $('.disc-container').removeClass('playing')
  })
  $('.icon-play').on('click',function(){
    audio.play()
    $('.disc-container').addClass('playing')
  }) 
  
})