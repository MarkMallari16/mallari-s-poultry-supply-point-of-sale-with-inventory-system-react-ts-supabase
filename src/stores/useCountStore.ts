import { create } from "zustand";

type State = {
    count: number
}
type Actions = {
    increment: (value: number) => void;
    decrement: (value: number) => void;
}

export const useCountStore = create<State & Actions>((set) => ({
    count: 0,
    increment: (value) => set((state) => ({ count: state.count + value })),
    decrement: (value) => set((state) => ({ count: state.count <= 0 ? 0 : state.count - value }))
}))