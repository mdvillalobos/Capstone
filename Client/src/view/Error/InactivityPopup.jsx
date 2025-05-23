import { PiWarningOctagonBold } from "react-icons/pi";

const InactivityPopup = ({ isVisible, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen oveflow-hidden bg-black/40 font-Poppins">
      <div className='w-[30%] bg-white shadow-lg fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%] rounded-md px-5 py-4'>
        <div className="flex flex-col items-center justify-center space-y-5">
          <PiWarningOctagonBold className="text-8xl"/>
          <div className="text-center">
            <p className="text-2xl">Session Timeout!</p>
            <p className="">You have been logout due to inactivity.</p>
          </div>
          <button onClick={onConfirm} className="fileSubmit">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default InactivityPopup