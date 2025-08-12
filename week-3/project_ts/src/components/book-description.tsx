import DOMPurify from "dompurify";

interface BookDescriptonProps {
  shortDescription: string;  
};

export function BookDescripton({shortDescription}: BookDescriptonProps) {
    return (
        <div
            className="book-item-description"
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(shortDescription),
            }}
        />
    )
}
