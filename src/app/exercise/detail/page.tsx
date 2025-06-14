import { Suspense } from "react";
import Detail from "./detail";

export default function DetailPage() {
  return (
    <Suspense fallback={<div>불러오는 중...</div>}>
      <Detail />
    </Suspense>
  );
}
