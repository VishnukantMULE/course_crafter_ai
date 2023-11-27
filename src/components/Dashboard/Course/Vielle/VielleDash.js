import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VielleDash = (props) => {
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(null);
  const [breakDetected, setBreakDetected] = useState(false);
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript !== "") {
      setIsUserSpeaking(true);
      clearTimeout(pauseTimer);
      setPauseTimer(null);
      setBreakDetected(false);

      const timeoutId = setTimeout(() => {
        setIsUserSpeaking(false);
        sendTranscriptToBackend(transcript);
      }, 2000);

      setPauseTimer(
        setTimeout(() => {
          if (!isUserSpeaking) {
            setBreakDetected(true);
          }
        }, 3000)
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(pauseTimer);
        setIsUserSpeaking(false);
        setBreakDetected(false);
      };
    }
  }, [transcript, isUserSpeaking, pauseTimer]);

  const sendTranscriptToBackend = (text) => {
    console.log("Sending transcript to backend:", text);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div>
        Your browser does not support speech recognition. Please use a
        compatible browser.
      </div>
    );
  }

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  return (
    <div>
      <div>
        <span>Listening: {listening ? "On" : "Off"}</span>
        <div>
          <button type="button" onClick={resetTranscript}>
            Reset
          </button>
          <button type="button" onClick={listenContinuously}>
            Start Listening
          </button>
          <button type="button" onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
      <div>
        {transcript.split("\n").map((item, i) => (
          <p key={i}>{item}</p>
        ))}
        {breakDetected && (
          <>
            <hr />
            Break
            <hr />
          </>
        )}
      </div>
      {isUserSpeaking && <span>...</span>}
    </div>
  );
};

export default VielleDash;
