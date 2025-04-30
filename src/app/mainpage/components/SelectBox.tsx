import React from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectBoxProps = {
  selected: string[]; 
  onChange: (selected: string[]) => void; 
};

const BodyPart: Option[] = [
  { label: '어깨', value: 'shoulder' },
  { label: '가슴', value: 'chest' },
  { label: '등', value: 'back' },
  { label: '팔', value: 'arm' },
  { label: '하체', value: 'leg' },
];

const SelectBox: React.FC<SelectBoxProps> = ({ selected, onChange }) => {
  const handleCheckboxChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value)); // 제거
    } else {
      onChange([...selected, value]); // 추가
    }
  };

  return (
    <div className="text-white flex flex-col gap-3 mt-4">
        <p className=' text-[20px]'>분할</p>
    {BodyPart.map((part) => (
      <label
        key={part.value}
        className="flex items-center gap-3 bg-[#1f2937] p-3 rounded-xl cursor-pointer transition hover:bg-[#374151]"
      >
        <input
          type="checkbox"
          value={part.value}
          checked={selected.includes(part.value)}
          onChange={() => handleCheckboxChange(part.value)}
          className="w-5 h-5 accent-[#E45258] rounded-md"
        />
        <span className="text-[16px] font-medium">{part.label}</span>
      </label>
    ))}
  </div>
  );
};

export default SelectBox;
