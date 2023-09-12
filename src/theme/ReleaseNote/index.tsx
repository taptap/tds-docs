import React, { useState, useEffect, useRef } from "react"
import ReactMarkdown from 'react-markdown';


interface UnityReleaseProps {
  sdkPlugName: string;
  sdkName: string;
}



const UnityRelease = ({
  sdkPlugName,
  sdkName
}: UnityReleaseProps) => {


    const AV = require("leancloud-storage");
    const { Query, User } = AV;


    AV.init({
        appId: "lhzo7z96ayhad9flpynyiu79t2jpzuasz2ke8cdb09zduvug",
        appKey: "0k0wpd4ee07yoi9ecrltd2lqjjna6njnkp7u0mfhd8e1ft3h",
        serverURL: "https://lhzo7z96.lc-cn-n1-shared.com",
      });

    const [content, setContent] = useState(undefined)

    useEffect( () => {
        onSearch()
    }, [])

    
    // 获取列表数据
    const onSearch = () => {

      const query = new AV.Query("Release");
      query.equalTo("sdkPlugName", sdkPlugName);
      query.equalTo("sdkName", sdkName);

      query.find().then((contentInfo) => {
        setContent(contentInfo[0]["attributes"]["content"]);
      });
    }

    return (
      <div>
        <ReactMarkdown children={content} />
      </div>
    );
  };
  
export default UnityRelease;