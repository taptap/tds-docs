export const Highlight = ({children, color}) => (
  <span
    style={{
      color: color,
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

export const Link=({href, children}) =>
<a href={href} target="_blank">
{children}
</a>
