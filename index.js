let playPause = document.getElementById('play-pause')
let music = document.getElementById('audio')
let musicArtist = document.getElementById('music-artist')
let musicTitle =document.getElementById('music-title')
let volume = document.getElementById('volume')
let forward= document.getElementById('forward')
let backward= document.getElementById('backward')
let playListInfo = document.getElementById('playlist-info')
let trackCounter= document.getElementById('track')
let indicator= document.getElementById('indicator')
let playState =music.pause
let currentTrack = 0
let tracks= [
	{
		id:1,
		src:'./love.mp3',
		artist:'Tony-lanz',
		title: 'Luv'
	},
	{
		id:2,
		src:'./high.mp3',
		artist:'Shadee',
		title: 'high'
	}
]
function update(id) {
	musicArtist.innerHTML= tracks[id].artist
	musicTitle.innerHTML= tracks[id].title
	music.src=tracks[id].src
	playListInfo.innerHTML= `${id+1} / ${tracks.length}`
	music.load()
}

window.addEventListener('load', update(currentTrack))

// button working for pause and play
function playPauseMusic() {
	let setTracker
	if (playState) {
		music.play()
		playState= !playState
		setTracker= setInterval(updateTractState,1000)
	} else{
		music.pause()
		playState= !playState
		clearInterval(setTracker)
	}
}
playPause.addEventListener('click', function() {
	playPauseMusic()
})
// event to trigger when current music end
music.addEventListener('play', function () {
	playPause.innerHTML=`<i class="fa fa-pause fa-2x"></i>`
	indicator.style.WebkitAnimation='rotate 5s infinite linear'
	updateTractState()
})
music.addEventListener('pause', function () {
	
	playPause.innerHTML=`<i class="fa fa-play fa-2x"></i>`
	indicator.style.WebkitAnimation=''
	updateTractState()
})

// To control volume
volume.addEventListener('change', function () {
	music.muted= false
	music.volume= this.value/100
	console.log(this.value)
})

// function that update track as music play
function updateTractState() {
	trackCounter.value= (music.currentTime*100)/music.duration
}

//to next traks
forward.addEventListener('click',function() {
	if(currentTrack<tracks.length-1){
		currentTrack++
		update(currentTrack)
		music.play()
	}else{
		currentTrack= 0
		update(currentTrack)
		music.play()
	}

})
// to back track
backward.addEventListener('click',function() {
	if(currentTrack>tracks.length-1){
		currentTrack--
		update(currentTrack)
		music.play()
	}else{
		currentTrack= 0
		update(currentTrack)
		music.play()
	}

})
fetch('https://api.deezer.com/playlist',{
	method: 'GET',
	headers:{
		JSON:'application/json'
	}
}).then(response=>console.log(response.json()))