import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
   HiOutlineHome,
  HiHashtag,
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiOutlineQuestionMarkCircle,
  HiArrowRight,
} from 'react-icons/hi';
import { AiFillFolderOpen } from "react-icons/ai";


const SidebarT = () => {
  const menus = [
    { name: 'الصفحة الرئيسية', link: '/dashT', icon: <HiOutlineHome size={30} /> },
    { name: 'قرأة الرمز', link: '/dashT/scaner', icon: <HiHashtag size={30} />, margin: true },
    { name: 'التكليف', link: '/dashT/projet', icon: <AiFillFolderOpen size={30} /> },
    { name: 'الطلبة', link: '/dashT/students', icon: <HiOutlineDocumentText size={30} /> },
    { name: 'معلومات', link: '/', icon: <HiOutlineInformationCircle size={30} />, margin: true },
    { name: 'المساعدة', link: '/', icon: <HiOutlineQuestionMarkCircle size={30} /> },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? 'w-60' : 'w-20 '
        } bg-gray-800 h-screen p-5 pt-8 relative duration-300 float-right`}
        style={{ direction: 'rtl', textAlign: 'right' }}
      >
        <HiArrowRight
          className={`absolute cursor-pointer -left-3 top-9 w-7 border-white text-white
            border-2 rounded-full ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
          style={{ width: '30px' }}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="../logoW.png"
            className={`cursor-pointer duration-500 ${
              open && 'rotate-[360deg]'
            }`}
            style={{ width: '50px' }}
          />

          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && 'scale-0'
            }`}
          >
            <span className="font-bold">QRCRR</span>
          </h1>
        </div>
        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${menu.margin ? 'mt-9' : 'mt-2'} ${
                index === 0 && 'bg-light-white'
              } `}
            >
              <Link to={menu.link}>
                <div className="flex items-center"> {/* Use a div to wrap icon and name */}
                  {menu.icon}
                  <span className={`${!open && 'hidden'} mr-3 origin-left duration-200 font-bold`}>
                    {menu.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SidebarT;
