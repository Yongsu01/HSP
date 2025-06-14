'use client';

import { useState } from "react";

type BodyInputProps = {
  name: string;
  id: string;
  placeholder?: string;
  unit?: string;
  value: string;
  onChange: (id: string, value: string) => void;
  // !!아무것도 반환하지 않고 id value를 받아서 부모에 전달하는 콜백 함수
};

export default function BodyInput({
  name,
  id,
  placeholder,
  unit,
  value,
  onChange,
}: BodyInputProps) {
  const bodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    onChange?.(id, raw);
  };
  return (
    <div className="flex items-center justify-between py-2">
      <span className="w-[45%] text-base">{name}</span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={bodyChange}
        placeholder={placeholder}
        className="input w-[40%] bg-[#4B4B4B] p-1 rounded text-white text-sm text-right border border-black"
      />
      {unit && <span className="ml-1 text-white">{unit}</span>}
    </div>
  );
}
