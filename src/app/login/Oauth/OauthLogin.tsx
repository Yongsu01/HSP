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

    const res = await axios.post("https://hanseifitu.shop/auth/login/kakao",null,
      {params: {code:code}}
    );
    
    return res;
  }

  return (
     <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-[#E45258] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default OAuthLogin;
