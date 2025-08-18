import { PropsWithChildren } from "react";

import { useInfiniteScroll } from "@/pages/home/ui/book-list/use-infinite-scroll";
import { BooksContainer } from "@/shared/ui/templates/books-container";
import { useUnit } from "effector-react";
import { $hasMore, $loading, $startIndex, LoadedMore } from "@/shared/lib/effector/book-model";

export const BookList = ({ children }: PropsWithChildren) => {

  const [startIndex, hasMore, loading] = useUnit([$startIndex, $hasMore, $loading]);

  useInfiniteScroll(LoadedMore, startIndex, hasMore, loading);

  return (
    <BooksContainer>
      {children}
    </BooksContainer>
  )
}
