var _ = Object.defineProperty;
var L = (r, t, e) => t in r ? _(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var o = (r, t, e) => (L(r, typeof t != "symbol" ? t + "" : t, e), e);
const b = "SB_BEFORE_PAGE_LOAD", y = "SB_AFTER_PAGE_LOAD", S = "SB_AFTER_DOM_APPENDED", E = "SB_CONTAINER_READY", k = "SB_AFTER_PAGE_BOOT", P = "SB_TRANSITION_START", A = "SB_TRANSITION_COMPLETE", T = "SB_BEFORE_SPLASHSCREEN_HIDE", D = "SB_START_SPLASHSCREEN_HIDE", C = "SB_AFTER_SPLASHSCREEN_HIDE", J = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BEFORE_PAGE_LOAD: b,
  AFTER_PAGE_LOAD: y,
  AFTER_DOM_APPENDED: S,
  CONTAINER_READY: E,
  AFTER_PAGE_BOOT: k,
  TRANSITION_START: P,
  TRANSITION_COMPLETE: A,
  BEFORE_SPLASHSCREEN_HIDE: T,
  START_SPLASHSCREEN_HIDE: D,
  AFTER_SPLASHSCREEN_HIDE: C
}, Symbol.toStringTag, { value: "Module" })), x = ["$register"];
class F {
  constructor() {
    o(this, "container");
    o(this, "resolved", /* @__PURE__ */ new Set());
    o(this, "resolving", /* @__PURE__ */ new Set());
    const t = {};
    Object.defineProperty(t, "$register", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: (e) => this.register(e)
    }), this.container = t;
  }
  value(t, e) {
    return this.assertName(t), this.resolved.add(t), this.defineValue(t, e), this;
  }
  factory(t, e) {
    if (this.assertName(t), this.resolved.has(t))
      return console.error(`${t} provider already instantiated.`), this;
    const i = this.container;
    return Object.defineProperty(i, t, {
      configurable: !0,
      enumerable: !0,
      get: () => {
        if (this.resolving.has(t))
          throw new Error(`Circular dependency detected while resolving "${t}" service.`);
        this.resolving.add(t);
        try {
          const n = e(i);
          return this.resolved.add(t), this.defineValue(t, n), n;
        } finally {
          this.resolving.delete(t);
        }
      }
    }), this;
  }
  instanceFactory(t, e) {
    return this.factory(t, (i) => ({
      instance: (...n) => e(i, ...n)
    }));
  }
  provider(t, e) {
    return this.factory(t, (i) => new e().$get(i));
  }
  service(t, e, ...i) {
    return this.factory(t, (n) => new e(
      ...i.map((s) => n[s])
    ));
  }
  register(t) {
    const e = t.$value === void 0 ? t : t.$value, i = t.$type || "service";
    switch (i) {
      case "value":
        return this.value(t.$name, e);
      case "factory":
        return this.factory(t.$name, e);
      case "instanceFactory":
        return this.instanceFactory(t.$name, e);
      case "provider":
        return this.provider(t.$name, e);
      case "service":
        return this.service(t.$name, e, ...t.$inject || []);
      default:
        throw new Error(`Unknown service type "${i}" for "${t.$name}" service.`);
    }
  }
  has(t) {
    return Object.prototype.hasOwnProperty.call(this.container, t);
  }
  defineValue(t, e) {
    Object.defineProperty(this.container, t, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: e
    });
  }
  assertName(t) {
    if (typeof t != "string" || t === "")
      throw new Error("A service name must be a non-empty string.");
    if (x.includes(t))
      throw new Error(`"${t}" is a reserved service name.`);
  }
}
function H(...r) {
  window.startingBlocksDebugLevel === 1 && console.log("[SB]", ...r);
}
function u(r, t = "") {
  window.startingBlocksDebugLevel === 1 && console.debug(`%c[SB] %c${r}`, "color:#749f73", "color:debug", t);
}
function R(...r) {
  window.startingBlocksDebugLevel === 1 && console.info("[SB]", ...r);
}
function B(...r) {
  window.startingBlocksDebugLevel === 1 && console.warn("[SB]", ...r);
}
function O(...r) {
  window.startingBlocksDebugLevel === 1 && console.error("[SB]", ...r);
}
const Q = {
  log: H,
  debug: u,
  info: R,
  warn: B,
  error: O
};
class d {
  static commit(t, e) {
    const i = new window.CustomEvent(t, { detail: e });
    u("\u{1F6A9} Dispatched " + t), window.dispatchEvent(i);
  }
}
class I extends Error {
  constructor(t) {
    super(`Service "${t}" is not defined`), this.name = "UnknownServiceException";
  }
}
class N extends Error {
  constructor(t, e) {
    super(`Object of type "${t}" needs "${e}" service`), this.name = "DependencyNotFulfilledException";
  }
}
class g {
  constructor(t = {}, e = "AbstractService", i = ["Config"]) {
    o(this, "_container");
    o(this, "_serviceName");
    this._container = t, this._serviceName = e, this.checkDependencies(i);
  }
  init() {
  }
  hasService(t) {
    return Object.prototype.hasOwnProperty.call(this._container, t);
  }
  checkDependencies(t = []) {
    for (const e of t)
      if (!this.hasService(e))
        throw new N(this._serviceName, e);
  }
  getService(t) {
    if (!this.hasService(t))
      throw new I(t);
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
class w extends g {
  boot() {
  }
}
class j extends w {
  constructor(e, i = "PageBuilder") {
    super(e, i, ["Dom"]);
    o(this, "page");
    u(`\u2615\uFE0F ${i} awake`), this.page = null, this.buildPage = this.buildPage.bind(this);
  }
  boot() {
    super.boot(), this.buildPage(this.getService("Dom").getContainer(), "static");
  }
  async buildPage(e, i = "ajax") {
    let n = this.getService("Dom").getNodeType(e);
    return this.hasService(n) ? this.page = this.getService(n).instance() : (n = "DefaultPage", this.page = this.getService("DefaultPage").instance()), this.page.type = n, this.page.context = i, this.page.id = e.id, this.page.rootElement = e, this.page.name = e.hasAttribute("data-node-name") ? e.getAttribute("data-node-name") : "", this.page.metaTitle = e.hasAttribute("data-meta-title") ? e.getAttribute("data-meta-title") : "", this.page.isHome = e.getAttribute("data-is-home") === "1", await this.page.init(), d.commit(k, this.page), this.hasService("Splashscreen") && !this.getService("Splashscreen").splashscreenHidden && (d.commit(T, this.page), this.getService("Splashscreen").hide().then(() => {
      d.commit(C, this.page), this.getService("Splashscreen").splashscreenHidden = !0;
    })), this.page;
  }
}
class $ extends g {
  async getBlockInstance(t) {
    return null;
  }
}
class M extends $ {
  constructor(t, e = "BlockBuilder") {
    super(t, e), u(`\u2615\uFE0F ${e} awake`);
  }
  async getBlockInstance(t) {
    return this.hasService(t) ? this.getService(t).instance() : null;
  }
}
class z extends g {
  constructor(e, i = "Dom") {
    super(e, i);
    o(this, "currentHTML");
    u(`\u2615\uFE0F ${i} awake`), this.currentHTML = document.documentElement.innerHTML;
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
    e.style.visibility = "hidden", this.getWrapper().appendChild(e), d.commit(S, {
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
function v(r, t, e) {
  let i;
  return function() {
    let n = this, s = arguments, a = function() {
      i = null, e || r.apply(n, Array.from(s));
    };
    const l = e && !i;
    i && clearTimeout(i), i = window.setTimeout(a, t), l && r.apply(n, Array.from(s));
  };
}
class U extends g {
  constructor(e) {
    super(e, "AbstractPage");
    o(this, "rootElement");
    o(this, "id");
    o(this, "context");
    o(this, "type");
    o(this, "isHome");
    o(this, "blocks");
    o(this, "name");
    o(this, "metaTitle");
    o(this, "onResizeDebounce");
    o(this, "bindedUpdateBlocks");
    o(this, "blockElements");
    o(this, "blockLength");
    o(this, "domObserver");
    this.rootElement = null, this.id = null, this.context = null, this.type = null, this.isHome = null, this.blocks = [], this.name = null, this.metaTitle = null, this.blockLength = null, this.blockElements = null, this.domObserver = null, this.onResize = this.onResize.bind(this), this.onResizeDebounce = v(this.onResize, 50, !1), this.bindedUpdateBlocks = v(this.updateBlocks.bind(this), 50, !1);
  }
  async init() {
    var e;
    u("\u2733\uFE0F #" + this.id + " %c[" + this.type + "] [" + this.context + "]", "color:grey"), this.blockElements = [...Array.from((e = this.rootElement) == null ? void 0 : e.querySelectorAll(`.${this.getService("Config").pageBlockClass}`))], this.blockLength = this.blockElements.length, this.blockLength && await this.initBlocks(), this.initEvents();
  }
  destroy() {
    var e, i, n, s;
    if (u("\u{1F5D1}\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey"), (i = (e = this.rootElement) == null ? void 0 : e.parentNode) == null || i.removeChild(this.rootElement), this.destroyEvents(), this.getService("PageBuilder").page !== null && this.getService("PageBuilder").page.name !== this.name && document.body.classList.remove((n = this.name) != null ? n : ""), this.getService("PageBuilder").page !== null && this.getService("PageBuilder").page.type !== this.type && document.body.classList.remove((s = this.type) != null ? s : ""), this.blocks !== null)
      for (let a in this.blocks)
        this.blocks.hasOwnProperty(a) && this.blocks[a].destroy();
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
    u("	\u{1F4EF} Page DOM changed\u2026"), this.blockElements = Array.from((e = this.rootElement) == null ? void 0 : e.querySelectorAll(`.${this.getService("Config").pageBlockClass}`)), this.blockLength = this.blockElements.length;
    for (let i = 0; i < this.blockLength; i++) {
      let n = this.blockElements[i];
      const s = this.getBlockById(n.id);
      if (!n.id)
        break;
      if (s === null)
        try {
          let a = await this.initSingleBlock(this.blockElements[i]);
          a && (this.blocks.push(a), a.onPageReady());
        } catch (a) {
          B(a.message);
        }
    }
  }
  async initSingleBlock(e) {
    if (!e.id)
      return null;
    let i = e.getAttribute(this.getService("Config").objectTypeAttr), n = await this.getService("BlockBuilder").getBlockInstance(i);
    return n ? (n.type = i, n.page = this, n.rootElement = e, n.id = e.id, n.name = e.hasAttribute("data-node-name") ? e.getAttribute("data-node-name") : "", n.init(), n.initEvents(), n) : null;
  }
  getBlockById(e) {
    for (const i of this.blocks)
      if (i.id && i.id === e)
        return i;
    return null;
  }
  getBlockIndexById(e) {
    const i = this.blocks.length;
    for (let n = 0; n < i; n++)
      if (this.blocks[n].id && this.blocks[n].id === e)
        return n;
    return null;
  }
  getFirstBlockByType(e) {
    const i = this.getFirstBlockIndexByType(e);
    return i && this.blocks[i] ? this.blocks[i] : null;
  }
  getFirstBlockIndexByType(e) {
    const i = this.blocks.length;
    for (let n = 0; n < i; n++)
      if (this.blocks[n].type && this.blocks[n].type === e)
        return n;
    return null;
  }
  onResize() {
    for (const e of this.blocks)
      e.onResize();
  }
}
class q extends U {
  constructor(t) {
    super(t);
  }
}
const G = {
  wrapperId: "sb-wrapper",
  pageBlockClass: "page-block",
  pageClass: "page-content",
  objectTypeAttr: "data-node-type",
  noAjaxLinkClass: "no-ajax-link",
  noPrefetchClass: "no-prefetch",
  manualDomAppend: !1,
  debug: 0
};
class Z {
  constructor(t = {}) {
    o(this, "services");
    o(this, "bootables");
    this.services = new F(), this.bootables = [], this.services.value("Config", {
      ...G,
      ...t
    }), window.startingBlocksDebugLevel = this.services.container.Config.debug, this.provider("Dom", z), this.provider("BlockBuilder", M), this.instanceFactory("DefaultPage", (e) => new q(e));
  }
  get bottle() {
    return this.services;
  }
  provider(t, e, ...i) {
    if (!t || !e)
      throw new Error("A parameter is missing");
    this.services.factory(t, (n) => new e(n, ...i));
  }
  factory(t, e) {
    this.services.factory(t, e);
  }
  instanceFactory(t, e) {
    this.services.instanceFactory(t, e);
  }
  bootableProvider(t, e, ...i) {
    this.provider(t, e, ...i), this.bootables.push(t);
  }
  boot() {
    this.bootableProvider("PageBuilder", j);
    for (const t of this.bootables)
      this.services.has(t) && this.services.container[t].boot();
  }
}
class h {
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
    const e = h.deferred(), i = window.setTimeout(() => {
      window.clearTimeout(i), e.reject("timeout!");
    }, h.requestTimeout()), n = new window.Headers();
    return n.append("X-Starting-Blocks", "yes"), n.append("X-Allow-Partial", "yes"), n.append("X-Requested-With", "XMLHttpRequest"), window.fetch(t, {
      method: "GET",
      headers: n,
      cache: "default",
      credentials: "same-origin"
    }).then((s) => {
      if (window.clearTimeout(i), s.status >= 200 && s.status < 300)
        return e.resolve(s.text());
      const a = new Error(s.statusText || s.status.toString());
      return e.reject(a);
    }).catch((s) => {
      window.clearTimeout(i), e.reject(s);
    }), e.promise;
  }
  static logCredits(t, e, i, n, s) {
    let a = "#fff";
    if (typeof s < "u" && (a = s), console.log("%c   ", "font-size:3px;"), console.log("%c" + t, "background:" + e + "; color: " + a + "; font-size:14px; padding:5px 10px;"), console.log("%c   ", "font-size:3px;"), i !== null) {
      let l = i.length;
      if (l)
        for (let c = 0; c < l; c++)
          console.log(i[c].name + " - " + i[c].website);
    }
    if (n !== null) {
      let l = n.length;
      if (l) {
        console.log("-"), console.log("Thanks to");
        for (let c = 0; c < l; c++)
          console.log(n[c].name + " (" + n[c].website + ")");
      }
    }
    console.log("-"), console.log(" ");
  }
  static getRandomNumber(t, e, i) {
    const n = Math.random() * (e - t) + t;
    return typeof i < "u" ? Number(n.toFixed(i)) : n;
  }
  static getRandomInt(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t;
  }
  static trackGoogleAnalytics() {
    typeof window.ga < "u" && (u("\u{1F6A9} Push Analytics for: " + window.location.pathname), window.ga("send", "pageview", {
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
    const e = ["", "ms", "Webkit", "Moz", "O"], i = e.length, n = document.createElement("div");
    for (let s = 0; s < i; s++) {
      let a = e[s];
      const l = a === "" ? t : t.charAt(0).toUpperCase() + t.substring(1).toLowerCase(), c = a + l;
      if (typeof n.style[c] < "u")
        return c;
    }
    return null;
  }
  static getNormRatio(t, e, i) {
    return t < e ? 0 : t > i || t === i ? 1 : (t - e) / (i - e);
  }
  static deferred() {
    return function() {
      let t = null, e = null, i = new Promise((n, s) => {
        t = n, e = s;
      });
      return {
        resolve: t,
        reject: e,
        promise: i
      };
    }();
  }
}
class V extends g {
  constructor(e, i = "Transition", n = []) {
    super(e, i, n);
    o(this, "oldPage");
    o(this, "newPage");
    o(this, "newPageLoading");
    o(this, "originElement");
    o(this, "cursorPosition");
    o(this, "_newPagePromise");
    o(this, "deferred");
    o(this, "newPageReady");
    this.oldPage = null, this.newPage = null, this.newPageLoading = null, this.originElement = null, this.cursorPosition = null, this._newPagePromise = null, this.deferred = null, this.newPageReady = null;
  }
  initTransition(e, i, n, s) {
    return this.oldPage = e, this._newPagePromise = i, this.originElement = n, this.cursorPosition = s, this.deferred = h.deferred(), this.newPageReady = h.deferred(), this.newPageLoading = this.newPageReady.promise, this.start(), this._newPagePromise.then((a) => {
      this.newPage = a, this.newPageReady.resolve();
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
      const e = this.getService("Pjax"), i = this.getService("Dom"), n = this.getService("PageBuilder");
      i.putContainer(e.containerElement), this.newPage = await n.buildPage(e.containerElement), e.onNewPageLoaded(this.newPage);
    }
  }
  start() {
  }
}
class W extends V {
  start() {
    Promise.all([this.newPageLoading]).then(this.finish.bind(this));
  }
  finish() {
    document.body.scrollTop = 0, this.done();
  }
}
class ee extends w {
  constructor(e, i = "Pjax") {
    super(e, i, ["Dom", "Config", "History", "PageBuilder"]);
    o(this, "transitionProgress");
    o(this, "containerElement");
    o(this, "currentState");
    o(this, "linkHash");
    u(`\u2615\uFE0F ${i} awake`), this.transitionProgress = !1, this.containerElement = null, this.currentState = null, this.linkHash = null, this.onNewPageLoaded = this.onNewPageLoaded.bind(this), this.onTransitionEnd = this.onTransitionEnd.bind(this), this.onLinkClick = this.onLinkClick.bind(this), this.onStateChange = this.onStateChange.bind(this);
  }
  boot() {
    super.boot(), this.getService("Dom").getWrapper().setAttribute("aria-live", "polite"), this.currentState = this.getService("History").add(this.getCurrentUrl(), null, "static"), this.bindEvents();
  }
  bindEvents() {
    document.addEventListener("click", this.onLinkClick), window.addEventListener("popstate", this.onStateChange);
  }
  getCurrentUrl() {
    return h.cleanLink(h.getCurrentUrl());
  }
  goTo(e, i, n, s) {
    const a = window.scrollY;
    window.history.pushState(null, "", e), window.scrollTo(0, a), this.handleStateChange(i, !0, n, s);
  }
  forceGoTo(e) {
    window.location.href = e;
  }
  async load(e) {
    const i = h.deferred();
    let n = null;
    return this.hasService("CacheProvider") && (n = this.getService("CacheProvider").get(e)), n || (n = h.request(e), this.hasService("CacheProvider") && this.getService("CacheProvider").set(e, n)), n.then(async (s) => {
      if (this.containerElement = this.getService("Dom").parseResponse(s), d.commit(y, {
        container: this.containerElement,
        currentHTML: this.getService("Dom").currentHTML
      }), this.getService("Config").manualDomAppend)
        i.resolve(null);
      else {
        this.getService("Dom").putContainer(this.containerElement);
        const a = await this.getService("PageBuilder").buildPage(this.containerElement);
        i.resolve(a);
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
      const n = this.getHref(i), s = this.getTransitionName(i), a = {
        x: e.clientX,
        y: e.clientY
      };
      this.goTo(n, s, i, a);
    }
  }
  preventCheck(e, i) {
    if (!window.history.pushState)
      return !1;
    const n = this.getHref(i);
    return !i || !n || e.button > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || i.target && i.target === "_blank" || window.location.protocol !== i.protocol || window.location.hostname !== i.hostname || h.getPort() !== h.getPort(i.port) || i.getAttribute && typeof i.getAttribute("download") == "string" || h.cleanLink(n) === h.cleanLink(window.location.href) ? !1 : !i.classList.contains(this.getService("Config").noAjaxLinkClass);
  }
  getTransition(e, i) {
    return this.hasService("TransitionFactory") ? this.getService("TransitionFactory").getTransition(e, i) : new W({});
  }
  onStateChange(e) {
    this.handleStateChange(null, !1, null, null);
  }
  handleStateChange(e = null, i = !1, n = null, s = null) {
    const a = this.getCurrentUrl();
    if (this.transitionProgress && this.forceGoTo(a), this.getService("History").currentStatus().url === a)
      return;
    typeof e == "string" || i ? this.currentState = this.getService("History").add(a, e, "ajax") : this.currentState = this.getService("History").add(a, null, "_history"), d.commit(b, {
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
    const l = this.load(a), c = this.getTransition(
      this.getService("History").prevStatus(),
      this.getService("History").currentStatus()
    );
    this.transitionProgress = !0, d.commit(P, {
      transition: c,
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
    const p = c.initTransition(
      this.getService("PageBuilder").page,
      l,
      n,
      s
    );
    l.then(this.onNewPageLoaded), p.then(this.onTransitionEnd);
  }
  onNewPageLoaded(e) {
    if (e) {
      const i = this.getService("History").currentStatus();
      this.getService("Dom").updateBodyAttributes(e), this.getService("Dom").updatePageTitle(e), h.trackGoogleAnalytics(), this.currentState && e && !this.currentState.data.title && e.metaTitle && (this.currentState.data.title = e.metaTitle), d.commit(E, {
        currentStatus: i,
        prevStatus: this.getService("History").prevStatus(),
        currentHTML: this.getService("Dom").currentHTML,
        page: e
      });
    }
  }
  onTransitionEnd() {
    this.transitionProgress = !1, this.linkHash && (window.location.hash = "", window.location.hash = this.linkHash, this.linkHash = null), d.commit(A, {
      currentStatus: this.getService("History").currentStatus(),
      prevStatus: this.getService("History").prevStatus()
    });
  }
}
class te extends g {
  constructor(e, i = "History") {
    super(e, i);
    o(this, "history");
    u(`\u2615\uFE0F ${i} awake`), this.history = [];
  }
  add(e, i, n, s = {}) {
    const a = { url: e, transitionName: i, context: n, data: s };
    return this.history.push(a), a;
  }
  currentStatus() {
    return this.history[this.history.length - 1];
  }
  prevStatus() {
    const e = this.history;
    return e.length < 2 ? null : e[e.length - 2];
  }
}
class ie extends w {
  constructor(t, e = "Prefetch") {
    super(t, e, ["Pjax", "Config"]), u(`\u2615\uFE0F ${e} awake`);
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
      let n = h.request(i);
      this.hasService("CacheProvider") && this.getService("CacheProvider").set(i, n);
    }
  }
}
class ne extends g {
  constructor(e, i = "CacheProvider") {
    super(e, i);
    o(this, "data");
    u(`\u2615\uFE0F ${i} awake`), this.data = {};
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
class X extends g {
  constructor(e, i = "AbstractBlock") {
    super(e, i);
    o(this, "type");
    o(this, "page");
    o(this, "rootElement");
    o(this, "id");
    o(this, "name");
    this.type = null, this.page = null, this.rootElement = null, this.id = null, this.name = null;
  }
  init() {
    u("	\u2733\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey");
  }
  initEvents() {
  }
  destroy() {
    u("	\u{1F5D1}\uFE0F #" + this.id + " %c[" + this.type + "]", "color:grey"), this.destroyEvents();
  }
  destroyEvents() {
  }
  onResize() {
  }
  onPageReady() {
  }
}
class re extends X {
  constructor(e, i = "AbstractInViewBlock") {
    super(e, i);
    o(this, "observer");
    o(this, "observerOptions");
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
class se extends w {
  constructor(e, i = "AbstractSplashscreen") {
    super(e, i);
    o(this, "_splashscreenHidden");
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
class oe extends g {
  getTransition(t, e) {
  }
}
class f {
  static _preventDefault(t) {
    t.preventDefault && t.preventDefault(), t.returnValue = !1;
  }
  static _keydown(t) {
    let e = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "PageUp", "PageDown", "End", "Home", "Space"];
    for (let i = e.length; i--; )
      if (t.code === e[i]) {
        f._preventDefault(t);
        return;
      }
  }
  static _wheel(t) {
    f._preventDefault(t);
  }
  static disable() {
    window.addEventListener && window.addEventListener("wheel", f._wheel, !1), window.onmousewheel = document.onmousewheel = f._wheel, document.onkeydown = f._keydown;
  }
  static enable() {
    window.removeEventListener && window.removeEventListener("wheel", f._wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }
}
function Y(r, t, e) {
  let i, n, s, a = null, l = 0;
  e || (e = {});
  let c = function() {
    l = e && !e.leading ? 0 : Date.now(), a = null, s = r.apply(i, n), a || (i = n = null);
  };
  return function() {
    let p = Date.now();
    !l && e && !e.leading && (l = p);
    let m = t - (p - l);
    return i = this, n = arguments, m <= 0 || m > t ? (a && (clearTimeout(a), a = null), l = p, s = r.apply(i, n), a || (i = n = null)) : !a && (e && e.trailing) !== !1 && (a = setTimeout(c, m)), s;
  };
}
class ae {
  constructor(t) {
    o(this, "options");
    o(this, "lastScrollTop");
    o(this, "_handleScroll");
    o(this, "handleScroll", () => {
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
    this._handleScroll = Y(this.handleScroll, this.options.wait), this.initEvents();
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
function le() {
  window.requestAnimFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(r) {
      window.setTimeout(r, 1e3 / 60);
    };
  }(), window.cancelAnimFrame = function() {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(r) {
      window.clearTimeout(r);
    };
  }();
  {
    let r;
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
    const n = window.console = window.console || {};
    for (; i--; )
      r = e[i], n[r] || (n[r] = t);
  }
  Array.from || (Array.from = function(r) {
    return [].slice.call(r);
  }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
    value: function(r) {
      if (this === null)
        throw new TypeError("Array.prototype.find called on null or undefined");
      if (typeof r != "function")
        throw new TypeError("predicate must be a function");
      let t = Object(this), e = t.length >>> 0, i = arguments[1], n;
      for (let s = 0; s < e; s++)
        if (n = t[s], r.call(i, n, s, t))
          return n;
    }
  }), Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function(r) {
      if (this === null)
        throw new TypeError('"this" is null or not defined');
      let t = Object(this), e = t.length >>> 0;
      if (typeof r != "function")
        throw new TypeError("predicate must be a function");
      let i = arguments[1], n = 0;
      for (; n < e; ) {
        let s = t[n];
        if (r.call(i, s, n, t))
          return n;
        n++;
      }
      return -1;
    }
  }), function() {
    if (typeof window.CustomEvent == "function")
      return;
    function r(t, e) {
      e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
      let i = document.createEvent("CustomEvent");
      return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
    }
    r.prototype = window.Event.prototype, window.CustomEvent = r;
  }();
}
function ce() {
  typeof window.ga < "u" && window.addEventListener("error", function(r) {
    const t = r.colno ? " line:" + r.lineno + ", column:" + r.colno : " line:" + r.lineno;
    window.ga(
      "send",
      "event",
      "JavaScript Error",
      r.message,
      r.filename + t + " -> " + navigator.userAgent,
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
  X as AbstractBlock,
  $ as AbstractBlockBuilder,
  re as AbstractInViewBlock,
  U as AbstractPage,
  g as AbstractService,
  se as AbstractSplashscreen,
  V as AbstractTransition,
  oe as AbstractTransitionFactory,
  M as BlockBuilder,
  ne as CacheProvider,
  W as DefaultTransition,
  ae as DeltaScroll,
  d as Dispatcher,
  J as EventTypes,
  te as History,
  j as PageBuilder,
  ee as Pjax,
  ie as Prefetch,
  f as Scroll,
  F as ServiceContainer,
  h as Utils,
  v as debounce,
  Z as default,
  ce as gaTrackErrors,
  Q as logger,
  le as polyfills,
  Y as throttle
};
