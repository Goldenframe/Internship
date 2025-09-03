export const getCookies = (cookieName: string) => {
    const cookies = document.cookie.split(";");
    console.log(cookies);
    console.log(document.cookie);
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName + "=")) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}