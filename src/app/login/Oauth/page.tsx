"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Param } from "@prisma/client/runtime/library";

const OAuthLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const fetchData = async () => {
        try {
          const response = await getPrintCode(code);
            console.log(response);
          const jwtToken = response.data["token"];
          if (jwtToken) sessionStorage.setItem("Authorization", jwtToken);

          const refreshToken = response.data["token"];
          if (refreshToken) sessionStorage.setItem("RefreshToken", refreshToken);

          if (response.status === 201) {
            router.push("/login/moreinfo");
          } else if (response.status === 200) {
            router.push("/mainpage");
          }
        } catch (error) {
        }
      };

      fetchData();
    } else {
      router.push("/login");
    }
  }, []);

  async function getPrintCode(code: string) {

    const res = await axios.post("http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/auth/login/kakao",null,
      {params: {code:code}}
    );
    
    return res;
  }

  return <div>로딩중...</div>;
};

export default OAuthLogin;
