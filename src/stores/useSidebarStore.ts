import { create } from "zustand";

type State = {
    isSidebarOpen: boolean
}

type Action = {
    toggleSidebar: () => void;
}

export const useSidebarStore = create<State & Action>((set) => ({
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
}))