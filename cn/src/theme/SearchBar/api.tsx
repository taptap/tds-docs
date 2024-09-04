import axios from "axios";
import { Source } from "./common";
import { Segment, useDefault } from 'segmentit';
const segmentit = useDefault(new Segment());
const upItemListIndexApi = async (
  url:string,
  query:string,
  session:string,
  sequence:number,
  index:number,
  source:Source,
  local:string,
): Promise<Boolean> => {
 


  const config=  { index:index,indexInfo:source,query:query,local:local,searchType:
    /^\d+$/.test(query)||segmentit.doSegment(query).length<=2?"ES":"AI"};
  const headers =  {
    "X-TDS-Doc-Search-Source": "docs",
    "X-TDS-Doc-Search-Session": session,
    "X-TDS-Doc-Search-Sequence": sequence,
    "Content-Type":"application/json"
  };
  try{
    var res = await axios.post(url ,config,{headers});
  }catch(e){
    
  }

  
  return true;
};

export {upItemListIndexApi}