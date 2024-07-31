import { create } from "zustand";
import { createAuthSlice,AuthSlice} from "../auth";
import { createJSONStorage, persist } from "zustand/middleware";

export const useStore = create<AuthSlice>()(
    persist((...args) => ({
      ...createAuthSlice(...args),
      }),{
        name : 'zustandAPP',
        storage : createJSONStorage(()=>localStorage)
      }
    )
  );