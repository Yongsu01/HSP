import { Suspense } from "react";
import OAuthLogin from "./OauthLogin";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">로그인 중입니다...</div>}>
      <OAuthLogin />
    </Suspense>
  );
}