export const deleteCookies = (
    name: string,
    options: { path?: string; domain?: string } = {}
) => {
    if (typeof document === "undefined") return;

    document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=${options.path ?? "/"}${options.domain ? `; Domain=${options.domain}` : ""
        }`;
};
