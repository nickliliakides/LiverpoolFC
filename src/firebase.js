import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "********************************",
  authDomain: "liverpoolfc-de252.firebaseapp.com",
  databaseURL: "https://liverpoolfc-de252.firebaseio.com",
  projectId: "liverpoolfc-de252",
  storageBucket: "liverpoolfc-de252.appspot.com",
  messagingSenderId: "437242334590"
};  

firebase.initializeApp(config);

const fdb = firebase.database();
const fdbMatches = fdb.ref('matches');
const fdbPlayers = fdb.ref('players')
const emails = fdb.ref('promotions');
const teams = fdb.ref('teams');
const positions = fdb.ref('positions');

export { 
  firebase,
  fdb,
  fdbMatches,
  fdbPlayers,
  emails,
  teams,
  positions
}

