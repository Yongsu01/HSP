import BackIcon from "../../../public/Back.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="p-2 hover:shadow-lg transition">
            <Image src={BackIcon} alt="Back" className="w-[40px], h-[40px]"></Image>
        </button>
    );
}