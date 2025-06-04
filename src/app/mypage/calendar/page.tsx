'use client';

import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';

export type WorkoutDetail = {
  name: string;
  categoryId: number;
  sets: number;
  weight: number;
  repsPerSet: number;
};

export type WorkoutRecord = {
  date: string;
  workout: string[]; 
};

export default function CalendarPage() {
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkoutRecords() {
      try {
        const token = sessionStorage.getItem('Authorization');
        if (!token) throw new Error('인증 토큰 없음');

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        const response = await fetch(`http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/api/workout/calendar/full?year=${year}&month=${month}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('운동 기록 불러오기 실패');

        const rawData: { date: string; details: WorkoutDetail[] }[] = await response.json();

        const formatted: WorkoutRecord[] = rawData.map((item) => ({
          date: item.date,
          workout: item.details.map((d) => d.name.slice(0, 10)),
        }));

        setRecords(formatted);
      } catch (e) {
        console.error('에러 발생:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkoutRecords();
  }, []);

  if (loading) return <div className="p-4 text-center">운동 기록 불러오는 중...</div>;

  return (
    <div className="min-h-screen p-4">
      <Calendar records={records} />
    </div>
  );
}