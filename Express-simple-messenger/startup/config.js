const dotenv = require('dotenv');
export default  function (){
    dotenv.config();
    if (!process.env.JWT_PRIVATE_KEY) {
        console.error("FATAL: jwtPrivateKey is not provided!");
    }
}