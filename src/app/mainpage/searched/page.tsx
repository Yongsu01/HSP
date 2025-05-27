import ExerciseSlider from "../../components/ExerciseSlider";
import { Exercise } from "../../types/exercise";

export default async function Home() {

const dummyData: Exercise[][] = [
  [
    { id: '1', name: '운동명1', imageUrl: '' },
    { id: '2', name: '운동명2', imageUrl: '' },
    { id: '3', name: '운동명1', imageUrl: '' },
    { id: '4', name: '운동명2', imageUrl: '' }
  ],
  [
    { id: '5', name: '운동명3', imageUrl: '' },
    { id: '6', name: '운동명4', imageUrl: '' },
    { id: '7', name: '운동명1', imageUrl: '' },
    { id: '8', name: '운동명2', imageUrl: '' },
    { id: '9', name: '운동명1', imageUrl: '' },
    { id: '10', name: '운동명2', imageUrl: '' }
  ],
  [
    { id: '11', name: '운동명5', imageUrl: '' },
    { id: '12', name: '운동명6', imageUrl: '' },
    { id: '13', name: '운동명1', imageUrl: '' },
    { id: '14', name: '운동명2', imageUrl: '' },
    { id: '15', name: '운동명1', imageUrl: '' },
    { id: '16', name: '운동명2', imageUrl: '' }
  ],
  [
    { id: '17', name: '운동명5', imageUrl: '' },
    { id: '18', name: '운동명6', imageUrl: '' },
    { id: '19', name: '운동명1', imageUrl: '' },
    { id: '20', name: '운동명2', imageUrl: '' },
    { id: '21', name: '운동명1', imageUrl: '' },
    { id: '22', name: '운동명2', imageUrl: '' }
  ],
  [
    { id: '23', name: '운동명5', imageUrl: '' },
    { id: '24', name: '운동명6', imageUrl: '' },
    { id: '25', name: '운동명1', imageUrl: '' },
    { id: '26', name: '운동명2', imageUrl: '' },
    { id: '27', name: '운동명1', imageUrl: '' },
    { id: '28', name: '운동명2', imageUrl: '' }
  ],
];


  const groupedExercises = dummyData;

  return (
<>
      {groupedExercises.map((group, index) => (
        <ExerciseSlider key={index} exercises={group} />
      ))}
      <button className="bg-[#E45258] h-[40px] w-[250px] text-white font-bold rounded flex items-center justify-center pt-[20px] pb-[20px] mt-[50px]">
  확정하기
</button>

</>
  );
}
