'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { format } from 'date-fns';
import './CalendarCustom.css';

type WorkoutRecord = {
  date: string; // yyyy-MM-dd
  workout: string[];
};

type CalendarProps = {
  records: WorkoutRecord[];
  month: Date;
  onMonthChange: (date: Date) => void;
};

export default function Calendar({ records, month, onMonthChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // 날짜 → 운동 기록 매핑
  const recordsMap = new Map<string, string[]>();
  records.forEach(({ date, workout }) => {
    recordsMap.set(date, workout.slice(0, 80));
  });

  // 이번 달 날짜 리스트 생성
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const allDatesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);
    return format(date, 'yyyy-MM-dd');
  });

  const recordedDates = new Set(records.map((r) => r.date));
  const noRecordDates = allDatesInMonth.filter((d) => !recordedDates.has(d));

  // 선택된 날짜 (yyyy-MM-dd)
  const selectedKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  // 선택된 날짜의 운동 기록
  const selectedWorkouts = recordsMap.get(selectedKey) || [];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <DayPicker
          mode="single"
          month={month}
          selected={selectedDate}
          onSelect={setSelectedDate}
          onMonthChange={onMonthChange}
          modifiers={{
            recorded: Array.from(recordedDates).map((d) => new Date(d)),
            noRecord: noRecordDates.map((d) => new Date(d)),
          }}
          modifiersClassNames={{
            recorded: 'bg-blue-300 text-white',
            noRecord: 'bg-red-300 text-white',
          }}
        />
      </div>

      {/* 선택된 날짜 운동 출력 */}
      {selectedDate && (
        <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow p-4 text-center">
          <p className="font-semibold mb-2">선택한 날짜: {selectedKey}</p>
          {selectedWorkouts.length > 0 ? (
            <ul className="space-y-1">
              {selectedWorkouts.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">운동 기록 없음</p>
          )}
        </div>
      )}
    </div>
  );
}




// 'use client';

// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';
// import { useState } from 'react';
// import { format } from 'date-fns';
// import './CalendarCustom.css';

// type WorkoutRecord = {
//   date: string; // daypicker가 tailwindcss에 맞게 사용 가능, yyyy-MM-dd 이렇게 받을거라 우선 string타입으로
//   workout: string[]; // 운동기록은 백엔드에서 배열로 넘어오니까!
// };

// type CalendarProps = {
//   records: WorkoutRecord[];
// };

// export default function Calendar({ records }: CalendarProps) {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>();

//   // 날짜 → 운동기록 매핑
//   const recordsMap = new Map<string, string[]>();
//   records.forEach(({ date, workout }) => {
//     recordsMap.set(date, workout.slice(0, 80)); // 흰 배경에 출력되는 운동기록 글자 수 크기 지정하고 싶으면 여기
//   });

//   // 운동기록이 있는 날, 없는 날 분류
//   const today = new Date();
//   const allDatesInMonth = Array.from({ length: 31 }, (_, i) => {
//     const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
//     return !isNaN(date.getTime()) ? format(date, 'yyyy-MM-dd') : null;
//   }).filter(Boolean) as string[];

//   const recordedDates = new Set(records.map((r) => r.date));
//   const noRecordDates = allDatesInMonth.filter((d) => !recordedDates.has(d));
//   const selectedKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
//   const selectedWorkouts = recordsMap.get(selectedKey) || [];

//   return (
//     <div className="min-h-screen p-4 flex flex-col items-center">
//       <div className="w-full max-w-md">
//         <DayPicker
//           mode="single"
//           selected={selectedDate}
//           onSelect={setSelectedDate}
//           modifiers={{
//             recorded: Array.from(recordedDates).map((d) => new Date(d)),
//             noRecord: noRecordDates.map((d) => new Date(d)),
//           }}
//           modifiersClassNames={{
//             recorded: 'bg-blue-300 text-white',
//             noRecord: 'bg-red-300 text-white',
//           }}
//         />
//       </div>

      // {/* 선택된 날짜 운동 출력 */}
      // {selectedDate && (
      //   <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow p-4 text-center">
      //     <p className="font-semibold mb-2">
      //       선택한 날짜: {selectedKey}
      //     </p>
      //     {selectedWorkouts.length > 0 ? (
      //       <ul className="space-y-1">
      //         {selectedWorkouts.map((item, index) => (
      //           <li key={index} className="text-sm text-gray-700">
      //             • {item}
      //           </li>
      //         ))}
      //       </ul>
      //     ) : (
      //       <p className="text-sm text-gray-500">운동 기록 없음</p>
      //     )}
      //   </div>
      // )}
//     </div>
//   );
// }
