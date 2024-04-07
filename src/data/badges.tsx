import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBadges = create(
  persist<{
    badges: string[];
    addBadge: (badge: string) => void;
  }>(
    (set) => ({
      badges: [],
      addBadge: (badge: string) =>
        // only add the badge if it's not already in the list
        set((state) => ({
          badges: state.badges.includes(badge)
            ? state.badges
            : [...state.badges, badge],
        })),
    }),
    {
      name: 'badges',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
