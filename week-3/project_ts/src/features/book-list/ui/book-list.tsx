import { PropsWithChildren } from "react";

import { useInfiniteScroll } from "@/features/book-list/model/use-infinite-scroll";
import { BooksContainer } from "@/shared/ui/books-container/books-container";

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
