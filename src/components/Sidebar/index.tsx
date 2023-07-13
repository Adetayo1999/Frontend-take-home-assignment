import {
  SidebarNavigationPathsType,
  sidebarNavigationPaths,
} from '@/helpers/navigation-path';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarItem = ({ Icon, title, path }: SidebarNavigationPathsType) => {
  const router = useRouter();

  return (
    <li>
      <Link
        href={path}
        className={`flex flex-col items-center justify-center gap-y-1 rounded-md ${
          router.pathname === path && 'bg-sky-700'
        } tranition w-[10rem] p-3 text-center text-white duration-300  hover:bg-sky-900 md:w-full`}
      >
        <span>
          <Icon className='text-xl' />
        </span>
        <span className='text-xs'>{title}</span>
      </Link>
    </li>
  );
};

export const Sidebar = () => {
  return (
    <div className='fixed bottom-0 left-0 z-[70] h-[6rem] w-full bg-sky-500 p-4 md:left-0 md:top-0 md:h-screen md:w-[10rem]'>
      <ul className='flex gap-x-6 md:flex-col md:gap-x-0 md:gap-y-6'>
        {sidebarNavigationPaths.map((item) => (
          <SidebarItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};
