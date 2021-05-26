import React from 'react';

export const Red = ({ children }) => (
  <span style={{
    color: '#f00',
    padding: '0.2rem',
  }}>
    {children}
  </span>
);

export const Blue = ({ children }) => (
  <span style={{
    color: '#00b9c8',
    padding: '0.2rem',
  }}>
    {children}
  </span>
);

export const Black = ({ children }) => (
  <span style={{
    color: '#333',
    padding: '0.2rem',
  }}>
    {children}
  </span>
);

export const Gray = ({ children }) => (
  <span style={{
    color: '#A0A0A0',
    padding: '0.2rem',
  }}>
    {children}
  </span>
);

export const Link = ({ href, children }) => (
  <a href={href} rel="noreferrer nofollow noopener" target="_blank">
    {children}
  </a>
);

export const ImageLink = ({ href, alt, children }) => (
  <a href={href} rel='noreferrer nofollow noopener'>
    <img src={children} alt={alt} />
  </a>
);

export const FaqLink = ({ href, children }) => (
  <span style={{ fontSize: 16, color: '#666666' }}>
    {children}
  </span>
);
