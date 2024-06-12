export default () => ({
    prefix: process.env.PREFIX,
    port: process.env.PORT,
    secret_jwt: process.env.SECRET,
    expire_access_jwt: process.env.EXPIRE_ACCESS_JWT,
    expire_refresh_jwt: process.env.EXPIRE_REFRESH_JWT,
    salt: process.env.SALT,
});
