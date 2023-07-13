type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className='min-h-screen bg-gray-100 p-10'>{children}</div>;
};
