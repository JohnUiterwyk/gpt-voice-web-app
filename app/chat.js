
// Function to add a message to the chat thread
export function addMessageToChatThread(sender, message) {
    const chatThread = document.querySelector('#chat-thread');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender);
    messageElement.textContent = sender+": "+message+" \n";
    chatThread.appendChild(messageElement);
}