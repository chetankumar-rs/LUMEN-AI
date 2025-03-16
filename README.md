# LUMEN-AI

LUMEN-AI is a comprehensive platform designed to streamline loan application processes through an intuitive user interface and an integrated chatbot assistant. The platform aims to enhance user experience by providing seamless navigation and real-time assistance.

## Features

- **User Authentication**: Secure login functionality to protect user data and ensure authorized access.
- **Chatbot Assistant**: An interactive chatbot that assists users throughout the loan application process, addressing queries and providing guidance.
- **Eligibility Check**: A dedicated page where users can verify their eligibility for various loan products.
- **Informative Card Components**: Detailed descriptions of loan products and services presented in card formats for easy comprehension.
- **Voice Interaction**: Supports text-to-speech and speech recognition for a more accessible and user-friendly experience.

## Project Structure

The repository is organized as follows:

- **backend/**: Contains server-side code and APIs that power the platform's functionalities.
- **frontend/loan-app/**: Houses the client-side application code, including components for user interaction and interface design.
- **node_modules/**: Directory for Node.js modules and dependencies.
- **README.md**: This file, providing an overview of the project.
- **package-lock.json**: Automatically generated file that describes the exact dependency tree installed.
- **package.json**: Lists the project's dependencies and scripts.

## APIs Used

LUMEN-AI integrates the following APIs to enhance its functionalities:

1. **Servam API**:
   - Used for **text-to-speech (TTS)** and **language translation** functionalities.
   - Converts text responses into speech for a more interactive user experience.
   - Enables multilingual support by translating text into different languages.

2. **Gemini AI API**:
   - Powers the **chatbot assistant**, handling user queries and providing intelligent responses.
   - Utilized for natural language processing (NLP) to understand and interact with users effectively.

3. **Web Speech API**:
   - Facilitates **speech recognition**, allowing users to interact with the chatbot using voice commands.
   - Enhances accessibility by enabling hands-free communication with the platform.



## Getting Started

To set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chetankumar-rs/LUMEN-AI.git
