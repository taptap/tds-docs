import { findSDKVersion } from "./ReleaseNote/api/index";

const sdkVersions = {
  taptap: {
    unity: "",
    android: "",
    ios: "",
    unreal: "",
    rtc: "1.1.0",
    adr: "1.1.5"
  },
  leancloud: {
    objc: "13.9.0",
    swift: "17.10.1",
    js: {
      storage: "4.13.2",
      realtime: "5.0.0-rc.7",
    },
    java: "8.2.19",
    csharp: "2.3.0",
    flutter: {
      storage: "0.7.10",
      realtime: "1.0.1",
    }
  },
  tapadn: {
    unity: "3.16.3.23",
    android: "3.16.3.23",
  },

  async initialize() {
    try {
      const versions = await findSDKVersion();
      if(versions.data.length > 0 ){
        for (const item of versions.data) {
          if(item.sdkPlugName == "unity"){
            this.taptap.unity = item.version;
          }else if(item.sdkPlugName == "ios"){
            this.taptap.ios = item.version;
          }else if(item.sdkPlugName == "android"){
            this.taptap.android = item.version;
          }else if(item.sdkPlugName == "ue4"){
            this.taptap.unreal = item.version;
          }
        }
      }   
    } catch (error) {
      console.error(error);
    }
  },
};

export default sdkVersions;

