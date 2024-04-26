import React, { useEffect, useState } from "react";

const ImageChangeRefresh = ({ images }) => {
  const [currentImage, setCurrentImage] = useState("");

  const selectRandomImage = () => {
    if (images) {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
    }
  };

  useEffect(() => {
    selectRandomImage();
  }, [images]);

  return (
    <div className="  rounded-lg w-[60vw] mx-auto h-[50vh] bg-red-30 border-b-4 border-blue-500 border-t-4">
      {currentImage &&<img
        className=" object-contain w-[50vw] mx-auto h-[49vh] text-white"
        src={currentImage}
        alt="Random"
      />}
    </div>
  )
};

export default ImageChangeRefresh;
