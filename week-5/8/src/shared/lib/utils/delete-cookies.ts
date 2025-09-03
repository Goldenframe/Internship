export const deleteCookies = (cookieName: string) => {

    document.cookie = `${cookieName}=; Max-Age=-1;`;
    console.log(document.cookie)
}