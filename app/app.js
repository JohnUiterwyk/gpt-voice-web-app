// Import the speech functions and manageApiKey function
import { setupSpeech } from './speech.js';
import { setupApiKeyInputHandler } from './open_ai_api.js';







window.onload = () => {
    setupApiKeyInputHandler();
    setupSpeech();
  };

