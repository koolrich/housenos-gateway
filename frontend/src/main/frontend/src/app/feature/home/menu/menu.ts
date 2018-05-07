import { Menu} from './menu.model';

export const verticalMenuItems = [
  new Menu (1, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
  new Menu (2, 'My Properties', null, null, 'supervisor_account', null, true, 0),
  new Menu (3, 'Manage Properties', '/properties/manage', null, 'computer', null, false, 2),
  new Menu (4, 'Property Search', '/properties/search', null, 'keyboard', null, false, 2),
  new Menu (5, 'Viewings', '/viewings', null, 'card_membership', null, false, 0)
];

export const horizontalMenuItems = [
  new Menu (1, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
  new Menu (2, 'My Properties', null, null, 'supervisor_account', null, true, 0),
  new Menu (3, 'Manage Properties', '/properties/manage', null, 'computer', null, false, 2),
  new Menu (4, 'Property Search', '/properties/search', null, 'keyboard', null, false, 2),
  new Menu (5, 'Viewings', '/viewings', null, 'card_membership', null, false, 0)
];
