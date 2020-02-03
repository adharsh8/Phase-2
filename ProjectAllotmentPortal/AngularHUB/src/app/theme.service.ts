import { Injectable } from '@angular/core';

export const darkTheme = {
  'primary-color': '#455363',
  'background-color': '#455a64',
  'foreground-color' : '#263238',
  'text-color': '#fff'
};
export const lightTheme = {
  'primary-color': '#fff',
  'background-color': '#e5e5e5',
  'foreground-color': '#ffffff',
  'text-color': '#2d2d2d'
};

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  toggleDark() {
    this.setTheme(darkTheme);
  }
  toggleLight() {
    this.setTheme(lightTheme);
  }
  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
  constructor() { }
}
