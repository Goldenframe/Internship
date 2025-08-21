import { createGate } from "effector-react";

export const HomeGate = createGate<{ t: (key: string) => string }>();