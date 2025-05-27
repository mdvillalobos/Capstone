import { Player } from "@lottiefiles/react-lottie-player";
import Loader from '../../assets/animations/PageLoading2.json';

const ContentLoader = () => {
  return (
    <div className="flex flex-1 justify-center items-center w-full">
      <Player
        src={Loader}
        loop
        autoplay
        style={{ width: '30vw', height: '30vh' }}
      />
    </div>
  )
}

export default ContentLoader
