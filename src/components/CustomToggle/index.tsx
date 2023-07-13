type CustomToggleProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

export const CustomToggle = ({ onChange, checked }: CustomToggleProps) => {
  return (
    <div className=''>
      <label className='relative inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          value=''
          className='peer sr-only'
          onChange={onChange}
          checked={checked}
        />
        <div className="peer h-[1.2rem] w-[2.4rem]   rounded-full bg-[#D9D9D9] after:absolute  after:left-0 after:top-0 after:h-5 after:w-5 after:rounded-full  after:border after:bg-[#e74c3c] after:transition-all after:content-[''] peer-checked:after:translate-x-full   peer-checked:after:bg-[#09C6E0] "></div>
      </label>
    </div>
  );
};
