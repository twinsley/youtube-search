import { createContext } from "@lit/context";
import type { BookmarksContextData } from "../types/bookmark";

export const bookmarksContext =
  createContext<BookmarksContextData>("bookmarks");
