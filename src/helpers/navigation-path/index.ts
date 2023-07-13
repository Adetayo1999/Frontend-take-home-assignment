import { IconType } from 'react-icons';
import { FaBitcoin } from 'react-icons/fa';
import { RiNftFill } from 'react-icons/ri';

export type SidebarNavigationPathsType = {
  id: number;
  title: string;
  Icon: IconType;
  path: string;
};

export const sidebarNavigationPaths: SidebarNavigationPathsType[] = [
  {
    id: 1,
    title: 'Bitcoin Price Index',
    Icon: FaBitcoin,
    path: '/',
  },
  {
    id: 2,
    title: 'My NFTs',
    Icon: RiNftFill,
    path: '/nft-list',
  },
];
