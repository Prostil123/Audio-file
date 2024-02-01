 // Get the audio element
 var audio = document.getElementById("myAudio");

 var play=document.getElementById("play");
 var pause=document.getElementById("pause");
 var audioFileInput = document.getElementById("audioFileInput");
 var playlistItems = document.getElementById("playlistItems");

 // Array to store playlist items
 var playlist = [];


 // Add event listener to play the audio
 play.addEventListener("click", function() {
    audio.play();
});
 

 // Add event listener to pause the audio
 pause.addEventListener("click", function() {
    audio.pause();
});

audioFileInput.addEventListener("change", function(event) {
    var file = event.target.files[0];
    
    if (file) {
        var objectURL = URL.createObjectURL(file);
        audio.src = objectURL;
        // Add the file to the playlist
        addToPlaylist(file.name);

        // Read the contents of the file using FileReader
        var reader = new FileReader();

        reader.onload = function(e) {
            var audioData = e.target.result;

            // Store the audio data in localStorage (you can use other storage methods as needed)
            localStorage.setItem("audioData", audioData);
        };

        reader.readAsDataURL(file);
    }
});
// Function to add an item to the playlist
function addToPlaylist(fileName) {
    var listItem = document.createElement("li");
    listItem.textContent = fileName;
    listItem.addEventListener("click", function() {
        // Set the now playing audio source to the selected file
        audio.src = URL.createObjectURL(playlist[playlist.indexOf(fileName)]);
        audio.play();
        updateNowPlayingView(fileName);
    });

    // Add the file to the playlist array
    playlist.push(fileName);

    // Add the item to the playlistItems ul
    playlistItems.appendChild(listItem);
}
