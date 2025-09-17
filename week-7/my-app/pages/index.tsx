import { fork, allSettled, serialize, SerializedState } from 'effector';
import { Provider } from 'effector-react';
import { GetServerSideProps } from 'next';

import { jsBooks, JsBooksSection } from '@/components/js-books-section';
import { newBooks, NewBooksSection } from '@/components/new-books-section';
import { popularBooks, PopularBooksSection } from '@/components/popular-books-section';

export const getServerSideProps = (async () => {
  const scope = fork();

  await allSettled(popularBooks.loadFx, { scope });
  await allSettled(newBooks.loadFx, { scope });
  await allSettled(jsBooks.loadFx, { scope });

  return {
    props: {
      initialState: serialize(scope),
    },
  };
}) satisfies GetServerSideProps<{ initialState: SerializedState }>;

export default function Page({ initialState }: { initialState: SerializedState }) {
  return (
    <Provider value={fork({ values: initialState })}>
      <div>
        <PopularBooksSection />
        <NewBooksSection />
        <JsBooksSection />
      </div>
    </Provider>
  );
}
