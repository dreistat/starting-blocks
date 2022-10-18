var ye = Object.defineProperty;
var me = (o, i, e) => i in o ? ye(o, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[i] = e;
var l = (o, i, e) => (me(o, typeof i != "symbol" ? i + "" : i, e), e);
const W = "SB_BEFORE_PAGE_LOAD", V = "SB_AFTER_PAGE_LOAD", X = "SB_AFTER_DOM_APPENDED", Y = "SB_CONTAINER_READY", K = "SB_AFTER_PAGE_BOOT", J = "SB_TRANSITION_START", Q = "SB_TRANSITION_COMPLETE", Z = "SB_BEFORE_SPLASHSCREEN_HIDE", Se = "SB_START_SPLASHSCREEN_HIDE", ee = "SB_AFTER_SPLASHSCREEN_HIDE", Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BEFORE_PAGE_LOAD: W,
  AFTER_PAGE_LOAD: V,
  AFTER_DOM_APPENDED: X,
  CONTAINER_READY: Y,
  AFTER_PAGE_BOOT: K,
  TRANSITION_START: J,
  TRANSITION_COMPLETE: Q,
  BEFORE_SPLASHSCREEN_HIDE: Z,
  START_SPLASHSCREEN_HIDE: Se,
  AFTER_SPLASHSCREEN_HIDE: ee
}, Symbol.toStringTag, { value: "Module" }));
var D = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, H = { exports: {} };
(function(o, i) {
  (function(e) {
    var t, n = ".", c = "function", u = "string", p = "__global__", g = "Provider", _ = 0, x = Array.prototype.slice, te = function(r, s) {
      var a = r[s];
      if (a === e && t.config.strict)
        throw new Error("Bottle was unable to resolve a service.  `" + s + "` is undefined.");
      return a;
    }, T = function(r) {
      var s;
      return this.nested[r] || (s = t.pop(), this.nested[r] = s, this.factory(r, function() {
        return s.container;
      })), this.nested[r];
    }, R = function(r) {
      return r.split(n).reduce(te, this);
    }, ie = function(r, s, a, h) {
      var f = {
        configurable: !0,
        enumerable: !0
      };
      return r.length ? f.get = function() {
        var S = 0, E = function(P) {
          if (P)
            throw P;
          r[S] && r[S++](a, E);
        };
        return E(), a;
      } : (f.value = a, f.writable = !0), Object.defineProperty(h, s, f), h[s];
    }, re = function(r, s) {
      var a, h;
      return typeof r === c && (s = r, r = p), a = r.split(n), h = a.shift(), a.length ? T.call(this, h).middleware(a.join(n), s) : (this.middlewares[h] || (this.middlewares[h] = []), this.middlewares[h].push(s)), this;
    }, ne = function(r, s) {
      return s(r);
    }, O = function(r, s) {
      return (r[s] || []).concat(r.__global__ || []);
    }, se = function(r, s) {
      var a, h, f, m, S;
      return this.id, f = this.container, m = this.decorators, S = this.middlewares, a = r + g, h = /* @__PURE__ */ Object.create(null), h[a] = {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var A = new s();
          return delete f[a], f[a] = A, A;
        }
      }, h[r] = {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var A = f[a], P;
          return A && (P = O(m, r).reduce(ne, A.$get(f)), delete f[a], delete f[r]), P === e ? P : ie(
            O(S, r),
            r,
            P,
            f
          );
        }
      }, Object.defineProperties(f, h), this;
    }, I = function(r, s) {
      var a, h;
      return a = r.split(n), this.providerMap[r] && a.length === 1 && !this.container[r + g] ? console.error(r + " provider already instantiated.") : (this.originalProviders[r] = s, this.providerMap[r] = !0, h = a.shift(), a.length ? (T.call(this, h).provider(a.join(n), s), this) : se.call(this, h, s));
    }, F = function(r, s) {
      return I.call(this, r, function() {
        this.$get = s;
      });
    }, N = function(r, s, a) {
      var h = arguments.length > 3 ? x.call(arguments, 3) : [], f = this;
      return F.call(this, r, function() {
        var S = s, E = h.map(R, f.container);
        return a ? new (s.bind.apply(s, [null].concat(E)))() : S.apply(null, E);
      });
    }, oe = function(r, s) {
      return N.apply(this, [r, s, !0].concat(x.call(arguments, 2)));
    }, ae = function(r, s) {
      return N.apply(this, [r, s, !1].concat(x.call(arguments, 2)));
    }, j = function(r, s) {
      Object.defineProperty(this, r, {
        configurable: !0,
        enumerable: !0,
        value: s,
        writable: !0
      });
    }, M = function(r, s) {
      var a = r[s];
      return a || (a = {}, j.call(r, s, a)), a;
    }, ce = function(r, s) {
      var a;
      return a = r.split(n), r = a.pop(), j.call(a.reduce(M, this.container), r, s), this;
    }, le = function(r, s) {
      Object.defineProperty(this, r, {
        configurable: !1,
        enumerable: !0,
        value: s,
        writable: !1
      });
    }, ue = function(r, s) {
      var a = r.split(n);
      return r = a.pop(), le.call(a.reduce(M, this.container), r, s), this;
    }, $ = function(r, s) {
      var a, h;
      return typeof r === c && (s = r, r = p), a = r.split(n), h = a.shift(), a.length ? T.call(this, h).decorator(a.join(n), s) : (this.decorators[h] || (this.decorators[h] = []), this.decorators[h].push(s)), this;
    }, de = function(r) {
      return this.deferred.push(r), this;
    }, he = function(r) {
      return (r || []).map(R, this.container);
    }, fe = function(r, s) {
      return F.call(this, r, function(h) {
        return {
          instance: s.bind(s, h)
        };
      });
    }, ge = function(r) {
      return !/^\$(?:decorator|register|list)$|Provider$/.test(r);
    }, L = function(r) {
      return Object.keys(r || this.container || {}).filter(ge);
    }, B = {}, pe = function(r) {
      var s;
      return typeof r === u ? (s = B[r], s || (B[r] = s = new t(), s.constant("BOTTLE_NAME", r)), s) : new t();
    }, ve = function(r) {
      typeof r === u ? delete B[r] : B = {};
    }, G = function(r) {
      var s = r.$value === e ? r : r.$value;
      return this[r.$type || "service"].apply(this, [r.$name, s].concat(r.$inject || []));
    }, z = function(r) {
      delete this.providerMap[r], delete this.container[r], delete this.container[r + g];
    }, we = function(r) {
      var s = this.originalProviders, a = Array.isArray(r);
      Object.keys(this.originalProviders).forEach(function(f) {
        if (!(a && r.indexOf(f) === -1)) {
          var m = f.split(n);
          m.length > 1 && m.forEach(z, T.call(this, m[0])), z.call(this, f), this.provider(f, s[f]);
        }
      }, this);
    }, be = function(r) {
      return this.deferred.forEach(function(a) {
        a(r);
      }), this;
    };
    t = function d(r) {
      if (!(this instanceof d))
        return d.pop(r);
      this.id = _++, this.decorators = {}, this.middlewares = {}, this.nested = {}, this.providerMap = {}, this.originalProviders = {}, this.deferred = [], this.container = {
        $decorator: $.bind(this),
        $register: G.bind(this),
        $list: L.bind(this)
      };
    }, t.prototype = {
      constant: ue,
      decorator: $,
      defer: de,
      digest: he,
      factory: F,
      instanceFactory: fe,
      list: L,
      middleware: re,
      provider: I,
      resetProviders: we,
      register: G,
      resolve: be,
      service: oe,
      serviceFactory: ae,
      value: ce
    }, t.pop = pe, t.clear = ve, t.list = L, t.config = {
      strict: !1
    };
    var q = {
      function: !0,
      object: !0
    };
    (function(r) {
      var s = i && !i.nodeType && i, a = o && !o.nodeType && o, h = a && a.exports === s && s, f = q[typeof D] && D;
      f && (f.global === f || f.window === f) && (r = f), typeof e === c && typeof e.amd == "object" && e.amd ? (r.Bottle = t, e(function() {
        return t;
      })) : s && a ? h ? (a.exports = t).Bottle = t : s.Bottle = t : r.Bottle = t;
    })(q[typeof window] && window || this);
  }).call(D);
})(H, H.exports);
const Ee = H.exports;
function w(o, i = "") {
  window.startingBlocksDebugLevel === 1 && console.debug(`%c[SB] %c${o}`, "color:#749f73", "color:debug", i);
}
function Pe(...o) {
  window.startingBlocksDebugLevel === 1 && console.warn("[SB]", ...o);
}
class b {
  static commit(i, e) {
    const t = new window.CustomEvent(i, { detail: e });
    w("\u{1F6A9} Dispatched " + i), window.dispatchEvent(t);
  }
}
class ke extends Error {
  constructor(i) {
    super(`Service "${i}" is not defined`), this.name = "UnknownServiceException";
  }
}
class Ae extends Error {
  constructor(i, e) {
    super(`Object of type "${i}" needs "${e}" service`), this.name = "DependencyNotFulfilledException";
  }
}
class y {
  constructor(i = {}, e = "AbstractService", t = ["Config"]) {
    l(this, "_container");
    l(this, "_serviceName");
    this._container = i, this._serviceName = e, this.checkDependencies(t);
  }
  init() {
  }
  hasService(i) {
    return this._container.hasOwnProperty(i);
  }
  checkDependencies(i = []) {
    for (const e of i)
      if (!this.hasService(e))
        throw new Ae(this._serviceName, e);
  }
  getService(i) {
    if (!this.hasService(i))
      throw new ke(i);
    return this._container[i];
  }
  get serviceName() {
    return this._serviceName;
  }
  set serviceName(i) {
    this._serviceName = i;
  }
  get container() {
    return this._container;
  }
  set container(i) {
    this._container = i;
  }
}
class C extends y {
  boot() {
  }
}
class Te extends C {
  constructor(e, t = "PageBuilder") {
    super(e, t, ["Dom"]);
    l(this, "page");
    w(`\u2615\uFE0F ${t} awake`), this.page = null, this.buildPage = this.buildPage.bind(this);
  }
  boot() {
    super.boot(), this.buildPage(this.getService("Dom").getContainer(), "static");
  }
  async buildPage(e, t = "ajax") {
    let n = this.getService("Dom").getNodeType(e);
    return this.hasService(n) ? this.page = this.getService(n).instance() : (n = "DefaultPage", this.page = this.getService("DefaultPage").instance()), this.page.type = n, this.page.context = t, this.page.id = e.id, this.page.rootElement = e, this.page.name = e.hasAttribute("data-node-name") ? e.getAttribute("data-node-name") : "", this.page.metaTitle = e.hasAttribute("data-meta-title") ? e.getAttribute("data-meta-title") : "", this.page.isHome = e.getAttribute("data-is-home") === "1", await this.page.init(), b.commit(K, this.page), this.hasService("Splashscreen") && !this.getService("Splashscreen").splashscreenHidden && (b.commit(Z, this.page), this.getService("Splashscreen").hide().then(() => {
      b.commit(ee, this.page), this.getService("Splashscreen").splashscreenHidden = !0;
    })), this.page;
  }
}
class Be extends y {
  async getBlockInstance(i) {
    return null;
  }
}
class Ce extends Be {
  constructor(i, e = "BlockBuilder") {
    super(i, e), w(`\u2615\uFE0F ${e} awake`);
  }
  async getBlockInstance(i) {
    return this.hasService(i) ? this.getService(i).instance() : null;
  }
}
class _e extends y {
  constructor(e, t = "Dom") {
    super(e, t);
    l(this, "currentHTML");
    w(`\u2615\uFE0F ${t} awake`), this.currentHTML = document.documentElement.innerHTML;
  }
  parseResponse(e) {
    this.currentHTML = e;
    const t = document.createElement("div");
    return t.innerHTML = e, this.getContainer(t);
  }
  getWrapper() {
    const e = document.getElementById(this.getService("Config").wrapperId);
    if (!e)
      throw new Error("Starting Blocks: Wrapper not found!");
    return e;
  }
  getNodeType(e) {
    return e.getAttribute(this.getService("Config").objectTypeAttr);
  }
  getContainer(e = null) {
    if (e || (e = document.body), !e)
      throw new Error("Starting Blocks: DOM not ready!");
    const t = this.parseContainer(e);
    if (!t)
      throw new Error(`Starting Blocks: container not found! Did you use at least
            one dom element with ".${this.getService("Config").pageClass}" class and "data-node-type" attribute?`);
    return t;
  }
  putContainer(e) {
    e.style.visibility = "hidden", this.getWrapper().appendChild(e), b.commit(X, {
      element: e,
      currentHTML: this.getService("Dom").currentHTML
    });
  }
  parseContainer(e) {
    return e.querySelector(`.${this.getService("Config").pageClass}[data-node-type]`);
  }
  updateBodyAttributes(e) {
    e.name && (document.body.id = e.name, document.body.classList.add(e.name)), document.body.classList.add(e.type), e.isHome ? document.body.setAttribute("data-is-home", "1") : document.body.setAttribute("data-is-home", "0");
  }
  updatePageTitle(e) {
    e.metaTitle && (document.title = e.metaTitle);
  }
}
function U(o, i, e) {
  let t;
  return function() {
    let n = this, c = arguments, u = function() {
      t = null, e || o.apply(n, Array.from(c));
    };
    const p = e && !t;
    t && clearTimeout(t), t = window.setTimeout(u, i), p && o.apply(n, Array.from(c));
  };
}
class xe extends y {
  constructor(e) {
    super(e, "AbstractPage");
    l(this, "rootElement");
    l(this, "id");
    l(this, "context");
    l(this, "type");
    l(this, "isHome");
    l(this, "blocks");
    l(this, "name");
    l(this, "metaTitle");
    l(this, "onResizeDebounce");
    l(this, "bindedUpdateBlocks");
    l(this, "blockElements");
    l(this, "blockLength");
    l(this, "domObserver");
    this.rootElement = null, this.id = null, this.context = null, this.type = null, this.isHome = null, this.blocks = [], this.name = null, this.metaTitle = null, this.blockLength = null, this.blockElements = null, this.domObserver = null, this.onResize = this.onResize.bind(this), this.onResizeDebounce = U(this.onResize, 50, !1), this.bindedUpdateBlocks = U(this.updateBlocks.bind(this), 50, !1);
  }
  async init() {
    var e;
    w("\u2733\uFE0F #" + this.id + " %c[" + this.type + "] [" + this.context + "]", "color:grey"), this.blockElements = [...Array.from((e = this.rootElement) == null ? void 0 : e.querySelectorAll(`.${this.getService("Config").pageBlockClass}`))], this.blockLength = this.blockElements.length, this.blockLength && await this.initBlocks(), this.initEvents();
  }
  destroy() {
    var e, t, n, c;
    if (w("\u{1F5D1}\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey"), (t = (e = this.rootElement) == null ? void 0 : e.parentNode) == null || t.removeChild(this.rootElement), this.destroyEvents(), this.getService("PageBuilder").page !== null && this.getService("PageBuilder").page.name !== this.name && document.body.classList.remove((n = this.name) != null ? n : ""), this.getService("PageBuilder").page !== null && this.getService("PageBuilder").page.type !== this.type && document.body.classList.remove((c = this.type) != null ? c : ""), this.blocks !== null)
      for (let u in this.blocks)
        this.blocks.hasOwnProperty(u) && this.blocks[u].destroy();
  }
  initEvents() {
    window.addEventListener("resize", this.onResizeDebounce), this.domObserver = new window.MutationObserver(this.bindedUpdateBlocks), this.domObserver.observe(this.rootElement, {
      childList: !0,
      attributes: !1,
      characterData: !1,
      subtree: !0
    });
  }
  destroyEvents() {
    window.removeEventListener("resize", this.onResizeDebounce), this.domObserver.disconnect();
  }
  async initBlocks() {
    for (let e = 0; e < this.blockLength; e++) {
      let t = await this.initSingleBlock(this.blockElements[e]);
      t && this.blocks.push(t);
    }
    for (let e = this.blocks.length - 1; e >= 0; e--)
      typeof this.blocks[e].onPageReady == "function" && this.blocks[e].onPageReady();
  }
  async updateBlocks() {
    var e;
    w("	\u{1F4EF} Page DOM changed\u2026"), this.blockElements = Array.from((e = this.rootElement) == null ? void 0 : e.querySelectorAll(`.${this.getService("Config").pageBlockClass}`)), this.blockLength = this.blockElements.length;
    for (let t = 0; t < this.blockLength; t++) {
      let n = this.blockElements[t];
      const c = this.getBlockById(n.id);
      if (!n.id)
        break;
      if (c === null)
        try {
          let u = await this.initSingleBlock(this.blockElements[t]);
          u && (this.blocks.push(u), u.onPageReady());
        } catch (u) {
          Pe(u.message);
        }
    }
  }
  async initSingleBlock(e) {
    if (!e.id)
      return null;
    let t = e.getAttribute(this.getService("Config").objectTypeAttr), n = await this.getService("BlockBuilder").getBlockInstance(t);
    return n ? (n.type = t, n.page = this, n.rootElement = e, n.id = e.id, n.name = e.hasAttribute("data-node-name") ? e.getAttribute("data-node-name") : "", n.init(), n.initEvents(), n) : null;
  }
  getBlockById(e) {
    for (const t of this.blocks)
      if (t.id && t.id === e)
        return t;
    return null;
  }
  getBlockIndexById(e) {
    const t = this.blocks.length;
    for (let n = 0; n < t; n++)
      if (this.blocks[n].id && this.blocks[n].id === e)
        return n;
    return null;
  }
  getFirstBlockByType(e) {
    const t = this.getFirstBlockIndexByType(e);
    return t && this.blocks[t] ? this.blocks[t] : null;
  }
  getFirstBlockIndexByType(e) {
    const t = this.blocks.length;
    for (let n = 0; n < t; n++)
      if (this.blocks[n].type && this.blocks[n].type === e)
        return n;
    return null;
  }
  onResize() {
    for (const e of this.blocks)
      e.onResize();
  }
}
class Fe extends xe {
  constructor(i) {
    super(i);
  }
}
const Le = {
  defaults: {
    wrapperId: "sb-wrapper",
    pageBlockClass: "page-block",
    pageClass: "page-content",
    objectTypeAttr: "data-node-type",
    noAjaxLinkClass: "no-ajax-link",
    noPrefetchClass: "no-prefetch",
    manualDomAppend: !1,
    debug: 0
  }
};
class Ne {
  constructor(i = {}) {
    l(this, "bottle");
    l(this, "bootables");
    this.bottle = new Ee(), this.bootables = [], this.bottle.value("Config", {
      ...Le.defaults,
      ...i
    }), window.startingBlocksDebugLevel = this.bottle.container.Config.debug, this.provider("Dom", _e), this.provider("BlockBuilder", Ce), this.instanceFactory("DefaultPage", (e) => new Fe(e));
  }
  provider(i, e, ...t) {
    if (!i || !e)
      throw new Error("A parameter is missing");
    this.bottle.provider(i, function() {
      this.$get = (n) => new e(n, ...t);
    });
  }
  factory(i, e) {
    this.bottle.factory(i, e);
  }
  instanceFactory(i, e) {
    this.bottle.instanceFactory(i, e);
  }
  bootableProvider(i, e, ...t) {
    this.provider(i, e, ...t), this.bootables.push(i);
  }
  boot() {
    this.bootableProvider("PageBuilder", Te);
    for (const i of this.bootables)
      this.bottle.container.hasOwnProperty(i) && this.bottle.container[i].boot();
  }
}
class v {
  static stripTrailingSlash(i) {
    return i.substring(-1) === "/" ? i.substring(0, i.length - 1) : i;
  }
  static getPort(i = void 0) {
    const e = typeof i < "u" ? i : window.location.port, t = window.location.protocol;
    return e !== "" ? parseInt(e) : t === "http:" ? 80 : t === "https:" ? 443 : null;
  }
  static cleanLink(i) {
    return i.replace(/#.*/, "");
  }
  static getCurrentUrl() {
    return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
  }
  static requestTimeout() {
    return 1e4;
  }
  static async request(i) {
    const e = v.deferred(), t = window.setTimeout(() => {
      window.clearTimeout(t), e.reject("timeout!");
    }, v.requestTimeout()), n = new window.Headers();
    return n.append("X-Starting-Blocks", "yes"), n.append("X-Allow-Partial", "yes"), n.append("X-Requested-With", "XMLHttpRequest"), window.fetch(i, {
      method: "GET",
      headers: n,
      cache: "default",
      credentials: "same-origin"
    }).then((c) => {
      if (window.clearTimeout(t), c.status >= 200 && c.status < 300)
        return e.resolve(c.text());
      const u = new Error(c.statusText || c.status.toString());
      return e.reject(u);
    }).catch((c) => {
      window.clearTimeout(t), e.reject(c);
    }), e.promise;
  }
  static logCredits(i, e, t, n, c) {
    let u = "#fff";
    if (typeof c < "u" && (u = c), console.log("%c   ", "font-size:3px;"), console.log("%c" + i, "background:" + e + "; color: " + u + "; font-size:14px; padding:5px 10px;"), console.log("%c   ", "font-size:3px;"), t !== null) {
      let p = t.length;
      if (p)
        for (let g = 0; g < p; g++)
          console.log(t[g].name + " - " + t[g].website);
    }
    if (n !== null) {
      let p = n.length;
      if (p) {
        console.log("-"), console.log("Thanks to");
        for (let g = 0; g < p; g++)
          console.log(n[g].name + " (" + n[g].website + ")");
      }
    }
    console.log("-"), console.log(" ");
  }
  static getRandomNumber(i, e, t) {
    const n = Math.random() * (e - i) + i;
    return typeof t < "u" ? Number(n.toFixed(t)) : n;
  }
  static getRandomInt(i, e) {
    return Math.floor(Math.random() * (e - i + 1)) + i;
  }
  static trackGoogleAnalytics() {
    typeof window.ga < "u" && (w("\u{1F6A9} Push Analytics for: " + window.location.pathname), window.ga("send", "pageview", {
      page: window.location.pathname,
      title: document.title
    }));
  }
  static getViewportSize() {
    const i = document.documentElement || document.body;
    return "innerWidth" in window ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: i.clientWidth,
      height: i.clientHeight
    };
  }
  static prefixProperty(i) {
    const e = ["", "ms", "Webkit", "Moz", "O"], t = e.length, n = document.createElement("div");
    for (let c = 0; c < t; c++) {
      let u = e[c];
      const p = u === "" ? i : i.charAt(0).toUpperCase() + i.substring(1).toLowerCase(), g = u + p;
      if (typeof n.style[g] < "u")
        return g;
    }
    return null;
  }
  static getNormRatio(i, e, t) {
    return i < e ? 0 : i > t || i === t ? 1 : (i - e) / (t - e);
  }
  static deferred() {
    return function() {
      let i = null, e = null, t = new Promise((n, c) => {
        i = n, e = c;
      });
      return {
        resolve: i,
        reject: e,
        promise: t
      };
    }();
  }
}
class De extends y {
  constructor(e, t = "Transition", n = []) {
    super(e, t, n);
    l(this, "oldPage");
    l(this, "newPage");
    l(this, "newPageLoading");
    l(this, "originElement");
    l(this, "cursorPosition");
    l(this, "_newPagePromise");
    l(this, "deferred");
    l(this, "newPageReady");
    this.oldPage = null, this.newPage = null, this.newPageLoading = null, this.originElement = null, this.cursorPosition = null, this._newPagePromise = null, this.deferred = null, this.newPageReady = null;
  }
  initTransition(e, t, n, c) {
    return this.oldPage = e, this._newPagePromise = t, this.originElement = n, this.cursorPosition = c, this.deferred = v.deferred(), this.newPageReady = v.deferred(), this.newPageLoading = this.newPageReady.promise, this.start(), this._newPagePromise.then((u) => {
      this.newPage = u, this.newPageReady.resolve();
    }), this.deferred.promise;
  }
  done() {
    this.destroyOldPage(), this.newPage.rootElement.style.visibility !== "hidden" && (this.newPage.rootElement.style.visibility = "visible"), this.deferred.resolve();
  }
  scrollTop() {
    document.scrollingElement ? (document.scrollingElement.scrollTop = 0, document.scrollingElement.scrollTo(0, 0)) : (document.body.scrollTop = 0, document.documentElement.scrollTop = 0, window.scrollTo(0, 0));
  }
  destroyOldPage() {
    this.oldPage && (this.oldPage.destroy(), this.oldPage = null);
  }
  async buildNewPage() {
    if (this.container) {
      const e = this.getService("Pjax"), t = this.getService("Dom"), n = this.getService("PageBuilder");
      t.putContainer(e.containerElement), this.newPage = await n.buildPage(e.containerElement), e.onNewPageLoaded(this.newPage);
    }
  }
  start() {
  }
}
class He extends De {
  start() {
    Promise.all([this.newPageLoading]).then(this.finish.bind(this));
  }
  finish() {
    document.body.scrollTop = 0, this.done();
  }
}
class je extends C {
  constructor(e, t = "Pjax") {
    super(e, t, ["Dom", "Config", "History", "PageBuilder"]);
    l(this, "transitionProgress");
    l(this, "containerElement");
    l(this, "currentState");
    l(this, "linkHash");
    w(`\u2615\uFE0F ${t} awake`), this.transitionProgress = !1, this.containerElement = null, this.currentState = null, this.linkHash = null, this.onNewPageLoaded = this.onNewPageLoaded.bind(this), this.onTransitionEnd = this.onTransitionEnd.bind(this), this.onLinkClick = this.onLinkClick.bind(this), this.onStateChange = this.onStateChange.bind(this);
  }
  boot() {
    super.boot(), this.getService("Dom").getWrapper().setAttribute("aria-live", "polite"), this.currentState = this.getService("History").add(this.getCurrentUrl(), null, "static"), this.bindEvents();
  }
  bindEvents() {
    document.addEventListener("click", this.onLinkClick), window.addEventListener("popstate", this.onStateChange);
  }
  getCurrentUrl() {
    return v.cleanLink(v.getCurrentUrl());
  }
  goTo(e, t, n, c) {
    const u = window.scrollY;
    window.history.pushState(null, "", e), window.scrollTo(0, u), this.handleStateChange(t, !0, n, c);
  }
  forceGoTo(e) {
    window.location.href = e;
  }
  async load(e) {
    const t = v.deferred();
    let n = null;
    return this.hasService("CacheProvider") && (n = this.getService("CacheProvider").get(e)), n || (n = v.request(e), this.hasService("CacheProvider") && this.getService("CacheProvider").set(e, n)), n.then(async (c) => {
      if (this.containerElement = this.getService("Dom").parseResponse(c), b.commit(V, {
        container: this.containerElement,
        currentHTML: this.getService("Dom").currentHTML
      }), this.getService("Config").manualDomAppend)
        t.resolve(null);
      else {
        this.getService("Dom").putContainer(this.containerElement);
        const u = await this.getService("PageBuilder").buildPage(this.containerElement);
        t.resolve(u);
      }
    }).catch((c) => {
      console.error(c), this.forceGoTo(e), t.reject();
    }), t.promise;
  }
  getHref(e) {
    return e && typeof e.href == "string" && e.tagName.toUpperCase() === "A" ? e.href : null;
  }
  getTransitionName(e) {
    return e && e.getAttribute && typeof e.getAttribute("data-transition") == "string" ? e.getAttribute("data-transition") : null;
  }
  onLinkClick(e) {
    let t = e.target;
    for (; t && !this.getHref(t); )
      t = t.parentNode;
    if (this.preventCheck(e, t)) {
      e.preventDefault(), this.linkHash = t.hash.split("#")[1];
      const n = this.getHref(t), c = this.getTransitionName(t), u = {
        x: e.clientX,
        y: e.clientY
      };
      this.goTo(n, c, t, u);
    }
  }
  preventCheck(e, t) {
    if (!window.history.pushState)
      return !1;
    const n = this.getHref(t);
    return !t || !n || e.button > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || t.target && t.target === "_blank" || window.location.protocol !== t.protocol || window.location.hostname !== t.hostname || v.getPort() !== v.getPort(t.port) || t.getAttribute && typeof t.getAttribute("download") == "string" || v.cleanLink(n) === v.cleanLink(window.location.href) ? !1 : !t.classList.contains(this.getService("Config").noAjaxLinkClass);
  }
  getTransition(e, t) {
    return this.hasService("TransitionFactory") ? this.getService("TransitionFactory").getTransition(e, t) : new He({});
  }
  onStateChange(e) {
    this.handleStateChange(null, !1, null, null);
  }
  handleStateChange(e = null, t = !1, n = null, c = null) {
    const u = this.getCurrentUrl();
    if (this.transitionProgress && this.forceGoTo(u), this.getService("History").currentStatus().url === u)
      return;
    typeof e == "string" || t ? this.currentState = this.getService("History").add(u, e, "ajax") : this.currentState = this.getService("History").add(u, null, "_history"), b.commit(W, {
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
    const p = this.load(u), g = this.getTransition(
      this.getService("History").prevStatus(),
      this.getService("History").currentStatus()
    );
    this.transitionProgress = !0, b.commit(J, {
      transition: g,
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
    const _ = g.initTransition(
      this.getService("PageBuilder").page,
      p,
      n,
      c
    );
    p.then(this.onNewPageLoaded), _.then(this.onTransitionEnd);
  }
  onNewPageLoaded(e) {
    if (e) {
      const t = this.getService("History").currentStatus();
      this.getService("Dom").updateBodyAttributes(e), this.getService("Dom").updatePageTitle(e), v.trackGoogleAnalytics(), this.currentState && e && !this.currentState.data.title && e.metaTitle && (this.currentState.data.title = e.metaTitle), b.commit(Y, {
        currentStatus: t,
        prevStatus: this.getService("History").prevStatus(),
        currentHTML: this.getService("Dom").currentHTML,
        page: e
      });
    }
  }
  onTransitionEnd() {
    this.transitionProgress = !1, this.linkHash && (window.location.hash = "", window.location.hash = this.linkHash, this.linkHash = null), b.commit(Q, {
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
  }
}
class Me extends y {
  constructor(e, t = "History") {
    super(e, t);
    l(this, "history");
    w(`\u2615\uFE0F ${t} awake`), this.history = [];
  }
  add(e, t, n, c = {}) {
    const u = { url: e, transitionName: t, context: n, data: c };
    return this.history.push(u), u;
  }
  currentStatus() {
    return this.history[this.history.length - 1];
  }
  prevStatus() {
    const e = this.history;
    return e.length < 2 ? null : e[e.length - 2];
  }
}
class $e extends C {
  constructor(i, e = "Prefetch") {
    super(i, e, ["Pjax", "Config"]), w(`\u2615\uFE0F ${e} awake`);
  }
  boot() {
    return super.boot(), window.history.pushState ? (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)), !0) : !1;
  }
  onLinkEnter(i) {
    let e = i.target;
    for (; e && !this.getService("Pjax").getHref(e); )
      e = e.parentNode;
    if (!e || e.classList.contains(this.getService("Config").noPrefetchClass))
      return;
    let t = this.getService("Pjax").getHref(e);
    if (this.getService("Pjax").preventCheck(i, e)) {
      if (this.hasService("CacheProvider") && this.getService("CacheProvider").get(t))
        return;
      let n = v.request(t);
      this.hasService("CacheProvider") && this.getService("CacheProvider").set(t, n);
    }
  }
}
class Ge extends y {
  constructor(e, t = "CacheProvider") {
    super(e, t);
    l(this, "data");
    w(`\u2615\uFE0F ${t} awake`), this.data = {};
  }
  exists(e) {
    return e in this.data;
  }
  get(e) {
    return this.data[e];
  }
  set(e, t) {
    return this.data[e] = t, this;
  }
  reset() {
    this.data = {};
  }
}
class Re extends y {
  constructor(e, t = "AbstractBlock") {
    super(e, t);
    l(this, "type");
    l(this, "page");
    l(this, "rootElement");
    l(this, "id");
    l(this, "name");
    this.type = null, this.page = null, this.rootElement = null, this.id = null, this.name = null;
  }
  init() {
    w("	\u2733\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey");
  }
  initEvents() {
  }
  destroy() {
    w("	\u{1F5D1}\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey"), this.destroyEvents();
  }
  destroyEvents() {
  }
  onResize() {
  }
  onPageReady() {
  }
}
class ze extends Re {
  constructor(e, t = "AbstractInViewBlock") {
    super(e, t);
    l(this, "observer");
    l(this, "observerOptions");
    this.observer = null, this.observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    }, this.onIntersectionCallback = this.onIntersectionCallback.bind(this);
  }
  init() {
    super.init(), this.observer = new window.IntersectionObserver(this.onIntersectionCallback, this.observerOptions), this.observer.observe(this.rootElement);
  }
  destroyEvents() {
    super.destroyEvents(), this.unobserve();
  }
  onIntersectionCallback(e) {
    for (const t of e)
      t.intersectionRatio > 0 ? this.onScreen(t) : this.offScreen(t);
  }
  onScreen(e) {
  }
  offScreen(e) {
  }
  unobserve() {
    this.observer.unobserve(this.rootElement);
  }
}
class qe extends C {
  constructor(e, t = "AbstractSplashscreen") {
    super(e, t);
    l(this, "_splashscreenHidden");
    this._splashscreenHidden = !1;
  }
  set splashscreenHidden(e) {
    this._splashscreenHidden = e;
  }
  get splashscreenHidden() {
    return this._splashscreenHidden;
  }
  hide() {
    return Promise.resolve();
  }
}
class Ue extends y {
  getTransition(i, e) {
  }
}
class k {
  static _preventDefault(i) {
    i.preventDefault && i.preventDefault(), i.returnValue = !1;
  }
  static _keydown(i) {
    let e = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "PageUp", "PageDown", "End", "Home", "Space"];
    for (let t = e.length; t--; )
      if (i.code === e[t]) {
        k._preventDefault(i);
        return;
      }
  }
  static _wheel(i) {
    k._preventDefault(i);
  }
  static disable() {
    window.addEventListener && window.addEventListener("wheel", k._wheel, !1), window.onmousewheel = document.onmousewheel = k._wheel, document.onkeydown = k._keydown;
  }
  static enable() {
    window.removeEventListener && window.removeEventListener("wheel", k._wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }
}
function We() {
  window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(o) {
      window.setTimeout(o, 1e3 / 60);
    };
  }(), window.cancelAnimFrame = function() {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(o) {
      window.clearTimeout(o);
    };
  }();
  {
    let o;
    const i = () => {
    }, e = [
      "assert",
      "clear",
      "count",
      "debug",
      "dir",
      "dirxml",
      "error",
      "exception",
      "group",
      "groupCollapsed",
      "groupEnd",
      "info",
      "log",
      "markTimeline",
      "profile",
      "profileEnd",
      "table",
      "time",
      "timeEnd",
      "timeStamp",
      "trace",
      "warn"
    ];
    let t = e.length;
    const n = window.console = window.console || {};
    for (; t--; )
      o = e[t], n[o] || (n[o] = i);
  }
  Array.from || (Array.from = function(o) {
    return [].slice.call(o);
  }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(o) {
      if (this === null)
        throw new TypeError("Array.prototype.find called on null or undefined");
      if (typeof o != "function")
        throw new TypeError("predicate must be a function");
      let i = Object(this), e = i.length >>> 0, t = arguments[1], n;
      for (let c = 0; c < e; c++)
        if (n = i[c], o.call(t, n, c, i))
          return n;
    }
  }), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function(o) {
      if (this === null)
        throw new TypeError('"this" is null or not defined');
      let i = Object(this), e = i.length >>> 0;
      if (typeof o != "function")
        throw new TypeError("predicate must be a function");
      let t = arguments[1], n = 0;
      for (; n < e; ) {
        let c = i[n];
        if (o.call(t, c, n, i))
          return n;
        n++;
      }
      return -1;
    }
  }), function() {
    if (typeof window.CustomEvent == "function")
      return;
    function o(i, e) {
      e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
      let t = document.createEvent("CustomEvent");
      return t.initCustomEvent(i, e.bubbles, e.cancelable, e.detail), t;
    }
    o.prototype = window.Event.prototype, window.CustomEvent = o;
  }();
}
function Ve() {
  typeof window.ga < "u" && window.addEventListener("error", function(o) {
    const i = o.colno ? " line:" + o.lineno + ", column:" + o.colno : " line:" + o.lineno;
    window.ga(
      "send",
      "event",
      "JavaScript Error",
      o.message,
      o.filename + i + " -> " + navigator.userAgent,
      0,
      !0
    );
  });
}
/*!
 * @name Starting Blocks
 * @license MIT
 * @copyright Copyright © 2018, Rezo Zero
 * @version 5.0.0
 * @author Adrien Scholaert <adrien@rezo-zero.com>
 * @author Ambroise Maupate <ambroise@rezo-zero.com>
 */
export {
  Re as AbstractBlock,
  Be as AbstractBlockBuilder,
  ze as AbstractInViewBlock,
  xe as AbstractPage,
  y as AbstractService,
  qe as AbstractSplashscreen,
  De as AbstractTransition,
  Ue as AbstractTransitionFactory,
  Ce as BlockBuilder,
  Ge as CacheProvider,
  He as DefaultTransition,
  b as Dispatcher,
  Ie as EventTypes,
  Me as History,
  Te as PageBuilder,
  je as Pjax,
  $e as Prefetch,
  k as Scroll,
  v as Utils,
  U as debounce,
  Ne as default,
  Ve as gaTrackErrors,
  We as polyfills
};
