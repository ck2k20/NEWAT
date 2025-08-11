import { create } from 'zustand'
import type { MapState, User } from '../types'

interface MapStore extends MapState {
  setCenter: (center: [number, number]) => void
  setZoom: (zoom: number) => void
  setSelectedUser: (user: User | null) => void
}

export const useMapStore = create<MapStore>((set) => ({
  center: [40.7128, -74.0060], // Default to NYC
  zoom: 10,
  selectedUser: null,

  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setSelectedUser: (user) => set({ selectedUser: user }),
}))