
export interface CoreStateModel {
  applicationName: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  defaultTheme: ThemeType;
}
export type ThemeType = 'dark' | 'light' | 'system';
export type ColorScheme = Exclude<ThemeType, 'system'>

export interface IThemeOptions {
  label: string;
  value: ThemeType;
}
