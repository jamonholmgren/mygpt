# MyGPT: Simple Node.js-powered ChatGPT Interface

A minimalistic ChatGPT client-server application built using Node.js, Express, and vanilla JavaScript. This application allows users to chat with OpenAI's gpt-4 or gpt-3.5-turbo model using a simple web interface.

I used ChatGPT to generate pretty much all of the code. It took me roughly an hour. I did very little customization.

## Features

- Authenticate with OpenAI API using an API key
- Simple web interface for chatting with the GPT-4 model
- Conversation history maintained on the client-side

## Prerequisites

- Node.js (v14 or newer)
- An OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/simple-node-chatgpt.git
cd simple-node-chatgpt
```

2. Install the dependencies:

```bash
npm install
```

## Usage

1. Start the server:

```bash
node ./server.js
```

2. Open a web browser and navigate to `http://localhost:3000`.

3. Enter your OpenAI API key in the input box and click "Authenticate".

4. Upon successful authentication, the chat interface will appear. Type your message in the input box and click "Send" to chat with the GPT-4 model.

## License

This project is licensed under the MIT License.
