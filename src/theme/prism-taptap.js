var theme = {
  plain: {
    color: "#cfd0d2",
    backgroundColor: "#1d2127",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#727579",
      },
    },
    {
      types: ["function", "class-name"],
      style: {
        color: "#FAA66C",
      },
    },

    {
      types: ["punctuation"],
      style: {
        color: "#aeb2b4",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["number", "boolean", "operator"],
      style: {
        color: "#E98585",
      },
    },
    {
      types: ["property"],
      style: {
        color: "#ffcc66",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#74a1ef",
      },
    },
    {
      types: ["string"],
      style: {
        color: "#72D8DD",
      },
    },
    {
      types: ["selector"],
      style: {
        color: "#d9a8fa",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#faa66c",
      },
    },
    {
      types: ["entity", "url"],
      style: {
        color: "#72D8DD",
      },
    },
    {
      types: [
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "symbol",
        "deleted",
      ],
      style: {
        color: "#E98585",
      },
    },
    {
      types: ["statement", "regex", "atrule"],
      style: {
        color: "#72d8dd",
      },
    },
    {
      types: ["placeholder", "variable"],
      style: {
        color: "#74a1ef",
      },
    },
    {
      types: ["important"],
      style: {
        color: "#e98585",
      },
    },
    {
      types: ["inserted"],
      style: {
        color: "#97DF8B",
      },
    },
  ],
};

module.exports = theme;
