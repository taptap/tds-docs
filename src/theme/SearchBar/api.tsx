import axios from "axios";
import { Source } from "./common";


const upItemListIndexApi = async (
  url:string,
  session:string,
  sequence:number,
  index:number,
  source:Source,
): Promise<Boolean> => {
  const config=  { index:index,source:source};
  const headers =  {
    "X-TDS-Doc-Search-Source": "docs",
    "X-TDS-Doc-Search-Session": session,
    "X-TDS-Doc-Search-Sequence": sequence,
  };
  

  var res = await axios.post(url , config,{headers});
  return true;
};

export {upItemListIndexApi}