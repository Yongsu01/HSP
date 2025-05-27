'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';
import React from 'react';
import { DotProps } from 'recharts';

const CustomDot: React.FC<DotProps> = (props) => {
  const { cx, cy, stroke, fill } = props;
  if (cx === undefined || cy === undefined) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={8} // 점 크기 조절
      stroke={stroke}
      strokeWidth={2}
      fill={fill}
    />
  );
};


interface PhysicalInfo {
  recordedAt: string;
  muscle: number | null;
  bodyFat: number | null;
}

function preprocessData(data: PhysicalInfo[]): (PhysicalInfo & { time: number })[] {
  if (!data || data.length === 0) return [];

  const sorted = [...data].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  );

  let prevMuscle: number | null = sorted[0].muscle ?? 0;
  let prevBodyFat: number | null = sorted[0].bodyFat ?? 0;

  return sorted.map((item) => {
    const muscle =
      item.muscle !== null && item.muscle !== undefined
        ? item.muscle
        : prevMuscle!;
    const bodyFat =
      item.bodyFat !== null && item.bodyFat !== undefined
        ? item.bodyFat
        : prevBodyFat!;

    prevMuscle = muscle;
    prevBodyFat = bodyFat;

    return {
      ...item,
      muscle,
      bodyFat,
      time: new Date(item.recordedAt).getTime(),
    };
  });
}

export default function BodyStatLineChart() {
  const [chartData, setChartData] = useState<(PhysicalInfo & { time: number })[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("Authorization");
      try {
        const res = await fetch(
          'http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/physical-infos',
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error('API 응답 오류');

        const raw = await res.json();
        console.log('API 응답:', raw);

        const rawArray = Array.isArray(raw) ? raw : [raw];

        const processed = preprocessData(rawArray);
        console.log('전처리된 차트 데이터:', processed);
        setChartData(processed);
      } catch (error) {
        console.error('차트 데이터 가져오기 실패:', error);
      }
    };
    
    // const fetchData = async () => {
    //   const token = sessionStorage.getItem("Authorization");
    //   try {
    //     const res = await fetch(
    //       'http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/physical-infos',
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     if (!res.ok) throw new Error('API 응답 오류');

    //     const raw: PhysicalInfo[] = await res.json();
    //     const processed = preprocessData(raw);
    //     setChartData(processed);
    //   } catch (error) {
    //     console.error('차트 데이터 가져오기 실패:', error);
    //   }
    // };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(time) => {
            const date = new Date(time);
            if (isNaN(date.getTime())) return "";
            return date.toLocaleString("ko-KR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
          }}
        />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          labelFormatter={(time) => {
            const date = new Date(time);
            if (isNaN(date.getTime())) return "";
            return date.toLocaleString("ko-KR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
          }}
          
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="muscle"
          stroke="#8884d8"
          name="골격근량"
          dot={{ r: 10, strokeWidth: 2, stroke: "#555" }} // 크기 크게 + 외곽선 추가
          isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="bodyFat"
          stroke="#82ca9d"
          name="체지방률"
          dot={{ r: 10, strokeWidth: 2, stroke: "#555" }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
   

/*
function preprocessData(data: any[]) {
  if (!data || data.length === 0) return [];

  const sorted = [...data].sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  );

  let prevMuscle = sorted[0].muscle;
  let prevBodyFat = sorted[0].bodyFat;

  return sorted.map((item) => {
    const processedItem = {
      recordedAt: item.recordedAt,
      muscle: item.muscle != null ? item.muscle : prevMuscle,
      bodyFat: item.bodyFat != null ? item.bodyFat : prevBodyFat,
    };

    prevMuscle = processedItem.muscle;
    prevBodyFat = processedItem.bodyFat;

    return processedItem;
  });
}

export default function BodyStatLineChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("Authorization");
      try {
        const res = await fetch('http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/physical-infos', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` ,
          },
        });

        if (!res.ok) throw new Error('API 응답 오류');

        const raw = await res.json();
        const processed = preprocessData(raw);
        setChartData(processed);
      } catch (error) {
        console.error('차트 데이터 가져오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis // 백엔드에서 넘어오는 recordedAt의 형식이 "2025-05-01T13:48:09"처럼 ISO 형식이기 때문에 변경해야함
          dataKey="recordedAt"
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("ko-KR", {
              year: 'numeric',
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          }
        />

        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="muscle"
          stroke="#8884d8"
          name="골격근량"
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="bodyFat"
          stroke="#82ca9d"
          name="체지방률"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
*/