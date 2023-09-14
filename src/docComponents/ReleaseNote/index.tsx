import React, { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown';
import styles from "./index.module.scss";

import { findReleaseContent, findReleaseSDKNames, findContentForSDKNames } from "./api";

interface UnityReleaseProps {
  sdkPlugName: string;
  sdkName: string;
}

const UnityRelease = ({
  sdkPlugName,
  sdkName
}: UnityReleaseProps) => {

    const [content, setContent] = useState('')
    const [SDKNameList, setSDKNameList] = useState([])


    useEffect( () => {
      onSearchAllContent();
      onSearchSdkNameList();

    }, [])

    const onSearchAllContent = async () => {

      try {
        const result = await findReleaseContent(sdkPlugName, sdkName)
        const contentInfo = result.data._attributes.content
        setContent(contentInfo);
      } catch (error) {
        console.error(error);
      }
   }

   const onSearchSdkNameList = async () => {

    try {
      const result = await findReleaseSDKNames(sdkPlugName, sdkName)
      const sdkNameList = result.data
      setSDKNameList(sdkNameList);
    } catch (error) {
      console.error(error);
    }
 }


 const onSearchContentForSdkName = async (sdkTag) => {

  try {
    const result = await findContentForSDKNames(sdkPlugName, sdkTag)
    const content = result.data
    setContent(content);
  } catch (error) {
    console.error(error);
  }
}



 const handleSelectChange =(event) => {
  const selectedValue = event.target.value; 
  if(selectedValue === "all"){
    onSearchAllContent()
  }else{
    onSearchContentForSdkName(selectedValue)
  }
  

 }




    return (
      <div className={styles.root}>
          <select id="selectBox" className={styles.selectPosition} onChange={handleSelectChange}>
            <option value="all">全部</option>

            {SDKNameList.map((optionText, index) => (

              <option key={index} value={optionText}>
                {optionText}
              </option>

            ))}

          </select>

        <ReactMarkdown children={content}/>
      </div>
    );
  };
  
export default UnityRelease;

