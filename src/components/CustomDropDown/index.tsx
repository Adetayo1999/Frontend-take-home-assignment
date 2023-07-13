import React, { useEffect, useRef, useState } from 'react';

const Icon = () => {
  return (
    <svg height='20' width='20' viewBox='0 0 20 20'>
      <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z'></path>
    </svg>
  );
};

type DropDownDataType = { label: string; value: string };

type DropDownProps = {
  placeHolder?: string;
  options: DropDownDataType[];
  selectedValue: DropDownDataType | null;
  changeHandler(option: DropDownDataType): void;
};

export const CustomDropdown = ({
  placeHolder,
  options,
  selectedValue,
  changeHandler = () => {},
}: DropDownProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<any | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return placeHolder;
    }
    return selectedValue.label;
  };

  const onItemClick = (option: DropDownDataType) => {
    changeHandler(option);
  };

  const getOptions = () => {
    return options;
  };

  return (
    <div className='relative  min-w-[12rem] rounded-[0.4rem] border border-solid  border-sky-900 border-opacity-60 bg-white text-left'>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className='flex select-none items-center justify-between p-[0.313rem]'
      >
        <div className='text-sm text-zinc-400'>{getDisplay()}</div>
        <div className=''>
          <div className=''>
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className='absolute z-[99]  max-h-[150px] w-full translate-y-[4px] overflow-auto rounded-[0.313rem] border border-solid border-[#ccc] bg-[#fff]'>
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`cursor-pointer p-[0.313rem] text-sm hover:bg-[#9fc3f870] `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
