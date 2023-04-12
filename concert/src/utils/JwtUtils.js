import jwt_decode  from "jwt-decode";


export const isAuth = (accessToken)=>{
	if (!accessToken) {
        return false;
    }
    const decoded = jwt_decode(accessToken);
    if (decoded.exp  > new Date().getTime() / 1000){
        return true
    }
    else { return false;}
}

export const getUserEmail = (accessToken) => {
    const decoded = jwt_decode(accessToken)
    return decoded.sub;
}

export const getUserId = (accessToken) => {
    const decoded = jwt_decode(accessToken)
    return decoded.userId;
}

export const getDecoded = (accessToken) => {
    let decoded = jwt_decode (accessToken);
    return decoded;
}