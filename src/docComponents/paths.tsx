import { BRAND } from "../constants/env";

export const PathToEngine = () =>
  BRAND === "leancloud"
    ? "云服务控制台 > 云引擎"
    : "开发者中心 > 你的游戏 > 游戏服务 > 云服务 > 云引擎";
