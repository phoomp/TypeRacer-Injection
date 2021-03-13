// ==UserScript==
// @name         TypeRacer Injector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://play.typeracer.com/
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require      https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js
// @require      https://www.gstatic.com/firebasejs/8.3.0/firebase-firestore.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// @grant        none
// ==/UserScript==

const firebaseConfig = {
    apiKey: "AIzaSyBXDKBC7UenJOh26TvxPKcqo2P82r55rYg",
    authDomain: "typeracer-injection.firebaseapp.com",
    projectId: "typeracer-injection",
    storageBucket: "typeracer-injection.appspot.com",
    messagingSenderId: "710415688684",
    appId: "1:710415688684:web:deceda7e71a45d7be716c9"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var zNode = document.createElement ('div');
zNode.innerHTML = '<button id="startButton" type="button">' + 'Start Hack</button>'
document.body.appendChild (zNode);


function initialize() {
	document.getElementById ("startButton").addEventListener (
    "click", upload, false
	);
	main()
}

var typeText = ""

function upload() {
	document.getElementsByClassName("txtInput")[0].focus();
	db.collection("status").doc('text').update({
	    type: true,
	})
	setTimeout(downloadForTesting, 20000)

}

function downloadForTesting() {
	var img = document.getElementsByClassName("challengeImg")[0]
	console.log(img)

	let imagePath = img.getAttribute("src")
	let fileName = getFileName(imagePath)

	saveAs(imagePath, fileName)
}

function getFileName(str) {
	return str.substring(str.lastIndexOf('/') + 1)
}

function main() {
	var spans = document.querySelectorAll('[unselectable="on"]');

	console.log(spans)

	if (spans.length == 3) {
		text = spans[0].outerText + spans[1].outerText + spans[2].outerText;
	    typeText = text;

	    db.collection("status").doc('text').update({
	    text: typeText,
		})
		console.log('Updating Text: ' + typeText)
	}
	else {
		console.log('Not updating text.. span.length = ' + spans.length)
	}
	setTimeout(main, 3000)
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


initialize()


