import { PropsWithChildren } from "react";

import { useInfiniteScroll } from "@/pages/home/ui/book-list/use-infinite-scroll";
import { BooksContainer } from "@/shared/ui/templates/books-container";
import { useUnit } from "effector-react";
import { model } from "@/entities/book-card/model/book-model";

export const BookList = ({ children }: PropsWithChildren) => {

  const [startIndex, hasMore, loading, loadedMore] = useUnit([
    model.$startIndex,
    model.$hasMore,
    model.$loading,
    model.loadedMore
  ]);
  
  useInfiniteScroll(loadedMore, startIndex, hasMore, loading);

  return (
    <BooksContainer>
      {children}
    </BooksContainer>
  )
}
