'use strict'

var robot = require('robotjs');
var typing = false;

const admin = require('firebase-admin');

const serviceAccount = require('./firebasePrivateKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const doc = db.collection('status').doc('text');

var txt = '';

async function main() {
	typing = true
	console.log('block text update')
	for (var i = 0; i < txt.length; i++) {
  		robot.typeString(txt.charAt(i))
  		await sleep(14)
	}
	typing = false
	console.log('unblock text update')
}

const observer = doc.onSnapshot(docSnapshot => {
	if (typing == false) {
		console.log("Not typing... Updating text")
		txt = docSnapshot.data()['text'];
	}
	var type = docSnapshot.data()['type'];
	if (type && !typing) {
		main()
		db.collection("status").doc('text').update({
	    type: false,
		})
	}
	console.log(txt);
}, err => {
  	console.log(`Encountered error: ${err}`);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




