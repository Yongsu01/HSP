"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const OAuthLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const fetchData = async () => {
        try {
          const response = await getPrintCode(code);

          const jwtToken = response.headers["authorization"];
          if (jwtToken) sessionStorage.setItem("Authorization", jwtToken);

          const refreshToken = response.headers["refreshtoken"];
          if (refreshToken) sessionStorage.setItem("RefreshToken", refreshToken);

          if (response.status === 201) {
            router.push("/login/moreInfo");
          } else if (response.status === 200) {
            router.push("/");
          }
        } catch (error) {
          console.error("OAuth 요청 중 오류 발생:", error);
        }
      };

      fetchData();
    } else {
      router.push("/login");
    }
  }, [code, router]);

  async function getPrintCode(code: string) {
    const res = await axios.post("", code);
    return res;
  }

  return <div>로딩중...</div>;
};

export default OAuthLogin;
