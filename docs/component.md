export const Highlight = ({children, color}) => (
  <span
    style={{
      color: color,
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

export const Link=({href, children}) =>(
<a href={href} target="_blank">
{children}
</a>
);

export const ImageLink=({href, children}) => (
<a href={href} rel='noreferrer nofollow noopener'>
<img src={children} ></img>
</a>
);

export const FaqLink=({href, children}) =>(
<font size="3" color="#666666">
{children}
</font>
);
