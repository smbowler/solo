//VARIABLE DECLARATION
var data = [];
var player, drag;

//SIZE OF MAP
var board = d3.select('.container').append('svg').attr('width', 1000)
            .attr('height',600);

//DRAG FUNCTION
drag = d3.behavior.drag()
  .on("drag", function(){
    var xPos = d3.event.x;
    var yPos = d3.event.y;
    if (xPos > 1000){
      xPos = 985;
    }
    if (xPos < 0){
      xPos = 15;
    }
    if (yPos > 800){
      yPos = 785;
    }
    if (yPos < -45){
      yPos = -30;
    }
    player.attr('cx', xPos)
          .attr('cy', yPos);
  });

//ARTIST CONSTRUCTION
var Artist = function(title, cx, cy){
    artist = board.append('circle')
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 7.5)
    .attr('class', 'player')
    .style("fill", "pink")
}
//OBJECTIFY DATA
var Objectify = function(title, cx, cy){
  var nodeObj = {
    title: title,
    x: cx,
    y: cy
  };
  return nodeObj;
}

//Creating the player and appending it to the board;
player = board.append('circle')
  .attr("cx", 41)
  .attr("cy", 35)
  .attr("r", 7.5)
  .attr('class', 'player')
  .style("fill", "blue")
  .call(drag)

  player = board.append('circle')
  .attr("cx", 500)
  .attr("cy", 200)
  .attr("r", 7.5)
  .attr('class', 'player')
  .style("fill", "blue")
  .call(drag)

//SUBMIT ACTION
$( "#target" ).submit(function( event ) {
  var artistType = $('.userInput').val();
  var x = player.attr("cx");
  var y = player.attr("cy");

  Artist(artistType, x, y);
  data.push(Objectify(artistType, x, y));
  var stuff = JSON.stringify(data);
  console.log(stuff);
  window.localStorage.data = stuff;
  event.preventDefault();
});

//RENDER DATA function
var appendData = function(){
  var obj = window.localStorage.data
  objArray = JSON.parse(obj);
  for(var i = 0; i <objArray.length; i++){
    var eachArtist = objArray[i];
    for (var key in eachArtist){
      Artist(eachArtist['title'], eachArtist['x'], eachArtist['y']); 
    }
  }
}

appendData();






  








