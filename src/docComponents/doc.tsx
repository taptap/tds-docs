import React from "react";
import Link from "@docusaurus/Link";

export const OfficeDoc = ({ fileUrl }) => {
  const fileUrlEncoded = encodeURI(fileUrl);
  const iframeSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${fileUrlEncoded}`;
  return (
    <iframe src={iframeSrc} width="100%" height="600px">
      这是嵌入{" "}
      <a target="_blank" href="https://office.com">
        Microsoft Office
      </a>{" "}
      演示文稿，由{" "}
      <a target="_blank" href="https://office.com/webapps">
        Office
      </a>{" "}
      提供支持。
    </iframe>
  );
};

export const [Red, Blue, Black, Gray, Green, BlueBlack] = [
  "#F64C4C",
  "#15C5CE",
  "#1F1F1F",
  "#8E8E8E",
  "#47B881",
  "#3B82F6",
].map((color) => ({ children }) => <span style={{ color }}>{children}</span>);

export const FaqLink = ({ children }) => (
  <span style={{ fontSize: 16, color: "#666666" }}>{children}</span>
);

export const Anchor = ({ id }) => (
  <a
    style={{
      scrollMarginTop: "4.5rem",
      visibility: "hidden",
    }}
    id={id}
  />
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
const captionStrongStyle = {
  fontSize: "12px",
  lineHeight: "18px",
  fontWeight: 700,
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
  subtitle,
  caption,
  strong = false,
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
        {caption && (
          <figcaption
            style={{ ...(strong ? captionStrongStyle : captionStyle) }}
          >
            {caption}
          </figcaption>
        )}

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

export const CardGrid = ({ children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(18em, 1fr))",
      gridAutoRows: "1fr",
      gap: "0.5em",
    }}
  >
    {children}
  </div>
);

export const Card = ({ imgSrc, imgScale = 1, label, to }) => (
  <Link
    to={to}
    style={{
      color: "var(--tap-grey6)",
      display: "flex",
    }}
  >
    <div
      style={{
        padding: "0.5em",
        border: "1px solid var(--ifm-table-border-color)",
        borderRadius: "var(--ifm-alert-border-radius)",
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
        flexGrow: "1",
      }}
    >
      <img
        src={imgSrc}
        style={{ width: "4em", transform: `scale(${imgScale})` }}
      />
      <span>{label}</span>
    </div>
  </Link>
);
