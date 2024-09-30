/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis,
  e$1 = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  s = Symbol(),
  o$1 = new WeakMap();
let n$2 = class n {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (e$1 && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = o$1.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && o$1.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const r$1 = t => new n$2("string" == typeof t ? t : t + "", void 0, s),
  i$1 = (t, ...e) => {
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o) => e + (t => {
      if (!0 === t._$cssResult$) return t.cssText;
      if ("number" == typeof t) return t;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s) + t[o + 1], t[0]);
    return new n$2(o, t, s);
  },
  S$1 = (s, o) => {
    if (e$1) s.adoptedStyleSheets = o.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet);else for (const e of o) {
      const o = document.createElement("style"),
        n = t.litNonce;
      void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
  },
  c$2 = e$1 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
    let e = "";
    for (const s of t.cssRules) e += s.cssText;
    return r$1(e);
  })(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
    is: i,
    defineProperty: e,
    getOwnPropertyDescriptor: r,
    getOwnPropertyNames: h$2,
    getOwnPropertySymbols: o,
    getPrototypeOf: n$1
  } = Object,
  a = globalThis,
  c$1 = a.trustedTypes,
  l = c$1 ? c$1.emptyScript : "",
  p = a.reactiveElementPolyfillSupport,
  d = (t, s) => t,
  u = {
    toAttribute(t, s) {
      switch (s) {
        case Boolean:
          t = t ? l : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, s) {
      let i = t;
      switch (s) {
        case Boolean:
          i = null !== t;
          break;
        case Number:
          i = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            i = JSON.parse(t);
          } catch (t) {
            i = null;
          }
      }
      return i;
    }
  },
  f$2 = (t, s) => !i(t, s),
  y = {
    attribute: !0,
    type: String,
    converter: u,
    reflect: !1,
    hasChanged: f$2
  };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= new WeakMap();
class b extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = y) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = Symbol(),
        r = this.getPropertyDescriptor(t, i, s);
      void 0 !== r && e(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const {
      get: e,
      set: h
    } = r(this.prototype, t) ?? {
      get() {
        return this[s];
      },
      set(t) {
        this[s] = t;
      }
    };
    return {
      get() {
        return e?.call(this);
      },
      set(s) {
        const r = e?.call(this);
        h.call(this, s), this.requestUpdate(t, r, i);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t = n$1(this);
    t.finalize(), void 0 !== t.l && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t = this.properties,
        s = [...h$2(t), ...o(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const t = this[Symbol.metadata];
    if (null !== t) {
      const s = litPropertyMetadata.get(t);
      if (void 0 !== s) for (const [t, i] of s) this.elementProperties.set(t, i);
    }
    this._$Eh = new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      void 0 !== i && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s) {
    const i = [];
    if (Array.isArray(s)) {
      const e = new Set(s.flat(1 / 0).reverse());
      for (const s of e) i.unshift(c$2(s));
    } else void 0 !== s && i.push(c$2(s));
    return i;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(t => t(this));
  }
  addController(t) {
    (this._$EO ??= new Set()).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = new Map(),
      s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(t => t.hostConnected?.());
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    this._$EO?.forEach(t => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$EC(t, s) {
    const i = this.constructor.elementProperties.get(t),
      e = this.constructor._$Eu(t, i);
    if (void 0 !== e && !0 === i.reflect) {
      const r = (void 0 !== i.converter?.toAttribute ? i.converter : u).toAttribute(s, i.type);
      this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor,
      e = i._$Eh.get(t);
    if (void 0 !== e && this._$Em !== e) {
      const t = i.getPropertyOptions(e),
        r = "function" == typeof t.converter ? {
          fromAttribute: t.converter
        } : void 0 !== t.converter?.fromAttribute ? t.converter : u;
      this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
    }
  }
  requestUpdate(t, s, i) {
    if (void 0 !== t) {
      if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? f$2)(this[t], s)) return;
      this.P(t, s, i);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t, s, i) {
    this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set()).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t, s] of this._$Ep) this[t] = s;
        this._$Ep = void 0;
      }
      const t = this.constructor.elementProperties;
      if (t.size > 0) for (const [s, i] of t) !0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach(t => t.hostUpdate?.()), this.update(s)) : this._$EU();
    } catch (s) {
      throw t = !1, this._$EU(), s;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    this._$EO?.forEach(t => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej &&= this._$Ej.forEach(t => this._$EC(t, this[t])), this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
b.elementStyles = [], b.shadowRootOptions = {
  mode: "open"
}, b[d("elementProperties")] = new Map(), b[d("finalized")] = new Map(), p?.({
  ReactiveElement: b
}), (a.reactiveElementVersions ??= []).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n = globalThis,
  c = n.trustedTypes,
  h$1 = c ? c.createPolicy("lit-html", {
    createHTML: t => t
  }) : void 0,
  f$1 = "$lit$",
  v = `lit$${Math.random().toFixed(9).slice(2)}$`,
  m = "?" + v,
  _ = `<${m}>`,
  w = document,
  lt = () => w.createComment(""),
  st = t => null === t || "object" != typeof t && "function" != typeof t,
  g = Array.isArray,
  $ = t => g(t) || "function" == typeof t?.[Symbol.iterator],
  x = "[ \t\n\f\r]",
  T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  E = /-->/g,
  k = />/g,
  O = RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
  S = /'/g,
  j = /"/g,
  M = /^(?:script|style|textarea|title)$/i,
  P = t => (i, ...s) => ({
    _$litType$: t,
    strings: i,
    values: s
  }),
  ke = P(1),
  R = Symbol.for("lit-noChange"),
  D = Symbol.for("lit-nothing"),
  V = new WeakMap(),
  I = w.createTreeWalker(w, 129);
function N(t, i) {
  if (!g(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== h$1 ? h$1.createHTML(i) : i;
}
const U = (t, i) => {
  const s = t.length - 1,
    e = [];
  let h,
    o = 2 === i ? "<svg>" : 3 === i ? "<math>" : "",
    n = T;
  for (let i = 0; i < s; i++) {
    const s = t[i];
    let r,
      l,
      c = -1,
      a = 0;
    for (; a < s.length && (n.lastIndex = a, l = n.exec(s), null !== l);) a = n.lastIndex, n === T ? "!--" === l[1] ? n = E : void 0 !== l[1] ? n = k : void 0 !== l[2] ? (M.test(l[2]) && (h = RegExp("</" + l[2], "g")), n = O) : void 0 !== l[3] && (n = O) : n === O ? ">" === l[0] ? (n = h ?? T, c = -1) : void 0 === l[1] ? c = -2 : (c = n.lastIndex - l[2].length, r = l[1], n = void 0 === l[3] ? O : '"' === l[3] ? j : S) : n === j || n === S ? n = O : n === E || n === k ? n = T : (n = O, h = void 0);
    const u = n === O && t[i + 1].startsWith("/>") ? " " : "";
    o += n === T ? s + _ : c >= 0 ? (e.push(r), s.slice(0, c) + f$1 + s.slice(c) + v + u) : s + v + (-2 === c ? i : u);
  }
  return [N(t, o + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")), e];
};
class B {
  constructor({
    strings: t,
    _$litType$: i
  }, s) {
    let e;
    this.parts = [];
    let h = 0,
      o = 0;
    const n = t.length - 1,
      r = this.parts,
      [l, a] = U(t, i);
    if (this.el = B.createElement(l, s), I.currentNode = this.el.content, 2 === i || 3 === i) {
      const t = this.el.content.firstChild;
      t.replaceWith(...t.childNodes);
    }
    for (; null !== (e = I.nextNode()) && r.length < n;) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) for (const t of e.getAttributeNames()) if (t.endsWith(f$1)) {
          const i = a[o++],
            s = e.getAttribute(t).split(v),
            n = /([.?@])?(.*)/.exec(i);
          r.push({
            type: 1,
            index: h,
            name: n[2],
            strings: s,
            ctor: "." === n[1] ? Y : "?" === n[1] ? Z : "@" === n[1] ? q : G
          }), e.removeAttribute(t);
        } else t.startsWith(v) && (r.push({
          type: 6,
          index: h
        }), e.removeAttribute(t));
        if (M.test(e.tagName)) {
          const t = e.textContent.split(v),
            i = t.length - 1;
          if (i > 0) {
            e.textContent = c ? c.emptyScript : "";
            for (let s = 0; s < i; s++) e.append(t[s], lt()), I.nextNode(), r.push({
              type: 2,
              index: ++h
            });
            e.append(t[i], lt());
          }
        }
      } else if (8 === e.nodeType) if (e.data === m) r.push({
        type: 2,
        index: h
      });else {
        let t = -1;
        for (; -1 !== (t = e.data.indexOf(v, t + 1));) r.push({
          type: 7,
          index: h
        }), t += v.length - 1;
      }
      h++;
    }
  }
  static createElement(t, i) {
    const s = w.createElement("template");
    return s.innerHTML = t, s;
  }
}
function z(t, i, s = t, e) {
  if (i === R) return i;
  let h = void 0 !== e ? s.o?.[e] : s.l;
  const o = st(i) ? void 0 : i._$litDirective$;
  return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s.o ??= [])[e] = h : s.l = h), void 0 !== h && (i = z(t, h._$AS(t, i.values), h, e)), i;
}
class F {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const {
        el: {
          content: i
        },
        parts: s
      } = this._$AD,
      e = (t?.creationScope ?? w).importNode(i, !0);
    I.currentNode = e;
    let h = I.nextNode(),
      o = 0,
      n = 0,
      r = s[0];
    for (; void 0 !== r;) {
      if (o === r.index) {
        let i;
        2 === r.type ? i = new et(h, h.nextSibling, this, t) : 1 === r.type ? i = new r.ctor(h, r.name, r.strings, this, t) : 6 === r.type && (i = new K(h, this, t)), this._$AV.push(i), r = s[++n];
      }
      o !== r?.index && (h = I.nextNode(), o++);
    }
    return I.currentNode = w, e;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class et {
  get _$AU() {
    return this._$AM?._$AU ?? this.v;
  }
  constructor(t, i, s, e) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this.v = e?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = z(this, t, i), st(t) ? t === D || null == t || "" === t ? (this._$AH !== D && this._$AR(), this._$AH = D) : t !== this._$AH && t !== R && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : $(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const {
        values: i,
        _$litType$: s
      } = t,
      e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = B.createElement(N(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === e) this._$AH.p(i);else {
      const t = new F(e, this),
        s = t.u(this.options);
      t.p(i), this.T(s), this._$AH = t;
    }
  }
  _$AC(t) {
    let i = V.get(t.strings);
    return void 0 === i && V.set(t.strings, i = new B(t)), i;
  }
  k(t) {
    g(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const h of t) e === i.length ? i.push(s = new et(this.O(lt()), this.O(lt()), this, this.options)) : s = i[e], s._$AI(h), e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    void 0 === this._$AM && (this.v = t, this._$AP?.(t));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, e, h) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = D;
  }
  _$AI(t, i = this, s, e) {
    const h = this.strings;
    let o = !1;
    if (void 0 === h) t = z(this, t, i, 0), o = !st(t) || t !== this._$AH && t !== R, o && (this._$AH = t);else {
      const e = t;
      let n, r;
      for (t = h[0], n = 0; n < h.length - 1; n++) r = z(this, e[s + n], i, n), r === R && (r = this._$AH[n]), o ||= !st(r) || r !== this._$AH[n], r === D ? t = D : t !== D && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
    }
    o && !e && this.j(t);
  }
  j(t) {
    t === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Y extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === D ? void 0 : t;
  }
}
class Z extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== D);
  }
}
class q extends G {
  constructor(t, i, s, e, h) {
    super(t, i, s, e, h), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = z(this, t, i, 0) ?? D) === R) return;
    const s = this._$AH,
      e = t === D && s !== D || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive,
      h = t !== D && (s === D || e);
    e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class K {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const Re = n.litHtmlPolyfillSupport;
Re?.(B, et), (n.litHtmlVersions ??= []).push("3.2.0");
const Q = (t, i, s) => {
  const e = s?.renderBefore ?? i;
  let h = e._$litPart$;
  if (void 0 === h) {
    const t = s?.renderBefore ?? null;
    e._$litPart$ = h = new et(i.insertBefore(lt(), t), t, void 0, s ?? {});
  }
  return h._$AI(t), h;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class h extends b {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this.o = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this.o = Q(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this.o?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.o?.setConnected(!1);
  }
  render() {
    return R;
  }
}
h._$litElement$ = !0, h["finalized"] = !0, globalThis.litElementHydrateSupport?.({
  LitElement: h
});
const f = globalThis.litElementPolyfillSupport;
f?.({
  LitElement: h
});
(globalThis.litElementVersions ??= []).push("4.1.0");

/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 *
 * `simple-colors-shared-styles`
 * @element simple-colors-shared-styles
 * a shared set of styles for `simple-colors`
 *
 *

 * @demo ./demo/index.html
 */
globalThis.SimpleColorsSharedStyles = {};
globalThis.SimpleColorsSharedStyles.instance = null;
class SimpleColorsSharedStyles extends h {
  //styles function
  static get styles() {
    return [i$1` html {
          --simple-colors-default-theme-accent-1: #ffffff;
          --simple-colors-default-theme-accent-2: #eeeeee;
          --simple-colors-default-theme-accent-3: #dddddd;
          --simple-colors-default-theme-accent-4: #cccccc;
          --simple-colors-default-theme-accent-5: #bbbbbb;
          --simple-colors-default-theme-accent-6: #999999;
          --simple-colors-default-theme-accent-7: #666666;
          --simple-colors-default-theme-accent-8: #444444;
          --simple-colors-default-theme-accent-9: #333333;
          --simple-colors-default-theme-accent-10: #222222;
          --simple-colors-default-theme-accent-11: #111111;
          --simple-colors-default-theme-accent-12: #000000;

          --simple-colors-default-theme-grey-1: #ffffff;
          --simple-colors-default-theme-grey-2: #eeeeee;
          --simple-colors-default-theme-grey-3: #dddddd;
          --simple-colors-default-theme-grey-4: #cccccc;
          --simple-colors-default-theme-grey-5: #bbbbbb;
          --simple-colors-default-theme-grey-6: #999999;
          --simple-colors-default-theme-grey-7: #666666;
          --simple-colors-default-theme-grey-8: #444444;
          --simple-colors-default-theme-grey-9: #333333;
          --simple-colors-default-theme-grey-10: #222222;
          --simple-colors-default-theme-grey-11: #111111;
          --simple-colors-default-theme-grey-12: #000000;

          --simple-colors-default-theme-red-1: #ffdddd;
          --simple-colors-default-theme-red-2: #ffaeae;
          --simple-colors-default-theme-red-3: #ff8f8f;
          --simple-colors-default-theme-red-4: #ff7474;
          --simple-colors-default-theme-red-5: #fd5151;
          --simple-colors-default-theme-red-6: #ff2222;
          --simple-colors-default-theme-red-7: #ee0000;
          --simple-colors-default-theme-red-8: #ac0000;
          --simple-colors-default-theme-red-9: #850000;
          --simple-colors-default-theme-red-10: #670000;
          --simple-colors-default-theme-red-11: #520000;
          --simple-colors-default-theme-red-12: #3f0000;

          --simple-colors-default-theme-pink-1: #ffe6f1;
          --simple-colors-default-theme-pink-2: #ffa5cf;
          --simple-colors-default-theme-pink-3: #ff87c0;
          --simple-colors-default-theme-pink-4: #ff73b5;
          --simple-colors-default-theme-pink-5: #fd60aa;
          --simple-colors-default-theme-pink-6: #ff3996;
          --simple-colors-default-theme-pink-7: #da004e;
          --simple-colors-default-theme-pink-8: #b80042;
          --simple-colors-default-theme-pink-9: #980036;
          --simple-colors-default-theme-pink-10: #78002b;
          --simple-colors-default-theme-pink-11: #5a0020;
          --simple-colors-default-theme-pink-12: #440019;

          --simple-colors-default-theme-purple-1: #fce6ff;
          --simple-colors-default-theme-purple-2: #f4affd;
          --simple-colors-default-theme-purple-3: #f394ff;
          --simple-colors-default-theme-purple-4: #f07cff;
          --simple-colors-default-theme-purple-5: #ed61ff;
          --simple-colors-default-theme-purple-6: #e200ff;
          --simple-colors-default-theme-purple-7: #a500ba;
          --simple-colors-default-theme-purple-8: #8a009b;
          --simple-colors-default-theme-purple-9: #6c0079;
          --simple-colors-default-theme-purple-10: #490052;
          --simple-colors-default-theme-purple-11: #33003a;
          --simple-colors-default-theme-purple-12: #200025;

          --simple-colors-default-theme-deep-purple-1: #f3e4ff;
          --simple-colors-default-theme-deep-purple-2: #ddacff;
          --simple-colors-default-theme-deep-purple-3: #c97eff;
          --simple-colors-default-theme-deep-purple-4: #bb63f9;
          --simple-colors-default-theme-deep-purple-5: #b44aff;
          --simple-colors-default-theme-deep-purple-6: #a931ff;
          --simple-colors-default-theme-deep-purple-7: #7e00d8;
          --simple-colors-default-theme-deep-purple-8: #5d009f;
          --simple-colors-default-theme-deep-purple-9: #4c0081;
          --simple-colors-default-theme-deep-purple-10: #3a0063;
          --simple-colors-default-theme-deep-purple-11: #2a0049;
          --simple-colors-default-theme-deep-purple-12: #1d0033;

          --simple-colors-default-theme-indigo-1: #e5ddff;
          --simple-colors-default-theme-indigo-2: #c3b2ff;
          --simple-colors-default-theme-indigo-3: #af97ff;
          --simple-colors-default-theme-indigo-4: #9e82ff;
          --simple-colors-default-theme-indigo-5: #9373ff;
          --simple-colors-default-theme-indigo-6: #835fff;
          --simple-colors-default-theme-indigo-7: #3a00ff;
          --simple-colors-default-theme-indigo-8: #2801b0;
          --simple-colors-default-theme-indigo-9: #20008c;
          --simple-colors-default-theme-indigo-10: #160063;
          --simple-colors-default-theme-indigo-11: #100049;
          --simple-colors-default-theme-indigo-12: #0a0030;

          --simple-colors-default-theme-blue-1: #e2ecff;
          --simple-colors-default-theme-blue-2: #acc9ff;
          --simple-colors-default-theme-blue-3: #95baff;
          --simple-colors-default-theme-blue-4: #74a5ff;
          --simple-colors-default-theme-blue-5: #5892fd;
          --simple-colors-default-theme-blue-6: #4083ff;
          --simple-colors-default-theme-blue-7: #0059ff;
          --simple-colors-default-theme-blue-8: #0041bb;
          --simple-colors-default-theme-blue-9: #003494;
          --simple-colors-default-theme-blue-10: #002569;
          --simple-colors-default-theme-blue-11: #001947;
          --simple-colors-default-theme-blue-12: #001333;

          --simple-colors-default-theme-light-blue-1: #cde8ff;
          --simple-colors-default-theme-light-blue-2: #a1d1ff;
          --simple-colors-default-theme-light-blue-3: #92c9ff;
          --simple-colors-default-theme-light-blue-4: #65b3ff;
          --simple-colors-default-theme-light-blue-5: #58adff;
          --simple-colors-default-theme-light-blue-6: #41a1ff;
          --simple-colors-default-theme-light-blue-7: #007ffc;
          --simple-colors-default-theme-light-blue-8: #0066ca;
          --simple-colors-default-theme-light-blue-9: #0055a8;
          --simple-colors-default-theme-light-blue-10: #003f7d;
          --simple-colors-default-theme-light-blue-11: #002850;
          --simple-colors-default-theme-light-blue-12: #001b36;

          --simple-colors-default-theme-cyan-1: #ccf3fd;
          --simple-colors-default-theme-cyan-2: #9beaff;
          --simple-colors-default-theme-cyan-3: #77e2ff;
          --simple-colors-default-theme-cyan-4: #33d4ff;
          --simple-colors-default-theme-cyan-5: #1ccfff;
          --simple-colors-default-theme-cyan-6: #00c9ff;
          --simple-colors-default-theme-cyan-7: #009dc7;
          --simple-colors-default-theme-cyan-8: #007999;
          --simple-colors-default-theme-cyan-9: #005970;
          --simple-colors-default-theme-cyan-10: #003f50;
          --simple-colors-default-theme-cyan-11: #002c38;
          --simple-colors-default-theme-cyan-12: #001a20;

          --simple-colors-default-theme-teal-1: #d4ffee;
          --simple-colors-default-theme-teal-2: #98ffd7;
          --simple-colors-default-theme-teal-3: #79ffcb;
          --simple-colors-default-theme-teal-4: #56ffbd;
          --simple-colors-default-theme-teal-5: #29ffac;
          --simple-colors-default-theme-teal-6: #00ff9c;
          --simple-colors-default-theme-teal-7: #009d75;
          --simple-colors-default-theme-teal-8: #007658;
          --simple-colors-default-theme-teal-9: #004e3a;
          --simple-colors-default-theme-teal-10: #003829;
          --simple-colors-default-theme-teal-11: #002a20;
          --simple-colors-default-theme-teal-12: #001b14;

          --simple-colors-default-theme-green-1: #e1ffeb;
          --simple-colors-default-theme-green-2: #acffc9;
          --simple-colors-default-theme-green-3: #79ffa7;
          --simple-colors-default-theme-green-4: #49ff88;
          --simple-colors-default-theme-green-5: #24ff70;
          --simple-colors-default-theme-green-6: #00f961;
          --simple-colors-default-theme-green-7: #008c37;
          --simple-colors-default-theme-green-8: #00762e;
          --simple-colors-default-theme-green-9: #005a23;
          --simple-colors-default-theme-green-10: #003d18;
          --simple-colors-default-theme-green-11: #002a11;
          --simple-colors-default-theme-green-12: #001d0c;

          --simple-colors-default-theme-light-green-1: #ebffdb;
          --simple-colors-default-theme-light-green-2: #c7ff9b;
          --simple-colors-default-theme-light-green-3: #b1ff75;
          --simple-colors-default-theme-light-green-4: #a1fd5a;
          --simple-colors-default-theme-light-green-5: #8efd38;
          --simple-colors-default-theme-light-green-6: #6fff00;
          --simple-colors-default-theme-light-green-7: #429d00;
          --simple-colors-default-theme-light-green-8: #357f00;
          --simple-colors-default-theme-light-green-9: #296100;
          --simple-colors-default-theme-light-green-10: #1b3f00;
          --simple-colors-default-theme-light-green-11: #143000;
          --simple-colors-default-theme-light-green-12: #0d2000;

          --simple-colors-default-theme-lime-1: #f1ffd2;
          --simple-colors-default-theme-lime-2: #dfff9b;
          --simple-colors-default-theme-lime-3: #d4ff77;
          --simple-colors-default-theme-lime-4: #caff58;
          --simple-colors-default-theme-lime-5: #bdff2d;
          --simple-colors-default-theme-lime-6: #aeff00;
          --simple-colors-default-theme-lime-7: #649900;
          --simple-colors-default-theme-lime-8: #4d7600;
          --simple-colors-default-theme-lime-9: #3b5a00;
          --simple-colors-default-theme-lime-10: #293f00;
          --simple-colors-default-theme-lime-11: #223400;
          --simple-colors-default-theme-lime-12: #182400;

          --simple-colors-default-theme-yellow-1: #ffffd5;
          --simple-colors-default-theme-yellow-2: #ffffac;
          --simple-colors-default-theme-yellow-3: #ffff90;
          --simple-colors-default-theme-yellow-4: #ffff7c;
          --simple-colors-default-theme-yellow-5: #ffff3a;
          --simple-colors-default-theme-yellow-6: #f6f600;
          --simple-colors-default-theme-yellow-7: #929100;
          --simple-colors-default-theme-yellow-8: #787700;
          --simple-colors-default-theme-yellow-9: #585700;
          --simple-colors-default-theme-yellow-10: #454400;
          --simple-colors-default-theme-yellow-11: #303000;
          --simple-colors-default-theme-yellow-12: #242400;

          --simple-colors-default-theme-amber-1: #fff2d4;
          --simple-colors-default-theme-amber-2: #ffdf92;
          --simple-colors-default-theme-amber-3: #ffd677;
          --simple-colors-default-theme-amber-4: #ffcf5e;
          --simple-colors-default-theme-amber-5: #ffc235;
          --simple-colors-default-theme-amber-6: #ffc500;
          --simple-colors-default-theme-amber-7: #b28900;
          --simple-colors-default-theme-amber-8: #876800;
          --simple-colors-default-theme-amber-9: #614b00;
          --simple-colors-default-theme-amber-10: #413200;
          --simple-colors-default-theme-amber-11: #302500;
          --simple-colors-default-theme-amber-12: #221a00;

          --simple-colors-default-theme-orange-1: #ffebd7;
          --simple-colors-default-theme-orange-2: #ffca92;
          --simple-colors-default-theme-orange-3: #ffbd75;
          --simple-colors-default-theme-orange-4: #ffb05c;
          --simple-colors-default-theme-orange-5: #ff9e36;
          --simple-colors-default-theme-orange-6: #ff9625;
          --simple-colors-default-theme-orange-7: #e56a00;
          --simple-colors-default-theme-orange-8: #ae5100;
          --simple-colors-default-theme-orange-9: #833d00;
          --simple-colors-default-theme-orange-10: #612d00;
          --simple-colors-default-theme-orange-11: #3d1c00;
          --simple-colors-default-theme-orange-12: #2c1400;

          --simple-colors-default-theme-deep-orange-1: #ffe7e0;
          --simple-colors-default-theme-deep-orange-2: #ffb299;
          --simple-colors-default-theme-deep-orange-3: #ffa588;
          --simple-colors-default-theme-deep-orange-4: #ff8a64;
          --simple-colors-default-theme-deep-orange-5: #ff7649;
          --simple-colors-default-theme-deep-orange-6: #ff6c3c;
          --simple-colors-default-theme-deep-orange-7: #f53100;
          --simple-colors-default-theme-deep-orange-8: #b92500;
          --simple-colors-default-theme-deep-orange-9: #8a1c00;
          --simple-colors-default-theme-deep-orange-10: #561100;
          --simple-colors-default-theme-deep-orange-11: #3a0c00;
          --simple-colors-default-theme-deep-orange-12: #240700;

          --simple-colors-default-theme-brown-1: #f0e2de;
          --simple-colors-default-theme-brown-2: #e5b8aa;
          --simple-colors-default-theme-brown-3: #c59485;
          --simple-colors-default-theme-brown-4: #b68373;
          --simple-colors-default-theme-brown-5: #ac7868;
          --simple-colors-default-theme-brown-6: #a47060;
          --simple-colors-default-theme-brown-7: #85574a;
          --simple-colors-default-theme-brown-8: #724539;
          --simple-colors-default-theme-brown-9: #5b3328;
          --simple-colors-default-theme-brown-10: #3b1e15;
          --simple-colors-default-theme-brown-11: #2c140e;
          --simple-colors-default-theme-brown-12: #200e09;

          --simple-colors-default-theme-blue-grey-1: #e7eff1;
          --simple-colors-default-theme-blue-grey-2: #b1c5ce;
          --simple-colors-default-theme-blue-grey-3: #9badb6;
          --simple-colors-default-theme-blue-grey-4: #8d9fa7;
          --simple-colors-default-theme-blue-grey-5: #7a8f98;
          --simple-colors-default-theme-blue-grey-6: #718892;
          --simple-colors-default-theme-blue-grey-7: #56707c;
          --simple-colors-default-theme-blue-grey-8: #40535b;
          --simple-colors-default-theme-blue-grey-9: #2f3e45;
          --simple-colors-default-theme-blue-grey-10: #1e282c;
          --simple-colors-default-theme-blue-grey-11: #182023;
          --simple-colors-default-theme-blue-grey-12: #0f1518;
          --simple-colors-fixed-theme-accent-1: #ffffff;
          --simple-colors-fixed-theme-accent-2: #eeeeee;
          --simple-colors-fixed-theme-accent-3: #dddddd;
          --simple-colors-fixed-theme-accent-4: #cccccc;
          --simple-colors-fixed-theme-accent-5: #bbbbbb;
          --simple-colors-fixed-theme-accent-6: #999999;
          --simple-colors-fixed-theme-accent-7: #666666;
          --simple-colors-fixed-theme-accent-8: #444444;
          --simple-colors-fixed-theme-accent-9: #333333;
          --simple-colors-fixed-theme-accent-10: #222222;
          --simple-colors-fixed-theme-accent-11: #111111;
          --simple-colors-fixed-theme-accent-12: #000000;

          --simple-colors-fixed-theme-grey-1: #ffffff;
          --simple-colors-fixed-theme-grey-2: #eeeeee;
          --simple-colors-fixed-theme-grey-3: #dddddd;
          --simple-colors-fixed-theme-grey-4: #cccccc;
          --simple-colors-fixed-theme-grey-5: #bbbbbb;
          --simple-colors-fixed-theme-grey-6: #999999;
          --simple-colors-fixed-theme-grey-7: #666666;
          --simple-colors-fixed-theme-grey-8: #444444;
          --simple-colors-fixed-theme-grey-9: #333333;
          --simple-colors-fixed-theme-grey-10: #222222;
          --simple-colors-fixed-theme-grey-11: #111111;
          --simple-colors-fixed-theme-grey-12: #000000;

          --simple-colors-fixed-theme-red-1: #ffdddd;
          --simple-colors-fixed-theme-red-2: #ffaeae;
          --simple-colors-fixed-theme-red-3: #ff8f8f;
          --simple-colors-fixed-theme-red-4: #ff7474;
          --simple-colors-fixed-theme-red-5: #fd5151;
          --simple-colors-fixed-theme-red-6: #ff2222;
          --simple-colors-fixed-theme-red-7: #ee0000;
          --simple-colors-fixed-theme-red-8: #ac0000;
          --simple-colors-fixed-theme-red-9: #850000;
          --simple-colors-fixed-theme-red-10: #670000;
          --simple-colors-fixed-theme-red-11: #520000;
          --simple-colors-fixed-theme-red-12: #3f0000;

          --simple-colors-fixed-theme-pink-1: #ffe6f1;
          --simple-colors-fixed-theme-pink-2: #ffa5cf;
          --simple-colors-fixed-theme-pink-3: #ff87c0;
          --simple-colors-fixed-theme-pink-4: #ff73b5;
          --simple-colors-fixed-theme-pink-5: #fd60aa;
          --simple-colors-fixed-theme-pink-6: #ff3996;
          --simple-colors-fixed-theme-pink-7: #da004e;
          --simple-colors-fixed-theme-pink-8: #b80042;
          --simple-colors-fixed-theme-pink-9: #980036;
          --simple-colors-fixed-theme-pink-10: #78002b;
          --simple-colors-fixed-theme-pink-11: #5a0020;
          --simple-colors-fixed-theme-pink-12: #440019;

          --simple-colors-fixed-theme-purple-1: #fce6ff;
          --simple-colors-fixed-theme-purple-2: #f4affd;
          --simple-colors-fixed-theme-purple-3: #f394ff;
          --simple-colors-fixed-theme-purple-4: #f07cff;
          --simple-colors-fixed-theme-purple-5: #ed61ff;
          --simple-colors-fixed-theme-purple-6: #e200ff;
          --simple-colors-fixed-theme-purple-7: #a500ba;
          --simple-colors-fixed-theme-purple-8: #8a009b;
          --simple-colors-fixed-theme-purple-9: #6c0079;
          --simple-colors-fixed-theme-purple-10: #490052;
          --simple-colors-fixed-theme-purple-11: #33003a;
          --simple-colors-fixed-theme-purple-12: #200025;

          --simple-colors-fixed-theme-deep-purple-1: #f3e4ff;
          --simple-colors-fixed-theme-deep-purple-2: #ddacff;
          --simple-colors-fixed-theme-deep-purple-3: #c97eff;
          --simple-colors-fixed-theme-deep-purple-4: #bb63f9;
          --simple-colors-fixed-theme-deep-purple-5: #b44aff;
          --simple-colors-fixed-theme-deep-purple-6: #a931ff;
          --simple-colors-fixed-theme-deep-purple-7: #7e00d8;
          --simple-colors-fixed-theme-deep-purple-8: #5d009f;
          --simple-colors-fixed-theme-deep-purple-9: #4c0081;
          --simple-colors-fixed-theme-deep-purple-10: #3a0063;
          --simple-colors-fixed-theme-deep-purple-11: #2a0049;
          --simple-colors-fixed-theme-deep-purple-12: #1d0033;

          --simple-colors-fixed-theme-indigo-1: #e5ddff;
          --simple-colors-fixed-theme-indigo-2: #c3b2ff;
          --simple-colors-fixed-theme-indigo-3: #af97ff;
          --simple-colors-fixed-theme-indigo-4: #9e82ff;
          --simple-colors-fixed-theme-indigo-5: #9373ff;
          --simple-colors-fixed-theme-indigo-6: #835fff;
          --simple-colors-fixed-theme-indigo-7: #3a00ff;
          --simple-colors-fixed-theme-indigo-8: #2801b0;
          --simple-colors-fixed-theme-indigo-9: #20008c;
          --simple-colors-fixed-theme-indigo-10: #160063;
          --simple-colors-fixed-theme-indigo-11: #100049;
          --simple-colors-fixed-theme-indigo-12: #0a0030;

          --simple-colors-fixed-theme-blue-1: #e2ecff;
          --simple-colors-fixed-theme-blue-2: #acc9ff;
          --simple-colors-fixed-theme-blue-3: #95baff;
          --simple-colors-fixed-theme-blue-4: #74a5ff;
          --simple-colors-fixed-theme-blue-5: #5892fd;
          --simple-colors-fixed-theme-blue-6: #4083ff;
          --simple-colors-fixed-theme-blue-7: #0059ff;
          --simple-colors-fixed-theme-blue-8: #0041bb;
          --simple-colors-fixed-theme-blue-9: #003494;
          --simple-colors-fixed-theme-blue-10: #002569;
          --simple-colors-fixed-theme-blue-11: #001947;
          --simple-colors-fixed-theme-blue-12: #001333;

          --simple-colors-fixed-theme-light-blue-1: #cde8ff;
          --simple-colors-fixed-theme-light-blue-2: #a1d1ff;
          --simple-colors-fixed-theme-light-blue-3: #92c9ff;
          --simple-colors-fixed-theme-light-blue-4: #65b3ff;
          --simple-colors-fixed-theme-light-blue-5: #58adff;
          --simple-colors-fixed-theme-light-blue-6: #41a1ff;
          --simple-colors-fixed-theme-light-blue-7: #007ffc;
          --simple-colors-fixed-theme-light-blue-8: #0066ca;
          --simple-colors-fixed-theme-light-blue-9: #0055a8;
          --simple-colors-fixed-theme-light-blue-10: #003f7d;
          --simple-colors-fixed-theme-light-blue-11: #002850;
          --simple-colors-fixed-theme-light-blue-12: #001b36;

          --simple-colors-fixed-theme-cyan-1: #ccf3fd;
          --simple-colors-fixed-theme-cyan-2: #9beaff;
          --simple-colors-fixed-theme-cyan-3: #77e2ff;
          --simple-colors-fixed-theme-cyan-4: #33d4ff;
          --simple-colors-fixed-theme-cyan-5: #1ccfff;
          --simple-colors-fixed-theme-cyan-6: #00c9ff;
          --simple-colors-fixed-theme-cyan-7: #009dc7;
          --simple-colors-fixed-theme-cyan-8: #007999;
          --simple-colors-fixed-theme-cyan-9: #005970;
          --simple-colors-fixed-theme-cyan-10: #003f50;
          --simple-colors-fixed-theme-cyan-11: #002c38;
          --simple-colors-fixed-theme-cyan-12: #001a20;

          --simple-colors-fixed-theme-teal-1: #d4ffee;
          --simple-colors-fixed-theme-teal-2: #98ffd7;
          --simple-colors-fixed-theme-teal-3: #79ffcb;
          --simple-colors-fixed-theme-teal-4: #56ffbd;
          --simple-colors-fixed-theme-teal-5: #29ffac;
          --simple-colors-fixed-theme-teal-6: #00ff9c;
          --simple-colors-fixed-theme-teal-7: #009d75;
          --simple-colors-fixed-theme-teal-8: #007658;
          --simple-colors-fixed-theme-teal-9: #004e3a;
          --simple-colors-fixed-theme-teal-10: #003829;
          --simple-colors-fixed-theme-teal-11: #002a20;
          --simple-colors-fixed-theme-teal-12: #001b14;

          --simple-colors-fixed-theme-green-1: #e1ffeb;
          --simple-colors-fixed-theme-green-2: #acffc9;
          --simple-colors-fixed-theme-green-3: #79ffa7;
          --simple-colors-fixed-theme-green-4: #49ff88;
          --simple-colors-fixed-theme-green-5: #24ff70;
          --simple-colors-fixed-theme-green-6: #00f961;
          --simple-colors-fixed-theme-green-7: #008c37;
          --simple-colors-fixed-theme-green-8: #00762e;
          --simple-colors-fixed-theme-green-9: #005a23;
          --simple-colors-fixed-theme-green-10: #003d18;
          --simple-colors-fixed-theme-green-11: #002a11;
          --simple-colors-fixed-theme-green-12: #001d0c;

          --simple-colors-fixed-theme-light-green-1: #ebffdb;
          --simple-colors-fixed-theme-light-green-2: #c7ff9b;
          --simple-colors-fixed-theme-light-green-3: #b1ff75;
          --simple-colors-fixed-theme-light-green-4: #a1fd5a;
          --simple-colors-fixed-theme-light-green-5: #8efd38;
          --simple-colors-fixed-theme-light-green-6: #6fff00;
          --simple-colors-fixed-theme-light-green-7: #429d00;
          --simple-colors-fixed-theme-light-green-8: #357f00;
          --simple-colors-fixed-theme-light-green-9: #296100;
          --simple-colors-fixed-theme-light-green-10: #1b3f00;
          --simple-colors-fixed-theme-light-green-11: #143000;
          --simple-colors-fixed-theme-light-green-12: #0d2000;

          --simple-colors-fixed-theme-lime-1: #f1ffd2;
          --simple-colors-fixed-theme-lime-2: #dfff9b;
          --simple-colors-fixed-theme-lime-3: #d4ff77;
          --simple-colors-fixed-theme-lime-4: #caff58;
          --simple-colors-fixed-theme-lime-5: #bdff2d;
          --simple-colors-fixed-theme-lime-6: #aeff00;
          --simple-colors-fixed-theme-lime-7: #649900;
          --simple-colors-fixed-theme-lime-8: #4d7600;
          --simple-colors-fixed-theme-lime-9: #3b5a00;
          --simple-colors-fixed-theme-lime-10: #293f00;
          --simple-colors-fixed-theme-lime-11: #223400;
          --simple-colors-fixed-theme-lime-12: #182400;

          --simple-colors-fixed-theme-yellow-1: #ffffd5;
          --simple-colors-fixed-theme-yellow-2: #ffffac;
          --simple-colors-fixed-theme-yellow-3: #ffff90;
          --simple-colors-fixed-theme-yellow-4: #ffff7c;
          --simple-colors-fixed-theme-yellow-5: #ffff3a;
          --simple-colors-fixed-theme-yellow-6: #f6f600;
          --simple-colors-fixed-theme-yellow-7: #929100;
          --simple-colors-fixed-theme-yellow-8: #787700;
          --simple-colors-fixed-theme-yellow-9: #585700;
          --simple-colors-fixed-theme-yellow-10: #454400;
          --simple-colors-fixed-theme-yellow-11: #303000;
          --simple-colors-fixed-theme-yellow-12: #242400;

          --simple-colors-fixed-theme-amber-1: #fff2d4;
          --simple-colors-fixed-theme-amber-2: #ffdf92;
          --simple-colors-fixed-theme-amber-3: #ffd677;
          --simple-colors-fixed-theme-amber-4: #ffcf5e;
          --simple-colors-fixed-theme-amber-5: #ffc235;
          --simple-colors-fixed-theme-amber-6: #ffc500;
          --simple-colors-fixed-theme-amber-7: #b28900;
          --simple-colors-fixed-theme-amber-8: #876800;
          --simple-colors-fixed-theme-amber-9: #614b00;
          --simple-colors-fixed-theme-amber-10: #413200;
          --simple-colors-fixed-theme-amber-11: #302500;
          --simple-colors-fixed-theme-amber-12: #221a00;

          --simple-colors-fixed-theme-orange-1: #ffebd7;
          --simple-colors-fixed-theme-orange-2: #ffca92;
          --simple-colors-fixed-theme-orange-3: #ffbd75;
          --simple-colors-fixed-theme-orange-4: #ffb05c;
          --simple-colors-fixed-theme-orange-5: #ff9e36;
          --simple-colors-fixed-theme-orange-6: #ff9625;
          --simple-colors-fixed-theme-orange-7: #e56a00;
          --simple-colors-fixed-theme-orange-8: #ae5100;
          --simple-colors-fixed-theme-orange-9: #833d00;
          --simple-colors-fixed-theme-orange-10: #612d00;
          --simple-colors-fixed-theme-orange-11: #3d1c00;
          --simple-colors-fixed-theme-orange-12: #2c1400;

          --simple-colors-fixed-theme-deep-orange-1: #ffe7e0;
          --simple-colors-fixed-theme-deep-orange-2: #ffb299;
          --simple-colors-fixed-theme-deep-orange-3: #ffa588;
          --simple-colors-fixed-theme-deep-orange-4: #ff8a64;
          --simple-colors-fixed-theme-deep-orange-5: #ff7649;
          --simple-colors-fixed-theme-deep-orange-6: #ff6c3c;
          --simple-colors-fixed-theme-deep-orange-7: #f53100;
          --simple-colors-fixed-theme-deep-orange-8: #b92500;
          --simple-colors-fixed-theme-deep-orange-9: #8a1c00;
          --simple-colors-fixed-theme-deep-orange-10: #561100;
          --simple-colors-fixed-theme-deep-orange-11: #3a0c00;
          --simple-colors-fixed-theme-deep-orange-12: #240700;

          --simple-colors-fixed-theme-brown-1: #f0e2de;
          --simple-colors-fixed-theme-brown-2: #e5b8aa;
          --simple-colors-fixed-theme-brown-3: #c59485;
          --simple-colors-fixed-theme-brown-4: #b68373;
          --simple-colors-fixed-theme-brown-5: #ac7868;
          --simple-colors-fixed-theme-brown-6: #a47060;
          --simple-colors-fixed-theme-brown-7: #85574a;
          --simple-colors-fixed-theme-brown-8: #724539;
          --simple-colors-fixed-theme-brown-9: #5b3328;
          --simple-colors-fixed-theme-brown-10: #3b1e15;
          --simple-colors-fixed-theme-brown-11: #2c140e;
          --simple-colors-fixed-theme-brown-12: #200e09;

          --simple-colors-fixed-theme-blue-grey-1: #e7eff1;
          --simple-colors-fixed-theme-blue-grey-2: #b1c5ce;
          --simple-colors-fixed-theme-blue-grey-3: #9badb6;
          --simple-colors-fixed-theme-blue-grey-4: #8d9fa7;
          --simple-colors-fixed-theme-blue-grey-5: #7a8f98;
          --simple-colors-fixed-theme-blue-grey-6: #718892;
          --simple-colors-fixed-theme-blue-grey-7: #56707c;
          --simple-colors-fixed-theme-blue-grey-8: #40535b;
          --simple-colors-fixed-theme-blue-grey-9: #2f3e45;
          --simple-colors-fixed-theme-blue-grey-10: #1e282c;
          --simple-colors-fixed-theme-blue-grey-11: #182023;
          --simple-colors-fixed-theme-blue-grey-12: #0f1518;
        } `];
  }

  // render function
  render() {
    return ke``;
  }

  // properties available to the custom element for data binding
  static get properties() {
    return {
      ...super.properties,
      /**
       * The colors object.
       * Each color contains an array of shades as hex codes from lightest to darkest.
       */
      colors: {
        attribute: "colors",
        type: Object
      },
      /**
      * Object with information on which color combinations are WCAG 2.0AA compliant, "eg": 
      {
       "greyColor": {          //if either the color or its contrast will be a grey
         "aaLarge": [          //if bold text >= 14pt, text >= 18pt, decorative only, or disabled
           {                 //for the first shade of a color
             "min": 7,         //index of the lightest contrasting shade of another color
             "max": 12         //index of the darkest contrasting shade of another color
           },
           ...
         ],
         "aa": [ ... ]         //if bold text < 14pt, or text < 18pt
       },
       "colorColor": { ... }   //if neither the color nor its contrast are grey
      }
      */
      contrasts: {
        attribute: "contrasts",
        type: Object
      }
    };
  }
  constructor() {
    super();
    this.colors = {
      grey: ["#ffffff", "#eeeeee", "#dddddd", "#cccccc", "#bbbbbb", "#999999", "#666666", "#444444", "#333333", "#222222", "#111111", "#000000"],
      red: ["#ffdddd", "#ffaeae", "#ff8f8f", "#ff7474", "#fd5151", "#ff2222", "#ee0000", "#ac0000", "#850000", "#670000", "#520000", "#3f0000"],
      pink: ["#ffe6f1", "#ffa5cf", "#ff87c0", "#ff73b5", "#fd60aa", "#ff3996", "#da004e", "#b80042", "#980036", "#78002b", "#5a0020", "#440019"],
      purple: ["#fce6ff", "#f4affd", "#f394ff", "#f07cff", "#ed61ff", "#e200ff", "#a500ba", "#8a009b", "#6c0079", "#490052", "#33003a", "#200025"],
      "deep-purple": ["#f3e4ff", "#ddacff", "#c97eff", "#bb63f9", "#b44aff", "#a931ff", "#7e00d8", "#5d009f", "#4c0081", "#3a0063", "#2a0049", "#1d0033"],
      indigo: ["#e5ddff", "#c3b2ff", "#af97ff", "#9e82ff", "#9373ff", "#835fff", "#3a00ff", "#2801b0", "#20008c", "#160063", "#100049", "#0a0030"],
      blue: ["#e2ecff", "#acc9ff", "#95baff", "#74a5ff", "#5892fd", "#4083ff", "#0059ff", "#0041bb", "#003494", "#002569", "#001947", "#001333"],
      "light-blue": ["#cde8ff", "#a1d1ff", "#92c9ff", "#65b3ff", "#58adff", "#41a1ff", "#007ffc", "#0066ca", "#0055a8", "#003f7d", "#002850", "#001b36"],
      cyan: ["#ddf8ff", "#9beaff", "#77e2ff", "#33d4ff", "#1ccfff", "#00c9ff", "#009dc7", "#007999", "#005970", "#003f50", "#002c38", "#001a20"],
      teal: ["#d9fff0", "#98ffd7", "#79ffcb", "#56ffbd", "#29ffac", "#00ff9c", "#009d75", "#007658", "#004e3a", "#003829", "#002a20", "#001b14"],
      green: ["#e1ffeb", "#acffc9", "#79ffa7", "#49ff88", "#24ff70", "#00f961", "#008c37", "#00762e", "#005a23", "#003d18", "#002a11", "#001d0c"],
      "light-green": ["#ebffdb", "#c7ff9b", "#b1ff75", "#a1fd5a", "#8efd38", "#6fff00", "#429d00", "#357f00", "#296100", "#1b3f00", "#143000", "#0d2000"],
      lime: ["#f1ffd2", "#dfff9b", "#d4ff77", "#caff58", "#bdff2d", "#aeff00", "#649900", "#4d7600", "#3b5a00", "#293f00", "#223400", "#182400"],
      yellow: ["#ffffd5", "#ffffac", "#ffff90", "#ffff7c", "#ffff3a", "#f6f600", "#929100", "#787700", "#585700", "#454400", "#303000", "#242400"],
      amber: ["#fff2d4", "#ffdf92", "#ffd677", "#ffcf5e", "#ffc235", "#ffc500", "#b28900", "#876800", "#614b00", "#413200", "#302500", "#221a00"],
      orange: ["#ffebd7", "#ffca92", "#ffbd75", "#ffb05c", "#ff9e36", "#ff9625", "#e56a00", "#ae5100", "#833d00", "#612d00", "#3d1c00", "#2c1400"],
      "deep-orange": ["#ffe7e0", "#ffb299", "#ffa588", "#ff8a64", "#ff7649", "#ff6c3c", "#f53100", "#b92500", "#8a1c00", "#561100", "#3a0c00", "#240700"],
      brown: ["#f0e2de", "#e5b8aa", "#c59485", "#b68373", "#ac7868", "#a47060", "#85574a", "#724539", "#5b3328", "#3b1e15", "#2c140e", "#200e09"],
      "blue-grey": ["#e7eff1", "#b1c5ce", "#9badb6", "#8d9fa7", "#7a8f98", "#718892", "#56707c", "#40535b", "#2f3e45", "#1e282c", "#182023", "#0f1518"]
    };
    this.contrasts = {
      greyColor: {
        aaLarge: [{
          min: 7,
          max: 12
        }, {
          min: 7,
          max: 12
        }, {
          min: 7,
          max: 12
        }, {
          min: 7,
          max: 12
        }, {
          min: 8,
          max: 12
        }, {
          min: 10,
          max: 12
        }, {
          min: 1,
          max: 3
        }, {
          min: 1,
          max: 5
        }, {
          min: 1,
          max: 6
        }, {
          min: 1,
          max: 6
        }, {
          min: 1,
          max: 6
        }, {
          min: 1,
          max: 6
        }],
        aa: [
        //if bold text < 14pt, or text < 18pt
        {
          min: 7,
          max: 12
        }, {
          min: 7,
          max: 12
        }, {
          min: 7,
          max: 12
        }, {
          min: 8,
          max: 12
        }, {
          min: 8,
          max: 12
        }, {
          min: 11,
          max: 12
        }, {
          min: 1,
          max: 2
        }, {
          min: 1,
          max: 7
        }, {
          min: 1,
          max: 7
        }, {
          min: 1,
          max: 6
        }, {
          min: 1,
          max: 6
        }, {
          min: 1,
          max: 6
        }]
      },
      colorColor: {
        //if neither the color nor its contrast are grey
        aaLarge: [{
          min: 7,
          max: 12
        }, {
          min: 7,
          max: 12
        }, {
          min: 8,
          max: 12
        }, {
          min: 9,
          max: 12
        }, {
          min: 10,
          max: 12
        }, {
          min: 11,
          max: 12
        }, {
          min: 1,
          max: 2
        }, {
          min: 1,
          max: 3
        }, {
          min: 1,
          max: 4
        }, {
          min: 1,
          max: 5
        }, {
          min: 1,
          max: 6
        }, {
          min: 1,
          max: 6
        }],
        aa: [{
          min: 8,
          max: 12
        }, {
          min: 8,
          max: 12
        }, {
          min: 9,
          max: 12
        }, {
          min: 9,
          max: 12
        }, {
          min: 11,
          max: 12
        }, {
          min: 12,
          max: 12
        }, {
          min: 1,
          max: 1
        }, {
          min: 1,
          max: 2
        }, {
          min: 1,
          max: 4
        }, {
          min: 1,
          max: 4
        }, {
          min: 1,
          max: 5
        }, {
          min: 1,
          max: 5
        }]
      }
    };
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "simple-colors-shared-styles";
  }

  /**
   * gets the color information of a given CSS variable or class
   *
   * @param {string} the CSS variable (eg. `--simple-colors-fixed-theme-red-3`)
   * @param {object} an object that includes the theme, color, and shade information
   */
  getColorInfo(colorName) {
    let temp1 = colorName.replace(/(simple-colors-)?(-text)?(-border)?/g, "").split("-theme-"),
      theme = temp1.length > 0 ? temp1[0] : "default",
      temp2 = temp1.length > 0 ? temp1[1].split("-") : temp1[0].split("-"),
      color = temp2.length > 1 ? temp2.slice(1, temp2.length - 1).join("-") : "grey",
      shade = temp2.length > 1 ? temp2[temp2.length - 1] : "1";
    return {
      theme: theme,
      color: color,
      shade: shade
    };
  }
  /**
   * returns a variable based on color name, shade, and fixed theme
   *
   * @param {string} the color name
   * @param {number} the color shade
   * @param {boolean} the color shade
   * @returns {string} the CSS Variable
   */
  makeVariable(color = "grey", shade = 1, theme = "default") {
    return ["--simple-colors", theme, "theme", color, shade].join("-");
  }
  /**
   * for large or small text given a color and its shade,
   * lists all the shades of another color that would be
   * WCAG 2.0 AA-compliant for contrast
   *
   * @param {boolean} large text? >= 18pt || (bold && >= 14pt)
   * @param {string} color name, e.g. "deep-purple"
   * @param {string} color shade, e.g. 3
   * @param {string} contrasting color name, e.g. "grey"
   * @param {array} all of the WCAG 2.0 AA-compliant shades of the contrasting color
   */
  getContrastingShades(isLarge, colorName, colorShade, contrastName) {
    let hasGrey = colorName === "grey" || contrastName === "grey" ? "greyColor" : "colorColor",
      aa = isLarge ? "aaLarge" : "aa",
      index = parseInt(colorShade),
      range = this.contrasts[hasGrey][aa][index];
    return Array(range.max - range.min + 1).fill().map((_, idx) => range.min + idx);
  }

  /**
   * for large or small text given a color and its shade,
   * lists all the colors and shades that would be
   * WCAG 2.0 AA-compliant for contrast
   *
   * @param {boolean} large text? >= 18pt || (bold && >= 14pt)
   * @param {string} color name, e.g. "deep-purple"
   * @param {string} color shade, e.g. 3
   * @param {object} all of the WCAG 2.0 AA-compliant colors and shades
   */
  getContrastingColors(colorName, colorShade, isLarge) {
    let result = {};
    Object.keys(this.colors).forEach(color => {
      result[color] = this.getContrastingShades(isLarge, colorName, colorShade, color);
    });
    return result;
  }
  /**
   * determines if two shades are WCAG 2.0 AA-compliant for contrast
   *
   * @param {boolean} large text? >= 18pt || (bold && >= 14pt)
   * @param {string} color name, e.g. "deep-purple"
   * @param {string} color shade, e.g. 3
   * @param {string} contrasting color name, e.g. "grey"
   * @param {string} contrast shade, e.g. 12
   * @param {boolean} whether or not the contrasting shade is WCAG 2.0 AA-compliant
   */
  isContrastCompliant(isLarge, colorName, colorShade, contrastName, contrastShade) {
    let hasGrey = colorName === "grey" || contrastName === "grey" ? "greyColor" : "colorColor",
      aa = isLarge ? "aaLarge" : "aa",
      index = parseInt(colorShade) + 1,
      range = this.contrasts[hasGrey][aa][index];
    return contrastShade >= range.min && ontrastShade >= range.max;
  }

  /**
   * gets the current shade based on the index
   *
   * @param {string} the index
   * @param {number} the shade
   */
  indexToShade(index) {
    return parseInt(index) + 1;
  }

  /**
   * gets the current shade based on the index
   *
   * @param {string} the shade
   * @param {number} the index
   */
  shadeToIndex(shade) {
    return parseInt(shade) - 1;
  }
}
customElements.define(SimpleColorsSharedStyles.tag, SimpleColorsSharedStyles);
/**
 * Checks to see if there is an instance available, and if not appends one
 */
globalThis.SimpleColorsSharedStyles.requestAvailability = () => {
  if (globalThis.SimpleColorsSharedStyles.instance == null) {
    globalThis.SimpleColorsSharedStyles.instance = globalThis.document.createElement("simple-colors-shared-styles");
    globalThis.SimpleColorsSharedStyles.colors = globalThis.SimpleColorsSharedStyles.instance.colors;
    globalThis.SimpleColorsSharedStyles.contrasts = globalThis.SimpleColorsSharedStyles.instance.contrasts;
    globalThis.SimpleColorsSharedStyles.stylesheet = globalThis.document.createElement("style");
    globalThis.SimpleColorsSharedStyles.stylesheet.innerHTML = `${SimpleColorsSharedStyles.styles[0].cssText}`;
    globalThis.document.head.appendChild(globalThis.SimpleColorsSharedStyles.stylesheet);
  }
  return globalThis.SimpleColorsSharedStyles.instance;
};
const SimpleColorsSharedStylesGlobal = typeof global !== "undefined" ? new SimpleColorsSharedStyles() : globalThis.SimpleColorsSharedStyles.requestAvailability();

/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
const SimpleColorsSuper = function (SuperClass) {
  return class extends SuperClass {
    //styles function
    static get styles() {
      let styles = i$1("");
      if (super.styles) {
        styles = super.styles;
      }
      return [styles, i$1` :host([dark]) {
            --simple-colors-default-theme-accent-1: #000000;
            --simple-colors-default-theme-accent-2: #111111;
            --simple-colors-default-theme-accent-3: #222222;
            --simple-colors-default-theme-accent-4: #333333;
            --simple-colors-default-theme-accent-5: #444444;
            --simple-colors-default-theme-accent-6: #666666;
            --simple-colors-default-theme-accent-7: #999999;
            --simple-colors-default-theme-accent-8: #bbbbbb;
            --simple-colors-default-theme-accent-9: #cccccc;
            --simple-colors-default-theme-accent-10: #dddddd;
            --simple-colors-default-theme-accent-11: #eeeeee;
            --simple-colors-default-theme-accent-12: #ffffff;

            --simple-colors-default-theme-grey-1: #000000;
            --simple-colors-default-theme-grey-2: #111111;
            --simple-colors-default-theme-grey-3: #222222;
            --simple-colors-default-theme-grey-4: #333333;
            --simple-colors-default-theme-grey-5: #444444;
            --simple-colors-default-theme-grey-6: #666666;
            --simple-colors-default-theme-grey-7: #999999;
            --simple-colors-default-theme-grey-8: #bbbbbb;
            --simple-colors-default-theme-grey-9: #cccccc;
            --simple-colors-default-theme-grey-10: #dddddd;
            --simple-colors-default-theme-grey-11: #eeeeee;
            --simple-colors-default-theme-grey-12: #ffffff;

            --simple-colors-default-theme-red-1: #3f0000;
            --simple-colors-default-theme-red-2: #520000;
            --simple-colors-default-theme-red-3: #670000;
            --simple-colors-default-theme-red-4: #850000;
            --simple-colors-default-theme-red-5: #ac0000;
            --simple-colors-default-theme-red-6: #ee0000;
            --simple-colors-default-theme-red-7: #ff2222;
            --simple-colors-default-theme-red-8: #fd5151;
            --simple-colors-default-theme-red-9: #ff7474;
            --simple-colors-default-theme-red-10: #ff8f8f;
            --simple-colors-default-theme-red-11: #ffaeae;
            --simple-colors-default-theme-red-12: #ffdddd;

            --simple-colors-default-theme-pink-1: #440019;
            --simple-colors-default-theme-pink-2: #5a0020;
            --simple-colors-default-theme-pink-3: #78002b;
            --simple-colors-default-theme-pink-4: #980036;
            --simple-colors-default-theme-pink-5: #b80042;
            --simple-colors-default-theme-pink-6: #da004e;
            --simple-colors-default-theme-pink-7: #ff3996;
            --simple-colors-default-theme-pink-8: #fd60aa;
            --simple-colors-default-theme-pink-9: #ff73b5;
            --simple-colors-default-theme-pink-10: #ff87c0;
            --simple-colors-default-theme-pink-11: #ffa5cf;
            --simple-colors-default-theme-pink-12: #ffe6f1;

            --simple-colors-default-theme-purple-1: #200025;
            --simple-colors-default-theme-purple-2: #33003a;
            --simple-colors-default-theme-purple-3: #490052;
            --simple-colors-default-theme-purple-4: #6c0079;
            --simple-colors-default-theme-purple-5: #8a009b;
            --simple-colors-default-theme-purple-6: #a500ba;
            --simple-colors-default-theme-purple-7: #e200ff;
            --simple-colors-default-theme-purple-8: #ed61ff;
            --simple-colors-default-theme-purple-9: #f07cff;
            --simple-colors-default-theme-purple-10: #f394ff;
            --simple-colors-default-theme-purple-11: #f4affd;
            --simple-colors-default-theme-purple-12: #fce6ff;

            --simple-colors-default-theme-deep-purple-1: #1d0033;
            --simple-colors-default-theme-deep-purple-2: #2a0049;
            --simple-colors-default-theme-deep-purple-3: #3a0063;
            --simple-colors-default-theme-deep-purple-4: #4c0081;
            --simple-colors-default-theme-deep-purple-5: #5d009f;
            --simple-colors-default-theme-deep-purple-6: #7e00d8;
            --simple-colors-default-theme-deep-purple-7: #a931ff;
            --simple-colors-default-theme-deep-purple-8: #b44aff;
            --simple-colors-default-theme-deep-purple-9: #bb63f9;
            --simple-colors-default-theme-deep-purple-10: #c97eff;
            --simple-colors-default-theme-deep-purple-11: #ddacff;
            --simple-colors-default-theme-deep-purple-12: #f3e4ff;

            --simple-colors-default-theme-indigo-1: #0a0030;
            --simple-colors-default-theme-indigo-2: #100049;
            --simple-colors-default-theme-indigo-3: #160063;
            --simple-colors-default-theme-indigo-4: #20008c;
            --simple-colors-default-theme-indigo-5: #2801b0;
            --simple-colors-default-theme-indigo-6: #3a00ff;
            --simple-colors-default-theme-indigo-7: #835fff;
            --simple-colors-default-theme-indigo-8: #9373ff;
            --simple-colors-default-theme-indigo-9: #9e82ff;
            --simple-colors-default-theme-indigo-10: #af97ff;
            --simple-colors-default-theme-indigo-11: #c3b2ff;
            --simple-colors-default-theme-indigo-12: #e5ddff;

            --simple-colors-default-theme-blue-1: #001333;
            --simple-colors-default-theme-blue-2: #001947;
            --simple-colors-default-theme-blue-3: #002569;
            --simple-colors-default-theme-blue-4: #003494;
            --simple-colors-default-theme-blue-5: #0041bb;
            --simple-colors-default-theme-blue-6: #0059ff;
            --simple-colors-default-theme-blue-7: #4083ff;
            --simple-colors-default-theme-blue-8: #5892fd;
            --simple-colors-default-theme-blue-9: #74a5ff;
            --simple-colors-default-theme-blue-10: #95baff;
            --simple-colors-default-theme-blue-11: #acc9ff;
            --simple-colors-default-theme-blue-12: #e2ecff;

            --simple-colors-default-theme-light-blue-1: #001b36;
            --simple-colors-default-theme-light-blue-2: #002850;
            --simple-colors-default-theme-light-blue-3: #003f7d;
            --simple-colors-default-theme-light-blue-4: #0055a8;
            --simple-colors-default-theme-light-blue-5: #0066ca;
            --simple-colors-default-theme-light-blue-6: #007ffc;
            --simple-colors-default-theme-light-blue-7: #41a1ff;
            --simple-colors-default-theme-light-blue-8: #58adff;
            --simple-colors-default-theme-light-blue-9: #65b3ff;
            --simple-colors-default-theme-light-blue-10: #92c9ff;
            --simple-colors-default-theme-light-blue-11: #a1d1ff;
            --simple-colors-default-theme-light-blue-12: #cde8ff;

            --simple-colors-default-theme-cyan-1: #001a20;
            --simple-colors-default-theme-cyan-2: #002c38;
            --simple-colors-default-theme-cyan-3: #003f50;
            --simple-colors-default-theme-cyan-4: #005970;
            --simple-colors-default-theme-cyan-5: #007999;
            --simple-colors-default-theme-cyan-6: #009dc7;
            --simple-colors-default-theme-cyan-7: #00c9ff;
            --simple-colors-default-theme-cyan-8: #1ccfff;
            --simple-colors-default-theme-cyan-9: #33d4ff;
            --simple-colors-default-theme-cyan-10: #77e2ff;
            --simple-colors-default-theme-cyan-11: #9beaff;
            --simple-colors-default-theme-cyan-12: #ddf8ff;

            --simple-colors-default-theme-teal-1: #001b14;
            --simple-colors-default-theme-teal-2: #002a20;
            --simple-colors-default-theme-teal-3: #003829;
            --simple-colors-default-theme-teal-4: #004e3a;
            --simple-colors-default-theme-teal-5: #007658;
            --simple-colors-default-theme-teal-6: #009d75;
            --simple-colors-default-theme-teal-7: #00ff9c;
            --simple-colors-default-theme-teal-8: #29ffac;
            --simple-colors-default-theme-teal-9: #56ffbd;
            --simple-colors-default-theme-teal-10: #79ffcb;
            --simple-colors-default-theme-teal-11: #98ffd7;
            --simple-colors-default-theme-teal-12: #d9fff0;

            --simple-colors-default-theme-green-1: #001d0c;
            --simple-colors-default-theme-green-2: #002a11;
            --simple-colors-default-theme-green-3: #003d18;
            --simple-colors-default-theme-green-4: #005a23;
            --simple-colors-default-theme-green-5: #00762e;
            --simple-colors-default-theme-green-6: #008c37;
            --simple-colors-default-theme-green-7: #00f961;
            --simple-colors-default-theme-green-8: #24ff70;
            --simple-colors-default-theme-green-9: #49ff88;
            --simple-colors-default-theme-green-10: #79ffa7;
            --simple-colors-default-theme-green-11: #acffc9;
            --simple-colors-default-theme-green-12: #e1ffeb;

            --simple-colors-default-theme-light-green-1: #0d2000;
            --simple-colors-default-theme-light-green-2: #143000;
            --simple-colors-default-theme-light-green-3: #1b3f00;
            --simple-colors-default-theme-light-green-4: #296100;
            --simple-colors-default-theme-light-green-5: #357f00;
            --simple-colors-default-theme-light-green-6: #429d00;
            --simple-colors-default-theme-light-green-7: #6fff00;
            --simple-colors-default-theme-light-green-8: #8efd38;
            --simple-colors-default-theme-light-green-9: #a1fd5a;
            --simple-colors-default-theme-light-green-10: #b1ff75;
            --simple-colors-default-theme-light-green-11: #c7ff9b;
            --simple-colors-default-theme-light-green-12: #ebffdb;

            --simple-colors-default-theme-lime-1: #182400;
            --simple-colors-default-theme-lime-2: #223400;
            --simple-colors-default-theme-lime-3: #293f00;
            --simple-colors-default-theme-lime-4: #3b5a00;
            --simple-colors-default-theme-lime-5: #4d7600;
            --simple-colors-default-theme-lime-6: #649900;
            --simple-colors-default-theme-lime-7: #aeff00;
            --simple-colors-default-theme-lime-8: #bdff2d;
            --simple-colors-default-theme-lime-9: #caff58;
            --simple-colors-default-theme-lime-10: #d4ff77;
            --simple-colors-default-theme-lime-11: #dfff9b;
            --simple-colors-default-theme-lime-12: #f1ffd2;

            --simple-colors-default-theme-yellow-1: #242400;
            --simple-colors-default-theme-yellow-2: #303000;
            --simple-colors-default-theme-yellow-3: #454400;
            --simple-colors-default-theme-yellow-4: #585700;
            --simple-colors-default-theme-yellow-5: #787700;
            --simple-colors-default-theme-yellow-6: #929100;
            --simple-colors-default-theme-yellow-7: #f6f600;
            --simple-colors-default-theme-yellow-8: #ffff3a;
            --simple-colors-default-theme-yellow-9: #ffff7c;
            --simple-colors-default-theme-yellow-10: #ffff90;
            --simple-colors-default-theme-yellow-11: #ffffac;
            --simple-colors-default-theme-yellow-12: #ffffd5;

            --simple-colors-default-theme-amber-1: #221a00;
            --simple-colors-default-theme-amber-2: #302500;
            --simple-colors-default-theme-amber-3: #413200;
            --simple-colors-default-theme-amber-4: #614b00;
            --simple-colors-default-theme-amber-5: #876800;
            --simple-colors-default-theme-amber-6: #b28900;
            --simple-colors-default-theme-amber-7: #ffc500;
            --simple-colors-default-theme-amber-8: #ffc235;
            --simple-colors-default-theme-amber-9: #ffcf5e;
            --simple-colors-default-theme-amber-10: #ffd677;
            --simple-colors-default-theme-amber-11: #ffdf92;
            --simple-colors-default-theme-amber-12: #fff2d4;

            --simple-colors-default-theme-orange-1: #2c1400;
            --simple-colors-default-theme-orange-2: #3d1c00;
            --simple-colors-default-theme-orange-3: #612d00;
            --simple-colors-default-theme-orange-4: #833d00;
            --simple-colors-default-theme-orange-5: #ae5100;
            --simple-colors-default-theme-orange-6: #e56a00;
            --simple-colors-default-theme-orange-7: #ff9625;
            --simple-colors-default-theme-orange-8: #ff9e36;
            --simple-colors-default-theme-orange-9: #ffb05c;
            --simple-colors-default-theme-orange-10: #ffbd75;
            --simple-colors-default-theme-orange-11: #ffca92;
            --simple-colors-default-theme-orange-12: #ffebd7;

            --simple-colors-default-theme-deep-orange-1: #240700;
            --simple-colors-default-theme-deep-orange-2: #3a0c00;
            --simple-colors-default-theme-deep-orange-3: #561100;
            --simple-colors-default-theme-deep-orange-4: #8a1c00;
            --simple-colors-default-theme-deep-orange-5: #b92500;
            --simple-colors-default-theme-deep-orange-6: #f53100;
            --simple-colors-default-theme-deep-orange-7: #ff6c3c;
            --simple-colors-default-theme-deep-orange-8: #ff7649;
            --simple-colors-default-theme-deep-orange-9: #ff8a64;
            --simple-colors-default-theme-deep-orange-10: #ffa588;
            --simple-colors-default-theme-deep-orange-11: #ffb299;
            --simple-colors-default-theme-deep-orange-12: #ffe7e0;

            --simple-colors-default-theme-brown-1: #200e09;
            --simple-colors-default-theme-brown-2: #2c140e;
            --simple-colors-default-theme-brown-3: #3b1e15;
            --simple-colors-default-theme-brown-4: #5b3328;
            --simple-colors-default-theme-brown-5: #724539;
            --simple-colors-default-theme-brown-6: #85574a;
            --simple-colors-default-theme-brown-7: #a47060;
            --simple-colors-default-theme-brown-8: #ac7868;
            --simple-colors-default-theme-brown-9: #b68373;
            --simple-colors-default-theme-brown-10: #c59485;
            --simple-colors-default-theme-brown-11: #e5b8aa;
            --simple-colors-default-theme-brown-12: #f0e2de;

            --simple-colors-default-theme-blue-grey-1: #0f1518;
            --simple-colors-default-theme-blue-grey-2: #182023;
            --simple-colors-default-theme-blue-grey-3: #1e282c;
            --simple-colors-default-theme-blue-grey-4: #2f3e45;
            --simple-colors-default-theme-blue-grey-5: #40535b;
            --simple-colors-default-theme-blue-grey-6: #56707c;
            --simple-colors-default-theme-blue-grey-7: #718892;
            --simple-colors-default-theme-blue-grey-8: #7a8f98;
            --simple-colors-default-theme-blue-grey-9: #8d9fa7;
            --simple-colors-default-theme-blue-grey-10: #9badb6;
            --simple-colors-default-theme-blue-grey-11: #b1c5ce;
            --simple-colors-default-theme-blue-grey-12: #e7eff1;
          }

          :host {
            accent-color: var(--simple-colors-default-theme-accent-7);
          }

          :host([accent-color="grey"]) {
            --simple-colors-default-theme-accent-1: #ffffff;
            --simple-colors-default-theme-accent-2: #eeeeee;
            --simple-colors-default-theme-accent-3: #dddddd;
            --simple-colors-default-theme-accent-4: #cccccc;
            --simple-colors-default-theme-accent-5: #bbbbbb;
            --simple-colors-default-theme-accent-6: #999999;
            --simple-colors-default-theme-accent-7: #666666;
            --simple-colors-default-theme-accent-8: #444444;
            --simple-colors-default-theme-accent-9: #333333;
            --simple-colors-default-theme-accent-10: #222222;
            --simple-colors-default-theme-accent-11: #111111;
            --simple-colors-default-theme-accent-12: #000000;
            --simple-colors-fixed-theme-accent-1: #ffffff;
            --simple-colors-fixed-theme-accent-2: #eeeeee;
            --simple-colors-fixed-theme-accent-3: #dddddd;
            --simple-colors-fixed-theme-accent-4: #cccccc;
            --simple-colors-fixed-theme-accent-5: #bbbbbb;
            --simple-colors-fixed-theme-accent-6: #999999;
            --simple-colors-fixed-theme-accent-7: #666666;
            --simple-colors-fixed-theme-accent-8: #444444;
            --simple-colors-fixed-theme-accent-9: #333333;
            --simple-colors-fixed-theme-accent-10: #222222;
            --simple-colors-fixed-theme-accent-11: #111111;
            --simple-colors-fixed-theme-accent-12: #000000;
          }

          :host([dark][accent-color="grey"]) {
            --simple-colors-default-theme-accent-1: #000000;
            --simple-colors-default-theme-accent-2: #111111;
            --simple-colors-default-theme-accent-3: #222222;
            --simple-colors-default-theme-accent-4: #333333;
            --simple-colors-default-theme-accent-5: #444444;
            --simple-colors-default-theme-accent-6: #666666;
            --simple-colors-default-theme-accent-7: #999999;
            --simple-colors-default-theme-accent-8: #bbbbbb;
            --simple-colors-default-theme-accent-9: #cccccc;
            --simple-colors-default-theme-accent-10: #dddddd;
            --simple-colors-default-theme-accent-11: #eeeeee;
            --simple-colors-default-theme-accent-12: #ffffff;
          }

          :host([accent-color="red"]) {
            --simple-colors-default-theme-accent-1: #ffdddd;
            --simple-colors-default-theme-accent-2: #ffaeae;
            --simple-colors-default-theme-accent-3: #ff8f8f;
            --simple-colors-default-theme-accent-4: #ff7474;
            --simple-colors-default-theme-accent-5: #fd5151;
            --simple-colors-default-theme-accent-6: #ff2222;
            --simple-colors-default-theme-accent-7: #ee0000;
            --simple-colors-default-theme-accent-8: #ac0000;
            --simple-colors-default-theme-accent-9: #850000;
            --simple-colors-default-theme-accent-10: #670000;
            --simple-colors-default-theme-accent-11: #520000;
            --simple-colors-default-theme-accent-12: #3f0000;
            --simple-colors-fixed-theme-accent-1: #ffdddd;
            --simple-colors-fixed-theme-accent-2: #ffaeae;
            --simple-colors-fixed-theme-accent-3: #ff8f8f;
            --simple-colors-fixed-theme-accent-4: #ff7474;
            --simple-colors-fixed-theme-accent-5: #fd5151;
            --simple-colors-fixed-theme-accent-6: #ff2222;
            --simple-colors-fixed-theme-accent-7: #ee0000;
            --simple-colors-fixed-theme-accent-8: #ac0000;
            --simple-colors-fixed-theme-accent-9: #850000;
            --simple-colors-fixed-theme-accent-10: #670000;
            --simple-colors-fixed-theme-accent-11: #520000;
            --simple-colors-fixed-theme-accent-12: #3f0000;
          }

          :host([dark][accent-color="red"]) {
            --simple-colors-default-theme-accent-1: #3f0000;
            --simple-colors-default-theme-accent-2: #520000;
            --simple-colors-default-theme-accent-3: #670000;
            --simple-colors-default-theme-accent-4: #850000;
            --simple-colors-default-theme-accent-5: #ac0000;
            --simple-colors-default-theme-accent-6: #ee0000;
            --simple-colors-default-theme-accent-7: #ff2222;
            --simple-colors-default-theme-accent-8: #fd5151;
            --simple-colors-default-theme-accent-9: #ff7474;
            --simple-colors-default-theme-accent-10: #ff8f8f;
            --simple-colors-default-theme-accent-11: #ffaeae;
            --simple-colors-default-theme-accent-12: #ffdddd;
          }

          :host([accent-color="pink"]) {
            --simple-colors-default-theme-accent-1: #ffe6f1;
            --simple-colors-default-theme-accent-2: #ffa5cf;
            --simple-colors-default-theme-accent-3: #ff87c0;
            --simple-colors-default-theme-accent-4: #ff73b5;
            --simple-colors-default-theme-accent-5: #fd60aa;
            --simple-colors-default-theme-accent-6: #ff3996;
            --simple-colors-default-theme-accent-7: #da004e;
            --simple-colors-default-theme-accent-8: #b80042;
            --simple-colors-default-theme-accent-9: #980036;
            --simple-colors-default-theme-accent-10: #78002b;
            --simple-colors-default-theme-accent-11: #5a0020;
            --simple-colors-default-theme-accent-12: #440019;
            --simple-colors-fixed-theme-accent-1: #ffe6f1;
            --simple-colors-fixed-theme-accent-2: #ffa5cf;
            --simple-colors-fixed-theme-accent-3: #ff87c0;
            --simple-colors-fixed-theme-accent-4: #ff73b5;
            --simple-colors-fixed-theme-accent-5: #fd60aa;
            --simple-colors-fixed-theme-accent-6: #ff3996;
            --simple-colors-fixed-theme-accent-7: #da004e;
            --simple-colors-fixed-theme-accent-8: #b80042;
            --simple-colors-fixed-theme-accent-9: #980036;
            --simple-colors-fixed-theme-accent-10: #78002b;
            --simple-colors-fixed-theme-accent-11: #5a0020;
            --simple-colors-fixed-theme-accent-12: #440019;
          }

          :host([dark][accent-color="pink"]) {
            --simple-colors-default-theme-accent-1: #440019;
            --simple-colors-default-theme-accent-2: #5a0020;
            --simple-colors-default-theme-accent-3: #78002b;
            --simple-colors-default-theme-accent-4: #980036;
            --simple-colors-default-theme-accent-5: #b80042;
            --simple-colors-default-theme-accent-6: #da004e;
            --simple-colors-default-theme-accent-7: #ff3996;
            --simple-colors-default-theme-accent-8: #fd60aa;
            --simple-colors-default-theme-accent-9: #ff73b5;
            --simple-colors-default-theme-accent-10: #ff87c0;
            --simple-colors-default-theme-accent-11: #ffa5cf;
            --simple-colors-default-theme-accent-12: #ffe6f1;
          }

          :host([accent-color="purple"]) {
            --simple-colors-default-theme-accent-1: #fce6ff;
            --simple-colors-default-theme-accent-2: #f4affd;
            --simple-colors-default-theme-accent-3: #f394ff;
            --simple-colors-default-theme-accent-4: #f07cff;
            --simple-colors-default-theme-accent-5: #ed61ff;
            --simple-colors-default-theme-accent-6: #e200ff;
            --simple-colors-default-theme-accent-7: #a500ba;
            --simple-colors-default-theme-accent-8: #8a009b;
            --simple-colors-default-theme-accent-9: #6c0079;
            --simple-colors-default-theme-accent-10: #490052;
            --simple-colors-default-theme-accent-11: #33003a;
            --simple-colors-default-theme-accent-12: #200025;
            --simple-colors-fixed-theme-accent-1: #fce6ff;
            --simple-colors-fixed-theme-accent-2: #f4affd;
            --simple-colors-fixed-theme-accent-3: #f394ff;
            --simple-colors-fixed-theme-accent-4: #f07cff;
            --simple-colors-fixed-theme-accent-5: #ed61ff;
            --simple-colors-fixed-theme-accent-6: #e200ff;
            --simple-colors-fixed-theme-accent-7: #a500ba;
            --simple-colors-fixed-theme-accent-8: #8a009b;
            --simple-colors-fixed-theme-accent-9: #6c0079;
            --simple-colors-fixed-theme-accent-10: #490052;
            --simple-colors-fixed-theme-accent-11: #33003a;
            --simple-colors-fixed-theme-accent-12: #200025;
          }

          :host([dark][accent-color="purple"]) {
            --simple-colors-default-theme-accent-1: #200025;
            --simple-colors-default-theme-accent-2: #33003a;
            --simple-colors-default-theme-accent-3: #490052;
            --simple-colors-default-theme-accent-4: #6c0079;
            --simple-colors-default-theme-accent-5: #8a009b;
            --simple-colors-default-theme-accent-6: #a500ba;
            --simple-colors-default-theme-accent-7: #e200ff;
            --simple-colors-default-theme-accent-8: #ed61ff;
            --simple-colors-default-theme-accent-9: #f07cff;
            --simple-colors-default-theme-accent-10: #f394ff;
            --simple-colors-default-theme-accent-11: #f4affd;
            --simple-colors-default-theme-accent-12: #fce6ff;
          }

          :host([accent-color="deep-purple"]) {
            --simple-colors-default-theme-accent-1: #f3e4ff;
            --simple-colors-default-theme-accent-2: #ddacff;
            --simple-colors-default-theme-accent-3: #c97eff;
            --simple-colors-default-theme-accent-4: #bb63f9;
            --simple-colors-default-theme-accent-5: #b44aff;
            --simple-colors-default-theme-accent-6: #a931ff;
            --simple-colors-default-theme-accent-7: #7e00d8;
            --simple-colors-default-theme-accent-8: #5d009f;
            --simple-colors-default-theme-accent-9: #4c0081;
            --simple-colors-default-theme-accent-10: #3a0063;
            --simple-colors-default-theme-accent-11: #2a0049;
            --simple-colors-default-theme-accent-12: #1d0033;
            --simple-colors-fixed-theme-accent-1: #f3e4ff;
            --simple-colors-fixed-theme-accent-2: #ddacff;
            --simple-colors-fixed-theme-accent-3: #c97eff;
            --simple-colors-fixed-theme-accent-4: #bb63f9;
            --simple-colors-fixed-theme-accent-5: #b44aff;
            --simple-colors-fixed-theme-accent-6: #a931ff;
            --simple-colors-fixed-theme-accent-7: #7e00d8;
            --simple-colors-fixed-theme-accent-8: #5d009f;
            --simple-colors-fixed-theme-accent-9: #4c0081;
            --simple-colors-fixed-theme-accent-10: #3a0063;
            --simple-colors-fixed-theme-accent-11: #2a0049;
            --simple-colors-fixed-theme-accent-12: #1d0033;
          }

          :host([dark][accent-color="deep-purple"]) {
            --simple-colors-default-theme-accent-1: #1d0033;
            --simple-colors-default-theme-accent-2: #2a0049;
            --simple-colors-default-theme-accent-3: #3a0063;
            --simple-colors-default-theme-accent-4: #4c0081;
            --simple-colors-default-theme-accent-5: #5d009f;
            --simple-colors-default-theme-accent-6: #7e00d8;
            --simple-colors-default-theme-accent-7: #a931ff;
            --simple-colors-default-theme-accent-8: #b44aff;
            --simple-colors-default-theme-accent-9: #bb63f9;
            --simple-colors-default-theme-accent-10: #c97eff;
            --simple-colors-default-theme-accent-11: #ddacff;
            --simple-colors-default-theme-accent-12: #f3e4ff;
          }

          :host([accent-color="indigo"]) {
            --simple-colors-default-theme-accent-1: #e5ddff;
            --simple-colors-default-theme-accent-2: #c3b2ff;
            --simple-colors-default-theme-accent-3: #af97ff;
            --simple-colors-default-theme-accent-4: #9e82ff;
            --simple-colors-default-theme-accent-5: #9373ff;
            --simple-colors-default-theme-accent-6: #835fff;
            --simple-colors-default-theme-accent-7: #3a00ff;
            --simple-colors-default-theme-accent-8: #2801b0;
            --simple-colors-default-theme-accent-9: #20008c;
            --simple-colors-default-theme-accent-10: #160063;
            --simple-colors-default-theme-accent-11: #100049;
            --simple-colors-default-theme-accent-12: #0a0030;
            --simple-colors-fixed-theme-accent-1: #e5ddff;
            --simple-colors-fixed-theme-accent-2: #c3b2ff;
            --simple-colors-fixed-theme-accent-3: #af97ff;
            --simple-colors-fixed-theme-accent-4: #9e82ff;
            --simple-colors-fixed-theme-accent-5: #9373ff;
            --simple-colors-fixed-theme-accent-6: #835fff;
            --simple-colors-fixed-theme-accent-7: #3a00ff;
            --simple-colors-fixed-theme-accent-8: #2801b0;
            --simple-colors-fixed-theme-accent-9: #20008c;
            --simple-colors-fixed-theme-accent-10: #160063;
            --simple-colors-fixed-theme-accent-11: #100049;
            --simple-colors-fixed-theme-accent-12: #0a0030;
          }

          :host([dark][accent-color="indigo"]) {
            --simple-colors-default-theme-accent-1: #0a0030;
            --simple-colors-default-theme-accent-2: #100049;
            --simple-colors-default-theme-accent-3: #160063;
            --simple-colors-default-theme-accent-4: #20008c;
            --simple-colors-default-theme-accent-5: #2801b0;
            --simple-colors-default-theme-accent-6: #3a00ff;
            --simple-colors-default-theme-accent-7: #835fff;
            --simple-colors-default-theme-accent-8: #9373ff;
            --simple-colors-default-theme-accent-9: #9e82ff;
            --simple-colors-default-theme-accent-10: #af97ff;
            --simple-colors-default-theme-accent-11: #c3b2ff;
            --simple-colors-default-theme-accent-12: #e5ddff;
          }

          :host([accent-color="blue"]) {
            --simple-colors-default-theme-accent-1: #e2ecff;
            --simple-colors-default-theme-accent-2: #acc9ff;
            --simple-colors-default-theme-accent-3: #95baff;
            --simple-colors-default-theme-accent-4: #74a5ff;
            --simple-colors-default-theme-accent-5: #5892fd;
            --simple-colors-default-theme-accent-6: #4083ff;
            --simple-colors-default-theme-accent-7: #0059ff;
            --simple-colors-default-theme-accent-8: #0041bb;
            --simple-colors-default-theme-accent-9: #003494;
            --simple-colors-default-theme-accent-10: #002569;
            --simple-colors-default-theme-accent-11: #001947;
            --simple-colors-default-theme-accent-12: #001333;
            --simple-colors-fixed-theme-accent-1: #e2ecff;
            --simple-colors-fixed-theme-accent-2: #acc9ff;
            --simple-colors-fixed-theme-accent-3: #95baff;
            --simple-colors-fixed-theme-accent-4: #74a5ff;
            --simple-colors-fixed-theme-accent-5: #5892fd;
            --simple-colors-fixed-theme-accent-6: #4083ff;
            --simple-colors-fixed-theme-accent-7: #0059ff;
            --simple-colors-fixed-theme-accent-8: #0041bb;
            --simple-colors-fixed-theme-accent-9: #003494;
            --simple-colors-fixed-theme-accent-10: #002569;
            --simple-colors-fixed-theme-accent-11: #001947;
            --simple-colors-fixed-theme-accent-12: #001333;
          }

          :host([dark][accent-color="blue"]) {
            --simple-colors-default-theme-accent-1: #001333;
            --simple-colors-default-theme-accent-2: #001947;
            --simple-colors-default-theme-accent-3: #002569;
            --simple-colors-default-theme-accent-4: #003494;
            --simple-colors-default-theme-accent-5: #0041bb;
            --simple-colors-default-theme-accent-6: #0059ff;
            --simple-colors-default-theme-accent-7: #4083ff;
            --simple-colors-default-theme-accent-8: #5892fd;
            --simple-colors-default-theme-accent-9: #74a5ff;
            --simple-colors-default-theme-accent-10: #95baff;
            --simple-colors-default-theme-accent-11: #acc9ff;
            --simple-colors-default-theme-accent-12: #e2ecff;
          }

          :host([accent-color="light-blue"]) {
            --simple-colors-default-theme-accent-1: #cde8ff;
            --simple-colors-default-theme-accent-2: #a1d1ff;
            --simple-colors-default-theme-accent-3: #92c9ff;
            --simple-colors-default-theme-accent-4: #65b3ff;
            --simple-colors-default-theme-accent-5: #58adff;
            --simple-colors-default-theme-accent-6: #41a1ff;
            --simple-colors-default-theme-accent-7: #007ffc;
            --simple-colors-default-theme-accent-8: #0066ca;
            --simple-colors-default-theme-accent-9: #0055a8;
            --simple-colors-default-theme-accent-10: #003f7d;
            --simple-colors-default-theme-accent-11: #002850;
            --simple-colors-default-theme-accent-12: #001b36;
            --simple-colors-fixed-theme-accent-1: #cde8ff;
            --simple-colors-fixed-theme-accent-2: #a1d1ff;
            --simple-colors-fixed-theme-accent-3: #92c9ff;
            --simple-colors-fixed-theme-accent-4: #65b3ff;
            --simple-colors-fixed-theme-accent-5: #58adff;
            --simple-colors-fixed-theme-accent-6: #41a1ff;
            --simple-colors-fixed-theme-accent-7: #007ffc;
            --simple-colors-fixed-theme-accent-8: #0066ca;
            --simple-colors-fixed-theme-accent-9: #0055a8;
            --simple-colors-fixed-theme-accent-10: #003f7d;
            --simple-colors-fixed-theme-accent-11: #002850;
            --simple-colors-fixed-theme-accent-12: #001b36;
          }

          :host([dark][accent-color="light-blue"]) {
            --simple-colors-default-theme-accent-1: #001b36;
            --simple-colors-default-theme-accent-2: #002850;
            --simple-colors-default-theme-accent-3: #003f7d;
            --simple-colors-default-theme-accent-4: #0055a8;
            --simple-colors-default-theme-accent-5: #0066ca;
            --simple-colors-default-theme-accent-6: #007ffc;
            --simple-colors-default-theme-accent-7: #41a1ff;
            --simple-colors-default-theme-accent-8: #58adff;
            --simple-colors-default-theme-accent-9: #65b3ff;
            --simple-colors-default-theme-accent-10: #92c9ff;
            --simple-colors-default-theme-accent-11: #a1d1ff;
            --simple-colors-default-theme-accent-12: #cde8ff;
          }

          :host([accent-color="cyan"]) {
            --simple-colors-default-theme-accent-1: #ddf8ff;
            --simple-colors-default-theme-accent-2: #9beaff;
            --simple-colors-default-theme-accent-3: #77e2ff;
            --simple-colors-default-theme-accent-4: #33d4ff;
            --simple-colors-default-theme-accent-5: #1ccfff;
            --simple-colors-default-theme-accent-6: #00c9ff;
            --simple-colors-default-theme-accent-7: #009dc7;
            --simple-colors-default-theme-accent-8: #007999;
            --simple-colors-default-theme-accent-9: #005970;
            --simple-colors-default-theme-accent-10: #003f50;
            --simple-colors-default-theme-accent-11: #002c38;
            --simple-colors-default-theme-accent-12: #001a20;
            --simple-colors-fixed-theme-accent-1: #ddf8ff;
            --simple-colors-fixed-theme-accent-2: #9beaff;
            --simple-colors-fixed-theme-accent-3: #77e2ff;
            --simple-colors-fixed-theme-accent-4: #33d4ff;
            --simple-colors-fixed-theme-accent-5: #1ccfff;
            --simple-colors-fixed-theme-accent-6: #00c9ff;
            --simple-colors-fixed-theme-accent-7: #009dc7;
            --simple-colors-fixed-theme-accent-8: #007999;
            --simple-colors-fixed-theme-accent-9: #005970;
            --simple-colors-fixed-theme-accent-10: #003f50;
            --simple-colors-fixed-theme-accent-11: #002c38;
            --simple-colors-fixed-theme-accent-12: #001a20;
          }

          :host([dark][accent-color="cyan"]) {
            --simple-colors-default-theme-accent-1: #001a20;
            --simple-colors-default-theme-accent-2: #002c38;
            --simple-colors-default-theme-accent-3: #003f50;
            --simple-colors-default-theme-accent-4: #005970;
            --simple-colors-default-theme-accent-5: #007999;
            --simple-colors-default-theme-accent-6: #009dc7;
            --simple-colors-default-theme-accent-7: #00c9ff;
            --simple-colors-default-theme-accent-8: #1ccfff;
            --simple-colors-default-theme-accent-9: #33d4ff;
            --simple-colors-default-theme-accent-10: #77e2ff;
            --simple-colors-default-theme-accent-11: #9beaff;
            --simple-colors-default-theme-accent-12: #ddf8ff;
          }

          :host([accent-color="teal"]) {
            --simple-colors-default-theme-accent-1: #d9fff0;
            --simple-colors-default-theme-accent-2: #98ffd7;
            --simple-colors-default-theme-accent-3: #79ffcb;
            --simple-colors-default-theme-accent-4: #56ffbd;
            --simple-colors-default-theme-accent-5: #29ffac;
            --simple-colors-default-theme-accent-6: #00ff9c;
            --simple-colors-default-theme-accent-7: #009d75;
            --simple-colors-default-theme-accent-8: #007658;
            --simple-colors-default-theme-accent-9: #004e3a;
            --simple-colors-default-theme-accent-10: #003829;
            --simple-colors-default-theme-accent-11: #002a20;
            --simple-colors-default-theme-accent-12: #001b14;
            --simple-colors-fixed-theme-accent-1: #d9fff0;
            --simple-colors-fixed-theme-accent-2: #98ffd7;
            --simple-colors-fixed-theme-accent-3: #79ffcb;
            --simple-colors-fixed-theme-accent-4: #56ffbd;
            --simple-colors-fixed-theme-accent-5: #29ffac;
            --simple-colors-fixed-theme-accent-6: #00ff9c;
            --simple-colors-fixed-theme-accent-7: #009d75;
            --simple-colors-fixed-theme-accent-8: #007658;
            --simple-colors-fixed-theme-accent-9: #004e3a;
            --simple-colors-fixed-theme-accent-10: #003829;
            --simple-colors-fixed-theme-accent-11: #002a20;
            --simple-colors-fixed-theme-accent-12: #001b14;
          }

          :host([dark][accent-color="teal"]) {
            --simple-colors-default-theme-accent-1: #001b14;
            --simple-colors-default-theme-accent-2: #002a20;
            --simple-colors-default-theme-accent-3: #003829;
            --simple-colors-default-theme-accent-4: #004e3a;
            --simple-colors-default-theme-accent-5: #007658;
            --simple-colors-default-theme-accent-6: #009d75;
            --simple-colors-default-theme-accent-7: #00ff9c;
            --simple-colors-default-theme-accent-8: #29ffac;
            --simple-colors-default-theme-accent-9: #56ffbd;
            --simple-colors-default-theme-accent-10: #79ffcb;
            --simple-colors-default-theme-accent-11: #98ffd7;
            --simple-colors-default-theme-accent-12: #d9fff0;
          }

          :host([accent-color="green"]) {
            --simple-colors-default-theme-accent-1: #e1ffeb;
            --simple-colors-default-theme-accent-2: #acffc9;
            --simple-colors-default-theme-accent-3: #79ffa7;
            --simple-colors-default-theme-accent-4: #49ff88;
            --simple-colors-default-theme-accent-5: #24ff70;
            --simple-colors-default-theme-accent-6: #00f961;
            --simple-colors-default-theme-accent-7: #008c37;
            --simple-colors-default-theme-accent-8: #00762e;
            --simple-colors-default-theme-accent-9: #005a23;
            --simple-colors-default-theme-accent-10: #003d18;
            --simple-colors-default-theme-accent-11: #002a11;
            --simple-colors-default-theme-accent-12: #001d0c;
            --simple-colors-fixed-theme-accent-1: #e1ffeb;
            --simple-colors-fixed-theme-accent-2: #acffc9;
            --simple-colors-fixed-theme-accent-3: #79ffa7;
            --simple-colors-fixed-theme-accent-4: #49ff88;
            --simple-colors-fixed-theme-accent-5: #24ff70;
            --simple-colors-fixed-theme-accent-6: #00f961;
            --simple-colors-fixed-theme-accent-7: #008c37;
            --simple-colors-fixed-theme-accent-8: #00762e;
            --simple-colors-fixed-theme-accent-9: #005a23;
            --simple-colors-fixed-theme-accent-10: #003d18;
            --simple-colors-fixed-theme-accent-11: #002a11;
            --simple-colors-fixed-theme-accent-12: #001d0c;
          }

          :host([dark][accent-color="green"]) {
            --simple-colors-default-theme-accent-1: #001d0c;
            --simple-colors-default-theme-accent-2: #002a11;
            --simple-colors-default-theme-accent-3: #003d18;
            --simple-colors-default-theme-accent-4: #005a23;
            --simple-colors-default-theme-accent-5: #00762e;
            --simple-colors-default-theme-accent-6: #008c37;
            --simple-colors-default-theme-accent-7: #00f961;
            --simple-colors-default-theme-accent-8: #24ff70;
            --simple-colors-default-theme-accent-9: #49ff88;
            --simple-colors-default-theme-accent-10: #79ffa7;
            --simple-colors-default-theme-accent-11: #acffc9;
            --simple-colors-default-theme-accent-12: #e1ffeb;
          }

          :host([accent-color="light-green"]) {
            --simple-colors-default-theme-accent-1: #ebffdb;
            --simple-colors-default-theme-accent-2: #c7ff9b;
            --simple-colors-default-theme-accent-3: #b1ff75;
            --simple-colors-default-theme-accent-4: #a1fd5a;
            --simple-colors-default-theme-accent-5: #8efd38;
            --simple-colors-default-theme-accent-6: #6fff00;
            --simple-colors-default-theme-accent-7: #429d00;
            --simple-colors-default-theme-accent-8: #357f00;
            --simple-colors-default-theme-accent-9: #296100;
            --simple-colors-default-theme-accent-10: #1b3f00;
            --simple-colors-default-theme-accent-11: #143000;
            --simple-colors-default-theme-accent-12: #0d2000;
            --simple-colors-fixed-theme-accent-1: #ebffdb;
            --simple-colors-fixed-theme-accent-2: #c7ff9b;
            --simple-colors-fixed-theme-accent-3: #b1ff75;
            --simple-colors-fixed-theme-accent-4: #a1fd5a;
            --simple-colors-fixed-theme-accent-5: #8efd38;
            --simple-colors-fixed-theme-accent-6: #6fff00;
            --simple-colors-fixed-theme-accent-7: #429d00;
            --simple-colors-fixed-theme-accent-8: #357f00;
            --simple-colors-fixed-theme-accent-9: #296100;
            --simple-colors-fixed-theme-accent-10: #1b3f00;
            --simple-colors-fixed-theme-accent-11: #143000;
            --simple-colors-fixed-theme-accent-12: #0d2000;
          }

          :host([dark][accent-color="light-green"]) {
            --simple-colors-default-theme-accent-1: #0d2000;
            --simple-colors-default-theme-accent-2: #143000;
            --simple-colors-default-theme-accent-3: #1b3f00;
            --simple-colors-default-theme-accent-4: #296100;
            --simple-colors-default-theme-accent-5: #357f00;
            --simple-colors-default-theme-accent-6: #429d00;
            --simple-colors-default-theme-accent-7: #6fff00;
            --simple-colors-default-theme-accent-8: #8efd38;
            --simple-colors-default-theme-accent-9: #a1fd5a;
            --simple-colors-default-theme-accent-10: #b1ff75;
            --simple-colors-default-theme-accent-11: #c7ff9b;
            --simple-colors-default-theme-accent-12: #ebffdb;
          }

          :host([accent-color="lime"]) {
            --simple-colors-default-theme-accent-1: #f1ffd2;
            --simple-colors-default-theme-accent-2: #dfff9b;
            --simple-colors-default-theme-accent-3: #d4ff77;
            --simple-colors-default-theme-accent-4: #caff58;
            --simple-colors-default-theme-accent-5: #bdff2d;
            --simple-colors-default-theme-accent-6: #aeff00;
            --simple-colors-default-theme-accent-7: #649900;
            --simple-colors-default-theme-accent-8: #4d7600;
            --simple-colors-default-theme-accent-9: #3b5a00;
            --simple-colors-default-theme-accent-10: #293f00;
            --simple-colors-default-theme-accent-11: #223400;
            --simple-colors-default-theme-accent-12: #182400;
            --simple-colors-fixed-theme-accent-1: #f1ffd2;
            --simple-colors-fixed-theme-accent-2: #dfff9b;
            --simple-colors-fixed-theme-accent-3: #d4ff77;
            --simple-colors-fixed-theme-accent-4: #caff58;
            --simple-colors-fixed-theme-accent-5: #bdff2d;
            --simple-colors-fixed-theme-accent-6: #aeff00;
            --simple-colors-fixed-theme-accent-7: #649900;
            --simple-colors-fixed-theme-accent-8: #4d7600;
            --simple-colors-fixed-theme-accent-9: #3b5a00;
            --simple-colors-fixed-theme-accent-10: #293f00;
            --simple-colors-fixed-theme-accent-11: #223400;
            --simple-colors-fixed-theme-accent-12: #182400;
          }

          :host([dark][accent-color="lime"]) {
            --simple-colors-default-theme-accent-1: #182400;
            --simple-colors-default-theme-accent-2: #223400;
            --simple-colors-default-theme-accent-3: #293f00;
            --simple-colors-default-theme-accent-4: #3b5a00;
            --simple-colors-default-theme-accent-5: #4d7600;
            --simple-colors-default-theme-accent-6: #649900;
            --simple-colors-default-theme-accent-7: #aeff00;
            --simple-colors-default-theme-accent-8: #bdff2d;
            --simple-colors-default-theme-accent-9: #caff58;
            --simple-colors-default-theme-accent-10: #d4ff77;
            --simple-colors-default-theme-accent-11: #dfff9b;
            --simple-colors-default-theme-accent-12: #f1ffd2;
          }

          :host([accent-color="yellow"]) {
            --simple-colors-default-theme-accent-1: #ffffd5;
            --simple-colors-default-theme-accent-2: #ffffac;
            --simple-colors-default-theme-accent-3: #ffff90;
            --simple-colors-default-theme-accent-4: #ffff7c;
            --simple-colors-default-theme-accent-5: #ffff3a;
            --simple-colors-default-theme-accent-6: #f6f600;
            --simple-colors-default-theme-accent-7: #929100;
            --simple-colors-default-theme-accent-8: #787700;
            --simple-colors-default-theme-accent-9: #585700;
            --simple-colors-default-theme-accent-10: #454400;
            --simple-colors-default-theme-accent-11: #303000;
            --simple-colors-default-theme-accent-12: #242400;
            --simple-colors-fixed-theme-accent-1: #ffffd5;
            --simple-colors-fixed-theme-accent-2: #ffffac;
            --simple-colors-fixed-theme-accent-3: #ffff90;
            --simple-colors-fixed-theme-accent-4: #ffff7c;
            --simple-colors-fixed-theme-accent-5: #ffff3a;
            --simple-colors-fixed-theme-accent-6: #f6f600;
            --simple-colors-fixed-theme-accent-7: #929100;
            --simple-colors-fixed-theme-accent-8: #787700;
            --simple-colors-fixed-theme-accent-9: #585700;
            --simple-colors-fixed-theme-accent-10: #454400;
            --simple-colors-fixed-theme-accent-11: #303000;
            --simple-colors-fixed-theme-accent-12: #242400;
          }

          :host([dark][accent-color="yellow"]) {
            --simple-colors-default-theme-accent-1: #242400;
            --simple-colors-default-theme-accent-2: #303000;
            --simple-colors-default-theme-accent-3: #454400;
            --simple-colors-default-theme-accent-4: #585700;
            --simple-colors-default-theme-accent-5: #787700;
            --simple-colors-default-theme-accent-6: #929100;
            --simple-colors-default-theme-accent-7: #f6f600;
            --simple-colors-default-theme-accent-8: #ffff3a;
            --simple-colors-default-theme-accent-9: #ffff7c;
            --simple-colors-default-theme-accent-10: #ffff90;
            --simple-colors-default-theme-accent-11: #ffffac;
            --simple-colors-default-theme-accent-12: #ffffd5;
          }

          :host([accent-color="amber"]) {
            --simple-colors-default-theme-accent-1: #fff2d4;
            --simple-colors-default-theme-accent-2: #ffdf92;
            --simple-colors-default-theme-accent-3: #ffd677;
            --simple-colors-default-theme-accent-4: #ffcf5e;
            --simple-colors-default-theme-accent-5: #ffc235;
            --simple-colors-default-theme-accent-6: #ffc500;
            --simple-colors-default-theme-accent-7: #b28900;
            --simple-colors-default-theme-accent-8: #876800;
            --simple-colors-default-theme-accent-9: #614b00;
            --simple-colors-default-theme-accent-10: #413200;
            --simple-colors-default-theme-accent-11: #302500;
            --simple-colors-default-theme-accent-12: #221a00;
            --simple-colors-fixed-theme-accent-1: #fff2d4;
            --simple-colors-fixed-theme-accent-2: #ffdf92;
            --simple-colors-fixed-theme-accent-3: #ffd677;
            --simple-colors-fixed-theme-accent-4: #ffcf5e;
            --simple-colors-fixed-theme-accent-5: #ffc235;
            --simple-colors-fixed-theme-accent-6: #ffc500;
            --simple-colors-fixed-theme-accent-7: #b28900;
            --simple-colors-fixed-theme-accent-8: #876800;
            --simple-colors-fixed-theme-accent-9: #614b00;
            --simple-colors-fixed-theme-accent-10: #413200;
            --simple-colors-fixed-theme-accent-11: #302500;
            --simple-colors-fixed-theme-accent-12: #221a00;
          }

          :host([dark][accent-color="amber"]) {
            --simple-colors-default-theme-accent-1: #221a00;
            --simple-colors-default-theme-accent-2: #302500;
            --simple-colors-default-theme-accent-3: #413200;
            --simple-colors-default-theme-accent-4: #614b00;
            --simple-colors-default-theme-accent-5: #876800;
            --simple-colors-default-theme-accent-6: #b28900;
            --simple-colors-default-theme-accent-7: #ffc500;
            --simple-colors-default-theme-accent-8: #ffc235;
            --simple-colors-default-theme-accent-9: #ffcf5e;
            --simple-colors-default-theme-accent-10: #ffd677;
            --simple-colors-default-theme-accent-11: #ffdf92;
            --simple-colors-default-theme-accent-12: #fff2d4;
          }

          :host([accent-color="orange"]) {
            --simple-colors-default-theme-accent-1: #ffebd7;
            --simple-colors-default-theme-accent-2: #ffca92;
            --simple-colors-default-theme-accent-3: #ffbd75;
            --simple-colors-default-theme-accent-4: #ffb05c;
            --simple-colors-default-theme-accent-5: #ff9e36;
            --simple-colors-default-theme-accent-6: #ff9625;
            --simple-colors-default-theme-accent-7: #e56a00;
            --simple-colors-default-theme-accent-8: #ae5100;
            --simple-colors-default-theme-accent-9: #833d00;
            --simple-colors-default-theme-accent-10: #612d00;
            --simple-colors-default-theme-accent-11: #3d1c00;
            --simple-colors-default-theme-accent-12: #2c1400;
            --simple-colors-fixed-theme-accent-1: #ffebd7;
            --simple-colors-fixed-theme-accent-2: #ffca92;
            --simple-colors-fixed-theme-accent-3: #ffbd75;
            --simple-colors-fixed-theme-accent-4: #ffb05c;
            --simple-colors-fixed-theme-accent-5: #ff9e36;
            --simple-colors-fixed-theme-accent-6: #ff9625;
            --simple-colors-fixed-theme-accent-7: #e56a00;
            --simple-colors-fixed-theme-accent-8: #ae5100;
            --simple-colors-fixed-theme-accent-9: #833d00;
            --simple-colors-fixed-theme-accent-10: #612d00;
            --simple-colors-fixed-theme-accent-11: #3d1c00;
            --simple-colors-fixed-theme-accent-12: #2c1400;
          }

          :host([dark][accent-color="orange"]) {
            --simple-colors-default-theme-accent-1: #2c1400;
            --simple-colors-default-theme-accent-2: #3d1c00;
            --simple-colors-default-theme-accent-3: #612d00;
            --simple-colors-default-theme-accent-4: #833d00;
            --simple-colors-default-theme-accent-5: #ae5100;
            --simple-colors-default-theme-accent-6: #e56a00;
            --simple-colors-default-theme-accent-7: #ff9625;
            --simple-colors-default-theme-accent-8: #ff9e36;
            --simple-colors-default-theme-accent-9: #ffb05c;
            --simple-colors-default-theme-accent-10: #ffbd75;
            --simple-colors-default-theme-accent-11: #ffca92;
            --simple-colors-default-theme-accent-12: #ffebd7;
          }

          :host([accent-color="deep-orange"]) {
            --simple-colors-default-theme-accent-1: #ffe7e0;
            --simple-colors-default-theme-accent-2: #ffb299;
            --simple-colors-default-theme-accent-3: #ffa588;
            --simple-colors-default-theme-accent-4: #ff8a64;
            --simple-colors-default-theme-accent-5: #ff7649;
            --simple-colors-default-theme-accent-6: #ff6c3c;
            --simple-colors-default-theme-accent-7: #f53100;
            --simple-colors-default-theme-accent-8: #b92500;
            --simple-colors-default-theme-accent-9: #8a1c00;
            --simple-colors-default-theme-accent-10: #561100;
            --simple-colors-default-theme-accent-11: #3a0c00;
            --simple-colors-default-theme-accent-12: #240700;
            --simple-colors-fixed-theme-accent-1: #ffe7e0;
            --simple-colors-fixed-theme-accent-2: #ffb299;
            --simple-colors-fixed-theme-accent-3: #ffa588;
            --simple-colors-fixed-theme-accent-4: #ff8a64;
            --simple-colors-fixed-theme-accent-5: #ff7649;
            --simple-colors-fixed-theme-accent-6: #ff6c3c;
            --simple-colors-fixed-theme-accent-7: #f53100;
            --simple-colors-fixed-theme-accent-8: #b92500;
            --simple-colors-fixed-theme-accent-9: #8a1c00;
            --simple-colors-fixed-theme-accent-10: #561100;
            --simple-colors-fixed-theme-accent-11: #3a0c00;
            --simple-colors-fixed-theme-accent-12: #240700;
          }

          :host([dark][accent-color="deep-orange"]) {
            --simple-colors-default-theme-accent-1: #240700;
            --simple-colors-default-theme-accent-2: #3a0c00;
            --simple-colors-default-theme-accent-3: #561100;
            --simple-colors-default-theme-accent-4: #8a1c00;
            --simple-colors-default-theme-accent-5: #b92500;
            --simple-colors-default-theme-accent-6: #f53100;
            --simple-colors-default-theme-accent-7: #ff6c3c;
            --simple-colors-default-theme-accent-8: #ff7649;
            --simple-colors-default-theme-accent-9: #ff8a64;
            --simple-colors-default-theme-accent-10: #ffa588;
            --simple-colors-default-theme-accent-11: #ffb299;
            --simple-colors-default-theme-accent-12: #ffe7e0;
          }

          :host([accent-color="brown"]) {
            --simple-colors-default-theme-accent-1: #f0e2de;
            --simple-colors-default-theme-accent-2: #e5b8aa;
            --simple-colors-default-theme-accent-3: #c59485;
            --simple-colors-default-theme-accent-4: #b68373;
            --simple-colors-default-theme-accent-5: #ac7868;
            --simple-colors-default-theme-accent-6: #a47060;
            --simple-colors-default-theme-accent-7: #85574a;
            --simple-colors-default-theme-accent-8: #724539;
            --simple-colors-default-theme-accent-9: #5b3328;
            --simple-colors-default-theme-accent-10: #3b1e15;
            --simple-colors-default-theme-accent-11: #2c140e;
            --simple-colors-default-theme-accent-12: #200e09;
            --simple-colors-fixed-theme-accent-1: #f0e2de;
            --simple-colors-fixed-theme-accent-2: #e5b8aa;
            --simple-colors-fixed-theme-accent-3: #c59485;
            --simple-colors-fixed-theme-accent-4: #b68373;
            --simple-colors-fixed-theme-accent-5: #ac7868;
            --simple-colors-fixed-theme-accent-6: #a47060;
            --simple-colors-fixed-theme-accent-7: #85574a;
            --simple-colors-fixed-theme-accent-8: #724539;
            --simple-colors-fixed-theme-accent-9: #5b3328;
            --simple-colors-fixed-theme-accent-10: #3b1e15;
            --simple-colors-fixed-theme-accent-11: #2c140e;
            --simple-colors-fixed-theme-accent-12: #200e09;
          }

          :host([dark][accent-color="brown"]) {
            --simple-colors-default-theme-accent-1: #200e09;
            --simple-colors-default-theme-accent-2: #2c140e;
            --simple-colors-default-theme-accent-3: #3b1e15;
            --simple-colors-default-theme-accent-4: #5b3328;
            --simple-colors-default-theme-accent-5: #724539;
            --simple-colors-default-theme-accent-6: #85574a;
            --simple-colors-default-theme-accent-7: #a47060;
            --simple-colors-default-theme-accent-8: #ac7868;
            --simple-colors-default-theme-accent-9: #b68373;
            --simple-colors-default-theme-accent-10: #c59485;
            --simple-colors-default-theme-accent-11: #e5b8aa;
            --simple-colors-default-theme-accent-12: #f0e2de;
          }

          :host([accent-color="blue-grey"]) {
            --simple-colors-default-theme-accent-1: #e7eff1;
            --simple-colors-default-theme-accent-2: #b1c5ce;
            --simple-colors-default-theme-accent-3: #9badb6;
            --simple-colors-default-theme-accent-4: #8d9fa7;
            --simple-colors-default-theme-accent-5: #7a8f98;
            --simple-colors-default-theme-accent-6: #718892;
            --simple-colors-default-theme-accent-7: #56707c;
            --simple-colors-default-theme-accent-8: #40535b;
            --simple-colors-default-theme-accent-9: #2f3e45;
            --simple-colors-default-theme-accent-10: #1e282c;
            --simple-colors-default-theme-accent-11: #182023;
            --simple-colors-default-theme-accent-12: #0f1518;
            --simple-colors-fixed-theme-accent-1: #e7eff1;
            --simple-colors-fixed-theme-accent-2: #b1c5ce;
            --simple-colors-fixed-theme-accent-3: #9badb6;
            --simple-colors-fixed-theme-accent-4: #8d9fa7;
            --simple-colors-fixed-theme-accent-5: #7a8f98;
            --simple-colors-fixed-theme-accent-6: #718892;
            --simple-colors-fixed-theme-accent-7: #56707c;
            --simple-colors-fixed-theme-accent-8: #40535b;
            --simple-colors-fixed-theme-accent-9: #2f3e45;
            --simple-colors-fixed-theme-accent-10: #1e282c;
            --simple-colors-fixed-theme-accent-11: #182023;
            --simple-colors-fixed-theme-accent-12: #0f1518;
          }

          :host([dark][accent-color="blue-grey"]) {
            --simple-colors-default-theme-accent-1: #0f1518;
            --simple-colors-default-theme-accent-2: #182023;
            --simple-colors-default-theme-accent-3: #1e282c;
            --simple-colors-default-theme-accent-4: #2f3e45;
            --simple-colors-default-theme-accent-5: #40535b;
            --simple-colors-default-theme-accent-6: #56707c;
            --simple-colors-default-theme-accent-7: #718892;
            --simple-colors-default-theme-accent-8: #7a8f98;
            --simple-colors-default-theme-accent-9: #8d9fa7;
            --simple-colors-default-theme-accent-10: #9badb6;
            --simple-colors-default-theme-accent-11: #b1c5ce;
            --simple-colors-default-theme-accent-12: #e7eff1;
          }

          /* from a11y-utils */
          .sr-only {
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          } `];
    }

    // render function
    render() {
      return ke` <slot></slot>`;
    }

    // properties available to the custom element for data binding
    static get properties() {
      return {
        ...super.properties,
        /**
         * a selected accent-"color": grey, red, pink, purple, etc.
         */
        accentColor: {
          attribute: "accent-color",
          type: String,
          reflect: true
        },
        /**
         * make the default theme dark?
         */
        dark: {
          name: "dark",
          type: Boolean,
          reflect: true
        }
      };
    }
    constructor() {
      super();
      this.accentColor = "grey";
      this.dark = false;
      this.colors = SimpleColorsSharedStylesGlobal.colors;
    }
    static get tag() {
      return "simple-colors";
    }

    /**
     * gets the current shade
     *
     * @param {string} the shade
     * @param {number} the inverted shade
     */
    invertShade(shade) {
      return SimpleColorsSharedStylesGlobal.invertShade(shade);
    }

    /**
     * gets the color information of a given CSS variable or class
     *
     * @param {string} the CSS variable (eg. `--simple-colors-fixed-theme-red-3`) or a class (eg. `.simple-colors-fixed-theme-red-3-text`)
     * @param {object} an object that includes the theme, color, and shade information
     */
    getColorInfo(colorName) {
      return SimpleColorsSharedStylesGlobal.getColorInfo(colorName);
    }

    /**
     * returns a variable based on color name, shade, and fixed theme
     *
     * @param {string} the color name
     * @param {number} the color shade
     * @param {boolean} the color shade
     * @returns {string} the CSS Variable
     */
    makeVariable(color = "grey", shade = 1, theme = "default") {
      return SimpleColorsSharedStylesGlobal.makeVariable(color = "grey", shade = 1, theme = "default");
    }

    /**
     * for large or small text given a color and its shade,
     * lists all the colors and shades that would be
     * WCAG 2.0 AA-compliant for contrast
     *
     * @param {boolean} large text? >= 18pt || (bold && >= 14pt)
     * @param {string} color name, e.g. "deep-purple"
     * @param {string} color shade, e.g. 3
     * @param {object} all of the WCAG 2.0 AA-compliant colors and shades
     */
    getContrastingColors(colorName, colorShade, isLarge) {
      return SimpleColorsSharedStylesGlobal.getContrastingColors(colorName, colorShade, isLarge);
    }

    /**
     * for large or small text given a color and its shade,
     * lists all the shades of another color that would be
     * WCAG 2.0 AA-compliant for contrast
     *
     * @param {boolean} large text? >= 18pt || (bold && >= 14pt)
     * @param {string} color name, e.g. "deep-purple"
     * @param {string} color shade, e.g. 3
     * @param {string} contrasting color name, e.g. "grey"
     * @param {array} all of the WCAG 2.0 AA-compliant shades of the contrasting color
     */
    getContrastingShades(isLarge, colorName, colorShade, contrastName) {
      return SimpleColorsSharedStylesGlobal.getContrastingShades(isLarge, colorName, colorShade, contrastName);
    }

    /**
     * determines if two shades are WCAG 2.0 AA-compliant for contrast
     *
     * @param {boolean} large text? >= 18pt || (bold && >= 14pt)
     * @param {string} color name, e.g. "deep-purple"
     * @param {string} color shade, e.g. 3
     * @param {string} contrasting color name, e.g. "grey"
     * @param {string} contrast shade, e.g. 12
     * @param {boolean} whether or not the contrasting shade is WCAG 2.0 AA-compliant
     */
    isContrastCompliant(isLarge, colorName, colorShade, contrastName, contrastShade) {
      return SimpleColorsSharedStylesGlobal.isContrastCompliant(isLarge, colorName, colorShade, contrastName, contrastShade);
    }
  };
};
/**
  * `simple-colors`
  * a shared set of styles for `@haxtheweb`
 ### Styling
 See demo of "all of the colors" (`demo/colors.html`) for styling.
  *
 
  * @demo ./demo/index.html demo
  * @demo ./demo/how.html getting started
  * @demo ./demo/colors.html all of the colors
  * @demo ./demo/picker.html simple-colors-picker
  * @demo ./demo/extending.html extending simple-colors
  * @element simple-colors
  */
class SimpleColors extends SimpleColorsSuper(h) {}
customElements.define(SimpleColors.tag, SimpleColors);

/**
 * Singleton to manage iconsets
 * @demo demo/index.html
 */
// polyfill for replaceAll, I hate you Safari / really old stuff
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (find, replace) {
    return this.split(find).join(replace);
  };
}
/**
 *
 * @class SimpleIconset
 * @extends HTMLElement
 */
class SimpleIconset extends h {
  static get tag() {
    return "simple-iconset";
  }
  constructor() {
    super();
    this.iconsets = {};
    this.iconlist = [];
    this.manifest = {};
    this.needsHydrated = [];
  }
  /**
   * Manifest.js files can register themselves to create an icon list.
   * These files export an array of iconsets
   * as [{name: iconsetName, icons: [ iconName,iconName2 ]}]
   *
   * @param {array} manifest array of iconsets
   * @memberof SimpleIconset
   */
  registerManifest(manifest) {
    (manifest || []).forEach(iconset => {
      if (!this.manifest[iconset.name]) {
        this.manifest[iconset.name] = iconset.icons || [];
        this.manifest[iconset.name].forEach(icon => {
          this.iconlist.push(`${iconset.name}:${icon}`);
        });
      }
    });
  }
  /**
   * Iconsets are to register a namespace in either manner:
   * object notation: key name of the icon with a specific path to the file
   * {
   *   icon: iconLocation,
   *   icon2: iconLocation2
   * }
   * string notation: assumes icon name can be found at ${iconLocationBasePath}${iconname}.svg
   * iconLocationBasePath
   */
  registerIconset(name, icons = {}) {
    if (typeof icons === "object") {
      this.iconsets[name] = {
        ...icons
      };
    } else if (typeof icons === "string") {
      this.iconsets[name] = icons;
    }
    // try processing anything that might have missed previously
    if (this.needsHydrated.length > 0) {
      let list = [];
      this.needsHydrated.forEach((item, index) => {
        // set the src from interns of the icon, returns if it matched
        // which will then push it into the list to be removed from processing
        if (typeof item.setSrcByIcon === "function" && item.setSrcByIcon(this)) {
          list.push(index);
        }
      });
      // process in reverse order to avoid key splicing issues
      list.reverse().forEach(val => {
        this.needsHydrated.splice(val, 1);
      });
    }
  }
  /**
   * return the icon location on splitting the string on : for position in the object
   * if the icon doesn't exist, it sets a value for future updates in the event
   * that the library for the icon registers AFTER the request to visualize is made
   */
  getIcon(val, context) {
    let ary = val.replaceAll("/", "-").split(":");
    // legacy API used to fill in icons: for lazy devs so let's mirror
    if (ary.length === 1) {
      ary = ["icons", val];
    }
    if (ary.length == 2 && this.iconsets[ary[0]]) {
      if (typeof this.iconsets[ary[0]] !== "string" && this.iconsets[ary[0]][ary[1]] && typeof this.iconsets[ary[0]][ary[1]] !== "function") {
        return this.iconsets[ary[0]][ary[1]];
      } else if (ary[1]) {
        return `${this.iconsets[ary[0]]}${ary[1]}.svg`;
      }
    }
    // if we get here we just missed on the icon hydrating which means
    // either it's an invalid icon OR the library to register the icons
    // location will import AFTER (possible microtiming early on)
    // also weird looking by context is either the element asking about
    // itself OR the the iconset state manager checking for hydration
    if (context !== this && context) {
      this.needsHydrated.push(context);
    }
    return null;
  }
}
globalThis.customElements.define(SimpleIconset.tag, SimpleIconset);
globalThis.SimpleIconset = globalThis.SimpleIconset || {};
/**
 * Checks to see if there is an instance available, and if not appends one
 */
globalThis.SimpleIconset.requestAvailability = () => {
  if (globalThis.SimpleIconset.instance == null && globalThis.document && globalThis.document.body) {
    globalThis.SimpleIconset.instance = globalThis.document.createElement("simple-iconset");
    globalThis.document.body.appendChild(globalThis.SimpleIconset.instance);
  }
  return globalThis.SimpleIconset.instance;
};
// self request so that when this file is referenced it exists in the dom
const SimpleIconsetStore = typeof global !== "undefined" ? new SimpleIconset() : globalThis.SimpleIconset.requestAvailability();

/**
 * @const SimpleIconIconsetsManifest
 */
const SimpleIconIconsetsManifest = [{
  name: "av",
  icons: ["add-to-queue", "airplay", "album", "art-track", "av-timer", "branding-watermark", "call-to-action", "closed-caption", "equalizer", "explicit", "fast-forward", "fast-rewind", "featured-play-list", "featured-video", "fiber-dvr", "fiber-manual-record", "fiber-new", "fiber-pin", "fiber-smart-record", "forward-10", "forward-30", "forward-5", "games", "hd", "hearing", "high-quality", "library-add", "library-books", "library-music", "loop", "mic-none", "mic-off", "mic", "movie", "music-video", "new-releases", "not-interested", "note", "pause-circle-filled", "pause-circle-outline", "pause", "play-arrow", "play-circle-filled", "play-circle-outline", "playlist-add-check", "playlist-add", "playlist-play", "queue-music", "queue-play-next", "queue", "radio", "recent-actors", "remove-from-queue", "repeat-one", "repeat", "replay-10", "replay-30", "replay-5", "replay", "shuffle", "skip-next", "skip-previous", "slow-motion-video", "snooze", "sort-by-alpha", "stop", "subscriptions", "subtitles", "surround-sound", "video-call", "video-label", "video-library", "videocam-off", "videocam", "volume-down", "volume-mute", "volume-off", "volume-up", "web-asset", "web"]
}, {
  name: "communication",
  icons: ["business", "call-end", "call-made", "call-merge", "call-missed-outgoing", "call-missed", "call-received", "call-split", "call", "chat-bubble-outline", "chat-bubble", "chat", "clear-all", "comment", "contact-mail", "contact-phone", "contacts", "dialer-sip", "dialpad", "email", "forum", "import-contacts", "import-export", "invert-colors-off", "live-help", "location-off", "location-on", "mail-outline", "message", "no-sim", "phone", "phonelink-erase", "phonelink-lock", "phonelink-ring", "phonelink-setup", "portable-wifi-off", "present-to-all", "ring-volume", "rss-feed", "screen-share", "speaker-phone", "stay-current-landscape", "stay-current-portrait", "stay-primary-landscape", "stay-primary-portrait", "stop-screen-share", "swap-calls", "textsms", "voicemail", "vpn-key"]
}, {
  name: "device",
  icons: ["access-alarm", "access-alarms", "access-time", "add-alarm", "airplanemode-active", "airplanemode-inactive", "battery-20", "battery-30", "battery-50", "battery-60", "battery-80", "battery-90", "battery-alert", "battery-charging-20", "battery-charging-30", "battery-charging-50", "battery-charging-60", "battery-charging-80", "battery-charging-90", "battery-charging-full", "battery-full", "battery-std", "battery-unknown", "bluetooth-connected", "bluetooth-disabled", "bluetooth-searching", "bluetooth", "brightness-auto", "brightness-high", "brightness-low", "brightness-medium", "data-usage", "developer-mode", "devices", "dvr", "gps-fixed", "gps-not-fixed", "gps-off", "graphic-eq", "location-disabled", "location-searching", "network-cell", "network-wifi", "nfc", "screen-lock-landscape", "screen-lock-portrait", "screen-lock-rotation", "screen-rotation", "sd-storage", "settings-system-daydream", "signal-cellular-0-bar", "signal-cellular-1-bar", "signal-cellular-2-bar", "signal-cellular-3-bar", "signal-cellular-4-bar", "signal-cellular-connected-no-internet-0-bar", "signal-cellular-connected-no-internet-1-bar", "signal-cellular-connected-no-internet-2-bar", "signal-cellular-connected-no-internet-3-bar", "signal-cellular-connected-no-internet-4-bar", "signal-cellular-no-sim", "signal-cellular-null", "signal-cellular-off", "signal-wifi-0-bar", "signal-wifi-1-bar-lock", "signal-wifi-1-bar", "signal-wifi-2-bar-lock", "signal-wifi-2-bar", "signal-wifi-3-bar-lock", "signal-wifi-3-bar", "signal-wifi-4-bar-lock", "signal-wifi-4-bar", "signal-wifi-off", "storage", "usb", "wallpaper", "widgets", "wifi-lock", "wifi-tethering"]
}, {
  name: "editor",
  icons: ["attach-file", "attach-money", "border-all", "border-bottom", "border-clear", "border-color", "border-horizontal", "border-inner", "border-left", "border-outer", "border-right", "border-style", "border-top", "border-vertical", "bubble-chart", "drag-handle", "format-align-center", "format-align-justify", "format-align-left", "format-align-right", "format-bold", "format-clear", "format-color-fill", "format-color-reset", "format-color-text", "format-indent-decrease", "format-indent-increase", "format-italic", "format-line-spacing", "format-list-bulleted", "format-list-numbered", "format-page-break", "format-paint", "format-quote", "format-shapes", "format-size", "format-strikethrough", "format-textdirection-l-to-r", "format-textdirection-r-to-l", "format-underlined", "functions", "highlight", "insert-chart", "insert-comment", "insert-drive-file", "insert-emoticon", "insert-invitation", "insert-link", "insert-photo", "linear-scale", "merge-type", "mode-comment", "mode-edit", "monetization-on", "money-off", "multiline-chart", "pie-chart-outlined", "pie-chart", "publish", "short-text", "show-chart", "space-bar", "strikethrough-s", "text-fields", "title", "vertical-align-bottom", "vertical-align-center", "vertical-align-top", "wrap-text"]
}, {
  name: "elmsln-custom",
  icons: []
}, {
  name: "hardware",
  icons: ["cast-connected", "cast", "computer", "desktop-mac", "desktop-windows", "developer-board", "device-hub", "devices-other", "dock", "gamepad", "headset-mic", "headset", "keyboard-arrow-down", "keyboard-arrow-left", "keyboard-arrow-right", "keyboard-arrow-up", "keyboard-backspace", "keyboard-capslock", "keyboard-hide", "keyboard-return", "keyboard-tab", "keyboard-voice", "keyboard", "laptop-chromebook", "laptop-mac", "laptop-windows", "laptop", "memory", "mouse", "phone-android", "phone-iphone", "phonelink-off", "phonelink", "power-input", "router", "scanner", "security", "sim-card", "smartphone", "speaker-group", "speaker", "tablet-android", "tablet-mac", "tablet", "toys", "tv", "videogame-asset", "watch"]
}, {
  name: "icons",
  icons: ["3d-rotation", "accessibility", "accessible", "account-balance-wallet", "account-balance", "account-box", "account-circle", "add-alert", "add-box", "add-circle-outline", "add-circle", "add-shopping-cart", "add", "alarm-add", "alarm-off", "alarm-on", "alarm", "all-out", "android", "announcement", "apps", "archive", "arrow-back", "arrow-downward", "arrow-drop-down-circle", "arrow-drop-down", "arrow-drop-up", "arrow-forward", "arrow-upward", "aspect-ratio", "assessment", "assignment-ind", "assignment-late", "assignment-return", "assignment-returned", "assignment-turned-in", "assignment", "attachment", "autorenew", "backspace", "backup", "block", "book", "bookmark-border", "bookmark", "bug-report", "build", "cached", "camera-enhance", "cancel", "card-giftcard", "card-membership", "card-travel", "change-history", "check-box-outline-blank", "check-box", "check-circle", "check", "chevron-left", "chevron-right", "chrome-reader-mode", "class", "clear", "close", "cloud-circle", "cloud-done", "cloud-download", "cloud-off", "cloud-queue", "cloud-upload", "cloud", "code", "compare-arrows", "content-copy", "content-cut", "content-paste", "copyright", "create-new-folder", "create", "credit-card", "dashboard", "date-range", "delete-forever", "delete-sweep", "delete", "description", "dns", "done-all", "done", "donut-large", "donut-small", "drafts", "eject", "error-outline", "error", "euro-symbol", "event-seat", "event", "exit-to-app", "expand-less", "expand-more", "explore", "extension", "face", "favorite-border", "favorite", "feedback", "file-download", "file-upload", "filter-list", "find-in-page", "find-replace", "fingerprint", "first-page", "flag", "flight-land", "flight-takeoff", "flip-to-back", "flip-to-front", "folder-open", "folder-shared", "folder", "font-download", "forward", "fullscreen-exit", "fullscreen", "g-translate", "gavel", "gesture", "get-app", "gif", "grade", "group-work", "help-outline", "help", "highlight-off", "history", "home", "hourglass-empty", "hourglass-full", "http", "https", "important-devices", "inbox", "indeterminate-check-box", "info-outline", "info", "input", "invert-colors", "label-outline", "label", "language", "last-page", "launch", "lightbulb-outline", "line-style", "line-weight", "link", "list", "lock-open", "lock-outline", "lock", "low-priority", "loyalty", "mail", "markunread-mailbox", "markunread", "menu", "more-horiz", "more-vert", "motorcycle", "move-to-inbox", "next-week", "note-add", "offline-pin", "opacity", "open-in-browser", "open-in-new", "open-with", "pageview", "pan-tool", "payment", "perm-camera-mic", "perm-contact-calendar", "perm-data-setting", "perm-device-information", "perm-identity", "perm-media", "perm-phone-msg", "perm-scan-wifi", "pets", "picture-in-picture-alt", "picture-in-picture", "play-for-work", "polymer", "power-settings-new", "pregnant-woman", "print", "query-builder", "question-answer", "radio-button-checked", "radio-button-unchecked", "receipt", "record-voice-over", "redeem", "redo", "refresh", "remove-circle-outline", "remove-circle", "remove-shopping-cart", "remove", "reorder", "reply-all", "reply", "report-problem", "report", "restore-page", "restore", "room", "rounded-corner", "rowing", "save", "schedule", "search", "select-all", "send", "settings-applications", "settings-backup-restore", "settings-bluetooth", "settings-brightness", "settings-cell", "settings-ethernet", "settings-input-antenna", "settings-input-component", "settings-input-composite", "settings-input-hdmi", "settings-input-svideo", "settings-overscan", "settings-phone", "settings-power", "settings-remote", "settings-voice", "settings", "shop-two", "shop", "shopping-basket", "shopping-cart", "sort", "speaker-notes-off", "speaker-notes", "spellcheck", "star-border", "star-half", "star", "stars", "store", "subdirectory-arrow-left", "subdirectory-arrow-right", "subject", "supervisor-account", "swap-horiz", "swap-vert", "swap-vertical-circle", "system-update-alt", "tab-unselected", "tab", "text-format", "theaters", "thumb-down", "thumb-up", "thumbs-up-down", "timeline", "toc", "today", "toll", "touch-app", "track-changes", "translate", "trending-down", "trending-flat", "trending-up", "turned-in-not", "turned-in", "unarchive", "undo", "unfold-less", "unfold-more", "update", "verified-user", "view-agenda", "view-array", "view-carousel", "view-column", "view-day", "view-headline", "view-list", "view-module", "view-quilt", "view-stream", "view-week", "visibility-off", "visibility", "warning", "watch-later", "weekend", "work", "youtube-searched-for", "zoom-in", "zoom-out"]
}, {
  name: "image",
  icons: ["add-a-photo", "add-to-photos", "adjust", "assistant-photo", "assistant", "audiotrack", "blur-circular", "blur-linear", "blur-off", "blur-on", "brightness-1", "brightness-2", "brightness-3", "brightness-4", "brightness-5", "brightness-6", "brightness-7", "broken-image", "brush", "burst-mode", "camera-alt", "camera-front", "camera-rear", "camera-roll", "camera", "center-focus-strong", "center-focus-weak", "collections-bookmark", "collections", "color-lens", "colorize", "compare", "control-point-duplicate", "control-point", "crop-16-9", "crop-3-2", "crop-5-4", "crop-7-5", "crop-din", "crop-free", "crop-landscape", "crop-original", "crop-portrait", "crop-rotate", "crop-square", "crop", "dehaze", "details", "edit", "exposure-neg-1", "exposure-neg-2", "exposure-plus-1", "exposure-plus-2", "exposure-zero", "exposure", "filter-1", "filter-2", "filter-3", "filter-4", "filter-5", "filter-6", "filter-7", "filter-8", "filter-9-plus", "filter-9", "filter-b-and-w", "filter-center-focus", "filter-drama", "filter-frames", "filter-hdr", "filter-none", "filter-tilt-shift", "filter-vintage", "filter", "flare", "flash-auto", "flash-off", "flash-on", "flip", "gradient", "grain", "grid-off", "grid-on", "hdr-off", "hdr-on", "hdr-strong", "hdr-weak", "healing", "image-aspect-ratio", "image", "iso", "landscape", "leak-add", "leak-remove", "lens", "linked-camera", "looks-3", "looks-4", "looks-5", "looks-6", "looks-one", "looks-two", "looks", "loupe", "monochrome-photos", "movie-creation", "movie-filter", "music-note", "nature-people", "nature", "navigate-before", "navigate-next", "palette", "panorama-fish-eye", "panorama-horizontal", "panorama-vertical", "panorama-wide-angle", "panorama", "photo-album", "photo-camera", "photo-filter", "photo-library", "photo-size-select-actual", "photo-size-select-large", "photo-size-select-small", "photo", "picture-as-pdf", "portrait", "remove-red-eye", "rotate-90-degrees-ccw", "rotate-left", "rotate-right", "slideshow", "straighten", "style", "switch-camera", "switch-video", "tag-faces", "texture", "timelapse", "timer-10", "timer-3", "timer-off", "timer", "tonality", "transform", "tune", "view-comfy", "view-compact", "vignette", "wb-auto", "wb-cloudy", "wb-incandescent", "wb-iridescent", "wb-sunny"]
}, {
  name: "loading",
  icons: ["bars"]
}, {
  name: "maps",
  icons: ["add-location", "beenhere", "directions-bike", "directions-boat", "directions-bus", "directions-car", "directions-railway", "directions-run", "directions-subway", "directions-transit", "directions-walk", "directions", "edit-location", "ev-station", "flight", "hotel", "layers-clear", "layers", "local-activity", "local-airport", "local-atm", "local-bar", "local-cafe", "local-car-wash", "local-convenience-store", "local-dining", "local-drink", "local-florist", "local-gas-station", "local-grocery-store", "local-hospital", "local-hotel", "local-laundry-service", "local-library", "local-mall", "local-movies", "local-offer", "local-parking", "local-pharmacy", "local-phone", "local-pizza", "local-play", "local-post-office", "local-printshop", "local-see", "local-shipping", "local-taxi", "map", "my-location", "navigation", "near-me", "person-pin-circle", "person-pin", "pin-drop", "place", "rate-review", "restaurant-menu", "restaurant", "satellite", "store-mall-directory", "streetview", "subway", "terrain", "traffic", "train", "tram", "transfer-within-a-station", "zoom-out-map"]
}, {
  name: "notification",
  icons: ["adb", "airline-seat-flat-angled", "airline-seat-flat", "airline-seat-individual-suite", "airline-seat-legroom-extra", "airline-seat-legroom-normal", "airline-seat-legroom-reduced", "airline-seat-recline-extra", "airline-seat-recline-normal", "bluetooth-audio", "confirmation-number", "disc-full", "do-not-disturb-alt", "do-not-disturb-off", "do-not-disturb-on", "do-not-disturb", "drive-eta", "enhanced-encryption", "event-available", "event-busy", "event-note", "folder-special", "live-tv", "mms", "more", "network-check", "network-locked", "no-encryption", "ondemand-video", "personal-video", "phone-bluetooth-speaker", "phone-forwarded", "phone-in-talk", "phone-locked", "phone-missed", "phone-paused", "power", "priority-high", "rv-hookup", "sd-card", "sim-card-alert", "sms-failed", "sms", "sync-disabled", "sync-problem", "sync", "system-update", "tap-and-play", "time-to-leave", "vibration", "voice-chat", "vpn-lock", "wc", "wifi"]
}, {
  name: "places",
  icons: ["ac-unit", "airport-shuttle", "all-inclusive", "beach-access", "business-center", "casino", "child-care", "child-friendly", "fitness-center", "free-breakfast", "golf-course", "hot-tub", "kitchen", "pool", "room-service", "rv-hookup", "smoke-free", "smoking-rooms", "spa"]
}, {
  name: "social",
  icons: ["cake", "domain", "group-add", "group", "location-city", "mood-bad", "mood", "notifications-active", "notifications-none", "notifications-off", "notifications-paused", "notifications", "pages", "party-mode", "people-outline", "people", "person-add", "person-outline", "person", "plus-one", "poll", "public", "school", "sentiment-dissatisfied", "sentiment-neutral", "sentiment-satisfied", "sentiment-very-dissatisfied", "sentiment-very-satisfied", "share", "whatshot"]
}];
SimpleIconsetStore.registerManifest(SimpleIconIconsetsManifest);

const here = new URL(new URL('2b471b65.js', import.meta.url).href, import.meta.url).href + "/../";
["av", "communication", "device", "editor", "elmsln-custom", "hardware", "icons", "image", "maps", "notification", "places", "social", "loading"].forEach(i => {
  SimpleIconsetStore.registerIconset(i, `${here}svgs/${i}/`);
});
// flags too but they come from elsewhere
// ISO 3166-1-alpha-2 Flags
// via https://flagicons.lipis.dev/
SimpleIconsetStore.registerIconset("flags", `${here}../../../node_modules/flag-icons/flags/4x3/`);
// square flag less common but needed ratio
SimpleIconsetStore.registerIconset("flags1x1", `${here}../../../node_modules/flag-icons/flags/1x1/`);

["courseicons", "hax", "lrn", "mdextra", "mdi-social", "editable-table", "drawing", "paper-audio-icons"].forEach(i => {
  SimpleIconsetStore.registerIconset(i, `${new URL(new URL('503043c0.js', import.meta.url).href, import.meta.url).href}/../svgs/${i}/`);
});

/**
 * @note Gut all design settings in HAX core. this allows for design systems to hook in
 * by overriding the way the designSystemHAXProperties returns property definitions
 *
 * under standardAdvancedProps
 * review what should be removed but just about everything
 * also many of these generate events which can be removed as well!!!
 * this is core gutting, but we'll have to implement them in a uniform way
 * so that if hideDefaultSettings is there we should still respect that
 * Possibly changing it hideDesignLayoutSettings: [] which is an array
 * of keys to hide from this specific element. If the entire thing is there
 * then it'll remove all of them
 */
if (globalThis && globalThis.addEventListener) {
  globalThis.addEventListener("hax-store-ready", e => {
    if (globalThis.HaxStore) {
      const HAXStore = globalThis.HaxStore.requestAvailability();
      HAXStore.designSystemHAXProperties = (props, tag) => {
        // setup the props of the design system to populate based on matches below
        let spacingProps = [];
        let designTreatmentProps = [];
        let fontProps = [];
        let cardProps = [];
        let colorProps = [];
        // test if this element can be scaled
        // we generally don't want people doing it this way
        if (props.canScale) {
          spacingProps.push({
            attribute: "data-width",
            title: "Width",
            description: "Scaled relative to width of container",
            inputMethod: "slider",
            min: props.canScale.min ? props.canScale.min : 25,
            max: props.canScale.max ? props.canScale.max : 100,
            step: props.canScale.step ? props.canScale.step : 25
          });
        }
        // will catch prims and MIGHT catch tag
        let inline = HAXStore.isInlineElement(tag);
        // test for inline bc we are so early in bootstrap we might miss it
        if (props.gizmo && props.gizmo.meta && props.gizmo.meta.inlineOnly) {
          inline = true;
        }
        // everything that allows for advanced should be able to apply spacing
        // this stuff floats to the top of those options
        if (!props.hideDefaultSettings && !inline && props.designSystem !== false) {
          if (["media-image", "img"].includes(tag)) {
            spacingProps.push({
              attribute: "data-float-position",
              title: "Float Position",
              description: "Alignment relative to other items on large screens",
              inputMethod: "select",
              options: {
                "": "-- default --",
                left: "Left",
                center: "Center",
                right: "Right"
              }
            });
          } else {
            spacingProps.push({
              attribute: "data-text-align",
              title: "Text align",
              description: "Horizontal alignment of text",
              inputMethod: "select",
              options: {
                "": "-- default --",
                left: "Left",
                center: "Center",
                right: "Right",
                justify: "Justify"
              }
            });
          }
          spacingProps.push({
            attribute: "data-padding",
            title: "Padding",
            description: "Padding for added aesthetics",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("padding")]
          });
          spacingProps.push({
            attribute: "data-margin",
            title: "Margin",
            description: "Margin for added aesthetics",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("margin")]
          });
        }
        // design treatments are rather open ended but should be high up for things that have them
        if (props.designSystem === true || props.designSystem.designTreatment === true) {
          if (["p", "blockquote"].includes(tag)) {
            designTreatmentProps.push({
              attribute: "data-design-treatment",
              title: "Design treatment",
              description: "Minor aesthetic treatments for emphasis",
              inputMethod: "radio",
              itemsList: [...HAXOptionSampleFactory("design-treatment").filter(item => item && item.value.startsWith("dropCap") ? true : false)]
            });
          } else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
            // filter options to only NON-dropCap options
            designTreatmentProps.push({
              attribute: "data-design-treatment",
              title: "Design treatment",
              description: "Minor aesthetic treatments for emphasis",
              inputMethod: "radio",
              itemsList: [...HAXOptionSampleFactory("design-treatment").filter(item => item && !item.value.startsWith("dropCap") ? true : false)]
            });
          }
        }
        // block elements can get accents which effectively implies that they
        // can get the other 'card' like configuration pieces
        if (props.designSystem === true || props.designSystem.accent === true) {
          colorProps.push({
            attribute: "data-accent",
            title: "Accent color",
            description: "Offset items visually for aesthetic purposes",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("accent")]
          });
        }
        // things allowed to have primary
        /* if (
        [
          "p",
          "blockquote",
          "ol",
          "ul",
          "hr",
          "abbr",
          "mark",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
        ].includes(tag)
        ) {*/
        if (props.designSystem === true || props.designSystem.primary === true) {
          colorProps.push({
            attribute: "data-primary",
            title: "Primary color",
            description: "Primary color to apply color, often for meaning or aesthetic",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("primary")]
          });
        }
        // placing here ensures it loads below colors
        if (props.designSystem === true || props.designSystem.designTreatment === true) {
          if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) {
            // headings can pick up instructional meaning
            designTreatmentProps.push({
              attribute: "data-instructional-action",
              title: "Instructional Context",
              description: "Indicated to users visually",
              inputMethod: "radio",
              itemsList: [...HAXOptionSampleFactory("instructional-action")]
            });
          }
        }
        // textual controls
        if (props.designSystem === true || props.designSystem.text === true) {
          fontProps.push({
            attribute: "data-font-family",
            title: "Font family",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("font-family")]
          });
          fontProps.push({
            attribute: "data-font-weight",
            title: "Font weight",
            description: "Ensure it is only for aesthetic purposes",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("font-weight")]
          });
          fontProps.push({
            attribute: "data-font-size",
            title: "Font size",
            description: "Ensure sizing is only for aesthetic purposes",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("font-size")]
          });
        }
        // things that would give a card appearance
        if (props.designSystem === true || props.designSystem.card === true) {
          cardProps = [{
            attribute: "data-border-radius",
            title: "Border radius",
            description: "Border radius to apply",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("border-radius")]
          }, {
            attribute: "data-border",
            title: "Border",
            description: "Thickness of the border",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("border")]
          }, {
            attribute: "data-box-shadow",
            title: "Box shadow",
            description: "Subtly raises off the page",
            inputMethod: "select",
            inputMethod: "radio",
            itemsList: [...HAXOptionSampleFactory("box-shadow")]
          }];
        }
        // @todo make sure we push the text stuff on accurately. might need to build
        // this entire field as a composite object before pushing onto the stack
        props.settings.configure.push({
          inputMethod: "collapse",
          property: "ddd-styles",
          properties: [{
            title: "Design treatment",
            collapsed: true,
            accordion: true,
            property: "ddd-designtreatment",
            disabled: designTreatmentProps.length === 0,
            properties: designTreatmentProps
          }, {
            title: "Colors",
            collapsed: true,
            accordion: true,
            property: "ddd-card",
            disabled: colorProps.length === 0,
            properties: colorProps
          }, {
            title: "Font",
            collapsed: true,
            accordion: true,
            property: "ddd-font",
            disabled: fontProps.length === 0,
            properties: fontProps
          }, {
            title: "Spacing",
            collapsed: true,
            accordion: true,
            property: "ddd-spacing",
            disabled: spacingProps.length === 0,
            properties: spacingProps
          }, {
            title: "Box appearance",
            collapsed: true,
            accordion: true,
            property: "ddd-box",
            disabled: cardProps.length === 0,
            properties: cardProps
          }]
        });
        return props;
      };
    }
  }, {
    once: true
  });
}
/**
 * Instructional design meshing with styles. What we use to represent concepts
 */
const learningComponentNouns = {
  content: "Content",
  assessment: "Assessment",
  quiz: "Quiz",
  submission: "Submission",
  lesson: "Lesson",
  module: "Module",
  task: "Task",
  activity: "Activity",
  project: "Project",
  practice: "Practice",
  unit: "Unit",
  objectives: "Learning Objectives"
};
const learningComponentVerbs = {
  connection: "Connection",
  knowledge: "Did You Know?",
  strategy: "Learning Strategy",
  discuss: "Discuss",
  listen: "Listen",
  make: "Make",
  observe: "Observe",
  present: "Present",
  read: "Read",
  reflect: "Reflect",
  research: "Research",
  watch: "Watch",
  write: "Write"
};
const learningComponentTypes = {
  ...learningComponentVerbs,
  ...learningComponentNouns
};
const learningComponentColors = {
  content: "blue-grey",
  assessment: "red",
  quiz: "blue",
  submission: "deep-purple",
  lesson: "purple",
  module: "red",
  task: "blue-grey",
  activity: "orange",
  project: "deep-orange",
  practice: "brown",
  unit: "light-green",
  objectives: "indigo",
  connection: "green",
  knowledge: "cyan",
  strategy: "teal",
  discuss: "blue",
  listen: "purple",
  make: "orange",
  observe: "yellow",
  present: "light-blue",
  read: "lime",
  reflect: "amber",
  research: "deep-orange",
  watch: "pink",
  write: "deep-purple"
};
function iconFromPageType(type) {
  switch (type) {
    case "content":
      return "lrn:page";
    case "assessment":
      return "lrn:assessment";
    case "quiz":
      return "lrn:quiz";
    case "submission":
      return "icons:move-to-inbox";
    case "lesson":
      return "hax:lesson";
    case "module":
      return "hax:module";
    case "unit":
      return "hax:unit";
    case "task":
      return "hax:task";
    case "activity":
      return "hax:ticket";
    case "project":
      return "hax:bulletin-board";
    case "practice":
      return "hax:shovel";
    case "connection":
      return "courseicons:chem-connection";
    case "knowledge":
      return "courseicons:knowledge";
    case "strategy":
      return "courseicons:strategy";
    case "discuss":
      return "courseicons:strategy";
    case "listen":
      return "courseicons:listen";
    case "make":
      return "courseicons:strategy";
    case "observe":
      return "courseicons:strategy";
    case "present":
      return "courseicons:strategy";
    case "read":
      return "courseicons:strategy";
    case "reflect":
      return "courseicons:strategy";
    case "research":
      return "courseicons:strategy";
    case "watch":
      return "courseicons:strategy";
    case "write":
      return "lrn:write";
  }
  return "courseicons:learning-objectives";
}
const ApplicationAttributeData = {
  primary: {
    0: "Pugh blue",
    1: "Beaver blue",
    2: "Nittany navy",
    3: "Potential midnight",
    4: "Coaly gray",
    5: "Limestone gray",
    6: "Slate gray",
    7: "Creek teal",
    8: "Sky blue",
    9: "Shrine tan",
    10: "Roar golden",
    11: "Original 87 pink",
    12: "Discovery coral",
    13: "Wonder purple",
    14: "Artherton violet",
    15: "Invent orange",
    16: "Keystone yellow",
    17: "Opportunity green",
    18: "Future lime",
    19: "Forest green",
    20: "Landgrant brown",
    21: "Global Neon",
    22: "Error",
    23: "Warning",
    24: "Info",
    25: "Success"
  },
  accent: {
    0: "Sky Max",
    1: "Slate Max",
    2: "Limestone Max",
    3: "Shrine Max",
    4: "Roar Max",
    5: "Creek Max",
    6: "White",
    7: "Error Light",
    8: "Warning Light",
    9: "Info Light",
    10: "Success Light",
    11: "Alert Immediate",
    12: "Alert Urgent",
    13: "Alert All Clear",
    14: "Alert Non Emergency"
  },
  margin: {
    center: "Center",
    xs: "X-Small",
    s: "Small",
    m: "Medium",
    l: "Large",
    xl: "X-Large"
  },
  padding: {
    xs: "X-Small",
    s: "Small",
    m: "Medium",
    l: "Large",
    xl: "X-Large"
  },
  border: {
    xs: "X-Small",
    sm: "Small",
    md: "Medium",
    lg: "Large"
  },
  "border-radius": {
    xs: "Rounded",
    md: "Rounder",
    xl: "Roundest"
  },
  "box-shadow": {
    sm: "Drop shadow"
  },
  "design-treatment": {
    // heading treatments
    vert: "Vertical line",
    "horz-10p": "Horizontal line 10%",
    "horz-25p": "Horizontal line 25%",
    "horz-50p": "Horizontal line 50%",
    "horz-full": "Horizontal line 100%",
    "horz-md": "Horizontal line Medium",
    "horz-lg": "Horizontal line Large",
    bg: "Background color",
    // text treatment
    "dropCap-sm": "Drop Cap - Small",
    "dropCap-md": "Drop Cap - Medium",
    "dropCap-lg": "Drop Cap - Large"
  },
  "font-family": {
    primary: "Roboto",
    secondary: "Roboto Slab",
    navigation: "Roboto Condensed"
  },
  "font-weight": {
    light: "Light",
    medium: "Medium",
    bold: "Bold"
  },
  "font-size": {
    "3xs": "Smaller",
    s: "Large",
    m: "Larger",
    l: "Largest"
  },
  "instructional-action": learningComponentTypes
};

// ensure we get keys back in the right format
function HAXOptionSampleFactory(type) {
  return Object.keys(ApplicationAttributeData[type]).map(key => {
    return {
      value: key,
      html: ["primary", "accent"].includes(type) ? ke`<d-d-d-sample @click="${updatePreviewColorVar}" type="${type}" option="${key}"></d-d-d-sample>` : ke`<d-d-d-sample type="${type}" option="${key}"></d-d-d-sample>`
    };
  });
}
function updatePreviewColorVar(e) {
  let target = e.target;
  globalThis.document.body.style.setProperty(`--ddd-sample-theme-${target.type}`, `var(--ddd-${target.type}-${target.option})`);
}

// attributes need to be driven from a cannonical list
// @note this may need ways of overriding it in the future but at least
// we've consolidated everything into one place for these small design mods
const instructionalStyles = Object.keys(learningComponentColors).map(item => {
  let color = learningComponentColors[item];
  return i$1` [data-instructional-action="${r$1(item)}"] {
        --instructional-action-color: var(
          --simple-colors-default-theme-${r$1(color)}-8,
          ${r$1(color)}
        );
      }

      [data-instructional-action="${r$1(item)}"]::before {
        -webkit-mask-image: url("${r$1(SimpleIconsetStore.getIcon(iconFromPageType(item)))}");
      } `;
});

/* Logical Gaps:
  Heading colors; sizes; letter spacing; line height
  When to use chevron > with links?
  gradients need to be rotated (sometimes?)
  When to use // after headers?
*/
// fonts used
const DDDFonts = ["https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap", "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;700;900&display=swap", "https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;500;700;900&display=swap"];
// CSS variables which is most of the system needed
const DDDVariables = i$1` :root {
    color-scheme: light dark;
  }
  :root,
  html,
  body,
  :host {
    /* base colors */
    --ddd-theme-default-beaverBlue: #1e407c;
    --ddd-theme-default-beaver70: rgba(30, 64, 124, 0.7);
    --ddd-theme-default-beaver80: rgba(30, 64, 124, 0.8);
    --ddd-theme-default-landgrantBrown: #6a3028;
    --ddd-theme-default-nittanyNavy: #001e44;
    --ddd-theme-default-navy40: rgba(0, 30, 68, 0.4);
    --ddd-theme-default-navy60: rgba(0, 30, 68, 0.6);
    --ddd-theme-default-navy65: rgba(0, 30, 68, 0.65);
    --ddd-theme-default-navy70: rgba(0, 30, 68, 0.7);
    --ddd-theme-default-navy80: rgba(0, 30, 68, 0.8);
    --ddd-theme-default-potentialMidnight: #000321;
    --ddd-theme-default-potential0: rgba(0, 3, 33, 0);
    --ddd-theme-default-potential50: rgba(0, 3, 33, 0.5);
    --ddd-theme-default-potential70: rgba(0, 3, 33, 0.7);
    --ddd-theme-default-potential75: rgba(0, 3, 33, 0.75);
    --ddd-theme-default-pughBlue: #96bee6;
    --ddd-theme-default-coalyGray: #262626;
    --ddd-theme-default-keystoneYellow: #ffd100;
    --ddd-theme-default-slateGray: #314d64;
    --ddd-theme-default-slateLight: #ccdae6;
    --ddd-theme-default-slateMaxLight: #eef3f7;
    --ddd-theme-default-skyBlue: #009cde;
    --ddd-theme-default-skyLight: #ccf0ff;
    --ddd-theme-default-skyMaxLight: #e6f7ff;
    --ddd-theme-default-limestoneGray: #a2aaad;
    --ddd-theme-default-limestoneLight: #e4e5e7;
    --ddd-theme-default-limestoneMaxLight: #f2f2f4;
    --ddd-theme-default-white: #ffffff;
    --ddd-theme-default-shrineLight: #f7f2ee;
    --ddd-theme-default-shrineMaxLight: #fdfbf5;
    --ddd-theme-default-creekTeal: #3ea39e;
    --ddd-theme-default-creekLight: #cfeceb;
    --ddd-theme-default-creekMaxLight: #edf8f7;
    --ddd-theme-default-shrineTan: #b88965;
    --ddd-theme-default-roarGolden: #bf8226;
    --ddd-theme-default-roarLight: #f9eddc;
    --ddd-theme-default-roarMaxlight: #fffaf2;
    --ddd-theme-default-forestGreen: #4a7729;
    --ddd-theme-default-athertonViolet: #ac8dce;
    --ddd-theme-default-original87Pink: #bc204b;
    --ddd-theme-default-discoveryCoral: #f2665e;
    --ddd-theme-default-futureLime: #99cc00;
    --ddd-theme-default-wonderPurple: #491d70;
    --ddd-theme-default-inventOrange: #e98300;
    --ddd-theme-default-opportunityGreen: #008755;
    --ddd-theme-default-globalNeon: #ebff00;
    --ddd-theme-default-accent: #96bee6;
    --ddd-theme-default-white85: rgba(255, 255, 255, 0.85);
    --ddd-theme-default-white65: rgba(255, 255, 255, 0.65);

    /* 
  base colors, cannot be modified by user; SimpleColors hijacks this
  
  Theme level color, components pick up hues of theme color
  
  User can override these colors with their own theme colors
  */

    /* functional colors */
    --ddd-theme-default-link: #005fa9;
    --ddd-theme-default-link80: rgba(0, 95, 169, 0.8);
    --ddd-theme-default-linkLight: #cce9ff;
    --ddd-theme-default-disabled: #f4f4f4;
    --ddd-theme-default-error: #5f2120;
    --ddd-theme-default-errorLight: #fdeded;
    --ddd-theme-default-warning: #663c00;
    --ddd-theme-default-warningLight: #fff4e5;
    --ddd-theme-default-info: #014361;
    --ddd-theme-default-infoLight: #e5f6fd;
    --ddd-theme-default-success: #1e4620;
    --ddd-theme-default-successLight: #edf7ed;
    --ddd-theme-default-alertImmediate: #f8d3de;
    --ddd-theme-default-alertUrgent: #fff6cc;
    --ddd-theme-default-alertAllClear: #f2ffcc;
    --ddd-theme-default-alertNonEmergency: #e6f7ff;
    --ddd-theme-default-background: #eff2f5;
    --ddd-theme-default-disabled: #f4f4f4;

    /* DDDSpecific: Define primary colors in RGB for use in rgba() */
    --ddd-primary-0-rgb: 150, 190, 230, 0.7; /* Pugh Blue */
    --ddd-primary-1-rgb: 30, 64, 124; /* Beaver Blue */
    --ddd-primary-2-rgb: 0, 30, 68; /* Nittany Navy */
    --ddd-primary-3-rgb: 0, 3, 33; /* Potential Midnight */
    --ddd-primary-4-rgb: 38, 38, 38; /* Coaly Gray */
    --ddd-primary-5-rgb: 162, 170, 173; /* Limestone Gray */
    --ddd-primary-6-rgb: 49, 77, 100; /* Slate Gray */
    --ddd-primary-7-rgb: 62, 163, 158; /* Creek Teal */
    --ddd-primary-8-rgb: 0, 156, 222; /* Sky Blue */
    --ddd-primary-9-rgb: 184, 137, 101; /* Shrine Tan */
    --ddd-primary-10-rgb: 191, 130, 38; /* Roar Golden */
    --ddd-primary-11-rgb: 188, 32, 75, 0.7; /* Original 87 Pink */
    --ddd-primary-12-rgb: 242, 102, 94; /* Discovery Coral */
    --ddd-primary-13-rgb: 73, 29, 112; /* Wonder Purple */
    --ddd-primary-14-rgb: 172, 141, 206; /* Atherton Violet */
    --ddd-primary-15-rgb: 233, 131, 0; /* Invent Orange */
    --ddd-primary-16-rgb: 255, 209, 0; /* Keystone Yellow */
    --ddd-primary-17-rgb: 0, 135, 85; /* Opportunity Green */
    --ddd-primary-18-rgb: 153, 204, 0; /* Future Lime */
    --ddd-primary-19-rgb: 74, 119, 41; /* Forest Green */
    --ddd-primary-20-rgb: 106, 48, 40; /* Landgrant Brown */
    --ddd-primary-21-rgb: 235, 255, 0; /* Global Neon */
    --ddd-primary-22-rgb: 95, 33, 32; /* Error */
    --ddd-primary-23-rgb: 102, 60, 0; /* Warning */
    --ddd-primary-24-rgb: 1, 67, 97; /* Info */
    --ddd-primary-25-rgb: 30, 70, 32; /* Success */

    /* primary colors */
    --ddd-primary-0: var(
      --ddd-theme-default-pughBlue
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-1: var(
      --ddd-theme-default-beaverBlue
    ); /* not enough contrast to black */
    --ddd-primary-2: var(
      --ddd-theme-default-nittanyNavy
    ); /* not enough contrast to black */
    --ddd-primary-3: var(
      --ddd-theme-default-potentialMidnight
    ); /* not enough contrast to black */
    --ddd-primary-4: var(
      --ddd-theme-default-coalyGray
    ); /* not enough contrast to black */
    --ddd-primary-5: var(
      --ddd-theme-default-limestoneGray
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-6: var(
      --ddd-theme-default-slateGray
    ); /* not enough contrast to black */
    --ddd-primary-7: var(
      --ddd-theme-default-creekTeal
    ); /* not enough contrast to accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-8: var(
      --ddd-theme-default-skyBlue
    ); /* not enough contrast to accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-9: var(
      --ddd-theme-default-shrineTan
    ); /* not enough contrast to accent-5 3, 1*/
    --ddd-primary-10: var(
      --ddd-theme-default-roarGolden
    ); /* not enough contrast to accent-0, accent-1, accent-2 */
    --ddd-primary-11: var(--ddd-theme-default-original87Pink);
    --ddd-primary-12: var(
      --ddd-theme-default-discoveryCoral
    ); /* not enough contrast to accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-13: var(
      --ddd-theme-default-wonderPurple
    ); /* not enough contrast to black */
    --ddd-primary-14: var(
      --ddd-theme-default-athertonViolet
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-15: var(
      --ddd-theme-default-inventOrange
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-16: var(
      --ddd-theme-default-keystoneYellow
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-17: var(--ddd-theme-default-opportunityGreen);
    --ddd-primary-18: var(
      --ddd-theme-default-futureLime
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-19: var(--ddd-theme-default-forestGreen);
    --ddd-primary-20: var(
      --ddd-theme-default-landgrantBrown
    ); /* not enough contrast to black */
    --ddd-primary-21: var(
      --ddd-theme-default-globalNeon
    ); /* not enough contrast to white, accent-0, accent-1, accent-2, accent-3, accent-4, accent-5 */
    --ddd-primary-22: var(--ddd-theme-default-error);
    --ddd-primary-23: var(--ddd-theme-default-warning);
    --ddd-primary-24: var(--ddd-theme-default-info);
    --ddd-primary-25: var(--ddd-theme-default-success);

    /* accent colors */

    --ddd-accent-0: var(--ddd-theme-default-skyMaxLight);
    --ddd-accent-1: var(--ddd-theme-default-slateMaxLight);
    --ddd-accent-2: var(--ddd-theme-default-limestoneMaxLight);
    --ddd-accent-3: var(--ddd-theme-default-shrineMaxLight);
    --ddd-accent-4: var(--ddd-theme-default-roarMaxlight);
    --ddd-accent-5: var(--ddd-theme-default-creekMaxLight);
    --ddd-accent-6: var(--ddd-theme-default-white);
    --ddd-accent-7: var(--ddd-theme-default-errorLight);
    --ddd-accent-8: var(--ddd-theme-default-warningLight);
    --ddd-accent-9: var(--ddd-theme-default-infoLight);
    --ddd-accent-10: var(--ddd-theme-default-successLight);
    --ddd-accent-11: var(--ddd-theme-default-alertImmediate);
    --ddd-accent-12: var(--ddd-theme-default-alertUrgent);
    --ddd-accent-13: var(--ddd-theme-default-alertAllClear);
    --ddd-accent-14: var(--ddd-theme-default-alertNonEmergency);

    /*fonts*/
    --ddd-font-primary: "Roboto", "Franklin Gothic Medium", Tahoma, sans-serif;
    --ddd-font-secondary: "Roboto Slab", serif;
    --ddd-font-navigation: "Roboto Condensed", sans-serif; /* navigation font */

    /* font weights - generalized */
    --ddd-font-weight-light: 300;
    --ddd-font-weight-regular: 400; /* default weight for body */
    --ddd-font-weight-medium: 500;
    --ddd-font-weight-bold: 700; /* default weight for headers */
    --ddd-font-weight-black: 900;

    /* font sizes */
    --ddd-font-size-4xs: 16px;
    --ddd-font-size-3xs: 18px; /* body default */
    --ddd-font-size-xxs: 20px; /* h6 */
    --ddd-font-size-xs: 22px; /* h5 */
    --ddd-font-size-s: 24px; /* h4 */
    --ddd-font-size-ms: 28px; /* h3 */
    --ddd-font-size-m: 32px; /* h2 */
    --ddd-font-size-ml: 36px;
    --ddd-font-size-l: 40px; /* h1 */
    --ddd-font-size-xl: 48px;
    --ddd-font-size-xxl: 56px;
    --ddd-font-size-3xl: 64px;
    --ddd-font-size-4xl: 72px;

    --ddd-font-size-type1-s: 80px;
    --ddd-font-size-type1-m: 150px;
    --ddd-font-size-type1-l: 200px;

    /* global override font styles for light-dom content */
    --ddd-theme-h1-font-size: var(--ddd-font-size-l);
    --ddd-theme-h2-font-size: var(--ddd-font-size-m);
    --ddd-theme-h3-font-size: var(--ddd-font-size-ms);
    --ddd-theme-h4-font-size: var(--ddd-font-size-s);
    --ddd-theme-h5-font-size: var(--ddd-font-size-xs);
    --ddd-theme-h6-font-size: var(--ddd-font-size-xxs);
    --ddd-theme-body-font-size: var(--ddd-font-size-xxs);

    /* letter spacing */
    --ddd-ls-16-sm: 0.08px;
    --ddd-ls-18-sm: 0.09px;
    --ddd-ls-20-sm: 0.1px;
    --ddd-ls-22-sm: 0.11px;
    --ddd-ls-24-sm: 0.12px;
    --ddd-ls-28-sm: 0.14px;
    --ddd-ls-32-sm: 0.16px;
    --ddd-ls-36-sm: 0.18px;
    --ddd-ls-40-sm: 0.2px;
    --ddd-ls-48-sm: 0.24px;
    --ddd-ls-56-sm: 0.28px;
    --ddd-ls-64-sm: 0.32px;
    --ddd-ls-72-sm: 0.36px;
    --ddd-ls-16-lg: 0.24px;
    --ddd-ls-18-lg: 0.27px;
    --ddd-ls-20-lg: 0.3px;
    --ddd-ls-22-lg: 0.33px;
    --ddd-ls-24-lg: 0.36px;
    --ddd-ls-28-lg: 0.42px;
    --ddd-ls-32-lg: 0.48px;
    --ddd-ls-36-lg: 0.54px;
    --ddd-ls-40-lg: 0.6px;
    --ddd-ls-48-lg: 0.72px;
    --ddd-ls-56-lg: 0.84px;
    --ddd-ls-64-lg: 0.96px;
    --ddd-ls-72-lg: 1.08px;

    /* line height */
    --ddd-lh-120: 120%;
    --ddd-lh-140: 140%;
    --ddd-lh-150: 150%;

    /* spacing */
    --ddd-spacing-0: 0px;
    --ddd-spacing-1: 4px; /*  body default */
    --ddd-spacing-2: 8px;
    --ddd-spacing-3: 12px; /* h6 */
    --ddd-spacing-4: 16px; /* h5 */
    --ddd-spacing-5: 20px; /* h4 */
    --ddd-spacing-6: 24px; /* h3 */
    --ddd-spacing-7: 28px; /* h2 */
    --ddd-spacing-8: 32px; /* h1 */
    --ddd-spacing-9: 36px;
    --ddd-spacing-10: 40px;
    --ddd-spacing-11: 44px;
    --ddd-spacing-12: 48px;
    --ddd-spacing-13: 52px;
    --ddd-spacing-14: 56px;
    --ddd-spacing-15: 60px;
    --ddd-spacing-16: 64px;
    --ddd-spacing-17: 68px;
    --ddd-spacing-18: 72px;
    --ddd-spacing-19: 76px;
    --ddd-spacing-20: 80px;
    --ddd-spacing-21: 84px;
    --ddd-spacing-22: 88px;
    --ddd-spacing-23: 92px;
    --ddd-spacing-24: 96px;
    --ddd-spacing-25: 100px;
    --ddd-spacing-26: 104px;
    --ddd-spacing-27: 108px;
    --ddd-spacing-28: 112px;
    --ddd-spacing-29: 116px;
    --ddd-spacing-30: 120px;

    /* borders */
    --ddd-border-xs: 1px solid var(--ddd-theme-default-limestoneLight);
    --ddd-border-sm: 2px solid var(--ddd-theme-default-limestoneLight);
    --ddd-border-md: 3px solid var(--ddd-theme-default-limestoneLight);
    --ddd-border-lg: 4px solid var(--ddd-theme-default-limestoneLight);

    --ddd-border-size-xs: 1px;
    --ddd-border-size-sm: 2px;
    --ddd-border-size-md: 3px;
    --ddd-border-size-lg: 4px;

    --ddd-theme-header-border-thickness-0: 0px;
    --ddd-theme-header-border-thickness-xs: 1px;
    --ddd-theme-header-border-thickness-sm: 2px;
    --ddd-theme-header-border-thickness-md: 3px;
    --ddd-theme-header-border-thickness-lg: 4px;

    --ddd-theme-header-border-treatment-0: 0px;
    --ddd-theme-header-border-treatment-10p: 10%; /* good */
    --ddd-theme-header-border-treatment-25p: 25%; /* good */
    --ddd-theme-header-border-treatment-50p: 50%; /* good */
    --ddd-theme-header-border-treatment-75p: 75%;
    --ddd-theme-header-border-treatment-full: 100%; /* good */
    --ddd-theme-header-border-treatment-sm: 28px;
    --ddd-theme-header-border-treatment-md: 56px; /* good */
    --ddd-theme-header-border-treatment-lg: 84px; /* good */

    --ddd-theme-header-border-thickness: var(
      --ddd-theme-header-border-thickness-lg
    );
    --ddd-theme-header-border-color: var(--ddd-theme-primary);
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-lg
    );

    /* shadows */
    --ddd-boxShadow-0: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    --ddd-boxShadow-sm: rgba(0, 3, 33, 0.063) 0px 4px 8px 0px;
    --ddd-boxShadow-md: rgba(0, 3, 33, 0.063) 0px 8px 16px 0px;
    --ddd-boxShadow-lg: rgba(0, 3, 33, 0.063) 0px 12px 24px 0px;
    --ddd-boxShadow-xl: rgba(0, 3, 33, 0.063) 0px 16px 32px 0px;

    /* breakpoints */
    --ddd-breakpoint-sm: 360px;
    --ddd-breakpoint-md: 768px;
    --ddd-breakpoint-lg: 1080px;
    --ddd-breakpoint-xl: 1440px;

    /* Radius */
    --ddd-radius-0: 0px;
    --ddd-radius-xs: 4px;
    --ddd-radius-sm: 8px;
    --ddd-radius-md: 12px;
    --ddd-radius-lg: 16px;
    --ddd-radius-xl: 20px;
    --ddd-radius-rounded: 100px;
    --ddd-radius-circle: 100%;

    /* Gradients */
    --ddd-theme-default-gradient-navBar: linear-gradient(
      90deg,
      rgb(0, 30, 68) 0%,
      rgb(0, 30, 68) 31%,
      rgb(30, 64, 124) 76%,
      rgb(0, 3, 33) 100%
    );
    --ddd-theme-default-gradient-footer: linear-gradient(
      rgb(30, 64, 124) 0%,
      rgb(0, 30, 68) 65%,
      rgb(0, 30, 68) 100%
    );
    --ddd-theme-default-gradient-newsFeature: linear-gradient(
      360deg,
      rgb(30, 64, 124) 20%,
      rgb(0, 156, 222) 100%
    );
    --ddd-theme-default-gradient-buttons: linear-gradient(
      rgb(0, 156, 222) 0%,
      rgb(30, 64, 124) 85%
    );
    --ddd-theme-default-gradient-hero: linear-gradient(
      360deg,
      rgba(0, 30, 68, 0.8) 0%,
      rgba(0, 30, 68, 0.4) 50%,
      rgba(0, 3, 33, 0) 100%
    );
    --ddd-theme-default-gradient-hero2: linear-gradient(
      360deg,
      rgb(0, 30, 68) 0%,
      rgba(0, 30, 68, 0.4) 50%,
      rgba(0, 3, 33, 0) 100%
    );
    --ddd-theme-default-gradient-antihero: linear-gradient(
      180deg,
      rgba(0, 30, 68, 0.8) 0%,
      rgba(0, 30, 68, 0.4) 50%,
      rgba(0, 3, 33, 0) 100%
    );
    --ddd-theme-default-gradient-antihero2: linear-gradient(
      180deg,
      rgb(0, 30, 68) 0%,
      rgba(0, 30, 68, 0.4) 50%,
      rgba(0, 3, 33, 0) 100%
    );

    --ddd-icon-3xs: 20px;
    --ddd-icon-xxs: 24px;
    --ddd-icon-xs: 32px;
    --ddd-icon-sm: 40px;
    --ddd-icon-md: 48px;
    --ddd-icon-lg: 56px;
    --ddd-icon-xl: 64px;
    --ddd-icon-2xl: 72px;
    --ddd-icon-3xl: 84px;
    --ddd-icon-4xl: 96px;

    /* borrowed from base styling */

    scroll-behavior: smooth;
    font-family: var(--ddd-font-primary);
    font-size: var(--ddd-theme-body-font-size);
    font-weight: var(--ddd-font-weight-regular);
    letter-spacing: normal;
    --simple-modal-content-container-color: light-dark(
      var(--ddd-primary-4),
      var(--ddd-accent-6)
    );
    --simple-modal-content-container-background: light-dark(
      var(--ddd-accent-6),
      var(--ddd-primary-4)
    );
  }

  body.dark-mode {
    color-scheme: only dark;
  } `;
/* Data Attributes used by HAX */
const DDDDataAttributes = [i$1` /* basic width operation, not great but not terrible */
    @media (min-width: 600px) {
      [data-width="25"] {
        width: 25%;
      }
      [data-width="50"] {
        width: 50%;
      }
      [data-width="75"] {
        width: 75%;
      }
      [data-width="100"] {
        width: 100%;
      }
    }

    /* Float positioning for larger devices */
    @media (min-width: 1440px) {
      [data-float-position="left"] {
        float: left;
        margin: var(--ddd-spacing-8) var(--ddd-spacing-8) 0 var(--ddd-spacing-4);
      }
      [data-float-position="right"] {
        float: right;
        margin: var(--ddd-spacing-8) var(--ddd-spacing-4) 0 var(--ddd-spacing-8);
      }
      [data-hax-ray][data-float-position]:focus-within::after,
      [data-hax-ray][data-float-position]:hover::after {
        content: "Floating item";
        position: absolute;
        white-space: nowrap;
        font-style: normal;
        position: absolute;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
        color: var(
          --ddd-theme-font-color,
          var(--ddd-theme-default-white, #fff)
        );
        background-color: var(
          --ddd-theme-default-info,
          rgba(175, 184, 193, 0.2)
        );
        font-size: var(--ddd-theme-body-font-size);
        font-weight: var(--ddd-font-weight-regular);
        border-radius: var(--ddd-radius-xs);
        right: var(--ddd-spacing-4);
        left: unset;
        margin-top: -16px;
      }
      [data-hax-ray][data-float-position="left"]:focus-within::after,
      [data-hax-ray][data-float-position="left"]:hover::after {
        left: var(--ddd-spacing-4);
        right: unset;
      }
    }

    /* basic text operations, not DDD specific persay */
    [data-text-align="left"] {
      text-align: left;
    }
    [data-text-align="center"] {
      text-align: center;
    }
    [data-text-align="right"] {
      text-align: right;
    }
    [data-text-align="justify"] {
      text-align: justify;
    }

    /* primary color */
    [data-primary="0"] {
      --ddd-theme-primary: var(--ddd-primary-0);
      --lowContrast-override: black;
    }
    [data-primary="1"] {
      --ddd-theme-primary: var(--ddd-primary-1);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="2"] {
      --ddd-theme-primary: var(--ddd-primary-2);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="3"] {
      --ddd-theme-primary: var(--ddd-primary-3);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="4"] {
      --ddd-theme-primary: var(--ddd-primary-4);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="5"] {
      --ddd-theme-primary: var(--ddd-primary-5);
      --lowContrast-override: black;
    }
    [data-primary="6"] {
      --ddd-theme-primary: var(--ddd-primary-6);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="7"] {
      --ddd-theme-primary: var(--ddd-primary-7);
      --lowContrast-override: black;
    }
    [data-primary="8"] {
      --ddd-theme-primary: var(--ddd-primary-8);
      --lowContrast-override: black;
    }
    [data-primary="9"] {
      --ddd-theme-primary: var(--ddd-primary-9);
      --lowContrast-override: black;
    }
    [data-primary="10"] {
      --ddd-theme-primary: var(--ddd-primary-10);
      --lowContrast-override: black;
    }
    [data-primary="11"] {
      --ddd-theme-primary: var(--ddd-primary-11);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="12"] {
      --ddd-theme-primary: var(--ddd-primary-12);
      --lowContrast-override: black;
    }
    [data-primary="13"] {
      --ddd-theme-primary: var(--ddd-primary-13);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="14"] {
      --ddd-theme-primary: var(--ddd-primary-14);
      --lowContrast-override: black;
    }
    [data-primary="15"] {
      --ddd-theme-primary: var(--ddd-primary-15);
      --lowContrast-override: black;
    }
    [data-primary="16"] {
      --ddd-theme-primary: var(--ddd-primary-16);
      --lowContrast-override: black;
    }
    [data-primary="17"] {
      --ddd-theme-primary: var(--ddd-primary-17);
      --lowContrast-override: black;
    }
    [data-primary="18"] {
      --ddd-theme-primary: var(--ddd-primary-18);
      --lowContrast-override: black;
    }
    [data-primary="19"] {
      --ddd-theme-primary: var(--ddd-primary-19);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="20"] {
      --ddd-theme-primary: var(--ddd-primary-20);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="21"] {
      --ddd-theme-primary: var(--ddd-primary-21);
      --lowContrast-override: black;
    }
    [data-primary="22"] {
      --ddd-theme-primary: var(--ddd-primary-22);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="23"] {
      --ddd-theme-primary: var(--ddd-primary-23);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="24"] {
      --ddd-theme-primary: var(--ddd-primary-24);
      --ddd-theme-bgContrast: white;
    }
    [data-primary="25"] {
      --ddd-theme-primary: var(--ddd-primary-25);
      --ddd-theme-bgContrast: white;
    }

    /* accent color */
    [data-accent] {
      --ddd-theme-colorContrast: black;
    }
    [data-accent="0"] {
      --ddd-theme-accent: var(--ddd-accent-0);
    }
    [data-accent="1"] {
      --ddd-theme-accent: var(--ddd-accent-1);
    }
    [data-accent="2"] {
      --ddd-theme-accent: var(--ddd-accent-2);
    }
    [data-accent="3"] {
      --ddd-theme-accent: var(--ddd-accent-3);
    }
    [data-accent="4"] {
      --ddd-theme-accent: var(--ddd-accent-4);
    }
    [data-accent="5"] {
      --ddd-theme-accent: var(--ddd-accent-5);
    }
    [data-accent="6"] {
      --ddd-theme-accent: var(--ddd-accent-6);
    }
    [data-accent="7"] {
      --ddd-theme-accent: var(--ddd-accent-7);
    }
    [data-accent="8"] {
      --ddd-theme-accent: var(--ddd-accent-8);
    }
    [data-accent="9"] {
      --ddd-theme-accent: var(--ddd-accent-9);
    }
    [data-accent="10"] {
      --ddd-theme-accent: var(--ddd-accent-10);
    }
    [data-accent="11"] {
      --ddd-theme-accent: var(--ddd-accent-11);
    }
    [data-accent="12"] {
      --ddd-theme-accent: var(--ddd-accent-12);
    }
    [data-accent="13"] {
      --ddd-theme-accent: var(--ddd-accent-13);
    }
    [data-accent="14"] {
      --ddd-theme-accent: var(--ddd-accent-14);
    }

    [data-primary="19"][data-accent="11"],
    [data-primary="11"][data-accent="11"] {
      --lowContrast-override: black;
    }

    /* font family */

    [data-font-family="primary"] {
      font-family: var(--ddd-font-primary);
    }
    [data-font-family="secondary"] {
      font-family: var(--ddd-font-secondary);
    }
    [data-font-family="navigation"] {
      font-family: var(--ddd-font-navigation);
    }

    /* font weight */

    [data-font-weight="light"] {
      font-weight: var(--ddd-font-weight-light);
    }
    [data-font-weight="regular"] {
      font-weight: var(--ddd-font-weight-regular);
    }
    [data-font-weight="medium"] {
      font-weight: var(--ddd-font-weight-medium);
    }
    [data-font-weight="bold"] {
      font-weight: var(--ddd-font-weight-bold);
    }
    [data-font-weight="black"] {
      font-weight: var(--ddd-font-weight-black);
    }

    /* font size */
    /* normal line height if we are letting use mess w/ font size */
    [data-font-size] {
      line-height: normal;
    }
    [data-font-size="4xs"] {
      font-size: var(--ddd-font-size-4xs);
    }
    [data-font-size="3xs"] {
      font-size: var(--ddd-font-size-3xs);
    }
    [data-font-size="xxs"] {
      font-size: var(--ddd-font-size-xxs);
    }
    [data-font-size="xs"] {
      font-size: var(--ddd-font-size-xs);
    }
    [data-font-size="s"] {
      font-size: var(--ddd-font-size-s);
    }
    [data-font-size="ms"] {
      font-size: var(--ddd-font-size-ms);
    }
    [data-font-size="m"] {
      font-size: var(--ddd-font-size-m);
    }
    [data-font-size="ml"] {
      font-size: var(--ddd-font-size-ml);
    }
    [data-font-size="l"] {
      font-size: var(--ddd-font-size-l);
    }
    [data-font-size="xl"] {
      font-size: var(--ddd-font-size-xl);
    }
    [data-font-size="xxl"] {
      font-size: var(--ddd-font-size-xxl);
    }
    [data-font-size="3xl"] {
      font-size: var(--ddd-font-size-3xl);
    }
    [data-font-size="4xl"] {
      font-size: var(--ddd-font-size-4xl);
    }
    [data-font-size="type1-s"] {
      font-size: var(--ddd-font-size-type1-s);
    }
    [data-font-size="type1-m"] {
      font-size: var(--ddd-font-size-type1-m);
    }
    [data-font-size="type1-l"] {
      font-size: var(--ddd-font-size-type1-l);
    }
    /* padding spacing in content, only apply above small screens */
    @media (min-width: 600px) {
      [data-design-treatment="bg"][data-padding="xs"],
      [data-accent][data-padding="xs"],
      [data-padding="xs"] {
        padding: var(--ddd-spacing-2);
      }
      [data-design-treatment="bg"][data-padding="s"],
      [data-accent][data-padding="s"],
      [data-padding="s"] {
        padding: var(--ddd-spacing-4);
      }
      [data-design-treatment="bg"][data-padding="m"],
      [data-accent][data-padding="m"],
      [data-padding="m"] {
        padding: var(--ddd-spacing-8);
      }
      [data-design-treatment="bg"][data-padding="l"],
      [data-accent][data-padding="l"],
      [data-padding="l"] {
        padding: var(--ddd-spacing-12);
      }
      [data-design-treatment="bg"][data-padding="xl"],
      [data-accent][data-padding="xl"],
      [data-padding="xl"] {
        padding: var(--ddd-spacing-16);
      }
      /* margin spacing */
      [data-margin="center"] {
        margin-left: auto;
        margin-right: auto;
      }
      [data-margin="xs"] {
        margin: var(--ddd-spacing-2);
      }
      [data-margin="s"] {
        margin: var(--ddd-spacing-4);
      }
      [data-margin="m"] {
        margin: var(--ddd-spacing-8);
      }
      [data-margin="l"] {
        margin: var(--ddd-spacing-12);
      }
      [data-margin="xl"] {
        margin: var(--ddd-spacing-16);
      }
    }

    /* border width */
    p[data-border],
    blockquote[data-border],
    ol[data-border],
    ul[data-border],
    div[data-border] [data-border] {
      border-color: var(--ddd-theme-primary);
    }
    [data-border="xs"] {
      border: var(--ddd-border-xs);
      --ddd-theme-border-size: var(--ddd-border-size-xs);
    }
    [data-border="sm"] {
      border: var(--ddd-border-sm);
      --ddd-theme-border-size: var(--ddd-border-size-sm);
    }
    [data-border="md"] {
      border: var(--ddd-border-md);
      --ddd-theme-border-size: var(--ddd-border-size-md);
    }
    [data-border="lg"] {
      border: var(--ddd-border-lg);
      --ddd-theme-border-size: var(--ddd-border-size-lg);
    }

    /* border-radius */
    [data-border-radius="xs"] {
      border-radius: var(--ddd-radius-xs);
    }
    [data-border-radius="sm"] {
      border-radius: var(--ddd-radius-sm);
    }
    [data-border-radius="md"] {
      border-radius: var(--ddd-radius-md);
    }
    [data-border-radius="lg"] {
      border-radius: var(--ddd-radius-lg);
    }
    [data-border-radius="xl"] {
      border-radius: var(--ddd-radius-xl);
    }

    /* box-shadow */
    [data-box-shadow="sm"] {
      box-shadow: var(--ddd-boxShadow-sm);
    }
    [data-box-shadow="md"] {
      box-shadow: var(--ddd-boxShadow-md);
    }
    [data-box-shadow="lg"] {
      box-shadow: var(--ddd-boxShadow-lg);
    }
    [data-box-shadow="xl"] {
      box-shadow: var(--ddd-boxShadow-xl);
    } `, ...instructionalStyles];

/* Tag based application */
const DDDReset = i$1` h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--ddd-font-primary);
    font-weight: var(--ddd-font-weight-bold);
    line-height: auto;
    letter-spacing: auto;
  }

  h1 {
    margin: var(--ddd-spacing-12) 0 var(--ddd-spacing-8);
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: var(--ddd-spacing-8) 0 var(--ddd-spacing-4);
    padding: 0;
  }
  h1 + h2,
  h1 + h3,
  h1 + h4,
  h1 + h5,
  h1 + h6,
  h2 + h3,
  h2 + h4,
  h2 + h5,
  h2 + h6,
  h3 + h4,
  h3 + h5,
  h3 + h6,
  h4 + h5,
  h4 + h6,
  h5 + h6 {
    margin-top: 0;
  }
  h1 {
    font-size: var(--ddd-theme-h1-font-size);
  }
  h2 {
    font-size: var(--ddd-theme-h2-font-size);
  }
  h3 {
    font-size: var(--ddd-theme-h3-font-size);
  }
  h4 {
    font-size: var(--ddd-theme-h4-font-size);
  }
  h5 {
    font-size: var(--ddd-theme-h5-font-size);
  }
  h6 {
    font-size: var(--ddd-theme-h6-font-size);
  }
  h1 + p,
  h2 + p,
  h3 + p,
  h4 + p,
  h5 + p,
  h6 + p {
    margin-top: 0;
  }
  p {
    margin: var(--ddd-spacing-6) 0;
  }
  dl {
    padding: var(--ddd-spacing-6);
    margin: 0;
    border: var(--ddd-border-sm);
  }
  dt {
    font-weight: var(--ddd-font-weight-bold);
    font-size: var(--ddd-theme-h6-font-size);
  }
  dd {
    margin-bottom: var(--ddd-spacing-4);
    margin-inline-start: var(--ddd-spacing-8);
  }

  p[data-accent],
  blockquote[data-accent],
  ol[data-accent],
  ul[data-accent],
  div[data-accent] {
    color: light-dark(currentcolor, var(--ddd-theme-colorContrast));
    border: var(--ddd-border-sm);
    border-color: var(--ddd-theme-primary);
    border-width: var(--ddd-theme-border-size);
    background-color: var(--ddd-theme-accent);
  }
  p[data-accent]:not([data-padding]),
  blockquote[data-accent]:not([data-padding]),
  ol[data-accent]:not([data-padding]),
  ul[data-accent]:not([data-padding]),
  div[data-accent]:not([data-padding]),
  p[data-border]:not([data-padding]),
  blockquote[data-border]:not([data-padding]),
  ol[data-border]:not([data-padding]),
  ul[data-border]:not([data-padding]),
  div[data-border]:not([data-padding]) {
    padding: var(--ddd-spacing-6);
  }
  ol[data-accent],
  ul[data-accent] {
    padding-left: var(--ddd-spacing-9);
  }
  /* p uniformity but ignore if either is in a slot */
  p:not([slot]) + p:not([slot]) {
    margin-top: 0;
  }

  /* heading presets */
  h1.type1 {
    font-size: var(--ddd-font-size-type1-s);
    font-weight: var(--ddd-font-weight-black);
    display: flex;
    text-align: center;
    justify-content: center;
    width: 100%;
    color: var(--ddd-theme-default-white);
    flex-wrap: nowrap;
    overflow-wrap: normal;
    text-wrap: wrap;
  }
  @media (min-width: 768px) {
    h1.type1 {
      font-size: var(--ddd-font-size-type1-m);
    }
  }
  @media (min-width: 1080px) {
    h1.type1 {
      font-size: var(--ddd-font-size-type1-l);
    }
  }

  h2.type2 {
    font-size: var(--ddd-font-size-4xl);
    color: var(--ddd-theme-default-beaverBlue);
  }
  .h2 > hr {
    width: 84px;
    border-width: 4px;
    margin-top: var(--ddd-spacing-6);
  }
  h2.type3 {
    font-size: var(--ddd-font-size-xxl);
    color: var(--ddd-theme-default-nittanyNavy);
  }

  a,
  a:any-link,
  a:-webkit-any-link {
    line-break: auto;
    color: var(--ddd-theme-default-link);
    font-weight: var(--ddd-font-weight-bold);
    text-decoration: none;
    background-color: var(--ddd-theme-accent);
  }
  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  thead,
  tbody,
  tfoot,
  tr,
  td,
  th {
    font-size: var(--ddd-theme-body-font-size);
    font-family: var(--ddd-font-primary);
  }
  ul,
  ol {
    font-size: var(--ddd-theme-body-font-size);
    display: flex;
    flex-flow: column;
    gap: var(--ddd-spacing-3);
    font-family: var(--ddd-font-primary);
    margin: 0 0 var(--ddd-spacing-6) 0;
  }
  ul.link-list {
    list-style: none;
  }
  ul.link-list li::after {
    content: url('data:image/svg+xml; utf8, <svg style="width:32px;height:32px;" fill="%23005fa9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="%23005fa9" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
    height: calc(var(--ddd-theme-body-font-size) + 2px);
    width: calc(var(--ddd-theme-body-font-size) + 2px);
    display: inline-block;
    position: relative;
    bottom: calc(-1 * var(--ddd-spacing-1));
    left: 0px;
  }
  ul li,
  ol li {
    font-size: var(--ddd-theme-body-font-size);
  }
  ul li::marker,
  ol li::marker {
    unicode-bidi: isolate;
    font-variant-numeric: tabular-nums;
    text-transform: none;
    text-indent: 0px;
    text-align: start;
    text-align-last: start;
  }
  ul {
    list-style: square;
  }
  ul li::marker {
    color: var(
      --lowContrast-override,
      var(--ddd-theme-primary, var(--ddd-theme-default-skyBlue))
    );
  }
  blockquote {
    font-family: var(--ddd-font-primary);
    font-size: var(--ddd-theme-body-font-size);
    font-style: italic;
    border-left: var(--ddd-spacing-1) solid var(--ddd-theme-primary);
    padding-left: var(--ddd-spacing-6);
    padding-bottom: var(--ddd-spacing-2);
    margin: var(--ddd-spacing-9) 0 var(--ddd-spacing-9) var(--ddd-spacing-10);
    line-height: var(--ddd-lh-150);
  }
  hr {
    display: block;
    border: none;
    border-color: var(--ddd-theme-primary);
    border-top-width: var(--ddd-theme-header-border-thickness);
    border-top-style: solid;
    margin: 0 auto;
    padding: 0;
    transition:;
  }

  .h-invert {
    background-color: var(--ddd-theme-primary);
    color: var(--ddd-theme-bgContrast);
  }

  /** smooth transitions in hax when applying these design system attributes */
  [data-hax-ray][data-design-treatment],
  [data-hax-ray][data-accent],
  [data-hax-ray][data-primary],
  [data-hax-ray][data-padding],
  [data-hax-ray][data-margin],
  [data-hax-ray][data-width] {
    transition:
      padding 0.3s ease-in-out,
      margin 0.3s ease-in-out,
      border 0.3s ease-in-out,
      color 0.3s ease-in-out,
      width 0.3s ease-in-out,
      box-shadow 0.3s ease-in-out,
      border-radius 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
  }

  [data-design-treatment="vert"] {
    border-bottom: none;
    border-left: var(--ddd-theme-header-border-thickness) solid
      var(--ddd-theme-primary, var(--ddd-primary-0));
    padding-left: var(--ddd-spacing-3);
  }

  [data-design-treatment="horz-10p"] {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-10p
    );
  }
  [data-design-treatment="horz-25p"] {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-25p
    );
  }
  [data-design-treatment="horz-50p"] {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-50p
    );
  }
  [data-design-treatment="horz-full"] {
    --ddd-theme-header-border-treatment: calc(
      var(--ddd-theme-header-border-treatment-full) - 32px
    );
  }
  [data-instructional-action][data-design-treatment="horz-full"] {
    --ddd-theme-header-border-treatment: calc(
      var(--ddd-theme-header-border-treatment-full) - 32px - 40px
    );
  }
  [data-design-treatment="horz-md"] {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-md
    );
  }
  [data-design-treatment="horz-lg"] {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-lg
    );
  }

  [data-design-treatment^="horz"]::after {
    content: "";
    transition: width 0.3s ease-in-out;
    width: var(--ddd-theme-header-border-treatment);
    border-bottom: var(--ddd-theme-header-border-thickness) solid
      var(--ddd-theme-primary, var(--ddd-primary-0));
    height: 0;
    display: block;
    padding-top: var(--ddd-spacing-2);
  }

  [data-instructional-action][data-design-treatment^="horz"]::after {
    content: "";
    width: var(--ddd-theme-header-border-treatment);
    border-bottom: var(--ddd-theme-header-border-thickness) solid
      var(--ddd-theme-primary, var(--ddd-primary-0));
    height: 0;
    display: block;
    position: relative;
    bottom: 12px;
    left: 32px;
    margin-left: var(--ddd-spacing-3);
  }

  [data-design-treatment="bg"] {
    background-color: var(--ddd-theme-primary, var(--ddd-primary-0));
    color: var(--ddd-theme-bgContrast);
    padding: var(--ddd-spacing-3);
  }

  [data-instructional-action][data-design-treatment="bg"] {
    padding: var(--ddd-spacing-2);
  }

  [data-instructional-action][data-design-treatment="bg"]::before {
    background-color: var(--ddd-theme-bgContrast, black);
    margin-right: var(--ddd-spacing-3);
    margin-left: var(--ddd-spacing-1);
  }

  [data-instructional-action]::before {
    content: "";
    display: inline-flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0 0;
    margin: 8px 4px 0 0;
    z-index: 2;
    background-color: var(
      --lowContrast-override,
      var(--ddd-theme-primary, var(--instructional-action-color, blue))
    );
    mask-repeat: no-repeat;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    height: var(--ddd-icon-sm);
    width: var(--ddd-icon-sm);
  }

  [data-design-treatment] {
    transition:
      0.3s ease-in-out margin,
      0.3s ease-in-out background-color,
      0.3s ease-in-out padding,
      0.3s ease-in-out border;
  }

  [data-accent] [data-design-treatment^="dropCap"] {
    min-height: calc(
      (var(--initialLetter) * var(--ddd-theme-body-font-size) + 20px)
    );
  }

  [data-design-treatment^="dropCap"] {
    --initialLetter: 6;
    min-height: calc(
      (var(--initialLetter) * var(--ddd-theme-body-font-size) * 1.5) + 20px
    );
  }

  [data-design-treatment^="dropCap"]::first-letter {
    -webkit-initial-letter: var(--initialLetter);
    text-transform: uppercase;
    initial-letter: var(--initialLetter);
    color: var(--ddd-theme-primary);
    font-weight: var(--ddd-font-weight-bold);
    margin-right: var(--ddd-spacing-3);
    padding: 0 var(--ddd-spacing-1);
    text-shadow:
      -3px -3px 0 #000,
      3px -3px 0 #000,
      -3px 3px 0 #000,
      3px 3px 0 #000,
      -3px 0 0 #000,
      3px 0 0 #000,
      0 -3px 0 #000,
      0 3px 0 #000;
  }
  [data-design-treatment="dropCap-xs"] {
    --initialLetter: 2;
  }

  [data-design-treatment="dropCap-sm"] {
    --initialLetter: 4;
  }

  [data-design-treatment="dropCap-md"] {
    --initialLetter: 6;
  }

  [data-design-treatment="dropCap-lg"] {
    --initialLetter: 8;
  }

  [data-design-treatment="dropCap-xl"] {
    --initialLetter: 10;
  }

  [data-design-treatment="dropCap-xs"]::first-letter {
    margin-right: var(--ddd-spacing-1);
  }

  [data-design-treatment="dropCap-sm"]::first-letter {
    margin-right: var(--ddd-spacing-2);
  }

  [data-design-treatment="dropCap-md"]::first-letter {
    margin-right: var(--ddd-spacing-3);
  }

  [data-design-treatment="dropCap-lg"]::first-letter {
    margin-right: var(--ddd-spacing-4);
  }

  [data-design-treatment="dropCap-xl"]::first-letter {
    margin-right: var(--ddd-spacing-5);
  }

  /* dropCap outline for low contrasting colors 
  [data-design-treatment^="dropCap"][data-primary="0"]::first-letter,
  [data-design-treatment^="dropCap"][data-primary="5"]::first-letter,
  [data-design-treatment^="dropCap"][data-accent][data-primary="7"]::first-letter,
  [data-design-treatment^="dropCap"][data-accent][data-primary="8"]::first-letter,
  [data-design-treatment^="dropCap"][data-accent][data-primary="9"]::first-letter,
  [data-design-treatment^="dropCap"][data-accent][data-primary="10"]::first-letter,
  [data-design-treatment^="dropCap"][data-accent][data-primary="12"]::first-letter,
  [data-design-treatment^="dropCap"][data-primary="14"]::first-letter,
  [data-design-treatment^="dropCap"][data-primary="15"]::first-letter,
  [data-design-treatment^="dropCap"][data-primary="16"]::first-letter,
  [data-design-treatment^="dropCap"][data-primary="18"]::first-letter,
  [data-design-treatment^="dropCap"][data-primary="21"]::first-letter
  */

  /** These are for Firefox / browsers not supporting dropcap in order to fake support */

  .dropCap-noSupport [data-design-treatment^="dropCap"]::first-letter {
    font-size: 180px;
    float: left;
    padding: 8px 0px 0px 0px;
  }

  .dropCap-noSupport [data-design-treatment^="dropCap-xs"]::first-letter {
    font-size: 56px;
    float: left;
    padding: 4px 0px 0px 0px;
  }

  .dropCap-noSupport [data-design-treatment^="dropCap-sm"]::first-letter {
    font-size: 112px;
    float: left;
    padding: 4px 0px 0px 0px;
  }

  .dropCap-noSupport [data-design-treatment^="dropCap-md"]::first-letter {
    font-size: 168px;
    float: left;
    padding: 8px 0px 0px 0px;
  }

  .dropCap-noSupport [data-design-treatment^="dropCap-lg"]::first-letter {
    font-size: 230px;
    float: left;
    padding: 12px 0px 0px 0px;
  }

  .dropCap-noSupport [data-design-treatment^="dropCap-xl"]::first-letter {
    font-size: 300px;
    float: left;
    padding: 12px 0px 0px 0px;
  }

  h2 > hr {
    margin-top: var(--ddd-spacing-4);
  }

  .ddd-theme-header-border-thickness-0 {
    --ddd-theme-header-border-thickness: var(
      --ddd-theme-header-border-thickness-0
    );
  }
  .ddd-theme-header-border-thickness-xs {
    --ddd-theme-header-border-thickness: var(
      --ddd-theme-header-border-thickness-xs
    );
  }
  .ddd-theme-header-border-thickness-sm {
    --ddd-theme-header-border-thickness: var(
      --ddd-theme-header-border-thickness-sm
    );
  }
  .ddd-theme-header-border-thickness-md {
    --ddd-theme-header-border-thickness: var(
      --ddd-theme-header-border-thickness-md
    );
  }
  .ddd-theme-header-border-thickness-lg {
    --ddd-theme-header-border-thickness: var(
      --ddd-theme-header-border-thickness-lg
    );
  }

  .ddd-theme-header-border-treatment-0 {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-0
    );
  }
  .ddd-theme-header-border-treatment-sm {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-sm
    );
  }
  .ddd-theme-header-border-treatment-md {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-md
    );
  }
  .ddd-theme-header-border-treatment-lg {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-lg
    );
  }
  .ddd-theme-header-border-treatment-10p {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-10p
    );
  }
  .ddd-theme-header-border-treatment-25p {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-25p
    );
  }
  .ddd-theme-header-border-treatment-50p {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-50p
    );
  }
  .ddd-theme-header-border-treatment-75p {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-75p
    );
  }
  .ddd-theme-header-border-treatment-full {
    --ddd-theme-header-border-treatment: var(
      --ddd-theme-header-border-treatment-full
    );
  }
  summary {
    display: flex;
    font-size: var(--ddd-theme-h4-font-size);
    font-weight: var(--ddd-font-weight-bold);
    color: light-dark(
      var(
        --lowContrast-override,
        var(--ddd-theme-primary, var(--ddd-theme-default-nittanyNavy))
      ),
      var(--ddd-theme-default-linkLight)
    );
    cursor: pointer;
    text-wrap: wrap;
    align-items: center;
    padding: var(--ddd-spacing-5) var(--ddd-spacing-4);
    user-select: none;
    transition: all 0.3s ease-in-out;
  }
  summary::marker {
    content: "";
  }
  summary::after {
    content: "+";
    margin-left: auto;
    text-align: right;
    color: light-dark(
      var(
        --lowContrast-override,
        var(--ddd-theme-primary, var(--ddd-theme-default-nittanyNavy))
      ),
      var(--ddd-theme-default-linkLight)
    );
    font-weight: var(--ddd-font-weight-regular);
    font-size: var(--ddd-font-size-m);
    line-height: 1;
  }
  details {
    overflow: hidden;
    display: flex;
    position: relative;
    max-width: 650px;
    padding: 0;
    margin: 0;
  }
  details[disabled] {
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }
  details[open] > summary::after {
    content: "-";
  }
  details[open] > summary {
    color: light-dark(
      var(
        --lowContrast-override,
        var(--ddd-theme-primary, var(--ddd-theme-default-nittanyNavy))
      ),
      var(--ddd-theme-default-linkLight)
    );
    filter: saturate(1.5);
  }
  details[open] > summary {
    background-color: light-dark(
      var(--ddd-theme-default-limestoneMaxLight),
      var(--ddd-theme-default-potentialMidnight)
    );
  }
  details summary:focus,
  details summary:hover {
    background-color: light-dark(
      var(--ddd-theme-default-limestoneLight),
      var(--ddd-theme-default-nittanyNavy)
    );
  }

  code {
    transition: all 0.3s ease 0s;
    display: inline-block;
    padding: 2px var(--ddd-spacing-1); /* breaking DDD spacing sys on purpose for code */
    margin: 0 var(--ddd-spacing-1);
    font-size: calc(var(--ddd-theme-body-font-size) - var(--ddd-spacing-1));
    background-color: var(
      --ddd-theme-code-background-color,
      light-dark(var(--ddd-theme-default-limestoneLight), black)
    );
    color: var(
      --ddd-theme-code-color,
      light-dark(black, var(--ddd-theme-default-limestoneLight))
    );
    line-height: 1;
    border-radius: var(--ddd-radius-xs);
    border: var(--ddd-border-md);
    border-style: groove;
    border-color: light-dark(var(--ddd-theme-default-limestoneMaxLight), black);
    font-family: monospace;
    letter-spacing: var(--ddd-ls-16-lg);
    pointer-events: auto;
  }
  code.block-code {
    padding: var(--ddd-spacing-2);
    margin: var(--ddd-spacing-5) 0;
  }
  code::-moz-selection {
    /* Code for Firefox */
    background: var(--ddd-theme-default-keystoneYellow);
  }
  code::selection {
    background: var(--ddd-theme-default-keystoneYellow);
  }

  pre {
    display: inline-block;
    padding: var(--ddd-spacing-4);
    overflow: auto;
    background-color: var(
      --ddd-theme-default-limestoneMaxLight,
      rgba(175, 184, 193, 0.2)
    );
    border-radius: var(--ddd-radius-sm);
    margin: var(--ddd-spacing-1) 0;
    word-break: normal;
    word-wrap: normal;
    font-size: var(--ddd-theme-body-font-size);
  }
  mark {
    font-weight: var(--ddd-font-weight-medium);
    padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
    border-radius: var(--ddd-radius-xs);
    background-color: var(
      --ddd-theme-primary,
      var(--ddd-theme-default-keystoneYellow)
    );
    color: var(--ddd-theme-bgContrast, black);
  }
  abbr {
    background-color: var(
      --ddd-theme-primary,
      var(--ddd-theme-default-keystoneYellow)
    );
    transition: all 0.3s ease 0s;
    padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
    font-style: italic;
    text-decoration: underline;
    pointer-events: auto;
    cursor: pointer;
    outline-color: var(
      --ddd-theme-primary,
      var(--ddd-theme-default-keystoneYellow)
    );
    color: var(--ddd-theme-bgContrast, black);
    position: relative;
  }
  abbr:focus,
  abbr:active,
  abbr:hover {
    text-decoration: none;
    background-color: var(
      --ddd-theme-primary,
      var(--ddd-theme-default-keystoneYellow)
    );
    outline-offset: 2px;
    outline-style: dotted;
    outline-width: 2px;
  }
  abbr:focus::after,
  abbr:active::after,
  abbr:hover::after {
    content: attr(title);
    position: absolute;
    white-space: nowrap;
    font-style: normal;
    position: absolute;
    bottom: 100%;
    left: 0;
    width: fit-content;
    height: fit-content;
    padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
    color: var(--ddd-theme-font-color, var(--ddd-theme-default-white, #fff));
    background-color: var(--ddd-theme-default-info, rgba(175, 184, 193, 0.2));
    font-size: var(--ddd-theme-body-font-size);
    font-weight: var(--ddd-font-weight-regular);
    border-radius: var(--ddd-radius-xs);
  }
  div[slot="citation"] {
    font-size: var(--ddd-font-size-4xs);
  }
  *::selection {
    background-color: var(--ddd-theme-default-linkLight);
  }
  select {
    display: flex;
    box-sizing: border-box;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    color: var(--ddd-theme-default-coalyGray);
    width: fit-content;
    border: var(--ddd-border-xs);
    background-color: var(--ddd-theme-default-white);
    font-family: var(--ddd-font-primary);
    font-weight: var(--ddd-font-weight-regular);
    font-size: var(--ddd-theme-body-font-size);
    line-height: 150%;
    letter-spacing: normal;
    padding: var(--ddd-spacing-2);
    border-radius: var(--ddd-radius-xs);
    border-color: var(--ddd-theme-default-potential50);
  }
  hax-body,
  .haxcms-theme-element {
    line-height: var(--ddd-lh-150);
    font-size: var(--ddd-theme-body-font-size);
    font-family: var(--ddd-font-primary);
    letter-spacing: normal;
    text-align: justify;
  } `;
/* border & shadows */
const DDDBorders = i$1` .b-0 {
    border: none;
  }
  .b-xs {
    border: var(--ddd-border-xs);
  }
  .b-sm {
    border: var(--ddd-border-sm);
  }
  .b-md {
    border: var(--ddd-border-md);
  }
  .b-lg {
    border: var(--ddd-border-lg);
  }
  .bt-0 {
    border-top: none;
  }
  .bt-xs {
    border-top: var(--ddd-border-xs);
  }
  .bt-sm {
    border-top: var(--ddd-border-sm);
  }
  .bt-md {
    border-top: 3px solid var(--ddd-theme-default-limestoneLight);
  }
  .bt-lg {
    border-top: 4px solid var(--ddd-theme-default-limestoneLight);
  }
  .br-0 {
    border-right: none;
  }
  .br-xs {
    border-right: var(--ddd-border-xs);
  }
  .br-sm {
    border-right: var(--ddd-border-sm);
  }
  .br-md {
    border-right: 3px solid var(--ddd-theme-default-limestoneLight);
  }
  .br-lg {
    border-right: 4px solid var(--ddd-theme-default-limestoneLight);
  }
  .bb-0 {
    border-bottom: none;
  }
  .bb-xs {
    border-bottom: var(--ddd-border-xs);
  }
  .bb-sm {
    border-bottom: var(--ddd-border-sm);
  }
  .bb-md {
    border-bottom: 3px solid var(--ddd-theme-default-limestoneLight);
  }
  .bb-lg {
    border-bottom: 4px solid var(--ddd-theme-default-limestoneLight);
  }
  .bl-0 {
    border-left: none;
  }
  .bl-xs {
    border-left: var(--ddd-border-xs);
  }
  .bl-sm {
    border-left: var(--ddd-border-sm);
  }
  .bl-md {
    border-left: 3px solid var(--ddd-theme-default-limestoneLight);
  }
  .bl-lg {
    border-left: 4px solid var(--ddd-theme-default-limestoneLight);
  } `;
/* margin & padding */
const DDDMarginPadding = i$1` .m-auto {
    margin: auto;
  }
  .m-0 {
    margin: var(--ddd-spacing-0);
  }
  .m-1 {
    margin: var(--ddd-spacing-1);
  }
  .m-2 {
    margin: var(--ddd-spacing-2);
  }
  .m-3 {
    margin: var(--ddd-spacing-3);
  }
  .m-4 {
    margin: var(--ddd-spacing-4);
  }
  .m-5 {
    margin: var(--ddd-spacing-5);
  }
  .m-6 {
    margin: var(--ddd-spacing-6);
  }
  .m-7 {
    margin: var(--ddd-spacing-7);
  }
  .m-8 {
    margin: var(--ddd-spacing-8);
  }
  .m-9 {
    margin: var(--ddd-spacing-9);
  }
  .m-10 {
    margin: var(--ddd-spacing-10);
  }
  .m-11 {
    margin: var(--ddd-spacing-11);
  }
  .m-12 {
    margin: var(--ddd-spacing-12);
  }
  .m-13 {
    margin: var(--ddd-spacing-13);
  }
  .m-14 {
    margin: var(--ddd-spacing-14);
  }
  .m-15 {
    margin: var(--ddd-spacing-15);
  }
  .m-16 {
    margin: var(--ddd-spacing-16);
  }
  .m-17 {
    margin: var(--ddd-spacing-17);
  }
  .m-18 {
    margin: var(--ddd-spacing-18);
  }
  .m-19 {
    margin: var(--ddd-spacing-19);
  }
  .m-20 {
    margin: var(--ddd-spacing-20);
  }
  .m-21 {
    margin: var(--ddd-spacing-21);
  }
  .m-22 {
    margin: var(--ddd-spacing-22);
  }
  .m-23 {
    margin: var(--ddd-spacing-23);
  }
  .m-24 {
    margin: var(--ddd-spacing-24);
  }
  .m-25 {
    margin: var(--ddd-spacing-25);
  }
  .m-26 {
    margin: var(--ddd-spacing-26);
  }
  .m-27 {
    margin: var(--ddd-spacing-27);
  }
  .m-28 {
    margin: var(--ddd-spacing-28);
  }
  .m-29 {
    margin: var(--ddd-spacing-29);
  }
  .m-30 {
    margin: var(--ddd-spacing-30);
  }
  .mt-auto {
    margin-top: auto;
  }
  .mt-0 {
    margin-top: var(--ddd-spacing-0);
  }
  .mt-1 {
    margin-top: var(--ddd-spacing-1);
  }
  .mt-2 {
    margin-top: var(--ddd-spacing-2);
  }
  .mt-3 {
    margin-top: var(--ddd-spacing-3);
  }
  .mt-4 {
    margin-top: var(--ddd-spacing-4);
  }
  .mt-5 {
    margin-top: var(--ddd-spacing-5);
  }
  .mt-6 {
    margin-top: var(--ddd-spacing-6);
  }
  .mt-7 {
    margin-top: var(--ddd-spacing-7);
  }
  .mt-8 {
    margin-top: var(--ddd-spacing-8);
  }
  .mt-9 {
    margin-top: var(--ddd-spacing-9);
  }
  .mt-10 {
    margin-top: var(--ddd-spacing-10);
  }
  .mt-11 {
    margin-top: var(--ddd-spacing-11);
  }
  .mt-12 {
    margin-top: var(--ddd-spacing-12);
  }
  .mt-13 {
    margin-top: var(--ddd-spacing-13);
  }
  .mt-14 {
    margin-top: var(--ddd-spacing-14);
  }
  .mt-15 {
    margin-top: var(--ddd-spacing-15);
  }
  .mt-16 {
    margin-top: var(--ddd-spacing-16);
  }
  .mt-17 {
    margin-top: var(--ddd-spacing-17);
  }
  .mt-18 {
    margin-top: var(--ddd-spacing-18);
  }
  .mt-19 {
    margin-top: var(--ddd-spacing-19);
  }
  .mt-20 {
    margin-top: var(--ddd-spacing-20);
  }
  .mt-21 {
    margin-top: var(--ddd-spacing-21);
  }
  .mt-22 {
    margin-top: var(--ddd-spacing-22);
  }
  .mt-23 {
    margin-top: var(--ddd-spacing-23);
  }
  .mt-24 {
    margin-top: var(--ddd-spacing-24);
  }
  .mt-25 {
    margin-top: var(--ddd-spacing-25);
  }
  .mt-26 {
    margin-top: var(--ddd-spacing-26);
  }
  .mt-27 {
    margin-top: var(--ddd-spacing-27);
  }
  .mt-28 {
    margin-top: var(--ddd-spacing-28);
  }
  .mt-29 {
    margin-top: var(--ddd-spacing-29);
  }
  .mt-30 {
    margin-top: var(--ddd-spacing-30);
  }
  .mb-auto {
    margin-bottom: auto;
  }
  .mb-0 {
    margin-bottom: var(--ddd-spacing-0);
  }
  .mb-1 {
    margin-bottom: var(--ddd-spacing-1);
  }
  .mb-2 {
    margin-bottom: var(--ddd-spacing-2);
  }
  .mb-3 {
    margin-bottom: var(--ddd-spacing-3);
  }
  .mb-4 {
    margin-bottom: var(--ddd-spacing-4);
  }
  .mb-5 {
    margin-bottom: var(--ddd-spacing-5);
  }
  .mb-6 {
    margin-bottom: var(--ddd-spacing-6);
  }
  .mb-7 {
    margin-bottom: var(--ddd-spacing-7);
  }
  .mb-8 {
    margin-bottom: var(--ddd-spacing-8);
  }
  .mb-9 {
    margin-bottom: var(--ddd-spacing-9);
  }
  .mb-10 {
    margin-bottom: var(--ddd-spacing-10);
  }
  .mb-11 {
    margin-bottom: var(--ddd-spacing-11);
  }
  .mb-12 {
    margin-bottom: var(--ddd-spacing-12);
  }
  .mb-13 {
    margin-bottom: var(--ddd-spacing-13);
  }
  .mb-14 {
    margin-bottom: var(--ddd-spacing-14);
  }
  .mb-15 {
    margin-bottom: var(--ddd-spacing-15);
  }
  .mb-16 {
    margin-bottom: var(--ddd-spacing-16);
  }
  .mb-17 {
    margin-bottom: var(--ddd-spacing-17);
  }
  .mb-18 {
    margin-bottom: var(--ddd-spacing-18);
  }
  .mb-19 {
    margin-bottom: var(--ddd-spacing-19);
  }
  .mb-20 {
    margin-bottom: var(--ddd-spacing-20);
  }
  .mb-21 {
    margin-bottom: var(--ddd-spacing-21);
  }
  .mb-22 {
    margin-bottom: var(--ddd-spacing-22);
  }
  .mb-23 {
    margin-bottom: var(--ddd-spacing-23);
  }
  .mb-24 {
    margin-bottom: var(--ddd-spacing-24);
  }
  .mb-25 {
    margin-bottom: var(--ddd-spacing-25);
  }
  .mb-26 {
    margin-bottom: var(--ddd-spacing-26);
  }
  .mb-27 {
    margin-bottom: var(--ddd-spacing-27);
  }
  .mb-28 {
    margin-bottom: var(--ddd-spacing-28);
  }
  .mb-29 {
    margin-bottom: var(--ddd-spacing-29);
  }
  .mb-30 {
    margin-bottom: var(--ddd-spacing-30);
  }
  .ml-auto {
    margin-left: auto;
  }
  .ml-0 {
    margin-left: var(--ddd-spacing-0);
  }
  .ml-1 {
    margin-left: var(--ddd-spacing-1);
  }
  .ml-2 {
    margin-left: var(--ddd-spacing-2);
  }
  .ml-3 {
    margin-left: var(--ddd-spacing-3);
  }
  .ml-4 {
    margin-left: var(--ddd-spacing-4);
  }
  .ml-5 {
    margin-left: var(--ddd-spacing-5);
  }
  .ml-6 {
    margin-left: var(--ddd-spacing-6);
  }
  .ml-7 {
    margin-left: var(--ddd-spacing-7);
  }
  .ml-8 {
    margin-left: var(--ddd-spacing-8);
  }
  .ml-9 {
    margin-left: var(--ddd-spacing-9);
  }
  .ml-10 {
    margin-left: var(--ddd-spacing-10);
  }
  .ml-11 {
    margin-left: var(--ddd-spacing-11);
  }
  .ml-12 {
    margin-left: var(--ddd-spacing-12);
  }
  .ml-13 {
    margin-left: var(--ddd-spacing-13);
  }
  .ml-14 {
    margin-left: var(--ddd-spacing-14);
  }
  .ml-15 {
    margin-left: var(--ddd-spacing-15);
  }
  .ml-16 {
    margin-left: var(--ddd-spacing-16);
  }
  .ml-17 {
    margin-left: var(--ddd-spacing-17);
  }
  .ml-18 {
    margin-left: var(--ddd-spacing-18);
  }
  .ml-19 {
    margin-left: var(--ddd-spacing-19);
  }
  .ml-20 {
    margin-left: var(--ddd-spacing-20);
  }
  .ml-21 {
    margin-left: var(--ddd-spacing-21);
  }
  .ml-22 {
    margin-left: var(--ddd-spacing-22);
  }
  .ml-23 {
    margin-left: var(--ddd-spacing-23);
  }
  .ml-24 {
    margin-left: var(--ddd-spacing-24);
  }
  .ml-25 {
    margin-left: var(--ddd-spacing-25);
  }
  .ml-26 {
    margin-left: var(--ddd-spacing-26);
  }
  .ml-27 {
    margin-left: var(--ddd-spacing-27);
  }
  .ml-28 {
    margin-left: var(--ddd-spacing-28);
  }
  .ml-29 {
    margin-left: var(--ddd-spacing-29);
  }
  .ml-30 {
    margin-left: var(--ddd-spacing-30);
  }
  .mr-auto {
    margin-right: auto;
  }
  .mr-0 {
    margin-right: var(--ddd-spacing-0);
  }
  .mr-1 {
    margin-right: var(--ddd-spacing-1);
  }
  .mr-2 {
    margin-right: var(--ddd-spacing-2);
  }
  .mr-3 {
    margin-right: var(--ddd-spacing-3);
  }
  .mr-4 {
    margin-right: var(--ddd-spacing-4);
  }
  .mr-5 {
    margin-right: var(--ddd-spacing-5);
  }
  .mr-6 {
    margin-right: var(--ddd-spacing-6);
  }
  .mr-7 {
    margin-right: var(--ddd-spacing-7);
  }
  .mr-8 {
    margin-right: var(--ddd-spacing-8);
  }
  .mr-9 {
    margin-right: var(--ddd-spacing-9);
  }
  .mr-10 {
    margin-right: var(--ddd-spacing-10);
  }
  .mr-11 {
    margin-right: var(--ddd-spacing-11);
  }
  .mr-12 {
    margin-right: var(--ddd-spacing-12);
  }
  .mr-13 {
    margin-right: var(--ddd-spacing-13);
  }
  .mr-14 {
    margin-right: var(--ddd-spacing-14);
  }
  .mr-15 {
    margin-right: var(--ddd-spacing-15);
  }
  .mr-16 {
    margin-right: var(--ddd-spacing-16);
  }
  .mr-17 {
    margin-right: var(--ddd-spacing-17);
  }
  .mr-18 {
    margin-right: var(--ddd-spacing-18);
  }
  .mr-19 {
    margin-right: var(--ddd-spacing-19);
  }
  .mr-20 {
    margin-right: var(--ddd-spacing-20);
  }
  .mr-21 {
    margin-right: var(--ddd-spacing-21);
  }
  .mr-22 {
    margin-right: var(--ddd-spacing-22);
  }
  .mr-23 {
    margin-right: var(--ddd-spacing-23);
  }
  .mr-24 {
    margin-right: var(--ddd-spacing-24);
  }
  .mr-25 {
    margin-right: var(--ddd-spacing-25);
  }
  .mr-26 {
    margin-right: var(--ddd-spacing-26);
  }
  .mr-27 {
    margin-right: var(--ddd-spacing-27);
  }
  .mr-28 {
    margin-right: var(--ddd-spacing-28);
  }
  .mr-29 {
    margin-right: var(--ddd-spacing-29);
  }
  .mr-30 {
    margin-right: var(--ddd-spacing-30);
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .mx-0 {
    margin-left: var(--ddd-spacing-0);
    margin-right: var(--ddd-spacing-0);
  }
  .mx-1 {
    margin-left: var(--ddd-spacing-1);
    margin-right: var(--ddd-spacing-1);
  }
  .mx-2 {
    margin-left: var(--ddd-spacing-2);
    margin-right: var(--ddd-spacing-2);
  }
  .mx-3 {
    margin-left: var(--ddd-spacing-3);
    margin-right: var(--ddd-spacing-3);
  }
  .mx-4 {
    margin-left: var(--ddd-spacing-4);
    margin-right: var(--ddd-spacing-4);
  }
  .mx-5 {
    margin-left: var(--ddd-spacing-5);
    margin-right: var(--ddd-spacing-5);
  }
  .mx-6 {
    margin-left: var(--ddd-spacing-6);
    margin-right: var(--ddd-spacing-6);
  }
  .mx-7 {
    margin-left: var(--ddd-spacing-7);
    margin-right: var(--ddd-spacing-7);
  }
  .mx-8 {
    margin-left: var(--ddd-spacing-8);
    margin-right: var(--ddd-spacing-8);
  }
  .mx-9 {
    margin-left: var(--ddd-spacing-9);
    margin-right: var(--ddd-spacing-9);
  }
  .mx-10 {
    margin-left: var(--ddd-spacing-10);
    margin-right: var(--ddd-spacing-10);
  }
  .mx-11 {
    margin-left: var(--ddd-spacing-11);
    margin-right: var(--ddd-spacing-11);
  }
  .mx-12 {
    margin-left: var(--ddd-spacing-12);
    margin-right: var(--ddd-spacing-12);
  }
  .mx-13 {
    margin-left: var(--ddd-spacing-13);
    margin-right: var(--ddd-spacing-13);
  }
  .mx-14 {
    margin-left: var(--ddd-spacing-14);
    margin-right: var(--ddd-spacing-14);
  }
  .mx-15 {
    margin-left: var(--ddd-spacing-15);
    margin-right: var(--ddd-spacing-15);
  }
  .mx-16 {
    margin-left: var(--ddd-spacing-16);
    margin-right: var(--ddd-spacing-16);
  }
  .mx-17 {
    margin-left: var(--ddd-spacing-17);
    margin-right: var(--ddd-spacing-17);
  }
  .mx-18 {
    margin-left: var(--ddd-spacing-18);
    margin-right: var(--ddd-spacing-18);
  }
  .mx-19 {
    margin-left: var(--ddd-spacing-19);
    margin-right: var(--ddd-spacing-19);
  }
  .mx-20 {
    margin-left: var(--ddd-spacing-20);
    margin-right: var(--ddd-spacing-20);
  }
  .mx-21 {
    margin-left: var(--ddd-spacing-21);
    margin-right: var(--ddd-spacing-21);
  }
  .mx-22 {
    margin-left: var(--ddd-spacing-22);
    margin-right: var(--ddd-spacing-22);
  }
  .mx-23 {
    margin-left: var(--ddd-spacing-23);
    margin-right: var(--ddd-spacing-23);
  }
  .mx-24 {
    margin-left: var(--ddd-spacing-24);
    margin-right: var(--ddd-spacing-24);
  }
  .mx-25 {
    margin-left: var(--ddd-spacing-25);
    margin-right: var(--ddd-spacing-25);
  }
  .mx-26 {
    margin-left: var(--ddd-spacing-26);
    margin-right: var(--ddd-spacing-26);
  }
  .mx-27 {
    margin-left: var(--ddd-spacing-27);
    margin-right: var(--ddd-spacing-27);
  }
  .mx-28 {
    margin-left: var(--ddd-spacing-28);
    margin-right: var(--ddd-spacing-28);
  }
  .mx-29 {
    margin-left: var(--ddd-spacing-29);
    margin-right: var(--ddd-spacing-29);
  }
  .mx-30 {
    margin-left: var(--ddd-spacing-30);
    margin-right: var(--ddd-spacing-30);
  }
  .my-auto {
    margin-top: auto;
    margin-bottom: auto;
  }
  .my-0 {
    margin-top: var(--ddd-spacing-0);
    margin-bottom: var(--ddd-spacing-0);
  }
  .my-1 {
    margin-top: var(--ddd-spacing-1);
    margin-bottom: var(--ddd-spacing-1);
  }
  .my-2 {
    margin-top: var(--ddd-spacing-2);
    margin-bottom: var(--ddd-spacing-2);
  }
  .my-3 {
    margin-top: var(--ddd-spacing-3);
    margin-bottom: var(--ddd-spacing-3);
  }
  .my-4 {
    margin-top: var(--ddd-spacing-4);
    margin-bottom: var(--ddd-spacing-4);
  }
  .my-5 {
    margin-top: var(--ddd-spacing-5);
    margin-bottom: var(--ddd-spacing-5);
  }
  .my-6 {
    margin-top: var(--ddd-spacing-6);
    margin-bottom: var(--ddd-spacing-6);
  }
  .my-7 {
    margin-top: var(--ddd-spacing-7);
    margin-bottom: var(--ddd-spacing-7);
  }
  .my-8 {
    margin-top: var(--ddd-spacing-8);
    margin-bottom: var(--ddd-spacing-8);
  }
  .my-9 {
    margin-top: var(--ddd-spacing-9);
    margin-bottom: var(--ddd-spacing-9);
  }
  .my-10 {
    margin-top: var(--ddd-spacing-10);
    margin-bottom: var(--ddd-spacing-10);
  }
  .my-11 {
    margin-top: var(--ddd-spacing-11);
    margin-bottom: var(--ddd-spacing-11);
  }
  .my-12 {
    margin-top: var(--ddd-spacing-12);
    margin-bottom: var(--ddd-spacing-12);
  }
  .my-13 {
    margin-top: var(--ddd-spacing-13);
    margin-bottom: var(--ddd-spacing-13);
  }
  .my-14 {
    margin-top: var(--ddd-spacing-14);
    margin-bottom: var(--ddd-spacing-14);
  }
  .my-15 {
    margin-top: var(--ddd-spacing-15);
    margin-bottom: var(--ddd-spacing-15);
  }
  .my-16 {
    margin-top: var(--ddd-spacing-16);
    margin-bottom: var(--ddd-spacing-16);
  }
  .my-17 {
    margin-top: var(--ddd-spacing-17);
    margin-bottom: var(--ddd-spacing-17);
  }
  .my-18 {
    margin-top: var(--ddd-spacing-18);
    margin-bottom: var(--ddd-spacing-18);
  }
  .my-19 {
    margin-top: var(--ddd-spacing-19);
    margin-bottom: var(--ddd-spacing-19);
  }
  .my-20 {
    margin-top: var(--ddd-spacing-20);
    margin-bottom: var(--ddd-spacing-20);
  }
  .my-21 {
    margin-top: var(--ddd-spacing-21);
    margin-bottom: var(--ddd-spacing-21);
  }
  .my-22 {
    margin-top: var(--ddd-spacing-22);
    margin-bottom: var(--ddd-spacing-22);
  }
  .my-23 {
    margin-top: var(--ddd-spacing-23);
    margin-bottom: var(--ddd-spacing-23);
  }
  .my-24 {
    margin-top: var(--ddd-spacing-24);
    margin-bottom: var(--ddd-spacing-24);
  }
  .my-25 {
    margin-top: var(--ddd-spacing-25);
    margin-bottom: var(--ddd-spacing-25);
  }
  .my-26 {
    margin-top: var(--ddd-spacing-26);
    margin-bottom: var(--ddd-spacing-26);
  }
  .my-27 {
    margin-top: var(--ddd-spacing-27);
    margin-bottom: var(--ddd-spacing-27);
  }
  .my-28 {
    margin-top: var(--ddd-spacing-28);
    margin-bottom: var(--ddd-spacing-28);
  }
  .my-29 {
    margin-top: var(--ddd-spacing-29);
    margin-bottom: var(--ddd-spacing-29);
  }
  .my-30 {
    margin-top: var(--ddd-spacing-30);
    margin-bottom: var(--ddd-spacing-30);
  }
  .p-auto {
    padding: auto;
  }
  .p-0 {
    padding: var(--ddd-spacing-0);
  }
  .p-1 {
    padding: var(--ddd-spacing-1);
  }
  .p-2 {
    padding: var(--ddd-spacing-2);
  }
  .p-3 {
    padding: var(--ddd-spacing-3);
  }
  .p-4 {
    padding: var(--ddd-spacing-4);
  }
  .p-5 {
    padding: var(--ddd-spacing-5);
  }
  .p-6 {
    padding: var(--ddd-spacing-6);
  }
  .p-7 {
    padding: var(--ddd-spacing-7);
  }
  .p-8 {
    padding: var(--ddd-spacing-8);
  }
  .p-9 {
    padding: var(--ddd-spacing-9);
  }
  .p-10 {
    padding: var(--ddd-spacing-10);
  }
  .p-11 {
    padding: var(--ddd-spacing-11);
  }
  .p-12 {
    padding: var(--ddd-spacing-12);
  }
  .p-13 {
    padding: var(--ddd-spacing-13);
  }
  .p-14 {
    padding: var(--ddd-spacing-14);
  }
  .p-15 {
    padding: var(--ddd-spacing-15);
  }
  .p-16 {
    padding: var(--ddd-spacing-16);
  }
  .p-17 {
    padding: var(--ddd-spacing-17);
  }
  .p-18 {
    padding: var(--ddd-spacing-18);
  }
  .p-19 {
    padding: var(--ddd-spacing-19);
  }
  .p-20 {
    padding: var(--ddd-spacing-20);
  }
  .p-21 {
    padding: var(--ddd-spacing-21);
  }
  .p-22 {
    padding: var(--ddd-spacing-22);
  }
  .p-23 {
    padding: var(--ddd-spacing-23);
  }
  .p-24 {
    padding: var(--ddd-spacing-24);
  }
  .p-25 {
    padding: var(--ddd-spacing-25);
  }
  .p-26 {
    padding: var(--ddd-spacing-26);
  }
  .p-27 {
    padding: var(--ddd-spacing-27);
  }
  .p-28 {
    padding: var(--ddd-spacing-28);
  }
  .p-29 {
    padding: var(--ddd-spacing-29);
  }
  .p-30 {
    padding: var(--ddd-spacing-30);
  }
  .pt-auto {
    padding-top: auto;
  }
  .pt-0 {
    padding-top: var(--ddd-spacing-0);
  }
  .pt-1 {
    padding-top: var(--ddd-spacing-1);
  }
  .pt-2 {
    padding-top: var(--ddd-spacing-2);
  }
  .pt-3 {
    padding-top: var(--ddd-spacing-3);
  }
  .pt-4 {
    padding-top: var(--ddd-spacing-4);
  }
  .pt-5 {
    padding-top: var(--ddd-spacing-5);
  }
  .pt-6 {
    padding-top: var(--ddd-spacing-6);
  }
  .pt-7 {
    padding-top: var(--ddd-spacing-7);
  }
  .pt-8 {
    padding-top: var(--ddd-spacing-8);
  }
  .pt-9 {
    padding-top: var(--ddd-spacing-9);
  }
  .pt-10 {
    padding-top: var(--ddd-spacing-10);
  }
  .pt-11 {
    padding-top: var(--ddd-spacing-11);
  }
  .pt-12 {
    padding-top: var(--ddd-spacing-12);
  }
  .pt-13 {
    padding-top: var(--ddd-spacing-13);
  }
  .pt-14 {
    padding-top: var(--ddd-spacing-14);
  }
  .pt-15 {
    padding-top: var(--ddd-spacing-15);
  }
  .pt-16 {
    padding-top: var(--ddd-spacing-16);
  }
  .pt-17 {
    padding-top: var(--ddd-spacing-17);
  }
  .pt-18 {
    padding-top: var(--ddd-spacing-18);
  }
  .pt-19 {
    padding-top: var(--ddd-spacing-19);
  }
  .pt-20 {
    padding-top: var(--ddd-spacing-20);
  }
  .pt-21 {
    padding-top: var(--ddd-spacing-21);
  }
  .pt-22 {
    padding-top: var(--ddd-spacing-22);
  }
  .pt-23 {
    padding-top: var(--ddd-spacing-23);
  }
  .pt-24 {
    padding-top: var(--ddd-spacing-24);
  }
  .pt-25 {
    padding-top: var(--ddd-spacing-25);
  }
  .pt-26 {
    padding-top: var(--ddd-spacing-26);
  }
  .pt-27 {
    padding-top: var(--ddd-spacing-27);
  }
  .pt-28 {
    padding-top: var(--ddd-spacing-28);
  }
  .pt-29 {
    padding-top: var(--ddd-spacing-29);
  }
  .pt-30 {
    padding-top: var(--ddd-spacing-30);
  }
  .pb-auto {
    padding-bottom: auto;
  }
  .pb-0 {
    padding-bottom: var(--ddd-spacing-0);
  }
  .pb-1 {
    padding-bottom: var(--ddd-spacing-1);
  }
  .pb-2 {
    padding-bottom: var(--ddd-spacing-2);
  }
  .pb-3 {
    padding-bottom: var(--ddd-spacing-3);
  }
  .pb-4 {
    padding-bottom: var(--ddd-spacing-4);
  }
  .pb-5 {
    padding-bottom: var(--ddd-spacing-5);
  }
  .pb-6 {
    padding-bottom: var(--ddd-spacing-6);
  }
  .pb-7 {
    padding-bottom: var(--ddd-spacing-7);
  }
  .pb-8 {
    padding-bottom: var(--ddd-spacing-8);
  }
  .pb-9 {
    padding-bottom: var(--ddd-spacing-9);
  }
  .pb-10 {
    padding-bottom: var(--ddd-spacing-10);
  }
  .pb-11 {
    padding-bottom: var(--ddd-spacing-11);
  }
  .pb-12 {
    padding-bottom: var(--ddd-spacing-12);
  }
  .pb-13 {
    padding-bottom: var(--ddd-spacing-13);
  }
  .pb-14 {
    padding-bottom: var(--ddd-spacing-14);
  }
  .pb-15 {
    padding-bottom: var(--ddd-spacing-15);
  }
  .pb-16 {
    padding-bottom: var(--ddd-spacing-16);
  }
  .pb-17 {
    padding-bottom: var(--ddd-spacing-17);
  }
  .pb-18 {
    padding-bottom: var(--ddd-spacing-18);
  }
  .pb-19 {
    padding-bottom: var(--ddd-spacing-19);
  }
  .pb-20 {
    padding-bottom: var(--ddd-spacing-20);
  }
  .pb-21 {
    padding-bottom: var(--ddd-spacing-21);
  }
  .pb-22 {
    padding-bottom: var(--ddd-spacing-22);
  }
  .pb-23 {
    padding-bottom: var(--ddd-spacing-23);
  }
  .pb-24 {
    padding-bottom: var(--ddd-spacing-24);
  }
  .pb-25 {
    padding-bottom: var(--ddd-spacing-25);
  }
  .pb-26 {
    padding-bottom: var(--ddd-spacing-26);
  }
  .pb-27 {
    padding-bottom: var(--ddd-spacing-27);
  }
  .pb-28 {
    padding-bottom: var(--ddd-spacing-28);
  }
  .pb-29 {
    padding-bottom: var(--ddd-spacing-29);
  }
  .pb-30 {
    padding-bottom: var(--ddd-spacing-30);
  }
  .pl-auto {
    padding-left: auto;
  }
  .pl-0 {
    padding-left: var(--ddd-spacing-0);
  }
  .pl-1 {
    padding-left: var(--ddd-spacing-1);
  }
  .pl-2 {
    padding-left: var(--ddd-spacing-2);
  }
  .pl-3 {
    padding-left: var(--ddd-spacing-3);
  }
  .pl-4 {
    padding-left: var(--ddd-spacing-4);
  }
  .pl-5 {
    padding-left: var(--ddd-spacing-5);
  }
  .pl-6 {
    padding-left: var(--ddd-spacing-6);
  }
  .pl-7 {
    padding-left: var(--ddd-spacing-7);
  }
  .pl-8 {
    padding-left: var(--ddd-spacing-8);
  }
  .pl-9 {
    padding-left: var(--ddd-spacing-9);
  }
  .pl-10 {
    padding-left: var(--ddd-spacing-10);
  }
  .pl-11 {
    padding-left: var(--ddd-spacing-11);
  }
  .pl-12 {
    padding-left: var(--ddd-spacing-12);
  }
  .pl-13 {
    padding-left: var(--ddd-spacing-13);
  }
  .pl-14 {
    padding-left: var(--ddd-spacing-14);
  }
  .pl-15 {
    padding-left: var(--ddd-spacing-15);
  }
  .pl-16 {
    padding-left: var(--ddd-spacing-16);
  }
  .pl-17 {
    padding-left: var(--ddd-spacing-17);
  }
  .pl-18 {
    padding-left: var(--ddd-spacing-18);
  }
  .pl-19 {
    padding-left: var(--ddd-spacing-19);
  }
  .pl-20 {
    padding-left: var(--ddd-spacing-20);
  }
  .pl-21 {
    padding-left: var(--ddd-spacing-21);
  }
  .pl-22 {
    padding-left: var(--ddd-spacing-22);
  }
  .pl-23 {
    padding-left: var(--ddd-spacing-23);
  }
  .pl-24 {
    padding-left: var(--ddd-spacing-24);
  }
  .pl-25 {
    padding-left: var(--ddd-spacing-25);
  }
  .pl-26 {
    padding-left: var(--ddd-spacing-26);
  }
  .pl-27 {
    padding-left: var(--ddd-spacing-27);
  }
  .pl-28 {
    padding-left: var(--ddd-spacing-28);
  }
  .pl-29 {
    padding-left: var(--ddd-spacing-29);
  }
  .pl-30 {
    padding-left: var(--ddd-spacing-30);
  }
  .pr-auto {
    padding-right: auto;
  }
  .pr-0 {
    padding-right: var(--ddd-spacing-0);
  }
  .pr-1 {
    padding-right: var(--ddd-spacing-1);
  }
  .pr-2 {
    padding-right: var(--ddd-spacing-2);
  }
  .pr-3 {
    padding-right: var(--ddd-spacing-3);
  }
  .pr-4 {
    padding-right: var(--ddd-spacing-4);
  }
  .pr-5 {
    padding-right: var(--ddd-spacing-5);
  }
  .pr-6 {
    padding-right: var(--ddd-spacing-6);
  }
  .pr-7 {
    padding-right: var(--ddd-spacing-7);
  }
  .pr-8 {
    padding-right: var(--ddd-spacing-8);
  }
  .pr-9 {
    padding-right: var(--ddd-spacing-9);
  }
  .pr-10 {
    padding-right: var(--ddd-spacing-10);
  }
  .pr-11 {
    padding-right: var(--ddd-spacing-11);
  }
  .pr-12 {
    padding-right: var(--ddd-spacing-12);
  }
  .pr-13 {
    padding-right: var(--ddd-spacing-13);
  }
  .pr-14 {
    padding-right: var(--ddd-spacing-14);
  }
  .pr-15 {
    padding-right: var(--ddd-spacing-15);
  }
  .pr-16 {
    padding-right: var(--ddd-spacing-16);
  }
  .pr-17 {
    padding-right: var(--ddd-spacing-17);
  }
  .pr-18 {
    padding-right: var(--ddd-spacing-18);
  }
  .pr-19 {
    padding-right: var(--ddd-spacing-19);
  }
  .pr-20 {
    padding-right: var(--ddd-spacing-20);
  }
  .pr-21 {
    padding-right: var(--ddd-spacing-21);
  }
  .pr-22 {
    padding-right: var(--ddd-spacing-22);
  }
  .pr-23 {
    padding-right: var(--ddd-spacing-23);
  }
  .pr-24 {
    padding-right: var(--ddd-spacing-24);
  }
  .pr-25 {
    padding-right: var(--ddd-spacing-25);
  }
  .pr-26 {
    padding-right: var(--ddd-spacing-26);
  }
  .pr-27 {
    padding-right: var(--ddd-spacing-27);
  }
  .pr-28 {
    padding-right: var(--ddd-spacing-28);
  }
  .pr-29 {
    padding-right: var(--ddd-spacing-29);
  }
  .pr-30 {
    padding-right: var(--ddd-spacing-30);
  }
  .px-auto {
    padding-left: auto;
    padding-right: auto;
  }
  .px-0 {
    padding-left: var(--ddd-spacing-0);
    padding-right: var(--ddd-spacing-0);
  }
  .px-1 {
    padding-left: var(--ddd-spacing-1);
    padding-right: var(--ddd-spacing-1);
  }
  .px-2 {
    padding-left: var(--ddd-spacing-2);
    padding-right: var(--ddd-spacing-2);
  }
  .px-3 {
    padding-left: var(--ddd-spacing-3);
    padding-right: var(--ddd-spacing-3);
  }
  .px-4 {
    padding-left: var(--ddd-spacing-4);
    padding-right: var(--ddd-spacing-4);
  }
  .px-5 {
    padding-left: var(--ddd-spacing-5);
    padding-right: var(--ddd-spacing-5);
  }
  .px-6 {
    padding-left: var(--ddd-spacing-6);
    padding-right: var(--ddd-spacing-6);
  }
  .px-7 {
    padding-left: var(--ddd-spacing-7);
    padding-right: var(--ddd-spacing-7);
  }
  .px-8 {
    padding-left: var(--ddd-spacing-8);
    padding-right: var(--ddd-spacing-8);
  }
  .px-9 {
    padding-left: var(--ddd-spacing-9);
    padding-right: var(--ddd-spacing-9);
  }
  .px-10 {
    padding-left: var(--ddd-spacing-10);
    padding-right: var(--ddd-spacing-10);
  }
  .px-11 {
    padding-left: var(--ddd-spacing-11);
    padding-right: var(--ddd-spacing-11);
  }
  .px-12 {
    padding-left: var(--ddd-spacing-12);
    padding-right: var(--ddd-spacing-12);
  }
  .px-13 {
    padding-left: var(--ddd-spacing-13);
    padding-right: var(--ddd-spacing-13);
  }
  .px-14 {
    padding-left: var(--ddd-spacing-14);
    padding-right: var(--ddd-spacing-14);
  }
  .px-15 {
    padding-left: var(--ddd-spacing-15);
    padding-right: var(--ddd-spacing-15);
  }
  .px-16 {
    padding-left: var(--ddd-spacing-16);
    padding-right: var(--ddd-spacing-16);
  }
  .px-17 {
    padding-left: var(--ddd-spacing-17);
    padding-right: var(--ddd-spacing-17);
  }
  .px-18 {
    padding-left: var(--ddd-spacing-18);
    padding-right: var(--ddd-spacing-18);
  }
  .px-19 {
    padding-left: var(--ddd-spacing-19);
    padding-right: var(--ddd-spacing-19);
  }
  .px-20 {
    padding-left: var(--ddd-spacing-20);
    padding-right: var(--ddd-spacing-20);
  }
  .px-21 {
    padding-left: var(--ddd-spacing-21);
    padding-right: var(--ddd-spacing-21);
  }
  .px-22 {
    padding-left: var(--ddd-spacing-22);
    padding-right: var(--ddd-spacing-22);
  }
  .px-23 {
    padding-left: var(--ddd-spacing-23);
    padding-right: var(--ddd-spacing-23);
  }
  .px-24 {
    padding-left: var(--ddd-spacing-24);
    padding-right: var(--ddd-spacing-24);
  }
  .px-25 {
    padding-left: var(--ddd-spacing-25);
    padding-right: var(--ddd-spacing-25);
  }
  .px-26 {
    padding-left: var(--ddd-spacing-26);
    padding-right: var(--ddd-spacing-26);
  }
  .px-27 {
    padding-left: var(--ddd-spacing-27);
    padding-right: var(--ddd-spacing-27);
  }
  .px-28 {
    padding-left: var(--ddd-spacing-28);
    padding-right: var(--ddd-spacing-28);
  }
  .px-29 {
    padding-left: var(--ddd-spacing-29);
    padding-right: var(--ddd-spacing-29);
  }
  .px-30 {
    padding-left: var(--ddd-spacing-30);
    padding-right: var(--ddd-spacing-30);
  }
  .py-auto {
    padding-top: auto;
    padding-bottom: auto;
  }
  .py-0 {
    padding-top: var(--ddd-spacing-0);
    padding-bottom: var(--ddd-spacing-0);
  }
  .py-1 {
    padding-top: var(--ddd-spacing-1);
    padding-bottom: var(--ddd-spacing-1);
  }
  .py-2 {
    padding-top: var(--ddd-spacing-2);
    padding-bottom: var(--ddd-spacing-2);
  }
  .py-3 {
    padding-top: var(--ddd-spacing-3);
    padding-bottom: var(--ddd-spacing-3);
  }
  .py-4 {
    padding-top: var(--ddd-spacing-4);
    padding-bottom: var(--ddd-spacing-4);
  }
  .py-5 {
    padding-top: var(--ddd-spacing-5);
    padding-bottom: var(--ddd-spacing-5);
  }
  .py-6 {
    padding-top: var(--ddd-spacing-6);
    padding-bottom: var(--ddd-spacing-6);
  }
  .py-7 {
    padding-top: var(--ddd-spacing-7);
    padding-bottom: var(--ddd-spacing-7);
  }
  .py-8 {
    padding-top: var(--ddd-spacing-8);
    padding-bottom: var(--ddd-spacing-8);
  }
  .py-9 {
    padding-top: var(--ddd-spacing-9);
    padding-bottom: var(--ddd-spacing-9);
  }
  .py-10 {
    padding-top: var(--ddd-spacing-10);
    padding-bottom: var(--ddd-spacing-10);
  }
  .py-11 {
    padding-top: var(--ddd-spacing-11);
    padding-bottom: var(--ddd-spacing-11);
  }
  .py-12 {
    padding-top: var(--ddd-spacing-12);
    padding-bottom: var(--ddd-spacing-12);
  }
  .py-13 {
    padding-top: var(--ddd-spacing-13);
    padding-bottom: var(--ddd-spacing-13);
  }
  .py-14 {
    padding-top: var(--ddd-spacing-14);
    padding-bottom: var(--ddd-spacing-14);
  }
  .py-15 {
    padding-top: var(--ddd-spacing-15);
    padding-bottom: var(--ddd-spacing-15);
  }
  .py-16 {
    padding-top: var(--ddd-spacing-16);
    padding-bottom: var(--ddd-spacing-16);
  }
  .py-17 {
    padding-top: var(--ddd-spacing-17);
    padding-bottom: var(--ddd-spacing-17);
  }
  .py-18 {
    padding-top: var(--ddd-spacing-18);
    padding-bottom: var(--ddd-spacing-18);
  }
  .py-19 {
    padding-top: var(--ddd-spacing-19);
    padding-bottom: var(--ddd-spacing-19);
  }
  .py-20 {
    padding-top: var(--ddd-spacing-20);
    padding-bottom: var(--ddd-spacing-20);
  }
  .py-21 {
    padding-top: var(--ddd-spacing-21);
    padding-bottom: var(--ddd-spacing-21);
  }
  .py-22 {
    padding-top: var(--ddd-spacing-22);
    padding-bottom: var(--ddd-spacing-22);
  }
  .py-23 {
    padding-top: var(--ddd-spacing-23);
    padding-bottom: var(--ddd-spacing-23);
  }
  .py-24 {
    padding-top: var(--ddd-spacing-24);
    padding-bottom: var(--ddd-spacing-24);
  }
  .py-25 {
    padding-top: var(--ddd-spacing-25);
    padding-bottom: var(--ddd-spacing-25);
  }
  .py-26 {
    padding-top: var(--ddd-spacing-26);
    padding-bottom: var(--ddd-spacing-26);
  }
  .py-27 {
    padding-top: var(--ddd-spacing-27);
    padding-bottom: var(--ddd-spacing-27);
  }
  .py-28 {
    padding-top: var(--ddd-spacing-28);
    padding-bottom: var(--ddd-spacing-28);
  }
  .py-29 {
    padding-top: var(--ddd-spacing-29);
    padding-bottom: var(--ddd-spacing-29);
  }
  .py-30 {
    padding-top: var(--ddd-spacing-30);
    padding-bottom: var(--ddd-spacing-30);
  }
  .gap-0 {
    gap: var(--ddd-spacing-0);
  }
  .gap-1 {
    gap: var(--ddd-spacing-1);
  }
  .gap-2 {
    gap: var(--ddd-spacing-2);
  }
  .gap-3 {
    gap: var(--ddd-spacing-3);
  }
  .gap-4 {
    gap: var(--ddd-spacing-4);
  }
  .gap-5 {
    gap: var(--ddd-spacing-5);
  }
  .gap-6 {
    gap: var(--ddd-spacing-6);
  }
  .gap-7 {
    gap: var(--ddd-spacing-7);
  }
  .gap-8 {
    gap: var(--ddd-spacing-8);
  }
  .gap-9 {
    gap: var(--ddd-spacing-9);
  }
  .gap-10 {
    gap: var(--ddd-spacing-10);
  }
  .gap-11 {
    gap: var(--ddd-spacing-11);
  }
  .gap-12 {
    gap: var(--ddd-spacing-12);
  }
  .gap-13 {
    gap: var(--ddd-spacing-13);
  }
  .gap-14 {
    gap: var(--ddd-spacing-14);
  }
  .gap-15 {
    gap: var(--ddd-spacing-15);
  }
  .gap-16 {
    gap: var(--ddd-spacing-16);
  }
  .gap-17 {
    gap: var(--ddd-spacing-17);
  }
  .gap-18 {
    gap: var(--ddd-spacing-18);
  }
  .gap-19 {
    gap: var(--ddd-spacing-19);
  }
  .gap-20 {
    gap: var(--ddd-spacing-20);
  }
  .gap-21 {
    gap: var(--ddd-spacing-21);
  }
  .gap-22 {
    gap: var(--ddd-spacing-22);
  }
  .gap-23 {
    gap: var(--ddd-spacing-23);
  }
  .gap-24 {
    gap: var(--ddd-spacing-24);
  }
  .gap-25 {
    gap: var(--ddd-spacing-25);
  }
  .gap-26 {
    gap: var(--ddd-spacing-26);
  }
  .gap-27 {
    gap: var(--ddd-spacing-27);
  }
  .gap-28 {
    gap: var(--ddd-spacing-28);
  }
  .gap-29 {
    gap: var(--ddd-spacing-29);
  }
  .gap-30 {
    gap: var(--ddd-spacing-30);
  } `;
/* font sizing */
const DDDFontSizing = i$1` .fs-4xs {
    font-size: var(--ddd-font-size-4xs);
  }
  .fs-3xs {
    font-size: var(--ddd-font-size-3xs);
  }
  .fs-xxs {
    font-size: var(--ddd-font-size-xxs);
  }
  .fs-xs {
    font-size: var(--ddd-font-size-xs);
  }
  .fs-s {
    font-size: var(--ddd-font-size-s);
  }
  .fs-ms {
    font-size: var(--ddd-font-size-ms);
  }
  .fs-m {
    font-size: var(--ddd-font-size-m);
  }
  .fs-ml {
    font-size: var(--ddd-font-size-ml);
  }
  .fs-l {
    font-size: var(--ddd-font-size-l);
  }
  .fs-xl {
    font-size: var(--ddd-font-size-xl);
  }
  .fs-xxl {
    font-size: var(--ddd-font-size-xxl);
  }
  .fs-3xl {
    font-size: var(--ddd-font-size-3xl);
  }
  .fs-4xl {
    font-size: var(--ddd-font-size-4xl);
  } `;
/* font sizing */
const DDDLetterSpacing = i$1` .ls-16-sm {
    letter-spacing: var(--ddd-ls-16-sm);
  }
  .ls-18-sm {
    letter-spacing: var(--ddd-ls-18-sm);
  }
  .ls-20-sm {
    letter-spacing: var(--ddd-ls-20-sm);
  }
  .ls-22-sm {
    letter-spacing: var(--ddd-ls-22-sm);
  }
  .ls-24-sm {
    letter-spacing: var(--ddd-ls-24-sm);
  }
  .ls-28-sm {
    letter-spacing: var(--ddd-ls-28-sm);
  }
  .ls-32-sm {
    letter-spacing: var(--ddd-ls-32-sm);
  }
  .ls-36-sm {
    letter-spacing: var(--ddd-ls-36-sm);
  }
  .ls-40-sm {
    letter-spacing: var(--ddd-ls-40-sm);
  }
  .ls-48-sm {
    letter-spacing: var(--ddd-ls-48-sm);
  }
  .ls-56-sm {
    letter-spacing: var(--ddd-ls-56-sm);
  }
  .ls-64-sm {
    letter-spacing: var(--ddd-ls-64-sm);
  }
  .ls-72-sm {
    letter-spacing: var(--ddd-ls-72-sm);
  }
  .ls-16-lg {
    letter-spacing: var(--ddd-ls-16-lg);
  }
  .ls-18-lg {
    letter-spacing: var(--ddd-ls-18-lg);
  }
  .ls-20-lg {
    letter-spacing: var(--ddd-ls-20-lg);
  }
  .ls-22-lg {
    letter-spacing: var(--ddd-ls-22-lg);
  }
  .ls-24-lg {
    letter-spacing: var(--ddd-ls-24-lg);
  }
  .ls-28-lg {
    letter-spacing: var(--ddd-ls-28-lg);
  }
  .ls-32-lg {
    letter-spacing: var(--ddd-ls-32-lg);
  }
  .ls-36-lg {
    letter-spacing: var(--ddd-ls-36-lg);
  }
  .ls-40-lg {
    letter-spacing: var(--ddd-ls-40-lg);
  }
  .ls-48-lg {
    letter-spacing: var(--ddd-ls-48-lg);
  }
  .ls-56-lg {
    letter-spacing: var(--ddd-ls-56-lg);
  }
  .ls-64-lg {
    letter-spacing: var(--ddd-ls-64-lg);
  }
  .ls-72-lg {
    letter-spacing: var(--ddd-ls-72-lg);
  } `;
/* line height sizing */
const DDDLineHeight = i$1` .lh-120 {
    line-height: var(--ddd-lh-120);
  }
  .lh-140 {
    line-height: var(--ddd-lh-140);
  }
  .lh-150 {
    line-height: var(--ddd-lh-150);
  }
  .lh-auto {
    line-height: normal;
  } `;
/* Box shadows */
const DDDBoxShadow = i$1` .bs-0 {
    box-shadow: none;
  }
  .bs-xs {
    box-shadow: var(--ddd-boxShadow-sm);
  }
  .bs-sm {
    box-shadow: var(--ddd-boxShadow-sm);
  }
  .bs-md {
    box-shadow: var(--ddd-boxShadow-md);
  }
  .bs-lg {
    box-shadow: var(--ddd-boxShadow-lg);
  }
  .bs-xl {
    box-shadow: var(--ddd-boxShadow-xl);
  } `;
/* Border Radius */
const DDDBorderRadius = i$1` .r-0 {
    border-radius: var(--ddd-radius-0);
  }
  .r-xs {
    border-radius: var(--ddd-radius-xs);
  }
  .r-sm {
    border-radius: var(--ddd-radius-sm);
  }
  .r-md {
    border-radius: var(--ddd-radius-md);
  }
  .r-lg {
    border-radius: var(--ddd-radius-lg);
  }
  .r-xl {
    border-radius: var(--ddd-radius-xl);
  }
  .r-rounded {
    border-radius: var(--ddd-radius-rounded);
  }
  .r-circle {
    border-radius: var(--ddd-radius-circle);
  } `;
/* Background colors / gradients */
const DDDBackground = i$1` .bg-transparent {
    background-color: transparent;
  }
  .bg-white {
    background-color: var(--ddd-theme-default-white);
  }
  .bg-gradient-navBar {
    background: var(--ddd-theme-default-gradient-navBar);
  }
  .bg-gradient-footer {
    background: var(--ddd-theme-default-gradient-footer);
  }
  .bg-gradient-newsFeature {
    background: var(--ddd-theme-default-gradient-newsFeature);
  }
  .bg-gradient-buttons {
    background: var(--ddd-theme-default-gradient-buttons);
  }
  .bg-gradient-hero {
    background: var(--ddd-theme-default-gradient-hero);
  }
  .bg-gradient-hero2 {
    background: var(--ddd-theme-default-gradient-hero2);
  } `;
/* Font weight */
const DDDFontWeight = i$1` .fw-0 {
    font-weight: var(--ddd-font-weight-regular); /* available for navigation */
  }
  .fw-1 {
    font-weight: var(--ddd-font-weight-medium); /* available for headers */
  }
  .fw-2 {
    font-weight: var(--ddd-font-weight-bold); /* available for headers */
  }
  .fw-3 {
    font-weight: var(
      --ddd-font-weight-black
    ); /* default for headers, body & navigation */
  } `;
/* Font classes */
const DDDFontClasses = i$1` .ddd-font-navigation {
    font-family: var(--ddd-font-navigation);
    font-size: var(--ddd-theme-h4-font-size);
    font-weight: var(--ddd-font-weight-bold);
  }
  .ddd-font-primary {
    font-family: var(--ddd-font-primary);
  }
  .ddd-font-secondary {
    font-family: var(--ddd-font-secondary);
  } `;

/* Breadcrumb */
const DDDBreadcrumb = i$1` .breadcrumb {
    font-weight: var(--ddd-font-weight-light);
    margin: var(--ddd-spacing-6) 0;
    padding: 0;
    pointer-events: auto;
    list-style: "/";
    gap: var(--ddd-spacing-2);
    display: flex;
    flex-flow: row;
    color: light-dark(
      var(--ddd-theme-default-link),
      var(--ddd-theme-default-linkLight)
    );
    line-height: normal;
    text-align: start;
  }
  .breadcrumb li::marker {
    color: light-dark(black, white);
    font-weight: var(--ddd-font-weight-bold);
  }
  .breadcrumb li:first-child {
    list-style: none;
  }
  .breadcrumb li:last-child a {
    color: light-dark(black, white);
    pointer-events: none;
  }
  .breadcrumb li a {
    vertical-align: text-top;
    display: inline-block;
    padding: 0 var(--ddd-spacing-2);
    font-family: var(--ddd-font-navigation);
    font-weight: var(--ddd-font-weight-regular);
    text-decoration: none;
  }
  .breadcrumb li a:hover {
    text-decoration: underline;
    pointer-events: auto;
  } `;
/* Extra things */
const DDDExtra = i$1` /* helper class for accessibility of screen reader only content */
  .sr-only {
    position: absolute;
    left: -10000px;
    inset-inline-start: -10000px;
    inset-inline-end: initial;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  } `;
i$1` /* Apply primary color as pulse effect using CSS variable */
  :host([data-primary="0"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-0-rgb);
  }
  :host([data-primary="1"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-1-rgb);
  }
  :host([data-primary="2"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-2-rgb);
  }
  :host([data-primary="3"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-3-rgb);
  }
  :host([data-primary="4"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-4-rgb);
  }
  :host([data-primary="5"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-5-rgb);
  }
  :host([data-primary="6"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-6-rgb);
  }
  :host([data-primary="7"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-7-rgb);
  }
  :host([data-primary="8"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-8-rgb);
  }
  :host([data-primary="9"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-9-rgb);
  }
  :host([data-primary="10"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-10-rgb);
  }
  :host([data-primary="11"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-11-rgb);
  }
  :host([data-primary="12"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-12-rgb);
  }
  :host([data-primary="13"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-13-rgb);
  }
  :host([data-primary="14"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-14-rgb);
  }
  :host([data-primary="15"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-15-rgb);
  }
  :host([data-primary="16"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-16-rgb);
  }
  :host([data-primary="17"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-17-rgb);
  }
  :host([data-primary="18"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-18-rgb);
  }
  :host([data-primary="19"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-19-rgb);
  }
  :host([data-primary="20"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-20-rgb);
  }
  :host([data-primary="21"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-21-rgb);
  }
  :host([data-primary="22"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-22-rgb);
  }
  :host([data-primary="23"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-23-rgb);
  }
  :host([data-primary="24"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-24-rgb);
  }
  :host([data-primary="25"]) {
    --ddd-animation-pulse-color: var(--ddd-primary-25-rgb);
  }

  :host([data-pulse]) {
    --ddd-animation-pulse-size: var(--ddd-spacing-4);
    animation-delay: 2.8s;
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    z-index: 10000;
  }
  :host([data-pulse="1"]) {
    --ddd-animation-pulse-size: var(--ddd-spacing-6);
  }
  :host([data-pulse="2"]) {
    --ddd-animation-pulse-size: var(--ddd-spacing-10);
  }
  :host([data-pulse]:not([data-primary])) {
    --ddd-animation-pulse-color: var(--ddd-primary-1-rgb);
  } `;
const DDDAnimations = i$1` @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--ddd-animation-pulse-color));
    }
    70% {
      box-shadow: 0 0 0 var(--ddd-animation-pulse-size) rgba(0, 0, 0, 0); /* Use a transparent color derived from the original color */
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); /* Same here */
    }
  } `;

// export that has all of them for easy stamping as a single sheet
const DDDAllStyles = [DDDVariables, ...DDDDataAttributes, DDDReset, DDDBreadcrumb, DDDExtra, DDDBorders, DDDMarginPadding, DDDLetterSpacing, DDDLineHeight, DDDBoxShadow, DDDBorderRadius, DDDBackground, DDDFontClasses, DDDFontWeight, DDDFontSizing, DDDAnimations];

/**
 * Copyright 2024
 * @license Apache-2.0, see License.md for full details.
 */

/**
 * `d-d-d`
 * `design, develop, destroy the competition`
 * @demo demo/index.html
 */

// call this to load all the fonts that are official
function loadDDDFonts() {
  if (globalThis && globalThis.document && !globalThis.document.querySelector('[data-ddd="font"]')) {
    DDDFonts.forEach(font => {
      const link = globalThis.document.createElement("link");
      link.setAttribute("href", font);
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("fetchpriority", "low");
      link.setAttribute("data-ddd", "font");
      globalThis.document.head.appendChild(link);
    });
  }
}
function dddCSSFeatureDetection() {
  // check for css feature support
  if (!CSS.supports("initial-letter", "1")) {
    console.warn("CSS feature: initial-letter not supported");
    console.warn("Adding dropCap-noSupport class");
    globalThis.document.body.classList.add("dropCap-noSupport");
  }
}

// super class so we can mix styles into other things more easily
const DDDSuper = function (SuperClass) {
  return class extends SuperClass {
    constructor() {
      super();
      this.isSafari = globalThis.safari !== undefined;
      globalThis.DDDSharedStyles.requestAvailability();
    }
    static get properties() {
      return {
        ...super.properties,
        isSafari: {
          type: Boolean,
          reflect: true,
          attribute: "is-safari"
        }
      };
    }
    /**
     * LitElement style callback
     */
    static get styles() {
      // support for using in other classes
      let styles = [];
      if (super.styles) {
        styles = super.styles;
      }
      return [styles, DDDReset];
    }
  };
};

// autoloads fonts and gives it a tag name; this is useful
class DDD extends DDDSuper(SimpleColorsSuper(h)) {
  constructor() {
    super();
  }
  static get tag() {
    return "d-d-d";
  }
}
globalThis.customElements.define(DDD.tag, DDD);

/**
 * Checks to see if there is an instance available, and if not appends one.
 * then it injects the styles into the global document scope so that they can be used anywhere
 */
globalThis.DDDSharedStyles = globalThis.DDDSharedStyles || {};
globalThis.DDDSharedStyles.requestAvailability = () => {
  if (globalThis.DDDSharedStyles.instance == null && globalThis.document && globalThis.document.head) {
    // convert css into text content of arrays mashed together
    // this way we can inject it into a global style sheet
    let globalStyles = DDDAllStyles.map(st => st.cssText ? st.cssText : "").join("");
    try {
      const adoptableDDD = new CSSStyleSheet();
      adoptableDDD.replaceSync(globalStyles);
      // THIS FLAG MAKES HAX LOAD IT IN ITS SHADOW ROOT!!!!
      adoptableDDD.hax = true;
      // Combine the existing adopted sheets if we need to but these will work everywhere
      // and are very fast
      globalThis.document.adoptedStyleSheets = [...globalThis.document.adoptedStyleSheets, adoptableDDD];
      loadDDDFonts();
      globalThis.document.onload = dddCSSFeatureDetection();
      globalThis.DDDSharedStyles.instance = adoptableDDD;
    } catch (e) {
      const oldStyleSafariBs = globalThis.document.createElement("style");
      oldStyleSafariBs.innerHTML = globalStyles;
      globalThis.document.head.appendChild(oldStyleSafariBs);
      loadDDDFonts();
      globalThis.document.onload = dddCSSFeatureDetection();
      globalThis.DDDSharedStyles.instance = oldStyleSafariBs;
    }
  }
  return globalThis.DDDSharedStyles.instance;
};
// self-appending on call
globalThis.DDDSharedStyles.requestAvailability();
class DDDSample extends DDDSuper(h) {
  constructor() {
    super();
    this.type = null;
    this.option = 0;
  }
  static get styles() {
    return [super.styles, ...DDDDataAttributes, i$1` :host {
          display: flex;
          min-height: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-1) 0;
          margin: 0;
          font-size: var(--ddd-font-size-4xs);
          line-height: normal;
        }
        :host([type="accent"]:hover),
        :host([type="primary"]:hover) {
          color: black;
          background-color: light-dark(
            var(--ddd-theme-default-limestoneMaxLight),
            var(--ddd-theme-default-limestoneGray)
          );
        }

        :host([type="accent"]) .sample,
        :host([type="primary"]) .sample {
          border: var(--ddd-border-sm);
          border-radius: var(--ddd-radius-xs);
          box-shadow: var(--ddd-boxShadow-sm);
          height: var(--ddd-spacing-4);
          width: var(--ddd-spacing-8);
          display: inline-block;
        }

        :host([type="border"]) .sample,
        :host([type="border-radius"]) .sample,
        :host([type="box-shadow"]) .sample {
          --ddd-theme-primary: var(--ddd-sample-theme-primary, black);
          --ddd-theme-accent: var(
            --ddd-sample-theme-accent,
            var(--ddd-accent-3)
          );
          background-color: var(--ddd-theme-accent);
          border-color: var(--ddd-theme-primary);
          height: var(--ddd-spacing-4);
          width: var(--ddd-spacing-8);
          display: inline-block;
        }
        :host([type="border"]) .sample {
          height: calc(var(--ddd-spacing-4) - var(--ddd-theme-border-size));
          width: calc(var(--ddd-spacing-8) - var(--ddd-theme-border-size));
        }
        :host([type="border-radius"]) .sample {
          border: var(--ddd-border-lg);
          height: var(--ddd-spacing-8);
          width: var(--ddd-spacing-8);
          border-color: var(--ddd-theme-primary);
          clip-path: polygon(50% 0, 0 50%, 0 0, 0 0);
          transform: scale(4);
          padding: 0;
          margin-left: 64px;
          margin-top: 64px;
        }
        :host([type="box-shadow"]) .sample {
          border: var(--ddd-border-sm);
          border-color: var(--ddd-theme-primary);
          margin: 0 12px 12px 12px;
        }

        :host([type="accent"]:hover) .sample,
        :host([type="primary"]:hover) .sample {
          border-color: black;
        }
        :host([type="border"]) .label,
        :host([type="box-shadow"]) .label,
        :host([type="accent"]) .label,
        :host([type="primary"]) .label,
        :host([type="margin"]) .label,
        :host([type="padding"]) .label {
          font-size: var(--ddd-font-size-4xs);
          margin-left: var(--ddd-spacing-3);
          display: inline-block;
          vertical-align: top;
        }
        :host([type="border-radius"]) .label {
          margin-left: calc(-1 * var(--ddd-spacing-5));
          display: inline-block;
          vertical-align: top;
          height: var(--ddd-spacing-20);
          line-height: var(--ddd-spacing-20);
        }

        :host([type="margin"]) .label,
        :host([type="padding"]) .label {
          font-weight: var(--ddd-font-weight-bold);
        }
        :host([type="accent"]) .sample {
          background-color: var(--ddd-theme-accent);
        }
        :host([type="primary"]) .sample {
          background-color: var(--ddd-theme-primary);
        }

        :host([type="margin"]) .sample[data-margin],
        :host([type="padding"]) .sample {
          display: inline-block;
          height: var(--ddd-spacing-6);
          padding-top: 0;
          padding-bottom: 0;
          padding-left: 0;
          background-color: var(--ddd-primary-2);
          margin: 0;
        }

        /* design treatments may require display block */
        :host([type="design-treatment"]) .label {
          display: block;
          font-weight: bold;
          --ddd-theme-primary: var(
            --ddd-sample-theme-primary,
            var(--ddd-primary-16)
          );
          min-height: calc(
            (var(--initialLetter) / 3 * var(--ddd-theme-body-font-size) * 1.5) +
              20px
          );
        }

        /** TODO this needs to be set via some kind of similar ddd-samples global in order to work for the bg option */
        :host([type="design-treatment"][option="bg"]) .label {
          color: var(--ddd-theme-bgContrast);
        }

        :host([type="font-weight"]) .label,
        :host([type="font-family"]) .label {
          font-size: var(--ddd-font-size-s);
        }

        /* @hack just for the docs bc we can't visualize margins */
        [data-margin="center"] {
          margin-left: auto;
          margin-right: auto;
        }
        [data-margin="xs"] {
          padding: var(--ddd-spacing-2);
        }
        [data-margin="s"] {
          padding: var(--ddd-spacing-4);
        }
        [data-margin="m"] {
          padding: var(--ddd-spacing-8);
        }
        [data-margin="l"] {
          padding: var(--ddd-spacing-12);
        }
        [data-margin="xl"] {
          padding: var(--ddd-spacing-16);
        }

        /* @hack from normal presentation so that it renders nicely here */
        [data-instructional-action]::before {
          padding: 6px 0 0;
          margin: 8px 16px 0 0;
        }

        /* @hack so that we reduce the size of the drop cap or it'll be ridiculous */
        :host([type="design-treatment"])
          .label[data-design-treatment^="dropCap"]::first-letter {
          -webkit-initial-letter: calc(var(--initialLetter) / 3);
          initial-letter: calc(var(--initialLetter) / 3);
        }
        /* @hack so we can see fonts relative to each other, not exact size */
        :host([type="font-size"]) span ::slotted(*) {
          font-size: var(--ddd-font-size-xs);
        }
        :host([type="font-size"]) .label {
          font-size: 0.8em;
        }
        :host([option^="type"]) .label {
          font-size: 0.5em;
        }
        :host([option^="type"]) .label::after {
          content: " (50% scale)";
          font-size: var(--ddd-font-size-4xs);
        } `];
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("type") && this.shadowRoot) {
      let span;
      // accent, primary, spacing
      if (["accent", "primary", "padding", "margin", "border-radius", "box-shadow", "border"].includes(this.type)) {
        span = this.shadowRoot.querySelector("span.sample");
      } else if (this.type === "font-size") {
        span = this.shadowRoot.querySelector("div.wrapper");
      } else {
        span = this.shadowRoot.querySelector("span.label");
      }
      for (let i in ApplicationAttributeData) {
        span.removeAttribute(`data-${i}`);
      }
      // delay to ensure prev executes in order
      setTimeout(() => {
        span.setAttribute(`data-${this.type}`, this.option);
      }, 0);
    }
    if (changedProperties.has("option") && this.shadowRoot && this.type) {
      let span = this.shadowRoot.querySelector(`span[data-${this.type}]`);
      if (span) {
        span.setAttribute(`data-${this.type}`, this.option);
      }
    }
  }
  render() {
    return ke` <div class="wrapper"> <span class="sample"></span><span class="label">${ApplicationAttributeData[this.type][this.option]}<slot></slot></span> </div> `;
  }
  static get properties() {
    return {
      type: {
        type: String,
        reflect: true
      },
      option: {
        type: String
      }
    };
  }
  static get tag() {
    return "d-d-d-sample";
  }
}
globalThis.customElements.define(DDDSample.tag, DDDSample);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", {
  value: __freeze(raw || cooked.slice())
}));
var _a, _b, _c, _d;
class mediaTik2 extends DDDSuper(h) {
  static get tag() {
    return "media-tik2";
  }
  constructor() {
    super();
    this.visibleContent = 1;
    this.showButtons = true;
    this.showAllOption = false;
    this.labels = ["Content 1", "Content 2", "Content 3", "Content 4", "Content 5", "Content 6", "Content 7", "Content 8", "Content 9", "Content 10", "Content 11", "Content 12", "Content 13"];
  }
  static get properties() {
    return {
      visibleContent: {
        type: Number
      },
      showButtons: {
        type: Boolean
      },
      showAllOption: {
        type: Boolean
      },
      labels: {
        type: Array
      }
    };
  }
  static get styles() {
    return [super.styles, i$1(_a || (_a = __template(["\n      :host {\n        // display: block;\n        min-height: 0;\n        /* max-width: 600px; */\n        margin: auto;\n        color: var(--ddd-theme-primary);\n        /* background-color: var( */\n          /* --simple-colors-default-theme-indigo-3; */\n          /* --ddd-theme-default-linkLight */\n        \n        font-family: var(--ddd-font-navigation);\n        font-size: var(--app-todo-font-size, var(--ddd-font-size-s));\n      }\n      .wrapper {\n        margin: var(--ddd-spacing-2);\n        padding: var(--ddd-spacing-4);\n      }\n      div {\n        padding: 0;\n        margin: 0;\n      }\n      .content {\n        max-height: 0;\n        overflow: hidden;\n        transition: max-height 0.24s ease-out;\n      }\n      .content.visible {\n        max-height: 100%;\n        /* max-height: 100px; Adjust this value if needed */\n      }\n      .button-container {\n        display: flex;\n        justify-content: flex-start;\n        align-items: center;\n        margin-top: 20px;\n      }\n      button {\n        display: flex;\n        align-items: center;\n        padding: 10px 20px;\n        border: none;\n        border-radius: 4px;\n        font-size: 16px;\n        cursor: pointer;\n        transition: all 0.3s ease;\n        /* transition-duration: 4000ms; */\n        background-color: #4c80da;\n        color: white;\n        margin-right: 10px;\n      }\n      button:hover {\n        background-color: #2d3748;\n      }\n      .arrow-down {\n        width: 0;\n        height: 0;\n        border-left: 15px solid transparent;\n        border-right: 15px solid transparent;\n        border-top: 15px solid #85adf1;\n        cursor: pointer;\n        transition: transform 2.3s ease;\n      }\n      .arrow-down:hover {\n        transform: translateY(2px);\n      }\n      .show-all {\n        display: none;\n        background-color: #2ece36;\n        color: white;\n        padding: 10px 20px;\n        border: none;\n        border-radius: 4px;\n        font-size: 16px;\n        cursor: pointer;\n        transition: all 0.5s ease;\n      }\n      .show-all.visible {\n        display: block;\n        overflow: hidden;\n      }\n      .show-all:hover {\n        background-color: #dbeeb7;\n      }\n    "])))];
  }
  render() {
    return ke(_b || (_b = __template(['\n      <div class="wrapper">\n    <!-- <div>', "</div> -->\n    ", " ", "\n    <slot></slot>\n  </div>\n      "])), this.title, this.renderContent(), this.showButtons ? this.renderButtons() : "");
  }
  renderContent() {
    return this.labels.map((label, index) => ke(_c || (_c = __template(['\n          <div class="content ', '">\n            <!-- <h2>', '</h2> -->\n            <slot name="content-', '"></slot>\n          </div>\n        '])), this.visibleContent > index ? "visible" : "", label, index + 1));
  }
  renderButtons() {
    return ke(_d || (_d = __template(['\n        <div class="button-container">\n          <button @click=', '>Lanjut ...</button>\n          <div class="arrow-down" @click=', '></div>\n          <button\n            class="show-all ', '"\n            @click=', "\n          >\n            Tampilkan Semua\n          </button>\n        </div>\n      "])), this.handlePause, this.toggleShowAll, this.showAllOption ? "visible" : "", this.showAll);
  }
  handlePause() {
    if (this.visibleContent < this.labels.length) {
      this.visibleContent++;
    } else {
      this.visibleContent = 13;
      this.showButtons = false;
    }
  }
  toggleShowAll() {
    this.showAllOption = !this.showAllOption;
  }
  showAll() {
    this.visibleContent = this.labels.length;
    this.showButtons = false;
  }
  static get haxProperties() {
    return new URL("./lib/".concat(this.tag, ".haxProperties.json"), import.meta.url).href;
  }
}
globalThis.customElements.define(mediaTik2.tag, mediaTik2);
