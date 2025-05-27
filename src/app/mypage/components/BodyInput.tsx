'use client';

import { useState } from "react";

type BodyInputProps = {
  name: string;
  id: string;
  placeholder?: string;
  unit?: string;
  onChange: (id: string, value: string) => void;
  // !!아무것도 반환하지 않고 id value를 받아서 부모에 전달하는 콜백 함수
};

export default function BodyInput({
  name,
  id,
  placeholder,
  unit,
  onChange,
}: BodyInputProps) {
  const [value, setValue] = useState("");

  const bodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // raw 데이터 - 숫자만 추출한 문자열을 숫자의 형식으로만 받도록 하고
    setValue(raw);
    onChange?.(id, raw);
    // if (raw) {
    //   // raw가 있으면 raw에 unit 붙여서 출력
    //   const finalValue = `${raw}${unit}`;
    //   //   setValue(`${raw}${unit}`);
    //   setValue(raw);
    //   onChange?.(id, raw);
    // } else {
    //   // raw가 없으면 공백으로 두기!
    //   setValue("");
    //   onChange?.(name, "");
    // }
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
        className="input w-[50%] bg-[#4B4B4B] p-1 rounded text-white text-sm"
      />
      {unit && <span className="ml-1 text-white">{unit}</span>}
    </div>
  );
}
