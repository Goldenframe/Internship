export async function xhrRequest<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "json"; 
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response as T);
            } else {
                reject(new Error(`Request failed: ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            reject(new Error(`Network error: ${xhr.status}`));
        };

        xhr.send();
    });
}