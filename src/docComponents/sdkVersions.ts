import { findSDKVersion } from "./ReleaseNote/api/index";

const sdkVersions = {
  taptap: {
    unity: "3.26.3",
    android: "3.24.0",
    ios: "3.23.0",
    unreal: "3.25.0",
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
    // try {
    //   // 调用 findSDKVersion 方法获取版本信息
    //   const unityVersion = await findSDKVersion("unity");
    //   const androidVersion = await findSDKVersion("android");
    //   const iosVersion = await findSDKVersion("ios");
    //   const ueVersion = await findSDKVersion("ue4");

    //   // 将获取的版本信息赋值给 taptap.unity
    //   this.taptap.unity = unityVersion.data;
    //   this.taptap.android = androidVersion.data;
    //   this.taptap.ios = iosVersion.data;
    //   this.taptap.unreal = ueVersion.data;
    // } catch (error) {
    //   console.error(error);
    // }
  },
};

// 在其他地方调用 sdkVersions.initialize() 来初始化异步值
sdkVersions.initialize();

export default sdkVersions;

