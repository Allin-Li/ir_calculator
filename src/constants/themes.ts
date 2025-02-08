export const THEMES = {
  LIGHT: 'emerald',
  DARK: 'dracula',
} as const

export type ThemeName = (typeof THEMES)[keyof typeof THEMES]

export const DEFAULT_THEME = THEMES.LIGHT
