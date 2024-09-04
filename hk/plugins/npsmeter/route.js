const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
// https://xindong.atlassian.net/wiki/spaces/TDS/pages/502367788/1108+-
// add npsmeter
const addNpsmeter = (fn) => {
  (function (a, b, c, d, e, f) {
    a.npsmeter =
      a.npsmeter ||
      function () {
        (a.npsmeter.q = a.npsmeter.q || []).push(arguments);
      };
    a._npsSettings = { npsid: "be43f53ba22548cb", npssv: "1.01" };
    e = b.getElementsByTagName("head")[0];
    f = b.createElement("script");
    f.async = 1;
    f.src = c + d + a._npsSettings.npssv + "&npsid=" + a._npsSettings.npsid;
    e.appendChild(f);
    f.onload = fn;
  })(window, document, "https://static.npsmeter.cn/npsmeter-beta", ".js?sv=");
};

const clientModule = {
  onRouteDidUpdate({ location }) {
    // 仅在下列环境展示
    const CNHostname = [
      "developer.taptap.cn",
      "developer.xdrnd.cn",
      "localhost",
    ];
    if (
      !CNHostname.includes(window.location.hostname) &&
      !window.location.hostname.includes("netlify.app")
    )
      return;
    try {
      const userId = (getCookie("user_id") || "").split("");
      let user_id = 100;
      const userIdLength = userId.length;
      if (userIdLength) {
        // 首位 +1 ，末位 +2
        userId[0] = +userId[0] + 1;
        userId[userIdLength - 1] = +userId[userIdLength - 1] + 2;
        user_id = userId.join("");
      }
      const openNpsmeter = () => {
        // 游戏服务文档页
        const isSdk = location.pathname.includes("/docs/sdk");
        npsmeter({
          key: isSdk ? "be43f53ba22548cb" : "636e85637b109f0c",
          params: {
            remark: document.title.split("|")[0].trim(),
          },
        });
      };
      if (!window.npsmeter) {
        addNpsmeter(openNpsmeter);
      } else {
        window.npsmeter.closeBtn();
        openNpsmeter();
      }
    } catch (error) {
      console.log("error", error);
    }
  },
};
export default clientModule;
