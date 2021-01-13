export const Highlight = ({children, color}) => (
  <span
    style={{
      color: color,
      padding: '0.2rem',
    }}>
    {children}
  </span>
);
