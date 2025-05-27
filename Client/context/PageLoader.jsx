
import { useContext, useState, useEffect } from 'react';
import loadingAnimation from './../src/assets/animations/loading.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { UserContext } from './userContext';
import { RankContext } from './rankContext';

const PageLoader = ({ children }) => {
  const { user, loading: userLoading } = useContext(UserContext)
  const { loading: rankLoading } = useContext(RankContext);

  const [ isReady, setIsReady ] = useState(false);

  const isStillLoading = typeof user === "undefined" || userLoading || rankLoading;

  useEffect(() => {
    if (!isStillLoading) {
      setIsReady(true);
    }
  }, [isStillLoading]);

  if (!isReady) {
    return (
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
    );
  }

  return children;

};
  
export default PageLoader;
