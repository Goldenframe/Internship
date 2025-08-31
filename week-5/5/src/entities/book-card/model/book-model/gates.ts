import { createGate } from "effector-react";

export const AppGate = createGate<{ t: (key: string) => string }>();
