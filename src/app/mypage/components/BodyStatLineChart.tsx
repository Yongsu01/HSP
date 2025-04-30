'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// 더미데이터로 우선적으로 그래프 완성
// 1. 백으로부터 받는 데이터로 출력 가능하게 만들기
// 2. 새로운 페이지 혹은 모달창으로 한 화면을 꽉차게 적용(유사 대시보드)
const data = [
  { date: '04-01', SMM: 28.8, bodyFat: 17.9 },
  { date: '04-02', SMM: 29.0, bodyFat: 18.3 },
  { date: '04-03', SMM: 29.3, bodyFat: 18.4 },
  { date: '04-05', SMM: 29.9, bodyFat: 18.5 },
  { date: '04-07', SMM: 30.2, bodyFat: 18.8 },
  { date: '04-08', SMM: 30.9, bodyFat: 19.1 },
  { date: '04-09', SMM: 31.3, bodyFat: 19.3 },
  { date: '04-12', SMM: 31.4, bodyFat: 19.2 },
  { date: '04-14', SMM: 31.5, bodyFat: 19.3 },
  { date: '04-16', SMM: 31.8, bodyFat: 19.5 },
  { date: '04-18', SMM: 31.7, bodyFat: 19.8 },
  { date: '04-20', SMM: 31.6, bodyFat: 19.6 },
  { date: '04-21', SMM: 31.8, bodyFat: 19.9 },
  { date: '04-23', SMM: 32.1, bodyFat: 20.0 },
];

export default function BodyStatLineChart() {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="SMM" stroke="#8884d8" name="골격근량" />
        <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" name="체지방률" />
      </LineChart>
    </ResponsiveContainer>
  );
}