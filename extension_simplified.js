// ==UserScript==
// @name         TypeRacer-Injection
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  An injection script for typeracer.com
// @author       Phoom Punpeng
// @match        play.typeracer.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

var textToType = ""
var typing = false
var WPM = 200 // Default value is 200 to avoid being "disqualified", however captcha is unavoidable at this point.
var delayTime = 0
var i = 0

function initialize() {
    createHackInput()
    initializeCustomItems()
}

function createHackInput() {
    var zNode = document.createElement('div');
    zNodeStartButton = '<button id="startButton" type="button">Start Hack</button><br>'
    zNodeWPMField = '<input type="text" id="wpmField"><br>'
    zNodeSetWPMButton = '<button id="setWPM" type="button">Set WPM</button>'

    zNode.innerHTML = zNodeStartButton + zNodeWPMField + zNodeSetWPMButton
    document.body.prepend(zNode);
}

function initializeCustomItems() {
    document.getElementById('startButton').addEventListener('click', startHack, false)
    document.getElementById('setWPM').addEventListener('click', setWPM, false)
    document.getElementById('wpmField').value = WPM
}

async function startHack() {
    typing = true
    console.log("Blocking text update...")

    delayTime = 60/(WPM * 5) * 1000
    console.log('delayTime (ms): ' + delayTime)

    console.log('length: ' + textToType.length)
    // type
    for (var i=0; i < textToType.length; i++) {
        var input = document.getElementsByClassName('txtInput')[0]
        input.focus()
        input.value += textToType.charAt(i)
        triggerKeyboardEvent(input, textToType.charAt(i).charCodeAt(0), 'keydown')
        input.click()
        triggerKeyboardEvent(input, textToType.charAt(i).charCodeAt(0), 'keypress')
        triggerKeyboardEvent(input, textToType.charAt(i).charCodeAt(0), 'keyup')

        await sleep(delayTime)
    }

    typing = false
    console.log("Unblocked text update...")
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function setWPM() {
    wpmField = document.getElementById("wpmField")
    WPM = wpmField.value
    delayTime = 60/(WPM * 5) * 1000
    if (WPM > 500) {
        alert("Warning: High WPM. Your account might get banned.")
    } else {
        alert("WPM saved successfully!")
    }
    console.log("WPM has been set: " + WPM)
}

function main() {
    var spans = document.querySelectorAll('[unselectable="on"]')
    console.log(spans)

    if (typing) {
        console.log("Not updating text... typing in progress")
    }
    else if (spans.length == 2) {
        textToType = spans[0].innerHTML + spans[1].innerHTML

        console.log("spans.length = " + spans.length)
        console.log("Updating text: " + textToType)
    }
    else if (spans.length == 3) {
        textToType = spans[0].innerHTML + spans[1].innerHTML + spans[2].innerHTML
        console.log("spans.length = " + spans.length)
        console.log("Updating text: " + textToType)
    }
    else {
        console.log("Not updaing text... spans.length = " + spans.length)
    }
    setTimeout(main, 2000)
}

function triggerKeyboardEvent(el, keyCode, type){
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events")
  
    if(eventObj.initEvent){
      eventObj.initEvent(type, true, true)
    }
  
    eventObj.keyCode = keyCode
    eventObj.which = keyCode
    
    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj) 
  
}

initialize()
main()

