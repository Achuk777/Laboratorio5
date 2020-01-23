
function fetchVideo(searchText){
    let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=" + searchText + "&key=AIzaSyD2Hz7-5izisYx-8dcgO5zXr0KwWalXDoM";

    $.ajax({
      url : url,
      method : "GET",
      dataType : "json",
      success : function( responseJSON ){
        displayResults( responseJSON );
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function displayResults( responseJSON ){
  let homePage = 0;

  $('.results')[1].innerHTML=`<button type="button" id="next"> Siguiente Pag </button>`;
  
  $('.results').on('click','button', (event) =>{
    
    if($(event.target)[0].id == 'next'){
      if(homePage == 0){
        $('.results')[1].innerHTML+=`
          <button type="button" id="prev"> Pag Previa </button>
          `;
      }
      homePage++;
      imageChange(homePage,responseJSON);
    }
    if($(event.target)[0].id == 'prev'){
      if(homePage == 1){
       let remove = $('#prev')[0];
       console.log(remove);
       remove.parentNode.removeChild(remove);
      }
      homePage--;
      imageChange(homePage,responseJSON);
    }
  });

  imageChange(homePage,responseJSON);
} 

function imageChange(index,responseJSON){
  let resultsList = $( '#resultList' );
  console.log(resultsList);
  console.log(index);
  resultsList.empty();

  for(let i=0 + (index*10); i<10+(index*10); i++){

  let videoId= responseJSON.items[i].id.videoId;
  let thumbnail= responseJSON.items[i].snippet.thumbnails.default.url;
  
  
    resultsList.append(`
    <li>
    <p> ${ responseJSON.items[i].snippet.title } </p>
    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
    <img src="${ thumbnail }" alt="Cargando video...">
    </a>
    </li> `);
  }
}


  


function watchForm(){
  
  let form = $( '#videoForm' );
  
  

  form.submit( ( event ) => {
    event.preventDefault();

    let searchText = $('#videoText').val();
    console.log(searchText);

    fetchVideo(searchText);
  });


}

function init(){
  watchForm();
}

init();