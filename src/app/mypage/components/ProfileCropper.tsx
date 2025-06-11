"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

type ProfileCropperProps = {
  imageSrc: string;
  onCancel: () => void;
  onCropComplete: (croppedImage: string) => void;
};

export default function ProfileCropper({
  imageSrc,
  onCancel,
  onCropComplete,
}: ProfileCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const onCropConfirm = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
    onCropComplete(croppedImg);
  };

  return (
    <div className="relative w-[300px] h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropCompleteInternal}
      />
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-4 px-4">
        <button
          onClick={onCancel}
          className="bg-gray-300 rounded px-4 py-2 hover:bg-gray-400"
        >
          취소
        </button>
        <button
          onClick={onCropConfirm}
          className="bg-cyan-500 rounded px-4 py-2 text-white hover:bg-cyan-600"
        >
          적용
        </button>
      </div>
    </div>
  );
}
