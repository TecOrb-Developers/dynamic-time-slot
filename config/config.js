var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.DB = "";
    process.env.TZ = 'Asia/India'
} else if (env === 'prod') {
    process.env.PORT = 3000;
    process.env.DB = "";
    process.env.TZ = 'Asia/India'
}