
import {addMessageToChatThread} from './chat.js';
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
    toggleMicOn.addEventListener('click', (event) =>{
        const utterance = new SpeechSynthesisUtterance('listening enabled');
        window.speechSynthesis.speak(utterance);

        window.recognition.start();

    })

    const toggleMicOff = document.querySelector('#toggle-mic-off');
    toggleMicOff.addEventListener('click', (event) =>{
        const utterance = new SpeechSynthesisUtterance('listening disabled');
        window.speechSynthesis.speak(utterance);
        
        window.recognition.abort();

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
}
export function handleUserInput(input){
    addMessageToChatThread('user', input);

    const modifiedPrompt = "user: "+input+ "\nai:";
    window.chatHistory = window.chatHistory + "\n"+ modifiedPrompt;
    sendTextToGPT3(window.chatHistory).then((response) => {
        // Add the input and response to the chat thread
        addMessageToChatThread('ai', response);
        // Read the response aloud
        readTextAloud(response);

    });
}
window.handleUserInput = handleUserInput

// Function to read text aloud
export function readTextAloud(text) {
    console.log('Reading aloud.');
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}