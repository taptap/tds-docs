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
  developer_service: "",
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
    tencent_video: "微信视频号",
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
  report_harmful_information: "网上有害信息举报专区",
  language:"zh",
  logoImg:"data:image/png+xml;base64,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"

}, ut = {
  translation: at
}, Mt = {
  developer_service: "",
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
  report_harmful_information: "Online Harmful Information Reporting Center.",
  language:"en",
  logoImg:"data:image/png+xml;base64,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"

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
  ].join(" ").trim()}">${g ? `${S(A, (s) => `<div class="qrcode-group-column svelte-1p50smn"><img class="qrcode-group-column__img svelte-1p50smn"${f("src", s.img, 0)} alt=""> <span class="qrcode-group-column__text svelte-1p50smn">${d(s.name)}</span> </div>`)} <div class="qrcode-group-wrap svelte-1p50smn"></div>` : `${S(A, (s) => `<div class="qrcode-group-item-wrap svelte-1p50smn"><div class="qrcode-group-item svelte-1p50smn"><img class="qrcode-group-item__icon svelte-1p50smn"${f("src", s.icon, 0)} alt=""></div> <div class="popover svelte-1p50smn"><img class="popover-img svelte-1p50smn"${f("src", s.img, 0)} alt=""> <span class="popover-text svelte-1p50smn">${d(s.nameWithAction)}</span></div> </div>`)} `} </div>`;
}),





 mt = "data:image/svg+xml;base64,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"

const Dt = {
  code: ".logo.svelte-q6sm0c{display:flex;align-items:center}.logo-img.svelte-q6sm0c{width:182px;height:24px;background-size:cover}.logo-text.svelte-q6sm0c{margin-right:12px;margin-left:6px;font-weight:500;font-size:18px;line-height:24px;color:#FFFFFF}",
  map: `{"version":3,"file":"Logo.svelte","sources":["Logo.svelte"],"sourcesContent":["<script lang=\\"ts\\">import LogoImg from '../assets/logo.svg';\\nimport i18n from '../service/i18n';\\n<\/script>\\n\\n<div class=\\"logo flex-align-center\\">\\n  <div class=\\"logo-img\\" style=\\"background-image: url({LogoImg})\\" />\\n  <span class=\\"logo-text\\">{$i18n.t('developer_service')}</span>\\n</div>\\n\\n<style lang=\\"less\\">.logo {\\n  display: flex;\\n  align-items: center;\\n}\\n.logo-img {\\n  width: 182px;\\n  height: 24px;\\n  background-size: cover;\\n}\\n.logo-text {\\n  margin-right: 12px;\\n  margin-left: 6px;\\n  font-weight: 500;\\n  font-size: 18px;\\n  line-height: 24px;\\n  color: #FFFFFF;\\n}\\n</style>\\n"],"names":[],"mappings":"AASmB,mBAAM,CACvB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACf,CACA,uBAAU,CACR,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,eAAe,CAAE,KACnB,CACA,wBAAW,CACT,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OACT"}`
}, jt = ne((n, e, t, o) => {
  let s,M;
  
 
  M = oe(ie, (I) => s = I);
  console.log(s.t("language").toString()=="zh")
  if (s.t("language").toString()=="zh"){
     }


  let A, i;

  return i = oe(ie, (r) => A = r), n.css.add(Dt), i(), `<div class="logo flex-align-center svelte-q6sm0c"><div class="logo-img svelte-q6sm0c" style="${"background-image: url(" + d(s.t("logoImg"), !0) + ")"}"></div></div>`;
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
