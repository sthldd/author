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
