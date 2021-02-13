//get link from the input box
const getLink = () => {
    const userSong = document.getElementById("search-field").value;
    const wholeLink = "https://api.lyrics.ovh/suggest/" + userSong;
    // console.log(wholeLink)
    return wholeLink;
}


//onclick search button a Event listener
const searchSong = () => {
    const wholeLink = getLink();
    toggleSpinner()
    fetch(wholeLink)
    .then(res => res.json())
    .then(data => {
        // console.log(data.data)
        const lyricsBox = document.getElementById("song-lyrics");
        const songs = document.getElementById("songs-container");
        const arrayOfMusics = data.data;
        songs.innerText = "";
        lyricsBox.innerText = "";

        arrayOfMusics.forEach(element => {
            let song = document.createElement("div");
            // console.log(element.title);
            const musicInfo = `
                <div id="song-container" class="single-result row align-items-center my-3 py-4">
                <div class="col-md-9">
                    <h3  class="lyrics-name">${element.title}</h3>
                    <p  class="author lead">Album by <span>${element.artist.name}</span> </p>
                    <audio controls>
                        <source id="songSource" src="${element.preview}" type="audio/ogg">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick='getLyrics("${element.artist.name}","${element.title}" )' class="btn btn-success">get Lyrics</button>
                </div>
                </div>
            `
            song.innerHTML = musicInfo;
            songs.appendChild(song);
            toggleSpinner()

            
        });
    });
};


//get lyrics whe the button will be clicked
const getLyrics = (author,title) => {

    const link =  `https://api.lyrics.ovh/v1/${author}/${title}`;
    console.log(link);
    fetch(link)
    .then(res => res.json())
    .then(data => {
        showLyrics(data.lyrics);
    })
}


//showing lyrics at the top of the display
const showLyrics = (lyric) => {
    const lyricsBox = document.getElementById("song-lyrics");
    lyricsBox.innerText = lyric;
}
const toggleSpinner = () => {
    const spinner = document.getElementById("toggle-spinner");
    const songs = document.getElementById("songs-container");
    spinner.classList.toggle("d-none");
    songs.classList.toggle("d-none");
}


