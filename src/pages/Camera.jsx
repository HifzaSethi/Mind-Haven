import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import useNavigation from "../hooks/useNavigationn";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const { goToAssessment } = useNavigation(); // ✅ use your custom hook

  const stopCamera = () => {
    const video = webcamRef.current?.video;
    const stream = video?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    stopCamera();
  }, []);

  const handleClose = () => {
    goToAssessment(); // ✅ this will work if hook is correct
  };

  return (
    <div className="relative flex flex-col items-center gap-6 py-6 px-4 text-center">
      {image && (
        <button
          onClick={handleClose}
          className="absolute top-6 right-40 text-2xl font-bold hover:opacity-75 transition-opacity"
          style={{ color: '#dc2626' }}
          title="Go back to Assessment"
        >
          X
        </button>
      )}

      <div className="max-w-md">
        <h2 className="text-xl font-semibold text-emerald-800 mb-2">
          Let's capture your natural expression
        </h2>
        <p className="text-sm text-gray-700">
          Please look directly into the camera and keep your face within the frame. 
          Try to stay relaxed — we want to capture your genuine expression, not a forced smile. 
          When you're ready, click the button below.
        </p>
      </div>

      {cameraOn && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg shadow-md"
          />
          <button
            onClick={capture}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Capture Photo
          </button>
        </>
      )}

      {image && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Captured Image:</h3>
          <img
            src={image}
            alt="Captured"
            className="rounded-md border shadow-md max-w-full"
          />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
