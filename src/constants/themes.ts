export const THEMES = {
  LIGHT: 'emerald',
  DARK: 'dracula',
} as const

export type ThemeName = (typeof THEMES)[keyof typeof THEMES]
export const DEFAULT_THEME = THEMES.LIGHT

export function isValidTheme(theme: string | null): theme is ThemeName {
  return theme !== null && Object.values(THEMES).includes(theme as ThemeName)
}
