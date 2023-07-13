import { Sidebar } from '../Sidebar';

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className=' min-h-screen   bg-gray-100'>
      <div className=''>
        <Sidebar />
      </div>
      <div className='pb-[7rem] md:ml-[10rem] md:pb-0 '>{children}</div>
    </div>
  );
};
