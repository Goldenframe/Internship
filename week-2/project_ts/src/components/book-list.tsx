import { PropsWithChildren } from "react";

import useInfiniteScroll from "../hooks/use-infinite-scroll";

interface BookListProps {
  loading: boolean,
  hasMore: boolean,
  onLoadMore: () => void,
}


export default function BookList({
  loading,
  hasMore,
  onLoadMore,
  children
}: PropsWithChildren<BookListProps>) {

  useInfiniteScroll(onLoadMore, hasMore, loading);

  return (
    <div className="books-container">
      {children}
    </div>
  )
}
