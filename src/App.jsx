import { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_API_KEY } from './utils/constants';
import PlaceholderPath from '../src/assets/placeholder.jpg';

import './App.css'

function App() {
  const [isOnline, setOnline] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [placeholderImage, isPlaceholderImage] = useState(false);

  useEffect(() => {

    window.addEventListener('online', () => {
      setOnline(true)
    });

    window.addEventListener('offline', () => {
      setOnline(false)
    });
  }, [])



  const configuration = new Configuration({
    apiKey: OPEN_AI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    isPlaceholderImage(true);
    setResult(res?.data?.data[0]?.url)
  };

  return (
    <div className="App">
      {isOnline ? <>
        <div className='promptArea'>
          <h1 className='pageHeader'>Generate an Image using Open AI</h1>
          <label>Write Your Description To Create Your Image</label>
          <textarea
            className="app-input"
            placeholder="Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <button className='primaryButton' onClick={generateImage}>Generate an Image</button>
        </div>
        <div className='resultArea'> 
          <img src={placeholderImage ? result : PlaceholderPath} alt='DALL-E 2 - React, Open AI, Kshiteej Jain' title='DALL-E 2 - React, Open AI, Kshiteej Jain' />
        </div> </>
        :
        <h1>Offline</h1>}
    </div>
  )
}

export default App
