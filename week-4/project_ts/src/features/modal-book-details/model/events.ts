import { createEvent, Scope } from 'effector';

export const bookDetailsOpened = createEvent<string>();
export const bookDetailsClosed = createEvent();
export const scopeCreated = createEvent<Scope>();