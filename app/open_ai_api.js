export function setupApiKeyInputHandler() {
    // Get a reference to the API key form and input field
    const apiKeyForm = document.querySelector('#api-key-form');
    const apiKeyInput = document.querySelector('#api-key-input');

    // Check if an API key is stored in session storage
    if (sessionStorage.getItem('apiKey')) {
        // If an API key is stored, set the value of the input field to the stored API key
        apiKeyInput.value = sessionStorage.getItem('apiKey');
    }

    // Add a submit event listener to the form
    apiKeyForm.addEventListener('submit', (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the API key from the input field
        const apiKey = apiKeyInput.value;

        // Store the API key in session storage
        sessionStorage.setItem('apiKey', apiKey);
    });
}


// Function to send text to GPT-3 and get the response
export async function sendTextToGPT3(input) {
    
    var apiKey;
    // Check if an API key is stored in session storage
    if (sessionStorage.getItem('apiKey')) {
        // If an API key is stored, set the value of the input field to the stored API key
        apiKey = sessionStorage.getItem('apiKey');
    }else
    {
        window.alert('no api key defined')
    }

    // Set the API endpoint and headers
    const endpoint = 'https://api.openai.com/v1/engines/davinci/completions';
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    });

    // Set the request body
    const body = JSON.stringify({
        prompt: input,
        max_tokens: 256,
        temperature: 0.5,
    });

    // Send the request and get the response
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: body,
    });
    const data = await response.json();

    // Return the response text
    return data.choices[0].text;
}