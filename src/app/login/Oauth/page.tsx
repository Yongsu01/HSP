import { Suspense } from "react";
import OAuthLogin from "./OauthLogin";

export default function Home() {
  return (
    <Suspense>
      <OAuthLogin />
    </Suspense>
  );
}
