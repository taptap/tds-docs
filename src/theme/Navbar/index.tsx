import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';
import './override.scss';

export default function Navbar(): JSX.Element {
  return (
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  );
}
