import ajax from './ajax';

export const findReleaseContent = (sdkPlugName: string, sdkName: string) => {
  return ajax('https://taptap.leanapp.cn/releases/find/content', { sdkPlugName, sdkName }, 'GET');
};
