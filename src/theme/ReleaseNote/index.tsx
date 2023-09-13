import React, { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown';

import { findReleaseContent } from "./api";

interface UnityReleaseProps {
  sdkPlugName: string;
  sdkName: string;
}

const UnityRelease = ({
  sdkPlugName,
  sdkName
}: UnityReleaseProps) => {

    const [content, setContent] = useState(undefined)


    useEffect( () => {
      onSearch()
    }, [])

    const onSearch = async () => {

      try {
        const result = await findReleaseContent(sdkPlugName, sdkName)
        const contentInfo = result.data._attributes.content
        setContent(contentInfo);
      } catch (error) {
        console.error(error);
      }
   }

  
    return (
      <div>
        <ReactMarkdown children={content} />
      </div>
    );
  };
  
export default UnityRelease;

