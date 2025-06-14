'use client';

import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import BackButton from '@/app/components/BackButton';

export type WorkoutDetail = {
  name: string;
  categoryId: number;
  sets: number;
  weight: number;
  repsPerSet: number;
};

export type WorkoutRecord = {
  date: string;
  workout: WorkoutDetail[];
};

export default function CalendarPage() {
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date()); // 현재 달

  useEffect(() => {
    async function fetchWorkoutRecords() {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('Authorization');
        if (!token) throw new Error('인증 토큰 없음');

        const year = month.getFullYear();
        const monthNum = month.getMonth() + 1;

        const response = await fetch(
          `https://hanseifitu.shop/api/workout/calendar/full?year=${year}&month=${monthNum}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('운동 기록 불러오기 실패');

        const rawData: { date: string; details: WorkoutDetail[] }[] = await response.json();

        const formatted: WorkoutRecord[] = rawData.map((item) => ({
          date: item.date,
          workout: item.details,
        }));

        setRecords(formatted);
      } catch (e) {
        console.error('에러 발생:', e);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkoutRecords();
  }, [month]); // month가 바뀔 때마다 다시 호출

  if (loading) return <div className="p-4 text-center">운동 기록 불러오는 중...</div>;

  return (
    <div className="min-h-screen p-4">
      <BackButton />
      <Calendar month={month} onMonthChange={setMonth} records={records} />
    </div>
  );
}