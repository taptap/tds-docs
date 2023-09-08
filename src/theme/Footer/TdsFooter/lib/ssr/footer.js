import Te from "./assets/qrcode-wx.png";
import ye from "./assets/qrcode-ws.png";
import Oe from "./assets/qrcode-bilibili.png";
import Le from "./assets/qrcode-qq.png";
function W() {
}
function Ee(n) {
  return n();
}
function ve() {
  return /* @__PURE__ */ Object.create(null);
}
function we(n) {
  n.forEach(Ee);
}
function Se(n, e) {
  return n != n ? e == e : n !== e || n && typeof n == "object" || typeof n == "function";
}
function oe(n, ...e) {
  if (n == null) {
    for (const o of e)
      o(void 0);
    return W;
  }
  const t = n.subscribe(...e);
  return t.unsubscribe ? () => t.unsubscribe() : t;
}
let je;
function ae(n) {
  je = n;
}
function Ue(n) {
  return (n == null ? void 0 : n.length) !== void 0 ? n : Array.from(n);
}
const ke = /[&"]/g, Qe = /[&<]/g;
function d(n, e = !1) {
  const t = String(n), o = e ? ke : Qe;
  o.lastIndex = 0;
  let A = "", i = 0;
  for (; o.test(t); ) {
    const r = o.lastIndex - 1, g = t[r];
    A += t.substring(i, r) + (g === "&" ? "&amp;" : g === '"' ? "&quot;" : "&lt;"), i = r + 1;
  }
  return A + t.substring(i);
}
function S(n, e) {
  n = Ue(n);
  let t = "";
  for (let o = 0; o < n.length; o += 1)
    t += e(n[o], o);
  return t;
}
function G(n, e) {
  if (!n || !n.$$render)
    throw e === "svelte:component" && (e += " this={...}"), new Error(
      `<${e}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${e}>.`
    );
  return n;
}
let J;
function ne(n) {
  function e(t, o, A, i, r) {
    const g = je, a = {
      on_destroy: J,
      context: new Map(r || (g ? g.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: ve()
    };
    ae({ $$: a });
    const s = n(t, o, A, i);
    return ae(g), s;
  }
  return {
    render: (t = {}, { $$slots: o = {}, context: A = /* @__PURE__ */ new Map() } = {}) => {
      J = [];
      const i = { title: "", head: "", css: /* @__PURE__ */ new Set() }, r = e(i, t, {}, o, A);
      return we(J), {
        html: r,
        css: {
          code: Array.from(i.css).map((g) => g.code).join(`
`),
          map: null
          // TODO
        },
        head: i.title + i.head
      };
    },
    $$render: e
  };
}
function f(n, e, t) {
  if (e == null || t && !e)
    return "";
  const o = t && e === !0 ? "" : `="${d(e, !0)}"`;
  return ` ${n}${o}`;
}
var j = /* @__PURE__ */ ((n) => (n.FooterTapBtn = "footer_tap_btn", n.FooterStorePublish = "footer_store_publish", n.FooterServiceDevelopBuild = "footer_service_develop_build", n.FooterServiceOperationTools = "footer_service_operation_tools", n.FooterServiceRevenue = "footer_service_revenue", n.FooterCommercializationAd = "footer_commercialization_ad", n.FooterCommercializationRep = "footer_commercialization_rep", n.FooterCommercializationCmp = "footer_commercialization_cmp", n.FooterCommunityTutorials = "footer_community_tutorials", n.FooterCommunityForum = "footer_community_forum", n.FooterCommunityDocument = "footer_community_document", n.FooterCommunityBlog = "footer_community_blog", n.FooterCommunityProjectTorch = "footer_community_project_torch", n.FooterOtherStatus = "footer_other_status", n.FooterOtherTerms = "footer_other_terms", n.FooterOtherPrivacyPolicy = "footer_other_privacy_policy", n.FooterOtherCopyright = "footer_other_copyright", n.FooterEmailCooperation = "footer_email_cooperation", n.FooterEmailOperation = "footer_email_operation", n))(j || {});
const be = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjAwODQyIDcuMDAwMTJMNC4xNzA5IDExLjgzNzZMNC45OTU4NiAxMi42NjI2TDEwLjY1ODMgNy4wMDAxMkw0Ljk5NTg2IDEuMzM3NjRMNC4xNzA5IDIuMTYyNkw5LjAwODQyIDcuMDAwMTJaIiBmaWxsPSIjRUJFRkYwIi8+Cjwvc3ZnPgo=", Ye = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAYCAMAAAAxgAaOAAAC/VBMVEUAAAAfHkn6+tHStUn/7rdBPFHHqm0wLVHMsl/Fp1bQtlTOuEzGp1nKsXTCol9lWmHEpXHVwIni1JrczZbSvoPMrXqZj4HTv5Hy67Dt5qzIu53s6Lzw4Lfn27bNs2Y5NU3Gp29dV17hyErGpUXHpkbTvmA9OVjFo03GpVJgWmDbw0zLq0fMsWHOtV3WvVNDPU7ZwFZdVEvVwXnEpGvCpUW4oEFnYmHLsnTCom5rX2LRumk5N1LWwHJzamlVUFHJrHXOt3JjWFvMsnl6dGvez3vComnAoWhHPlF3bm64qVrYx4F4bmzMvFnFpm1WTlCNgm/o3o7Jsobh0I18c3HbyZbez6R0bXDdz6LBuIPEqH3dz6W+sH/TyX69q33r36Ti1p2fkILk16Tq346woobNwZbw5qvv5JquoITXzo3OwY3NvJvz7Mfr697d1sHp6YwiIU7Cnz/GqEaVgEXKqETFokOzMiSyLiG0JRo7OVQOCVAqJ09XTEzJqkluXknIp0LTvXbKrW3Kr2jQtFbNiVbNsFXMrVVxbFNdV1JSS1IICFIjJFHTuVCxlFDHp09wZU5gVE1GPU04Mk3LrEzEokwXCUtQR0q2lkiDckjRt0fLrUZ8a0aljURTI0QeGEHFjz+4ez3HejvEcju6bTq2Wji6Tje+YTO7RzHMXy3IUCe3Oia1MiK5NiHUwnHSvG7OtGjJq2XFpWPMpGDSuF/BpFtWUlmZiFeSelaRelaGdVaAblbJpFTJkFRnXVRCQVSZi1IcHFISFFGzm04pI04kHk5cUE0eFE0sIEzNsEu+o0vOp0qxkkpCN0rXp0mah0mIdElpXEnHrkg5KUjFmEfDmEfBhUdTQEfCokZjVEa+nEXBjEXGg0VbRkW5n0TEbkRNG0S9oEJeNUIqCkLWl0GLc0EzDEFjN0BbKkDLqz/EZT+5gD65fz45DDzUhDnLcjbGZTTDZzO1TDPAWzGuQjG+Si/OZy65QCzPWylsFCmYKSbFSiSsNiSvLSODGyLDPSDBNB20xMaBAAAAb3RSTlMA/RD+B/38/Pry8uzo3dzYspOSinx7ZDw4KCcaEAr7+/n5+fj39vb29fT09PLy8vDv7+7u7ezr5+be3dzb2trW1dTT0c/My8fFwr+/v76+s6qlo6KgmZaTk4+FhYR/fn16c29ua2dgW1NOLiknJQXbig1SAAABu0lEQVQoz2KgApCVEgvzsNVUNHMOFpOSRZeVTOZX27Nz+7YdfayWCVnospn+c7dsvrJw4a1dbXO901lQdUbzs7e3fly9ZMmqz2fa5B1js5FlM/wY2be+LVtVWlr2e/kpVkb3lDyEJFOMHWNFz4ry0rKy0vK/86oZrSOYELISPob5e6f9LF+5bNnX8n/z2vP1PSUQsmnctfkVB7+sftHcfHfliksdXVNNUxGySdyz8rv2PVq6e+2ajUvf9FTkXzeJQ8gGaBVNPNAx+fL8Vy/n3zxZu79qlnYQQhYwF6U71Z1Tfnx7t2DB++W/nnROmM1sg5AVNpgxvary+6fFixYt/vBnSn7fBb0QhKwQ14zZ1ZUP78158PTZnNeVU88yc4Ujyep2Fxadnnjo2NXbF48erjp3okknFCGbaKXaff/x9P7+oqLzE47UTmuRM49CyEoLOnAwPy+eXDNz5rUbJQWTOHgDcxiQpEV4G1sLCwtraoqLS3o3WETmIknKxHsZ1dc3FRSUlBQU9DY2GPuKMCHJCjuxNazbdLy4rq5uUst6NgV7QSRZFnFRAVc+Hk4NFWV1Th4+NwFRcRaK0yIAllOunA6Nm/wAAAAASUVORK5CYII=", _e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAYCAMAAAAxgAaOAAABjFBMVEUAAAATckQhrUggqkoUc0MXi0UTgUIQeEBIumk5tl4wslVIvGsynFdSuWmL0bo0s1mP06RewnsOcT8kqUwhpUogokofnUkcmUgakkckrU2Iz50ysVcpsFFiw35mxYMnrk5FtGkssFI4tV0fq0cmrU0Tb0Inrk4gq0csrlEtr1MmsEsjrUlOvm9ixIn/+f8JbzwIbTwLdDz5+PoepEgVjUMNez8Mdz79+P3D5c6M0qEfp0gdokcXlEQIazvr8u/l8OrR6trO59e24cSu3r2b166Azpd8uZYcnkcZmEURhUAQgUAJcTvg7+Xe6+TI4dO62siu0b+k17WZ1auWxauV1aiS0qaQy6aP1KODzZp6zJJxxYwvmlggqUkgqEkUiEL09fbw9PPv8/Pm8Onb7eHV593H59LC2s6848im27eSyqePwKaI0Z6FuJ13sZJ0yY1ms4VjrIJYnHlXvXZGrmlAnmU+rGM6s186pV83pl0to1Uoj1MohVMnp08kpk4inE0ilU0cjUkbgEkZkkYVeEVyP8gxAAAALnRSTlMAjn/+NfLy8uvEZxwUCwX++PTz8vLy8vLy8ebYwbuuq6qSiYV6d2JhUlA9OycNkcq3hQAAAShJREFUKM+l0MVywgAQgOG0xQvU3d0XSAJJCMUiQHHXuru7ty/eJod2Ijf+6zc7u7NI/U216/U6nVbb29Pd1dnRNyPVBpvD5VyJ4F/3jzS22tQo16ig/E4Czavp96+mAu+eAvHiVqj98tl5FK/innQMU9HoaRblP6qFzQqtpo4TIplIHj6EaHdNoTZHCp7WcE84RGO1wWmF8nAhKnZX2jdY5Pq5582ev71WSAItB2Yluiy84+b6ikEBoOiDYdmsC79lfSCUjwG0WqSzYW4XFZFlOYbwmSRqjwSDxRyVI9MZAP/xwZBsbwlgg/L6/SAUaGn+V7NGoxkFyGyBGHk2MLmESFog1ymBvJRhbB6RZ+1ntgENto3MWRGVxstxzmgyI+otGif+Tqm/H0MxREFPGJ/iAAAAAElFTkSuQmCC", Be = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAYCAMAAAAxgAaOAAAAgVBMVEUAAAAAlOIAluDWAA/TAAzUABAAleDXAA7WAA/WAA7WAA/WAA8Alt/XAA/VAA8Alt8Al+HVAA4AlODWAAzUAA8AlOLUAA7VAA7UABHVAA8AluEAluAAlt8AluAAluEAluAAld8Ak+AAluIAleIAm+gAneHSAA8Gm9ndABEAluDWAA/q5VOTAAAAKXRSTlMAH+DfHyHxf+7p49zZ0sx7YlpDOzIvLSQO9ezm0MarnYBTUDkhGhEQD3uRnDoAAACXSURBVCjPrdDZDoIwEIXhU1osiggqAu771vd/QJ1pNGpHrvhvv2SSM+gqxUEuv1NbGQvGjYx7xjXsVMBJj3B1tW4e8pFxeLbOuaT8wZlH1Wj3bGC+pywJIwXEzNp8YvRCid/I3CfO/mjFmrZejiFwgNxpwQzjF9XS4MKjrqVP5peUMKkQdtjdMkeVkGpGjGOItSIMh656ANTdGBnUd2YSAAAAAElFTkSuQmCC", Fe = {
  type: "logger",
  log(n) {
    this.output("log", n);
  },
  warn(n) {
    this.output("warn", n);
  },
  error(n) {
    this.output("error", n);
  },
  output(n, e) {
    console && console[n] && console[n].apply(console, e);
  }
};
class P {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(e, t);
  }
  init(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = t.prefix || "i18next:", this.logger = e || Fe, this.options = t, this.debug = t.debug;
  }
  log() {
    for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
      t[o] = arguments[o];
    return this.forward(t, "log", "", !0);
  }
  warn() {
    for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
      t[o] = arguments[o];
    return this.forward(t, "warn", "", !0);
  }
  error() {
    for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
      t[o] = arguments[o];
    return this.forward(t, "error", "");
  }
  deprecate() {
    for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
      t[o] = arguments[o];
    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(e, t, o, A) {
    return A && !this.debug ? null : (typeof e[0] == "string" && (e[0] = `${o}${this.prefix} ${e[0]}`), this.logger[t](e));
  }
  create(e) {
    return new P(this.logger, {
      prefix: `${this.prefix}:${e}:`,
      ...this.options
    });
  }
  clone(e) {
    return e = e || this.options, e.prefix = e.prefix || this.prefix, new P(this.logger, e);
  }
}
var O = new P();
class H {
  constructor() {
    this.observers = {};
  }
  on(e, t) {
    return e.split(" ").forEach((o) => {
      this.observers[o] = this.observers[o] || [], this.observers[o].push(t);
    }), this;
  }
  off(e, t) {
    if (this.observers[e]) {
      if (!t) {
        delete this.observers[e];
        return;
      }
      this.observers[e] = this.observers[e].filter((o) => o !== t);
    }
  }
  emit(e) {
    for (var t = arguments.length, o = new Array(t > 1 ? t - 1 : 0), A = 1; A < t; A++)
      o[A - 1] = arguments[A];
    this.observers[e] && [].concat(this.observers[e]).forEach((r) => {
      r(...o);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((r) => {
      r.apply(r, [e, ...o]);
    });
  }
}
function Y() {
  let n, e;
  const t = new Promise((o, A) => {
    n = o, e = A;
  });
  return t.resolve = n, t.reject = e, t;
}
function ue(n) {
  return n == null ? "" : "" + n;
}
function qe(n, e, t) {
  n.forEach((o) => {
    e[o] && (t[o] = e[o]);
  });
}
function Ae(n, e, t) {
  function o(r) {
    return r && r.indexOf("###") > -1 ? r.replace(/###/g, ".") : r;
  }
  function A() {
    return !n || typeof n == "string";
  }
  const i = typeof e != "string" ? [].concat(e) : e.split(".");
  for (; i.length > 1; ) {
    if (A())
      return {};
    const r = o(i.shift());
    !n[r] && t && (n[r] = new t()), Object.prototype.hasOwnProperty.call(n, r) ? n = n[r] : n = {};
  }
  return A() ? {} : {
    obj: n,
    k: o(i.shift())
  };
}
function Me(n, e, t) {
  const {
    obj: o,
    k: A
  } = Ae(n, e, Object);
  o[A] = t;
}
function Ge(n, e, t, o) {
  const {
    obj: A,
    k: i
  } = Ae(n, e, Object);
  A[i] = A[i] || [], o && (A[i] = A[i].concat(t)), o || A[i].push(t);
}
function K(n, e) {
  const {
    obj: t,
    k: o
  } = Ae(n, e);
  if (t)
    return t[o];
}
function Re(n, e, t) {
  const o = K(n, t);
  return o !== void 0 ? o : K(e, t);
}
function fe(n, e, t) {
  for (const o in e)
    o !== "__proto__" && o !== "constructor" && (o in n ? typeof n[o] == "string" || n[o] instanceof String || typeof e[o] == "string" || e[o] instanceof String ? t && (n[o] = e[o]) : fe(n[o], e[o], t) : n[o] = e[o]);
  return n;
}
function E(n) {
  return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var We = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function Pe(n) {
  return typeof n == "string" ? n.replace(/[&<>"'\/]/g, (e) => We[e]) : n;
}
const Ke = [" ", ",", "?", "!", ";"];
function Ve(n, e, t) {
  e = e || "", t = t || "";
  const o = Ke.filter((r) => e.indexOf(r) < 0 && t.indexOf(r) < 0);
  if (o.length === 0)
    return !0;
  const A = new RegExp(`(${o.map((r) => r === "?" ? "\\?" : r).join("|")})`);
  let i = !A.test(n);
  if (!i) {
    const r = n.indexOf(t);
    r > 0 && !A.test(n.substring(0, r)) && (i = !0);
  }
  return i;
}
function V(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!n)
    return;
  if (n[e])
    return n[e];
  const o = e.split(t);
  let A = n;
  for (let i = 0; i < o.length; ++i) {
    if (!A || typeof A[o[i]] == "string" && i + 1 < o.length)
      return;
    if (A[o[i]] === void 0) {
      let r = 2, g = o.slice(i, i + r).join(t), a = A[g];
      for (; a === void 0 && o.length > i + r; )
        r++, g = o.slice(i, i + r).join(t), a = A[g];
      if (a === void 0)
        return;
      if (a === null)
        return null;
      if (e.endsWith(g)) {
        if (typeof a == "string")
          return a;
        if (g && typeof a[g] == "string")
          return a[g];
      }
      const s = o.slice(i + r).join(t);
      return s ? V(a, s, t) : void 0;
    }
    A = A[o[i]];
  }
  return A;
}
function $(n) {
  return n && n.indexOf("_") > 0 ? n.replace("_", "-") : n;
}
class le extends H {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = e || {}, this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(e) {
    this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
  }
  removeNamespaces(e) {
    const t = this.options.ns.indexOf(e);
    t > -1 && this.options.ns.splice(t, 1);
  }
  getResource(e, t, o) {
    let A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const i = A.keySeparator !== void 0 ? A.keySeparator : this.options.keySeparator, r = A.ignoreJSONStructure !== void 0 ? A.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let g = [e, t];
    o && typeof o != "string" && (g = g.concat(o)), o && typeof o == "string" && (g = g.concat(i ? o.split(i) : o)), e.indexOf(".") > -1 && (g = e.split("."));
    const a = K(this.data, g);
    return a || !r || typeof o != "string" ? a : V(this.data && this.data[e] && this.data[e][t], o, i);
  }
  addResource(e, t, o, A) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const r = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let g = [e, t];
    o && (g = g.concat(r ? o.split(r) : o)), e.indexOf(".") > -1 && (g = e.split("."), A = t, t = g[1]), this.addNamespaces(t), Me(this.data, g, A), i.silent || this.emit("added", e, t, o, A);
  }
  addResources(e, t, o) {
    let A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const i in o)
      (typeof o[i] == "string" || Object.prototype.toString.apply(o[i]) === "[object Array]") && this.addResource(e, t, i, o[i], {
        silent: !0
      });
    A.silent || this.emit("added", e, t, o);
  }
  addResourceBundle(e, t, o, A, i) {
    let r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, g = [e, t];
    e.indexOf(".") > -1 && (g = e.split("."), A = o, o = t, t = g[1]), this.addNamespaces(t);
    let a = K(this.data, g) || {};
    A ? fe(a, o, i) : a = {
      ...a,
      ...o
    }, Me(this.data, g, a), r.silent || this.emit("added", e, t, o);
  }
  removeResourceBundle(e, t) {
    this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t);
  }
  hasResourceBundle(e, t) {
    return this.getResource(e, t) !== void 0;
  }
  getResourceBundle(e, t) {
    return t || (t = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? {
      ...this.getResource(e, t)
    } : this.getResource(e, t);
  }
  getDataByLanguage(e) {
    return this.data[e];
  }
  hasLanguageSomeTranslations(e) {
    const t = this.getDataByLanguage(e);
    return !!(t && Object.keys(t) || []).find((A) => t[A] && Object.keys(t[A]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var de = {
  processors: {},
  addPostProcessor(n) {
    this.processors[n.name] = n;
  },
  handle(n, e, t, o, A) {
    return n.forEach((i) => {
      this.processors[i] && (e = this.processors[i].process(e, t, o, A));
    }), e;
  }
};
const Ce = {};
class Z extends H {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), qe(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = O.create("translator");
  }
  changeLanguage(e) {
    e && (this.language = e);
  }
  exists(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (e == null)
      return !1;
    const o = this.resolve(e, t);
    return o && o.res !== void 0;
  }
  extractFromKey(e, t) {
    let o = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    o === void 0 && (o = ":");
    const A = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let i = t.ns || this.options.defaultNS || [];
    const r = o && e.indexOf(o) > -1, g = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !Ve(e, o, A);
    if (r && !g) {
      const a = e.match(this.interpolator.nestingRegexp);
      if (a && a.length > 0)
        return {
          key: e,
          namespaces: i
        };
      const s = e.split(o);
      (o !== A || o === A && this.options.ns.indexOf(s[0]) > -1) && (i = s.shift()), e = s.join(A);
    }
    return typeof i == "string" && (i = [i]), {
      key: e,
      namespaces: i
    };
  }
  translate(e, t, o) {
    if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = {
      ...t
    }), t || (t = {}), e == null)
      return "";
    Array.isArray(e) || (e = [String(e)]);
    const A = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails, i = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator, {
      key: r,
      namespaces: g
    } = this.extractFromKey(e[e.length - 1], t), a = g[g.length - 1], s = t.lng || this.language, M = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (s && s.toLowerCase() === "cimode") {
      if (M) {
        const m = t.nsSeparator || this.options.nsSeparator;
        return A ? {
          res: `${a}${m}${r}`,
          usedKey: r,
          exactUsedKey: r,
          usedLng: s,
          usedNS: a
        } : `${a}${m}${r}`;
      }
      return A ? {
        res: r,
        usedKey: r,
        exactUsedKey: r,
        usedLng: s,
        usedNS: a
      } : r;
    }
    const l = this.resolve(e, t);
    let u = l && l.res;
    const c = l && l.usedKey || r, C = l && l.exactUsedKey || r, N = Object.prototype.toString.apply(u), p = ["[object Number]", "[object Function]", "[object RegExp]"], I = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays, D = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (D && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && p.indexOf(N) < 0 && !(typeof I == "string" && N === "[object Array]")) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const m = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(c, u, {
          ...t,
          ns: g
        }) : `key '${r} (${this.language})' returned an object instead of string.`;
        return A ? (l.res = m, l) : m;
      }
      if (i) {
        const m = N === "[object Array]", x = m ? [] : {}, y = m ? C : c;
        for (const h in u)
          if (Object.prototype.hasOwnProperty.call(u, h)) {
            const F = `${y}${i}${h}`;
            x[h] = this.translate(F, {
              ...t,
              joinArrays: !1,
              ns: g
            }), x[h] === F && (x[h] = u[h]);
          }
        u = x;
      }
    } else if (D && typeof I == "string" && N === "[object Array]")
      u = u.join(I), u && (u = this.extendTranslation(u, e, t, o));
    else {
      let m = !1, x = !1;
      const y = t.count !== void 0 && typeof t.count != "string", h = Z.hasDefaultValue(t), F = y ? this.pluralResolver.getSuffix(s, t.count, t) : "", he = t.ordinal && y ? this.pluralResolver.getSuffix(s, t.count, {
        ordinal: !1
      }) : "", k = t[`defaultValue${F}`] || t[`defaultValue${he}`] || t.defaultValue;
      !this.isValidLookup(u) && h && (m = !0, u = k), this.isValidLookup(u) || (x = !0, u = r);
      const xe = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && x ? void 0 : u, Q = h && k !== u && this.options.updateMissing;
      if (x || m || Q) {
        if (this.logger.log(Q ? "updateKey" : "missingKey", s, a, r, Q ? k : u), i) {
          const T = this.resolve(r, {
            ...t,
            keySeparator: !1
          });
          T && T.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let b = [];
        const q = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && q && q[0])
          for (let T = 0; T < q.length; T++)
            b.push(q[T]);
        else
          this.options.saveMissingTo === "all" ? b = this.languageUtils.toResolveHierarchy(t.lng || this.language) : b.push(t.lng || this.language);
        const re = (T, L, se) => {
          const ge = h && se !== u ? se : xe;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(T, a, L, ge, Q, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(T, a, L, ge, Q, t), this.emit("missingKey", T, a, L, u);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && y ? b.forEach((T) => {
          this.pluralResolver.getSuffixes(T, t).forEach((L) => {
            re([T], r + L, t[`defaultValue${L}`] || k);
          });
        }) : re(b, r, k));
      }
      u = this.extendTranslation(u, e, t, l, o), x && u === r && this.options.appendNamespaceToMissingKey && (u = `${a}:${r}`), (x || m) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${a}:${r}` : r, m ? u : void 0) : u = this.options.parseMissingKeyHandler(u));
    }
    return A ? (l.res = u, l) : u;
  }
  extendTranslation(e, t, o, A, i) {
    var r = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      e = this.i18nFormat.parse(e, {
        ...this.options.interpolation.defaultVariables,
        ...o
      }, A.usedLng, A.usedNS, A.usedKey, {
        resolved: A
      });
    else if (!o.skipInterpolation) {
      o.interpolation && this.interpolator.init({
        ...o,
        interpolation: {
          ...this.options.interpolation,
          ...o.interpolation
        }
      });
      const s = typeof e == "string" && (o && o.interpolation && o.interpolation.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let M;
      if (s) {
        const u = e.match(this.interpolator.nestingRegexp);
        M = u && u.length;
      }
      let l = o.replace && typeof o.replace != "string" ? o.replace : o;
      if (this.options.interpolation.defaultVariables && (l = {
        ...this.options.interpolation.defaultVariables,
        ...l
      }), e = this.interpolator.interpolate(e, l, o.lng || this.language, o), s) {
        const u = e.match(this.interpolator.nestingRegexp), c = u && u.length;
        M < c && (o.nest = !1);
      }
      !o.lng && this.options.compatibilityAPI !== "v1" && A && A.res && (o.lng = A.usedLng), o.nest !== !1 && (e = this.interpolator.nest(e, function() {
        for (var u = arguments.length, c = new Array(u), C = 0; C < u; C++)
          c[C] = arguments[C];
        return i && i[0] === c[0] && !o.context ? (r.logger.warn(`It seems you are nesting recursively key: ${c[0]} in key: ${t[0]}`), null) : r.translate(...c, t);
      }, o)), o.interpolation && this.interpolator.reset();
    }
    const g = o.postProcess || this.options.postProcess, a = typeof g == "string" ? [g] : g;
    return e != null && a && a.length && o.applyPostProcessor !== !1 && (e = de.handle(a, e, t, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: A,
      ...o
    } : o, this)), e;
  }
  resolve(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, o, A, i, r, g;
    return typeof e == "string" && (e = [e]), e.forEach((a) => {
      if (this.isValidLookup(o))
        return;
      const s = this.extractFromKey(a, t), M = s.key;
      A = M;
      let l = s.namespaces;
      this.options.fallbackNS && (l = l.concat(this.options.fallbackNS));
      const u = t.count !== void 0 && typeof t.count != "string", c = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(), C = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "", N = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
      l.forEach((p) => {
        this.isValidLookup(o) || (g = p, !Ce[`${N[0]}-${p}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(g) && (Ce[`${N[0]}-${p}`] = !0, this.logger.warn(`key "${A}" for languages "${N.join(", ")}" won't get resolved as namespace "${g}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), N.forEach((I) => {
          if (this.isValidLookup(o))
            return;
          r = I;
          const D = [M];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(D, M, I, p, t);
          else {
            let m;
            u && (m = this.pluralResolver.getSuffix(I, t.count, t));
            const x = `${this.options.pluralSeparator}zero`, y = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (u && (D.push(M + m), t.ordinal && m.indexOf(y) === 0 && D.push(M + m.replace(y, this.options.pluralSeparator)), c && D.push(M + x)), C) {
              const h = `${M}${this.options.contextSeparator}${t.context}`;
              D.push(h), u && (D.push(h + m), t.ordinal && m.indexOf(y) === 0 && D.push(h + m.replace(y, this.options.pluralSeparator)), c && D.push(h + x));
            }
          }
          let B;
          for (; B = D.pop(); )
            this.isValidLookup(o) || (i = B, o = this.getResource(I, p, B, t));
        }));
      });
    }), {
      res: o,
      usedKey: A,
      exactUsedKey: i,
      usedLng: r,
      usedNS: g
    };
  }
  isValidLookup(e) {
    return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "");
  }
  getResource(e, t, o) {
    let A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, o, A) : this.resourceStore.getResource(e, t, o, A);
  }
  static hasDefaultValue(e) {
    const t = "defaultValue";
    for (const o in e)
      if (Object.prototype.hasOwnProperty.call(e, o) && t === o.substring(0, t.length) && e[o] !== void 0)
        return !0;
    return !1;
  }
}
function X(n) {
  return n.charAt(0).toUpperCase() + n.slice(1);
}
class ce {
  constructor(e) {
    this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = O.create("languageUtils");
  }
  getScriptPartFromCode(e) {
    if (e = $(e), !e || e.indexOf("-") < 0)
      return null;
    const t = e.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(e) {
    if (e = $(e), !e || e.indexOf("-") < 0)
      return e;
    const t = e.split("-");
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(e) {
    if (typeof e == "string" && e.indexOf("-") > -1) {
      const t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let o = e.split("-");
      return this.options.lowerCaseLng ? o = o.map((A) => A.toLowerCase()) : o.length === 2 ? (o[0] = o[0].toLowerCase(), o[1] = o[1].toUpperCase(), t.indexOf(o[1].toLowerCase()) > -1 && (o[1] = X(o[1].toLowerCase()))) : o.length === 3 && (o[0] = o[0].toLowerCase(), o[1].length === 2 && (o[1] = o[1].toUpperCase()), o[0] !== "sgn" && o[2].length === 2 && (o[2] = o[2].toUpperCase()), t.indexOf(o[1].toLowerCase()) > -1 && (o[1] = X(o[1].toLowerCase())), t.indexOf(o[2].toLowerCase()) > -1 && (o[2] = X(o[2].toLowerCase()))), o.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e;
  }
  isSupportedCode(e) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1;
  }
  getBestMatchFromCodes(e) {
    if (!e)
      return null;
    let t;
    return e.forEach((o) => {
      if (t)
        return;
      const A = this.formatLanguageCode(o);
      (!this.options.supportedLngs || this.isSupportedCode(A)) && (t = A);
    }), !t && this.options.supportedLngs && e.forEach((o) => {
      if (t)
        return;
      const A = this.getLanguagePartFromCode(o);
      if (this.isSupportedCode(A))
        return t = A;
      t = this.options.supportedLngs.find((i) => {
        if (i === A)
          return i;
        if (!(i.indexOf("-") < 0 && A.indexOf("-") < 0) && i.indexOf(A) === 0)
          return i;
      });
    }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t;
  }
  getFallbackCodes(e, t) {
    if (!e)
      return [];
    if (typeof e == "function" && (e = e(t)), typeof e == "string" && (e = [e]), Object.prototype.toString.apply(e) === "[object Array]")
      return e;
    if (!t)
      return e.default || [];
    let o = e[t];
    return o || (o = e[this.getScriptPartFromCode(t)]), o || (o = e[this.formatLanguageCode(t)]), o || (o = e[this.getLanguagePartFromCode(t)]), o || (o = e.default), o || [];
  }
  toResolveHierarchy(e, t) {
    const o = this.getFallbackCodes(t || this.options.fallbackLng || [], e), A = [], i = (r) => {
      r && (this.isSupportedCode(r) ? A.push(r) : this.logger.warn(`rejecting language code not found in supportedLngs: ${r}`));
    };
    return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && i(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && i(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && i(this.getLanguagePartFromCode(e))) : typeof e == "string" && i(this.formatLanguageCode(e)), o.forEach((r) => {
      A.indexOf(r) < 0 && i(this.formatLanguageCode(r));
    }), A;
  }
}
let $e = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}], Ze = {
  1: function(n) {
    return +(n > 1);
  },
  2: function(n) {
    return +(n != 1);
  },
  3: function(n) {
    return 0;
  },
  4: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  5: function(n) {
    return n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
  },
  6: function(n) {
    return n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
  },
  7: function(n) {
    return n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  8: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3;
  },
  9: function(n) {
    return +(n >= 2);
  },
  10: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
  },
  11: function(n) {
    return n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
  },
  12: function(n) {
    return +(n % 10 != 1 || n % 100 == 11);
  },
  13: function(n) {
    return +(n !== 0);
  },
  14: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3;
  },
  15: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  16: function(n) {
    return n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2;
  },
  17: function(n) {
    return n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1;
  },
  18: function(n) {
    return n == 0 ? 0 : n == 1 ? 1 : 2;
  },
  19: function(n) {
    return n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
  },
  20: function(n) {
    return n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
  },
  21: function(n) {
    return n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0;
  },
  22: function(n) {
    return n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3;
  }
};
const He = ["v1", "v2", "v3"], Je = ["v4"], Ne = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function Xe() {
  const n = {};
  return $e.forEach((e) => {
    e.lngs.forEach((t) => {
      n[t] = {
        numbers: e.nr,
        plurals: Ze[e.fc]
      };
    });
  }), n;
}
class et {
  constructor(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = e, this.options = t, this.logger = O.create("pluralResolver"), (!this.options.compatibilityJSON || Je.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = Xe();
  }
  addRule(e, t) {
    this.rules[e] = t;
  }
  getRule(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules($(e), {
          type: t.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)];
  }
  needsPlural(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const o = this.getRule(e, t);
    return this.shouldUseIntlApi() ? o && o.resolvedOptions().pluralCategories.length > 1 : o && o.numbers.length > 1;
  }
  getPluralFormsOfKey(e, t) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(e, o).map((A) => `${t}${A}`);
  }
  getSuffixes(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const o = this.getRule(e, t);
    return o ? this.shouldUseIntlApi() ? o.resolvedOptions().pluralCategories.sort((A, i) => Ne[A] - Ne[i]).map((A) => `${this.options.prepend}${t.ordinal ? `ordinal${this.options.prepend}` : ""}${A}`) : o.numbers.map((A) => this.getSuffix(e, A, t)) : [];
  }
  getSuffix(e, t) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const A = this.getRule(e, o);
    return A ? this.shouldUseIntlApi() ? `${this.options.prepend}${o.ordinal ? `ordinal${this.options.prepend}` : ""}${A.select(t)}` : this.getSuffixRetroCompatible(A, t) : (this.logger.warn(`no plural rule found for: ${e}`), "");
  }
  getSuffixRetroCompatible(e, t) {
    const o = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t));
    let A = e.numbers[o];
    this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 && (A === 2 ? A = "plural" : A === 1 && (A = ""));
    const i = () => this.options.prepend && A.toString() ? this.options.prepend + A.toString() : A.toString();
    return this.options.compatibilityJSON === "v1" ? A === 1 ? "" : typeof A == "number" ? `_plural_${A.toString()}` : i() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? i() : this.options.prepend && o.toString() ? this.options.prepend + o.toString() : o.toString();
  }
  shouldUseIntlApi() {
    return !He.includes(this.options.compatibilityJSON);
  }
}
function Ie(n, e, t) {
  let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", A = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = Re(n, e, t);
  return !i && A && typeof t == "string" && (i = V(n, t, o), i === void 0 && (i = V(e, t, o))), i;
}
class tt {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = O.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || ((t) => t), this.init(e);
  }
  init() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    e.interpolation || (e.interpolation = {
      escapeValue: !0
    });
    const t = e.interpolation;
    this.escape = t.escape !== void 0 ? t.escape : Pe, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? E(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? E(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? E(t.nestingPrefix) : t.nestingPrefixEscaped || E("$t("), this.nestingSuffix = t.nestingSuffix ? E(t.nestingSuffix) : t.nestingSuffixEscaped || E(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const e = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(e, "g");
    const t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(t, "g");
    const o = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(o, "g");
  }
  interpolate(e, t, o, A) {
    let i, r, g;
    const a = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function s(C) {
      return C.replace(/\$/g, "$$$$");
    }
    const M = (C) => {
      if (C.indexOf(this.formatSeparator) < 0) {
        const D = Ie(t, a, C, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(D, void 0, o, {
          ...A,
          ...t,
          interpolationkey: C
        }) : D;
      }
      const N = C.split(this.formatSeparator), p = N.shift().trim(), I = N.join(this.formatSeparator).trim();
      return this.format(Ie(t, a, p, this.options.keySeparator, this.options.ignoreJSONStructure), I, o, {
        ...A,
        ...t,
        interpolationkey: p
      });
    };
    this.resetRegExp();
    const l = A && A.missingInterpolationHandler || this.options.missingInterpolationHandler, u = A && A.interpolation && A.interpolation.skipOnVariables !== void 0 ? A.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (C) => s(C)
    }, {
      regex: this.regexp,
      safeValue: (C) => this.escapeValue ? s(this.escape(C)) : s(C)
    }].forEach((C) => {
      for (g = 0; i = C.regex.exec(e); ) {
        const N = i[1].trim();
        if (r = M(N), r === void 0)
          if (typeof l == "function") {
            const I = l(e, i, A);
            r = typeof I == "string" ? I : "";
          } else if (A && Object.prototype.hasOwnProperty.call(A, N))
            r = "";
          else if (u) {
            r = i[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${N} for interpolating ${e}`), r = "";
        else
          typeof r != "string" && !this.useRawValueToEscape && (r = ue(r));
        const p = C.safeValue(r);
        if (e = e.replace(i[0], p), u ? (C.regex.lastIndex += r.length, C.regex.lastIndex -= i[0].length) : C.regex.lastIndex = 0, g++, g >= this.maxReplaces)
          break;
      }
    }), e;
  }
  nest(e, t) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, A, i, r;
    function g(a, s) {
      const M = this.nestingOptionsSeparator;
      if (a.indexOf(M) < 0)
        return a;
      const l = a.split(new RegExp(`${M}[ ]*{`));
      let u = `{${l[1]}`;
      a = l[0], u = this.interpolate(u, r);
      const c = u.match(/'/g), C = u.match(/"/g);
      (c && c.length % 2 === 0 && !C || C.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
      try {
        r = JSON.parse(u), s && (r = {
          ...s,
          ...r
        });
      } catch (N) {
        return this.logger.warn(`failed parsing options string in nesting for key ${a}`, N), `${a}${M}${u}`;
      }
      return delete r.defaultValue, a;
    }
    for (; A = this.nestingRegexp.exec(e); ) {
      let a = [];
      r = {
        ...o
      }, r = r.replace && typeof r.replace != "string" ? r.replace : r, r.applyPostProcessor = !1, delete r.defaultValue;
      let s = !1;
      if (A[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(A[1])) {
        const M = A[1].split(this.formatSeparator).map((l) => l.trim());
        A[1] = M.shift(), a = M, s = !0;
      }
      if (i = t(g.call(this, A[1].trim(), r), r), i && A[0] === e && typeof i != "string")
        return i;
      typeof i != "string" && (i = ue(i)), i || (this.logger.warn(`missed to resolve ${A[1]} for nesting ${e}`), i = ""), s && (i = a.reduce((M, l) => this.format(M, l, o.lng, {
        ...o,
        interpolationkey: A[1].trim()
      }), i.trim())), e = e.replace(A[0], i), this.regexp.lastIndex = 0;
    }
    return e;
  }
}
function ot(n) {
  let e = n.toLowerCase().trim();
  const t = {};
  if (n.indexOf("(") > -1) {
    const o = n.split("(");
    e = o[0].toLowerCase().trim();
    const A = o[1].substring(0, o[1].length - 1);
    e === "currency" && A.indexOf(":") < 0 ? t.currency || (t.currency = A.trim()) : e === "relativetime" && A.indexOf(":") < 0 ? t.range || (t.range = A.trim()) : A.split(";").forEach((r) => {
      if (!r)
        return;
      const [g, ...a] = r.split(":"), s = a.join(":").trim().replace(/^'+|'+$/g, "");
      t[g.trim()] || (t[g.trim()] = s), s === "false" && (t[g.trim()] = !1), s === "true" && (t[g.trim()] = !0), isNaN(s) || (t[g.trim()] = parseInt(s, 10));
    });
  }
  return {
    formatName: e,
    formatOptions: t
  };
}
function v(n) {
  const e = {};
  return function(o, A, i) {
    const r = A + JSON.stringify(i);
    let g = e[r];
    return g || (g = n($(A), i), e[r] = g), g(o);
  };
}
class nt {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = O.create("formatter"), this.options = e, this.formats = {
      number: v((t, o) => {
        const A = new Intl.NumberFormat(t, {
          ...o
        });
        return (i) => A.format(i);
      }),
      currency: v((t, o) => {
        const A = new Intl.NumberFormat(t, {
          ...o,
          style: "currency"
        });
        return (i) => A.format(i);
      }),
      datetime: v((t, o) => {
        const A = new Intl.DateTimeFormat(t, {
          ...o
        });
        return (i) => A.format(i);
      }),
      relativetime: v((t, o) => {
        const A = new Intl.RelativeTimeFormat(t, {
          ...o
        });
        return (i) => A.format(i, o.range || "day");
      }),
      list: v((t, o) => {
        const A = new Intl.ListFormat(t, {
          ...o
        });
        return (i) => A.format(i);
      })
    }, this.init(e);
  }
  init(e) {
    const o = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = o.formatSeparator ? o.formatSeparator : o.formatSeparator || ",";
  }
  add(e, t) {
    this.formats[e.toLowerCase().trim()] = t;
  }
  addCached(e, t) {
    this.formats[e.toLowerCase().trim()] = v(t);
  }
  format(e, t, o) {
    let A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((g, a) => {
      const {
        formatName: s,
        formatOptions: M
      } = ot(a);
      if (this.formats[s]) {
        let l = g;
        try {
          const u = A && A.formatParams && A.formatParams[A.interpolationkey] || {}, c = u.locale || u.lng || A.locale || A.lng || o;
          l = this.formats[s](g, c, {
            ...M,
            ...A,
            ...u
          });
        } catch (u) {
          this.logger.warn(u);
        }
        return l;
      } else
        this.logger.warn(`there was no format function for ${s}`);
      return g;
    }, e);
  }
}
function At(n, e) {
  n.pending[e] !== void 0 && (delete n.pending[e], n.pendingCount--);
}
class it extends H {
  constructor(e, t, o) {
    let A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = e, this.store = t, this.services = o, this.languageUtils = o.languageUtils, this.options = A, this.logger = O.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = A.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = A.maxRetries >= 0 ? A.maxRetries : 5, this.retryTimeout = A.retryTimeout >= 1 ? A.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(o, A.backend, A);
  }
  queueLoad(e, t, o, A) {
    const i = {}, r = {}, g = {}, a = {};
    return e.forEach((s) => {
      let M = !0;
      t.forEach((l) => {
        const u = `${s}|${l}`;
        !o.reload && this.store.hasResourceBundle(s, l) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? r[u] === void 0 && (r[u] = !0) : (this.state[u] = 1, M = !1, r[u] === void 0 && (r[u] = !0), i[u] === void 0 && (i[u] = !0), a[l] === void 0 && (a[l] = !0)));
      }), M || (g[s] = !0);
    }), (Object.keys(i).length || Object.keys(r).length) && this.queue.push({
      pending: r,
      pendingCount: Object.keys(r).length,
      loaded: {},
      errors: [],
      callback: A
    }), {
      toLoad: Object.keys(i),
      pending: Object.keys(r),
      toLoadLanguages: Object.keys(g),
      toLoadNamespaces: Object.keys(a)
    };
  }
  loaded(e, t, o) {
    const A = e.split("|"), i = A[0], r = A[1];
    t && this.emit("failedLoading", i, r, t), o && this.store.addResourceBundle(i, r, o), this.state[e] = t ? -1 : 2;
    const g = {};
    this.queue.forEach((a) => {
      Ge(a.loaded, [i], r), At(a, e), t && a.errors.push(t), a.pendingCount === 0 && !a.done && (Object.keys(a.loaded).forEach((s) => {
        g[s] || (g[s] = {});
        const M = a.loaded[s];
        M.length && M.forEach((l) => {
          g[s][l] === void 0 && (g[s][l] = !0);
        });
      }), a.done = !0, a.errors.length ? a.callback(a.errors) : a.callback());
    }), this.emit("loaded", g), this.queue = this.queue.filter((a) => !a.done);
  }
  read(e, t, o) {
    let A = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, r = arguments.length > 5 ? arguments[5] : void 0;
    if (!e.length)
      return r(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: e,
        ns: t,
        fcName: o,
        tried: A,
        wait: i,
        callback: r
      });
      return;
    }
    this.readingCalls++;
    const g = (s, M) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const l = this.waitingReads.shift();
        this.read(l.lng, l.ns, l.fcName, l.tried, l.wait, l.callback);
      }
      if (s && M && A < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, e, t, o, A + 1, i * 2, r);
        }, i);
        return;
      }
      r(s, M);
    }, a = this.backend[o].bind(this.backend);
    if (a.length === 2) {
      try {
        const s = a(e, t);
        s && typeof s.then == "function" ? s.then((M) => g(null, M)).catch(g) : g(null, s);
      } catch (s) {
        g(s);
      }
      return;
    }
    return a(e, t, g);
  }
  prepareLoading(e, t) {
    let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, A = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), A && A();
    typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
    const i = this.queueLoad(e, t, o, A);
    if (!i.toLoad.length)
      return i.pending.length || A(), null;
    i.toLoad.forEach((r) => {
      this.loadOne(r);
    });
  }
  load(e, t, o) {
    this.prepareLoading(e, t, {}, o);
  }
  reload(e, t, o) {
    this.prepareLoading(e, t, {
      reload: !0
    }, o);
  }
  loadOne(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const o = e.split("|"), A = o[0], i = o[1];
    this.read(A, i, "read", void 0, void 0, (r, g) => {
      r && this.logger.warn(`${t}loading namespace ${i} for language ${A} failed`, r), !r && g && this.logger.log(`${t}loaded namespace ${i} for language ${A}`, g), this.loaded(e, r, g);
    });
  }
  saveMissing(e, t, o, A, i) {
    let r = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, g = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
      this.logger.warn(`did not save key "${o}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(o == null || o === "")) {
      if (this.backend && this.backend.create) {
        const a = {
          ...r,
          isUpdate: i
        }, s = this.backend.create.bind(this.backend);
        if (s.length < 6)
          try {
            let M;
            s.length === 5 ? M = s(e, t, o, A, a) : M = s(e, t, o, A), M && typeof M.then == "function" ? M.then((l) => g(null, l)).catch(g) : g(null, M);
          } catch (M) {
            g(M);
          }
        else
          s(e, t, o, A, g, a);
      }
      !e || !e[0] || this.store.addResource(e[0], t, o, A);
    }
  }
}
function pe() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function(e) {
      let t = {};
      if (typeof e[1] == "object" && (t = e[1]), typeof e[1] == "string" && (t.defaultValue = e[1]), typeof e[2] == "string" && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
        const o = e[3] || e[2];
        Object.keys(o).forEach((A) => {
          t[A] = o[A];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (n, e, t, o) => n,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0
    }
  };
}
function me(n) {
  return typeof n.ns == "string" && (n.ns = [n.ns]), typeof n.fallbackLng == "string" && (n.fallbackLng = [n.fallbackLng]), typeof n.fallbackNS == "string" && (n.fallbackNS = [n.fallbackNS]), n.supportedLngs && n.supportedLngs.indexOf("cimode") < 0 && (n.supportedLngs = n.supportedLngs.concat(["cimode"])), n;
}
function R() {
}
function rt(n) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(n)).forEach((t) => {
    typeof n[t] == "function" && (n[t] = n[t].bind(n));
  });
}
class _ extends H {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = me(e), this.services = {}, this.logger = O, this.modules = {
      external: []
    }, rt(this), t && !this.isInitialized && !e.isClone) {
      if (!this.options.initImmediate)
        return this.init(e, t), this;
      setTimeout(() => {
        this.init(e, t);
      }, 0);
    }
  }
  init() {
    var e = this;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, o = arguments.length > 1 ? arguments[1] : void 0;
    typeof t == "function" && (o = t, t = {}), !t.defaultNS && t.defaultNS !== !1 && t.ns && (typeof t.ns == "string" ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
    const A = pe();
    this.options = {
      ...A,
      ...this.options,
      ...me(t)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...A.interpolation,
      ...this.options.interpolation
    }), t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator);
    function i(M) {
      return M ? typeof M == "function" ? new M() : M : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? O.init(i(this.modules.logger), this.options) : O.init(null, this.options);
      let M;
      this.modules.formatter ? M = this.modules.formatter : typeof Intl < "u" && (M = nt);
      const l = new ce(this.options);
      this.store = new le(this.options.resources, this.options);
      const u = this.services;
      u.logger = O, u.resourceStore = this.store, u.languageUtils = l, u.pluralResolver = new et(l, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), M && (!this.options.interpolation.format || this.options.interpolation.format === A.interpolation.format) && (u.formatter = i(M), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new tt(this.options), u.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, u.backendConnector = new it(i(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(c) {
        for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), p = 1; p < C; p++)
          N[p - 1] = arguments[p];
        e.emit(c, ...N);
      }), this.modules.languageDetector && (u.languageDetector = i(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = i(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new Z(this.services, this.options), this.translator.on("*", function(c) {
        for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), p = 1; p < C; p++)
          N[p - 1] = arguments[p];
        e.emit(c, ...N);
      }), this.modules.external.forEach((c) => {
        c.init && c.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, o || (o = R), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const M = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      M.length > 0 && M[0] !== "dev" && (this.options.lng = M[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((M) => {
      this[M] = function() {
        return e.store[M](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((M) => {
      this[M] = function() {
        return e.store[M](...arguments), e;
      };
    });
    const a = Y(), s = () => {
      const M = (l, u) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), a.resolve(u), o(l, u);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return M(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, M);
    };
    return this.options.resources || !this.options.initImmediate ? s() : setTimeout(s, 0), a;
  }
  loadResources(e) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : R;
    const A = typeof e == "string" ? e : this.language;
    if (typeof e == "function" && (o = e), !this.options.resources || this.options.partialBundledLanguages) {
      if (A && A.toLowerCase() === "cimode")
        return o();
      const i = [], r = (g) => {
        if (!g)
          return;
        this.services.languageUtils.toResolveHierarchy(g).forEach((s) => {
          i.indexOf(s) < 0 && i.push(s);
        });
      };
      A ? r(A) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((a) => r(a)), this.options.preload && this.options.preload.forEach((g) => r(g)), this.services.backendConnector.load(i, this.options.ns, (g) => {
        !g && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), o(g);
      });
    } else
      o(null);
  }
  reloadResources(e, t, o) {
    const A = Y();
    return e || (e = this.languages), t || (t = this.options.ns), o || (o = R), this.services.backendConnector.reload(e, t, (i) => {
      A.resolve(), o(i);
    }), A;
  }
  use(e) {
    if (!e)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!e.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && de.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this;
  }
  setResolvedLanguage(e) {
    if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const o = this.languages[t];
        if (!(["cimode", "dev"].indexOf(o) > -1) && this.store.hasLanguageSomeTranslations(o)) {
          this.resolvedLanguage = o;
          break;
        }
      }
  }
  changeLanguage(e, t) {
    var o = this;
    this.isLanguageChangingTo = e;
    const A = Y();
    this.emit("languageChanging", e);
    const i = (a) => {
      this.language = a, this.languages = this.services.languageUtils.toResolveHierarchy(a), this.resolvedLanguage = void 0, this.setResolvedLanguage(a);
    }, r = (a, s) => {
      s ? (i(s), this.translator.changeLanguage(s), this.isLanguageChangingTo = void 0, this.emit("languageChanged", s), this.logger.log("languageChanged", s)) : this.isLanguageChangingTo = void 0, A.resolve(function() {
        return o.t(...arguments);
      }), t && t(a, function() {
        return o.t(...arguments);
      });
    }, g = (a) => {
      !e && !a && this.services.languageDetector && (a = []);
      const s = typeof a == "string" ? a : this.services.languageUtils.getBestMatchFromCodes(a);
      s && (this.language || i(s), this.translator.language || this.translator.changeLanguage(s), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(s)), this.loadResources(s, (M) => {
        r(M, s);
      });
    };
    return !e && this.services.languageDetector && !this.services.languageDetector.async ? g(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(g) : this.services.languageDetector.detect(g) : g(e), A;
  }
  getFixedT(e, t, o) {
    var A = this;
    const i = function(r, g) {
      let a;
      if (typeof g != "object") {
        for (var s = arguments.length, M = new Array(s > 2 ? s - 2 : 0), l = 2; l < s; l++)
          M[l - 2] = arguments[l];
        a = A.options.overloadTranslationOptionHandler([r, g].concat(M));
      } else
        a = {
          ...g
        };
      a.lng = a.lng || i.lng, a.lngs = a.lngs || i.lngs, a.ns = a.ns || i.ns, a.keyPrefix = a.keyPrefix || o || i.keyPrefix;
      const u = A.options.keySeparator || ".";
      let c;
      return a.keyPrefix && Array.isArray(r) ? c = r.map((C) => `${a.keyPrefix}${u}${C}`) : c = a.keyPrefix ? `${a.keyPrefix}${u}${r}` : r, A.t(c, a);
    };
    return typeof e == "string" ? i.lng = e : i.lngs = e, i.ns = t, i.keyPrefix = o, i;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(e) {
    this.options.defaultNS = e;
  }
  hasLoadedNamespace(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const o = t.lng || this.resolvedLanguage || this.languages[0], A = this.options ? this.options.fallbackLng : !1, i = this.languages[this.languages.length - 1];
    if (o.toLowerCase() === "cimode")
      return !0;
    const r = (g, a) => {
      const s = this.services.backendConnector.state[`${g}|${a}`];
      return s === -1 || s === 2;
    };
    if (t.precheck) {
      const g = t.precheck(this, r);
      if (g !== void 0)
        return g;
    }
    return !!(this.hasResourceBundle(o, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || r(o, e) && (!A || r(i, e)));
  }
  loadNamespaces(e, t) {
    const o = Y();
    return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach((A) => {
      this.options.ns.indexOf(A) < 0 && this.options.ns.push(A);
    }), this.loadResources((A) => {
      o.resolve(), t && t(A);
    }), o) : (t && t(), Promise.resolve());
  }
  loadLanguages(e, t) {
    const o = Y();
    typeof e == "string" && (e = [e]);
    const A = this.options.preload || [], i = e.filter((r) => A.indexOf(r) < 0);
    return i.length ? (this.options.preload = A.concat(i), this.loadResources((r) => {
      o.resolve(), t && t(r);
    }), o) : (t && t(), Promise.resolve());
  }
  dir(e) {
    if (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !e)
      return "rtl";
    const t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], o = this.services && this.services.languageUtils || new ce(pe());
    return t.indexOf(o.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
    return new _(e, t);
  }
  cloneInstance() {
    let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : R;
    const o = e.forkResourceStore;
    o && delete e.forkResourceStore;
    const A = {
      ...this.options,
      ...e,
      isClone: !0
    }, i = new _(A);
    return (e.debug !== void 0 || e.prefix !== void 0) && (i.logger = i.logger.clone(e)), ["store", "services", "language"].forEach((g) => {
      i[g] = this[g];
    }), i.services = {
      ...this.services
    }, i.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, o && (i.store = new le(this.store.data, A), i.services.resourceStore = i.store), i.translator = new Z(i.services, A), i.translator.on("*", function(g) {
      for (var a = arguments.length, s = new Array(a > 1 ? a - 1 : 0), M = 1; M < a; M++)
        s[M - 1] = arguments[M];
      i.emit(g, ...s);
    }), i.init(A, t), i.translator.options = A, i.translator.backendConnector.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, i;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const z = _.createInstance();
z.createInstance = _.createInstance;
z.createInstance;
z.dir;
z.init;
z.loadResources;
z.reloadResources;
z.use;
z.changeLanguage;
z.getFixedT;
z.t;
z.exists;
z.setDefaultNamespace;
z.hasLoadedNamespace;
z.loadNamespaces;
z.loadLanguages;
const w = [];
function ze(n, e = W) {
  let t;
  const o = /* @__PURE__ */ new Set();
  function A(g) {
    if (Se(n, g) && (n = g, t)) {
      const a = !w.length;
      for (const s of o)
        s[1](), w.push(s, n);
      if (a) {
        for (let s = 0; s < w.length; s += 2)
          w[s][0](w[s + 1]);
        w.length = 0;
      }
    }
  }
  function i(g) {
    A(g(n));
  }
  function r(g, a = W) {
    const s = [g, a];
    return o.add(s), o.size === 1 && (t = e(A, i) || W), g(n), () => {
      o.delete(s), o.size === 0 && t && (t(), t = null);
    };
  }
  return { set: A, update: i, subscribe: r };
}
const ee = ze(!0);
class st {
  constructor(e) {
    this.i18n = this.createInstance(e), this.isLoading = this.createLoadingInstance(e);
  }
  createInstance(e) {
    const t = ze(e);
    return e.on("initialized", () => {
      t.set(e);
    }), e.on("loaded", () => {
      t.set(e);
    }), e.on("added", () => t.set(e)), e.on("languageChanged", () => {
      t.set(e);
    }), t;
  }
  createLoadingInstance(e) {
    return e.on("loaded", (t) => {
      Object.keys(t).length !== 0 && ee.set(!1);
    }), e.on("failedLoading", () => {
      ee.set(!0);
    }), ee;
  }
}
const gt = (n) => new st(n).i18n, at = {
  developer_service: "开发者服务",
  go_tap: "前往 TapTap 首页",
  store: "游戏商店",
  publish_game: "发布游戏",
  game_service: "游戏服务",
  develop_and_build: "开发与构建",
  operate_tool: "运营工具",
  revenue_tools: "营收与变现",
  commercialization: "商业化",
  ad: "推广平台",
  rep: "资源置换平台",
  cmp: "内容营销平台",
  community: "社区",
  tds_tutorials: "开发者学堂",
  developer_forum: "开发者论坛",
  developer_blog: "开发者博客",
  tds_document: "开发者文档",
  project_torch: "薪火计划",
  other: "其他",
  service_terms: "服务协议",
  privacy_policy: "隐私政策",
  copyright: "侵权投诉",
  tds_status: "服务状态",
  contact_or_follow_us: "联系或关注我们",
  cooperation_email: "商务合作：",
  operate_email: "运营邮箱：",
  qrcode: {
    follow: "关注{{content}}",
    tencent_wx: "微信公众号",
    tencent_video: "腾讯视频号",
    bili: "B站官方号",
    join: "加入 {{content}}",
    qq: "QQ 交流群"
  },
  company_name: "易玩（上海）网络科技有限公司",
  company_address: "公司地址：上海市静安区灵石路 718 号 B1 北楼",
  registered_address: "注册地址：上海市闵行区紫星路 588 号 2 幢 2122 室",
  ICP: "沪ICP备16012525号",
  web_number: "沪网文(2019)3544-255号",
  business_license: "经营许可证编号: 沪B2-20170322",
  network_security: "沪公网安备 31010402003255 号",
  sh_reporting_center: "上海互联网举报中心",
  report_harmful_information: "网上有害信息举报专区"
}, ut = {
  translation: at
}, Mt = {
  developer_service: "Developer Services",
  go_tap: "Go to TapTap",
  store: "Game Store",
  publish_game: "Publish Game",
  game_service: "Game Services",
  develop_and_build: "Develop & Build",
  operate_tool: "Operational Tools",
  revenue_tools: "Revenue & Monetization",
  commercialization: "Commercialization",
  ad: "Advertising",
  rep: "Resource Exchange",
  cmp: "Content Marketing",
  community: "Community",
  tds_tutorials: "Tutorials",
  developer_forum: "Group",
  developer_blog: "Blog",
  tds_document: "Documents",
  project_torch: "The Flame Plan",
  other: "Other",
  service_terms: "Service Terms",
  privacy_policy: "Privacy Policy",
  copyright: "Report Infringement",
  tds_status: "Service Status",
  contact_or_follow_us: "Contact or Follow Us",
  cooperation_email: "Business:",
  operate_email: "Operation:",
  qrcode: {
    follow: "Follow {{content}}",
    tencent_wx: "WeChat Official Account",
    tencent_video: "Tencent Video Account",
    bili: "Official Bilibili Account",
    join: "Join {{content}}",
    qq: "QQ Group"
  },
  company_name: "YiWan (Shanghai) Network Technology co., Ltd.",
  company_address: "Address: North Building B1, No.718 Ling Shi Road, Jing'an District, Shanghai",
  registered_address: "Registered Address: Room 2122, Building 2, Zi Xing Road, Min Hang District, Shanghai",
  ICP: "Shanghai ICP 16012525-1",
  web_number: "Shanghai NCOL (2019)3544-255",
  business_license: "Business License No.Shanghai B2-20170322",
  network_security: "Shanghai Public Network Security No.31010402003255.",
  sh_reporting_center: "Shanghai Internet Reporting Center.",
  report_harmful_information: "Online Harmful Information Reporting Center."
}, lt = {
  translation: Mt
};
var U = /* @__PURE__ */ ((n) => (n.zh_CN = "zh-Hans-CN", n.en = "en", n))(U || {});
z.init({
  lng: "zh-Hans-CN",
  debug: !0,
  resources: {
    en: lt,
    "zh-Hans-CN": ut
  }
});
const ie = gt(z), Ct = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjU2ODEgOC42Mzk0MkMxNS44MDI4IDguNjM5NDIgMTYuMDM0MyA4LjY1NjU5IDE2LjI2MzYgOC42ODE1MUMxNS42MzkgNS44MDMxNSAxMi41Mjg2IDMuNjY0MDYgOC45Nzg1NyAzLjY2NDA2QzUuMDA5MzYgMy42NjQwNiAxLjc1NzgxIDYuMzQxMzkgMS43NTc4MSA5Ljc0MDhDMS43NTc4MSAxMS43MDI3IDIuODM5ODEgMTMuMzE0MSA0LjY0NzIzIDE0LjU2MzlMMy45MjUxNSAxNi43MTM4TDYuNDQ5MSAxNS40NjA5QzcuMzUyODEgMTUuNjM3NiA4LjA3NzA3IDE1LjgxOTcgOC45Nzg1NyAxNS44MTk3QzkuMjA1MDUgMTUuODE5NyA5LjQyOTMgMTUuODA4NyA5LjY1MjQ3IDE1Ljc5MUM5LjUxMTI1IDE1LjMxMzcgOS40MjkzIDE0LjgxMzEgOS40MjkzIDE0LjI5NDJDOS40MjkzMiAxMS4xNzI4IDEyLjEzODIgOC42Mzk0MiAxNS41NjgxIDguNjM5NDJaTTExLjY4NjQgNi43MDE4OUMxMi4yMzAxIDYuNzAxODkgMTIuNTkgNy4wNTYyNyAxMi41OSA3LjU5Mzk3QzEyLjU5IDguMTI5NDMgMTIuMjMwMSA4LjQ4ODI1IDExLjY4NjQgOC40ODgyNUMxMS4xNDQ4IDguNDg4MjUgMTAuNjAyMSA4LjEyOTQzIDEwLjYwMjEgNy41OTM5N0MxMC42MDIxIDcuMDU2MjcgMTEuMTQ0OCA2LjcwMTg5IDExLjY4NjQgNi43MDE4OVpNNi42MzI5NCA4LjQ4ODIyQzYuMDkxMzYgOC40ODgyMiA1LjU0NTM3IDguMTI5NCA1LjU0NTM3IDcuNTkzOTRDNS41NDUzNyA3LjA1NjI1IDYuMDkxMzYgNi43MDE4NyA2LjYzMjk0IDYuNzAxODdDNy4xNzM5MiA2LjcwMTg3IDcuNTM0NDIgNy4wNTYyNSA3LjUzNDQyIDcuNTkzOTRDNy41MzQ0MiA4LjEyOTQzIDcuMTczOTIgOC40ODgyMiA2LjYzMjk0IDguNDg4MjJaTTIyLjE1ODcgMTQuMjA4NEMyMi4xNTg3IDExLjM1MTYgMTkuMjY5OCA5LjAyMzE2IDE2LjAyNTUgOS4wMjMxNkMxMi41OSA5LjAyMzE2IDkuODg0NDkgMTEuMzUxNiA5Ljg4NDQ5IDE0LjIwODRDOS44ODQ0OSAxNy4wNjkzIDEyLjU5IDE5LjM5MjggMTYuMDI1NSAxOS4zOTI4QzE2Ljc0NDIgMTkuMzkyOCAxNy40Njk2IDE5LjIxNDQgMTguMTkxNyAxOS4wMzUxTDIwLjE3MjUgMjAuMTA4MkwxOS42MjkyIDE4LjMyMjlDMjEuMDc4OSAxNy4yNDY1IDIyLjE1ODcgMTUuODE5NyAyMi4xNTg3IDE0LjIwODRaTTE0LjAzNDIgMTMuMzE0MUMxMy42NzQ5IDEzLjMxNDEgMTMuMzEyMSAxMi45NjAzIDEzLjMxMjEgMTIuNTk5MkMxMy4zMTIxIDEyLjI0MzIgMTMuNjc0OSAxMS44ODQ5IDE0LjAzNDIgMTEuODg0OUMxNC41ODAyIDExLjg4NDkgMTQuOTM3OSAxMi4yNDMyIDE0LjkzNzkgMTIuNTk5MkMxNC45Mzc5IDEyLjk2MDMgMTQuNTgwMiAxMy4zMTQxIDE0LjAzNDIgMTMuMzE0MVpNMTguMDA1NiAxMy4zMTQxQzE3LjY0OTEgMTMuMzE0MSAxNy4yODg2IDEyLjk2MDMgMTcuMjg4NiAxMi41OTkyQzE3LjI4ODYgMTIuMjQzMiAxNy42NDkxIDExLjg4NDkgMTguMDA1NiAxMS44ODQ5QzE4LjU0NzIgMTEuODg0OSAxOC45MDkzIDEyLjI0MzIgMTguOTA5MyAxMi41OTkyQzE4LjkwOTMgMTIuOTYwMyAxOC41NDcyIDEzLjMxNDEgMTguMDA1NiAxMy4zMTQxWiIgZmlsbD0iIzUyNTc1RCIvPgo8L3N2Zz4K", ct = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMSI+CiAgICAgICAgPGcgaWQ9IueZveiJsueJiDHlpIfku70tMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMzQuMDAwMDAwLCAtMjYxLjAwMDAwMCkiIGZpbGw9IiM1MjU3NUQiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NTkuMDAwMDAwLCAyNTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNzUuMDAwMDAwLCAwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSJjaGFubmVsIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IjAu5Zu+5qCHL+e6v+Weiy9pY29uc19vdXRsaW5lZF9jb2luIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzLjAwMDAwMCwgMy4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9IgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNMTUuMzQ3NTgsMS4xNTk4NTc4NyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzE2LjM3MjY1MTksMC43NDUxOTk2NSAxNy4yNDkwNDcxLDEuMTQyOTgwNiAxNy43MDU3NTQ1LDIuMjg2MjM3MDQgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMxOC45MzQ3NzI4LDUuMzYyMDU0NjIgMTYuMDU3OTAxMSwxNyAxMy44MDA4MjE1LDE3IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMTMuMDcwNTQzOSwxNyAxMi4zMzg2NzgzLDE2LjM5MjM0NzIgMTEuNDg2MDM3NCwxNS4zMDAxMDcxIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMTEuMTAxNzUzLDE0LjgwNzgzNTQgMTAuNzAwNjA3OSwxNC4yMjEwNDI1IDEwLjI4ODE3MTgsMTMuNTU4NzYzOSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzkuOTU4MjM0OTcsMTMuMDI4OTYwNSA5LjYzMzkxNzk3LDEyLjQ3MTkyNDEgOS4zMjIzNTExLDExLjkwODE4MzQgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEw5LjAwMDI0NDYzLDExLjMxNDc2MDQgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEw5LjAwMDI0NDYzLDExLjMxNDc2MDQgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEw4Ljk4NDcxMTQ4LDExLjM0Mjk2ODMgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEM4LjU4MTY3ODc4LDEyLjA5NzU0MDYgOC4xNTE3NTM4LDEyLjg1MjM1OTQgNy43MTE4MzgwOCwxMy41NTg3NjM5IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDNy4yOTk0MDE5MywxNC4yMjEwNDI1IDYuODk4MjU2ODQsMTQuODA3ODM1NCA2LjUxMzk3MjM5LDE1LjMwMDEwNzEgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEM1LjY2MTMzMTU0LDE2LjM5MjM0NzIgNC45Mjk0NjU5MSwxNyA0LjE5OTE4ODMzLDE3IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMS45NDIxMDg3NCwxNyAtMC45MzQ3NjI5NTMsNS4zNjIwNTQ2MiAwLjI5NDIzODQ2MSwyLjI4NjI3OTM4IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMC43NTA5NjI2ODYsMS4xNDI5ODA2IDEuNjI3MzU3OTcsMC43NDUxOTk2NSAyLjY1MjQyOTg1LDEuMTU5ODU3ODcgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMzLjM5NTY0NTQxLDEuNDYwNTAwNjMgNC4yMTU4OTU5OCwyLjE3OTM1MjAxIDUuMTMyNTE0MTEsMy4yNTYyMDY3NCAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzUuNjc3OTg3MjYsMy44OTcwMzU1OCA2LjI0ODYwMTA3LDQuNjU1OTA5ODYgNi44MzU5MTk4OCw1LjUwOTAxMzQzIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDNy40ODYyMDY3NCw2LjQ1MzU4MDU4IDguMTIzMzAxMzYsNy40NjM2Mzk0NSA4LjcyMTQwNzA0LDguNDczNDY5MzcgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEw5LjAwMDM0NjkxLDguOTQ4NzA4MzMgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEw5LjI3ODYwMjc5LDguNDczNDY5MzcgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEM5Ljc1NzA4NzM0LDcuNjY1NjA1NDQgMTAuMjYwNTI0OCw2Ljg1NzU5NDk3IDEwLjc3NTcwNzMsNi4wODMwODY5NiAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTDExLjE2NDA5LDUuNTA5MDEzNDMgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMxMS43NTE0MDg4LDQuNjU1OTA5ODYgMTIuMzIyMDIyNiwzLjg5NzAzNTU4IDEyLjg2NzQ5NTcsMy4yNTYyMDY3NCAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzEzLjc4NDExMzksMi4xNzkzNTIwMSAxNC42MDQzNjQ0LDEuNDYwNTAwNjMgMTUuMzQ3NTgsMS4xNTk4NTc4NyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWiAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTTIuMjI3MzY1MiwyLjE5MzQ1MTkyIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMS43OTQ0OTQ0NCwyLjAxODM0ODY3IDEuNTcxNDYxODcsMi4xMTk1NzkzNyAxLjM0MDYwMDUzLDIuNjk3NDg0OTcgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMwLjkzNzE4NTUyNSwzLjcwNzA5NjQgMS4xMDY1ODk0LDYuMjUxMjMzMDIgMS43MDQ2MzIxNiw5LjEwNjI0Mzg2IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMMS44NDQ1Mjc3Myw5Ljc0NTMxMDY1IEwxLjk5ODE4MzI3LDEwLjM5MTYyNzkgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMyLjc1MzA1MDE5LDEzLjQ0NTMyNjkgMy44MzkwODk1LDE1Ljg4MzczOSA0LjE5OTE4ODMzLDE1Ljg4MzczOSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzQuNDQ1NjU3MTksMTUuODgzNzM5IDQuOTgzNjYxMDQsMTUuNDM3MDQ1NyA1LjYyNDAxMzgsMTQuNjE2NzQ4MyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzUuOTgxMzE1MDcsMTQuMTU5MDQyNCA2LjM2MTA4ODE0LDEzLjYwMzUxMjMgNi43NTQyNDkwNSwxMi45NzIxODU0IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDNy4wNzMzNzk3MSwxMi40NTk3MzQyIDcuMzg4MzYyNCwxMS45MTg2ODEgNy42OTEzODM2NSwxMS4zNzAzNzMzIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMOC4wNTc3MDY3MiwxMC42OTM0MTcxIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMOC4wNTc3MDY3MiwxMC42OTM0MTcxIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMOC4zNjUwMjgzOCwxMC4xMDE1MDcyIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMOC4wNDM3MjM5Niw5LjUzODg2NjEgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEw3Ljc1MDk0MTgyLDkuMDM4ODQ5NjIgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEM3LjE2NDg0NzI5LDguMDQ5Mjk5MSA2LjU0MDgzMjczLDcuMDU5OTc3NTMgNS45MDY0MTE3OSw2LjEzODQ1NjI2IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDNS4zMzkxNDkxMSw1LjMxNDQ4NSA0Ljc5MDY0OTczLDQuNTg1MDIxMjcgNC4yNzI0ODY2MSwzLjk3NjI3NjYgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMzLjQ2NDQzOTkyLDMuMDI2OTczIDIuNzU4NTA3MTEsMi40MDgzMDc0NSAyLjIyNzM2NTIsMi4xOTM0NTE5MiAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWiAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTTE2LjY1OTM5MjQsMi42OTc0NDI2MyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzE2LjQyODU0OCwyLjExOTU3OTM3IDE2LjIwNTUxNTQsMi4wMTgzNDg2NyAxNS43NzI2NDQ2LDIuMTkzNDUxOTIgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMxNS4yNDE1MDI3LDIuNDA4MzA3NDUgMTQuNTM1NTY5OSwzLjAyNjk3MyAxMy43Mjc1MjMyLDMuOTc2Mjc2NiAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzEzLjIwOTM2MDEsNC41ODUwMjEyNyAxMi42NjA4NjA3LDUuMzE0NDg1IDEyLjA5MzU5OCw2LjEzODQ1NjI2IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMTEuNTg2MDYxMyw2Ljg3NTY3MzI3IDExLjA4NTE4NDYsNy42NTYyODI0OCAxMC42MDUwNTUsOC40NDU2ODczNSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTDEwLjA5ODg2NDgsOS4yOTM5MTM5OSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTDkuNjM0MDQzNTMsMTAuMTAxNTA3MiAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTDkuNzkzNDgwOTEsMTAuNDA5OTkzMyAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTDEwLjAwOTg4MTUsMTAuODIwNDM4IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMTAuNDAyMTE5OSwxMS41NTQ4MDA4IDEwLjgyMDI1MzIsMTIuMjg4OTE3MSAxMS4yNDU3NjA4LDEyLjk3MjE4NTQgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMxMS42Mzg5MjE3LDEzLjYwMzUxMjMgMTIuMDE4Njk0OCwxNC4xNTkwNDI0IDEyLjM3NTk5NiwxNC42MTY3NDgzIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMTMuMDE2MzQ4OCwxNS40MzcwNDU3IDEzLjU1NDM1MjYsMTUuODgzNzM5IDEzLjgwMDgyMTUsMTUuODgzNzM5IAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDMTQuMTYwOTIwMywxNS44ODM3MzkgMTUuMjQ2OTU5NiwxMy40NDUzMjY5IDE2LjAwMTgyNjYsMTAuMzkxNjI3OSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTDE2LjE1NTQ4MjEsOS43NDUzMTA2NCAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQzE2Ljg2NTE4MDUsNi42MzY1NjE4NiAxNy4wOTI3MDU4LDMuNzgxODc5NyAxNi42NTkzOTI0LDIuNjk3NDQyNjMgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFoKICAgICAgICAgICAgICAgICAgICAgICAgICAgICIgaWQ9IuW9oueKtiIgc3Ryb2tlPSIjNTI1NzVEIiBzdHJva2Utd2lkdGg9IjEiID48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==", Nt = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjcwNTkgMy44MjkxM0MxNy44MTIzIDMuOTM1NTMgMTcuODk2NyA0LjA2MTg2IDE3Ljk1NDMgNC4yMDA5QzE4LjAxMTkgNC4zMzk5NCAxOC4wNDE2IDQuNDg4OTYgMTguMDQxNiA0LjYzOTQ2QzE4LjA0MTYgNC43ODk5NiAxOC4wMTE5IDQuOTM4OTggMTcuOTU0MyA1LjA3ODAyQzE3Ljg5NjcgNS4yMTcwNiAxNy44MTIzIDUuMzQzMzkgMTcuNzA1OSA1LjQ0OTc5TDE2LjY1ODEgNi40OTY2M0gxNy43MzA2QzE4LjE4MjEgNi40OTY2MyAxOC42MjkyIDYuNTg1NTcgMTkuMDQ2MyA2Ljc1ODM4QzE5LjQ2MzQgNi45MzExOSAxOS44NDI0IDcuMTg0NDcgMjAuMTYxNiA3LjUwMzc3QzIwLjQ4MDggNy44MjMwNyAyMC43MzQgOC4yMDIxMiAyMC45MDY3IDguNjE5MjlDMjEuMDc5NCA5LjAzNjQ1IDIxLjE2ODIgOS40ODM1NSAyMS4xNjgxIDkuOTM1MDRWMTYuODFDMjEuMTY4MSAxNy43MjE3IDIwLjgwNTkgMTguNTk2MSAyMC4xNjEzIDE5LjI0MDdDMTkuNTE2NiAxOS44ODU0IDE4LjY0MjMgMjAuMjQ3NSAxNy43MzA2IDIwLjI0NzVINi4yNzIyOEM1LjM2MDYgMjAuMjQ3NSA0LjQ4NjI1IDE5Ljg4NTQgMy44NDE2IDE5LjI0MDdDMy4xOTY5NCAxOC41OTYxIDIuODM0NzggMTcuNzIxNyAyLjgzNDc4IDE2LjgxVjkuOTM1MDRDMi44MzQ3OCA5LjAyMzM2IDMuMTk2OTQgOC4xNDkwMiAzLjg0MTYgNy41MDQzNkM0LjQ4NjI1IDYuODU5NzEgNS4zNjA2IDYuNDk3NTQgNi4yNzIyOCA2LjQ5NzU0SDcuMzQxMTFMNi4yOTUxOSA1LjQ1MDcxQzYuMTg1NzMgNS4zNDUwNCA2LjA5ODQgNS4yMTg2MyA2LjAzODMxIDUuMDc4ODVDNS45NzgyMiA0LjkzOTA3IDUuOTQ2NTcgNC43ODg3MiA1Ljk0NTIgNC42MzY1OEM1Ljk0Mzg0IDQuNDg0NDQgNS45NzI3OCA0LjMzMzU1IDYuMDMwMzYgNC4xOTI3MUM2LjA4NzkzIDQuMDUxODggNi4xNzI5OCAzLjkyMzkyIDYuMjgwNTMgMy44MTYzQzYuMzg4MDkgMy43MDg2OSA2LjUxNiAzLjYyMzU3IDYuNjU2OCAzLjU2NTkyQzYuNzk3NiAzLjUwODI2IDYuOTQ4NDcgMy40NzkyMyA3LjEwMDYyIDMuNDgwNTFDNy4yNTI3NiAzLjQ4MTc5IDcuNDAzMTMgMy41MTMzNSA3LjU0Mjk0IDMuNTczMzdDNy42ODI3NSAzLjYzMzM4IDcuODA5MjEgMy43MjA2MyA3LjkxNDk0IDMuODMwMDRMMTAuMzQ1OSA2LjI2MTA0QzEwLjQxODQgNi4zMzM0NiAxMC40Nzg5IDYuNDEyMjkgMTAuNTI3NCA2LjQ5NjYzSDEzLjQ3MjdDMTMuNTIxMyA2LjQxMjI5IDEzLjU4MjcgNi4zMzE2MyAxMy42NTUxIDYuMjYwMTNMMTYuMDg1MiAzLjgyOTEzQzE2LjE5MTYgMy43MjI2OSAxNi4zMTc5IDMuNjM4MjcgMTYuNDU3IDMuNTgwNjZDMTYuNTk2IDMuNTIzMDYgMTYuNzQ1IDMuNDkzNDEgMTYuODk1NSAzLjQ5MzQxQzE3LjA0NiAzLjQ5MzQxIDE3LjE5NTEgMy41MjMwNiAxNy4zMzQxIDMuNTgwNjZDMTcuNDczMSAzLjYzODI3IDE3LjU5OTUgMy43MjI2OSAxNy43MDU5IDMuODI5MTNaTTE3LjczMDYgOC43OTc0Nkg2LjI3MjI4QzUuOTgzMDcgOC43OTczNSA1LjcwNDUxIDguOTA2NjEgNS40OTI1IDkuMTAzMzJDNS4yODA0OSA5LjMwMDAzIDUuMTUwNzEgOS41Njk2MyA1LjEyOTE5IDkuODU4MDRMNS4xMjY0NCA5Ljk0NDIxVjE2LjgxOTJDNS4xMjY0NCAxNy40MjMzIDUuNTkzOTQgMTcuOTE4MyA2LjE4NzAzIDE3Ljk2MTRMNi4yNzIyOCAxNy45NjVIMTcuNzMwNkMxOC4wMTk4IDE3Ljk2NTEgMTguMjk4NCAxNy44NTU5IDE4LjUxMDQgMTcuNjU5MkMxOC43MjI0IDE3LjQ2MjUgMTguODUyMiAxNy4xOTI5IDE4Ljg3MzcgMTYuOTA0NUwxOC44NzY0IDE2LjgxOTJWOS45NDQyMUMxOC44NzY0IDkuMzExNzEgMTguMzYzMSA4Ljc5ODM4IDE3LjczMDYgOC43OTgzOFY4Ljc5NzQ2Wk04LjU2Mzk0IDExLjA4OTFDOS4xOTY0NCAxMS4wODkxIDkuNzA5NzggMTEuNjAyNSA5LjcwOTc4IDEyLjIzNVYxMy4zODA4QzkuNzA5NzggMTMuNjg0NyA5LjU4OTA2IDEzLjk3NjEgOS4zNzQxNyAxNC4xOTFDOS4xNTkyOSAxNC40MDU5IDguODY3ODQgMTQuNTI2NiA4LjU2Mzk0IDE0LjUyNjZDOC4yNjAwNSAxNC41MjY2IDcuOTY4NiAxNC40MDU5IDcuNzUzNzIgMTQuMTkxQzcuNTM4ODMgMTMuOTc2MSA3LjQxODExIDEzLjY4NDcgNy40MTgxMSAxMy4zODA4VjEyLjIzNUM3LjQxODExIDExLjYwMjUgNy45MzE0NCAxMS4wODkxIDguNTYzOTQgMTEuMDg5MVpNMTUuNDM4OSAxMS4wODkxQzE2LjA3MTQgMTEuMDg5MSAxNi41ODQ4IDExLjYwMjUgMTYuNTg0OCAxMi4yMzVWMTMuMzgwOEMxNi41ODQ4IDEzLjY4NDcgMTYuNDY0MSAxMy45NzYxIDE2LjI0OTIgMTQuMTkxQzE2LjAzNDMgMTQuNDA1OSAxNS43NDI4IDE0LjUyNjYgMTUuNDM4OSAxNC41MjY2QzE1LjEzNSAxNC41MjY2IDE0Ljg0MzYgMTQuNDA1OSAxNC42Mjg3IDE0LjE5MUMxNC40MTM4IDEzLjk3NjEgMTQuMjkzMSAxMy42ODQ3IDE0LjI5MzEgMTMuMzgwOFYxMi4yMzVDMTQuMjkzMSAxMS42MDI1IDE0LjgwNjQgMTEuMDg5MSAxNS40Mzg5IDExLjA4OTFaIiBmaWxsPSIjNTI1NzVEIi8+Cjwvc3ZnPgo=", It = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE2MDNfMTgxMSkiPgo8cGF0aCBkPSJNMTkuMjQ5MSAxNy43ODEzQzE4Ljg0MzkgMTcuODMwMiAxNy42NzIgMTUuOTI3MSAxNy42NzIgMTUuOTI3MUMxNy42NzIgMTcuMDI5MSAxNy4xMDQ3IDE4LjQ2NyAxNS44NzcyIDE5LjUwNTVDMTYuNDY5MyAxOS42ODggMTcuODA1MyAyMC4xNzkzIDE3LjQ4NzUgMjAuNzE1NkMxNy4yMzAzIDIxLjE0OTYgMTMuMDc1IDIwLjk5MjcgMTEuODc1NCAyMC44NTc1QzEwLjY3NTggMjAuOTkyNyA2LjUyMDU2IDIxLjE0OTYgNi4yNjMzNiAyMC43MTU2QzUuOTQ1MzcgMjAuMTc5NSA3LjI4MDAxIDE5LjY4ODYgNy44NzI5MiAxOS41MDU3QzYuNjQ1MjYgMTguNDY3MiA2LjA3Nzg4IDE3LjAyOTEgNi4wNzc4OCAxNS45MjcxQzYuMDc3ODggMTUuOTI3MSA0LjkwNTk4IDE3LjgzMDIgNC41MDA4IDE3Ljc4MTNDNC4zMTIwMSAxNy43NTg0IDQuMDY0MDIgMTYuNzM5MSA0LjgyOTQxIDE0LjI3NjFDNS4xOTAxNSAxMy4xMTUxIDUuNjAyNjcgMTIuMTQ5OSA2LjI0MDcyIDEwLjU1NzNDNi4xMzMzMiA2LjQ0NzUzIDcuODMxMzMgMy4wMDAyMSAxMS44NzQ5IDNDMTUuODczNSAzLjAwMDIxIDE3LjYxMDkgNi4zNzk2OCAxNy41MDkyIDEwLjU1NzNDMTguMTQ2MiAxMi4xNDcyIDE4LjU2MDggMTMuMTE4NCAxOC45MjA1IDE0LjI3NjFDMTkuNjg1OCAxNi43MzkxIDE5LjQzNzkgMTcuNzU4NCAxOS4yNDkxIDE3Ljc4MTNaIiBmaWxsPSIjNTI1NzVEIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTYwM18xODExIj4KPHJlY3Qgd2lkdGg9IjE1Ljc1IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCAzKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=", De = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzciIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCA3NyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1ODRfMTg2OTk1KSI+CjxwYXRoIGQ9Ik0yNS41Njg0IDIuOTM0NTdIMjkuNjUzOUMzMC42Mzg3IDIuOTM0NTcgMzEuNDcxNyAzLjA4MzczIDMyLjE1MzIgMy4zODIwNkMzMi43ODA2IDMuNjM4MTMgMzMuMzEzMyA0LjA3Mjc1IDMzLjY4MTIgNC42Mjg2M0MzNC4wMjU1IDUuMTc3NzggMzQuMjAyIDUuODEwNjUgMzQuMTkgNi40NTM0NkMzNC4xOTc2IDcuMDk5MjEgMzQuMDE0MiA3LjczMzUzIDMzLjY2MTcgOC4yODExOUMzMy4yNjg1IDguODU5NzMgMzIuNzA2MiA5LjMxMTAyIDMyLjA0NjkgOS41NzcxNkMzMS4zMjQ2IDkuODk2NzkgMzAuNDI5MiAxMC4wNTYxIDI5LjM2MDYgMTAuMDU1MkgyNS41Njg0VjIuOTM0NTdaTTI5LjMxODcgOC4yNDM0MUMyOS45ODIyIDguMjQzNDEgMzAuNDkyIDguMDgyNjMgMzAuODQ4MiA3Ljc2MTA1QzMxLjAyODggNy41OTEwMiAzMS4xNjk5IDcuMzg1NDkgMzEuMjYyIDcuMTU4MjNDMzEuMzU0MiA2LjkzMDk2IDMxLjM5NTIgNi42ODcyMSAzMS4zODI1IDYuNDQzMjlDMzEuMzkzNiA2LjIxNjg3IDMxLjM1NzEgNS45OTA2MiAzMS4yNzUzIDUuNzc4MzFDMzEuMTkzNSA1LjU2NiAzMS4wNjggNS4zNzIwOCAzMC45MDY2IDUuMjA4MzNDMzAuNTg3MyA0LjkwMDMyIDMwLjEwNjkgNC43NDU4MyAyOS40NjU0IDQuNzQ0ODZIMjguMTg3M1Y4LjI0MzQxSDI5LjMxODdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDAuMzA4MyAxMC4wNDM2QzM5Ljc2OTMgOS45MTI1MSAzOS4yNTM3IDkuNzAzMzggMzguNzc4OCA5LjQyMzI1VjcuNzM1QzM5LjE5MzQgOC4wMjc3NSAzOS42NjAyIDguMjQzNSA0MC4xNTU2IDguMzcxMzZDNDAuNjk3NiA4LjUzMTkgNDEuMjYwNiA4LjYxNTU4IDQxLjgyNzMgOC42MTk4MUM0Mi4wMjI4IDguNjI5OTQgNDIuMjE4MiA4LjU5NzE3IDQyLjM5OSA4LjUyMzkyQzQyLjUyNzcgOC40NTk5OSA0Mi41OTIgOC4zNzg2MyA0Mi41OTIgOC4yOTQzNkM0Mi41OTM0IDguMjQ3MjggNDIuNTg0OCA4LjIwMDQyIDQyLjU2NjggOC4xNTY2OUM0Mi41NDg4IDguMTEyOTYgNDIuNTIxNyA4LjA3MzI4IDQyLjQ4NzMgOC4wNDAxMUM0Mi4zNjc3IDcuOTUwODUgNDIuMjI3NCA3Ljg5MTQ4IDQyLjA3ODcgNy44NjcyMUw0MC44MjE2IDcuNTkyNjJDNDAuMTAxMyA3LjQyOTg5IDM5LjU4OTkgNy4yMDQ3IDM5LjI4NzYgNi45MTcwM0MzOS4xMzU5IDYuNzY4NDMgMzkuMDE3NiA2LjU5MDgyIDM4Ljk0MDMgNi4zOTU0OEMzOC44NjMgNi4yMDAxNSAzOC44Mjg0IDUuOTkxMzQgMzguODM4NyA1Ljc4MjMyQzM4LjgzMzYgNS40MDM1MSAzOC45NzU4IDUuMDM2NzYgMzkuMjM2OCA0Ljc1NTEzQzM5LjU0NjIgNC40MzczNSAzOS45MzY0IDQuMjA0MzMgNDAuMzY4MSA0LjA3OTU0QzQwLjkyMzcgMy45MTAwMSA0MS41MDM5IDMuODI5MDUgNDIuMDg2MiAzLjgzOTgxQzQyLjYyOTcgMy44MzQ4NiA0My4xNzE4IDMuODk2MzYgNDMuNjk5NSA0LjAyMjg4QzQ0LjEyNTcgNC4xMjA5MiA0NC41MzUgNC4yNzg1MSA0NC45MTQ3IDQuNDkwNzFWNi4wODg4OEM0NC41NTg3IDUuODg4MzcgNDQuMTc2IDUuNzM2MzMgNDMuNzc3MyA1LjYzNzAzQzQzLjM0NTMgNS41MjQ2IDQyLjkgNS40Njc5MyA0Mi40NTI4IDUuNDY4NUM0MS43OTY0IDUuNDY4NSA0MS40NjgxIDUuNTc2OTggNDEuNDY4MSA1Ljc5Mzk1QzQxLjQ2NyA1Ljg0MjI2IDQxLjQ4MDYgNS44ODk4MSA0MS41MDczIDUuOTMwNjVDNDEuNTMzOSA1Ljk3MTQ4IDQxLjU3MjMgNi4wMDM3OCA0MS42MTc4IDYuMDIzNUM0MS43OTcxIDYuMDk3NTQgNDEuOTg1MSA2LjE1MDIyIDQyLjE3NzUgNi4xODA0MUw0My4yMjUxIDYuMzYzNDhDNDMuOTA1NSA2LjQ3OTcxIDQ0LjQxMjggNi42ODMxMSA0NC43NDcxIDYuOTczNjlDNDUuMDgxMyA3LjI2NDI2IDQ1LjI0ODkgNy42ODk0OCA0NS4yNDk5IDguMjQ5MzJDNDUuMjU1MiA4LjU0MzcxIDQ1LjE4MTEgOC44MzQzMyA0NS4wMzQ4IDkuMDkyMjdDNDQuODg4NiA5LjM1MDIyIDQ0LjY3NTQgOS41NjY1MSA0NC40MTYzIDkuNzE5NjRDNDMuODY0NiAxMC4wNzkgNDMuMDc2OSAxMC4yNTgyIDQyLjA1MzMgMTAuMjU3MkM0MS40NjQ2IDEwLjI1ODEgNDAuODc4MyAxMC4xODYzIDQwLjMwODMgMTAuMDQzNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00Ny43MjQ3IDkuODI5NzVDNDcuMTY0NyA5LjU3OTkyIDQ2LjY5MjYgOS4xNzU3MiA0Ni4zNjc0IDguNjY3NDRDNDYuMDY0IDguMTY5IDQ1LjkwODYgNy41OTg3NiA0NS45MTg0IDcuMDE5ODdDNDUuOTA5NCA2LjQ0MTMzIDQ2LjA3MzEgNS44NzI2MiA0Ni4zODk4IDUuMzgyNDdDNDYuNzI3NCA0Ljg4MjE4IDQ3LjIwOCA0LjQ4ODM0IDQ3Ljc3MjYgNC4yNDkyMkM0OC40NTkyIDMuOTU4NzkgNDkuMjAzIDMuODE3OTUgNDkuOTUxNiAzLjgzNjZDNTAuOTk5MiAzLjgzNjYgNTEuODY4NyA0LjA1MDE3IDUyLjU2MDEgNC40NzczMlY2LjM0MTM3QzUyLjI5NzEgNi4xNjk3MSA1Mi4wMDk3IDYuMDM2MDkgNTEuNzA3MSA1Ljk0NDczQzUxLjM2ODMgNS44NDA5IDUxLjAxNDggNS43ODk0MiA1MC42NTk1IDUuNzkyMThDNTAuMDEgNS43OTIxOCA0OS41MDE3IDUuOTA3NDQgNDkuMTM0NSA2LjEzNzk3QzQ4Ljk2OTUgNi4yMjczOSA0OC44MzE3IDYuMzU3NjcgNDguNzM1NCA2LjUxNTUzQzQ4LjYzOTEgNi42NzM0IDQ4LjU4NzUgNi44NTMyMiA0OC41ODYgNy4wMzY3MUM0OC41ODQ1IDcuMjIwMiA0OC42MzMgNy40MDA4MSA0OC43MjY3IDcuNTYwMTZDNDguODIwNSA3LjcxOTUxIDQ4Ljk1NiA3Ljg1MTkxIDQ5LjExOTUgNy45NDM5QzQ5LjQ3NTcgOC4xNzczMyA0OS45OTI1IDguMjk0MDUgNTAuNjcgOC4yOTQwNUM1MS4wMTk2IDguMjk0ODYgNTEuMzY3NSA4LjI0NTkxIDUxLjcwMjYgOC4xNDg3NkM1Mi4wMDgyIDguMDYzNjkgNTIuMzAxNyA3Ljk0MjE3IDUyLjU3NjYgNy43ODY5OVY5LjU4ODU3QzUxLjc2NjggMTAuMDQ2OSA1MC44NDI0IDEwLjI3OTIgNDkuOTA1MiAxMC4yNTk4QzQ5LjE1NDEgMTAuMjc5NyA0OC40MDgzIDEwLjEzMjYgNDcuNzI0NyA5LjgyOTc1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTU1LjE2ODggOS44MzA2NEM1NC42MDI0IDkuNTc5NTcgNTQuMTIyIDkuMTc2MjIgNTMuNzg0NSA4LjY2ODMzQzUzLjQ2NjMgOC4xNzEwNiA1My4zMDEyIDcuNTk1OSA1My4zMDg1IDcuMDEwNThDNTMuMjk4NCA2LjQzMjIgNTMuNDYzOSA1Ljg2MzcyIDUzLjc4NDUgNS4zNzYwOUM1NC4xMjM4IDQuODgxMTEgNTQuNjAyMSA0LjQ5MDg3IDU1LjE2MjggNC4yNTE1NkM1Ni41NCAzLjcwOTEyIDU4LjA4MDcgMy43MDkxMiA1OS40NTc5IDQuMjUxNTZDNjAuMDE2MyA0LjQ4OTA1IDYwLjQ5MjcgNC44NzczNyA2MC44MzAyIDUuMzcwMjhDNjEuMTQ4NiA1Ljg1OTcxIDYxLjMxMjUgNi40Mjg5MSA2MS4zMDE2IDcuMDA3NjhDNjEuMzA5MSA3LjU5MjQxIDYxLjE0NTYgOC4xNjcyMSA2MC44MzAyIDguNjY1NDJDNjAuNDk2MyA5LjE3MzY2IDYwLjAxODIgOS41NzczMSA1OS40NTM0IDkuODI3NzNDNTguNzc2NSAxMC4xMDk2IDU4LjA0NzYgMTAuMjU0OSA1Ny4zMTExIDEwLjI1NDlDNTYuNTc0NSAxMC4yNTQ5IDU1Ljg0NTcgMTAuMTA5NiA1NS4xNjg4IDkuODI3NzNWOS44MzA2NFpNNTguMzUxOSA4LjAyNjE1QzU4LjQ4MTQgNy44OTY0MyA1OC41ODIxIDcuNzQyMzkgNTguNjQ4IDcuNTczNUM1OC43MTM5IDcuNDA0NiA1OC43NDM1IDcuMjI0NDEgNTguNzM1IDcuMDQ0QzU4Ljc0NDEgNi44NjUyNyA1OC43MTQ3IDYuNjg2NjcgNTguNjQ4NyA2LjUxOTU4QzU4LjU4MjggNi4zNTI0OCA1OC40ODE3IDYuMjAwNTYgNTguMzUxOSA2LjA3MzQ3QzU4LjIxMTIgNS45NDgxNCA1OC4wNDU5IDUuODUxNTQgNTcuODY1OSA1Ljc4OTRDNTcuNjg2IDUuNzI3MjUgNTcuNDk1IDUuNzAwODMgNTcuMzA0MyA1LjcxMTcxQzU3LjExMzggNS43MDE5OCA1Ni45MjMxIDUuNzI4OTMgNTYuNzQzMyA1Ljc5MTAyQzU2LjU2MzUgNS44NTMxIDU2LjM5ODIgNS45NDkxIDU2LjI1NjggNi4wNzM0N0M1Ni4xMjc1IDYuMjAwODQgNTYuMDI2OCA2LjM1Mjg1IDU1Ljk2MTEgNi41MTk5QzU1Ljg5NTQgNi42ODY5NSA1NS44NjYyIDYuODY1NDEgNTUuODc1MSA3LjA0NEM1NS44NjY3IDcuMjI0MjggNTUuODk2MiA3LjQwNDM0IDU1Ljk2MTkgNy41NzMxOUM1Ni4wMjc1IDcuNzQyMDQgNTYuMTI3OCA3Ljg5NjE2IDU2LjI1NjggOC4wMjYxNUM1Ni4zOTY4IDguMTUzMDQgNTYuNTYxNyA4LjI1MTI0IDU2Ljc0MTcgOC4zMTQ4OUM1Ni45MjE3IDguMzc4NTQgNTcuMTEzIDguNDA2MzUgNTcuMzA0MyA4LjM5NjY0QzU3LjQ5NTcgOC40MDc0NSA1Ny42ODc0IDguMzgwMTYgNTcuODY3NSA4LjMxNjQ1QzU4LjA0NzcgOC4yNTI3NCA1OC4yMTI1IDguMTUzOTUgNTguMzUxOSA4LjAyNjE1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTY3LjU5NzUgNC4yMTM1MlY2LjQxMzE5QzY3LjI4NDggNi4yMzIwMSA2Ni45MjQzIDYuMTQzNjIgNjYuNTYwNCA2LjE1ODkzQzY2LjAwMjIgNi4xNTg5MyA2NS41NzEyIDYuMzI0NTYgNjUuMjcxOSA2LjY1MjkxQzY0Ljk3MjYgNi45ODEyNyA2NC44MjI5IDcuNDkxMjMgNjQuODIyOSA4LjE4MjhWMTAuMDU0MUg2Mi4yNTYzVjQuMTA0NTVINjQuNzcwNVY1Ljk5MzNDNjQuOTEwMiA1LjMwMTczIDY1LjEzNTcgNC43OTE3NyA2NS40NDcgNC40NjM0MkM2NS41OTc5IDQuMzAxOTUgNjUuNzgzMSA0LjE3NDE4IDY1Ljk4OTggNC4wODg5QzY2LjE5NjUgNC4wMDM2MiA2Ni40MTk4IDMuOTYyODYgNjYuNjQ0MiAzLjk2OTQ0QzY2Ljk3OTUgMy45NjA1NiA2Ny4zMTA0IDQuMDQ1MjcgNjcuNTk3NSA0LjIxMzUyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTc2LjEyNSAyLjczMTQ1VjEwLjA1NEg3My41NTg0VjguNzE3MzNDNzMuMzY0OSA5LjE5MzE5IDczLjAxNzIgOS41OTUwMyA3Mi41Njc3IDkuODYyMjFDNzIuMDcxNiAxMC4xMzY2IDcxLjUwNzMgMTAuMjczMyA3MC45MzY1IDEwLjI1NzRDNzAuMzk5NCAxMC4yNjk1IDY5Ljg3MDYgMTAuMTI2NCA2OS40MTc1IDkuODQ2MjJDNjguOTc4NiA5LjU2OTQ2IDY4LjYyOSA5LjE3ODIgNjguNDA4OCA4LjcxNzMzQzY4LjE2ODUgOC4yMDg2MSA2OC4wNDg4IDcuNjU0MDQgNjguMDU4NiA3LjA5NDQ2QzY4LjA0MTcgNi41MTQyOCA2OC4xNjkgNS45Mzg2OCA2OC40Mjk4IDUuNDE2MzhDNjguNjY5NCA0LjkzNzk4IDY5LjA0MzUgNC41MzUwNiA2OS41MDg4IDQuMjU0MDdDNjkuOTg3MSAzLjk3Mjc1IDcwLjUzNzUgMy44MjgyMiA3MS4wOTY2IDMuODM3MDlDNzIuMzE3OCAzLjgzNzA5IDczLjEzODQgNC4zNTIzOCA3My41NTg0IDUuMzgyOTZWMi43MzE0NUg3Ni4xMjVaTTczLjE4MTMgNy45OTA4OUM3My4zMTIxIDcuODY1OSA3My40MTQ3IDcuNzE1ODIgNzMuNDgyNCA3LjU1MDIzQzczLjU1MDIgNy4zODQ2MyA3My41ODE3IDcuMjA3MTQgNzMuNTc0OSA3LjAyOTA4QzczLjU4MDUgNi44NTYzNSA3My41NDgzIDYuNjg0NDQgNzMuNDgwNCA2LjUyNDY3QzczLjQxMjYgNi4zNjQ4OSA3My4zMTA2IDYuMjIwODkgNzMuMTgxMyA2LjEwMjE0QzcyLjg4NzcgNS44NzAwNSA3Mi41MjA2IDUuNzQzMzMgNzIuMTQyIDUuNzQzMzNDNzEuNzYzMyA1Ljc0MzMzIDcxLjM5NjIgNS44NzAwNSA3MS4xMDI2IDYuMTAyMTRDNzAuOTczNiA2LjIyMzYyIDcwLjg3MjQgNi4zNzAxMSA3MC44MDU3IDYuNTMyMDdDNzAuNzM4OSA2LjY5NDAzIDcwLjcwOCA2Ljg2NzgzIDcwLjcxNSA3LjA0MjE2QzcwLjcwODQgNy4yMTgxMiA3MC43Mzk5IDcuMzkzNDYgNzAuODA3NSA3LjU1Njg3QzcwLjg3NSA3LjcyMDI5IDcwLjk3NzEgNy44NjgxNCA3MS4xMDcxIDcuOTkwODlDNzEuMjQ0NiA4LjExNDk3IDcxLjQwNjIgOC4yMTExNSA3MS41ODI1IDguMjczNzdDNzEuNzU4OCA4LjMzNjM5IDcxLjk0NjIgOC4zNjQyIDcyLjEzMzcgOC4zNTU1NkM3Mi4zMjQ2IDguMzY1OCA3Mi41MTU2IDguMzM4OCA3Mi42OTU1IDguMjc2MTdDNzIuODc1NSA4LjIxMzUzIDczLjA0MDYgOC4xMTY1MyA3My4xODEzIDcuOTkwODlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYuMTE3OCAxLjE3MjQ4QzE0Ljg2NzcgMC42MTY4NDggMTMuNTQ4IDAuMjIyNjY2IDEyLjE5MjQgMEMxMi4wMDY5IDAuMzIxOTQyIDExLjgzOSAwLjY1MzE3OCAxMS42ODk1IDAuOTkyMzJDMTAuMjQ1NSAwLjc4MTA3NCA4Ljc3NzA4IDAuNzgxMDc0IDcuMzMzMDggMC45OTIzMkM3LjE4MzUxIDAuNjUzMjEzIDcuMDE1NjcgMC4zMjE5ODEgNi44MzAyNCAwQzUuNDczNzUgMC4yMjQ1NDYgNC4xNTMxNiAwLjYxOTY2NCAyLjkwMTggMS4xNzUzOEMwLjQxNzUyMyA0Ljc0MzY3IC0wLjI1NTkyNCA4LjIyMzMzIDAuMDgwNzk5MyAxMS42NTM2QzEuNTM1NjUgMTIuNjk3MSAzLjE2NDA1IDEzLjQ5MDggNC44OTUyIDE0QzUuMjg1IDEzLjQ5MSA1LjYyOTkzIDEyLjk1MTEgNS45MjYzMiAxMi4zODU4QzUuMzYzMzcgMTIuMTgxNyA0LjgyMDAyIDExLjkyOTkgNC4zMDI1NyAxMS42MzMzQzQuNDM4NzUgMTEuNTM3NCA0LjU3MTk1IDExLjQzODYgNC43MDA2NSAxMS4zNDI3QzYuMjA2MzIgMTIuMDMwMSA3Ljg0OTY5IDEyLjM4NjUgOS41MTM1NSAxMi4zODY1QzExLjE3NzQgMTIuMzg2NSAxMi44MjA4IDEyLjAzMDEgMTQuMzI2NSAxMS4zNDI3QzE0LjQ1NjcgMTEuNDQ1OCAxNC41ODk4IDExLjU0NDYgMTQuNzI0NSAxMS42MzMzQzE0LjIwNjEgMTEuOTMwNCAxMy42NjE3IDEyLjE4MjcgMTMuMDk3OCAxMi4zODczQzEzLjM5MzggMTIuOTUyMyAxMy43Mzg4IDEzLjQ5MTggMTQuMTI4OSAxNEMxNS44NjE1IDEzLjQ5MjggMTcuNDkxMiAxMi42OTk2IDE4Ljk0NjMgMTEuNjU1QzE5LjM0MTQgNy42NzcwNCAxOC4yNzE0IDQuMjI5MzUgMTYuMTE3OCAxLjE3MjQ4Wk02LjM1Mjg0IDkuNTQ0QzUuNDE0NSA5LjU0NCA0LjYzOTI5IDguNzE3MzEgNC42MzkyOSA3LjcwMDI5QzQuNjM5MjkgNi42ODMyNyA1LjM4NzU2IDUuODQ5MzEgNi4zNDk4NSA1Ljg0OTMxQzcuMzEyMTMgNS44NDkzMSA4LjA4MTM1IDYuNjgzMjcgOC4wNjQ4OSA3LjcwMDI5QzguMDQ4NDMgOC43MTczMSA3LjMwOTEzIDkuNTQ0IDYuMzUyODQgOS41NDRaTTEyLjY3NDMgOS41NDRDMTEuNzM0NCA5LjU0NCAxMC45NjIyIDguNzE3MzEgMTAuOTYyMiA3LjcwMDI5QzEwLjk2MjIgNi42ODMyNyAxMS43MTA1IDUuODQ5MzEgMTIuNjc0MyA1Ljg0OTMxQzEzLjYzOCA1Ljg0OTMxIDE0LjQwMTMgNi42ODMyNyAxNC4zODQ4IDcuNzAwMjlDMTQuMzY4NCA4LjcxNzMxIDEzLjYzMDYgOS41NDQgMTIuNjc0MyA5LjU0NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zNi4zNTQzIDQuNzM3NDlDMzcuMDYwOSA0LjczNzQ5IDM3LjYzMzggNC4yMzc5MiAzNy42MzM4IDMuNjIxNjhDMzcuNjMzOCAzLjAwNTQzIDM3LjA2MDkgMi41MDU4NiAzNi4zNTQzIDIuNTA1ODZDMzUuNjQ3NiAyLjUwNTg2IDM1LjA3NDcgMy4wMDU0MyAzNS4wNzQ3IDMuNjIxNjhDMzUuMDc0NyA0LjIzNzkyIDM1LjY0NzYgNC43Mzc0OSAzNi4zNTQzIDQuNzM3NDlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzUuMDczMiA1LjUwNjg0QzM1LjQ3ODYgNS42NzIyMiAzNS45MTM5IDUuNzU3NDEgMzYuMzUzNSA1Ljc1NzQxQzM2Ljc5MzIgNS43NTc0MSAzNy4yMjg1IDUuNjcyMjIgMzcuNjMzOCA1LjUwNjg0VjEwLjA4NjNIMzUuMDczMlY1LjUwNjg0WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNTg0XzE4Njk5NSI+CjxyZWN0IHdpZHRoPSI3Ni4xMjUiIGhlaWdodD0iMTQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
const pt = {
  code: ".qrcode-group.svelte-1p50smn.svelte-1p50smn{display:flex;flex-wrap:wrap}.qrcode-group-item-wrap.svelte-1p50smn.svelte-1p50smn{position:relative}.qrcode-group-item-wrap.svelte-1p50smn+.qrcode-group-item-wrap.svelte-1p50smn{margin-left:12px}.qrcode-group-item-wrap.svelte-1p50smn .popover.svelte-1p50smn{visibility:hidden;position:absolute;width:132px;bottom:42px;left:50%;transform:translateX(-50%) scale(0.6);background-color:#fff;padding:8px;border-radius:4px;text-align:center;opacity:0;transition:visibility 0s, all 0.3s ease;transform-origin:bottom center}.qrcode-group-item-wrap.svelte-1p50smn .popover.svelte-1p50smn::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#fff}.qrcode-group-item-wrap.svelte-1p50smn .popover-img.svelte-1p50smn{width:120px;height:120px}.qrcode-group-item-wrap.svelte-1p50smn .popover-text.svelte-1p50smn{margin-top:4px;font-size:14px;line-height:22px;color:#1D2127}.qrcode-group-item-wrap.svelte-1p50smn:hover .popover.svelte-1p50smn{visibility:visible;opacity:1;transform:translateX(-50%) scale(1)}.qrcode-group-item.svelte-1p50smn.svelte-1p50smn{width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;background-color:#FAFAFA;cursor:pointer}.qrcode-group-item.svelte-1p50smn.svelte-1p50smn:hover{background-color:#FFFFFF}.qrcode-group-item__icon.svelte-1p50smn.svelte-1p50smn{width:24px;height:24px}.qrcode-group-column.svelte-1p50smn.svelte-1p50smn{display:flex;flex-direction:column;align-items:center}.qrcode-group-column.svelte-1p50smn+.qrcode-group-column.svelte-1p50smn{margin-left:24px}.qrcode-group-column__img.svelte-1p50smn.svelte-1p50smn{width:64px;height:64px;border-radius:4px}.qrcode-group-column__text.svelte-1p50smn.svelte-1p50smn{margin-top:12px;font-size:12px;line-height:18px;color:#B9BEC1}.qrcode-group-discord.svelte-1p50smn.svelte-1p50smn{width:96px;height:32px;margin-left:12px;display:flex;align-items:center;justify-content:center;background-color:#5865f2;border-radius:100px;transition:background-color 0.3s}.qrcode-group-discord__logo.svelte-1p50smn.svelte-1p50smn{height:14px}.qrcode-group-discord.svelte-1p50smn.svelte-1p50smn:hover{background-color:#7480fc}.qrcode-group-wrap.svelte-1p50smn.svelte-1p50smn{width:100%;margin-top:16px}.qrcode-group-wrap.svelte-1p50smn .qrcode-group-discord.svelte-1p50smn{margin-left:0}@media(max-width: 1013px){.qrcode-group-item-wrap.svelte-1p50smn+.qrcode-group-item-wrap.svelte-1p50smn{margin-left:8px}.qrcode-group-discord.svelte-1p50smn.svelte-1p50smn{margin-left:8px}}@media(max-width: 767px){.qrcode-group-en.svelte-1p50smn .qrcode-group-column.svelte-1p50smn{width:140px;margin:0 24px 16px 0}.qrcode-group-en.svelte-1p50smn .qrcode-group-wrap.svelte-1p50smn{margin-bottom:16px}}",
  map: `{"version":3,"file":"QrcodeGroup.svelte","sources":["QrcodeGroup.svelte"],"sourcesContent":["<script lang=\\"ts\\">import wxImg from '../assets/qrcode-wx.png';\\nimport wsImg from '../assets/qrcode-ws.png';\\nimport biliImg from '../assets/qrcode-bilibili.png';\\nimport qqImg from '../assets/qrcode-qq.png';\\nimport wxIconImg from '../assets/icon-wx.svg';\\nimport wsIconImg from '../assets/icon-ws.svg';\\nimport biliIconImg from '../assets/icon-bilibili.svg';\\nimport qqIconImg from '../assets/icon-qq.svg';\\nimport discordImg from '../assets/icon-discord.svg';\\nimport i18n, { Language } from '../service/i18n';\\nexport let direct = false;\\nexport let discordUrl;\\n$: list = [\\n    {\\n        type: 'wx',\\n        img: wxImg,\\n        icon: wxIconImg,\\n        name: $i18n.t('qrcode.tencent_wx'),\\n        nameWithAction: $i18n.t('qrcode.follow', { content: $i18n.t('qrcode.tencent_wx') }),\\n    },\\n    {\\n        type: 'ws',\\n        img: wsImg,\\n        icon: wsIconImg,\\n        name: $i18n.t('qrcode.tencent_video'),\\n        nameWithAction: $i18n.t('qrcode.follow', { content: $i18n.t('qrcode.tencent_video') }),\\n    },\\n    {\\n        type: 'bili',\\n        img: biliImg,\\n        icon: biliIconImg,\\n        name: $i18n.t('qrcode.bili'),\\n        nameWithAction: $i18n.t('qrcode.follow', { content: $i18n.t('qrcode.bili') }),\\n    },\\n    {\\n        type: 'qq',\\n        img: qqImg,\\n        icon: qqIconImg,\\n        name: $i18n.t('qrcode.qq'),\\n        nameWithAction: $i18n.t('qrcode.join', { content: $i18n.t('qrcode.qq') }),\\n    },\\n];\\n<\/script>\\n\\n<div class=\\"qrcode-group\\" class:qrcode-group-en={$i18n.language === Language['en']}>\\n  {#if direct}\\n    {#each list as item}\\n      <div class=\\"qrcode-group-column\\">\\n        <img class=\\"qrcode-group-column__img\\" src={item.img} alt=\\"\\" />\\n        <span class=\\"qrcode-group-column__text\\">{item.name}</span>\\n      </div>\\n    {/each}\\n    <div class=\\"qrcode-group-wrap\\">\\n      <a class=\\"qrcode-group-discord\\" href={discordUrl} target=\\"_blank\\" rel=\\"noreferrer nofollow noopener\\">\\n        <img class=\\"qrcode-group-discord__logo\\" src={discordImg} alt=\\"\\" />\\n      </a>\\n    </div>\\n  {:else}\\n    {#each list as item}\\n      <div class=\\"qrcode-group-item-wrap\\">\\n        <div class=\\"qrcode-group-item\\">\\n          <img class=\\"qrcode-group-item__icon\\" src={item.icon} alt=\\"\\" />\\n        </div>\\n        <div class=\\"popover\\">\\n          <img class=\\"popover-img\\" src={item.img} alt=\\"\\" />\\n          <span class=\\"popover-text\\">{item.nameWithAction}</span>\\n        </div>\\n      </div>\\n    {/each}\\n    <a class=\\"qrcode-group-discord\\" href={discordUrl} target=\\"_blank\\" rel=\\"noreferrer nofollow noopener\\">\\n      <img class=\\"qrcode-group-discord__logo\\" src={discordImg} alt=\\"\\" />\\n    </a>\\n  {/if}\\n</div>\\n\\n<style lang=\\"less\\">.qrcode-group {\\n  display: flex;\\n  flex-wrap: wrap;\\n}\\n.qrcode-group-item-wrap {\\n  position: relative;\\n}\\n.qrcode-group-item-wrap + .qrcode-group-item-wrap {\\n  margin-left: 12px;\\n}\\n.qrcode-group-item-wrap .popover {\\n  visibility: hidden;\\n  position: absolute;\\n  width: 132px;\\n  bottom: 42px;\\n  left: 50%;\\n  transform: translateX(-50%) scale(0.6);\\n  background-color: #fff;\\n  padding: 8px;\\n  border-radius: 4px;\\n  text-align: center;\\n  opacity: 0;\\n  transition: visibility 0s, all 0.3s ease;\\n  transform-origin: bottom center;\\n}\\n.qrcode-group-item-wrap .popover::after {\\n  content: '';\\n  position: absolute;\\n  bottom: -10px;\\n  left: 50%;\\n  transform: translateX(-50%);\\n  border: 5px solid transparent;\\n  border-top-color: #fff;\\n}\\n.qrcode-group-item-wrap .popover-img {\\n  width: 120px;\\n  height: 120px;\\n}\\n.qrcode-group-item-wrap .popover-text {\\n  margin-top: 4px;\\n  font-size: 14px;\\n  line-height: 22px;\\n  color: #1D2127;\\n}\\n.qrcode-group-item-wrap:hover .popover {\\n  visibility: visible;\\n  opacity: 1;\\n  transform: translateX(-50%) scale(1);\\n}\\n.qrcode-group-item {\\n  width: 32px;\\n  height: 32px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  border-radius: 50%;\\n  background-color: #FAFAFA;\\n  cursor: pointer;\\n}\\n.qrcode-group-item:hover {\\n  background-color: #FFFFFF;\\n}\\n.qrcode-group-item__icon {\\n  width: 24px;\\n  height: 24px;\\n}\\n.qrcode-group-column {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n.qrcode-group-column + .qrcode-group-column {\\n  margin-left: 24px;\\n}\\n.qrcode-group-column__img {\\n  width: 64px;\\n  height: 64px;\\n  border-radius: 4px;\\n}\\n.qrcode-group-column__text {\\n  margin-top: 12px;\\n  font-size: 12px;\\n  line-height: 18px;\\n  color: #B9BEC1;\\n}\\n.qrcode-group-discord {\\n  width: 96px;\\n  height: 32px;\\n  margin-left: 12px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  background-color: #5865f2;\\n  border-radius: 100px;\\n  transition: background-color 0.3s;\\n}\\n.qrcode-group-discord__logo {\\n  height: 14px;\\n}\\n.qrcode-group-discord:hover {\\n  background-color: #7480fc;\\n}\\n.qrcode-group-wrap {\\n  width: 100%;\\n  margin-top: 16px;\\n}\\n.qrcode-group-wrap .qrcode-group-discord {\\n  margin-left: 0;\\n}\\n@media (max-width: 1013px) {\\n  .qrcode-group-item-wrap + .qrcode-group-item-wrap {\\n    margin-left: 8px;\\n  }\\n  .qrcode-group-discord {\\n    margin-left: 8px;\\n  }\\n}\\n@media (max-width: 767px) {\\n  .qrcode-group-en .qrcode-group-column {\\n    width: 140px;\\n    margin: 0 24px 16px 0;\\n  }\\n  .qrcode-group-en .qrcode-group-wrap {\\n    margin-bottom: 16px;\\n  }\\n}\\n</style>\\n"],"names":[],"mappings":"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"}`
}, te = ne((n, e, t, o) => {
  let A, i, r;
  r = oe(ie, (s) => i = s);
  let { direct: g = !1 } = e, { discordUrl: a } = e;
  return e.direct === void 0 && t.direct && g !== void 0 && t.direct(g), e.discordUrl === void 0 && t.discordUrl && a !== void 0 && t.discordUrl(a), n.css.add(pt), A = [
    {
      type: "wx",
      img: Te,
      icon: Ct,
      name: i.t("qrcode.tencent_wx"),
      nameWithAction: i.t("qrcode.follow", { content: i.t("qrcode.tencent_wx") })
    },
    {
      type: "ws",
      img: ye,
      icon: ct,
      name: i.t("qrcode.tencent_video"),
      nameWithAction: i.t("qrcode.follow", { content: i.t("qrcode.tencent_video") })
    },
    {
      type: "bili",
      img: Oe,
      icon: Nt,
      name: i.t("qrcode.bili"),
      nameWithAction: i.t("qrcode.follow", { content: i.t("qrcode.bili") })
    },
    {
      type: "qq",
      img: Le,
      icon: It,
      name: i.t("qrcode.qq"),
      nameWithAction: i.t("qrcode.join", { content: i.t("qrcode.qq") })
    }
  ], r(), `<div class="${[
    "qrcode-group svelte-1p50smn",
    i.language === U.en ? "qrcode-group-en" : ""
  ].join(" ").trim()}">${g ? `${S(A, (s) => `<div class="qrcode-group-column svelte-1p50smn"><img class="qrcode-group-column__img svelte-1p50smn"${f("src", s.img, 0)} alt=""> <span class="qrcode-group-column__text svelte-1p50smn">${d(s.name)}</span> </div>`)} <div class="qrcode-group-wrap svelte-1p50smn"><a class="qrcode-group-discord svelte-1p50smn"${f("href", a, 0)} target="_blank" rel="noreferrer nofollow noopener"><img class="qrcode-group-discord__logo svelte-1p50smn"${f("src", De, 0)} alt=""></a></div>` : `${S(A, (s) => `<div class="qrcode-group-item-wrap svelte-1p50smn"><div class="qrcode-group-item svelte-1p50smn"><img class="qrcode-group-item__icon svelte-1p50smn"${f("src", s.icon, 0)} alt=""></div> <div class="popover svelte-1p50smn"><img class="popover-img svelte-1p50smn"${f("src", s.img, 0)} alt=""> <span class="popover-text svelte-1p50smn">${d(s.nameWithAction)}</span></div> </div>`)} <a class="qrcode-group-discord svelte-1p50smn"${f("href", a, 0)} target="_blank" rel="noreferrer nofollow noopener"><img class="qrcode-group-discord__logo svelte-1p50smn"${f("src", De, 0)} alt=""></a>`} </div>`;
}), mt = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODU3IiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDg1NyAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTU3Ljc5OSA0NC40NjVIMTE3LjU0MUMxMTQuMzY1IDQ0LjQ2NSAxMTEuNzkgNDcuMDQ1IDExMS43OSA1MC4yMjc2VjE5MC40NTJDMTExLjc5IDE5MS45OTIgMTExLjE3NiAxOTMuNDY3IDExMC4wODMgMTk0LjU1QzEwOC45OTEgMTk1LjYzMyAxMDcuNTEyIDE5Ni4yMzIgMTA1Ljk3NSAxOTYuMjE1SDcyLjEwODFDNzAuNTg4NiAxOTYuMjE1IDY5LjEzMjMgMTk1LjYwNiA2OC4wNjM5IDE5NC41MjNDNjYuOTk1NSAxOTMuNDQxIDY2LjQwMzggMTkxLjk3NSA2Ni40MjA5IDE5MC40NTJWNTAuMjI3NkM2Ni40MjA5IDQ4LjY5OTMgNjUuODE1IDQ3LjIzMzUgNjQuNzM2NSA0Ni4xNTI4QzYzLjY1NzkgNDUuMDcyMSA2Mi4xOTUxIDQ0LjQ2NSA2MC42Njk5IDQ0LjQ2NUgzNS4yMzc0QzE3LjM0NTIgNDQuNDY1IDYuNDgyMDkgNDQuNDY1IDAuNjY3MTI1IDI5LjczODJDLTEuNDEwOSAxOS40NjA4IDEuNDI2MDEgOC44MDA4NyA4LjMzNTIxIDAuOTI0ODcxQzEwLjI1MjIgLTAuOTk2MDE1IDE0LjE1MDIgMC4yODQ1NzYgMTMuNDQ3MyAyLjg0NTc2QzEyLjc0NDQgNS40MDY5NCAxNS40MjgyIDguNjA4NDIgMjEuMTE1MyA4LjYwODQySDE1Ny43OTlDMTU5LjMxOCA4LjYwODMyIDE2MC43NzUgOS4yMTc0OSAxNjEuODQzIDEwLjMwMDFDMTYyLjkxMSAxMS4zODI3IDE2My41MDMgMTIuODQ4NiAxNjMuNDg2IDE0LjM3MTFWMzcuNDIxN0MxNjMuNDg2IDQxLjkwMzggMTYwLjk5NCA0NC40NjUgMTU3Ljc5OSA0NC40NjVaTTIwMy4xMDQgMTYzLjU2QzIwOC4yODkgMTYzLjI1NiAyMTMuMzI3IDE2MS43MiAyMTcuODAyIDE1OS4wNzhDMjIyLjk4MyAxNTYuMTgzIDIyNi40MDMgMTUwLjkxMSAyMjYuOTM5IDE0NC45OTJWODIuMjQyNkMyMjYuODk4IDc5LjczNTEgMjI1LjM5OSA3Ny40ODI3IDIyMy4xMDUgNzYuNDc5OUMyMTguNTA2IDc1LjM0NjIgMjEzLjczIDc1LjEyODcgMjA5LjA0NyA3NS44Mzk2QzE1NS4xNzkgNzguNDAwOCAxNjQuMTg5IDE2OC42ODIgMjAzLjEwNCAxNjMuNTZaTTIzMC4wMDYgMTc3LjAwNkMyMjkuNjg5IDE3NS45MzMgMjI4Ljc2OCAxNzUuMTUgMjI3LjY1OSAxNzUuMDExQzIyNi41NTEgMTc0Ljg3MiAyMjUuNDY2IDE3NS40MDQgMjI0Ljg5NCAxNzYuMzY2QzIyMS45MzQgMTgwLjk2NyAyMTguMjY4IDE4NS4wNzMgMjE0LjAzMSAxODguNTMxQzIwNy4zNzEgMTkzLjQwMyAxOTkuMjY3IDE5NS44ODUgMTkxLjAyNyAxOTUuNTc1QzE0NC4zMTYgMTk1LjU3NSAxMzQuMTU1IDE0Ni4yNzIgMTM0LjE1NSAxMjguMzQ0QzEzNC4xNTUgMTA0LjAxMiAxNDAuNTQ2IDUwLjg2NzggMjAxLjI1MSA1MC44Njc4QzIxMC4wMzkgNTAuNTAxMiAyMTguODM2IDUxLjM2MzIgMjI3LjM4NyA1My40MjlMMjI4LjA4OSA1MC44Njc4QzIyOC43MzQgNDguMTM5IDIzMSA0Ni4wOTc0IDIzMy43NzcgNDUuNzQ1NEgyNjcuMDA1QzI2OC41NDEgNDUuNzI4MyAyNzAuMDIxIDQ2LjMyNzkgMjcxLjExMyA0Ny40MTA0QzI3Mi4yMDUgNDguNDkzIDI3Mi44MiA0OS45Njg2IDI3Mi44MiA1MS41MDgxVjE1MC43NTRDMjcyLjgyIDE1Ny43OTcgMjcwLjkwMyAxNzguMjg3IDI4NS42IDE4My40MDlDMjg2LjY2MyAxODMuNzQzIDI4Ny40MjkgMTg0LjY3MyAyODcuNTUzIDE4NS43ODJDMjg3LjY3OCAxODYuODkxIDI4Ny4xMzcgMTg3Ljk2OSAyODYuMTc1IDE4OC41MzFDMjUxLjczMyAyMDkuMDIxIDIzNS4wNTUgMTkyLjI0NSAyMzAuMDA2IDE3Ny4wMDZaTTQwMS4xOTcgMTIwLjY2QzQwMS4xOTcgODQuODAzNyAzNzYuOTc4IDc4LjQwMDcgMzY5LjI0NiA3OC40MDA3QzM2NC4zMzQgNzguNjIzMyAzNTkuNTMzIDc5LjkzNTQgMzU1LjE4OCA4Mi4yNDI1QzM1My4xNDIgODMuNTM0MiAzNTEuMjM2IDg1LjAzNjQgMzQ5LjUwMSA4Ni43MjQ2QzM0Ny41NDMgODguODE0MSAzNDYuNDA4IDkxLjU0NCAzNDYuMzA2IDk0LjQwODFWMTQ3LjQyNUMzNDYuMzM3IDE1MC43OTMgMzQ3LjY5MiAxNTQuMDE0IDM1MC4wNzYgMTU2LjM4OUMzNTEuNjk3IDE1Ny41ODQgMzUzLjQwNiAxNTguNjU0IDM1NS4xODggMTU5LjU5QzM1OS40OTYgMTYxLjIzOCAzNjQuMDYxIDE2Mi4xMDUgMzY4LjY3MSAxNjIuMTUxQzM3Ni45NzggMTYxLjYzOSA0MDEuMTk3IDE1Mi4wMzUgNDAxLjE5NyAxMjAuNjZaTTM4MC4zMDEgMTk2Ljg1NUMzNzMuODkyIDE5Ny4wMDcgMzY3LjUzMiAxOTUuNjkzIDM2MS43MDYgMTkzLjAxM0MzNTguNDg2IDE5MS4yNjUgMzU1LjUwMSAxODkuMTE0IDM1Mi44MjQgMTg2LjYxQzM1Mi4wMTQgMTg1LjcxOSAzNTAuNzQ0IDE4NS40MTMgMzQ5LjYxOCAxODUuODM2QzM0OC40OTIgMTg2LjI1OSAzNDcuNzM3IDE4Ny4zMjcgMzQ3LjcxMiAxODguNTMxVjI0NC4yMzdDMzQ3LjcxMiAyNDUuNzY1IDM0Ny4xMDYgMjQ3LjIzMSAzNDYuMDI3IDI0OC4zMTJDMzQ0Ljk0OSAyNDkuMzkzIDM0My40ODYgMjUwIDM0MS45NjEgMjUwSDMwOC4wOTNDMzA2LjU1NyAyNTAuMDE3IDMwNS4wNzggMjQ5LjQxNyAzMDMuOTg1IDI0OC4zMzVDMzAyLjg5MyAyNDcuMjUyIDMwMi4yNzggMjQ1Ljc3NyAzMDIuMjc4IDI0NC4yMzdWODAuOTYxNkMzMDIuMjc4IDU1LjM0OTggMjk4LjUwOCA0Ny4wMjU5IDI4OC4yMiA0NS43NDUzQzI4Ny4xMDQgNDUuNTM1NCAyODYuMjE1IDQ0LjY4NjYgMjg1Ljk1MyA0My41NzkzQzI4NS42OSA0Mi40NzE5IDI4Ni4xMDMgNDEuMzEzNSAyODcuMDA2IDQwLjYyM0MzMTguOTU2IDE4LjIxMjYgMzQxLjMyMiA0NC40NjQ4IDM0My44MTQgNTAuODY3N0MzNDQuNTE3IDUyLjc4ODYgMzQ1LjE1NiA1NS4zNDk4IDM0NS43MzEgNTcuMjcwN0MzNDUuOTUgNTguMzk1NSAzNDYuODAxIDU5LjI5MDcgMzQ3LjkxMSA1OS41NjU1QzM0OS4wMjEgNTkuODQwMiAzNTAuMTkgNTkuNDQ0NSAzNTAuOTA3IDU4LjU1MTNDMzUzLjg1MyA1NS4yNTE3IDM1Ny4zMDQgNTIuNDQyMSAzNjEuMTMxIDUwLjIyNzRDMzY2Ljk3NCA0Ni44OTQ1IDM3My41NzcgNDUuMTMgMzgwLjMwMSA0NS4xMDVDMzk4LjEyOSA0NS4xMDUgNDQxLjAwNyA1OS44MzE4IDQ0MS4wMDcgMTIxLjNDNDQxLjAwNyAxODIuNzY5IDM5OC4wMDEgMTk2Ljg1NSAzODAuMzAxIDE5Ni44NTVaTTU3My44NTYgNDQuNDY1SDUzMy42NjNDNTMwLjQ4NyA0NC40NjUgNTI3LjkxMiA0Ny4wNDUgNTI3LjkxMiA1MC4yMjc2VjE5MC40NTJDNTI3LjkxMiAxOTEuOTkyIDUyNy4yOTcgMTkzLjQ2NyA1MjYuMjA1IDE5NC41NUM1MjUuMTEyIDE5NS42MzMgNTIzLjYzMyAxOTYuMjMyIDUyMi4wOTcgMTk2LjIxNUg0ODguMTY1QzQ4Ni42NCAxOTYuMjE1IDQ4NS4xNzcgMTk1LjYwOCA0ODQuMDk5IDE5NC41MjdDNDgzLjAyIDE5My40NDYgNDgyLjQxNCAxOTEuOTgxIDQ4Mi40MTQgMTkwLjQ1MlY1MC4yMjc2QzQ4Mi40MTQgNDguNjk5MyA0ODEuODA4IDQ3LjIzMzUgNDgwLjczIDQ2LjE1MjhDNDc5LjY1MSA0NS4wNzIxIDQ3OC4xODkgNDQuNDY1IDQ3Ni42NjMgNDQuNDY1SDQ1Mi4zMTdDNDM0LjQ4OSA0NC40NjUgNDIzLjU2MiA0NC40NjUgNDE3Ljg3NSAyOS43MzgyQzQxNS43NjkgMTkuNDcwNiA0MTguNTgzIDguODA3NDYgNDI1LjQ3OSAwLjkyNDg3MUM0MjcuNDYgLTAuOTk2MDE1IDQzMS4yOTQgMC4yODQ1NzYgNDMwLjY1NSAyLjg0NTc2QzQzMC4wMTYgNS40MDY5NCA0MzIuNTA4IDguNjA4NDIgNDM4LjMyMyA4LjYwODQySDU3NS4wN0M1NzguMjQ3IDguNjA4NDIgNTgwLjgyMSAxMS4xODg0IDU4MC44MjEgMTQuMzcxMVYzNy40MjE3QzU4MC4xMTkgNDEuOTAzOCA1NzcuNjI2IDQ0LjQ2NSA1NzMuNzI4IDQ0LjQ2NUg1NzMuODU2Wk02MTkuOTI5IDE2My41NkM2MjUuMDkgMTYzLjIzOSA2MzAuMTAzIDE2MS43MDMgNjM0LjU2MiAxNTkuMDc4QzYzOS42OTMgMTU2LjE2MiA2NDMuMDQ1IDE1MC44ODQgNjQzLjUwOCAxNDQuOTkyVjgyLjI0MjZDNjQzLjQ3OCA3OS43NTAxIDY0Mi4wMDcgNzcuNTAxNyA2MzkuNzM4IDc2LjQ3OTlDNjM1LjEzOSA3NS4zNDYyIDYzMC4zNjIgNzUuMTI4NyA2MjUuNjggNzUuODM5NkM1NzIuMDAzIDc4LjQwMDggNTgwLjgyMSAxNjguNjgyIDYxOS44MDEgMTYzLjU2SDYxOS45MjlaTTY0Ni43MDMgMTc3LjAwNkM2NDYuNDE0IDE3NS45MjUgNjQ1LjUwMiAxNzUuMTI3IDY0NC4zOTQgMTc0Ljk4NkM2NDMuMjg2IDE3NC44NDYgNjQyLjIwMyAxNzUuMzkxIDY0MS42NTUgMTc2LjM2NkM2MzguNjg3IDE4MC45ODIgNjM0Ljk5NyAxODUuMDg5IDYzMC43MjggMTg4LjUzMUM2MjQuMDk3IDE5My40MTIgNjE2LjAwOSAxOTUuODk1IDYwNy43ODcgMTk1LjU3NUM1NjEuMDc2IDE5NS41NzUgNTUwLjg1MiAxNDYuMjcyIDU1MC44NTIgMTI4LjM0NEM1NTAuODUyIDEwNC4wMTIgNTU3LjI0MiA1MC44Njc5IDYxNy45NDggNTAuODY3OUM2MjYuNzU3IDUwLjUwMDMgNjM1LjU3NSA1MS4zNjIzIDY0NC4xNDcgNTMuNDI5MUw2NDQuODUgNTAuODY3OUM2NDUuNTEgNDguMTQ4OSA2NDcuNzY5IDQ2LjExNDkgNjUwLjUzNyA0NS43NDU1SDY4My44MjlDNjg1LjM1NSA0NS43NDU1IDY4Ni44MTcgNDYuMzUyNiA2ODcuODk2IDQ3LjQzMzNDNjg4Ljk3NCA0OC41MTQxIDY4OS41OCA0OS45Nzk4IDY4OS41OCA1MS41MDgyVjE1MC43NTRDNjg5LjU4IDE1Ny43OTcgNjg3LjY2MyAxNzguMjg3IDcwMi4zNiAxODMuNDA5QzcwMy4zOTIgMTgzLjc3IDcwNC4xMyAxODQuNjg2IDcwNC4yNjUgMTg1Ljc3MkM3MDQuNDAxIDE4Ni44NTggNzAzLjkxIDE4Ny45MjcgNzAyLjk5OSAxODguNTMxQzY2Ny44NTQgMjA5LjAyMSA2NTEuNzUxIDE5Mi4yNDUgNjQ2LjU3NSAxNzcuMDA2SDY0Ni43MDNaTTgxNy4zODIgMTIwLjY2QzgxNy4zODIgODQuODAzNyA3OTMuMDk5IDc4LjQwMDcgNzg1LjQzMSA3OC40MDA3Qzc4MC40OTcgNzguNjA3NCA3NzUuNjcxIDc5LjkyMDIgNzcxLjMwOSA4Mi4yNDI1Qzc2OS4yNjUgODMuNTY0OCA3NjcuMzQxIDg1LjA2NDYgNzY1LjU1OCA4Ni43MjQ2Qzc2My42MjUgODguODI5NiA3NjIuNDkzIDkxLjU1MDIgNzYyLjM2MyA5NC40MDgxVjE0Ny40MjVDNzYyLjQyOCAxNTAuODEyIDc2My44MyAxNTQuMDM1IDc2Ni4yNjEgMTU2LjM4OUM3NzEuNDY0IDE2MC41ODggNzc4LjA2NiAxNjIuNjQ4IDc4NC43MjggMTYyLjE1MUM3OTIuOTcyIDE2MS42MzkgODE3LjI1NCAxNTIuMDM1IDgxNy4yNTQgMTIwLjY2SDgxNy4zODJaTTc5Ni4yOTQgMTk2Ljg1NUM3ODkuODg1IDE5Ny4wMDcgNzgzLjUyNiAxOTUuNjkzIDc3Ny42OTkgMTkzLjAxM0M3NzQuNDY5IDE5MS4yNSA3NzEuNDY1IDE4OS4xIDc2OC43NTMgMTg2LjYxQzc2Ny45MzYgMTg1Ljc2NSA3NjYuNjk2IDE4NS40ODggNzY1LjU5OCAxODUuOTA2Qzc2NC41IDE4Ni4zMjQgNzYzLjc1NiAxODcuMzU2IDc2My43MDUgMTg4LjUzMVYyNDQuMjM3Qzc2My43MDUgMjQ3LjQyIDc2MS4xMyAyNTAgNzU3Ljk1NCAyNTBINzI0LjAyM0M3MjIuNTAzIDI1MCA3MjEuMDQ3IDI0OS4zOTEgNzE5Ljk3OCAyNDguMzA4QzcxOC45MSAyNDcuMjI1IDcxOC4zMTggMjQ1Ljc1OSA3MTguMzM1IDI0NC4yMzdWODAuOTYxNkM3MTguMzM1IDU1LjM0OTggNzE0LjQzOCA0Ny4wMjU5IDcwNC4yMTMgNDUuNzQ1M0M3MDMuMDk3IDQ1LjUzNTQgNzAyLjIwOSA0NC42ODY2IDcwMS45NDYgNDMuNTc5M0M3MDEuNjg0IDQyLjQ3MTkgNzAyLjA5NiA0MS4zMTM1IDcwMi45OTkgNDAuNjIzQzczNC45NSAxOC4yMTI2IDc1Ny4zMTUgNDQuNDY0OCA3NTkuODcxIDUwLjg2NzdDNzYwLjUxIDUyLjc4ODYgNzYxLjE0OSA1NS4zNDk4IDc2MS43MjQgNTcuMjcwN0M3NjEuODkgNTguNDMyOSA3NjIuNzQ0IDU5LjM3NzkgNzYzLjg4MSA1OS42NTkzQzc2NS4wMTkgNTkuOTQwOCA3NjYuMjEzIDU5LjUwMjQgNzY2LjkgNTguNTUxM0M3NjkuODQ3IDU1LjI1MTcgNzczLjI5OCA1Mi40NDIxIDc3Ny4xMjQgNTAuMjI3NEM3ODIuOTY3IDQ2Ljg5NDUgNzg5LjU3MSA0NS4xMyA3OTYuMjk0IDQ1LjEwNUM4MTQuMTg2IDQ1LjEwNSA4NTcgNTkuODMxOCA4NTcgMTIxLjNDODU3IDE4Mi43NjkgODE0LjA1OSAxOTYuODU1IDc5Ni4xNjcgMTk2Ljg1NUg3OTYuMjk0WiIgZmlsbD0iIzE1QzVDRSIvPgo8L3N2Zz4K";
const Dt = {
  code: ".logo.svelte-q6sm0c{display:flex;align-items:center}.logo-img.svelte-q6sm0c{width:82px;height:24px;background-size:cover}.logo-text.svelte-q6sm0c{margin-right:12px;margin-left:6px;font-weight:500;font-size:18px;line-height:24px;color:#FFFFFF}",
  map: `{"version":3,"file":"Logo.svelte","sources":["Logo.svelte"],"sourcesContent":["<script lang=\\"ts\\">import LogoImg from '../assets/logo.svg';\\nimport i18n from '../service/i18n';\\n<\/script>\\n\\n<div class=\\"logo flex-align-center\\">\\n  <div class=\\"logo-img\\" style=\\"background-image: url({LogoImg})\\" />\\n  <span class=\\"logo-text\\">{$i18n.t('developer_service')}</span>\\n</div>\\n\\n<style lang=\\"less\\">.logo {\\n  display: flex;\\n  align-items: center;\\n}\\n.logo-img {\\n  width: 82px;\\n  height: 24px;\\n  background-size: cover;\\n}\\n.logo-text {\\n  margin-right: 12px;\\n  margin-left: 6px;\\n  font-weight: 500;\\n  font-size: 18px;\\n  line-height: 24px;\\n  color: #FFFFFF;\\n}\\n</style>\\n"],"names":[],"mappings":"AASmB,mBAAM,CACvB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACf,CACA,uBAAU,CACR,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,KACnB,CACA,wBAAW,CACT,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OACT"}`
}, jt = ne((n, e, t, o) => {
  let A, i;
  return i = oe(ie, (r) => A = r), n.css.add(Dt), i(), `<div class="logo flex-align-center svelte-q6sm0c"><div class="logo-img svelte-q6sm0c" style="${"background-image: url(" + d(mt, !0) + ")"}"></div> <span class="logo-text svelte-q6sm0c">${d(A.t("developer_service"))}</span> </div>`;
});
const ft = {
  code: ".footer.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{background-color:#190b40}.footer.svelte-1votmuj a.svelte-1votmuj.svelte-1votmuj{text-decoration:none}.footer-top.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:flex;align-items:flex-start;max-width:1200px;margin:0 auto;padding:32px 0 56px}.footer-top__logo.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-right:48px}.footer-top__go-tap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:inline-flex;align-items:center;margin-top:16px;padding:10px 32px;border-radius:50px;border:1px solid transparent;background:linear-gradient(266deg, rgba(138, 138, 138, 0.39) 0%, rgba(138, 138, 138, 0) 100%);background-clip:padding-box;color:#EBEFF0}.footer-top__go-tap-text.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{font-size:12px;line-height:18px}.footer-top__go-tap-icon.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-left:4px}.footer-top__go-tap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj:hover{border:1px solid rgba(250, 250, 250, 0.15)}.footer-top__columns.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{flex:1;display:flex;justify-content:space-between;flex-wrap:wrap;align-items:flex-start}.footer-top__column.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:flex;flex-direction:column}.footer-top__column-title.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-bottom:12px;color:#FFFFFF;font-weight:500;font-size:14px;line-height:22px}.footer-top__column-item.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{color:#B9BEC1;font-size:12px;line-height:18px;transition:color 0.3s ease-in-out}.footer-top__column-item.svelte-1votmuj+.footer-top__column-item.svelte-1votmuj.svelte-1votmuj{margin-top:4px}.footer-top__column-item.svelte-1votmuj .email-link.svelte-1votmuj.svelte-1votmuj{color:inherit;margin-left:-4px}.footer-top__column-item.svelte-1votmuj .email-link.svelte-1votmuj.svelte-1votmuj:hover{text-decoration:underline}.footer-top__column-item.svelte-1votmuj .no-margin.svelte-1votmuj.svelte-1votmuj{margin-left:0}.footer-top__column-item.email.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj:hover{color:#FFFFFF}.footer-top__column.svelte-1votmuj a.svelte-1votmuj.svelte-1votmuj:hover{color:#FFFFFF}.footer-top__column-qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-top:12px}.footer-top__qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj,.footer-top__img-qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:none !important}.footer-bottom.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{border-top:1px solid #2e2e2e;padding:24px 0;text-align:center}.footer-bottom__wrap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:block;margin-top:8px;font-size:10px;line-height:14px}.footer-bottom__wrap.svelte-1votmuj .footer-bottom__row.svelte-1votmuj.svelte-1votmuj{display:inline-block}.footer-bottom__row.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{font-size:10px;line-height:14px;text-align:center}.footer-bottom__row-item.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{color:#868C92;white-space:nowrap}.footer-bottom__row-item.svelte-1votmuj+.footer-bottom__row-item.svelte-1votmuj.svelte-1votmuj{margin-left:24px}.footer-bottom__row.svelte-1votmuj+.footer-bottom__row.svelte-1votmuj.svelte-1votmuj{margin-left:24px}.footer-bottom.svelte-1votmuj .department-icon.svelte-1votmuj.svelte-1votmuj{height:12px;margin-right:4px;vertical-align:middle}@media(max-width: 1280px){.footer-top.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin:0 40px}}@media(max-width: 1013px){.footer-top.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin:0 24px;padding-top:24px;padding-bottom:0}.footer-top__columns.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{justify-content:flex-start}.footer-top__column.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-right:40px;margin-bottom:32px}.footer-top__column-qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:none !important}.footer-top__column.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj:nth-child(6){margin-right:24px}.footer-top__qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:flex !important;align-self:center}.footer-bottom__wrap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:flex;flex-direction:column}.footer-bottom__wrap.svelte-1votmuj .footer-bottom__row.svelte-1votmuj.svelte-1votmuj:last-child{margin-top:8px}}@media(max-width: 900px){.footer.svelte-1votmuj .footer-top__column.svelte-1votmuj.svelte-1votmuj:nth-child(5){margin-right:0}.footer.svelte-1votmuj .footer-top__column.svelte-1votmuj.svelte-1votmuj:nth-child(6){margin-right:12px}}@media(max-width: 767px){.footer-top.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin:0;padding:40px 16px;flex-direction:column;justify-content:flex-start}.footer-top-logo-wrap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:flex;align-items:center;margin-bottom:28px}.footer-top__logo.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-bottom:0;margin-right:8px}.footer-top__go-tap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-top:0;padding:10px 14px}.footer-top__columns.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{width:100%;flex-direction:column}.footer-top__column.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:block;width:100%;margin:0;padding:12px 0 0;line-height:0;border-bottom:1px solid rgba(255, 255, 255, 0.15)}.footer-top__column-item.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:inline-block;margin-bottom:12px;margin-right:24px}.footer-top__column-item.svelte-1votmuj+.footer-top__column-item.svelte-1votmuj.svelte-1votmuj{margin-top:0}.footer-top__column.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj:nth-child(5){border-bottom:none}.footer-top__column.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj:nth-child(6){border-bottom:none;margin-top:16px}.footer-top__column.svelte-1votmuj:nth-child(6) .footer-top__column-item.svelte-1votmuj.svelte-1votmuj{display:block;margin-left:0}.footer-top__column.svelte-1votmuj:nth-child(6) .footer-top__column-item.svelte-1votmuj+.footer-top__column-item.svelte-1votmuj{margin-top:8px}.footer-top__qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:none !important}.footer-top__img-qrcode.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:flex !important;flex-wrap:wrap;margin-top:4px}.footer-bottom.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{border:none;text-align:left;padding:0 16px 40px}.footer-bottom__wrap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-top:32px}.footer-bottom__wrap.svelte-1votmuj .footer-bottom__row.svelte-1votmuj+.footer-bottom__row.svelte-1votmuj{margin-top:14px}.footer-bottom__row.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{text-align:left}.footer-bottom__row.svelte-1votmuj+.footer-bottom__row.svelte-1votmuj.svelte-1votmuj{margin-top:14px;margin-left:0}.footer-bottom__row-item.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{display:block;white-space:normal}.footer-bottom__row-item.svelte-1votmuj+.footer-bottom__row-item.svelte-1votmuj.svelte-1votmuj{margin-top:14px;margin-left:0}}@media(max-width: 379px){.footer-top-logo-wrap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{flex-wrap:wrap}.footer-top__go-tap.svelte-1votmuj.svelte-1votmuj.svelte-1votmuj{margin-top:20px}}@media(max-width: 1279px){.footer-en.svelte-1votmuj .footer-top__columns.svelte-1votmuj.svelte-1votmuj{grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));justify-content:flex-start}.footer-en.svelte-1votmuj .footer-top__column.svelte-1votmuj.svelte-1votmuj{margin-right:40px !important;margin-bottom:32px}.footer-en.svelte-1votmuj .footer-top.svelte-1votmuj.svelte-1votmuj{padding-bottom:0}.footer-en.svelte-1votmuj .footer-top__column-qrcode.svelte-1votmuj.svelte-1votmuj{display:flex !important}.footer-en.svelte-1votmuj .footer-top__qrcode.svelte-1votmuj.svelte-1votmuj{display:none !important}.footer-en.svelte-1votmuj .footer-bottom__row.svelte-1votmuj.svelte-1votmuj{margin-top:0 !important;margin-left:0}.footer-en.svelte-1votmuj .footer-bottom__row-item.svelte-1votmuj+.footer-bottom__row-item.svelte-1votmuj{margin-left:16px}}@media(max-width: 940px){.footer-en.svelte-1votmuj .footer-top__column.svelte-1votmuj.svelte-1votmuj{margin-right:20px !important}.footer-en.svelte-1votmuj .footer-top__column.svelte-1votmuj.svelte-1votmuj:nth-child(6){margin-right:0px !important}}@media(max-width: 767px){.footer-en.svelte-1votmuj .footer-top__column-qrcode.svelte-1votmuj.svelte-1votmuj{display:none !important}.footer-en.svelte-1votmuj .footer-bottom__row-item.svelte-1votmuj+.footer-bottom__row-item.svelte-1votmuj{margin-left:0}.footer-en.svelte-1votmuj .footer-bottom__row.svelte-1votmuj.svelte-1votmuj:last-child{margin-top:14px !important}}@media(max-width: 427px){.footer-en.svelte-1votmuj .footer-top-logo-wrap.svelte-1votmuj.svelte-1votmuj{flex-wrap:wrap}.footer-en.svelte-1votmuj .footer-top__go-tap.svelte-1votmuj.svelte-1votmuj{margin-top:20px}}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { TrackingPoint } from '../constants';\\nimport LRight from '../assets/LRight.svg';\\nimport NetworkSecurityIcon from '../assets/network_security@2x.png';\\nimport InternetReportingCenterIcon from '../assets/internet_reporting@2x.png';\\nimport ReportHarmfulInformationIcon from '../assets/report_harmful_information@2x.png';\\nimport i18n, { Language } from '../service/i18n';\\nimport QrcodeGroup from './QrcodeGroup.svelte';\\nimport Logo from './Logo.svelte';\\nexport let track;\\nexport let publishGameUrl = '/store';\\nexport let language = Language['zh_CN'];\\nexport let tapUrl = 'https://www.taptap.cn';\\nexport let discordUrl = 'https://discord.gg/ZyuM66bAwx';\\n$: {\\n    $i18n.changeLanguage(language);\\n}\\nconst year = new Date().getFullYear();\\nfunction getForumUrl(origin) {\\n    const url = new URL(origin);\\n    url.pathname = '/forum/g28';\\n    return url.toString();\\n}\\n$: forumUrl = getForumUrl(tapUrl);\\n$: columns = [\\n    {\\n        title: $i18n.t('store'),\\n        items: [\\n            {\\n                name: $i18n.t('publish_game'),\\n                track: TrackingPoint.FooterStorePublish,\\n                href: publishGameUrl,\\n            },\\n        ],\\n    },\\n    {\\n        title: $i18n.t('game_service'),\\n        items: [\\n            {\\n                name: $i18n.t('develop_and_build'),\\n                href: '/service#developer-and-build',\\n                track: TrackingPoint.FooterServiceDevelopBuild,\\n            },\\n            {\\n                name: $i18n.t('operate_tool'),\\n                href: '/service#operation-tools',\\n                track: TrackingPoint.FooterServiceOperationTools,\\n            },\\n            {\\n                name: $i18n.t('revenue_tools'),\\n                href: '/service#revenue-tools',\\n                track: TrackingPoint.FooterServiceRevenue,\\n            },\\n        ],\\n    },\\n    {\\n        title: $i18n.t('commercialization'),\\n        items: [\\n            {\\n                name: $i18n.t('ad'),\\n                href: 'https://biz.taptap.com/?currentLang=zh_CN',\\n                track: TrackingPoint.FooterCommercializationAd,\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('rep'),\\n                track: TrackingPoint.FooterCommercializationRep,\\n                href: 'https://rep.taptap.cn/',\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('cmp'),\\n                track: TrackingPoint.FooterCommercializationCmp,\\n                href: 'https://tapu.taptap.cn/',\\n                blank: true,\\n            },\\n        ],\\n    },\\n    {\\n        title: $i18n.t('community'),\\n        items: [\\n            {\\n                name: $i18n.t('tds_tutorials'),\\n                href: '/tds-tutorials/list',\\n                track: TrackingPoint.FooterCommunityTutorials,\\n            },\\n            {\\n                name: $i18n.t('developer_forum'),\\n                href: forumUrl,\\n                track: TrackingPoint.FooterCommunityForum,\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('tds_document'),\\n                href: '/docs',\\n                track: TrackingPoint.FooterCommunityDocument,\\n            },\\n            {\\n                name: $i18n.t('developer_blog'),\\n                href: 'https://blog.taptap.dev/',\\n                track: TrackingPoint.FooterCommunityBlog,\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('project_torch'),\\n                href: '/project-torch',\\n                track: TrackingPoint.FooterCommunityProjectTorch,\\n            },\\n        ],\\n    },\\n    {\\n        title: $i18n.t('other'),\\n        items: [\\n            {\\n                name: $i18n.t('tds_status'),\\n                href: 'https://tdsstatus.cn/',\\n                track: TrackingPoint.FooterOtherStatus,\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('service_terms'),\\n                href: 'https://www.taptap.cn/doc/terms/',\\n                track: TrackingPoint.FooterOtherTerms,\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('privacy_policy'),\\n                href: 'https://www.taptap.cn/doc/privacy-policy/',\\n                track: TrackingPoint.FooterOtherPrivacyPolicy,\\n                blank: true,\\n            },\\n            {\\n                name: $i18n.t('copyright'),\\n                href: 'https://www.taptap.cn/doc/27/',\\n                track: TrackingPoint.FooterOtherCopyright,\\n                blank: true,\\n            },\\n        ],\\n    },\\n];\\n$: linkList = [\\n    {\\n        name: $i18n.t('ICP'),\\n        url: 'https://beian.miit.gov.cn',\\n        key: 'footer-ICP',\\n    },\\n    {\\n        name: $i18n.t('web_number'),\\n        url: 'https://www.taptap.cn/license/www.html',\\n        key: 'footer-web-number',\\n    },\\n    {\\n        name: $i18n.t('business_license'),\\n        url: 'https://www.taptap.cn/license/www.html',\\n        key: 'footer-business-license',\\n    },\\n    {\\n        name: $i18n.t('network_security'),\\n        url: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003255',\\n        key: 'footer-network-security',\\n        img: NetworkSecurityIcon,\\n    },\\n    {\\n        name: $i18n.t('sh_reporting_center'),\\n        url: 'https://www.shjbzx.cn/',\\n        key: 'footer-internet-reporting-center',\\n        img: InternetReportingCenterIcon,\\n    },\\n    {\\n        name: $i18n.t('report_harmful_information'),\\n        url: 'https://www.12377.cn/',\\n        key: 'footer-report-harmful-information',\\n        img: ReportHarmfulInformationIcon,\\n    },\\n];\\n$: topLinks = linkList.slice(0, 3);\\n$: botttomLinks = linkList.slice(3);\\nfunction handleTrack(type) {\\n    if (track) {\\n        track(type);\\n    }\\n}\\n<\/script>\\n\\n<footer class=\\"footer\\" class:footer-en={$i18n.language === Language['en']}>\\n  <div class=\\"footer-top\\">\\n    <div class=\\"footer-top-logo-wrap\\">\\n      <div class=\\"footer-top__logo\\">\\n        <Logo />\\n      </div>\\n      <a\\n        data-cy={TrackingPoint.FooterTapBtn}\\n        on:click={() => handleTrack(TrackingPoint.FooterTapBtn)}\\n        href={tapUrl}\\n        target=\\"_blank\\"\\n        class=\\"footer-top__go-tap\\"\\n      >\\n        <span class=\\"footer-top__go-tap-text\\">{$i18n.t('go_tap')}</span>\\n        <img src={LRight} class=\\"footer-top__go-tap-icon\\" alt=\\"\\" />\\n      </a>\\n    </div>\\n    <div class=\\"footer-top__columns\\">\\n      {#each columns as column}\\n        <div class=\\"footer-top__column\\">\\n          <div class=\\"footer-top__column-title\\">{column.title}</div>\\n          {#each column.items as item}\\n            <a\\n              data-cy={item.track}\\n              on:click={() => handleTrack(item.track)}\\n              href={item.href}\\n              target={item.blank ? '_blank' : '_self'}\\n              class=\\"footer-top__column-item\\"\\n            >\\n              {item.name}\\n            </a>\\n          {/each}\\n        </div>\\n      {/each}\\n      <div class=\\"footer-top__column\\">\\n        <div class=\\"footer-top__column-title\\">{$i18n.t('contact_or_follow_us')}</div>\\n        <span class=\\"footer-top__column-item email\\">\\n          {$i18n.t('cooperation_email')}\\n          <a\\n            data-cy={TrackingPoint.FooterEmailCooperation}\\n            on:click={() => handleTrack(TrackingPoint.FooterEmailCooperation)}\\n            href=\\"mailto:cooperation@taptap.com\\"\\n            target=\\"_blank\\"\\n            rel=\\"noopener noreferrer\\"\\n            class=\\"email-link\\"\\n            class:no-margin={$i18n.language === Language['en']}\\n          >\\n            cooperation@taptap.com\\n          </a>\\n        </span>\\n        <span class=\\"footer-top__column-item email\\">\\n          {$i18n.t('operate_email')}\\n          <a\\n            data-cy={TrackingPoint.FooterEmailOperation}\\n            on:click={() => handleTrack(TrackingPoint.FooterEmailOperation)}\\n            href=\\"mailto:operation@taptap.com\\"\\n            target=\\"_blank\\"\\n            rel=\\"noopener noreferrer\\"\\n            class=\\"email-link\\"\\n            class:no-margin={$i18n.language === Language['en']}\\n          >\\n            operation@taptap.com\\n          </a>\\n        </span>\\n        <div class=\\"footer-top__column-qrcode\\">\\n          <QrcodeGroup {discordUrl} />\\n        </div>\\n      </div>\\n      <div class=\\"footer-top__qrcode\\">\\n        <QrcodeGroup {discordUrl} />\\n      </div>\\n      <div class=\\"footer-top__img-qrcode\\">\\n        <QrcodeGroup direct={true} {discordUrl} />\\n      </div>\\n    </div>\\n  </div>\\n  <div class=\\"footer-bottom\\">\\n    <div class=\\"footer-bottom__row\\">\\n      <span class=\\"footer-bottom__row-item\\">{$i18n.t('company_name')}</span>\\n      <span class=\\"footer-bottom__row-item\\">{$i18n.t('company_address')}</span>\\n      <span class=\\"footer-bottom__row-item\\">{$i18n.t('registered_address')}</span>\\n      <span class=\\"footer-bottom__row-item\\">©{year} TapTap</span>\\n    </div>\\n    <div class=\\"footer-bottom__wrap\\">\\n      <div class=\\"footer-bottom__row\\">\\n        {#each topLinks as item}\\n          <a\\n            class=\\"footer-bottom__row-item link\\"\\n            target=\\"_blank\\"\\n            rel=\\"noreferrer nofollow noopener\\"\\n            href={item.url}\\n            data-cy={item.key}\\n          >\\n            {item.name}\\n          </a>\\n        {/each}\\n      </div>\\n      <div class=\\"footer-bottom__row\\">\\n        {#each botttomLinks as item}\\n          <a\\n            class=\\"footer-bottom__row-item link\\"\\n            target=\\"_blank\\"\\n            rel=\\"noreferrer nofollow noopener\\"\\n            href={item.url}\\n            data-cy={item.key}\\n          >\\n            {#if item.img}\\n              <img class=\\"department-icon\\" src={item.img} alt=\\"network_security\\" />\\n            {/if}\\n            {item.name}\\n          </a>\\n        {/each}\\n      </div>\\n    </div>\\n  </div>\\n</footer>\\n\\n<style lang=\\"less\\">.footer {\\n  background-color: #190b40;\\n}\\n.footer a {\\n  text-decoration: none;\\n}\\n.footer-top {\\n  display: flex;\\n  align-items: flex-start;\\n  max-width: 1200px;\\n  margin: 0 auto;\\n  padding: 32px 0 56px;\\n}\\n.footer-top__logo {\\n  margin-right: 48px;\\n}\\n.footer-top__go-tap {\\n  display: inline-flex;\\n  align-items: center;\\n  margin-top: 16px;\\n  padding: 10px 32px;\\n  border-radius: 50px;\\n  border: 1px solid transparent;\\n  background: linear-gradient(266deg, rgba(138, 138, 138, 0.39) 0%, rgba(138, 138, 138, 0) 100%);\\n  background-clip: padding-box;\\n  color: #EBEFF0;\\n}\\n.footer-top__go-tap-text {\\n  font-size: 12px;\\n  line-height: 18px;\\n}\\n.footer-top__go-tap-icon {\\n  margin-left: 4px;\\n}\\n.footer-top__go-tap:hover {\\n  border: 1px solid rgba(250, 250, 250, 0.15);\\n}\\n.footer-top__columns {\\n  flex: 1;\\n  display: flex;\\n  justify-content: space-between;\\n  flex-wrap: wrap;\\n  align-items: flex-start;\\n}\\n.footer-top__column {\\n  display: flex;\\n  flex-direction: column;\\n}\\n.footer-top__column-title {\\n  margin-bottom: 12px;\\n  color: #FFFFFF;\\n  font-weight: 500;\\n  font-size: 14px;\\n  line-height: 22px;\\n}\\n.footer-top__column-item {\\n  color: #B9BEC1;\\n  font-size: 12px;\\n  line-height: 18px;\\n  transition: color 0.3s ease-in-out;\\n}\\n.footer-top__column-item + .footer-top__column-item {\\n  margin-top: 4px;\\n}\\n.footer-top__column-item .email-link {\\n  color: inherit;\\n  margin-left: -4px;\\n}\\n.footer-top__column-item .email-link:hover {\\n  text-decoration: underline;\\n}\\n.footer-top__column-item .no-margin {\\n  margin-left: 0;\\n}\\n.footer-top__column-item.email:hover {\\n  color: #FFFFFF;\\n}\\n.footer-top__column a:hover {\\n  color: #FFFFFF;\\n}\\n.footer-top__column-qrcode {\\n  margin-top: 12px;\\n}\\n.footer-top__qrcode,\\n.footer-top__img-qrcode {\\n  display: none !important;\\n}\\n.footer-bottom {\\n  border-top: 1px solid #2e2e2e;\\n  padding: 24px 0;\\n  text-align: center;\\n}\\n.footer-bottom__wrap {\\n  display: block;\\n  margin-top: 8px;\\n  font-size: 10px;\\n  line-height: 14px;\\n}\\n.footer-bottom__wrap .footer-bottom__row {\\n  display: inline-block;\\n}\\n.footer-bottom__row {\\n  font-size: 10px;\\n  line-height: 14px;\\n  text-align: center;\\n}\\n.footer-bottom__row-item {\\n  color: #868C92;\\n  white-space: nowrap;\\n}\\n.footer-bottom__row-item + .footer-bottom__row-item {\\n  margin-left: 24px;\\n}\\n.footer-bottom__row + .footer-bottom__row {\\n  margin-left: 24px;\\n}\\n.footer-bottom .department-icon {\\n  height: 12px;\\n  margin-right: 4px;\\n  vertical-align: middle;\\n}\\n@media (max-width: 1280px) {\\n  .footer-top {\\n    margin: 0 40px;\\n  }\\n}\\n@media (max-width: 1013px) {\\n  .footer-top {\\n    margin: 0 24px;\\n    padding-top: 24px;\\n    padding-bottom: 0;\\n  }\\n  .footer-top__columns {\\n    justify-content: flex-start;\\n  }\\n  .footer-top__column {\\n    margin-right: 40px;\\n    margin-bottom: 32px;\\n  }\\n  .footer-top__column-qrcode {\\n    display: none !important;\\n  }\\n  .footer-top__column:nth-child(6) {\\n    margin-right: 24px;\\n  }\\n  .footer-top__qrcode {\\n    display: flex !important;\\n    align-self: center;\\n  }\\n  .footer-bottom__wrap {\\n    display: flex;\\n    flex-direction: column;\\n  }\\n  .footer-bottom__wrap .footer-bottom__row:last-child {\\n    margin-top: 8px;\\n  }\\n}\\n@media (max-width: 900px) {\\n  .footer .footer-top__column:nth-child(5) {\\n    margin-right: 0;\\n  }\\n  .footer .footer-top__column:nth-child(6) {\\n    margin-right: 12px;\\n  }\\n}\\n@media (max-width: 767px) {\\n  .footer-top {\\n    margin: 0;\\n    padding: 40px 16px;\\n    flex-direction: column;\\n    justify-content: flex-start;\\n  }\\n  .footer-top-logo-wrap {\\n    display: flex;\\n    align-items: center;\\n    margin-bottom: 28px;\\n  }\\n  .footer-top__logo {\\n    margin-bottom: 0;\\n    margin-right: 8px;\\n  }\\n  .footer-top__go-tap {\\n    margin-top: 0;\\n    padding: 10px 14px;\\n  }\\n  .footer-top__columns {\\n    width: 100%;\\n    flex-direction: column;\\n  }\\n  .footer-top__column {\\n    display: block;\\n    width: 100%;\\n    margin: 0;\\n    padding: 12px 0 0;\\n    line-height: 0;\\n    border-bottom: 1px solid rgba(255, 255, 255, 0.15);\\n  }\\n  .footer-top__column-item {\\n    display: inline-block;\\n    margin-bottom: 12px;\\n    margin-right: 24px;\\n  }\\n  .footer-top__column-item + .footer-top__column-item {\\n    margin-top: 0;\\n  }\\n  .footer-top__column:nth-child(5) {\\n    border-bottom: none;\\n  }\\n  .footer-top__column:nth-child(6) {\\n    border-bottom: none;\\n    margin-top: 16px;\\n  }\\n  .footer-top__column:nth-child(6) .footer-top__column-item {\\n    display: block;\\n    margin-left: 0;\\n  }\\n  .footer-top__column:nth-child(6) .footer-top__column-item + .footer-top__column-item {\\n    margin-top: 8px;\\n  }\\n  .footer-top__qrcode {\\n    display: none !important;\\n  }\\n  .footer-top__img-qrcode {\\n    display: flex !important;\\n    flex-wrap: wrap;\\n    margin-top: 4px;\\n  }\\n  .footer-bottom {\\n    border: none;\\n    text-align: left;\\n    padding: 0 16px 40px;\\n  }\\n  .footer-bottom__wrap {\\n    margin-top: 32px;\\n  }\\n  .footer-bottom__wrap .footer-bottom__row + .footer-bottom__row {\\n    margin-top: 14px;\\n  }\\n  .footer-bottom__row {\\n    text-align: left;\\n  }\\n  .footer-bottom__row + .footer-bottom__row {\\n    margin-top: 14px;\\n    margin-left: 0;\\n  }\\n  .footer-bottom__row-item {\\n    display: block;\\n    white-space: normal;\\n  }\\n  .footer-bottom__row-item + .footer-bottom__row-item {\\n    margin-top: 14px;\\n    margin-left: 0;\\n  }\\n}\\n@media (max-width: 379px) {\\n  .footer-top-logo-wrap {\\n    flex-wrap: wrap;\\n  }\\n  .footer-top__go-tap {\\n    margin-top: 20px;\\n  }\\n}\\n@media (max-width: 1279px) {\\n  .footer-en .footer-top__columns {\\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\\n    justify-content: flex-start;\\n  }\\n  .footer-en .footer-top__column {\\n    margin-right: 40px !important;\\n    margin-bottom: 32px;\\n  }\\n  .footer-en .footer-top {\\n    padding-bottom: 0;\\n  }\\n  .footer-en .footer-top__column-qrcode {\\n    display: flex !important;\\n  }\\n  .footer-en .footer-top__qrcode {\\n    display: none !important;\\n  }\\n  .footer-en .footer-bottom__row {\\n    margin-top: 0 !important;\\n    margin-left: 0;\\n  }\\n  .footer-en .footer-bottom__row-item + .footer-bottom__row-item {\\n    margin-left: 16px;\\n  }\\n}\\n@media (max-width: 940px) {\\n  .footer-en .footer-top__column {\\n    margin-right: 20px !important;\\n  }\\n  .footer-en .footer-top__column:nth-child(6) {\\n    margin-right: 0px !important;\\n  }\\n}\\n@media (max-width: 767px) {\\n  .footer-en .footer-top__column-qrcode {\\n    display: none !important;\\n  }\\n  .footer-en .footer-bottom__row-item + .footer-bottom__row-item {\\n    margin-left: 0;\\n  }\\n  .footer-en .footer-bottom__row:last-child {\\n    margin-top: 14px !important;\\n  }\\n}\\n@media (max-width: 427px) {\\n  .footer-en .footer-top-logo-wrap {\\n    flex-wrap: wrap;\\n  }\\n  .footer-en .footer-top__go-tap {\\n    margin-top: 20px;\\n  }\\n}\\n</style>\\n"],"names":[],"mappings":"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"}`
};
function dt(n) {
  const e = new URL(n);
  return e.pathname = "/forum/g28", e.toString();
}
const Ot = ne((n, e, t, o) => {
  let A, i, r, g, a, s, M;
  M = oe(ie, (I) => s = I);
  let { track: l } = e, { publishGameUrl: u = "/store" } = e, { language: c = U.zh_CN } = e, { tapUrl: C = "https://www.taptap.cn" } = e, { discordUrl: N = "https://discord.gg/ZyuM66bAwx" } = e;
  const p = (/* @__PURE__ */ new Date()).getFullYear();
  return e.track === void 0 && t.track && l !== void 0 && t.track(l), e.publishGameUrl === void 0 && t.publishGameUrl && u !== void 0 && t.publishGameUrl(u), e.language === void 0 && t.language && c !== void 0 && t.language(c), e.tapUrl === void 0 && t.tapUrl && C !== void 0 && t.tapUrl(C), e.discordUrl === void 0 && t.discordUrl && N !== void 0 && t.discordUrl(N), n.css.add(ft), s.changeLanguage(c), A = dt(C), i = [
    {
      title: s.t("store"),
      items: [
        {
          name: s.t("publish_game"),
          track: j.FooterStorePublish,
          href: u
        }
      ]
    },
    {
      title: s.t("game_service"),
      items: [
        {
          name: s.t("develop_and_build"),
          href: "/service#developer-and-build",
          track: j.FooterServiceDevelopBuild
        },
        {
          name: s.t("operate_tool"),
          href: "/service#operation-tools",
          track: j.FooterServiceOperationTools
        },
        {
          name: s.t("revenue_tools"),
          href: "/service#revenue-tools",
          track: j.FooterServiceRevenue
        }
      ]
    },
    {
      title: s.t("commercialization"),
      items: [
        {
          name: s.t("ad"),
          href: "https://biz.taptap.com/?currentLang=zh_CN",
          track: j.FooterCommercializationAd,
          blank: !0
        },
        {
          name: s.t("rep"),
          track: j.FooterCommercializationRep,
          href: "https://rep.taptap.cn/",
          blank: !0
        },
        {
          name: s.t("cmp"),
          track: j.FooterCommercializationCmp,
          href: "https://tapu.taptap.cn/",
          blank: !0
        }
      ]
    },
    {
      title: s.t("community"),
      items: [
        {
          name: s.t("tds_tutorials"),
          href: "/tds-tutorials/list",
          track: j.FooterCommunityTutorials
        },
        {
          name: s.t("developer_forum"),
          href: A,
          track: j.FooterCommunityForum,
          blank: !0
        },
        {
          name: s.t("tds_document"),
          href: "/docs",
          track: j.FooterCommunityDocument
        },
        {
          name: s.t("developer_blog"),
          href: "https://blog.taptap.dev/",
          track: j.FooterCommunityBlog,
          blank: !0
        },
        {
          name: s.t("project_torch"),
          href: "/project-torch",
          track: j.FooterCommunityProjectTorch
        }
      ]
    },
    {
      title: s.t("other"),
      items: [
        {
          name: s.t("tds_status"),
          href: "https://tdsstatus.cn/",
          track: j.FooterOtherStatus,
          blank: !0
        },
        {
          name: s.t("service_terms"),
          href: "https://www.taptap.cn/doc/terms/",
          track: j.FooterOtherTerms,
          blank: !0
        },
        {
          name: s.t("privacy_policy"),
          href: "https://www.taptap.cn/doc/privacy-policy/",
          track: j.FooterOtherPrivacyPolicy,
          blank: !0
        },
        {
          name: s.t("copyright"),
          href: "https://www.taptap.cn/doc/27/",
          track: j.FooterOtherCopyright,
          blank: !0
        }
      ]
    }
  ], r = [
    {
      name: s.t("ICP"),
      url: "https://beian.miit.gov.cn",
      key: "footer-ICP"
    },
    {
      name: s.t("web_number"),
      url: "https://www.taptap.cn/license/www.html",
      key: "footer-web-number"
    },
    {
      name: s.t("business_license"),
      url: "https://www.taptap.cn/license/www.html",
      key: "footer-business-license"
    },
    {
      name: s.t("network_security"),
      url: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402003255",
      key: "footer-network-security",
      img: Ye
    },
    {
      name: s.t("sh_reporting_center"),
      url: "https://www.shjbzx.cn/",
      key: "footer-internet-reporting-center",
      img: _e
    },
    {
      name: s.t("report_harmful_information"),
      url: "https://www.12377.cn/",
      key: "footer-report-harmful-information",
      img: Be
    }
  ], g = r.slice(0, 3), a = r.slice(3), M(), `<footer class="${["footer svelte-1votmuj", s.language === U.en ? "footer-en" : ""].join(" ").trim()}"><div class="footer-top svelte-1votmuj"><div class="footer-top-logo-wrap svelte-1votmuj"><div class="footer-top__logo svelte-1votmuj">${G(jt, "Logo").$$render(n, {}, {}, {})}</div> <a${f("data-cy", j.FooterTapBtn, 0)}${f("href", C, 0)} target="_blank" class="footer-top__go-tap svelte-1votmuj"><span class="footer-top__go-tap-text svelte-1votmuj">${d(s.t("go_tap"))}</span> <img${f("src", be, 0)} class="footer-top__go-tap-icon svelte-1votmuj" alt=""></a></div> <div class="footer-top__columns svelte-1votmuj">${S(i, (I) => `<div class="footer-top__column svelte-1votmuj"><div class="footer-top__column-title svelte-1votmuj">${d(I.title)}</div> ${S(I.items, (D) => `<a${f("data-cy", D.track, 0)}${f("href", D.href, 0)}${f("target", D.blank ? "_blank" : "_self", 0)} class="footer-top__column-item svelte-1votmuj">${d(D.name)} </a>`)} </div>`)} <div class="footer-top__column svelte-1votmuj"><div class="footer-top__column-title svelte-1votmuj">${d(s.t("contact_or_follow_us"))}</div> <span class="footer-top__column-item email svelte-1votmuj">${d(s.t("cooperation_email"))} <a${f("data-cy", j.FooterEmailCooperation, 0)} href="mailto:cooperation@taptap.com" target="_blank" rel="noopener noreferrer" class="${[
    "email-link svelte-1votmuj",
    s.language === U.en ? "no-margin" : ""
  ].join(" ").trim()}">cooperation@taptap.com</a></span> <span class="footer-top__column-item email svelte-1votmuj">${d(s.t("operate_email"))} <a${f("data-cy", j.FooterEmailOperation, 0)} href="mailto:operation@taptap.com" target="_blank" rel="noopener noreferrer" class="${[
    "email-link svelte-1votmuj",
    s.language === U.en ? "no-margin" : ""
  ].join(" ").trim()}">operation@taptap.com</a></span> <div class="footer-top__column-qrcode svelte-1votmuj">${G(te, "QrcodeGroup").$$render(n, { discordUrl: N }, {}, {})}</div></div> <div class="footer-top__qrcode svelte-1votmuj">${G(te, "QrcodeGroup").$$render(n, { discordUrl: N }, {}, {})}</div> <div class="footer-top__img-qrcode svelte-1votmuj">${G(te, "QrcodeGroup").$$render(n, { direct: !0, discordUrl: N }, {}, {})}</div></div></div> <div class="footer-bottom svelte-1votmuj"><div class="footer-bottom__row svelte-1votmuj"><span class="footer-bottom__row-item svelte-1votmuj">${d(s.t("company_name"))}</span> <span class="footer-bottom__row-item svelte-1votmuj">${d(s.t("company_address"))}</span> <span class="footer-bottom__row-item svelte-1votmuj">${d(s.t("registered_address"))}</span> <span class="footer-bottom__row-item svelte-1votmuj">©${d(p)} TapTap</span></div> <div class="footer-bottom__wrap svelte-1votmuj"><div class="footer-bottom__row svelte-1votmuj">${S(g, (I) => `<a class="footer-bottom__row-item link svelte-1votmuj" target="_blank" rel="noreferrer nofollow noopener"${f("href", I.url, 0)}${f("data-cy", I.key, 0)}>${d(I.name)} </a>`)}</div> <div class="footer-bottom__row svelte-1votmuj">${S(a, (I) => `<a class="footer-bottom__row-item link svelte-1votmuj" target="_blank" rel="noreferrer nofollow noopener"${f("href", I.url, 0)}${f("data-cy", I.key, 0)}>${I.img ? `<img class="department-icon svelte-1votmuj"${f("src", I.img, 0)} alt="network_security">` : ""} ${d(I.name)} </a>`)}</div></div></div> </footer>`;
});
export {
  Ot as Footer,
  U as Language
};
