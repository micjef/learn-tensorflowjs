import React, { useEffect, useState, useRef } from "react"

//1. import dependencies
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"

//6. Draw Ball
import { drawBall } from "./utilities"

const SpeechCommandRecognition = () => {
  //2. create model and action states
  const [model, setModel] = useState(null)
  const [action, setAction] = useState(null)
  const [labels, setLabels] = useState(null)

  //8. Creat canvas ref and x, y, r
  const canvasRef = useRef(null)
  const [x, setX] = useState(300)
  const [y, setY] = useState(300)
  const [r, setR] = useState(10)

  //9. update ball state
  const numberMap = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

  //3. create recognizer
  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT")
    console.log("Model loaded")

    await recognizer.ensureModelLoaded()
    console.log(recognizer.wordLabels())

    setModel(recognizer)
    setLabels(recognizer.wordLabels())
  }

  useEffect(() => {
    loadModel()
  }, [])

  useEffect(() => {
    //update position x,y
    const update =
      action === "up"
        ? setY(y - 10)
        : action === "down"
        ? setY(y + 10)
        : action === "left"
        ? setX(x - 10)
        : action === "right"
        ? setX(x + 10)
        : ""

    //update size r
    if(Object.keys(numberMap).includes(action)){
      setR(10*numberMap[action])
    }

    canvasRef.current.width = 600
    canvasRef.current.height = 600
    const ctx = canvasRef.current.getContext('2d')
    console.log(x, y, r)
    drawBall(ctx, x, y, r)
    setAction('base')
  }, [action])

  const argMax = (arr) => {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]
  }

  //4. listen for action

  const recognizerCommand = async () => {
    console.log("Listening for command")

    model.listen(
      (result) => {
        //console.log(result)
        setAction(labels[argMax(Object.values(result.scores))])
      },
      { includeSpectrogram: true, probabilityThreshold: 0.9 }
    )

    //setTimeout(() => model.stopListening(), 10e3)
  }

  return (
    <div>
      <h1>speech recognition</h1>
      {/* //7. Setup Canva */}
      <canvas
        ref={canvasRef}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 640,
        }}
      />
      {/* //5. display command to the screen */}
      <button onClick={recognizerCommand}>Say Here</button>
      {action ? <h5>{action}</h5> : <h3>No Action Detected</h3>}
    </div>
  )
}

export default SpeechCommandRecognition
