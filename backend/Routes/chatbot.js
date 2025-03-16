// Backend: routes/generate.js
require('dotenv').config();
const express = require('express');
 
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs'); // Keep for potential debugging
const mongoose = require('mongoose'); // Add Mongoose for MongoDB
const axios = require('axios');
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Create a MongoDB schema and model for audio data
const audioSchema = new mongoose.Schema({
  requestId: String,
  timestamp: { type: Date, default: Date.now },
  originalText: String,
  audioData: String, // For storing base64 audio data
  responseData: Object, // Store the full response for reference
});

const AudioRecord = mongoose.model('AudioRecord', audioSchema);

// Text-to-speech function with MongoDB storage
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
    

     const lang="kn-IN"||"hi-IN"||"te-IN"||"ta-IN"||"bn-IN"||"ml-IN";
    const response = await axios({
      method: 'POST',
      url: 'https://api.sarvam.ai/text-to-speech',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
        'Content-Type': 'application/json'
      },
      data: {
        "inputs": [text],
        "target_language_code": lang,
        "speaker": "arvind",
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
    let audioBase64 = null;
    
    // Process the response to extract audio data (keeping the same logic)
    if (data.audios) {
      console.log('Audios field type:', typeof data.audios);
      
      if (Array.isArray(data.audios)) {
        console.log('Audios is an array with length:', data.audios.length);
        
        if (data.audios.length > 0) {
          const firstAudio = data.audios[0];
          
          if (typeof firstAudio === 'object' && firstAudio.audio_base64) {
            console.log('Found audio_base64 field in first audio object');
            audioBase64 = firstAudio.audio_base64;
          } else if (typeof firstAudio === 'string') {
            console.log('Found string array, joining elements');
            audioBase64 = data.audios.join('');
          } else if (typeof firstAudio === 'number') {
            console.log('Found numeric array (audio samples), converting to base64');
            const audioArray = new Int16Array(data.audios);
            audioBase64 = Buffer.from(audioArray.buffer).toString('base64');
          } else {
            console.log('Audio object found but no audio_base64 field');
            console.log('Available fields:', Object.keys(firstAudio));
          }
        } else {
          console.error('Audios array is empty');
        }
      } else if (typeof data.audios === 'string') {
        console.log('Audios field is a string, using directly as base64');
        audioBase64 = data.audios;
      } else if (typeof data.audios === 'object') {
        console.log('Audios field is an object with keys:', Object.keys(data.audios));
        
        for (const key of Object.keys(data.audios)) {
          const value = data.audios[key];
          if (typeof value === 'string' && value.length > 100) {
            console.log(`Found potential audio data in field '${key}'`);
            audioBase64 = value;
            break;
          }
        }
      }
    }
    
    if (!audioBase64 && data.audio_base64) {
      console.log('Found audio_base64 at root level');
      audioBase64 = data.audio_base64;
    }
    
    if (!audioBase64 && data.audio) {
      console.log('Found audio field at root level');
      audioBase64 = data.audio;
    }
    
    // Generate a unique request ID if not provided
    const requestId = data.request_id || `${new Date().toISOString().replace(/:/g, '-')}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Store in MongoDB
    if (audioBase64) {
      try {
        const audioRecord = new AudioRecord({
          requestId: requestId,
          originalText: text,
          audioData: audioBase64,
          responseData: data
        });
        
        await audioRecord.save();
        console.log('Audio data saved to MongoDB with ID:', audioRecord._id);
      } catch (dbError) {
        console.error('Error saving to MongoDB:', dbError);
      }
      
      return { audio_base64: audioBase64, request_id: requestId };
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
      if (speechData.request_id) {
        responsePayload.request_id = speechData.request_id;
      }
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


router.post('/translate', async (req, res) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api.sarvam.ai/translate',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
        'Content-Type': 'application/json'},
      data: {
        "input": req.body.input || "hello world",
        "source_language_code": req.body.source_language_code || "en-IN",
        "target_language_code": req.body.target_language_code || "kn-IN",
        "speaker_gender": req.body.speaker_gender || "Female",
        "mode": req.body.mode || "formal",
        "model": req.body.model || "mayura:v1",
        "enable_preprocessing": req.body.enable_preprocessing !== undefined ? req.body.enable_preprocessing : false,
        "output_script": req.body.output_script || "roman",
        "numerals_format": req.body.numerals_format || "international"
      }
    });

    // Return the response data from Sarvam API
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Translation error:', error.message);
    
    // Pass through error from the Sarvam API or create generic error
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || { error: 'Failed to process translation request' };
    
    return res.status(statusCode).json(errorMessage);
  }
});




module.exports = router;