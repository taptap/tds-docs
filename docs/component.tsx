import React from 'react';

export const Highlight = ({ children, color }) => (
  <span style={{
    color: color,
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
