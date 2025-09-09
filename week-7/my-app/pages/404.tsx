import Link from "next/link";

export default function Custom404() {
    return <>
        <p>
            Похоже, вы попали не туда. Попробуйте вернуться на главную.
        </p>
        <Link href="/">
            На главную
        </Link>
    </>
}