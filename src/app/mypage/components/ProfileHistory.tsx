"use client";

import React, { useState, useRef, useEffect } from "react";
import ProfileCropper from "./ProfileCropper";

type ProfileHistoryProps = {
  onClose: () => void;
  onImageChange: (img: string) => void;
};

export default function ProfileHistory({ onClose, onImageChange }: ProfileHistoryProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [historyImages, setHistoryImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 프로필 히스토리 저장/로드
  useEffect(() => {
    const stored = localStorage.getItem("profileHistory");
    if (stored) {
      setHistoryImages(JSON.parse(stored));
    }
  }, []);

  // (사진)파일 업로드
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 크롭 취소 시
  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
  };

  // 크롭 성공/완료 시
  const handleCropComplete = (croppedImage: string) => {
    // 저장
    const updated = [croppedImage, ...historyImages].slice(0, 10); // 최근 몇개까지 유지할 수 있게 (우선은 10개로)
    localStorage.setItem("profileHistory", JSON.stringify(updated));
    setHistoryImages(updated);

    // 전달
    onImageChange(croppedImage);
    setShowCropper(false);
    setSelectedImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      {!showCropper && (
        <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-4 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
          >
            ✖
          </button>
          <h2 className="text-lg font-semibold mb-2">프로필 이미지 변경</h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            이미지 업로드
          </button>

          {/* 이전 이미지 */}
          {historyImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm text-gray-700 mb-2">이전 이미지</h3>
              <div className="flex space-x-2 overflow-x-auto">
                {historyImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`history-${idx}`}
                    onClick={() => {
                      onImageChange(img);
                      onClose();
                    }}
                    className="w-14 h-14 rounded-full cursor-pointer border border-gray-300 hover:scale-105 transition"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showCropper && selectedImage && (
        <ProfileCropper
          imageSrc={selectedImage}
          onCancel={handleCropCancel}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}