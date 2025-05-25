import React from 'react';
import loadingAnimation from '../../assets/animations/loading.json';
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingSpinner = React.memo(() => (
  <div className="flex flex-col justify-center items-center min-h-[90vh]">
    <span className=''>
      <Player
        src={loadingAnimation}
        loop
        autoplay
        style={{ width: '20vw', height: '20vh' }}
      />
    </span>
  </div>

));
  
export default LoadingSpinner;
