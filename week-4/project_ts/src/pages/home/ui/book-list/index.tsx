import { PropsWithChildren } from "react";

import { useInfiniteScroll } from "@/pages/home/ui/book-list/use-infinite-scroll";
import { BooksContainer } from "@/shared/ui/templates/books-container";

interface BookListProps {
  loading: boolean,
  hasMore: boolean,
  onLoadMore: (startIndex: number) => void,
  startIndex: number
}


export const BookList = ({
  loading,
  hasMore,
  onLoadMore,
  startIndex,
  children
}: PropsWithChildren<BookListProps>) => {

  useInfiniteScroll(onLoadMore, startIndex, hasMore, loading);

  return (
    <BooksContainer>
      {children}
    </BooksContainer>
  )
}
