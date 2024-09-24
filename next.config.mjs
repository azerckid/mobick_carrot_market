/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        // domains: ['avatars.githubusercontent.com'],
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
            // kakao등 다른 도메인 아래와 같이 추가 가능
            // {
            //     hostname: "avatars.githubusercontent.com",
            // },
            {
                hostname: "imagedelivery.net",
            },
        ],
    },
};

export default nextConfig;
