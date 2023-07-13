type CustomLoaderProps = {
  className: string;
};

export const CustomLoader = ({ className }: CustomLoaderProps) => {
  return (
    <div
      className={`animate-spin ${className} rounded-full border-2 border-t-transparent`}
    />
  );
};
