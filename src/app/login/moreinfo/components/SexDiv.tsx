interface SexDivProps {
    sex: string;
    setSex: (value: string) => void;
  }
  
  const SexDiv: React.FC<SexDivProps> = ({ sex, setSex }) => {
    return (
        <div className="flex flex-col gap-[10px]">
        <p className="text-white text-[17px] text-start">성별</p>  
      <div className="w-full flex justify-around">
      
        <div className="relative w-full text-center flex items-center justify-center">
          <input
            type="radio"
            id="male"
            name="sex"
            value="M"
            className="hidden peer"
            checked={sex === "M"}
            onChange={() => setSex("M")}
          />
          <label
            htmlFor="male"
            className="flex items-center justify-center h-10 w-full py-1 px-2 cursor-pointer transition-all border border-black/40 mb-2 text-center peer-checked:bg-[#E45258] peer-checked:text-white bg-white font-semibold"
          >
            남자
          </label>
        </div>
        <div className="relative w-full text-center flex items-center justify-center">
          <input
            type="radio"
            id="female"
            name="sex"
            value="F"
            className="hidden peer"
            checked={sex === "F"}
            onChange={() => setSex("F")}
          />
          <label
            htmlFor="female"
            className="flex items-center justify-center h-10 w-full py-1 px-2 cursor-pointer transition-all border border-black/40 mb-2 text-center peer-checked:bg-[#E45258] peer-checked:text-white bg-white font-semibold"
          >
            여자
          </label>
        </div>
      </div>
      </div>
    );
  };
  
  export default SexDiv;
  