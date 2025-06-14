'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import { format } from 'date-fns';
import './CalendarCustom.css';

type WorkoutDetail = {
  name: string;
  categoryId: number;
  sets: number;
  weight: number;
  repsPerSet: number;
};

type WorkoutRecord = {
  date: string;
  workout: WorkoutDetail[];
};

type CalendarProps = {
  records: WorkoutRecord[];
  month: Date;
  onMonthChange: (date: Date) => void;
};

export default function Calendar({ records, month, onMonthChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // 날짜 → 운동 기록 매핑
  const recordsMap = new Map<string, WorkoutDetail[]>();
  records.forEach(({ date, workout }) => {
    recordsMap.set(date, workout);
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

  // 선택된 날짜
  const selectedKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  // 선택된 날짜의 운동 기록
  const selectedWorkouts = recordsMap.get(selectedKey) || [];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <div className="w-full max-w-md px-4">
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

      {/* 선택된 날짜의 운동기록 출력 */}
      {selectedDate && (
        <div className="mt-6 w-full max-w-md bg-white rounded-lg shadow p-4 text-center px-4">
          <p className="font-semibold mb-2">선택한 날짜 : {selectedKey}</p>
          {selectedWorkouts.length > 0 ? (
            <ul className="space-y-1 text-left">
              {selectedWorkouts.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {item.name} - {item.sets}세트, {item.weight}kg, {item.repsPerSet}회
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