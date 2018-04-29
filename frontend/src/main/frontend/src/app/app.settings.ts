import {Settings} from './app.settings.model';

export class AppSettings {

  public settings = new Settings(
    'Housenos',   // theme name
    true,       // loadingSpinner
    true,       // fixedHeader
    true,       // sidenavIsOpened
    true,       // sidenavIsPinned
    true,       // sidenavUserBlock
    'horizontal', // horizontal , vertical
    'default',  // default, compact, mini
    'indigo-light',   // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false       // true = rtl, false = ltr
  );
}
