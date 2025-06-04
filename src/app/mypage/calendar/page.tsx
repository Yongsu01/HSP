// 현재 백엔드 API 개발 완료되었고 포스트맨 배포 기다리는중!
'use client';

import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';

type WorkoutRecord = {
  date: string; // yyyy-MM-dd
  workout: string[]; // 운동 리스트
};

export default function CalendarPage() {
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const token = sessionStorage.getItem("Authorization");
        if (!token) {
          throw new Error("토큰이 존재하지 않습니다.");
        }

        const response = await fetch('http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/workout/recommendations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('운동 기록 요청 실패');
        }

        const data: WorkoutRecord[] = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('운동 기록 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">운동 기록 불러오는 중...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <Calendar records={records} />
    </div>
  );
}


// // 더미데이터 넣은 코드
// 'use client';

// import Calendar from '../components/Calendar';

// const dummyRecords = [
//     { date: '2025-05-31', workout: ["BARBELL_LUNGE", "DUMBBELL_SQUAT", "LEG_EXTENSION", "V_SQUAT"] },
//     { date: '2025-06-01', workout: ["BARBELL_LUNGE", "DUMBBELL_SQUAT", "LEG_EXTENSION", "V_SQUAT"] },
//     { date: '2025-06-03', workout: ["BARBELL_LUNGE", "DUMBBELL_SQUAT", "LEG_EXTENSION", "V_SQUAT"] },
// ];

// export default function CalendarPage() {
//   return (
//     <div>
//       <Calendar records={dummyRecords} />
//     </div>
//   );
// }