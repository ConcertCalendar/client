import jwtDecode from "jwt-decode";


export const isAuth = (accessToken)=>{
	if (!accessToken) {
        return false;
    }
    const decoded = jwtDecode(accessToken);
    if (decoded.exp > new Date().getTime() / 1000){
        return true
    }
    else { return false;}
}

export const getUserId = (accessToken) => {
    const decoded = jwtDecode(accessToken)
    return decoded.sub;
}

export const getDecoded = (accessToken) => {
    const decoded = jwtDecode(accessToken);
    return decoded;
}