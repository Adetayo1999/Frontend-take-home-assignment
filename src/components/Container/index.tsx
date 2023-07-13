type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className='min-h-screen bg-gray-100'>{children}</div>;
};
