"use client";

import React, { useState, useRef, useEffect } from "react";
import ProfileCropper from "./ProfileCropper";

interface ProfileHistoryProps {
  onClose: () => void;
  onImageChange: (img: string) => void;
}

export default function ProfileHistory({ onClose, onImageChange }: ProfileHistoryProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [historyImages, setHistoryImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = "https://hanseifitu.shop";

  useEffect(() => {
    const fetchHistory = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/body-image/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("히스토리 불러오기 실패");

        const data = await res.json();
        const urls = data.map((item: any) => item.url);
        setHistoryImages(urls);
      } catch (err) {
        console.error("프로필 히스토리 에러:", err);
      }
    };

    fetchHistory();
  }, []);

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

  const handleCropCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
  };

  const handleCropComplete = async (croppedImage: string) => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;

    try {
      // base64 -> Blob -> FormData
      const blob = await (await fetch(croppedImage)).blob();
      const formData = new FormData();
      formData.append("image", blob, "profile.jpg");

      const res = await fetch(`${API_BASE}/body-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("이미지 업로드 실패");

      const data = await res.json();
      const newUrl = data.imageUrl;
      const updated = [newUrl, ...historyImages].slice(0, 10);
      setHistoryImages(updated);
      onImageChange(newUrl);
      onClose();
    } catch (err) {
      console.error("이미지 업로드 에러:", err);
    } finally {
      setShowCropper(false);
      setSelectedImage(null);
    }
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