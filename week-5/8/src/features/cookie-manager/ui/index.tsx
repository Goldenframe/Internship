import { useState } from 'react'

import { deleteCookies, getCookies, setCookies } from '@/shared/lib/utils';

import styles from './styles.module.scss';

export const CookieManager = () => {
    const [inputValue, setInputValue] = useState("");
    const [token, setToken] = useState<string | null>(null);

    const handleSet = () => {
        if (!inputValue.trim()) return;
        setCookies("token", inputValue);
        setToken(inputValue);
        setInputValue("");
    };

    const handleGet = () => {
        const value = getCookies("token");
        setToken(value);
    };

    const handleDelete = () => {
        deleteCookies("token");
        setToken(null);
    };
    return (
        <div className={styles.cookieManager}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите токен"
                className={styles.cookieInput}
            />

            <button onClick={handleSet} className={styles.cookieBtn}>
                Установить токен
            </button>
            <button onClick={handleGet} className={styles.cookieBtn}>
                Прочитать токен
            </button>
            <button
                onClick={handleDelete}
                className={styles.cookieBtn}
            >
                Удалить токен
            </button>

            <div className={styles.tokenDisplay}>
                Текущий токен: <span className={styles.tokenSpan}>{token ?? "нет токена"}</span>
            </div>
        </div>
    );
};
