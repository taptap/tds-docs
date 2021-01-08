import React from 'react';

type LogoProp = {
  onClick?: () => any;
};

const Logo = ({onClick}: LogoProp) => {
  return <div className='tap-navbar__brand' onClick={onClick}>
    这里是心动的logo
  </div>;
};

export default Logo;
