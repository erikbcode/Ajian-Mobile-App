import React from 'react';
import { AiFillClockCircle } from 'react-icons/ai';
import { BiBell, BiFoodMenu } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';

export const links = [
    {
      title: 'Pages',
      links: [
        {
          name: 'Announcements',
          icon: <BiBell />,
        },
        // {
        //   name: 'Menu',
        //   icon: <BiFoodMenu />,
        // },
        // {
        //   name: 'Hours',
        //   icon: <AiFillClockCircle />,
        // },
      ],
    },
  ];
  export const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: 'My Profile',
      desc: 'Account Settings',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
  ];
  export const EditorData = () => (
    <div>
      <h3>
        
      </h3>
    </div>
  );
  