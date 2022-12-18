// Import the speech functions and manageApiKey function
import { setupSpeech } from './speech.js';
import { setupApiKeyInputHandler } from './open_ai_api.js';







window.onload = () => {
    setupApiKeyInputHandler();
    setupSpeech();
    document.body.onclick = function() {
        const utterance = new SpeechSynthesisUtterance('speech enabled');
        window.speechSynthesis.speak(utterance);

        window.recognition.start();
      }

  };

