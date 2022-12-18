
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

    var chatHistory = ""

    recognition.addEventListener('result', (event) => {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        const input = event.results[event.resultIndex][0].transcript;
        addMessageToChatThread('user', input);

        const modifiedPrompt = "USER: "+input+ "\nAI:";
        chatHistory = chatHistory + "\n"+ modifiedPrompt;
        sendTextToGPT3(chatHistory).then((response) => {
            // Add the input and response to the chat thread
            addMessageToChatThread('gpt3', response);
            // Read the response aloud
            readTextAloud(response);

        });
    });

    recognition.onerror = (event) => {
        console.error(event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended.');
    };
    recognition.start()
}

// Function to read text aloud
export function readTextAloud(text) {
    console.log('Reading aloud.');
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}