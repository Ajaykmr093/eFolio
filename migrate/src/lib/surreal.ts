import { connectSurreal } from "./utilities/surreal_connect";

export const db = await connectSurreal();
