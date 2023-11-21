import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VielleDash = (props) => {
  const [message, setMessage] = useState("");
  const [isUserSpeaking, setIsUserSpeaking] = useState(false); // Track if the user is speaking
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript !== "") {
      console.log("Received transcript:", transcript);

      setIsUserSpeaking(true);

      const timeoutId = setTimeout(() => {
        setIsUserSpeaking(false);

        sendTranscriptToBackend(transcript);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
        setIsUserSpeaking(false);
      };
    }
  }, [transcript]);

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
      <div>{message}</div>
      <div>
        <span>{transcript}</span>
        {isUserSpeaking && <span>...</span>}
      </div>
    </div>
  );
};

export default VielleDash;
