var X = Object.defineProperty;
var K = (n, t, e) => t in n ? X(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var a = (n, t, e) => (K(n, typeof t != "symbol" ? t + "" : t, e), e);
const _ = "SB_BEFORE_PAGE_LOAD", L = "SB_AFTER_PAGE_LOAD", F = "SB_AFTER_DOM_APPENDED", D = "SB_CONTAINER_READY", x = "SB_AFTER_PAGE_BOOT", H = "SB_TRANSITION_START", R = "SB_TRANSITION_COMPLETE", O = "SB_BEFORE_SPLASHSCREEN_HIDE", J = "SB_START_SPLASHSCREEN_HIDE", I = "SB_AFTER_SPLASHSCREEN_HIDE", Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BEFORE_PAGE_LOAD: _,
  AFTER_PAGE_LOAD: L,
  AFTER_DOM_APPENDED: F,
  CONTAINER_READY: D,
  AFTER_PAGE_BOOT: x,
  TRANSITION_START: H,
  TRANSITION_COMPLETE: R,
  BEFORE_SPLASHSCREEN_HIDE: O,
  START_SPLASHSCREEN_HIDE: J,
  AFTER_SPLASHSCREEN_HIDE: I
}, Symbol.toStringTag, { value: "Module" }));
var f, p = ".", N = "function", M = "string", j = "__global__", E = "Provider", Q = 0, P = Array.prototype.slice, Z = function(t, e) {
  var i = t[e];
  if (i === void 0 && f.config.strict)
    throw new Error("Bottle was unable to resolve a service.  `" + e + "` is undefined.");
  return i;
}, m = function(t) {
  var e;
  return this.nested[t] || (e = f.pop(), this.nested[t] = e, this.factory(t, function() {
    return e.container;
  })), this.nested[t];
}, $ = function(t) {
  return t.split(p).reduce(Z, this);
}, ee = function(t, e, i, r) {
  var s = {
    configurable: !0,
    enumerable: !0
  };
  return t.length ? s.get = function() {
    var l = 0, c = function(g) {
      if (g)
        throw g;
      t[l] && t[l++](i, c);
    };
    return c(), i;
  } : (s.value = i, s.writable = !0), Object.defineProperty(r, e, s), r[e];
}, te = function(t, e) {
  var i, r;
  return typeof t === N && (e = t, t = j), i = t.split(p), r = i.shift(), i.length ? m.call(this, r).middleware(i.join(p), e) : (this.middlewares[r] || (this.middlewares[r] = []), this.middlewares[r].push(e)), this;
}, ie = function(t, e) {
  return e(t);
}, T = function(t, e) {
  return (t[e] || []).concat(t.__global__ || []);
}, re = function(t, e) {
  var i, r, s, o, l;
  return this.id, s = this.container, o = this.decorators, l = this.middlewares, i = t + E, r = /* @__PURE__ */ Object.create(null), r[i] = {
    configurable: !0,
    enumerable: !0,
    get: function() {
      var h = new e();
      return delete s[i], s[i] = h, h;
    }
  }, r[t] = {
    configurable: !0,
    enumerable: !0,
    get: function() {
      var h = s[i], g;
      return h && (g = T(o, t).reduce(ie, h.$get(s)), delete s[i], delete s[t]), g === void 0 ? g : ee(
        T(l, t),
        t,
        g,
        s
      );
    }
  }, Object.defineProperties(s, r), this;
}, z = function(t, e) {
  var i, r;
  return i = t.split(p), this.providerMap[t] && i.length === 1 && !this.container[t + E] ? console.error(t + " provider already instantiated.") : (this.originalProviders[t] = e, this.providerMap[t] = !0, r = i.shift(), i.length ? (m.call(this, r).provider(i.join(p), e), this) : re.call(this, r, e));
}, k = function(t, e) {
  return z.call(this, t, function() {
    this.$get = e;
  });
}, G = function(t, e, i) {
  var r = arguments.length > 3 ? P.call(arguments, 3) : [], s = this;
  return k.call(this, t, function() {
    var l = e, c = r.map($, s.container);
    return i ? new (e.bind.apply(e, [null].concat(c)))() : l.apply(null, c);
  });
}, ne = function(t, e) {
  return G.apply(this, [t, e, !0].concat(P.call(arguments, 2)));
}, se = function(t, e) {
  return G.apply(this, [t, e, !1].concat(P.call(arguments, 2)));
}, U = function(t, e) {
  Object.defineProperty(this, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  });
}, q = function(t, e) {
  var i = t[e];
  return i || (i = {}, U.call(t, e, i)), i;
}, oe = function(t, e) {
  var i;
  return i = t.split(p), t = i.pop(), U.call(i.reduce(q, this.container), t, e), this;
}, ae = function(t, e) {
  Object.defineProperty(this, t, {
    configurable: !1,
    enumerable: !0,
    value: e,
    writable: !1
  });
}, le = function(t, e) {
  var i = t.split(p);
  return t = i.pop(), ae.call(i.reduce(q, this.container), t, e), this;
}, W = function(t, e) {
  var i, r;
  return typeof t === N && (e = t, t = j), i = t.split(p), r = i.shift(), i.length ? m.call(this, r).decorator(i.join(p), e) : (this.decorators[r] || (this.decorators[r] = []), this.decorators[r].push(e)), this;
}, ce = function(t) {
  return this.deferred.push(t), this;
}, ue = function(t) {
  return (t || []).map($, this.container);
}, de = function(t, e) {
  return k.call(this, t, function(r) {
    return {
      instance: e.bind(e, r)
    };
  });
}, he = function(t) {
  return !/^\$(?:decorator|register|list)$|Provider$/.test(t);
}, A = function(t) {
  return Object.keys(t || this.container || {}).filter(he);
}, y = {}, ge = function(t) {
  var e;
  return typeof t === M ? (e = y[t], e || (y[t] = e = new f(), e.constant("BOTTLE_NAME", t)), e) : new f();
}, fe = function(t) {
  typeof t === M ? delete y[t] : y = {};
}, V = function(t) {
  var e = t.$value === void 0 ? t : t.$value;
  return this[t.$type || "service"].apply(this, [t.$name, e].concat(t.$inject || []));
}, B = function(t) {
  delete this.providerMap[t], delete this.container[t], delete this.container[t + E];
}, pe = function(t) {
  var e = this.originalProviders, i = Array.isArray(t);
  Object.keys(this.originalProviders).forEach(function(s) {
    if (!(i && t.indexOf(s) === -1)) {
      var o = s.split(p);
      o.length > 1 && o.forEach(B, m.call(this, o[0])), B.call(this, s), this.provider(s, e[s]);
    }
  }, this);
}, ve = function(t) {
  return this.deferred.forEach(function(i) {
    i(t);
  }), this;
};
f = function n(t) {
  if (!(this instanceof n))
    return n.pop(t);
  this.id = Q++, this.decorators = {}, this.middlewares = {}, this.nested = {}, this.providerMap = {}, this.originalProviders = {}, this.deferred = [], this.container = {
    $decorator: W.bind(this),
    $register: V.bind(this),
    $list: A.bind(this)
  };
};
f.prototype = {
  constant: le,
  decorator: W,
  defer: ce,
  digest: ue,
  factory: k,
  instanceFactory: de,
  list: A,
  middleware: te,
  provider: z,
  resetProviders: pe,
  register: V,
  resolve: ve,
  service: ne,
  serviceFactory: se,
  value: oe
};
f.pop = ge;
f.clear = fe;
f.list = A;
f.config = {
  strict: !1
};
const we = f;
function be(...n) {
  window.startingBlocksDebugLevel === 1 && console.log("[SB]", ...n);
}
function d(n, t = "") {
  window.startingBlocksDebugLevel === 1 && console.debug(`%c[SB] %c${n}`, "color:#749f73", "color:debug", t);
}
function ye(...n) {
  window.startingBlocksDebugLevel === 1 && console.info("[SB]", ...n);
}
function Y(...n) {
  window.startingBlocksDebugLevel === 1 && console.warn("[SB]", ...n);
}
function me(...n) {
  window.startingBlocksDebugLevel === 1 && console.error("[SB]", ...n);
}
const Oe = {
  log: be,
  debug: d,
  info: ye,
  warn: Y,
  error: me
};
class v {
  static commit(t, e) {
    const i = new window.CustomEvent(t, { detail: e });
    d("\u{1F6A9} Dispatched " + t), window.dispatchEvent(i);
  }
}
class Se extends Error {
  constructor(t) {
    super(`Service "${t}" is not defined`), this.name = "UnknownServiceException";
  }
}
class Ee extends Error {
  constructor(t, e) {
    super(`Object of type "${t}" needs "${e}" service`), this.name = "DependencyNotFulfilledException";
  }
}
class w {
  constructor(t = {}, e = "AbstractService", i = ["Config"]) {
    a(this, "_container");
    a(this, "_serviceName");
    this._container = t, this._serviceName = e, this.checkDependencies(i);
  }
  init() {
  }
  hasService(t) {
    return this._container.hasOwnProperty(t);
  }
  checkDependencies(t = []) {
    for (const e of t)
      if (!this.hasService(e))
        throw new Ee(this._serviceName, e);
  }
  getService(t) {
    if (!this.hasService(t))
      throw new Se(t);
    return this._container[t];
  }
  get serviceName() {
    return this._serviceName;
  }
  set serviceName(t) {
    this._serviceName = t;
  }
  get container() {
    return this._container;
  }
  set container(t) {
    this._container = t;
  }
}
class S extends w {
  boot() {
  }
}
class Pe extends S {
  constructor(e, i = "PageBuilder") {
    super(e, i, ["Dom"]);
    a(this, "page");
    d(`\u2615\uFE0F ${i} awake`), this.page = null, this.buildPage = this.buildPage.bind(this);
  }
  boot() {
    super.boot(), this.buildPage(this.getService("Dom").getContainer(), "static");
  }
  async buildPage(e, i = "ajax") {
    let r = this.getService("Dom").getNodeType(e);
    return this.hasService(r) ? this.page = this.getService(r).instance() : (r = "DefaultPage", this.page = this.getService("DefaultPage").instance()), this.page.type = r, this.page.context = i, this.page.id = e.id, this.page.rootElement = e, this.page.name = e.hasAttribute("data-node-name") ? e.getAttribute("data-node-name") : "", this.page.metaTitle = e.hasAttribute("data-meta-title") ? e.getAttribute("data-meta-title") : "", this.page.isHome = e.getAttribute("data-is-home") === "1", await this.page.init(), v.commit(x, this.page), this.hasService("Splashscreen") && !this.getService("Splashscreen").splashscreenHidden && (v.commit(O, this.page), this.getService("Splashscreen").hide().then(() => {
      v.commit(I, this.page), this.getService("Splashscreen").splashscreenHidden = !0;
    })), this.page;
  }
}
class ke extends w {
  async getBlockInstance(t) {
    return null;
  }
}
class Ae extends ke {
  constructor(t, e = "BlockBuilder") {
    super(t, e), d(`\u2615\uFE0F ${e} awake`);
  }
  async getBlockInstance(t) {
    return this.hasService(t) ? this.getService(t).instance() : null;
  }
}
class Te extends w {
  constructor(e, i = "Dom") {
    super(e, i);
    a(this, "currentHTML");
    d(`\u2615\uFE0F ${i} awake`), this.currentHTML = document.documentElement.innerHTML;
  }
  parseResponse(e) {
    this.currentHTML = e;
    const i = document.createElement("div");
    return i.innerHTML = e, this.getContainer(i);
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
    const i = this.parseContainer(e);
    if (!i)
      throw new Error(`Starting Blocks: container not found! Did you use at least
            one dom element with ".${this.getService("Config").pageClass}" class and "data-node-type" attribute?`);
    return i;
  }
  putContainer(e) {
    e.style.visibility = "hidden", this.getWrapper().appendChild(e), v.commit(F, {
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
function C(n, t, e) {
  let i;
  return function() {
    let r = this, s = arguments, o = function() {
      i = null, e || n.apply(r, Array.from(s));
    };
    const l = e && !i;
    i && clearTimeout(i), i = window.setTimeout(o, t), l && n.apply(r, Array.from(s));
  };
}
class Be extends w {
  constructor(e) {
    super(e, "AbstractPage");
    a(this, "rootElement");
    a(this, "id");
    a(this, "context");
    a(this, "type");
    a(this, "isHome");
    a(this, "blocks");
    a(this, "name");
    a(this, "metaTitle");
    a(this, "onResizeDebounce");
    a(this, "bindedUpdateBlocks");
    a(this, "blockElements");
    a(this, "blockLength");
    a(this, "domObserver");
    this.rootElement = null, this.id = null, this.context = null, this.type = null, this.isHome = null, this.blocks = [], this.name = null, this.metaTitle = null, this.blockLength = null, this.blockElements = null, this.domObserver = null, this.onResize = this.onResize.bind(this), this.onResizeDebounce = C(this.onResize, 50, !1), this.bindedUpdateBlocks = C(this.updateBlocks.bind(this), 50, !1);
  }
  async init() {
    var e;
    d("\u2733\uFE0F #" + this.id + " %c[" + this.type + "] [" + this.context + "]", "color:grey"), this.blockElements = [...Array.from((e = this.rootElement) == null ? void 0 : e.querySelectorAll(`.${this.getService("Config").pageBlockClass}`))], this.blockLength = this.blockElements.length, this.blockLength && await this.initBlocks(), this.initEvents();
  }
  destroy() {
    var e, i, r, s;
    if (d("\u{1F5D1}\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey"), (i = (e = this.rootElement) == null ? void 0 : e.parentNode) == null || i.removeChild(this.rootElement), this.destroyEvents(), this.getService("PageBuilder").page !== null && this.getService("PageBuilder").page.name !== this.name && document.body.classList.remove((r = this.name) != null ? r : ""), this.getService("PageBuilder").page !== null && this.getService("PageBuilder").page.type !== this.type && document.body.classList.remove((s = this.type) != null ? s : ""), this.blocks !== null)
      for (let o in this.blocks)
        this.blocks.hasOwnProperty(o) && this.blocks[o].destroy();
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
      let i = await this.initSingleBlock(this.blockElements[e]);
      i && this.blocks.push(i);
    }
    for (let e = this.blocks.length - 1; e >= 0; e--)
      typeof this.blocks[e].onPageReady == "function" && this.blocks[e].onPageReady();
  }
  async updateBlocks() {
    var e;
    d("	\u{1F4EF} Page DOM changed\u2026"), this.blockElements = Array.from((e = this.rootElement) == null ? void 0 : e.querySelectorAll(`.${this.getService("Config").pageBlockClass}`)), this.blockLength = this.blockElements.length;
    for (let i = 0; i < this.blockLength; i++) {
      let r = this.blockElements[i];
      const s = this.getBlockById(r.id);
      if (!r.id)
        break;
      if (s === null)
        try {
          let o = await this.initSingleBlock(this.blockElements[i]);
          o && (this.blocks.push(o), o.onPageReady());
        } catch (o) {
          Y(o.message);
        }
    }
  }
  async initSingleBlock(e) {
    if (!e.id)
      return null;
    let i = e.getAttribute(this.getService("Config").objectTypeAttr), r = await this.getService("BlockBuilder").getBlockInstance(i);
    return r ? (r.type = i, r.page = this, r.rootElement = e, r.id = e.id, r.name = e.hasAttribute("data-node-name") ? e.getAttribute("data-node-name") : "", r.init(), r.initEvents(), r) : null;
  }
  getBlockById(e) {
    for (const i of this.blocks)
      if (i.id && i.id === e)
        return i;
    return null;
  }
  getBlockIndexById(e) {
    const i = this.blocks.length;
    for (let r = 0; r < i; r++)
      if (this.blocks[r].id && this.blocks[r].id === e)
        return r;
    return null;
  }
  getFirstBlockByType(e) {
    const i = this.getFirstBlockIndexByType(e);
    return i && this.blocks[i] ? this.blocks[i] : null;
  }
  getFirstBlockIndexByType(e) {
    const i = this.blocks.length;
    for (let r = 0; r < i; r++)
      if (this.blocks[r].type && this.blocks[r].type === e)
        return r;
    return null;
  }
  onResize() {
    for (const e of this.blocks)
      e.onResize();
  }
}
class Ce extends Be {
  constructor(t) {
    super(t);
  }
}
const _e = {
  wrapperId: "sb-wrapper",
  pageBlockClass: "page-block",
  pageClass: "page-content",
  objectTypeAttr: "data-node-type",
  noAjaxLinkClass: "no-ajax-link",
  noPrefetchClass: "no-prefetch",
  manualDomAppend: !1,
  debug: 0
};
class Ie {
  constructor(t = {}) {
    a(this, "bottle");
    a(this, "bootables");
    this.bottle = new we(), this.bootables = [], this.bottle.value("Config", {
      ..._e,
      ...t
    }), window.startingBlocksDebugLevel = this.bottle.container.Config.debug, this.provider("Dom", Te), this.provider("BlockBuilder", Ae), this.instanceFactory("DefaultPage", (e) => new Ce(e));
  }
  provider(t, e, ...i) {
    if (!t || !e)
      throw new Error("A parameter is missing");
    this.bottle.provider(t, function() {
      this.$get = (r) => new e(r, ...i);
    });
  }
  factory(t, e) {
    this.bottle.factory(t, e);
  }
  instanceFactory(t, e) {
    this.bottle.instanceFactory(t, e);
  }
  bootableProvider(t, e, ...i) {
    this.provider(t, e, ...i), this.bootables.push(t);
  }
  boot() {
    this.bootableProvider("PageBuilder", Pe);
    for (const t of this.bootables)
      this.bottle.container.hasOwnProperty(t) && this.bottle.container[t].boot();
  }
}
class u {
  static stripTrailingSlash(t) {
    return t.substring(-1) === "/" ? t.substring(0, t.length - 1) : t;
  }
  static getPort(t = void 0) {
    const e = typeof t < "u" ? t : window.location.port, i = window.location.protocol;
    return e !== "" ? parseInt(e) : i === "http:" ? 80 : i === "https:" ? 443 : null;
  }
  static cleanLink(t) {
    return t.replace(/#.*/, "");
  }
  static getCurrentUrl() {
    return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
  }
  static requestTimeout() {
    return 1e4;
  }
  static async request(t) {
    const e = u.deferred(), i = window.setTimeout(() => {
      window.clearTimeout(i), e.reject("timeout!");
    }, u.requestTimeout()), r = new window.Headers();
    return r.append("X-Starting-Blocks", "yes"), r.append("X-Allow-Partial", "yes"), r.append("X-Requested-With", "XMLHttpRequest"), window.fetch(t, {
      method: "GET",
      headers: r,
      cache: "default",
      credentials: "same-origin"
    }).then((s) => {
      if (window.clearTimeout(i), s.status >= 200 && s.status < 300)
        return e.resolve(s.text());
      const o = new Error(s.statusText || s.status.toString());
      return e.reject(o);
    }).catch((s) => {
      window.clearTimeout(i), e.reject(s);
    }), e.promise;
  }
  static logCredits(t, e, i, r, s) {
    let o = "#fff";
    if (typeof s < "u" && (o = s), console.log("%c   ", "font-size:3px;"), console.log("%c" + t, "background:" + e + "; color: " + o + "; font-size:14px; padding:5px 10px;"), console.log("%c   ", "font-size:3px;"), i !== null) {
      let l = i.length;
      if (l)
        for (let c = 0; c < l; c++)
          console.log(i[c].name + " - " + i[c].website);
    }
    if (r !== null) {
      let l = r.length;
      if (l) {
        console.log("-"), console.log("Thanks to");
        for (let c = 0; c < l; c++)
          console.log(r[c].name + " (" + r[c].website + ")");
      }
    }
    console.log("-"), console.log(" ");
  }
  static getRandomNumber(t, e, i) {
    const r = Math.random() * (e - t) + t;
    return typeof i < "u" ? Number(r.toFixed(i)) : r;
  }
  static getRandomInt(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t;
  }
  static trackGoogleAnalytics() {
    typeof window.ga < "u" && (d("\u{1F6A9} Push Analytics for: " + window.location.pathname), window.ga("send", "pageview", {
      page: window.location.pathname,
      title: document.title
    }));
  }
  static getViewportSize() {
    const t = document.documentElement || document.body;
    return "innerWidth" in window ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: t.clientWidth,
      height: t.clientHeight
    };
  }
  static prefixProperty(t) {
    const e = ["", "ms", "Webkit", "Moz", "O"], i = e.length, r = document.createElement("div");
    for (let s = 0; s < i; s++) {
      let o = e[s];
      const l = o === "" ? t : t.charAt(0).toUpperCase() + t.substring(1).toLowerCase(), c = o + l;
      if (typeof r.style[c] < "u")
        return c;
    }
    return null;
  }
  static getNormRatio(t, e, i) {
    return t < e ? 0 : t > i || t === i ? 1 : (t - e) / (i - e);
  }
  static deferred() {
    return function() {
      let t = null, e = null, i = new Promise((r, s) => {
        t = r, e = s;
      });
      return {
        resolve: t,
        reject: e,
        promise: i
      };
    }();
  }
}
class Le extends w {
  constructor(e, i = "Transition", r = []) {
    super(e, i, r);
    a(this, "oldPage");
    a(this, "newPage");
    a(this, "newPageLoading");
    a(this, "originElement");
    a(this, "cursorPosition");
    a(this, "_newPagePromise");
    a(this, "deferred");
    a(this, "newPageReady");
    this.oldPage = null, this.newPage = null, this.newPageLoading = null, this.originElement = null, this.cursorPosition = null, this._newPagePromise = null, this.deferred = null, this.newPageReady = null;
  }
  initTransition(e, i, r, s) {
    return this.oldPage = e, this._newPagePromise = i, this.originElement = r, this.cursorPosition = s, this.deferred = u.deferred(), this.newPageReady = u.deferred(), this.newPageLoading = this.newPageReady.promise, this.start(), this._newPagePromise.then((o) => {
      this.newPage = o, this.newPageReady.resolve();
    }), this.deferred.promise;
  }
  done() {
    this.destroyOldPage(), this.newPage.rootElement.style.visibility !== "inherit" && (this.newPage.rootElement.style.visibility = "visible"), this.deferred.resolve();
  }
  scrollTop() {
    document.scrollingElement ? (document.scrollingElement.scrollTop = 0, document.scrollingElement.scrollTo(0, 0)) : (document.body.scrollTop = 0, document.documentElement.scrollTop = 0, window.scrollTo(0, 0));
  }
  destroyOldPage() {
    this.oldPage && (this.oldPage.destroy(), this.oldPage = null);
  }
  async buildNewPage() {
    if (this.container) {
      const e = this.getService("Pjax"), i = this.getService("Dom"), r = this.getService("PageBuilder");
      i.putContainer(e.containerElement), this.newPage = await r.buildPage(e.containerElement), e.onNewPageLoaded(this.newPage);
    }
  }
  start() {
  }
}
class Fe extends Le {
  start() {
    Promise.all([this.newPageLoading]).then(this.finish.bind(this));
  }
  finish() {
    document.body.scrollTop = 0, this.done();
  }
}
class Ne extends S {
  constructor(e, i = "Pjax") {
    super(e, i, ["Dom", "Config", "History", "PageBuilder"]);
    a(this, "transitionProgress");
    a(this, "containerElement");
    a(this, "currentState");
    a(this, "linkHash");
    d(`\u2615\uFE0F ${i} awake`), this.transitionProgress = !1, this.containerElement = null, this.currentState = null, this.linkHash = null, this.onNewPageLoaded = this.onNewPageLoaded.bind(this), this.onTransitionEnd = this.onTransitionEnd.bind(this), this.onLinkClick = this.onLinkClick.bind(this), this.onStateChange = this.onStateChange.bind(this);
  }
  boot() {
    super.boot(), this.getService("Dom").getWrapper().setAttribute("aria-live", "polite"), this.currentState = this.getService("History").add(this.getCurrentUrl(), null, "static"), this.bindEvents();
  }
  bindEvents() {
    document.addEventListener("click", this.onLinkClick), window.addEventListener("popstate", this.onStateChange);
  }
  getCurrentUrl() {
    return u.cleanLink(u.getCurrentUrl());
  }
  goTo(e, i, r, s) {
    const o = window.scrollY;
    window.history.pushState(null, "", e), window.scrollTo(0, o), this.handleStateChange(i, !0, r, s);
  }
  forceGoTo(e) {
    window.location.href = e;
  }
  async load(e) {
    const i = u.deferred();
    let r = null;
    return this.hasService("CacheProvider") && (r = this.getService("CacheProvider").get(e)), r || (r = u.request(e), this.hasService("CacheProvider") && this.getService("CacheProvider").set(e, r)), r.then(async (s) => {
      if (this.containerElement = this.getService("Dom").parseResponse(s), v.commit(L, {
        container: this.containerElement,
        currentHTML: this.getService("Dom").currentHTML
      }), this.getService("Config").manualDomAppend)
        i.resolve(null);
      else {
        this.getService("Dom").putContainer(this.containerElement);
        const o = await this.getService("PageBuilder").buildPage(this.containerElement);
        i.resolve(o);
      }
    }).catch((s) => {
      console.error(s), this.forceGoTo(e), i.reject();
    }), i.promise;
  }
  getHref(e) {
    return e && typeof e.href == "string" && e.tagName.toUpperCase() === "A" ? e.href : null;
  }
  getTransitionName(e) {
    return e && e.getAttribute && typeof e.getAttribute("data-transition") == "string" ? e.getAttribute("data-transition") : null;
  }
  onLinkClick(e) {
    let i = e.target;
    for (; i && !this.getHref(i); )
      i = i.parentNode;
    if (this.preventCheck(e, i)) {
      e.preventDefault(), this.linkHash = i.hash.split("#")[1];
      const r = this.getHref(i), s = this.getTransitionName(i), o = {
        x: e.clientX,
        y: e.clientY
      };
      this.goTo(r, s, i, o);
    }
  }
  preventCheck(e, i) {
    if (!window.history.pushState)
      return !1;
    const r = this.getHref(i);
    return !i || !r || e.button > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || i.target && i.target === "_blank" || window.location.protocol !== i.protocol || window.location.hostname !== i.hostname || u.getPort() !== u.getPort(i.port) || i.getAttribute && typeof i.getAttribute("download") == "string" || u.cleanLink(r) === u.cleanLink(window.location.href) ? !1 : !i.classList.contains(this.getService("Config").noAjaxLinkClass);
  }
  getTransition(e, i) {
    return this.hasService("TransitionFactory") ? this.getService("TransitionFactory").getTransition(e, i) : new Fe({});
  }
  onStateChange(e) {
    this.handleStateChange(null, !1, null, null);
  }
  handleStateChange(e = null, i = !1, r = null, s = null) {
    const o = this.getCurrentUrl();
    if (this.transitionProgress && this.forceGoTo(o), this.getService("History").currentStatus().url === o)
      return;
    typeof e == "string" || i ? this.currentState = this.getService("History").add(o, e, "ajax") : this.currentState = this.getService("History").add(o, null, "_history"), v.commit(_, {
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
    const l = this.load(o), c = this.getTransition(
      this.getService("History").prevStatus(),
      this.getService("History").currentStatus()
    );
    this.transitionProgress = !0, v.commit(H, {
      transition: c,
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
    const h = c.initTransition(
      this.getService("PageBuilder").page,
      l,
      r,
      s
    );
    l.then(this.onNewPageLoaded), h.then(this.onTransitionEnd);
  }
  onNewPageLoaded(e) {
    if (e) {
      const i = this.getService("History").currentStatus();
      this.getService("Dom").updateBodyAttributes(e), this.getService("Dom").updatePageTitle(e), u.trackGoogleAnalytics(), this.currentState && e && !this.currentState.data.title && e.metaTitle && (this.currentState.data.title = e.metaTitle), v.commit(D, {
        currentStatus: i,
        prevStatus: this.getService("History").prevStatus(),
        currentHTML: this.getService("Dom").currentHTML,
        page: e
      });
    }
  }
  onTransitionEnd() {
    this.transitionProgress = !1, this.linkHash && (window.location.hash = "", window.location.hash = this.linkHash, this.linkHash = null), v.commit(R, {
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
  }
}
class Me extends w {
  constructor(e, i = "History") {
    super(e, i);
    a(this, "history");
    d(`\u2615\uFE0F ${i} awake`), this.history = [];
  }
  add(e, i, r, s = {}) {
    const o = { url: e, transitionName: i, context: r, data: s };
    return this.history.push(o), o;
  }
  currentStatus() {
    return this.history[this.history.length - 1];
  }
  prevStatus() {
    const e = this.history;
    return e.length < 2 ? null : e[e.length - 2];
  }
}
class je extends S {
  constructor(t, e = "Prefetch") {
    super(t, e, ["Pjax", "Config"]), d(`\u2615\uFE0F ${e} awake`);
  }
  boot() {
    return super.boot(), window.history.pushState ? (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)), !0) : !1;
  }
  onLinkEnter(t) {
    let e = t.target;
    for (; e && !this.getService("Pjax").getHref(e); )
      e = e.parentNode;
    if (!e || e.classList.contains(this.getService("Config").noPrefetchClass))
      return;
    let i = this.getService("Pjax").getHref(e);
    if (this.getService("Pjax").preventCheck(t, e)) {
      if (this.hasService("CacheProvider") && this.getService("CacheProvider").get(i))
        return;
      let r = u.request(i);
      this.hasService("CacheProvider") && this.getService("CacheProvider").set(i, r);
    }
  }
}
class $e extends w {
  constructor(e, i = "CacheProvider") {
    super(e, i);
    a(this, "data");
    d(`\u2615\uFE0F ${i} awake`), this.data = {};
  }
  exists(e) {
    return e in this.data;
  }
  get(e) {
    return this.data[e];
  }
  set(e, i) {
    return this.data[e] = i, this;
  }
  reset() {
    this.data = {};
  }
}
class De extends w {
  constructor(e, i = "AbstractBlock") {
    super(e, i);
    a(this, "type");
    a(this, "page");
    a(this, "rootElement");
    a(this, "id");
    a(this, "name");
    this.type = null, this.page = null, this.rootElement = null, this.id = null, this.name = null;
  }
  init() {
    d("	\u2733\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey");
  }
  initEvents() {
  }
  destroy() {
    d("	\u{1F5D1}\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey"), this.destroyEvents();
  }
  destroyEvents() {
  }
  onResize() {
  }
  onPageReady() {
  }
}
class ze extends De {
  constructor(e, i = "AbstractInViewBlock") {
    super(e, i);
    a(this, "observer");
    a(this, "observerOptions");
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
    for (const i of e)
      i.isIntersecting ? this.onScreen(i) : this.offScreen(i);
  }
  onScreen(e) {
  }
  offScreen(e) {
  }
  unobserve() {
    this.observer.unobserve(this.rootElement);
  }
}
class Ge extends S {
  constructor(e, i = "AbstractSplashscreen") {
    super(e, i);
    a(this, "_splashscreenHidden");
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
class Ue extends w {
  getTransition(t, e) {
  }
}
class b {
  static _preventDefault(t) {
    t.preventDefault && t.preventDefault(), t.returnValue = !1;
  }
  static _keydown(t) {
    let e = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "PageUp", "PageDown", "End", "Home", "Space"];
    for (let i = e.length; i--; )
      if (t.code === e[i]) {
        b._preventDefault(t);
        return;
      }
  }
  static _wheel(t) {
    b._preventDefault(t);
  }
  static disable() {
    window.addEventListener && window.addEventListener("wheel", b._wheel, !1), window.onmousewheel = document.onmousewheel = b._wheel, document.onkeydown = b._keydown;
  }
  static enable() {
    window.removeEventListener && window.removeEventListener("wheel", b._wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }
}
function xe(n, t, e) {
  let i, r, s, o = null, l = 0;
  e || (e = {});
  let c = function() {
    l = e && !e.leading ? 0 : Date.now(), o = null, s = n.apply(i, r), o || (i = r = null);
  };
  return function() {
    let h = Date.now();
    !l && e && !e.leading && (l = h);
    let g = t - (h - l);
    return i = this, r = arguments, g <= 0 || g > t ? (o && (clearTimeout(o), o = null), l = h, s = n.apply(i, r), o || (i = r = null)) : !o && (e && e.trailing) !== !1 && (o = setTimeout(c, g)), s;
  };
}
class qe {
  constructor(t) {
    a(this, "options");
    a(this, "lastScrollTop");
    a(this, "_handleScroll");
    a(this, "handleScroll", () => {
      let t = window.scrollY || document.documentElement.scrollTop;
      const e = (t - this.lastScrollTop) * (1 / this.options.wait) * 100;
      this.lastScrollTop = t, typeof this.options.onUpdate == "function" && this.options.onUpdate(e);
    });
    this.options = {
      wait: 32,
      onUpdate: () => {
      },
      ...t
    }, this.lastScrollTop = 0, this._handleScroll = () => {
    }, this.init();
  }
  init() {
    this._handleScroll = xe(this.handleScroll, this.options.wait), this.initEvents();
  }
  destroy() {
    this.destroyEvents();
  }
  initEvents() {
    window.addEventListener("scroll", this._handleScroll);
  }
  destroyEvents() {
    window.addEventListener("scroll", this._handleScroll);
  }
}
function We() {
  window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(n) {
      window.setTimeout(n, 1e3 / 60);
    };
  }(), window.cancelAnimFrame = function() {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(n) {
      window.clearTimeout(n);
    };
  }();
  {
    let n;
    const t = () => {
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
    let i = e.length;
    const r = window.console = window.console || {};
    for (; i--; )
      n = e[i], r[n] || (r[n] = t);
  }
  Array.from || (Array.from = function(n) {
    return [].slice.call(n);
  }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(n) {
      if (this === null)
        throw new TypeError("Array.prototype.find called on null or undefined");
      if (typeof n != "function")
        throw new TypeError("predicate must be a function");
      let t = Object(this), e = t.length >>> 0, i = arguments[1], r;
      for (let s = 0; s < e; s++)
        if (r = t[s], n.call(i, r, s, t))
          return r;
    }
  }), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function(n) {
      if (this === null)
        throw new TypeError('"this" is null or not defined');
      let t = Object(this), e = t.length >>> 0;
      if (typeof n != "function")
        throw new TypeError("predicate must be a function");
      let i = arguments[1], r = 0;
      for (; r < e; ) {
        let s = t[r];
        if (n.call(i, s, r, t))
          return r;
        r++;
      }
      return -1;
    }
  }), function() {
    if (typeof window.CustomEvent == "function")
      return;
    function n(t, e) {
      e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
      let i = document.createEvent("CustomEvent");
      return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
    }
    n.prototype = window.Event.prototype, window.CustomEvent = n;
  }();
}
function Ve() {
  typeof window.ga < "u" && window.addEventListener("error", function(n) {
    const t = n.colno ? " line:" + n.lineno + ", column:" + n.colno : " line:" + n.lineno;
    window.ga(
      "send",
      "event",
      "JavaScript Error",
      n.message,
      n.filename + t + " -> " + navigator.userAgent,
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
  De as AbstractBlock,
  ke as AbstractBlockBuilder,
  ze as AbstractInViewBlock,
  Be as AbstractPage,
  w as AbstractService,
  Ge as AbstractSplashscreen,
  Le as AbstractTransition,
  Ue as AbstractTransitionFactory,
  Ae as BlockBuilder,
  $e as CacheProvider,
  Fe as DefaultTransition,
  qe as DeltaScroll,
  v as Dispatcher,
  Re as EventTypes,
  Me as History,
  Pe as PageBuilder,
  Ne as Pjax,
  je as Prefetch,
  b as Scroll,
  u as Utils,
  C as debounce,
  Ie as default,
  Ve as gaTrackErrors,
  Oe as logger,
  We as polyfills,
  xe as throttle
};
