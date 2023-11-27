import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash, FaStopCircle  } from 'react-icons/fa'; // Import icons
import './style/VielleDash.css';
import { MdLockReset } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";




export default function VielleDash(props)
 {
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [pauseTimer, setPauseTimer] = useState(null);
  const [breakDetected, setBreakDetected] = useState(false);
  const [lastTranscript, setLastTranscript] = useState("");
  const [backendResponse, setBackendResponse] = useState("");
  const [isSpeechInterrupted, setIsSpeechInterrupted] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      if (pauseTimer) {
        clearTimeout(pauseTimer);
      }
      setPauseTimer(
        setTimeout(() => {
          setIsUserSpeaking(false);
          setBreakDetected(true);
          if (!isSpeechInterrupted) {
            sendTranscriptToBackend(
              transcript.slice(lastTranscript.length).trim()
            );
          }
          setLastTranscript(transcript);
        }, 3000)
      );
    }// eslint-disable-next-line
  }, [listening, transcript, isSpeechInterrupted]);

  useEffect(() => {
    // Speak the backend response when it changes
    if (backendResponse) {
      speak(backendResponse);
    }// eslint-disable-next-line
  }, [backendResponse]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Stop listening before speaking
    SpeechRecognition.stopListening();

    setIsUserSpeaking(true); // Set speaking indicator to true

    synth.speak(utterance);

    // Event listener to handle when speech ends
    utterance.onend = () => {
      // Additional logic after speech ends, if needed
      setIsUserSpeaking(false); // Reset speaking indicator
      if (!isSpeechInterrupted) {
        // Start listening after speech ends
        SpeechRecognition.startListening({
          continuous: true,
          language: "en-IN",
        });
      } else {
        setIsSpeechInterrupted(false);
      }
    };
  };

  const sendTranscriptToBackend = (text) => {
    fetch("https://coursecrafterai.onrender.com/vielle/getmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setBackendResponse(data.message); // Set the backend response in the state
      })
      .catch((error) => {
        console.error("Error:", error);
        setBackendResponse("Error processing the request");
      });
  };
  const handleGoBack = () => {
    props.onGoBack();
  };


  const listenContinuously = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.stopListening();
    }

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  const stopSpeech = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
  };

  return (
    <div className="main-container">
      <div className="listening-container">
        <span className="listening-status">
          {listening ? (
            <>
               Listening:  <FaMicrophone />
            </>
          ) : (
            <>
               Listening:  <FaMicrophoneSlash />
            </>
          )}
        </span>
        
       
        <div className="buttons-container">
        <button className="buttonp button" onClick={handleGoBack}><IoArrowBackSharp /> &nbsp;
        Go Back
      </button>
          <button className="buttonp button" type="button" onClick={resetTranscript}>
          <MdLockReset />  &nbsp; reset

          </button>
         
          <button className="buttonp button" type="button" onClick={listenContinuously}>
          {listening ? (
            <>
             <FaMicrophone />  &nbsp; on
            </>
          ) : (
            <>
            <FaMicrophoneSlash />  &nbsp; off
            </>
          )}
          </button>
          <button className="buttonp button" type="button" onClick={stopSpeech}>
          <FaStopCircle /> stop
          </button>
        </div>
      </div>

      <div className="human-container">
        <div className="transcript-container">
          {transcript.split("\n").map((item, i) => (
            <p key={i} className="transcript-line">{item}</p>
          ))}
          {breakDetected && (
            <>
              <hr className="break-line" />
              break
              <hr className="break-line" />
            </>
          )}
        </div>
        {isUserSpeaking && <span className="speaking-indicator">...</span>}
      </div>

      <div className="ai-container">
        {backendResponse && (
          <div className="backend-response-container">
            <hr className="backend-response-line" />
            <p className="backend-response-label">Vielle Response:</p>
            <p className="backend-response-content">{backendResponse}</p>
            <hr className="backend-response-line" />
          </div>
        )}
      </div>
      
    </div>
  );
};


