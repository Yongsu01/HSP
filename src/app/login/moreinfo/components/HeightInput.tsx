interface HeightInputProps {
    height: string;
    setHeight: (value: string) => void;
  }
  
  const HeightInput: React.FC<HeightInputProps> = ({ height, setHeight }) => {
    return (
      <div className="flex flex-col text-start gap-[10px]">
        <p className="text-white text-[17px]">키</p>
        <div className="bg-white items-center h-[40px] justify-center text-[#777676] flex flex-row">
          <input
            type="number"
            className="h-[100%] outline-none text-black w-[50px] max-w-[100px] font-semibold text-center"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <div>cm</div>
        </div>
      </div>
    );
  };
  
  export default HeightInput;
  