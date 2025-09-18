import { fork, allSettled, serialize, SerializedState } from 'effector';
import { Provider } from 'effector-react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { jsBooks } from '@/components/js-books-section';
import { newBooks } from '@/components/new-books-section';
import { popularBooks } from '@/components/popular-books-section';

const PopularBooksSection = dynamic(
  () => import('@/components/popular-books-section').then((mod) => mod.PopularBooksSection),
  { ssr: false },
);

const NewBooksSection = dynamic(
  () => import('@/components/new-books-section').then((mod) => mod.NewBooksSection),
  { ssr: false },
);

const JsBooksSection = dynamic(
  () => import('@/components/js-books-section').then((mod) => mod.JsBooksSection),
  { ssr: false },
);

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
