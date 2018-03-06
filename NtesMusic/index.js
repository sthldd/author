$(function(){
  $.get('./songs.json').then(function(response){
      let items = response
      items.forEach((i)=>{
        let $li = $(`
        <li>
        <a href="./song.html?id=${i.id}">
          <h3>${i.name}</h3>  
          <p>${i.author}</p> 
            <i class="iconfont icon-play-music"></i>
        </a>
      </li>  
        `)
        $('#musicList').append($li)
      })
       $('#load').remove()
      },function(){
  })
})

/*  <li>
        <a class="begain-music" href="./song.html">
          <h3>歌曲名</h3>  
          <p>
            <svg class="sq">
              <use xlink:href="#icon-sq"></use>
            </svg>
            演唱者-专辑</p>  
          <i class="iconfont icon-play-music"></i>
        </a>
      </li>  
<svg class="sq">
              <use xlink:href="#icon-sq"></use>
          </svg>

*/