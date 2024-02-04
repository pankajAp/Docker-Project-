// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  moduleName: Array<string>;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  imgSrc: string;
  imgArrowDownSrc: string;
  imgArrowRightSrc: string;
  role: string[];
  submenu: RouteInfo[];
}
