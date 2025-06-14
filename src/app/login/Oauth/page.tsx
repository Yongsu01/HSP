// app/exercise/detail/page.tsx
import { Suspense } from "react";
import OAuthLogin from "./OauthLogin";

export default function DetailPage() {
  return (
    <Suspense>
      <OAuthLogin />
    </Suspense>
  );
}
