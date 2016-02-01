var map;
var jiro = [];
var makers = [];
var wNames = ['日', '月', '火', '水', '木', '金', '土'];
function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.103774791, lng: 140.0878550},
    zoom: 8
  });
  $.ajax({
    url:"https://raw.githubusercontent.com/Rompei/habomaijiro-backend/master/data/habomai.json",
    dataType:"json",
    crossDomain: true,
    contenttype: "application/json",
    success: function(data, status){
      for(var i = 0; i<data.length; i++){
        if(data[i].place){
          var infoWindow = new google.maps.InfoWindow();
          var d = new Date(data[i].date);
          var content = '<p><b>' + data[i].place.name + '</b></p>' + 
            '<p>日付: ' + d.getFullYear() + '年' + d.getMonth() + '月' + d.getDate() + '日(' + wNames[d.getDay()] + ')</p>' +
            '<p>メニュー: ' + data[i].menu + '</p>' +
            '<p>値段: ' + data[i].price + '</p>' +
            '<p>感想: ' + data[i].feel + '</p>';
          if(data[i].imageUrls){
            content = addImages(content, data[i]);
          }
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].place.lat, data[i].place.lng),
            map: map,
            title: content
          });
          google.maps.event.addListener(marker, 'click', function(){
            if(infoWindow){
              infoWindow.close();
            }
            infoWindow.setContent(this.getTitle());
            infoWindow.open(map, this);
          });
          makers.push(marker);
        }
      }
    }
  });
}

function addImages(baseContent, data){
  for(var i=0; i<data.imageUrls.length; i++){
    baseContent = baseContent +  '<img src="' + data.imageUrls[i] + '">';
  }
  return baseContent;
}
