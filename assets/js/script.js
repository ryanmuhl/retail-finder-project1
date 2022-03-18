var songContainer = document.querySelector("#song-list");
var videoContainer = document.querySelector("#text-list");
var list = document.querySelector("#favorites")

//Click button to fetch Artist Data
$("#click-celebrity").click(function () {
  getArtistData();

});

//Function to fetch data from Genius API
var getArtistData = function () {
  text = $("#type-artist-name").val();

  var requestUrl = "https://genius.p.rapidapi.com/search?q=" + text;

  fetch(requestUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "genius.p.rapidapi.com",
      "x-rapidapi-key": "ac9ab99d33msh3d2e68d58bcbf83p143df8jsn672a2b9e440d",
    },
  })
    .then(function (response) {
      console.log(response)
      return response.json();

    })

    .then(function (data) {
      var allSongs = data.response.hits;

      for (var i = 0; i < allSongs.length; i++) {
        var artistSongList = allSongs[i].result.title;


        var artistSongs = document.createElement("li");
        var artistSongsText = document.createElement("a")
        artistSongsText.textContent = artistSongList;


        artistSongsText.setAttribute('id', "artist-" + i);


        songContainer.append(artistSongs);
        artistSongs.append(artistSongsText)


        // songListArray.push(artistSongList);
      }

      // localStorage.setItem("text", JSON.stringify(songListArray));

      for (i = 0; i < 10; i++) {

        //click event to target feth data from Genius API 
        document.getElementById("artist-" + i).addEventListener("click", nextAPI)

      }

      //  store for loop to local storage here - localStorage.setItem(text,jSON.stringify(the array)) artist name is key = array
    });
};

//Function to target click event within get Artist Data and pass songName
//to getSongLink parameter
function nextAPI(event) {

  $("#text-list").empty()
  var songName = event.target.text
  getSongLink(songName)

}

//Function to Fetch Shazam API
function getSongLink(param) {


  var requestUrlLink = "https://shazam.p.rapidapi.com/search?term=" + param + "&locale=en-US&offset=0&limit=5"

  fetch(requestUrlLink, {
    "method": "GET",
    "headers": {
      'x-rapidapi-host': 'shazam.p.rapidapi.com',
      'x-rapidapi-key': 'ac9ab99d33msh3d2e68d58bcbf83p143df8jsn672a2b9e440d'
    }
  })
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {

      var textList = data.tracks.hits
      var videoTextList = textList[0].track.share.href;
      var textListVideo = document.createElement("li");
      var textListVideoA = document.createElement("a");
      textListVideoA.setAttribute("href", videoTextList)

      videoContainer.append(textListVideo)
      textListVideo.append(textListVideoA)
      textListVideoA.append(videoTextList)




      $("#save-local").click(function () {

        saveButton(videoTextList)
      });


    });

};

function saveButton(info) {
  var songListArray = JSON.parse(window.localStorage.getItem("text")) || [];

  if (saveButton) {

    songListArray.push(info);
    localStorage.setItem("text", JSON.stringify(songListArray));


    for (i = 0; i < songListArray.length; i++) {

      var listContent = document.createElement("li")
      listContent.textContent = (songListArray[i])
      list.append(listContent)
      console.log("inside for Loop")

    }
  }

}


$("#clear-playlist").click(function () {
  localStorage.clear();

});


$("#clear").click(function () {
  var clearAllLists = document.getElementById("song-list")
  $(clearAllLists).empty()

});













