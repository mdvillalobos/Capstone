import loadingAnimation from '../../assets/animations/loading2.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center min-h-[90vh]">
    <span className=''>
      <DotLottieReact
        src={loadingAnimation}
        loop
        autoplay
        style={{ width: '20vw', height: '20vh' }}
      />
    </span>
  </div>

);
  
export default LoadingSpinner;
