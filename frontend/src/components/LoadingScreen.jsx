import React from 'react';
import './LoadingScreen.css';
import canoeImage from '../phaser/assets/canoe.png';

const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="canoe-container">
        <img src={canoeImage} alt="Loading..." className="canoe" />
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
