// import React, { useRef, useState, useCallback } from 'react';
// import Webcam from 'react-webcam';
// import { useAppContext } from '../../context/AppContext';

// const videoConstraints = {
//   width: 300,
//   height: 300,
//   facingMode: 'user',
// };

// const Step3 = ({ formik, setPhoto, renderError }) => {
//   const webcamRef = useRef(null);
//   const [image, setImage] = useState(null); // Always start with no image
//   const [cameraOn, setCameraOn] = useState(true); // Always start camera on

//   const { setFormValues } = useAppContext();

//   const stopCamera = () => {
//     const video = webcamRef.current?.video;
//     const stream = video?.srcObject;
//     stream?.getTracks().forEach((track) => track.stop());
//     setCameraOn(false);
//   };

//   const capture = useCallback(() => {
//     if (!webcamRef.current) return;
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return;

//     setImage(imageSrc);
//     setPhoto(imageSrc); // Update parent state
//     stopCamera();

//     // Update formik field
//     formik.setFieldValue('photo', imageSrc);

//     // Update context (only if setFormValues is available)
//     if (setFormValues) {
//       setFormValues((prev) => ({
//         ...prev,
//         photo: imageSrc,
//       }));
//     }

//     // Log photo capture with console preview
//     console.log('📸 Photo captured successfully!');
//     console.log('📏 Photo size:', imageSrc.length, 'characters');
//     console.log(
//       '🖼️ Photo preview - Copy this URL and paste in browser to view:'
//     );
//     console.log(imageSrc);

//     // Create image element for console display (some browsers show preview)
//     const previewImg = new Image();
//     previewImg.onload = () =>
//       console.log(
//         '✅ Photo ready:',
//         previewImg.width + 'x' + previewImg.height + 'px'
//       );
//     previewImg.src = imageSrc;
//     console.log('Image object:', previewImg);
//   }, [setPhoto, formik, setFormValues]);

//   const retakePhoto = () => {
//     setImage(null);
//     setPhoto('');
//     formik.setFieldValue('photo', '');

//     // Update context (only if setFormValues is available)
//     if (setFormValues) {
//       setFormValues((prev) => ({ ...prev, photo: '' }));
//     }

//     setCameraOn(true);
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 py-6 px-4 text-center">
//       <h2 className="text-xl font-semibold text-green-800">
//         Please capture your photo
//       </h2>
//       <p className="text-sm text-gray-700">
//         Look into the camera and click the button below to take a photo.
//       </p>

//       {cameraOn && !image && (
//         <>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={videoConstraints}
//             className="rounded-lg shadow-md"
//           />
//           <button
//             type="button"
//             onClick={capture}
//             className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//           >
//             Capture Photo
//           </button>
//         </>
//       )}

//       {image && (
//         <div className="text-center">
//           <h3 className="text-lg font-semibold mb-2">Captured Image:</h3>
//           <img

//             src={image}
//             alt="Captured"
//             loading="lazy"
//             className="w-32 h-32 object-cover rounded border shadow mx-auto"
//           />

//           <button
//             type="button"
//             onClick={retakePhoto}
//             className="mt-2 px-4 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition"
//           >
//             Retake Photo
//           </button>
//         </div>
//       )}

//       {/* Show error if photo is required but not captured */}
//       {renderError('photo')}

//       {/* Note: Submit button is handled by the parent component */}
//       <div className="text-sm text-gray-600 mt-4">
//         {image
//           ? '✓ Photo captured! You can now submit the assessment.'
//           : '⚠ Please capture a photo to proceed with submission.'}
//       </div>
//     </div>
//   );
// };

// export default React.memo(Step3);
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: 'user',
};

// 🔥 Helper: convert base64 → File
const base64ToFile = async (base64, filename) => {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/jpeg' });
};

const Step3 = ({ formik, setPhoto, renderError }) => {
  const webcamRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null); // for UI preview
  const [cameraOn, setCameraOn] = useState(true);

  // 🔥 Stop camera safely
  const stopCamera = () => {
    const video = webcamRef.current?.video;
    const stream = video?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  // 🔥 CAPTURE FUNCTION (FIXED)
  const capture = useCallback(async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      // ✅ Convert base64 → File
      const file = await base64ToFile(imageSrc, 'capture.jpg');

      // UI preview
      setImagePreview(imageSrc);

      // 🔥 IMPORTANT: send FILE (not base64)
      setPhoto(file);
      formik.setFieldValue('photo', file);

      stopCamera();

      console.log('✅ Image converted to file:', file);
    } catch (error) {
      console.error('Image conversion error:', error);
    }
  }, [setPhoto, formik]);

  // 🔥 Retake
  const retakePhoto = () => {
    setImagePreview(null);
    setPhoto(null);
    formik.setFieldValue('photo', '');
    setCameraOn(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-6 px-4 text-center">
      <h2 className="text-xl font-semibold text-green-800">
        Capture Your Photo
      </h2>

      <p className="text-sm text-gray-600">
        Look straight into the camera and capture your image.
      </p>

      {/* CAMERA */}
      {cameraOn && !imagePreview && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="rounded-lg shadow-md"
          />

          <button
            type="button"
            onClick={capture}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Capture Photo
          </button>
        </>
      )}

      {/* PREVIEW */}
      {imagePreview && (
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Captured Image:</h3>

          <img
            src={imagePreview}
            alt="Captured"
            className="w-32 h-32 object-cover rounded border shadow mx-auto"
          />

          <button
            type="button"
            onClick={retakePhoto}
            className="mt-3 px-4 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition"
          >
            Retake Photo
          </button>
        </div>
      )}

      {/* ERROR */}
      {renderError('photo')}

      {/* STATUS */}
      <div className="text-sm text-gray-500 mt-4">
        {imagePreview
          ? '✅ Photo captured successfully!'
          : '⚠ Please capture a photo to continue'}
      </div>
    </div>
  );
};

export default React.memo(Step3);
