interface CookieOptions {
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    sameSite?: "Lax" | "Strict" | "None";
    secure?: boolean;
}

export const setCookies = (
    name: string,
    value: string,
    options: CookieOptions = {}
) => {
    if (typeof document === "undefined") return; 

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.maxAge !== undefined) {
        cookie += `; Max-Age=${options.maxAge}`;
    }
    if (options.expires instanceof Date) {
        cookie += `; Expires=${options.expires.toUTCString()}`;
    }
    cookie += `; Path=${options.path ?? "/"}`; 

    if (options.domain) {
        cookie += `; Domain=${options.domain}`;
    }
    if (options.sameSite) {
        cookie += `; SameSite=${options.sameSite}`;
    }
    if (options.secure || options.sameSite === "None") {
        cookie += `; Secure`;
    }

    document.cookie = cookie;
};
