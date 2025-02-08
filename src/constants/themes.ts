export const THEMES = Object.freeze({
  LIGHT: 'emerald',
  DARK: 'dracula'
})

export type ThemeName = typeof THEMES[keyof typeof THEMES]
