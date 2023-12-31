/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: 'Faris-Abuali/my-blogposts/main/images/**'
            },
            {
                protocol: 'https',
                hostname: 'www.davegray.codes',
                port: '',
            }
        ]
    },
    env: {
        MY_SECRET_KEY: process.env.MY_SECRET_KEY,
    },
}

module.exports = nextConfig
