import Image from "next/image";
import Kakao from "../../../../public/Kakao.svg"
function KakaoLogin(){
    const REST_API_KEY =  process.env.NEXT_PUBLIC_IP_API_KEY;
    const REDIRECT_URI = 'https://hsp-sigma.vercel.app/login/Oauth'
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const LoginHandler =()=>{
        window.location.href = link;
    }

    return(
        <Image src={Kakao} alt="Kakao" onClick={LoginHandler}></Image>
    )
}
export default KakaoLogin;