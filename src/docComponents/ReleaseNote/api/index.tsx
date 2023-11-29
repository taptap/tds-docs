import ajax from './ajax';

export const findReleaseContent = (sdkPlugName: string, sdkName: string) => {
  return ajax('https://taptap.leanapp.cn/releases/find/content', { sdkPlugName, sdkName }, 'GET');
};


export const findReleaseSDKNames = (sdkPlugName: string, sdkName: string) => {
  return ajax('https://taptap.leanapp.cn/releases/find/sdkNames', { sdkPlugName, sdkName }, 'GET');
};


export const findContentForSDKNames = (sdkPlugName: string, sdkName: string) => {
  return ajax('https://taptap.leanapp.cn/releases/find/contentForSdkName', { sdkPlugName, sdkName }, 'GET');
};
