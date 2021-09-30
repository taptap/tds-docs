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

export const Green = ({ children }) => (
  <span style={{
    color: '#008000',
    padding: '0.2rem',
  }}>
    {children}
  </span>
);

export const BlueBlack = ({ children }) => (
  <span style={{
    color: '#000066',
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
    <img src={children} alt={alt}/>
  </a>
);

export const FaqLink = ({ href, children }) => (
  <span style={{ fontSize: 16, color: '#666666' }}>
    {children}
  </span>
);

const COLORS = {
  grey05: "#666666",
  grey04: "#888888",
  grey01: "#F6F6F6",
  sdkBlue: "#15C5CE",
  sdkRed: "#F64C4C",
  sdkBlueExt: "rgba(21, 197, 206, 0.3)",
  sdkRedExt: "rgba(246, 76, 76, 0.3)",
};

const titleStyle = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: 500,
  color: COLORS.grey05,
};

const subtitleStyle = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: 400,
  color: COLORS.grey05,
};

const captionStyle = {
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: 400,
  color: COLORS.grey04,
};

const quoteStyle = (isRecommended: boolean) => ({
  margin: 0,
  borderTop: `8px solid ${
    isRecommended ? COLORS.sdkBlueExt : COLORS.sdkRedExt
  }`,
  padding: "16px 0 0",
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: 500,
  color: isRecommended ? COLORS.sdkBlue : COLORS.sdkRed,
});

const contentStyle = {
  margin: 0,
  fontSize: "14px",
  lineHeight: "22px",
  fontWeight: 400,
  color: COLORS.grey04,
};

export const Background = ({ children, title, content }) => (
  <div
    style={{
      width: "100%",
      marginTop: "20px",
      padding: "32px",
      backgroundColor: COLORS.grey01,
      display: "flex",
      flexDirection: "column",
      gap:
        children.props?.caption ||
        children[0]?.props.caption ||
        children[1]?.props.caption
          ? "32px"
          : "16px", // 当主标题与正文之一与下方图片的说明同时存在时，两组文字之间要有一个较大的间距
    }}
  >
    {title && <h5 style={titleStyle}>{title}</h5>}

    {content && <p style={contentStyle}>{content}</p>}

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "24px",
        alignItems:
          children[1] && children[0].props.caption && !children[1].props.caption
            ? "flex-end"
            : "flex-start", // 如果存在第二张图，且只有第一张图有顶部的说明文字，则将两张图底部对齐
      }}
    >
      {children}
    </div>
  </div>
);

export const Figure = ({
  children,
  subtitle,
  caption,
  imgSrc,
  imgAlt,
  isRecommended,
  quote,
  content,
}) => (
  <div
    style={{
      flex: "0 1 420px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}
  >
    {subtitle && <h6 style={subtitleStyle}>{subtitle}</h6>}

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <figure
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {caption && <figcaption style={captionStyle}>{caption}</figcaption>}

        <img
          src={imgSrc}
          alt={imgAlt}
          style={{
            display: "block",
          }}
        />
      </figure>

      {quote && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <p style={quoteStyle(isRecommended)}>{quote}</p>

          {content && <p style={contentStyle}>{content}</p>}
        </div>
      )}
    </div>
  </div>
);
