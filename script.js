'use strict';

const colors = ['aqua',
'azure',
'beige',
'bisque',
'blue',
'brown',
'fuschia',
'green',
'ivory',
'lime',
'gold',
'cyan',
'linen',
'orchid',
'peru',
'tangerine',
'black'
];

const grammer = '#JSGF V1.0: ' +
                'grammer colors; ' +
                'public <colors> = ' + colors.join(' | ');
const recognition = new webkitSpeechRecognition();
const speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammer, 1);
recognition.grammers = speechRecognitionList;

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
const diagnostics = document.querySelector('.output');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

let colorHTML = '';
colors.forEach(function (value){
colorHTML += '<span styles="background-color:' +
          value + '">' + value + '</span>';

});

document.body.onclick = function() {
  recognition.start();
  hints.innerHTML = 'Waiting for a color....';
}

recognition.onresult = function(event) {
  const last = event.results.length - 1;
  const color = event.results[last][0].transcript;

  diagnostics.textContent = 'Result received' + color;
  bg.style.backgroundColor = color;
  hints.innerHTML = 'Click, then say a color! Try:' + colorHTML;
};

recognition.onspeechend = function() {
  recognition.stop();
};

recognition.onnomatch = function() {
  diagnostics.textContent = 'Did not recognize color';
};

recognition.onerror = function(event) {
  diagnostics.textContent = 'Error! ' + event.error;
};
