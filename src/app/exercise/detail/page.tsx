"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useWorkoutStore } from "@/app/store/useStore";

const Detail = () => {
  const params = useSearchParams();
  const router = useRouter();
  const name = params.get("name");
  const gif = params.get("gif");

  const { selectedExercises, addWorkoutResult } = useWorkoutStore();

  const index = selectedExercises.findIndex((ex) => ex.name === name);

  const handleComplete = () => {
    const sets = parseInt(
      (document.getElementById("sets") as HTMLInputElement)?.value || "0"
    );
    const weight = parseInt(
      (document.getElementById("weight") as HTMLInputElement)?.value || "0"
    );
    const reps = parseInt(
      (document.getElementById("reps") as HTMLInputElement)?.value || "0"
    );

    if (index !== -1 && name) {
      addWorkoutResult({ index, name, sets, weight, reps });
    }

    router.back();
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-10">
      <img
        src={gif || ""}
        alt={name || ""}
        className="w-[60%] aspect-square rounded-lg"
      />
      <h2 className="text-white text-2xl font-bold">{name}</h2>
      <div className="flex flex-col gap-2 w-[80%]">
        <div className="bg-white rounded pl-6 pr-6 py-2 font-semibold flex items-center justify-between w-full">
          <label htmlFor="sets">세트 수</label>
          <input id="sets" className="p-2 rounded w-[50%] text-center" />
        </div>

        <div className="bg-white rounded pl-6 pr-6 py-2 font-semibold flex items-center justify-between w-full">
          <label htmlFor="weight">무게</label>
          <input id="weight" className="p-2 rounded w-[50%] text-center" />
        </div>

        <div className="bg-white rounded pl-6 pr-6 py-2 font-semibold flex items-center justify-between w-full">
          <label htmlFor="reps">세트당 개수</label>
          <input id="reps" className="p-2 rounded w-[50%] text-center" />
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        완료했어요!
      </button>
    </div>
  );
};

export default Detail;
