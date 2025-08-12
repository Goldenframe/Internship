import { PropsWithChildren } from "react";

import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

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
    <div className="books-container">
      {children}
    </div>
  )
}
