import { useUnit } from "effector-react";
import { PropsWithChildren } from "react";

import { model } from "@/entities/book-card/model/book-model";
import { useInfiniteScroll } from "@/pages/home/lib/use-infinite-scroll";
import { BooksContainer } from "@/shared/ui/templates/books-container";

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
