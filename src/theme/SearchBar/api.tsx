import axios from "axios";
import { Source } from "./common";


const upItemListIndexApi = async (
  url:string,
  session:string,
  sequence:number,
  locale:string,
  index:number,
  source:Source,
): Promise<Boolean> => {
  const config=  { index:index,locale:locale ,source:source};
  const headers =  {
    "X-TDS-Doc-Search-Source": "docs",
    "X-TDS-Doc-Search-Session": session,
    "X-TDS-Doc-Search-Sequence": sequence,
  };
  
  console.log(url)

  var res = await axios.post(url , config,{headers});
  return true;
};

export {upItemListIndexApi}