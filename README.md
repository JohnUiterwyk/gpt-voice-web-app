# gpt-voice-web-app

This is an experiment in creating minimalistic pure client side web app that makes use of the Web Speech API to interact with OpenAI GPT models. The motivation for this was wanting a hands free way to converse with the AI.  

## Demo
You can load a [working version of this app here](https://johnuiterwyk.github.io/gpt-voice-web-app/app/).

## Notes
- User must provide OpenAI API key
- Safari is required on iOS
- For more info on the browser support for SpeechRecognition API see [caniuse.com/speech-recognition](https://caniuse.com/speech-recognition)
- The support for speech recognition and synthesis across browsers and operating systems is very fragmeneted, leading to some challenges that are not easily overcome. For a good blog post on the subject, have a read of [jankapunkt post on dev.to](https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353) and the associated library [EasySpeech](https://github.com/jankapunkt/easy-speech) which i may incorporate in a future iteration.
- Last note, after getting this built, I also explored implementing an integration with GPT-3 via an iOS Siri Shortcut. This produced a very nice user experience, and was able to take advantage of the Siri voice and detection, which due to it's ability to leverage user specific training and apple's speech services. If I find a nice way to share that, I'll include it here.