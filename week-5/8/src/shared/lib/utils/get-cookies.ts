export const getCookies = (name: string): string | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        const [rawName, rawValue] = cookie.trim().split("=");
        if (decodeURIComponent(rawName) === name) {
            return decodeURIComponent(rawValue ?? "");
        }
    }
    return null;
};
