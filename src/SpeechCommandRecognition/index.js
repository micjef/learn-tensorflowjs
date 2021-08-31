import React, { useEffect, useState } from 'react'

//1. import dependencies
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"
import { div } from '@tensorflow/tfjs'

const SpeechCommandRecognition = () => {
  //2. create model and action states
  const [model, setModel] = useState(null)
  const [action, setAction] = useState(null)
  const [labels, setLabels] = useState(null)

  //3. create recognizer 
  const loadModel = async () => {
    const recognizer = await speech.create('BROWSER_FFT')
    console.log('Model loaded')

    await recognizer.ensureModelLoaded()
    console.log(recognizer.wordLabels())

    setModel(recognizer)
    setLabels(recognizer.wordLabels())
  }

  useEffect(() => {loadModel()}, [])

  //4. listen for action
  const argMax = (arr) => {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]
  }

  const recognizerCommand =async () => {
    console.log('Listening for command')

    model.listen(result => {
      console.log(result)
      setAction(labels[argMax(Object.values(result.scores))])
    }, {includeSpectrogram: true, probabilityThreshold: 0.7})

    setTimeout(() => model.stopListening(), 10e3)
  }

  return (
    <div>
      <h1>speech recognition</h1>
      {/* //5. display command to the screen */}
      <button onClick={recognizerCommand} >Say Here</button>
      {action ? <h5>{action}</h5> : <h3>No Action Detected</h3>}
    </div>
  )
}

export default SpeechCommandRecognition
