
import { addMessageToChatThread } from './chat.js';
import { sendTextToGPT3 } from './open_ai_api.js';

export function setupSpeech() {
    var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

    var recognition = new SpeechRecognition();
    window.recognition = recognition;

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

   



    const toggleMicOn = document.querySelector('#toggle-mic-on');
    toggleMicOn.addEventListener('click', (event) => {
        setTimeout(() =>{readTextAloud('listening enabled')}, 500);
        window.recognition.start();


    })

    const toggleMicOff = document.querySelector('#toggle-mic-off');
    toggleMicOff.addEventListener('click', (event) => {
        readTextAloud('listening disabled')
        setTimeout(() =>{window.recognition.abort()}, 1300);
    })

    window.chatHistory = `
    Hi I am a AI assitant. I am here to help you as best i can.
    I will do my best to provide you accurate and truthful information. 
    While i will try to be as precise as possible, a simple example of an interaction is as follows:
    user: What is the capital of France?
    ai: the capital of France is Paris`;

    recognition.addEventListener('result', (event) => {
        const input = event.results[event.resultIndex][0].transcript;
        handleUserInput(input)
    });

    recognition.onerror = (event) => {
        console.error(event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended.');
    };
    
    populateVoiceList();
    window.speechSynthesis.addEventListener("voiceschanged", () => {
        populateVoiceList();
    });
}
export function handleUserInput(input) {
    addMessageToChatThread('user', input);

    const modifiedPrompt = "user: " + input + "\nai:";
    window.chatHistory = window.chatHistory + "\n" + modifiedPrompt;
    sendTextToGPT3(window.chatHistory).then((response) => {
        // Add the input and response to the chat thread
        addMessageToChatThread('ai', response);
        // Read the response aloud
        readTextAloud(response);

    });
}
window.handleUserInput = handleUserInput

function populateVoiceList() {
    const synth = window.speechSynthesis;
    const voiceSelect = document.querySelector("#select-voice");
    let voices = []

    voices = synth.getVoices();
    voices = voices.sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();

        if (aname < bname) {
            return -1;
        } else if (aname == bname) {
            return 0;
        } else {
            return +1;
        }
    });
    const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = "";

    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        option.textContent = `${voices[i].name} (${voices[i].lang})`;

        if (voices[i].default) {
            option.textContent += " -- DEFAULT";
        }

        option.setAttribute("data-lang", voices[i].lang);
        option.setAttribute("data-name", voices[i].name);
        if (voices[i].lang.startsWith('en-')) {
            voiceSelect.appendChild(option);
        }

    }
    voiceSelect.selectedIndex = selectedIndex;
    window.voices = voices;
}
// Function to read text aloud
export function readTextAloud(text) {
    console.log('Reading aloud.');
    const utterance = new SpeechSynthesisUtterance(text);

    // get voice
    if(window.voices)
    {
        const voiceSelect = document.querySelector("#select-voice");
        const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
        for (let i = 0; i < window.voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterance.voice = window.voices[i];
                break;
            }
        }
    }
    
    window.speechSynthesis.speak(utterance);
}