"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function BodyStatLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = sessionStorage.getItem("Authorization");
        const startDate = dayjs().subtract(3, 'month').format('YYYY-MM-DD');
        const endDate = dayjs().format('YYYY-MM-DD');

        const url = `https://hanseifitu.shop/physical-infos/muscle-bodyfat?startDate=${startDate}&endDate=${endDate}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("데이터 요청 실패");

        const result = await res.json();

        // dayjs라이브러리 사용해서 백엔드의 날짜정보를 포맷해서 보기 편하게 변경
        const formatted = result.map((entry: any) => ({
          date: dayjs(entry.recordedAt).format("YY-MM-DD"),
          muscle: entry.muscle,
          bodyFat: entry.bodyFat,
        }));

        setData(formatted);
      } catch (err) {
        console.error("차트 데이터 불러오기 실패:", err);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{fontSize: 12}} angle={-40} height={55} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="muscle" stroke="#8884d8" name="골격근량" />
          <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" name="체지방률" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}