import React from 'react';
import './style/LoadVideo.css'

export default function LoadVideo({ videolink }) {
    // Check if the provided video link is a valid YouTube link
    const isYouTubeLink = videolink && videolink.includes('youtube.com');
    const videoId = isYouTubeLink ? getVideoId(videolink) : null;
  
    return (
      <div className={`video-container ${isYouTubeLink ? 'valid' : 'invalid'}`}>
        {isYouTubeLink ? (
          <iframe
            title="YouTube Video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="invalid-link">Invalid YouTube video link</p>
        )}
      </div>
    );
  }
  
  function getVideoId(link) {
    const videoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/i);
    return videoIdMatch ? videoIdMatch[1] : null;
  }