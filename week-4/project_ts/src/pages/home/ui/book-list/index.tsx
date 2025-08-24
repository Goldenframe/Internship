import { useUnit } from "effector-react";
import { PropsWithChildren } from "react";

import { model } from "@/entities/book-card/model/book-model";
import { useInfiniteScroll } from "@/pages/home/lib/use-infinite-scroll";
import { BooksContainer } from "@/shared/ui/templates";

export const BookList = ({ children }: PropsWithChildren) => {

  const [hasMore, status, loadedMore] = useUnit([
    model.$hasMore,
    model.$status,
    model.loadedMore
  ]);

  useInfiniteScroll(loadedMore, hasMore, status); // ← убираем startIndex
  
  return (
    <BooksContainer>
      {children}
    </BooksContainer>
  )
}
