import DOMPurify from "dompurify";

interface BookDescriptonProps {
    shortDescription: string;
};

export const BookDescripton = ({ shortDescription }: BookDescriptonProps) =>
(
    <div
        className="book-item-description"
        dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shortDescription),
        }}
    />
)
