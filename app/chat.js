
// Function to add a message to the chat thread
export function addMessageToChatThread(sender, message) {
    const chatThread = document.querySelector('#chat-thread');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add('chat-message-'+sender);
    messageElement.textContent = sender+": "+message+" \n";
    chatThread.appendChild(messageElement);

    // Scroll to the bottom of the chat thread
    window.scrollTo(0, document.body.scrollHeight);
}