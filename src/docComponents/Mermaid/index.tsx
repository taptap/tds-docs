import React, { useEffect } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: true });

const Mermaid = ({ diagram }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);
  return <div className="mermaid">{diagram}</div>;
};

export default Mermaid;
