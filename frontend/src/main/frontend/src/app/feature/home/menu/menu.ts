import { Menu} from './menu.model';

export const verticalMenuItems = [
  new Menu (1, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
  new Menu (2, 'My Properties', '/properties/manage', null, 'room', null, false, 0),
  new Menu (3, 'Property Search', '/properties/search', null, 'search', null, false, 0),
  new Menu (4, 'Viewings', '/viewings', null, 'visibility', null, false, 0)
];

export const horizontalMenuItems = [
  new Menu (1, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
  new Menu (2, 'My Properties', '/properties/manage', null, 'room', null, false, 0),
  new Menu (3, 'Property Search', '/properties/search', null, 'search', null, false, 0),
  new Menu (4, 'Viewings', '/viewings', null, 'visibility', null, false, 0)
];
