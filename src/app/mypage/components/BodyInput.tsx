type BodyInputProps = {
    name : string;
    id : string;
    placeholder?: string;
};

export default function BodyInput({ name, id, placeholder}: BodyInputProps) {  
    return(
        <div className="flex items-center space-x-5 h-[19%]">
            <span className="w-[50%] text-xl">{name}</span>
            <input id={id} placeholder={placeholder} className="input w-[50%] bg-[#4B4B4B]" />
        </div>
    );
}