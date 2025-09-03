export const setCookies = (cookieName: string, cookieValue: string) => {

    document.cookie = `${cookieName}=${cookieValue}`;
    console.log(document.cookie)
}