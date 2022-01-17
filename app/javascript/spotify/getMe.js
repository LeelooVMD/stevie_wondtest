const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQCMNsEPL5CkI4QYjOn39u8rP7nXtcA48onzW_ABxVvYhfWjWeV6GLMb-VEXkGYF7uWtjRTnKNMtW_VVGS3Ar0UmMluiPDw_N-7YSxd5se8GuchPEGSUmpns_6Gvj2ysyA7J_43tV1dqQ6DFOUCTjYula-4F1DoYeB1UBkGFNuDVmH_a5sMryETrmw4eZg4xZDHTF4-cG48cQmyMkz1J_MtaqRrrZwfFiGDL5ubikie3ulW6KEsHfdGL6-J15LlTF8_a8K2UkgMEuIOyzUE-Xoh7dFmVyRTi"

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

// Get my profil data
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

// Get my playlists
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("-----")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)

    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name+'.json', data);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log(track.name + " : " + track.artists[0].name)
  }

  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();
