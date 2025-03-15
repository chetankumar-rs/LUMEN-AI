// Backend: routes/generate.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs'); // For debugging to file

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Text-to-speech function with correct response handling
async function textToSpeech(text) {
  if (!text || text.trim() === '') {
    console.error('Empty text provided to TTS function');
    return { error: 'Empty text provided' };
  }

  try {
    console.log('Making TTS API request with text:', text.substring(0, 50) + '...');
    
    // Check if API key is set
    if (!process.env.SARVAM_API_KEY) {
      console.error('SARVAM_API_KEY is not set in environment variables');
      return { error: 'API key is missing' };
    }
    
    const response = await axios({
      method: 'POST',
      url: 'https://api.sarvam.ai/text-to-speech',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
        'Content-Type': 'application/json'
      },
      data: {
        "inputs": [text],
        "target_language_code": "en-IN",
        "speaker": "meera",
        "pitch": 0,
        "pace": 1.0,
        "loudness": 1.0,
        "speech_sample_rate": 22050,
        "enable_preprocessing": true,
        "model": "bulbul:v1"
      },
      timeout: 15000
    });
    
    console.log('TTS API response status:', response.status);
    console.log('Response content-type:', response.headers['content-type']);
    
    const data = response.data;
    
    // Debug: Save the full response to a file for inspection
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    fs.writeFileSync(`sarvam-response-${timestamp}.json`, JSON.stringify(data, null, 2));
    console.log(`Logged sarvam-response to sarvam-response-${timestamp}.json`);
    
    // Log the structure of the response
    console.log('Received JSON response structure:', Object.keys(data));
    
    // Check if audios field exists and process it
    if (data.audios) {
      console.log('Audios field type:', typeof data.audios);
      
      // Handle array of audio objects
      if (Array.isArray(data.audios)) {
        console.log('Audios is an array with length:', data.audios.length);
        
        if (data.audios.length > 0) {
          const firstAudio = data.audios[0];
          
          // If it's an object with audio_base64 field
          if (typeof firstAudio === 'object' && firstAudio.audio_base64) {
            console.log('Found audio_base64 field in first audio object');
            return { audio_base64: firstAudio.audio_base64 };
          }
          
          // If it's a string array, join them
          if (typeof firstAudio === 'string') {
            console.log('Found string array, joining elements');
            return { audio_base64: data.audios.join('') };
          }
          
          // If it's a numeric array (likely audio samples), convert to base64
          if (typeof firstAudio === 'number') {
            console.log('Found numeric array (audio samples), converting to base64');
            // Convert array of numbers to Int16Array
            const audioArray = new Int16Array(data.audios);
            // Convert to base64
            const base64 = Buffer.from(audioArray.buffer).toString('base64');
            return { audio_base64: base64 };
          }
          
          console.log('Audio object found but no audio_base64 field');
          console.log('Available fields:', Object.keys(firstAudio));
        } else {
          console.error('Audios array is empty');
        }
      } 
      // Handle string directly
      else if (typeof data.audios === 'string') {
        console.log('Audios field is a string, using directly as base64');
        return { audio_base64: data.audios };
      }
      // Handle object with nested audio data
      else if (typeof data.audios === 'object') {
        console.log('Audios field is an object with keys:', Object.keys(data.audios));
        
        // Try to find any field that might contain the audio data
        for (const key of Object.keys(data.audios)) {
          const value = data.audios[key];
          if (typeof value === 'string' && value.length > 100) {
            console.log(`Found potential audio data in field '${key}'`);
            return { audio_base64: value };
          }
        }
      }
    }
    
    // Handle direct audio field
    if (data.audio_base64) {
      console.log('Found audio_base64 at root level');
      return { audio_base64: data.audio_base64 };
    }
    
    // Handle audio field
    if (data.audio) {
      console.log('Found audio field at root level');
      return { audio_base64: data.audio };
    }
    
    console.error('No valid audio data structure found in response');
    return { error: 'No valid audio data structure found in response', responseData: data };
    
  } catch (error) {
    console.error('TTS Error:', error.message);
    
    if (error.response) {
      return { 
        error: `API error ${error.response.status}`, 
        details: error.response.data
      };
    } else {
      return { error: error.message };
    }
  }
}

// Combined route for text generation and text-to-speech
router.post('/g', async (req, res) => {
  const prompt = req.body.prompt || "java means";
  
  try {
    // Generate text response from Gemini
    console.log('Generating content for prompt:', prompt);
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    
    console.log('Generated text:', textResponse);
    
    // Get speech from text-to-speech API
    console.log('Sending text to speech API...');
    const speechData = await textToSpeech(textResponse);
    
    // Construct the response
    const responsePayload = {
      text: textResponse,
      speech: { audios: [] }
    };
    
    if (speechData.audio_base64) {
      responsePayload.speech.audios = [{ audio_base64: speechData.audio_base64 }];
      console.log('Audio data added to response payload');
    } else if (speechData.error) {
      responsePayload.error = speechData.error;
      console.error('Error in speech generation:', speechData.error);
    }
    
    res.json(responsePayload);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content', 
      details: error.message 
    });
  }
});

module.exports = router;