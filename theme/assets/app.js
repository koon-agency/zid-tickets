var Ui = !1, Ki = !1, Ht = [], Gi = -1;
function ia(e) {
  na(e);
}
function na(e) {
  Ht.includes(e) || Ht.push(e), sa();
}
function Qs(e) {
  let t = Ht.indexOf(e);
  t !== -1 && t > Gi && Ht.splice(t, 1);
}
function sa() {
  !Ki && !Ui && (Ui = !0, queueMicrotask(ra));
}
function ra() {
  Ui = !1, Ki = !0;
  for (let e = 0; e < Ht.length; e++)
    Ht[e](), Gi = e;
  Ht.length = 0, Gi = -1, Ki = !1;
}
var ae, le, Fe, tr, qi = !0;
function oa(e) {
  qi = !1, e(), qi = !0;
}
function aa(e) {
  ae = e.reactive, Fe = e.release, le = (t) => e.effect(t, { scheduler: (i) => {
    qi ? ia(i) : i();
  } }), tr = e.raw;
}
function os(e) {
  le = e;
}
function la(e) {
  let t = () => {
  };
  return [(n) => {
    let s = le(n);
    return e._x_effects || (e._x_effects = /* @__PURE__ */ new Set(), e._x_runEffects = () => {
      e._x_effects.forEach((r) => r());
    }), e._x_effects.add(s), t = () => {
      s !== void 0 && (e._x_effects.delete(s), Fe(s));
    }, s;
  }, () => {
    t();
  }];
}
function Ee(e, t, i = {}) {
  e.dispatchEvent(
    new CustomEvent(t, {
      detail: i,
      bubbles: !0,
      // Allows events to pass the shadow DOM barrier.
      composed: !0,
      cancelable: !0
    })
  );
}
function Tt(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((s) => Tt(s, t));
    return;
  }
  let i = !1;
  if (t(e, () => i = !0), i)
    return;
  let n = e.firstElementChild;
  for (; n; )
    Tt(n, t), n = n.nextElementSibling;
}
function Lt(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var as = !1;
function ca() {
  as && Lt("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), as = !0, document.body || Lt("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), Ee(document, "alpine:init"), Ee(document, "alpine:initializing"), xn(), da((t) => xt(t, Tt)), Sn((t) => En(t)), ur((t, i) => {
    Tn(t, i).forEach((n) => n());
  });
  let e = (t) => !gi(t.parentElement, !0);
  Array.from(document.querySelectorAll(nr())).filter(e).forEach((t) => {
    xt(t);
  }), Ee(document, "alpine:initialized");
}
var wn = [], er = [];
function ir() {
  return wn.map((e) => e());
}
function nr() {
  return wn.concat(er).map((e) => e());
}
function sr(e) {
  wn.push(e);
}
function rr(e) {
  er.push(e);
}
function gi(e, t = !1) {
  return yi(e, (i) => {
    if ((t ? nr() : ir()).some((s) => i.matches(s)))
      return !0;
  });
}
function yi(e, t) {
  if (e) {
    if (t(e))
      return e;
    if (e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)
      return yi(e.parentElement, t);
  }
}
function ua(e) {
  return ir().some((t) => e.matches(t));
}
var or = [];
function ha(e) {
  or.push(e);
}
function xt(e, t = Tt, i = () => {
}) {
  xa(() => {
    t(e, (n, s) => {
      i(n, s), or.forEach((r) => r(n, s)), Tn(n, n.attributes).forEach((r) => r()), n._x_ignore && s();
    });
  });
}
function En(e) {
  Tt(e, (t) => {
    dr(t), fa(t);
  });
}
var ar = [], lr = [], cr = [];
function da(e) {
  cr.push(e);
}
function Sn(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : (t = e, lr.push(t));
}
function ur(e) {
  ar.push(e);
}
function hr(e, t, i) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(i);
}
function dr(e, t) {
  e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([i, n]) => {
    (t === void 0 || t.includes(i)) && (n.forEach((s) => s()), delete e._x_attributeCleanups[i]);
  });
}
function fa(e) {
  if (e._x_cleanups)
    for (; e._x_cleanups.length; )
      e._x_cleanups.pop()();
}
var bn = new MutationObserver(In), An = !1;
function xn() {
  bn.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), An = !0;
}
function fr() {
  pa(), bn.disconnect(), An = !1;
}
var Se = [], Fi = !1;
function pa() {
  Se = Se.concat(bn.takeRecords()), Se.length && !Fi && (Fi = !0, queueMicrotask(() => {
    ma(), Fi = !1;
  }));
}
function ma() {
  In(Se), Se.length = 0;
}
function Q(e) {
  if (!An)
    return e();
  fr();
  let t = e();
  return xn(), t;
}
var Pn = !1, ci = [];
function va() {
  Pn = !0;
}
function _a() {
  Pn = !1, In(ci), ci = [];
}
function In(e) {
  if (Pn) {
    ci = ci.concat(e);
    return;
  }
  let t = [], i = [], n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (let r = 0; r < e.length; r++)
    if (!e[r].target._x_ignoreMutationObserver && (e[r].type === "childList" && (e[r].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)), e[r].removedNodes.forEach((o) => o.nodeType === 1 && i.push(o))), e[r].type === "attributes")) {
      let o = e[r].target, a = e[r].attributeName, l = e[r].oldValue, c = () => {
        n.has(o) || n.set(o, []), n.get(o).push({ name: a, value: o.getAttribute(a) });
      }, u = () => {
        s.has(o) || s.set(o, []), s.get(o).push(a);
      };
      o.hasAttribute(a) && l === null ? c() : o.hasAttribute(a) ? (u(), c()) : u();
    }
  s.forEach((r, o) => {
    dr(o, r);
  }), n.forEach((r, o) => {
    ar.forEach((a) => a(o, r));
  });
  for (let r of i)
    t.includes(r) || (lr.forEach((o) => o(r)), En(r));
  t.forEach((r) => {
    r._x_ignoreSelf = !0, r._x_ignore = !0;
  });
  for (let r of t)
    i.includes(r) || r.isConnected && (delete r._x_ignoreSelf, delete r._x_ignore, cr.forEach((o) => o(r)), r._x_ignore = !0, r._x_ignoreSelf = !0);
  t.forEach((r) => {
    delete r._x_ignoreSelf, delete r._x_ignore;
  }), t = null, i = null, n = null, s = null;
}
function pr(e) {
  return Ze(ne(e));
}
function $e(e, t, i) {
  return e._x_dataStack = [t, ...ne(i || e)], () => {
    e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
  };
}
function ne(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? ne(e.host) : e.parentNode ? ne(e.parentNode) : [];
}
function Ze(e) {
  let t = new Proxy({}, {
    ownKeys: () => Array.from(new Set(e.flatMap((i) => Object.keys(i)))),
    has: (i, n) => e.some((s) => s.hasOwnProperty(n)),
    get: (i, n) => (e.find((s) => {
      if (s.hasOwnProperty(n)) {
        let r = Object.getOwnPropertyDescriptor(s, n);
        if (r.get && r.get._x_alreadyBound || r.set && r.set._x_alreadyBound)
          return !0;
        if ((r.get || r.set) && r.enumerable) {
          let o = r.get, a = r.set, l = r;
          o = o && o.bind(t), a = a && a.bind(t), o && (o._x_alreadyBound = !0), a && (a._x_alreadyBound = !0), Object.defineProperty(s, n, {
            ...l,
            get: o,
            set: a
          });
        }
        return !0;
      }
      return !1;
    }) || {})[n],
    set: (i, n, s) => {
      let r = e.find((o) => o.hasOwnProperty(n));
      return r ? r[n] = s : e[e.length - 1][n] = s, !0;
    }
  });
  return t;
}
function mr(e) {
  let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null, i = (n, s = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(([r, { value: o, enumerable: a }]) => {
      if (a === !1 || o === void 0)
        return;
      let l = s === "" ? r : `${s}.${r}`;
      typeof o == "object" && o !== null && o._x_interceptor ? n[r] = o.initialize(e, l, r) : t(o) && o !== n && !(o instanceof Element) && i(o, l);
    });
  };
  return i(e);
}
function vr(e, t = () => {
}) {
  let i = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(n, s, r) {
      return e(this.initialValue, () => ga(n, s), (o) => ji(n, s, o), s, r);
    }
  };
  return t(i), (n) => {
    if (typeof n == "object" && n !== null && n._x_interceptor) {
      let s = i.initialize.bind(i);
      i.initialize = (r, o, a) => {
        let l = n.initialize(r, o, a);
        return i.initialValue = l, s(r, o, a);
      };
    } else
      i.initialValue = n;
    return i;
  };
}
function ga(e, t) {
  return t.split(".").reduce((i, n) => i[n], e);
}
function ji(e, t, i) {
  if (typeof t == "string" && (t = t.split(".")), t.length === 1)
    e[t[0]] = i;
  else {
    if (t.length === 0)
      throw error;
    return e[t[0]] || (e[t[0]] = {}), ji(e[t[0]], t.slice(1), i);
  }
}
var _r = {};
function mt(e, t) {
  _r[e] = t;
}
function Xi(e, t) {
  return Object.entries(_r).forEach(([i, n]) => {
    let s = null;
    function r() {
      if (s)
        return s;
      {
        let [o, a] = br(t);
        return s = { interceptor: vr, ...o }, Sn(t, a), s;
      }
    }
    Object.defineProperty(e, `$${i}`, {
      get() {
        return n(t, r());
      },
      enumerable: !1
    });
  }), e;
}
function ya(e, t, i, ...n) {
  try {
    return i(...n);
  } catch (s) {
    Ie(s, e, t);
  }
}
function Ie(e, t, i = void 0) {
  Object.assign(e, { el: t, expression: i }), console.warn(`Alpine Expression Error: ${e.message}

${i ? 'Expression: "' + i + `"

` : ""}`, t), setTimeout(() => {
    throw e;
  }, 0);
}
var si = !0;
function gr(e) {
  let t = si;
  si = !1;
  let i = e();
  return si = t, i;
}
function Ut(e, t, i = {}) {
  let n;
  return et(e, t)((s) => n = s, i), n;
}
function et(...e) {
  return yr(...e);
}
var yr = wr;
function wa(e) {
  yr = e;
}
function wr(e, t) {
  let i = {};
  Xi(i, e);
  let n = [i, ...ne(e)], s = typeof t == "function" ? Ea(n, t) : ba(n, t, e);
  return ya.bind(null, e, t, s);
}
function Ea(e, t) {
  return (i = () => {
  }, { scope: n = {}, params: s = [] } = {}) => {
    let r = t.apply(Ze([n, ...e]), s);
    ui(i, r);
  };
}
var $i = {};
function Sa(e, t) {
  if ($i[e])
    return $i[e];
  let i = Object.getPrototypeOf(async function() {
  }).constructor, n = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e, r = (() => {
    try {
      return new i(["__self", "scope"], `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`);
    } catch (o) {
      return Ie(o, t, e), Promise.resolve();
    }
  })();
  return $i[e] = r, r;
}
function ba(e, t, i) {
  let n = Sa(t, i);
  return (s = () => {
  }, { scope: r = {}, params: o = [] } = {}) => {
    n.result = void 0, n.finished = !1;
    let a = Ze([r, ...e]);
    if (typeof n == "function") {
      let l = n(n, a).catch((c) => Ie(c, i, t));
      n.finished ? (ui(s, n.result, a, o, i), n.result = void 0) : l.then((c) => {
        ui(s, c, a, o, i);
      }).catch((c) => Ie(c, i, t)).finally(() => n.result = void 0);
    }
  };
}
function ui(e, t, i, n, s) {
  if (si && typeof t == "function") {
    let r = t.apply(i, n);
    r instanceof Promise ? r.then((o) => ui(e, o, i, n)).catch((o) => Ie(o, s, t)) : e(r);
  } else
    typeof t == "object" && t instanceof Promise ? t.then((r) => e(r)) : e(t);
}
var Cn = "x-";
function ce(e = "") {
  return Cn + e;
}
function Aa(e) {
  Cn = e;
}
var Yi = {};
function Y(e, t) {
  return Yi[e] = t, {
    before(i) {
      if (!Yi[i]) {
        console.warn(
          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
        );
        return;
      }
      const n = Vt.indexOf(i);
      Vt.splice(n >= 0 ? n : Vt.indexOf("DEFAULT"), 0, e);
    }
  };
}
function Tn(e, t, i) {
  if (t = Array.from(t), e._x_virtualDirectives) {
    let r = Object.entries(e._x_virtualDirectives).map(([a, l]) => ({ name: a, value: l })), o = Er(r);
    r = r.map((a) => o.find((l) => l.name === a.name) ? {
      name: `x-bind:${a.name}`,
      value: `"${a.value}"`
    } : a), t = t.concat(r);
  }
  let n = {};
  return t.map(Pr((r, o) => n[r] = o)).filter(Cr).map(Ia(n, i)).sort(Ca).map((r) => Pa(e, r));
}
function Er(e) {
  return Array.from(e).map(Pr()).filter((t) => !Cr(t));
}
var Ji = !1, _e = /* @__PURE__ */ new Map(), Sr = Symbol();
function xa(e) {
  Ji = !0;
  let t = Symbol();
  Sr = t, _e.set(t, []);
  let i = () => {
    for (; _e.get(t).length; )
      _e.get(t).shift()();
    _e.delete(t);
  }, n = () => {
    Ji = !1, i();
  };
  e(i), n();
}
function br(e) {
  let t = [], i = (a) => t.push(a), [n, s] = la(e);
  return t.push(s), [{
    Alpine: Be,
    effect: n,
    cleanup: i,
    evaluateLater: et.bind(et, e),
    evaluate: Ut.bind(Ut, e)
  }, () => t.forEach((a) => a())];
}
function Pa(e, t) {
  let i = () => {
  }, n = Yi[t.type] || i, [s, r] = br(e);
  hr(e, t.original, r);
  let o = () => {
    e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, s), n = n.bind(n, e, t, s), Ji ? _e.get(Sr).push(n) : n());
  };
  return o.runCleanups = r, o;
}
var Ar = (e, t) => ({ name: i, value: n }) => (i.startsWith(e) && (i = i.replace(e, t)), { name: i, value: n }), xr = (e) => e;
function Pr(e = () => {
}) {
  return ({ name: t, value: i }) => {
    let { name: n, value: s } = Ir.reduce((r, o) => o(r), { name: t, value: i });
    return n !== t && e(n, t), { name: n, value: s };
  };
}
var Ir = [];
function Ln(e) {
  Ir.push(e);
}
function Cr({ name: e }) {
  return Tr().test(e);
}
var Tr = () => new RegExp(`^${Cn}([^:^.]+)\\b`);
function Ia(e, t) {
  return ({ name: i, value: n }) => {
    let s = i.match(Tr()), r = i.match(/:([a-zA-Z0-9\-:]+)/), o = i.match(/\.[^.\]]+(?=[^\]]*$)/g) || [], a = t || e[i] || i;
    return {
      type: s ? s[1] : null,
      value: r ? r[1] : null,
      modifiers: o.map((l) => l.replace(".", "")),
      expression: n,
      original: a
    };
  };
}
var Qi = "DEFAULT", Vt = [
  "ignore",
  "ref",
  "data",
  "id",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  Qi,
  "teleport"
];
function Ca(e, t) {
  let i = Vt.indexOf(e.type) === -1 ? Qi : e.type, n = Vt.indexOf(t.type) === -1 ? Qi : t.type;
  return Vt.indexOf(i) - Vt.indexOf(n);
}
var tn = [], On = !1;
function Dn(e = () => {
}) {
  return queueMicrotask(() => {
    On || setTimeout(() => {
      en();
    });
  }), new Promise((t) => {
    tn.push(() => {
      e(), t();
    });
  });
}
function en() {
  for (On = !1; tn.length; )
    tn.shift()();
}
function Ta() {
  On = !0;
}
function Rn(e, t) {
  return Array.isArray(t) ? ls(e, t.join(" ")) : typeof t == "object" && t !== null ? La(e, t) : typeof t == "function" ? Rn(e, t()) : ls(e, t);
}
function ls(e, t) {
  let i = (s) => s.split(" ").filter((r) => !e.classList.contains(r)).filter(Boolean), n = (s) => (e.classList.add(...s), () => {
    e.classList.remove(...s);
  });
  return t = t === !0 ? t = "" : t || "", n(i(t));
}
function La(e, t) {
  let i = (a) => a.split(" ").filter(Boolean), n = Object.entries(t).flatMap(([a, l]) => l ? i(a) : !1).filter(Boolean), s = Object.entries(t).flatMap(([a, l]) => l ? !1 : i(a)).filter(Boolean), r = [], o = [];
  return s.forEach((a) => {
    e.classList.contains(a) && (e.classList.remove(a), o.push(a));
  }), n.forEach((a) => {
    e.classList.contains(a) || (e.classList.add(a), r.push(a));
  }), () => {
    o.forEach((a) => e.classList.add(a)), r.forEach((a) => e.classList.remove(a));
  };
}
function wi(e, t) {
  return typeof t == "object" && t !== null ? Oa(e, t) : Da(e, t);
}
function Oa(e, t) {
  let i = {};
  return Object.entries(t).forEach(([n, s]) => {
    i[n] = e.style[n], n.startsWith("--") || (n = Ra(n)), e.style.setProperty(n, s);
  }), setTimeout(() => {
    e.style.length === 0 && e.removeAttribute("style");
  }), () => {
    wi(e, i);
  };
}
function Da(e, t) {
  let i = e.getAttribute("style", t);
  return e.setAttribute("style", t), () => {
    e.setAttribute("style", i || "");
  };
}
function Ra(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function nn(e, t = () => {
}) {
  let i = !1;
  return function() {
    i ? t.apply(this, arguments) : (i = !0, e.apply(this, arguments));
  };
}
Y("transition", (e, { value: t, modifiers: i, expression: n }, { evaluate: s }) => {
  typeof n == "function" && (n = s(n)), n !== !1 && (!n || typeof n == "boolean" ? za(e, i, t) : Ma(e, n, t));
});
function Ma(e, t, i) {
  Lr(e, Rn, ""), {
    enter: (s) => {
      e._x_transition.enter.during = s;
    },
    "enter-start": (s) => {
      e._x_transition.enter.start = s;
    },
    "enter-end": (s) => {
      e._x_transition.enter.end = s;
    },
    leave: (s) => {
      e._x_transition.leave.during = s;
    },
    "leave-start": (s) => {
      e._x_transition.leave.start = s;
    },
    "leave-end": (s) => {
      e._x_transition.leave.end = s;
    }
  }[i](t);
}
function za(e, t, i) {
  Lr(e, wi);
  let n = !t.includes("in") && !t.includes("out") && !i, s = n || t.includes("in") || ["enter"].includes(i), r = n || t.includes("out") || ["leave"].includes(i);
  t.includes("in") && !n && (t = t.filter((g, _) => _ < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((g, _) => _ > t.indexOf("out")));
  let o = !t.includes("opacity") && !t.includes("scale"), a = o || t.includes("opacity"), l = o || t.includes("scale"), c = a ? 0 : 1, u = l ? pe(t, "scale", 95) / 100 : 1, d = pe(t, "delay", 0) / 1e3, h = pe(t, "origin", "center"), m = "opacity, transform", f = pe(t, "duration", 150) / 1e3, v = pe(t, "duration", 75) / 1e3, p = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  s && (e._x_transition.enter.during = {
    transformOrigin: h,
    transitionDelay: `${d}s`,
    transitionProperty: m,
    transitionDuration: `${f}s`,
    transitionTimingFunction: p
  }, e._x_transition.enter.start = {
    opacity: c,
    transform: `scale(${u})`
  }, e._x_transition.enter.end = {
    opacity: 1,
    transform: "scale(1)"
  }), r && (e._x_transition.leave.during = {
    transformOrigin: h,
    transitionDelay: `${d}s`,
    transitionProperty: m,
    transitionDuration: `${v}s`,
    transitionTimingFunction: p
  }, e._x_transition.leave.start = {
    opacity: 1,
    transform: "scale(1)"
  }, e._x_transition.leave.end = {
    opacity: c,
    transform: `scale(${u})`
  });
}
function Lr(e, t, i = {}) {
  e._x_transition || (e._x_transition = {
    enter: { during: i, start: i, end: i },
    leave: { during: i, start: i, end: i },
    in(n = () => {
    }, s = () => {
    }) {
      sn(e, t, {
        during: this.enter.during,
        start: this.enter.start,
        end: this.enter.end
      }, n, s);
    },
    out(n = () => {
    }, s = () => {
    }) {
      sn(e, t, {
        during: this.leave.during,
        start: this.leave.start,
        end: this.leave.end
      }, n, s);
    }
  });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(e, t, i, n) {
  const s = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let r = () => s(i);
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave) ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length) ? e._x_transition.in(i) : r() : e._x_transition ? e._x_transition.in(i) : r();
    return;
  }
  e._x_hidePromise = e._x_transition ? new Promise((o, a) => {
    e._x_transition.out(() => {
    }, () => o(n)), e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 }));
  }) : Promise.resolve(n), queueMicrotask(() => {
    let o = Or(e);
    o ? (o._x_hideChildren || (o._x_hideChildren = []), o._x_hideChildren.push(e)) : s(() => {
      let a = (l) => {
        let c = Promise.all([
          l._x_hidePromise,
          ...(l._x_hideChildren || []).map(a)
        ]).then(([u]) => u());
        return delete l._x_hidePromise, delete l._x_hideChildren, c;
      };
      a(e).catch((l) => {
        if (!l.isFromCancelledTransition)
          throw l;
      });
    });
  });
};
function Or(e) {
  let t = e.parentNode;
  if (t)
    return t._x_hidePromise ? t : Or(t);
}
function sn(e, t, { during: i, start: n, end: s } = {}, r = () => {
}, o = () => {
}) {
  if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(i).length === 0 && Object.keys(n).length === 0 && Object.keys(s).length === 0) {
    r(), o();
    return;
  }
  let a, l, c;
  Na(e, {
    start() {
      a = t(e, n);
    },
    during() {
      l = t(e, i);
    },
    before: r,
    end() {
      a(), c = t(e, s);
    },
    after: o,
    cleanup() {
      l(), c();
    }
  });
}
function Na(e, t) {
  let i, n, s, r = nn(() => {
    Q(() => {
      i = !0, n || t.before(), s || (t.end(), en()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
    });
  });
  e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(o) {
      this.beforeCancels.push(o);
    },
    cancel: nn(function() {
      for (; this.beforeCancels.length; )
        this.beforeCancels.shift()();
      r();
    }),
    finish: r
  }, Q(() => {
    t.start(), t.during();
  }), Ta(), requestAnimationFrame(() => {
    if (i)
      return;
    let o = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3, a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    o === 0 && (o = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), Q(() => {
      t.before();
    }), n = !0, requestAnimationFrame(() => {
      i || (Q(() => {
        t.end();
      }), en(), setTimeout(e._x_transitioning.finish, o + a), s = !0);
    });
  });
}
function pe(e, t, i) {
  if (e.indexOf(t) === -1)
    return i;
  const n = e[e.indexOf(t) + 1];
  if (!n || t === "scale" && isNaN(n))
    return i;
  if (t === "duration" || t === "delay") {
    let s = n.match(/([0-9]+)ms/);
    if (s)
      return s[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n;
}
var Ot = !1;
function Ei(e, t = () => {
}) {
  return (...i) => Ot ? t(...i) : e(...i);
}
function Fa(e) {
  return (...t) => Ot && e(...t);
}
function $a(e, t) {
  e._x_dataStack && (t._x_dataStack = e._x_dataStack, t.setAttribute("data-has-alpine-state", !0)), Ot = !0, Dr(() => {
    xt(t, (i, n) => {
      n(i, () => {
      });
    });
  }), Ot = !1;
}
var rn = !1;
function Za(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack), Ot = !0, rn = !0, Dr(() => {
    Ba(t);
  }), Ot = !1, rn = !1;
}
function Ba(e) {
  let t = !1;
  xt(e, (n, s) => {
    Tt(n, (r, o) => {
      if (t && ua(r))
        return o();
      t = !0, s(r, o);
    });
  });
}
function Dr(e) {
  let t = le;
  os((i, n) => {
    let s = t(i);
    return Fe(s), () => {
    };
  }), e(), os(t);
}
function ka(e) {
  return Ot ? rn ? !0 : e.hasAttribute("data-has-alpine-state") : !1;
}
function Rr(e, t, i, n = []) {
  switch (e._x_bindings || (e._x_bindings = ae({})), e._x_bindings[t] = i, t = n.includes("camel") ? ja(t) : t, t) {
    case "value":
      Va(e, i);
      break;
    case "style":
      Ha(e, i);
      break;
    case "class":
      Wa(e, i);
      break;
    case "selected":
    case "checked":
      Ua(e, t, i);
      break;
    default:
      Mr(e, t, i);
      break;
  }
}
function Va(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = cs(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t) ? e.value = t : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some((i) => cs(i, e.value)) : e.checked = !!t;
  else if (e.tagName === "SELECT")
    qa(e, t);
  else {
    if (e.value === t)
      return;
    e.value = t === void 0 ? "" : t;
  }
}
function Wa(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = Rn(e, t);
}
function Ha(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = wi(e, t);
}
function Ua(e, t, i) {
  Mr(e, t, i), Ga(e, t, i);
}
function Mr(e, t, i) {
  [null, void 0, !1].includes(i) && Xa(t) ? e.removeAttribute(t) : (zr(t) && (i = t), Ka(e, t, i));
}
function Ka(e, t, i) {
  e.getAttribute(t) != i && e.setAttribute(t, i);
}
function Ga(e, t, i) {
  e[t] !== i && (e[t] = i);
}
function qa(e, t) {
  const i = [].concat(t).map((n) => n + "");
  Array.from(e.options).forEach((n) => {
    n.selected = i.includes(n.value);
  });
}
function ja(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, i) => i.toUpperCase());
}
function cs(e, t) {
  return e == t;
}
function zr(e) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ].includes(e);
}
function Xa(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function Ya(e, t, i) {
  return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : Nr(e, t, i);
}
function Ja(e, t, i, n = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0)
    return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
    let s = e._x_inlineBindings[t];
    return s.extract = n, gr(() => Ut(e, s.expression));
  }
  return Nr(e, t, i);
}
function Nr(e, t, i) {
  let n = e.getAttribute(t);
  return n === null ? typeof i == "function" ? i() : i : n === "" ? !0 : zr(t) ? !![t, "true"].includes(n) : n;
}
function Fr(e, t) {
  var i;
  return function() {
    var n = this, s = arguments, r = function() {
      i = null, e.apply(n, s);
    };
    clearTimeout(i), i = setTimeout(r, t);
  };
}
function $r(e, t) {
  let i;
  return function() {
    let n = this, s = arguments;
    i || (e.apply(n, s), i = !0, setTimeout(() => i = !1, t));
  };
}
function Zr({ get: e, set: t }, { get: i, set: n }) {
  let s = !0, r, o, a, l = le(() => {
    let c, u;
    s ? (c = e(), n(JSON.parse(JSON.stringify(c))), u = i(), s = !1) : (c = e(), u = i(), o = JSON.stringify(c), a = JSON.stringify(u), o !== r ? (u = i(), n(c), u = c) : (t(JSON.parse(a ?? null)), c = u)), r = JSON.stringify(c), JSON.stringify(u);
  });
  return () => {
    Fe(l);
  };
}
function Qa(e) {
  (Array.isArray(e) ? e : [e]).forEach((i) => i(Be));
}
var kt = {}, us = !1;
function tl(e, t) {
  if (us || (kt = ae(kt), us = !0), t === void 0)
    return kt[e];
  kt[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && kt[e].init(), mr(kt[e]);
}
function el() {
  return kt;
}
var Br = {};
function il(e, t) {
  let i = typeof t != "function" ? () => t : t;
  return e instanceof Element ? kr(e, i()) : (Br[e] = i, () => {
  });
}
function nl(e) {
  return Object.entries(Br).forEach(([t, i]) => {
    Object.defineProperty(e, t, {
      get() {
        return (...n) => i(...n);
      }
    });
  }), e;
}
function kr(e, t, i) {
  let n = [];
  for (; n.length; )
    n.pop()();
  let s = Object.entries(t).map(([o, a]) => ({ name: o, value: a })), r = Er(s);
  return s = s.map((o) => r.find((a) => a.name === o.name) ? {
    name: `x-bind:${o.name}`,
    value: `"${o.value}"`
  } : o), Tn(e, s, i).map((o) => {
    n.push(o.runCleanups), o();
  }), () => {
    for (; n.length; )
      n.pop()();
  };
}
var Vr = {};
function sl(e, t) {
  Vr[e] = t;
}
function rl(e, t) {
  return Object.entries(Vr).forEach(([i, n]) => {
    Object.defineProperty(e, i, {
      get() {
        return (...s) => n.bind(t)(...s);
      },
      enumerable: !1
    });
  }), e;
}
var ol = {
  get reactive() {
    return ae;
  },
  get release() {
    return Fe;
  },
  get effect() {
    return le;
  },
  get raw() {
    return tr;
  },
  version: "3.13.0",
  flushAndStopDeferringMutations: _a,
  dontAutoEvaluateFunctions: gr,
  disableEffectScheduling: oa,
  startObservingMutations: xn,
  stopObservingMutations: fr,
  setReactivityEngine: aa,
  onAttributeRemoved: hr,
  onAttributesAdded: ur,
  closestDataStack: ne,
  skipDuringClone: Ei,
  onlyDuringClone: Fa,
  addRootSelector: sr,
  addInitSelector: rr,
  addScopeToNode: $e,
  deferMutations: va,
  mapAttributes: Ln,
  evaluateLater: et,
  interceptInit: ha,
  setEvaluator: wa,
  mergeProxies: Ze,
  extractProp: Ja,
  findClosest: yi,
  onElRemoved: Sn,
  closestRoot: gi,
  destroyTree: En,
  interceptor: vr,
  // INTERNAL: not public API and is subject to change without major release.
  transition: sn,
  // INTERNAL
  setStyles: wi,
  // INTERNAL
  mutateDom: Q,
  directive: Y,
  entangle: Zr,
  throttle: $r,
  debounce: Fr,
  evaluate: Ut,
  initTree: xt,
  nextTick: Dn,
  prefixed: ce,
  prefix: Aa,
  plugin: Qa,
  magic: mt,
  store: tl,
  start: ca,
  clone: Za,
  // INTERNAL
  cloneNode: $a,
  // INTERNAL
  bound: Ya,
  $data: pr,
  walk: Tt,
  data: sl,
  bind: il
}, Be = ol;
function al(e, t) {
  const i = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let s = 0; s < n.length; s++)
    i[n[s]] = !0;
  return t ? (s) => !!i[s.toLowerCase()] : (s) => !!i[s];
}
var ll = Object.freeze({}), cl = Object.prototype.hasOwnProperty, Si = (e, t) => cl.call(e, t), Kt = Array.isArray, be = (e) => Wr(e) === "[object Map]", ul = (e) => typeof e == "string", Mn = (e) => typeof e == "symbol", bi = (e) => e !== null && typeof e == "object", hl = Object.prototype.toString, Wr = (e) => hl.call(e), Hr = (e) => Wr(e).slice(8, -1), zn = (e) => ul(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, dl = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (i) => t[i] || (t[i] = e(i));
}, fl = dl((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ur = (e, t) => e !== t && (e === e || t === t), on = /* @__PURE__ */ new WeakMap(), me = [], _t, Gt = Symbol("iterate"), an = Symbol("Map key iterate");
function pl(e) {
  return e && e._isEffect === !0;
}
function ml(e, t = ll) {
  pl(e) && (e = e.raw);
  const i = gl(e, t);
  return t.lazy || i(), i;
}
function vl(e) {
  e.active && (Kr(e), e.options.onStop && e.options.onStop(), e.active = !1);
}
var _l = 0;
function gl(e, t) {
  const i = function() {
    if (!i.active)
      return e();
    if (!me.includes(i)) {
      Kr(i);
      try {
        return wl(), me.push(i), _t = i, e();
      } finally {
        me.pop(), Gr(), _t = me[me.length - 1];
      }
    }
  };
  return i.id = _l++, i.allowRecurse = !!t.allowRecurse, i._isEffect = !0, i.active = !0, i.raw = e, i.deps = [], i.options = t, i;
}
function Kr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let i = 0; i < t.length; i++)
      t[i].delete(e);
    t.length = 0;
  }
}
var se = !0, Nn = [];
function yl() {
  Nn.push(se), se = !1;
}
function wl() {
  Nn.push(se), se = !0;
}
function Gr() {
  const e = Nn.pop();
  se = e === void 0 ? !0 : e;
}
function pt(e, t, i) {
  if (!se || _t === void 0)
    return;
  let n = on.get(e);
  n || on.set(e, n = /* @__PURE__ */ new Map());
  let s = n.get(i);
  s || n.set(i, s = /* @__PURE__ */ new Set()), s.has(_t) || (s.add(_t), _t.deps.push(s), _t.options.onTrack && _t.options.onTrack({
    effect: _t,
    target: e,
    type: t,
    key: i
  }));
}
function Dt(e, t, i, n, s, r) {
  const o = on.get(e);
  if (!o)
    return;
  const a = /* @__PURE__ */ new Set(), l = (u) => {
    u && u.forEach((d) => {
      (d !== _t || d.allowRecurse) && a.add(d);
    });
  };
  if (t === "clear")
    o.forEach(l);
  else if (i === "length" && Kt(e))
    o.forEach((u, d) => {
      (d === "length" || d >= n) && l(u);
    });
  else
    switch (i !== void 0 && l(o.get(i)), t) {
      case "add":
        Kt(e) ? zn(i) && l(o.get("length")) : (l(o.get(Gt)), be(e) && l(o.get(an)));
        break;
      case "delete":
        Kt(e) || (l(o.get(Gt)), be(e) && l(o.get(an)));
        break;
      case "set":
        be(e) && l(o.get(Gt));
        break;
    }
  const c = (u) => {
    u.options.onTrigger && u.options.onTrigger({
      effect: u,
      target: e,
      key: i,
      type: t,
      newValue: n,
      oldValue: s,
      oldTarget: r
    }), u.options.scheduler ? u.options.scheduler(u) : u();
  };
  a.forEach(c);
}
var El = /* @__PURE__ */ al("__proto__,__v_isRef,__isVue"), qr = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(Mn)), Sl = /* @__PURE__ */ jr(), bl = /* @__PURE__ */ jr(!0), hs = /* @__PURE__ */ Al();
function Al() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...i) {
      const n = K(this);
      for (let r = 0, o = this.length; r < o; r++)
        pt(n, "get", r + "");
      const s = n[t](...i);
      return s === -1 || s === !1 ? n[t](...i.map(K)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...i) {
      yl();
      const n = K(this)[t].apply(this, i);
      return Gr(), n;
    };
  }), e;
}
function jr(e = !1, t = !1) {
  return function(n, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_raw" && r === (e ? t ? Bl : Qr : t ? Zl : Jr).get(n))
      return n;
    const o = Kt(n);
    if (!e && o && Si(hs, s))
      return Reflect.get(hs, s, r);
    const a = Reflect.get(n, s, r);
    return (Mn(s) ? qr.has(s) : El(s)) || (e || pt(n, "get", s), t) ? a : ln(a) ? !o || !zn(s) ? a.value : a : bi(a) ? e ? to(a) : Bn(a) : a;
  };
}
var xl = /* @__PURE__ */ Pl();
function Pl(e = !1) {
  return function(i, n, s, r) {
    let o = i[n];
    if (!e && (s = K(s), o = K(o), !Kt(i) && ln(o) && !ln(s)))
      return o.value = s, !0;
    const a = Kt(i) && zn(n) ? Number(n) < i.length : Si(i, n), l = Reflect.set(i, n, s, r);
    return i === K(r) && (a ? Ur(s, o) && Dt(i, "set", n, s, o) : Dt(i, "add", n, s)), l;
  };
}
function Il(e, t) {
  const i = Si(e, t), n = e[t], s = Reflect.deleteProperty(e, t);
  return s && i && Dt(e, "delete", t, void 0, n), s;
}
function Cl(e, t) {
  const i = Reflect.has(e, t);
  return (!Mn(t) || !qr.has(t)) && pt(e, "has", t), i;
}
function Tl(e) {
  return pt(e, "iterate", Kt(e) ? "length" : Gt), Reflect.ownKeys(e);
}
var Ll = {
  get: Sl,
  set: xl,
  deleteProperty: Il,
  has: Cl,
  ownKeys: Tl
}, Ol = {
  get: bl,
  set(e, t) {
    return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Fn = (e) => bi(e) ? Bn(e) : e, $n = (e) => bi(e) ? to(e) : e, Zn = (e) => e, Ai = (e) => Reflect.getPrototypeOf(e);
function Ye(e, t, i = !1, n = !1) {
  e = e.__v_raw;
  const s = K(e), r = K(t);
  t !== r && !i && pt(s, "get", t), !i && pt(s, "get", r);
  const { has: o } = Ai(s), a = n ? Zn : i ? $n : Fn;
  if (o.call(s, t))
    return a(e.get(t));
  if (o.call(s, r))
    return a(e.get(r));
  e !== s && e.get(t);
}
function Je(e, t = !1) {
  const i = this.__v_raw, n = K(i), s = K(e);
  return e !== s && !t && pt(n, "has", e), !t && pt(n, "has", s), e === s ? i.has(e) : i.has(e) || i.has(s);
}
function Qe(e, t = !1) {
  return e = e.__v_raw, !t && pt(K(e), "iterate", Gt), Reflect.get(e, "size", e);
}
function ds(e) {
  e = K(e);
  const t = K(this);
  return Ai(t).has.call(t, e) || (t.add(e), Dt(t, "add", e, e)), this;
}
function fs(e, t) {
  t = K(t);
  const i = K(this), { has: n, get: s } = Ai(i);
  let r = n.call(i, e);
  r ? Yr(i, n, e) : (e = K(e), r = n.call(i, e));
  const o = s.call(i, e);
  return i.set(e, t), r ? Ur(t, o) && Dt(i, "set", e, t, o) : Dt(i, "add", e, t), this;
}
function ps(e) {
  const t = K(this), { has: i, get: n } = Ai(t);
  let s = i.call(t, e);
  s ? Yr(t, i, e) : (e = K(e), s = i.call(t, e));
  const r = n ? n.call(t, e) : void 0, o = t.delete(e);
  return s && Dt(t, "delete", e, void 0, r), o;
}
function ms() {
  const e = K(this), t = e.size !== 0, i = be(e) ? new Map(e) : new Set(e), n = e.clear();
  return t && Dt(e, "clear", void 0, void 0, i), n;
}
function ti(e, t) {
  return function(n, s) {
    const r = this, o = r.__v_raw, a = K(o), l = t ? Zn : e ? $n : Fn;
    return !e && pt(a, "iterate", Gt), o.forEach((c, u) => n.call(s, l(c), l(u), r));
  };
}
function ei(e, t, i) {
  return function(...n) {
    const s = this.__v_raw, r = K(s), o = be(r), a = e === "entries" || e === Symbol.iterator && o, l = e === "keys" && o, c = s[e](...n), u = i ? Zn : t ? $n : Fn;
    return !t && pt(r, "iterate", l ? an : Gt), {
      // iterator protocol
      next() {
        const { value: d, done: h } = c.next();
        return h ? { value: d, done: h } : {
          value: a ? [u(d[0]), u(d[1])] : u(d),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function It(e) {
  return function(...t) {
    {
      const i = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${fl(e)} operation ${i}failed: target is readonly.`, K(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Dl() {
  const e = {
    get(r) {
      return Ye(this, r);
    },
    get size() {
      return Qe(this);
    },
    has: Je,
    add: ds,
    set: fs,
    delete: ps,
    clear: ms,
    forEach: ti(!1, !1)
  }, t = {
    get(r) {
      return Ye(this, r, !1, !0);
    },
    get size() {
      return Qe(this);
    },
    has: Je,
    add: ds,
    set: fs,
    delete: ps,
    clear: ms,
    forEach: ti(!1, !0)
  }, i = {
    get(r) {
      return Ye(this, r, !0);
    },
    get size() {
      return Qe(this, !0);
    },
    has(r) {
      return Je.call(this, r, !0);
    },
    add: It(
      "add"
      /* ADD */
    ),
    set: It(
      "set"
      /* SET */
    ),
    delete: It(
      "delete"
      /* DELETE */
    ),
    clear: It(
      "clear"
      /* CLEAR */
    ),
    forEach: ti(!0, !1)
  }, n = {
    get(r) {
      return Ye(this, r, !0, !0);
    },
    get size() {
      return Qe(this, !0);
    },
    has(r) {
      return Je.call(this, r, !0);
    },
    add: It(
      "add"
      /* ADD */
    ),
    set: It(
      "set"
      /* SET */
    ),
    delete: It(
      "delete"
      /* DELETE */
    ),
    clear: It(
      "clear"
      /* CLEAR */
    ),
    forEach: ti(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = ei(r, !1, !1), i[r] = ei(r, !0, !1), t[r] = ei(r, !1, !0), n[r] = ei(r, !0, !0);
  }), [
    e,
    i,
    t,
    n
  ];
}
var [Rl, Ml, zl, Nl] = /* @__PURE__ */ Dl();
function Xr(e, t) {
  const i = t ? e ? Nl : zl : e ? Ml : Rl;
  return (n, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? n : Reflect.get(Si(i, s) && s in n ? i : n, s, r);
}
var Fl = {
  get: /* @__PURE__ */ Xr(!1, !1)
}, $l = {
  get: /* @__PURE__ */ Xr(!0, !1)
};
function Yr(e, t, i) {
  const n = K(i);
  if (n !== i && t.call(e, n)) {
    const s = Hr(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var Jr = /* @__PURE__ */ new WeakMap(), Zl = /* @__PURE__ */ new WeakMap(), Qr = /* @__PURE__ */ new WeakMap(), Bl = /* @__PURE__ */ new WeakMap();
function kl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Vl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : kl(Hr(e));
}
function Bn(e) {
  return e && e.__v_isReadonly ? e : eo(e, !1, Ll, Fl, Jr);
}
function to(e) {
  return eo(e, !0, Ol, $l, Qr);
}
function eo(e, t, i, n, s) {
  if (!bi(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const o = Vl(e);
  if (o === 0)
    return e;
  const a = new Proxy(e, o === 2 ? n : i);
  return s.set(e, a), a;
}
function K(e) {
  return e && K(e.__v_raw) || e;
}
function ln(e) {
  return !!(e && e.__v_isRef === !0);
}
mt("nextTick", () => Dn);
mt("dispatch", (e) => Ee.bind(Ee, e));
mt("watch", (e, { evaluateLater: t, effect: i }) => (n, s) => {
  let r = t(n), o = !0, a, l = i(() => r((c) => {
    JSON.stringify(c), o ? a = c : queueMicrotask(() => {
      s(c, a), a = c;
    }), o = !1;
  }));
  e._x_effects.delete(l);
});
mt("store", el);
mt("data", (e) => pr(e));
mt("root", (e) => gi(e));
mt("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = Ze(Wl(e))), e._x_refs_proxy));
function Wl(e) {
  let t = [], i = e;
  for (; i; )
    i._x_refs && t.push(i._x_refs), i = i.parentNode;
  return t;
}
var Zi = {};
function io(e) {
  return Zi[e] || (Zi[e] = 0), ++Zi[e];
}
function Hl(e, t) {
  return yi(e, (i) => {
    if (i._x_ids && i._x_ids[t])
      return !0;
  });
}
function Ul(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = io(t));
}
mt("id", (e) => (t, i = null) => {
  let n = Hl(e, t), s = n ? n._x_ids[t] : io(t);
  return i ? `${t}-${s}-${i}` : `${t}-${s}`;
});
mt("el", (e) => e);
no("Focus", "focus", "focus");
no("Persist", "persist", "persist");
function no(e, t, i) {
  mt(t, (n) => Lt(`You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${i}`, n));
}
Y("modelable", (e, { expression: t }, { effect: i, evaluateLater: n, cleanup: s }) => {
  let r = n(t), o = () => {
    let u;
    return r((d) => u = d), u;
  }, a = n(`${t} = __placeholder`), l = (u) => a(() => {
  }, { scope: { __placeholder: u } }), c = o();
  l(c), queueMicrotask(() => {
    if (!e._x_model)
      return;
    e._x_removeModelListeners.default();
    let u = e._x_model.get, d = e._x_model.set, h = Zr(
      {
        get() {
          return u();
        },
        set(m) {
          d(m);
        }
      },
      {
        get() {
          return o();
        },
        set(m) {
          l(m);
        }
      }
    );
    s(h);
  });
});
var Kl = document.createElement("div");
Y("teleport", (e, { modifiers: t, expression: i }, { cleanup: n }) => {
  e.tagName.toLowerCase() !== "template" && Lt("x-teleport can only be used on a <template> tag", e);
  let s = Ei(() => document.querySelector(i), () => Kl)();
  s || Lt(`Cannot find x-teleport element for selector: "${i}"`);
  let r = e.content.cloneNode(!0).firstElementChild;
  e._x_teleport = r, r._x_teleportBack = e, e._x_forwardEvents && e._x_forwardEvents.forEach((o) => {
    r.addEventListener(o, (a) => {
      a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
    });
  }), $e(r, {}, e), Q(() => {
    t.includes("prepend") ? s.parentNode.insertBefore(r, s) : t.includes("append") ? s.parentNode.insertBefore(r, s.nextSibling) : s.appendChild(r), xt(r), r._x_ignore = !0;
  }), n(() => r.remove());
});
var so = () => {
};
so.inline = (e, { modifiers: t }, { cleanup: i }) => {
  t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, i(() => {
    t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
  });
};
Y("ignore", so);
Y("effect", (e, { expression: t }, { effect: i }) => i(et(e, t)));
function cn(e, t, i, n) {
  let s = e, r = (l) => n(l), o = {}, a = (l, c) => (u) => c(l, u);
  if (i.includes("dot") && (t = Gl(t)), i.includes("camel") && (t = ql(t)), i.includes("passive") && (o.passive = !0), i.includes("capture") && (o.capture = !0), i.includes("window") && (s = window), i.includes("document") && (s = document), i.includes("debounce")) {
    let l = i[i.indexOf("debounce") + 1] || "invalid-wait", c = hi(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    r = Fr(r, c);
  }
  if (i.includes("throttle")) {
    let l = i[i.indexOf("throttle") + 1] || "invalid-wait", c = hi(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
    r = $r(r, c);
  }
  return i.includes("prevent") && (r = a(r, (l, c) => {
    c.preventDefault(), l(c);
  })), i.includes("stop") && (r = a(r, (l, c) => {
    c.stopPropagation(), l(c);
  })), i.includes("self") && (r = a(r, (l, c) => {
    c.target === e && l(c);
  })), (i.includes("away") || i.includes("outside")) && (s = document, r = a(r, (l, c) => {
    e.contains(c.target) || c.target.isConnected !== !1 && (e.offsetWidth < 1 && e.offsetHeight < 1 || e._x_isShown !== !1 && l(c));
  })), i.includes("once") && (r = a(r, (l, c) => {
    l(c), s.removeEventListener(t, r, o);
  })), r = a(r, (l, c) => {
    Xl(t) && Yl(c, i) || l(c);
  }), s.addEventListener(t, r, o), () => {
    s.removeEventListener(t, r, o);
  };
}
function Gl(e) {
  return e.replace(/-/g, ".");
}
function ql(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, i) => i.toUpperCase());
}
function hi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function jl(e) {
  return [" ", "_"].includes(
    e
  ) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function Xl(e) {
  return ["keydown", "keyup"].includes(e);
}
function Yl(e, t) {
  let i = t.filter((r) => !["window", "document", "prevent", "stop", "once", "capture"].includes(r));
  if (i.includes("debounce")) {
    let r = i.indexOf("debounce");
    i.splice(r, hi((i[r + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (i.includes("throttle")) {
    let r = i.indexOf("throttle");
    i.splice(r, hi((i[r + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (i.length === 0 || i.length === 1 && vs(e.key).includes(i[0]))
    return !1;
  const s = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((r) => i.includes(r));
  return i = i.filter((r) => !s.includes(r)), !(s.length > 0 && s.filter((o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`])).length === s.length && vs(e.key).includes(i[0]));
}
function vs(e) {
  if (!e)
    return [];
  e = jl(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: " ",
    spacebar: " ",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "=",
    minus: "-",
    underscore: "_"
  };
  return t[e] = e, Object.keys(t).map((i) => {
    if (t[i] === e)
      return i;
  }).filter((i) => i);
}
Y("model", (e, { modifiers: t, expression: i }, { effect: n, cleanup: s }) => {
  let r = e;
  t.includes("parent") && (r = e.parentNode);
  let o = et(r, i), a;
  typeof i == "string" ? a = et(r, `${i} = __placeholder`) : typeof i == "function" && typeof i() == "string" ? a = et(r, `${i()} = __placeholder`) : a = () => {
  };
  let l = () => {
    let h;
    return o((m) => h = m), _s(h) ? h.get() : h;
  }, c = (h) => {
    let m;
    o((f) => m = f), _s(m) ? m.set(h) : a(() => {
    }, {
      scope: { __placeholder: h }
    });
  };
  typeof i == "string" && e.type === "radio" && Q(() => {
    e.hasAttribute("name") || e.setAttribute("name", i);
  });
  var u = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let d = Ot ? () => {
  } : cn(e, u, t, (h) => {
    c(Jl(e, t, h, l()));
  });
  if (t.includes("fill") && ([null, ""].includes(l()) || e.type === "checkbox" && Array.isArray(l())) && e.dispatchEvent(new Event(u, {})), e._x_removeModelListeners || (e._x_removeModelListeners = {}), e._x_removeModelListeners.default = d, s(() => e._x_removeModelListeners.default()), e.form) {
    let h = cn(e.form, "reset", [], (m) => {
      Dn(() => e._x_model && e._x_model.set(e.value));
    });
    s(() => h());
  }
  e._x_model = {
    get() {
      return l();
    },
    set(h) {
      c(h);
    }
  }, e._x_forceModelUpdate = (h) => {
    h === void 0 && typeof i == "string" && i.match(/\./) && (h = ""), window.fromModel = !0, Q(() => Rr(e, "value", h)), delete window.fromModel;
  }, n(() => {
    let h = l();
    t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate(h);
  });
});
function Jl(e, t, i, n) {
  return Q(() => {
    if (i instanceof CustomEvent && i.detail !== void 0)
      return i.detail ?? i.target.value;
    if (e.type === "checkbox")
      if (Array.isArray(n)) {
        let s = t.includes("number") ? Bi(i.target.value) : i.target.value;
        return i.target.checked ? n.concat([s]) : n.filter((r) => !Ql(r, s));
      } else
        return i.target.checked;
    else {
      if (e.tagName.toLowerCase() === "select" && e.multiple)
        return t.includes("number") ? Array.from(i.target.selectedOptions).map((s) => {
          let r = s.value || s.text;
          return Bi(r);
        }) : Array.from(i.target.selectedOptions).map((s) => s.value || s.text);
      {
        let s = i.target.value;
        return t.includes("number") ? Bi(s) : t.includes("trim") ? s.trim() : s;
      }
    }
  });
}
function Bi(e) {
  let t = e ? parseFloat(e) : null;
  return tc(t) ? t : e;
}
function Ql(e, t) {
  return e == t;
}
function tc(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function _s(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
Y("cloak", (e) => queueMicrotask(() => Q(() => e.removeAttribute(ce("cloak")))));
rr(() => `[${ce("init")}]`);
Y("init", Ei((e, { expression: t }, { evaluate: i }) => typeof t == "string" ? !!t.trim() && i(t, {}, !1) : i(t, {}, !1)));
Y("text", (e, { expression: t }, { effect: i, evaluateLater: n }) => {
  let s = n(t);
  i(() => {
    s((r) => {
      Q(() => {
        e.textContent = r;
      });
    });
  });
});
Y("html", (e, { expression: t }, { effect: i, evaluateLater: n }) => {
  let s = n(t);
  i(() => {
    s((r) => {
      Q(() => {
        e.innerHTML = r, e._x_ignoreSelf = !0, xt(e), delete e._x_ignoreSelf;
      });
    });
  });
});
Ln(Ar(":", xr(ce("bind:"))));
var ro = (e, { value: t, modifiers: i, expression: n, original: s }, { effect: r }) => {
  if (!t) {
    let a = {};
    nl(a), et(e, n)((c) => {
      kr(e, c, s);
    }, { scope: a });
    return;
  }
  if (t === "key")
    return ec(e, n);
  if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract)
    return;
  let o = et(e, n);
  r(() => o((a) => {
    a === void 0 && typeof n == "string" && n.match(/\./) && (a = ""), Q(() => Rr(e, t, a, i));
  }));
};
ro.inline = (e, { value: t, modifiers: i, expression: n }) => {
  t && (e._x_inlineBindings || (e._x_inlineBindings = {}), e._x_inlineBindings[t] = { expression: n, extract: !1 });
};
Y("bind", ro);
function ec(e, t) {
  e._x_keyExpression = t;
}
sr(() => `[${ce("data")}]`);
Y("data", (e, { expression: t }, { cleanup: i }) => {
  if (ka(e))
    return;
  t = t === "" ? "{}" : t;
  let n = {};
  Xi(n, e);
  let s = {};
  rl(s, n);
  let r = Ut(e, t, { scope: s });
  (r === void 0 || r === !0) && (r = {}), Xi(r, e);
  let o = ae(r);
  mr(o);
  let a = $e(e, o);
  o.init && Ut(e, o.init), i(() => {
    o.destroy && Ut(e, o.destroy), a();
  });
});
Y("show", (e, { modifiers: t, expression: i }, { effect: n }) => {
  let s = et(e, i);
  e._x_doHide || (e._x_doHide = () => {
    Q(() => {
      e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
    });
  }), e._x_doShow || (e._x_doShow = () => {
    Q(() => {
      e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
    });
  });
  let r = () => {
    e._x_doHide(), e._x_isShown = !1;
  }, o = () => {
    e._x_doShow(), e._x_isShown = !0;
  }, a = () => setTimeout(o), l = nn(
    (d) => d ? o() : r(),
    (d) => {
      typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, o, r) : d ? a() : r();
    }
  ), c, u = !0;
  n(() => s((d) => {
    !u && d === c || (t.includes("immediate") && (d ? a() : r()), l(d), c = d, u = !1);
  }));
});
Y("for", (e, { expression: t }, { effect: i, cleanup: n }) => {
  let s = nc(t), r = et(e, s.items), o = et(
    e,
    // the x-bind:key expression is stored for our use instead of evaluated.
    e._x_keyExpression || "index"
  );
  e._x_prevKeys = [], e._x_lookup = {}, i(() => ic(e, s, r, o)), n(() => {
    Object.values(e._x_lookup).forEach((a) => a.remove()), delete e._x_prevKeys, delete e._x_lookup;
  });
});
function ic(e, t, i, n) {
  let s = (o) => typeof o == "object" && !Array.isArray(o), r = e;
  i((o) => {
    sc(o) && o >= 0 && (o = Array.from(Array(o).keys(), (p) => p + 1)), o === void 0 && (o = []);
    let a = e._x_lookup, l = e._x_prevKeys, c = [], u = [];
    if (s(o))
      o = Object.entries(o).map(([p, g]) => {
        let _ = gs(t, g, p, o);
        n((y) => u.push(y), { scope: { index: p, ..._ } }), c.push(_);
      });
    else
      for (let p = 0; p < o.length; p++) {
        let g = gs(t, o[p], p, o);
        n((_) => u.push(_), { scope: { index: p, ...g } }), c.push(g);
      }
    let d = [], h = [], m = [], f = [];
    for (let p = 0; p < l.length; p++) {
      let g = l[p];
      u.indexOf(g) === -1 && m.push(g);
    }
    l = l.filter((p) => !m.includes(p));
    let v = "template";
    for (let p = 0; p < u.length; p++) {
      let g = u[p], _ = l.indexOf(g);
      if (_ === -1)
        l.splice(p, 0, g), d.push([v, p]);
      else if (_ !== p) {
        let y = l.splice(p, 1)[0], P = l.splice(_ - 1, 1)[0];
        l.splice(p, 0, P), l.splice(_, 0, y), h.push([y, P]);
      } else
        f.push(g);
      v = g;
    }
    for (let p = 0; p < m.length; p++) {
      let g = m[p];
      a[g]._x_effects && a[g]._x_effects.forEach(Qs), a[g].remove(), a[g] = null, delete a[g];
    }
    for (let p = 0; p < h.length; p++) {
      let [g, _] = h[p], y = a[g], P = a[_], x = document.createElement("div");
      Q(() => {
        P || Lt('x-for ":key" is undefined or invalid', r), P.after(x), y.after(P), P._x_currentIfEl && P.after(P._x_currentIfEl), x.before(y), y._x_currentIfEl && y.after(y._x_currentIfEl), x.remove();
      }), P._x_refreshXForScope(c[u.indexOf(_)]);
    }
    for (let p = 0; p < d.length; p++) {
      let [g, _] = d[p], y = g === "template" ? r : a[g];
      y._x_currentIfEl && (y = y._x_currentIfEl);
      let P = c[_], x = u[_], O = document.importNode(r.content, !0).firstElementChild, w = ae(P);
      $e(O, w, r), O._x_refreshXForScope = (T) => {
        Object.entries(T).forEach(([$, D]) => {
          w[$] = D;
        });
      }, Q(() => {
        y.after(O), xt(O);
      }), typeof x == "object" && Lt("x-for key cannot be an object, it must be a string or an integer", r), a[x] = O;
    }
    for (let p = 0; p < f.length; p++)
      a[f[p]]._x_refreshXForScope(c[u.indexOf(f[p])]);
    r._x_prevKeys = u;
  });
}
function nc(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, i = /^\s*\(|\)\s*$/g, n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, s = e.match(n);
  if (!s)
    return;
  let r = {};
  r.items = s[2].trim();
  let o = s[1].replace(i, "").trim(), a = o.match(t);
  return a ? (r.item = o.replace(t, "").trim(), r.index = a[1].trim(), a[2] && (r.collection = a[2].trim())) : r.item = o, r;
}
function gs(e, t, i, n) {
  let s = {};
  return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map((o) => o.trim()).forEach((o, a) => {
    s[o] = t[a];
  }) : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object" ? e.item.replace("{", "").replace("}", "").split(",").map((o) => o.trim()).forEach((o) => {
    s[o] = t[o];
  }) : s[e.item] = t, e.index && (s[e.index] = i), e.collection && (s[e.collection] = n), s;
}
function sc(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function oo() {
}
oo.inline = (e, { expression: t }, { cleanup: i }) => {
  let n = gi(e);
  n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, i(() => delete n._x_refs[t]);
};
Y("ref", oo);
Y("if", (e, { expression: t }, { effect: i, cleanup: n }) => {
  let s = et(e, t), r = () => {
    if (e._x_currentIfEl)
      return e._x_currentIfEl;
    let a = e.content.cloneNode(!0).firstElementChild;
    return $e(a, {}, e), Q(() => {
      e.after(a), xt(a);
    }), e._x_currentIfEl = a, e._x_undoIf = () => {
      Tt(a, (l) => {
        l._x_effects && l._x_effects.forEach(Qs);
      }), a.remove(), delete e._x_currentIfEl;
    }, a;
  }, o = () => {
    e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
  };
  i(() => s((a) => {
    a ? r() : o();
  })), n(() => e._x_undoIf && e._x_undoIf());
});
Y("id", (e, { expression: t }, { evaluate: i }) => {
  i(t).forEach((s) => Ul(e, s));
});
Ln(Ar("@", xr(ce("on:"))));
Y("on", Ei((e, { value: t, modifiers: i, expression: n }, { cleanup: s }) => {
  let r = n ? et(e, n) : () => {
  };
  e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
  let o = cn(e, t, i, (a) => {
    r(() => {
    }, { scope: { $event: a }, params: [a] });
  });
  s(() => o());
}));
xi("Collapse", "collapse", "collapse");
xi("Intersect", "intersect", "intersect");
xi("Focus", "trap", "focus");
xi("Mask", "mask", "mask");
function xi(e, t, i) {
  Y(t, (n) => Lt(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${i}`, n));
}
Be.setEvaluator(wr);
Be.setReactivityEngine({ reactive: Bn, effect: ml, release: vl, raw: K });
var rc = Be, di = rc;
function ys(e, t) {
  for (var i = 0; i < t.length; i++) {
    var n = t[i];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function oc(e, t, i) {
  return t && ys(e.prototype, t), i && ys(e, i), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
var ws = "(prefers-reduced-motion: reduce)", te = 1, ac = 2, re = 3, ue = 4, ke = 5, ri = 6, fi = 7, lc = {
  CREATED: te,
  MOUNTED: ac,
  IDLE: re,
  MOVING: ue,
  SCROLLING: ke,
  DRAGGING: ri,
  DESTROYED: fi
};
function Pt(e) {
  e.length = 0;
}
function Nt(e, t, i) {
  return Array.prototype.slice.call(e, t, i);
}
function H(e) {
  return e.bind.apply(e, [null].concat(Nt(arguments, 1)));
}
var ao = setTimeout, un = function() {
};
function Es(e) {
  return requestAnimationFrame(e);
}
function Pi(e, t) {
  return typeof t === e;
}
function Ce(e) {
  return !Vn(e) && Pi("object", e);
}
var kn = Array.isArray, lo = H(Pi, "function"), Rt = H(Pi, "string"), Ve = H(Pi, "undefined");
function Vn(e) {
  return e === null;
}
function co(e) {
  try {
    return e instanceof (e.ownerDocument.defaultView || window).HTMLElement;
  } catch {
    return !1;
  }
}
function We(e) {
  return kn(e) ? e : [e];
}
function ut(e, t) {
  We(e).forEach(t);
}
function Wn(e, t) {
  return e.indexOf(t) > -1;
}
function oi(e, t) {
  return e.push.apply(e, We(t)), e;
}
function St(e, t, i) {
  e && ut(t, function(n) {
    n && e.classList[i ? "add" : "remove"](n);
  });
}
function gt(e, t) {
  St(e, Rt(t) ? t.split(" ") : t, !0);
}
function He(e, t) {
  ut(t, e.appendChild.bind(e));
}
function Hn(e, t) {
  ut(e, function(i) {
    var n = (t || i).parentNode;
    n && n.insertBefore(i, t);
  });
}
function Te(e, t) {
  return co(e) && (e.msMatchesSelector || e.matches).call(e, t);
}
function uo(e, t) {
  var i = e ? Nt(e.children) : [];
  return t ? i.filter(function(n) {
    return Te(n, t);
  }) : i;
}
function Ue(e, t) {
  return t ? uo(e, t)[0] : e.firstElementChild;
}
var Le = Object.keys;
function qt(e, t, i) {
  return e && (i ? Le(e).reverse() : Le(e)).forEach(function(n) {
    n !== "__proto__" && t(e[n], n);
  }), e;
}
function Oe(e) {
  return Nt(arguments, 1).forEach(function(t) {
    qt(t, function(i, n) {
      e[n] = t[n];
    });
  }), e;
}
function Ct(e) {
  return Nt(arguments, 1).forEach(function(t) {
    qt(t, function(i, n) {
      kn(i) ? e[n] = i.slice() : Ce(i) ? e[n] = Ct({}, Ce(e[n]) ? e[n] : {}, i) : e[n] = i;
    });
  }), e;
}
function Ss(e, t) {
  ut(t || Le(e), function(i) {
    delete e[i];
  });
}
function yt(e, t) {
  ut(e, function(i) {
    ut(t, function(n) {
      i && i.removeAttribute(n);
    });
  });
}
function Z(e, t, i) {
  Ce(t) ? qt(t, function(n, s) {
    Z(e, s, n);
  }) : ut(e, function(n) {
    Vn(i) || i === "" ? yt(n, t) : n.setAttribute(t, String(i));
  });
}
function ee(e, t, i) {
  var n = document.createElement(e);
  return t && (Rt(t) ? gt(n, t) : Z(n, t)), i && He(i, n), n;
}
function dt(e, t, i) {
  if (Ve(i))
    return getComputedStyle(e)[t];
  Vn(i) || (e.style[t] = "" + i);
}
function De(e, t) {
  dt(e, "display", t);
}
function ho(e) {
  e.setActive && e.setActive() || e.focus({
    preventScroll: !0
  });
}
function ft(e, t) {
  return e.getAttribute(t);
}
function bs(e, t) {
  return e && e.classList.contains(t);
}
function lt(e) {
  return e.getBoundingClientRect();
}
function jt(e) {
  ut(e, function(t) {
    t && t.parentNode && t.parentNode.removeChild(t);
  });
}
function fo(e) {
  return Ue(new DOMParser().parseFromString(e, "text/html").body);
}
function Et(e, t) {
  e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation());
}
function po(e, t) {
  return e && e.querySelector(t);
}
function Un(e, t) {
  return t ? Nt(e.querySelectorAll(t)) : [];
}
function bt(e, t) {
  St(e, t, !1);
}
function hn(e) {
  return e.timeStamp;
}
function Zt(e) {
  return Rt(e) ? e : e ? e + "px" : "";
}
var Ke = "splide", Kn = "data-" + Ke;
function Ae(e, t) {
  if (!e)
    throw new Error("[" + Ke + "] " + (t || ""));
}
var Mt = Math.min, pi = Math.max, mi = Math.floor, Re = Math.ceil, nt = Math.abs;
function mo(e, t, i) {
  return nt(e - t) < i;
}
function ai(e, t, i, n) {
  var s = Mt(t, i), r = pi(t, i);
  return n ? s < e && e < r : s <= e && e <= r;
}
function Jt(e, t, i) {
  var n = Mt(t, i), s = pi(t, i);
  return Mt(pi(n, e), s);
}
function dn(e) {
  return +(e > 0) - +(e < 0);
}
function fn(e, t) {
  return ut(t, function(i) {
    e = e.replace("%s", "" + i);
  }), e;
}
function Gn(e) {
  return e < 10 ? "0" + e : "" + e;
}
var As = {};
function cc(e) {
  return "" + e + Gn(As[e] = (As[e] || 0) + 1);
}
function vo() {
  var e = [];
  function t(o, a, l, c) {
    s(o, a, function(u, d, h) {
      var m = "addEventListener" in u, f = m ? u.removeEventListener.bind(u, d, l, c) : u.removeListener.bind(u, l);
      m ? u.addEventListener(d, l, c) : u.addListener(l), e.push([u, d, h, l, f]);
    });
  }
  function i(o, a, l) {
    s(o, a, function(c, u, d) {
      e = e.filter(function(h) {
        return h[0] === c && h[1] === u && h[2] === d && (!l || h[3] === l) ? (h[4](), !1) : !0;
      });
    });
  }
  function n(o, a, l) {
    var c, u = !0;
    return typeof CustomEvent == "function" ? c = new CustomEvent(a, {
      bubbles: u,
      detail: l
    }) : (c = document.createEvent("CustomEvent"), c.initCustomEvent(a, u, !1, l)), o.dispatchEvent(c), c;
  }
  function s(o, a, l) {
    ut(o, function(c) {
      c && ut(a, function(u) {
        u.split(" ").forEach(function(d) {
          var h = d.split(".");
          l(c, h[0], h[1]);
        });
      });
    });
  }
  function r() {
    e.forEach(function(o) {
      o[4]();
    }), Pt(e);
  }
  return {
    bind: t,
    unbind: i,
    dispatch: n,
    destroy: r
  };
}
var Yt = "mounted", xs = "ready", zt = "move", Ge = "moved", _o = "click", uc = "active", hc = "inactive", dc = "visible", fc = "hidden", J = "refresh", st = "updated", Me = "resize", qn = "resized", pc = "drag", mc = "dragging", vc = "dragged", jn = "scroll", he = "scrolled", _c = "overflow", go = "destroy", gc = "arrows:mounted", yc = "arrows:updated", wc = "pagination:mounted", Ec = "pagination:updated", yo = "navigation:mounted", wo = "autoplay:play", Sc = "autoplay:playing", Eo = "autoplay:pause", So = "lazyload:loaded", bo = "sk", Ao = "sh", vi = "ei";
function q(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), i = vo();
  function n(r, o) {
    i.bind(t, We(r).join(" "), function(a) {
      o.apply(o, kn(a.detail) ? a.detail : []);
    });
  }
  function s(r) {
    i.dispatch(t, r, Nt(arguments, 1));
  }
  return e && e.event.on(go, i.destroy), Oe(i, {
    bus: t,
    on: n,
    off: H(i.unbind, t),
    emit: s
  });
}
function Ii(e, t, i, n) {
  var s = Date.now, r, o = 0, a, l = !0, c = 0;
  function u() {
    if (!l) {
      if (o = e ? Mt((s() - r) / e, 1) : 1, i && i(o), o >= 1 && (t(), r = s(), n && ++c >= n))
        return h();
      a = Es(u);
    }
  }
  function d(g) {
    g || f(), r = s() - (g ? o * e : 0), l = !1, a = Es(u);
  }
  function h() {
    l = !0;
  }
  function m() {
    r = s(), o = 0, i && i(o);
  }
  function f() {
    a && cancelAnimationFrame(a), o = 0, a = 0, l = !0;
  }
  function v(g) {
    e = g;
  }
  function p() {
    return l;
  }
  return {
    start: d,
    rewind: m,
    pause: h,
    cancel: f,
    set: v,
    isPaused: p
  };
}
function bc(e) {
  var t = e;
  function i(s) {
    t = s;
  }
  function n(s) {
    return Wn(We(s), t);
  }
  return {
    set: i,
    is: n
  };
}
function Ac(e, t) {
  var i = Ii(t || 0, e, null, 1);
  return function() {
    i.isPaused() && i.start();
  };
}
function xc(e, t, i) {
  var n = e.state, s = i.breakpoints || {}, r = i.reducedMotion || {}, o = vo(), a = [];
  function l() {
    var f = i.mediaQuery === "min";
    Le(s).sort(function(v, p) {
      return f ? +v - +p : +p - +v;
    }).forEach(function(v) {
      u(s[v], "(" + (f ? "min" : "max") + "-width:" + v + "px)");
    }), u(r, ws), d();
  }
  function c(f) {
    f && o.destroy();
  }
  function u(f, v) {
    var p = matchMedia(v);
    o.bind(p, "change", d), a.push([f, p]);
  }
  function d() {
    var f = n.is(fi), v = i.direction, p = a.reduce(function(g, _) {
      return Ct(g, _[1].matches ? _[0] : {});
    }, {});
    Ss(i), m(p), i.destroy ? e.destroy(i.destroy === "completely") : f ? (c(!0), e.mount()) : v !== i.direction && e.refresh();
  }
  function h(f) {
    matchMedia(ws).matches && (f ? Ct(i, r) : Ss(i, Le(r)));
  }
  function m(f, v, p) {
    Ct(i, f), v && Ct(Object.getPrototypeOf(i), f), (p || !n.is(te)) && e.emit(st, i);
  }
  return {
    setup: l,
    destroy: c,
    reduce: h,
    set: m
  };
}
var Ci = "Arrow", Ti = Ci + "Left", Li = Ci + "Right", xo = Ci + "Up", Po = Ci + "Down", Ps = "rtl", Oi = "ttb", ki = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [xo, Li],
  ArrowRight: [Po, Ti]
};
function Pc(e, t, i) {
  function n(r, o, a) {
    a = a || i.direction;
    var l = a === Ps && !o ? 1 : a === Oi ? 0 : -1;
    return ki[r] && ki[r][l] || r.replace(/width|left|right/i, function(c, u) {
      var d = ki[c.toLowerCase()][l] || c;
      return u > 0 ? d.charAt(0).toUpperCase() + d.slice(1) : d;
    });
  }
  function s(r) {
    return r * (i.direction === Ps ? 1 : -1);
  }
  return {
    resolve: n,
    orient: s
  };
}
var At = "role", ie = "tabindex", Ic = "disabled", vt = "aria-", qe = vt + "controls", Io = vt + "current", Is = vt + "selected", ct = vt + "label", Xn = vt + "labelledby", Co = vt + "hidden", Yn = vt + "orientation", ze = vt + "roledescription", Cs = vt + "live", Ts = vt + "busy", Ls = vt + "atomic", Jn = [At, ie, Ic, qe, Io, ct, Xn, Co, Yn, ze], wt = Ke + "__", Ft = "is-", Vi = Ke, Os = wt + "track", Cc = wt + "list", Di = wt + "slide", To = Di + "--clone", Tc = Di + "__container", Qn = wt + "arrows", Ri = wt + "arrow", Lo = Ri + "--prev", Oo = Ri + "--next", Mi = wt + "pagination", Do = Mi + "__page", Lc = wt + "progress", Oc = Lc + "__bar", Dc = wt + "toggle", Rc = wt + "spinner", Mc = wt + "sr", zc = Ft + "initialized", Xt = Ft + "active", Ro = Ft + "prev", Mo = Ft + "next", pn = Ft + "visible", mn = Ft + "loading", zo = Ft + "focus-in", No = Ft + "overflow", Nc = [Xt, pn, Ro, Mo, mn, zo, No], Fc = {
  slide: Di,
  clone: To,
  arrows: Qn,
  arrow: Ri,
  prev: Lo,
  next: Oo,
  pagination: Mi,
  page: Do,
  spinner: Rc
};
function $c(e, t) {
  if (lo(e.closest))
    return e.closest(t);
  for (var i = e; i && i.nodeType === 1 && !Te(i, t); )
    i = i.parentElement;
  return i;
}
var Zc = 5, Ds = 200, Fo = "touchstart mousedown", Wi = "touchmove mousemove", Hi = "touchend touchcancel mouseup click";
function Bc(e, t, i) {
  var n = q(e), s = n.on, r = n.bind, o = e.root, a = i.i18n, l = {}, c = [], u = [], d = [], h, m, f;
  function v() {
    y(), P(), _();
  }
  function p() {
    s(J, g), s(J, v), s(st, _), r(document, Fo + " keydown", function(w) {
      f = w.type === "keydown";
    }, {
      capture: !0
    }), r(o, "focusin", function() {
      St(o, zo, !!f);
    });
  }
  function g(w) {
    var T = Jn.concat("style");
    Pt(c), bt(o, u), bt(h, d), yt([h, m], T), yt(o, w ? T : ["style", ze]);
  }
  function _() {
    bt(o, u), bt(h, d), u = O(Vi), d = O(Os), gt(o, u), gt(h, d), Z(o, ct, i.label), Z(o, Xn, i.labelledby);
  }
  function y() {
    h = x("." + Os), m = Ue(h, "." + Cc), Ae(h && m, "A track/list element is missing."), oi(c, uo(m, "." + Di + ":not(." + To + ")")), qt({
      arrows: Qn,
      pagination: Mi,
      prev: Lo,
      next: Oo,
      bar: Oc,
      toggle: Dc
    }, function(w, T) {
      l[T] = x("." + w);
    }), Oe(l, {
      root: o,
      track: h,
      list: m,
      slides: c
    });
  }
  function P() {
    var w = o.id || cc(Ke), T = i.role;
    o.id = w, h.id = h.id || w + "-track", m.id = m.id || w + "-list", !ft(o, At) && o.tagName !== "SECTION" && T && Z(o, At, T), Z(o, ze, a.carousel), Z(m, At, "presentation");
  }
  function x(w) {
    var T = po(o, w);
    return T && $c(T, "." + Vi) === o ? T : void 0;
  }
  function O(w) {
    return [w + "--" + i.type, w + "--" + i.direction, i.drag && w + "--draggable", i.isNavigation && w + "--nav", w === Vi && Xt];
  }
  return Oe(l, {
    setup: v,
    mount: p,
    destroy: g
  });
}
var oe = "slide", de = "loop", je = "fade";
function kc(e, t, i, n) {
  var s = q(e), r = s.on, o = s.emit, a = s.bind, l = e.Components, c = e.root, u = e.options, d = u.isNavigation, h = u.updateOnMove, m = u.i18n, f = u.pagination, v = u.slideFocus, p = l.Direction.resolve, g = ft(n, "style"), _ = ft(n, ct), y = i > -1, P = Ue(n, "." + Tc), x;
  function O() {
    y || (n.id = c.id + "-slide" + Gn(t + 1), Z(n, At, f ? "tabpanel" : "group"), Z(n, ze, m.slide), Z(n, ct, _ || fn(m.slideLabel, [t + 1, e.length]))), w();
  }
  function w() {
    a(n, "click", H(o, _o, z)), a(n, "keydown", H(o, bo, z)), r([Ge, Ao, he], b), r(yo, $), h && r(zt, D);
  }
  function T() {
    x = !0, s.destroy(), bt(n, Nc), yt(n, Jn), Z(n, "style", g), Z(n, ct, _ || "");
  }
  function $() {
    var R = e.splides.map(function(E) {
      var L = E.splide.Components.Slides.getAt(t);
      return L ? L.slide.id : "";
    }).join(" ");
    Z(n, ct, fn(m.slideX, (y ? i : t) + 1)), Z(n, qe, R), Z(n, At, v ? "button" : ""), v && yt(n, ze);
  }
  function D() {
    x || b();
  }
  function b() {
    if (!x) {
      var R = e.index;
      A(), I(), St(n, Ro, t === R - 1), St(n, Mo, t === R + 1);
    }
  }
  function A() {
    var R = M();
    R !== bs(n, Xt) && (St(n, Xt, R), Z(n, Io, d && R || ""), o(R ? uc : hc, z));
  }
  function I() {
    var R = k(), E = !R && (!M() || y);
    if (e.state.is([ue, ke]) || Z(n, Co, E || ""), Z(Un(n, u.focusableNodes || ""), ie, E ? -1 : ""), v && Z(n, ie, E ? -1 : 0), R !== bs(n, pn) && (St(n, pn, R), o(R ? dc : fc, z)), !R && document.activeElement === n) {
      var L = l.Slides.getAt(e.index);
      L && ho(L.slide);
    }
  }
  function N(R, E, L) {
    dt(L && P || n, R, E);
  }
  function M() {
    var R = e.index;
    return R === t || u.cloneStatus && R === i;
  }
  function k() {
    if (e.is(je))
      return M();
    var R = lt(l.Elements.track), E = lt(n), L = p("left", !0), B = p("right", !0);
    return mi(R[L]) <= Re(E[L]) && mi(E[B]) <= Re(R[B]);
  }
  function V(R, E) {
    var L = nt(R - t);
    return !y && (u.rewind || e.is(de)) && (L = Mt(L, e.length - L)), L <= E;
  }
  var z = {
    index: t,
    slideIndex: i,
    slide: n,
    container: P,
    isClone: y,
    mount: O,
    destroy: T,
    update: b,
    style: N,
    isWithin: V
  };
  return z;
}
function Vc(e, t, i) {
  var n = q(e), s = n.on, r = n.emit, o = n.bind, a = t.Elements, l = a.slides, c = a.list, u = [];
  function d() {
    h(), s(J, m), s(J, h);
  }
  function h() {
    l.forEach(function(b, A) {
      v(b, A, -1);
    });
  }
  function m() {
    x(function(b) {
      b.destroy();
    }), Pt(u);
  }
  function f() {
    x(function(b) {
      b.update();
    });
  }
  function v(b, A, I) {
    var N = kc(e, A, I, b);
    N.mount(), u.push(N), u.sort(function(M, k) {
      return M.index - k.index;
    });
  }
  function p(b) {
    return b ? O(function(A) {
      return !A.isClone;
    }) : u;
  }
  function g(b) {
    var A = t.Controller, I = A.toIndex(b), N = A.hasFocus() ? 1 : i.perPage;
    return O(function(M) {
      return ai(M.index, I, I + N - 1);
    });
  }
  function _(b) {
    return O(b)[0];
  }
  function y(b, A) {
    ut(b, function(I) {
      if (Rt(I) && (I = fo(I)), co(I)) {
        var N = l[A];
        N ? Hn(I, N) : He(c, I), gt(I, i.classes.slide), T(I, H(r, Me));
      }
    }), r(J);
  }
  function P(b) {
    jt(O(b).map(function(A) {
      return A.slide;
    })), r(J);
  }
  function x(b, A) {
    p(A).forEach(b);
  }
  function O(b) {
    return u.filter(lo(b) ? b : function(A) {
      return Rt(b) ? Te(A.slide, b) : Wn(We(b), A.index);
    });
  }
  function w(b, A, I) {
    x(function(N) {
      N.style(b, A, I);
    });
  }
  function T(b, A) {
    var I = Un(b, "img"), N = I.length;
    N ? I.forEach(function(M) {
      o(M, "load error", function() {
        --N || A();
      });
    }) : A();
  }
  function $(b) {
    return b ? l.length : u.length;
  }
  function D() {
    return u.length > i.perPage;
  }
  return {
    mount: d,
    destroy: m,
    update: f,
    register: v,
    get: p,
    getIn: g,
    getAt: _,
    add: y,
    remove: P,
    forEach: x,
    filter: O,
    style: w,
    getLength: $,
    isEnough: D
  };
}
function Wc(e, t, i) {
  var n = q(e), s = n.on, r = n.bind, o = n.emit, a = t.Slides, l = t.Direction.resolve, c = t.Elements, u = c.root, d = c.track, h = c.list, m = a.getAt, f = a.style, v, p, g;
  function _() {
    y(), r(window, "resize load", Ac(H(o, Me))), s([st, J], y), s(Me, P);
  }
  function y() {
    v = i.direction === Oi, dt(u, "maxWidth", Zt(i.width)), dt(d, l("paddingLeft"), x(!1)), dt(d, l("paddingRight"), x(!0)), P(!0);
  }
  function P(z) {
    var R = lt(u);
    (z || p.width !== R.width || p.height !== R.height) && (dt(d, "height", O()), f(l("marginRight"), Zt(i.gap)), f("width", T()), f("height", $(), !0), p = R, o(qn), g !== (g = V()) && (St(u, No, g), o(_c, g)));
  }
  function x(z) {
    var R = i.padding, E = l(z ? "right" : "left");
    return R && Zt(R[E] || (Ce(R) ? 0 : R)) || "0px";
  }
  function O() {
    var z = "";
    return v && (z = w(), Ae(z, "height or heightRatio is missing."), z = "calc(" + z + " - " + x(!1) + " - " + x(!0) + ")"), z;
  }
  function w() {
    return Zt(i.height || lt(h).width * i.heightRatio);
  }
  function T() {
    return i.autoWidth ? null : Zt(i.fixedWidth) || (v ? "" : D());
  }
  function $() {
    return Zt(i.fixedHeight) || (v ? i.autoHeight ? null : D() : w());
  }
  function D() {
    var z = Zt(i.gap);
    return "calc((100%" + (z && " + " + z) + ")/" + (i.perPage || 1) + (z && " - " + z) + ")";
  }
  function b() {
    return lt(h)[l("width")];
  }
  function A(z, R) {
    var E = m(z || 0);
    return E ? lt(E.slide)[l("width")] + (R ? 0 : M()) : 0;
  }
  function I(z, R) {
    var E = m(z);
    if (E) {
      var L = lt(E.slide)[l("right")], B = lt(h)[l("left")];
      return nt(L - B) + (R ? 0 : M());
    }
    return 0;
  }
  function N(z) {
    return I(e.length - 1) - I(0) + A(0, z);
  }
  function M() {
    var z = m(0);
    return z && parseFloat(dt(z.slide, l("marginRight"))) || 0;
  }
  function k(z) {
    return parseFloat(dt(d, l("padding" + (z ? "Right" : "Left")))) || 0;
  }
  function V() {
    return e.is(je) || N(!0) > b();
  }
  return {
    mount: _,
    resize: P,
    listSize: b,
    slideSize: A,
    sliderSize: N,
    totalSize: I,
    getPadding: k,
    isOverflow: V
  };
}
var Hc = 2;
function Uc(e, t, i) {
  var n = q(e), s = n.on, r = t.Elements, o = t.Slides, a = t.Direction.resolve, l = [], c;
  function u() {
    s(J, d), s([st, Me], m), (c = p()) && (f(c), t.Layout.resize(!0));
  }
  function d() {
    h(), u();
  }
  function h() {
    jt(l), Pt(l), n.destroy();
  }
  function m() {
    var g = p();
    c !== g && (c < g || !g) && n.emit(J);
  }
  function f(g) {
    var _ = o.get().slice(), y = _.length;
    if (y) {
      for (; _.length < g; )
        oi(_, _);
      oi(_.slice(-g), _.slice(0, g)).forEach(function(P, x) {
        var O = x < g, w = v(P.slide, x);
        O ? Hn(w, _[0].slide) : He(r.list, w), oi(l, w), o.register(w, x - g + (O ? 0 : y), P.index);
      });
    }
  }
  function v(g, _) {
    var y = g.cloneNode(!0);
    return gt(y, i.classes.clone), y.id = e.root.id + "-clone" + Gn(_ + 1), y;
  }
  function p() {
    var g = i.clones;
    if (!e.is(de))
      g = 0;
    else if (Ve(g)) {
      var _ = i[a("fixedWidth")] && t.Layout.slideSize(0), y = _ && Re(lt(r.track)[a("width")] / _);
      g = y || i[a("autoWidth")] && e.length || i.perPage * Hc;
    }
    return g;
  }
  return {
    mount: u,
    destroy: h
  };
}
function Kc(e, t, i) {
  var n = q(e), s = n.on, r = n.emit, o = e.state.set, a = t.Layout, l = a.slideSize, c = a.getPadding, u = a.totalSize, d = a.listSize, h = a.sliderSize, m = t.Direction, f = m.resolve, v = m.orient, p = t.Elements, g = p.list, _ = p.track, y;
  function P() {
    y = t.Transition, s([Yt, qn, st, J], x);
  }
  function x() {
    t.Controller.isBusy() || (t.Scroll.cancel(), w(e.index), t.Slides.update());
  }
  function O(E, L, B, F) {
    E !== L && z(E > B) && (b(), T(D(N(), E > B), !0)), o(ue), r(zt, L, B, E), y.start(L, function() {
      o(re), r(Ge, L, B, E), F && F();
    });
  }
  function w(E) {
    T(I(E, !0));
  }
  function T(E, L) {
    if (!e.is(je)) {
      var B = L ? E : $(E);
      dt(g, "transform", "translate" + f("X") + "(" + B + "px)"), E !== B && r(Ao);
    }
  }
  function $(E) {
    if (e.is(de)) {
      var L = A(E), B = L > t.Controller.getEnd(), F = L < 0;
      (F || B) && (E = D(E, B));
    }
    return E;
  }
  function D(E, L) {
    var B = E - V(L), F = h();
    return E -= v(F * (Re(nt(B) / F) || 1)) * (L ? 1 : -1), E;
  }
  function b() {
    T(N(), !0), y.cancel();
  }
  function A(E) {
    for (var L = t.Slides.get(), B = 0, F = 1 / 0, U = 0; U < L.length; U++) {
      var ht = L[U].index, S = nt(I(ht, !0) - E);
      if (S <= F)
        F = S, B = ht;
      else
        break;
    }
    return B;
  }
  function I(E, L) {
    var B = v(u(E - 1) - k(E));
    return L ? M(B) : B;
  }
  function N() {
    var E = f("left");
    return lt(g)[E] - lt(_)[E] + v(c(!1));
  }
  function M(E) {
    return i.trimSpace && e.is(oe) && (E = Jt(E, 0, v(h(!0) - d()))), E;
  }
  function k(E) {
    var L = i.focus;
    return L === "center" ? (d() - l(E, !0)) / 2 : +L * l(E) || 0;
  }
  function V(E) {
    return I(E ? t.Controller.getEnd() : 0, !!i.trimSpace);
  }
  function z(E) {
    var L = v(D(N(), E));
    return E ? L >= 0 : L <= g[f("scrollWidth")] - lt(_)[f("width")];
  }
  function R(E, L) {
    L = Ve(L) ? N() : L;
    var B = E !== !0 && v(L) < v(V(!1)), F = E !== !1 && v(L) > v(V(!0));
    return B || F;
  }
  return {
    mount: P,
    move: O,
    jump: w,
    translate: T,
    shift: D,
    cancel: b,
    toIndex: A,
    toPosition: I,
    getPosition: N,
    getLimit: V,
    exceededLimit: R,
    reposition: x
  };
}
function Gc(e, t, i) {
  var n = q(e), s = n.on, r = n.emit, o = t.Move, a = o.getPosition, l = o.getLimit, c = o.toPosition, u = t.Slides, d = u.isEnough, h = u.getLength, m = i.omitEnd, f = e.is(de), v = e.is(oe), p = H(N, !1), g = H(N, !0), _ = i.start || 0, y, P = _, x, O, w;
  function T() {
    $(), s([st, J, vi], $), s(qn, D);
  }
  function $() {
    x = h(!0), O = i.perMove, w = i.perPage, y = z();
    var S = Jt(_, 0, m ? y : x - 1);
    S !== _ && (_ = S, o.reposition());
  }
  function D() {
    y !== z() && r(vi);
  }
  function b(S, W, it) {
    if (!ht()) {
      var j = I(S), tt = V(j);
      tt > -1 && (W || tt !== _) && (B(tt), o.move(j, tt, P, it));
    }
  }
  function A(S, W, it, j) {
    t.Scroll.scroll(S, W, it, function() {
      var tt = V(o.toIndex(a()));
      B(m ? Mt(tt, y) : tt), j && j();
    });
  }
  function I(S) {
    var W = _;
    if (Rt(S)) {
      var it = S.match(/([+\-<>])(\d+)?/) || [], j = it[1], tt = it[2];
      j === "+" || j === "-" ? W = M(_ + +("" + j + (+tt || 1)), _) : j === ">" ? W = tt ? R(+tt) : p(!0) : j === "<" && (W = g(!0));
    } else
      W = f ? S : Jt(S, 0, y);
    return W;
  }
  function N(S, W) {
    var it = O || (U() ? 1 : w), j = M(_ + it * (S ? -1 : 1), _, !(O || U()));
    return j === -1 && v && !mo(a(), l(!S), 1) ? S ? 0 : y : W ? j : V(j);
  }
  function M(S, W, it) {
    if (d() || U()) {
      var j = k(S);
      j !== S && (W = S, S = j, it = !1), S < 0 || S > y ? !O && (ai(0, S, W, !0) || ai(y, W, S, !0)) ? S = R(E(S)) : f ? S = it ? S < 0 ? -(x % w || w) : x : S : i.rewind ? S = S < 0 ? y : 0 : S = -1 : it && S !== W && (S = R(E(W) + (S < W ? -1 : 1)));
    } else
      S = -1;
    return S;
  }
  function k(S) {
    if (v && i.trimSpace === "move" && S !== _)
      for (var W = a(); W === c(S, !0) && ai(S, 0, e.length - 1, !i.rewind); )
        S < _ ? --S : ++S;
    return S;
  }
  function V(S) {
    return f ? (S + x) % x || 0 : S;
  }
  function z() {
    for (var S = x - (U() || f && O ? 1 : w); m && S-- > 0; )
      if (c(x - 1, !0) !== c(S, !0)) {
        S++;
        break;
      }
    return Jt(S, 0, x - 1);
  }
  function R(S) {
    return Jt(U() ? S : w * S, 0, y);
  }
  function E(S) {
    return U() ? Mt(S, y) : mi((S >= y ? x - 1 : S) / w);
  }
  function L(S) {
    var W = o.toIndex(S);
    return v ? Jt(W, 0, y) : W;
  }
  function B(S) {
    S !== _ && (P = _, _ = S);
  }
  function F(S) {
    return S ? P : _;
  }
  function U() {
    return !Ve(i.focus) || i.isNavigation;
  }
  function ht() {
    return e.state.is([ue, ke]) && !!i.waitForTransition;
  }
  return {
    mount: T,
    go: b,
    scroll: A,
    getNext: p,
    getPrev: g,
    getAdjacent: N,
    getEnd: z,
    setIndex: B,
    getIndex: F,
    toIndex: R,
    toPage: E,
    toDest: L,
    hasFocus: U,
    isBusy: ht
  };
}
var qc = "http://www.w3.org/2000/svg", jc = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z", ii = 40;
function Xc(e, t, i) {
  var n = q(e), s = n.on, r = n.bind, o = n.emit, a = i.classes, l = i.i18n, c = t.Elements, u = t.Controller, d = c.arrows, h = c.track, m = d, f = c.prev, v = c.next, p, g, _ = {};
  function y() {
    x(), s(st, P);
  }
  function P() {
    O(), y();
  }
  function x() {
    var A = i.arrows;
    A && !(f && v) && $(), f && v && (Oe(_, {
      prev: f,
      next: v
    }), De(m, A ? "" : "none"), gt(m, g = Qn + "--" + i.direction), A && (w(), b(), Z([f, v], qe, h.id), o(gc, f, v)));
  }
  function O() {
    n.destroy(), bt(m, g), p ? (jt(d ? [f, v] : m), f = v = null) : yt([f, v], Jn);
  }
  function w() {
    s([Yt, Ge, J, he, vi], b), r(v, "click", H(T, ">")), r(f, "click", H(T, "<"));
  }
  function T(A) {
    u.go(A, !0);
  }
  function $() {
    m = d || ee("div", a.arrows), f = D(!0), v = D(!1), p = !0, He(m, [f, v]), !d && Hn(m, h);
  }
  function D(A) {
    var I = '<button class="' + a.arrow + " " + (A ? a.prev : a.next) + '" type="button"><svg xmlns="' + qc + '" viewBox="0 0 ' + ii + " " + ii + '" width="' + ii + '" height="' + ii + '" focusable="false"><path d="' + (i.arrowPath || jc) + '" />';
    return fo(I);
  }
  function b() {
    if (f && v) {
      var A = e.index, I = u.getPrev(), N = u.getNext(), M = I > -1 && A < I ? l.last : l.prev, k = N > -1 && A > N ? l.first : l.next;
      f.disabled = I < 0, v.disabled = N < 0, Z(f, ct, M), Z(v, ct, k), o(yc, f, v, I, N);
    }
  }
  return {
    arrows: _,
    mount: y,
    destroy: O,
    update: b
  };
}
var Yc = Kn + "-interval";
function Jc(e, t, i) {
  var n = q(e), s = n.on, r = n.bind, o = n.emit, a = Ii(i.interval, e.go.bind(e, ">"), w), l = a.isPaused, c = t.Elements, u = t.Elements, d = u.root, h = u.toggle, m = i.autoplay, f, v, p = m === "pause";
  function g() {
    m && (_(), h && Z(h, qe, c.track.id), p || y(), O());
  }
  function _() {
    i.pauseOnHover && r(d, "mouseenter mouseleave", function($) {
      f = $.type === "mouseenter", x();
    }), i.pauseOnFocus && r(d, "focusin focusout", function($) {
      v = $.type === "focusin", x();
    }), h && r(h, "click", function() {
      p ? y() : P(!0);
    }), s([zt, jn, J], a.rewind), s(zt, T);
  }
  function y() {
    l() && t.Slides.isEnough() && (a.start(!i.resetProgress), v = f = p = !1, O(), o(wo));
  }
  function P($) {
    $ === void 0 && ($ = !0), p = !!$, O(), l() || (a.pause(), o(Eo));
  }
  function x() {
    p || (f || v ? P(!1) : y());
  }
  function O() {
    h && (St(h, Xt, !p), Z(h, ct, i.i18n[p ? "play" : "pause"]));
  }
  function w($) {
    var D = c.bar;
    D && dt(D, "width", $ * 100 + "%"), o(Sc, $);
  }
  function T($) {
    var D = t.Slides.getAt($);
    a.set(D && +ft(D.slide, Yc) || i.interval);
  }
  return {
    mount: g,
    destroy: a.cancel,
    play: y,
    pause: P,
    isPaused: l
  };
}
function Qc(e, t, i) {
  var n = q(e), s = n.on;
  function r() {
    i.cover && (s(So, H(a, !0)), s([Yt, st, J], H(o, !0)));
  }
  function o(l) {
    t.Slides.forEach(function(c) {
      var u = Ue(c.container || c.slide, "img");
      u && u.src && a(l, u, c);
    });
  }
  function a(l, c, u) {
    u.style("background", l ? 'center/cover no-repeat url("' + c.src + '")' : "", !0), De(c, l ? "none" : "");
  }
  return {
    mount: r,
    destroy: H(o, !1)
  };
}
var tu = 10, eu = 600, iu = 0.6, nu = 1.5, su = 800;
function ru(e, t, i) {
  var n = q(e), s = n.on, r = n.emit, o = e.state.set, a = t.Move, l = a.getPosition, c = a.getLimit, u = a.exceededLimit, d = a.translate, h = e.is(oe), m, f, v = 1;
  function p() {
    s(zt, P), s([st, J], x);
  }
  function g(w, T, $, D, b) {
    var A = l();
    if (P(), $ && (!h || !u())) {
      var I = t.Layout.sliderSize(), N = dn(w) * I * mi(nt(w) / I) || 0;
      w = a.toPosition(t.Controller.toDest(w % I)) + N;
    }
    var M = mo(A, w, 1);
    v = 1, T = M ? 0 : T || pi(nt(w - A) / nu, su), f = D, m = Ii(T, _, H(y, A, w, b), 1), o(ke), r(jn), m.start();
  }
  function _() {
    o(re), f && f(), r(he);
  }
  function y(w, T, $, D) {
    var b = l(), A = w + (T - w) * O(D), I = (A - b) * v;
    d(b + I), h && !$ && u() && (v *= iu, nt(I) < tu && g(c(u(!0)), eu, !1, f, !0));
  }
  function P() {
    m && m.cancel();
  }
  function x() {
    m && !m.isPaused() && (P(), _());
  }
  function O(w) {
    var T = i.easingFunc;
    return T ? T(w) : 1 - Math.pow(1 - w, 4);
  }
  return {
    mount: p,
    destroy: P,
    scroll: g,
    cancel: x
  };
}
var Qt = {
  passive: !1,
  capture: !0
};
function ou(e, t, i) {
  var n = q(e), s = n.on, r = n.emit, o = n.bind, a = n.unbind, l = e.state, c = t.Move, u = t.Scroll, d = t.Controller, h = t.Elements.track, m = t.Media.reduce, f = t.Direction, v = f.resolve, p = f.orient, g = c.getPosition, _ = c.exceededLimit, y, P, x, O, w, T = !1, $, D, b;
  function A() {
    o(h, Wi, un, Qt), o(h, Hi, un, Qt), o(h, Fo, N, Qt), o(h, "click", V, {
      capture: !0
    }), o(h, "dragstart", Et), s([Yt, st], I);
  }
  function I() {
    var C = i.drag;
    rs(!C), O = C === "free";
  }
  function N(C) {
    if ($ = !1, !D) {
      var G = tt(C);
      j(C.target) && (G || !C.button) && (d.isBusy() ? Et(C, !0) : (b = G ? h : window, w = l.is([ue, ke]), x = null, o(b, Wi, M, Qt), o(b, Hi, k, Qt), c.cancel(), u.cancel(), z(C)));
    }
  }
  function M(C) {
    if (l.is(ri) || (l.set(ri), r(pc)), C.cancelable)
      if (w) {
        c.translate(y + it(U(C)));
        var G = ht(C) > Ds, $t = T !== (T = _());
        (G || $t) && z(C), $ = !0, r(mc), Et(C);
      } else
        L(C) && (w = E(C), Et(C));
  }
  function k(C) {
    l.is(ri) && (l.set(re), r(vc)), w && (R(C), Et(C)), a(b, Wi, M), a(b, Hi, k), w = !1;
  }
  function V(C) {
    !D && $ && Et(C, !0);
  }
  function z(C) {
    x = P, P = C, y = g();
  }
  function R(C) {
    var G = B(C), $t = F(G), fe = i.rewind && i.rewindByDrag;
    m(!1), O ? d.scroll($t, 0, i.snap) : e.is(je) ? d.go(p(dn(G)) < 0 ? fe ? "<" : "-" : fe ? ">" : "+") : e.is(oe) && T && fe ? d.go(_(!0) ? ">" : "<") : d.go(d.toDest($t), !0), m(!0);
  }
  function E(C) {
    var G = i.dragMinThreshold, $t = Ce(G), fe = $t && G.mouse || 0, ea = ($t ? G.touch : +G) || 10;
    return nt(U(C)) > (tt(C) ? ea : fe);
  }
  function L(C) {
    return nt(U(C)) > nt(U(C, !0));
  }
  function B(C) {
    if (e.is(de) || !T) {
      var G = ht(C);
      if (G && G < Ds)
        return U(C) / G;
    }
    return 0;
  }
  function F(C) {
    return g() + dn(C) * Mt(nt(C) * (i.flickPower || 600), O ? 1 / 0 : t.Layout.listSize() * (i.flickMaxPages || 1));
  }
  function U(C, G) {
    return W(C, G) - W(S(C), G);
  }
  function ht(C) {
    return hn(C) - hn(S(C));
  }
  function S(C) {
    return P === C && x || P;
  }
  function W(C, G) {
    return (tt(C) ? C.changedTouches[0] : C)["page" + v(G ? "Y" : "X")];
  }
  function it(C) {
    return C / (T && e.is(oe) ? Zc : 1);
  }
  function j(C) {
    var G = i.noDrag;
    return !Te(C, "." + Do + ", ." + Ri) && (!G || !Te(C, G));
  }
  function tt(C) {
    return typeof TouchEvent < "u" && C instanceof TouchEvent;
  }
  function ta() {
    return w;
  }
  function rs(C) {
    D = C;
  }
  return {
    mount: A,
    disable: rs,
    isDragging: ta
  };
}
var au = {
  Spacebar: " ",
  Right: Li,
  Left: Ti,
  Up: xo,
  Down: Po
};
function ts(e) {
  return e = Rt(e) ? e : e.key, au[e] || e;
}
var Rs = "keydown";
function lu(e, t, i) {
  var n = q(e), s = n.on, r = n.bind, o = n.unbind, a = e.root, l = t.Direction.resolve, c, u;
  function d() {
    h(), s(st, m), s(st, h), s(zt, v);
  }
  function h() {
    var g = i.keyboard;
    g && (c = g === "global" ? window : a, r(c, Rs, p));
  }
  function m() {
    o(c, Rs);
  }
  function f(g) {
    u = g;
  }
  function v() {
    var g = u;
    u = !0, ao(function() {
      u = g;
    });
  }
  function p(g) {
    if (!u) {
      var _ = ts(g);
      _ === l(Ti) ? e.go("<") : _ === l(Li) && e.go(">");
    }
  }
  return {
    mount: d,
    destroy: m,
    disable: f
  };
}
var xe = Kn + "-lazy", li = xe + "-srcset", cu = "[" + xe + "], [" + li + "]";
function uu(e, t, i) {
  var n = q(e), s = n.on, r = n.off, o = n.bind, a = n.emit, l = i.lazyLoad === "sequential", c = [Ge, he], u = [];
  function d() {
    i.lazyLoad && (h(), s(J, h));
  }
  function h() {
    Pt(u), m(), l ? g() : (r(c), s(c, f), f());
  }
  function m() {
    t.Slides.forEach(function(_) {
      Un(_.slide, cu).forEach(function(y) {
        var P = ft(y, xe), x = ft(y, li);
        if (P !== y.src || x !== y.srcset) {
          var O = i.classes.spinner, w = y.parentElement, T = Ue(w, "." + O) || ee("span", O, w);
          u.push([y, _, T]), y.src || De(y, "none");
        }
      });
    });
  }
  function f() {
    u = u.filter(function(_) {
      var y = i.perPage * ((i.preloadPages || 1) + 1) - 1;
      return _[1].isWithin(e.index, y) ? v(_) : !0;
    }), u.length || r(c);
  }
  function v(_) {
    var y = _[0];
    gt(_[1].slide, mn), o(y, "load error", H(p, _)), Z(y, "src", ft(y, xe)), Z(y, "srcset", ft(y, li)), yt(y, xe), yt(y, li);
  }
  function p(_, y) {
    var P = _[0], x = _[1];
    bt(x.slide, mn), y.type !== "error" && (jt(_[2]), De(P, ""), a(So, P, x), a(Me)), l && g();
  }
  function g() {
    u.length && v(u.shift());
  }
  return {
    mount: d,
    destroy: H(Pt, u),
    check: f
  };
}
function hu(e, t, i) {
  var n = q(e), s = n.on, r = n.emit, o = n.bind, a = t.Slides, l = t.Elements, c = t.Controller, u = c.hasFocus, d = c.getIndex, h = c.go, m = t.Direction.resolve, f = l.pagination, v = [], p, g;
  function _() {
    y(), s([st, J, vi], _);
    var D = i.pagination;
    f && De(f, D ? "" : "none"), D && (s([zt, jn, he], $), P(), $(), r(wc, {
      list: p,
      items: v
    }, T(e.index)));
  }
  function y() {
    p && (jt(f ? Nt(p.children) : p), bt(p, g), Pt(v), p = null), n.destroy();
  }
  function P() {
    var D = e.length, b = i.classes, A = i.i18n, I = i.perPage, N = u() ? c.getEnd() + 1 : Re(D / I);
    p = f || ee("ul", b.pagination, l.track.parentElement), gt(p, g = Mi + "--" + w()), Z(p, At, "tablist"), Z(p, ct, A.select), Z(p, Yn, w() === Oi ? "vertical" : "");
    for (var M = 0; M < N; M++) {
      var k = ee("li", null, p), V = ee("button", {
        class: b.page,
        type: "button"
      }, k), z = a.getIn(M).map(function(E) {
        return E.slide.id;
      }), R = !u() && I > 1 ? A.pageX : A.slideX;
      o(V, "click", H(x, M)), i.paginationKeyboard && o(V, "keydown", H(O, M)), Z(k, At, "presentation"), Z(V, At, "tab"), Z(V, qe, z.join(" ")), Z(V, ct, fn(R, M + 1)), Z(V, ie, -1), v.push({
        li: k,
        button: V,
        page: M
      });
    }
  }
  function x(D) {
    h(">" + D, !0);
  }
  function O(D, b) {
    var A = v.length, I = ts(b), N = w(), M = -1;
    I === m(Li, !1, N) ? M = ++D % A : I === m(Ti, !1, N) ? M = (--D + A) % A : I === "Home" ? M = 0 : I === "End" && (M = A - 1);
    var k = v[M];
    k && (ho(k.button), h(">" + M), Et(b, !0));
  }
  function w() {
    return i.paginationDirection || i.direction;
  }
  function T(D) {
    return v[c.toPage(D)];
  }
  function $() {
    var D = T(d(!0)), b = T(d());
    if (D) {
      var A = D.button;
      bt(A, Xt), yt(A, Is), Z(A, ie, -1);
    }
    if (b) {
      var I = b.button;
      gt(I, Xt), Z(I, Is, !0), Z(I, ie, "");
    }
    r(Ec, {
      list: p,
      items: v
    }, D, b);
  }
  return {
    items: v,
    mount: _,
    destroy: y,
    getAt: T,
    update: $
  };
}
var du = [" ", "Enter"];
function fu(e, t, i) {
  var n = i.isNavigation, s = i.slideFocus, r = [];
  function o() {
    e.splides.forEach(function(f) {
      f.isParent || (c(e, f.splide), c(f.splide, e));
    }), n && u();
  }
  function a() {
    r.forEach(function(f) {
      f.destroy();
    }), Pt(r);
  }
  function l() {
    a(), o();
  }
  function c(f, v) {
    var p = q(f);
    p.on(zt, function(g, _, y) {
      v.go(v.is(de) ? y : g);
    }), r.push(p);
  }
  function u() {
    var f = q(e), v = f.on;
    v(_o, h), v(bo, m), v([Yt, st], d), r.push(f), f.emit(yo, e.splides);
  }
  function d() {
    Z(t.Elements.list, Yn, i.direction === Oi ? "vertical" : "");
  }
  function h(f) {
    e.go(f.index);
  }
  function m(f, v) {
    Wn(du, ts(v)) && (h(f), Et(v));
  }
  return {
    setup: H(t.Media.set, {
      slideFocus: Ve(s) ? n : s
    }, !0),
    mount: o,
    destroy: a,
    remount: l
  };
}
function pu(e, t, i) {
  var n = q(e), s = n.bind, r = 0;
  function o() {
    i.wheel && s(t.Elements.track, "wheel", a, Qt);
  }
  function a(c) {
    if (c.cancelable) {
      var u = c.deltaY, d = u < 0, h = hn(c), m = i.wheelMinThreshold || 0, f = i.wheelSleep || 0;
      nt(u) > m && h - r > f && (e.go(d ? "<" : ">"), r = h), l(d) && Et(c);
    }
  }
  function l(c) {
    return !i.releaseWheel || e.state.is(ue) || t.Controller.getAdjacent(c) !== -1;
  }
  return {
    mount: o
  };
}
var mu = 90;
function vu(e, t, i) {
  var n = q(e), s = n.on, r = t.Elements.track, o = i.live && !i.isNavigation, a = ee("span", Mc), l = Ii(mu, H(u, !1));
  function c() {
    o && (h(!t.Autoplay.isPaused()), Z(r, Ls, !0), a.textContent = "…", s(wo, H(h, !0)), s(Eo, H(h, !1)), s([Ge, he], H(u, !0)));
  }
  function u(m) {
    Z(r, Ts, m), m ? (He(r, a), l.start()) : (jt(a), l.cancel());
  }
  function d() {
    yt(r, [Cs, Ls, Ts]), jt(a);
  }
  function h(m) {
    o && Z(r, Cs, m ? "off" : "polite");
  }
  return {
    mount: c,
    disable: h,
    destroy: d
  };
}
var _u = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Media: xc,
  Direction: Pc,
  Elements: Bc,
  Slides: Vc,
  Layout: Wc,
  Clones: Uc,
  Move: Kc,
  Controller: Gc,
  Arrows: Xc,
  Autoplay: Jc,
  Cover: Qc,
  Scroll: ru,
  Drag: ou,
  Keyboard: lu,
  LazyLoad: uu,
  Pagination: hu,
  Sync: fu,
  Wheel: pu,
  Live: vu
}), gu = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
}, yu = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: !0,
  arrows: !0,
  pagination: !0,
  paginationKeyboard: !0,
  interval: 5e3,
  pauseOnHover: !0,
  pauseOnFocus: !0,
  resetProgress: !0,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: !0,
  direction: "ltr",
  trimSpace: !0,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: !0,
  classes: Fc,
  i18n: gu,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function wu(e, t, i) {
  var n = t.Slides;
  function s() {
    q(e).on([Yt, J], r);
  }
  function r() {
    n.forEach(function(a) {
      a.style("transform", "translateX(-" + 100 * a.index + "%)");
    });
  }
  function o(a, l) {
    n.style("transition", "opacity " + i.speed + "ms " + i.easing), ao(l);
  }
  return {
    mount: s,
    start: o,
    cancel: un
  };
}
function Eu(e, t, i) {
  var n = t.Move, s = t.Controller, r = t.Scroll, o = t.Elements.list, a = H(dt, o, "transition"), l;
  function c() {
    q(e).bind(o, "transitionend", function(m) {
      m.target === o && l && (d(), l());
    });
  }
  function u(m, f) {
    var v = n.toPosition(m, !0), p = n.getPosition(), g = h(m);
    nt(v - p) >= 1 && g >= 1 ? i.useScroll ? r.scroll(v, g, !1, f) : (a("transform " + g + "ms " + i.easing), n.translate(v, !0), l = f) : (n.jump(m), f());
  }
  function d() {
    a(""), r.cancel();
  }
  function h(m) {
    var f = i.rewindSpeed;
    if (e.is(oe) && f) {
      var v = s.getIndex(!0), p = s.getEnd();
      if (v === 0 && m >= p || v >= p && m === 0)
        return f;
    }
    return i.speed;
  }
  return {
    mount: c,
    start: u,
    cancel: d
  };
}
var Su = /* @__PURE__ */ function() {
  function e(i, n) {
    this.event = q(), this.Components = {}, this.state = bc(te), this.splides = [], this._o = {}, this._E = {};
    var s = Rt(i) ? po(document, i) : i;
    Ae(s, s + " is invalid."), this.root = s, n = Ct({
      label: ft(s, ct) || "",
      labelledby: ft(s, Xn) || ""
    }, yu, e.defaults, n || {});
    try {
      Ct(n, JSON.parse(ft(s, Kn)));
    } catch {
      Ae(!1, "Invalid JSON");
    }
    this._o = Object.create(Ct({}, n));
  }
  var t = e.prototype;
  return t.mount = function(n, s) {
    var r = this, o = this.state, a = this.Components;
    Ae(o.is([te, fi]), "Already mounted!"), o.set(te), this._C = a, this._T = s || this._T || (this.is(je) ? wu : Eu), this._E = n || this._E;
    var l = Oe({}, _u, this._E, {
      Transition: this._T
    });
    return qt(l, function(c, u) {
      var d = c(r, a, r._o);
      a[u] = d, d.setup && d.setup();
    }), qt(a, function(c) {
      c.mount && c.mount();
    }), this.emit(Yt), gt(this.root, zc), o.set(re), this.emit(xs), this;
  }, t.sync = function(n) {
    return this.splides.push({
      splide: n
    }), n.splides.push({
      splide: this,
      isParent: !0
    }), this.state.is(re) && (this._C.Sync.remount(), n.Components.Sync.remount()), this;
  }, t.go = function(n) {
    return this._C.Controller.go(n), this;
  }, t.on = function(n, s) {
    return this.event.on(n, s), this;
  }, t.off = function(n) {
    return this.event.off(n), this;
  }, t.emit = function(n) {
    var s;
    return (s = this.event).emit.apply(s, [n].concat(Nt(arguments, 1))), this;
  }, t.add = function(n, s) {
    return this._C.Slides.add(n, s), this;
  }, t.remove = function(n) {
    return this._C.Slides.remove(n), this;
  }, t.is = function(n) {
    return this._o.type === n;
  }, t.refresh = function() {
    return this.emit(J), this;
  }, t.destroy = function(n) {
    n === void 0 && (n = !0);
    var s = this.event, r = this.state;
    return r.is(te) ? q(this).on(xs, this.destroy.bind(this, n)) : (qt(this._C, function(o) {
      o.destroy && o.destroy(n);
    }, !0), s.emit(go), s.destroy(), n && Pt(this.splides), r.set(fi)), this;
  }, oc(e, [{
    key: "options",
    get: function() {
      return this._o;
    },
    set: function(n) {
      this._C.Media.set(n, !0, !0);
    }
  }, {
    key: "length",
    get: function() {
      return this._C.Slides.getLength(!0);
    }
  }, {
    key: "index",
    get: function() {
      return this._C.Controller.getIndex();
    }
  }]), e;
}(), es = Su;
es.defaults = {};
es.STATES = lc;
/*!
 * @splidejs/splide-extension-auto-scroll
 * Version  : 0.5.3
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
function bu(e) {
  e.length = 0;
}
function is(e, t, i) {
  return Array.prototype.slice.call(e, t, i);
}
function zi(e) {
  return e.bind.apply(e, [null].concat(is(arguments, 1)));
}
function Ms(e) {
  return requestAnimationFrame(e);
}
function ns(e, t) {
  return typeof t === e;
}
var $o = Array.isArray;
zi(ns, "function");
zi(ns, "string");
zi(ns, "undefined");
function Zo(e) {
  return $o(e) ? e : [e];
}
function zs(e, t) {
  Zo(e).forEach(t);
}
var Au = Object.keys;
function xu(e, t, i) {
  if (e) {
    var n = Au(e);
    n = i ? n.reverse() : n;
    for (var s = 0; s < n.length; s++) {
      var r = n[s];
      if (r !== "__proto__" && t(e[r], r) === !1)
        break;
    }
  }
  return e;
}
function Pu(e) {
  return is(arguments, 1).forEach(function(t) {
    xu(t, function(i, n) {
      e[n] = t[n];
    });
  }), e;
}
var Iu = Math.min;
function Cu() {
  var e = [];
  function t(o, a, l, c) {
    s(o, a, function(u, d, h) {
      var m = "addEventListener" in u, f = m ? u.removeEventListener.bind(u, d, l, c) : u.removeListener.bind(u, l);
      m ? u.addEventListener(d, l, c) : u.addListener(l), e.push([u, d, h, l, f]);
    });
  }
  function i(o, a, l) {
    s(o, a, function(c, u, d) {
      e = e.filter(function(h) {
        return h[0] === c && h[1] === u && h[2] === d && (!l || h[3] === l) ? (h[4](), !1) : !0;
      });
    });
  }
  function n(o, a, l) {
    var c, u = !0;
    return typeof CustomEvent == "function" ? c = new CustomEvent(a, {
      bubbles: u,
      detail: l
    }) : (c = document.createEvent("CustomEvent"), c.initCustomEvent(a, u, !1, l)), o.dispatchEvent(c), c;
  }
  function s(o, a, l) {
    zs(o, function(c) {
      c && zs(a, function(u) {
        u.split(" ").forEach(function(d) {
          var h = d.split(".");
          l(c, h[0], h[1]);
        });
      });
    });
  }
  function r() {
    e.forEach(function(o) {
      o[4]();
    }), bu(e);
  }
  return {
    bind: t,
    unbind: i,
    dispatch: n,
    destroy: r
  };
}
var Ns = "move", Fs = "moved", Tu = "updated", $s = "drag", Lu = "dragged", Zs = "scroll", Bs = "scrolled", Ou = "destroy";
function Du(e) {
  var t = e ? e.event.bus : document.createDocumentFragment(), i = Cu();
  function n(r, o) {
    i.bind(t, Zo(r).join(" "), function(a) {
      o.apply(o, $o(a.detail) ? a.detail : []);
    });
  }
  function s(r) {
    i.dispatch(t, r, is(arguments, 1));
  }
  return e && e.event.on(Ou, i.destroy), Pu(i, {
    bus: t,
    on: n,
    off: zi(i.unbind, t),
    emit: s
  });
}
function Bo(e, t, i, n) {
  var s = Date.now, r, o = 0, a, l = !0, c = 0;
  function u() {
    if (!l) {
      if (o = e ? Iu((s() - r) / e, 1) : 1, i && i(o), o >= 1 && (t(), r = s(), n && ++c >= n))
        return h();
      Ms(u);
    }
  }
  function d(g) {
    !g && f(), r = s() - (g ? o * e : 0), l = !1, Ms(u);
  }
  function h() {
    l = !0;
  }
  function m() {
    r = s(), o = 0, i && i(o);
  }
  function f() {
    a && cancelAnimationFrame(a), o = 0, a = 0, l = !0;
  }
  function v(g) {
    e = g;
  }
  function p() {
    return l;
  }
  return {
    start: d,
    rewind: m,
    pause: h,
    cancel: f,
    set: v,
    isPaused: p
  };
}
function Ru(e, t) {
  var i;
  function n() {
    i || (i = Bo(t || 0, function() {
      e(), i = null;
    }, null, 1), i.start());
  }
  return n;
}
var Mu = "is-active", zu = "slide", Nu = "fade";
function ko(e, t, i) {
  return Array.prototype.slice.call(e, t, i);
}
function ss(e) {
  return e.bind(null, ...ko(arguments, 1));
}
function Ni(e, t) {
  return typeof t === e;
}
function vn(e) {
  return !Vo(e) && Ni("object", e);
}
const Fu = Array.isArray;
ss(Ni, "function");
ss(Ni, "string");
const $u = ss(Ni, "undefined");
function Vo(e) {
  return e === null;
}
function Zu(e) {
  return Fu(e) ? e : [e];
}
function _i(e, t) {
  Zu(e).forEach(t);
}
function Bu(e, t, i) {
  e && _i(t, (n) => {
    n && e.classList[i ? "add" : "remove"](n);
  });
}
const ku = Object.keys;
function Wo(e, t, i) {
  if (e) {
    let n = ku(e);
    n = i ? n.reverse() : n;
    for (let s = 0; s < n.length; s++) {
      const r = n[s];
      if (r !== "__proto__" && t(e[r], r) === !1)
        break;
    }
  }
  return e;
}
function ks(e) {
  return ko(arguments, 1).forEach((t) => {
    Wo(t, (i, n) => {
      e[n] = t[n];
    });
  }), e;
}
function Vu(e, t) {
  _i(e, (i) => {
    _i(t, (n) => {
      i && i.removeAttribute(n);
    });
  });
}
function Ho(e, t, i) {
  vn(t) ? Wo(t, (n, s) => {
    Ho(e, s, n);
  }) : _i(e, (n) => {
    Vo(i) || i === "" ? Vu(n, t) : n.setAttribute(t, String(i));
  });
}
const { min: Vs, max: Ws, floor: ad, ceil: ld, abs: cd } = Math;
function Wu(e, t, i) {
  const n = Vs(t, i), s = Ws(t, i);
  return Vs(Ws(n, e), s);
}
const Hu = {
  speed: 1,
  autoStart: !0,
  pauseOnHover: !0,
  pauseOnFocus: !0
}, Uu = {
  startScroll: "Start auto scroll",
  pauseScroll: "Pause auto scroll"
};
function Ku(e, t, i) {
  const { on: n, off: s, bind: r, unbind: o } = Du(e), { translate: a, getPosition: l, toIndex: c, getLimit: u } = t.Move, { setIndex: d, getIndex: h } = t.Controller, { orient: m } = t.Direction, { toggle: f } = t.Elements, { Live: v } = t, { root: p } = e, g = Ru(t.Arrows.update, 500);
  let _ = {}, y, P, x, O, w, T;
  function $() {
    const { autoScroll: F } = i;
    _ = ks({}, Hu, vn(F) ? F : {});
  }
  function D() {
    e.is(Nu) || !y && i.autoScroll !== !1 && (y = Bo(0, z), A(), N());
  }
  function b() {
    y && (y.cancel(), y = null, T = void 0, s([Ns, $s, Zs, Fs, Bs]), o(p, "mouseenter mouseleave focusin focusout"), o(f, "click"));
  }
  function A() {
    _.pauseOnHover && r(p, "mouseenter mouseleave", (F) => {
      x = F.type === "mouseenter", V();
    }), _.pauseOnFocus && r(p, "focusin focusout", (F) => {
      O = F.type === "focusin", V();
    }), _.useToggleButton && r(f, "click", () => {
      P ? M() : k();
    }), n(Tu, I), n([Ns, $s, Zs], () => {
      w = !0, k(!1);
    }), n([Fs, Lu, Bs], () => {
      w = !1, V();
    });
  }
  function I() {
    const { autoScroll: F } = i;
    F !== !1 ? (_ = ks({}, _, vn(F) ? F : {}), D()) : b(), y && !$u(T) && a(T);
  }
  function N() {
    _.autoStart && (document.readyState === "complete" ? M() : r(window, "load", M));
  }
  function M() {
    B() && (y.start(!0), v.disable(!0), O = x = P = !1, L());
  }
  function k(F = !0) {
    P || (P = F, L(), B() || (y.pause(), v.disable(!1)));
  }
  function V() {
    P || (x || O || w ? k(!1) : M());
  }
  function z() {
    const F = l(), U = R(F);
    F !== U ? (a(U), E(T = l())) : (k(!1), _.rewind && e.go(_.speed > 0 ? 0 : t.Controller.getEnd())), g();
  }
  function R(F) {
    const U = _.speed || 1;
    return F += m(U), e.is(zu) && (F = Wu(F, u(!1), u(!0))), F;
  }
  function E(F) {
    const { length: U } = e, ht = (c(F) + U) % U;
    ht !== h() && (d(ht), t.Slides.update(), t.Pagination.update(), i.lazyLoad === "nearby" && t.LazyLoad.check());
  }
  function L() {
    if (f) {
      const F = P ? "startScroll" : "pauseScroll";
      Bu(f, Mu, !P), Ho(f, "aria-label", i.i18n[F] || Uu[F]);
    }
  }
  function B() {
    return !y || y.isPaused();
  }
  return {
    setup: $,
    mount: D,
    destroy: b,
    play: M,
    pause: k,
    isPaused: B
  };
}
/*!
  * PhotoSwipe Lightbox 5.4.2 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function ge(e, t, i) {
  const n = document.createElement(t);
  return e && (n.className = e), i && i.appendChild(n), n;
}
function Gu(e, t, i) {
  let n = `translate3d(${e}px,${t || 0}px,0)`;
  return i !== void 0 && (n += ` scale3d(${i},${i},1)`), n;
}
function _n(e, t, i) {
  e.style.width = typeof t == "number" ? `${t}px` : t, e.style.height = typeof i == "number" ? `${i}px` : i;
}
const ot = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function qu(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ye(e, t, i = document) {
  let n = [];
  if (e instanceof Element)
    n = [e];
  else if (e instanceof NodeList || Array.isArray(e))
    n = Array.from(e);
  else {
    const s = typeof e == "string" ? e : t;
    s && (n = Array.from(i.querySelectorAll(s)));
  }
  return n;
}
function ju(e) {
  return typeof e == "function" && e.prototype && e.prototype.goTo;
}
function Hs() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
let Xu = class {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(t, i) {
    this.type = t, this.defaultPrevented = !1, i && Object.assign(this, i);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}, Yu = class {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(t, i, n = 100) {
    var s, r, o;
    this._filters[t] || (this._filters[t] = []), (s = this._filters[t]) === null || s === void 0 || s.push({
      fn: i,
      priority: n
    }), (r = this._filters[t]) === null || r === void 0 || r.sort((a, l) => a.priority - l.priority), (o = this.pswp) === null || o === void 0 || o.addFilter(t, i, n);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(t, i) {
    this._filters[t] && (this._filters[t] = this._filters[t].filter((n) => n.fn !== i)), this.pswp && this.pswp.removeFilter(t, i);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(t, ...i) {
    var n;
    return (n = this._filters[t]) === null || n === void 0 || n.forEach((s) => {
      i[0] = s.fn.apply(this, i);
    }), i[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(t, i) {
    var n, s;
    this._listeners[t] || (this._listeners[t] = []), (n = this._listeners[t]) === null || n === void 0 || n.push(i), (s = this.pswp) === null || s === void 0 || s.on(t, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(t, i) {
    var n;
    this._listeners[t] && (this._listeners[t] = this._listeners[t].filter((s) => i !== s)), (n = this.pswp) === null || n === void 0 || n.off(t, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(t, i) {
    var n;
    if (this.pswp)
      return this.pswp.dispatch(t, i);
    const s = (
      /** @type {AugmentedEvent<T>} */
      new Xu(t, i)
    );
    return (n = this._listeners[t]) === null || n === void 0 || n.forEach((r) => {
      r.call(this, s);
    }), s;
  }
}, Ju = class {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(t, i) {
    if (this.element = ge("pswp__img pswp__img--placeholder", t ? "img" : "div", i), t) {
      const n = (
        /** @type {HTMLImageElement} */
        this.element
      );
      n.decoding = "async", n.alt = "", n.src = t, n.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(t, i) {
    this.element && (this.element.tagName === "IMG" ? (_n(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = Gu(0, 0, t / 250)) : _n(this.element, t, i));
  }
  destroy() {
    var t;
    (t = this.element) !== null && t !== void 0 && t.parentNode && this.element.remove(), this.element = null;
  }
}, Qu = class {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(t, i, n) {
    this.instance = i, this.data = t, this.index = n, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = ot.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(t, i) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const n = this.placeholder.element;
        n && !n.parentElement && this.slide.container.prepend(n);
      } else {
        const n = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new Ju(n, this.slide.container);
      }
    this.element && !i || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: t
    }).defaultPrevented || (this.isImageContent() ? (this.element = ge("pswp__img", "img"), this.displayedImageWidth && this.loadImage(t)) : (this.element = ge("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), i && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(t) {
    var i, n;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented)
      return;
    const s = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (s.srcset = this.data.srcset), s.src = (i = this.data.src) !== null && i !== void 0 ? i : "", s.alt = (n = this.data.alt) !== null && n !== void 0 ? n : "", this.state = ot.LOADING, s.complete ? this.onLoaded() : (s.onload = () => {
      this.onLoaded();
    }, s.onerror = () => {
      this.onError();
    });
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(t) {
    this.slide = t, this.hasSlide = !0, this.instance = t.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = ot.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === ot.LOADED || this.state === ot.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = ot.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: !0,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === ot.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === ot.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(t, i) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, i), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: i
    }).defaultPrevented && (_n(this.element, t, i), this.isImageContent() && !this.isError()))) {
      const n = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = i, n ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: i,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== ot.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset)
      return;
    const t = (
      /** @type HTMLImageElement */
      this.element
    ), i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || i > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = i + "px", t.dataset.largestUsedSize = String(i));
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(!0);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = !1, this.slide = void 0, !this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented && (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var t, i;
      let n = ge("pswp__error-msg", "div");
      n.innerText = (t = (i = this.instance.options) === null || i === void 0 ? void 0 : i.errorMsg) !== null && t !== void 0 ? t : "", n = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", n, this), this.element = ge("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(n), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === ot.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const t = "decode" in this.element;
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || Hs()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
    }).finally(() => {
      this.isDecoding = !1, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !Hs() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = !1, !this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented && (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === ot.LOADED || this.state === ot.ERROR) && this.removePlaceholder()));
  }
};
function th(e, t) {
  if (e.getViewportSizeFn) {
    const i = e.getViewportSizeFn(e, t);
    if (i)
      return i;
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function ni(e, t, i, n, s) {
  let r = 0;
  if (t.paddingFn)
    r = t.paddingFn(i, n, s)[e];
  else if (t.padding)
    r = t.padding[e];
  else {
    const o = "padding" + e[0].toUpperCase() + e.slice(1);
    t[o] && (r = t[o]);
  }
  return Number(r) || 0;
}
function eh(e, t, i, n) {
  return {
    x: t.x - ni("left", e, t, i, n) - ni("right", e, t, i, n),
    y: t.y - ni("top", e, t, i, n) - ni("bottom", e, t, i, n)
  };
}
const Us = 4e3;
let ih = class {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(t, i, n, s) {
    this.pswp = s, this.options = t, this.itemData = i, this.index = n, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(t, i, n) {
    const s = {
      x: t,
      y: i
    };
    this.elementSize = s, this.panAreaSize = n;
    const r = n.x / s.x, o = n.y / s.y;
    this.fit = Math.min(1, r < o ? r : o), this.fill = Math.min(1, r > o ? r : o), this.vFill = Math.min(1, o), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(t) {
    const i = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      t + "ZoomLevel"
    ), n = this.options[i];
    if (n)
      return typeof n == "function" ? n(this) : n === "fill" ? this.fill : n === "fit" ? this.fit : Number(n);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let t = this._parseZoomLevelOption("secondary");
    return t || (t = Math.min(1, this.fit * 3), this.elementSize && t * this.elementSize.x > Us && (t = Us / this.elementSize.x), t);
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
};
function Uo(e, t, i) {
  const n = t.createContentFromData(e, i);
  let s;
  const {
    options: r
  } = t;
  if (r) {
    s = new ih(r, e, -1);
    let o;
    t.pswp ? o = t.pswp.viewportSize : o = th(r, t);
    const a = eh(r, o, e, i);
    s.update(n.width, n.height, a);
  }
  return n.lazyLoad(), s && n.setDisplayedSize(Math.ceil(n.width * s.initial), Math.ceil(n.height * s.initial)), n;
}
function nh(e, t) {
  const i = t.getItemData(e);
  if (!t.dispatch("lazyLoadSlide", {
    index: e,
    itemData: i
  }).defaultPrevented)
    return Uo(i, t, e);
}
let sh = class extends Yu {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var t;
    let i = 0;
    const n = (t = this.options) === null || t === void 0 ? void 0 : t.dataSource;
    n && "length" in n ? i = n.length : n && "gallery" in n && (n.items || (n.items = this._getGalleryDOMElements(n.gallery)), n.items && (i = n.items.length));
    const s = this.dispatch("numItems", {
      dataSource: n,
      numItems: i
    });
    return this.applyFilters("numItems", s.numItems, n);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(t, i) {
    return new Qu(t, this, i);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(t) {
    var i;
    const n = (i = this.options) === null || i === void 0 ? void 0 : i.dataSource;
    let s = {};
    Array.isArray(n) ? s = n[t] : n && "gallery" in n && (n.items || (n.items = this._getGalleryDOMElements(n.gallery)), s = n.items[t]);
    let r = s;
    r instanceof Element && (r = this._domElementToItemData(r));
    const o = this.dispatch("itemData", {
      itemData: r || {},
      index: t
    });
    return this.applyFilters("itemData", o.itemData, t);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(t) {
    var i, n;
    return (i = this.options) !== null && i !== void 0 && i.children || (n = this.options) !== null && n !== void 0 && n.childSelector ? ye(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(t) {
    const i = {
      element: t
    }, n = (
      /** @type {HTMLAnchorElement} */
      t.tagName === "A" ? t : t.querySelector("a")
    );
    if (n) {
      i.src = n.dataset.pswpSrc || n.href, n.dataset.pswpSrcset && (i.srcset = n.dataset.pswpSrcset), i.width = n.dataset.pswpWidth ? parseInt(n.dataset.pswpWidth, 10) : 0, i.height = n.dataset.pswpHeight ? parseInt(n.dataset.pswpHeight, 10) : 0, i.w = i.width, i.h = i.height, n.dataset.pswpType && (i.type = n.dataset.pswpType);
      const r = t.querySelector("img");
      if (r) {
        var s;
        i.msrc = r.currentSrc || r.src, i.alt = (s = r.getAttribute("alt")) !== null && s !== void 0 ? s : "";
      }
      (n.dataset.pswpCropped || n.dataset.cropped) && (i.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", i, t, n);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(t, i) {
    return Uo(t, this, i);
  }
};
class rh extends sh {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(t) {
    super(), this.options = t || {}, this._uid = 0, this.shouldOpen = !1, this._preloadedContent = void 0, this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    ye(this.options.gallery, this.options.gallerySelector).forEach((t) => {
      t.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(t) {
    if (qu(t) || window.pswp)
      return;
    let i = {
      x: t.clientX,
      y: t.clientY
    };
    !i.x && !i.y && (i = null);
    let n = this.getClickedIndex(t);
    n = this.applyFilters("clickedIndex", n, t, this);
    const s = {
      gallery: (
        /** @type {HTMLElement} */
        t.currentTarget
      )
    };
    n >= 0 && (t.preventDefault(), this.loadAndOpen(n, s, i));
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(t) {
    if (this.options.getClickedIndexFn)
      return this.options.getClickedIndexFn.call(this, t);
    const i = (
      /** @type {HTMLElement} */
      t.target
    ), s = ye(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      t.currentTarget
    ).findIndex((r) => r === i || r.contains(i));
    return s !== -1 ? s : this.options.children || this.options.childSelector ? -1 : 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(t, i, n) {
    if (window.pswp || !this.options)
      return !1;
    if (!i && this.options.gallery && this.options.children) {
      const s = ye(this.options.gallery);
      s[0] && (i = {
        gallery: s[0]
      });
    }
    return this.options.index = t, this.options.initialPointerPos = n, this.shouldOpen = !0, this.preload(t, i), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(t, i) {
    const {
      options: n
    } = this;
    i && (n.dataSource = i);
    const s = [], r = typeof n.pswpModule;
    if (ju(n.pswpModule))
      s.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        n.pswpModule
      ));
    else {
      if (r === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (r === "function")
        s.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          n.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof n.openPromise == "function" && s.push(n.openPromise()), n.preloadFirstSlide !== !1 && t >= 0 && (this._preloadedContent = nh(t, this));
    const o = ++this._uid;
    Promise.all(s).then((a) => {
      if (this.shouldOpen) {
        const l = a[0];
        this._openPhotoswipe(l, o);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(t, i) {
    if (i !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const n = typeof t == "object" ? new t.default(this.options) : new t(this.options);
    this.pswp = n, window.pswp = n, Object.keys(this._listeners).forEach((s) => {
      var r;
      (r = this._listeners[s]) === null || r === void 0 || r.forEach((o) => {
        n.on(
          s,
          /** @type {EventCallback<typeof name>} */
          o
        );
      });
    }), Object.keys(this._filters).forEach((s) => {
      var r;
      (r = this._filters[s]) === null || r === void 0 || r.forEach((o) => {
        n.addFilter(s, o.fn, o.priority);
      });
    }), this._preloadedContent && (n.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), n.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), n.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var t;
    (t = this.pswp) === null || t === void 0 || t.destroy(), this.shouldOpen = !1, this._listeners = {}, ye(this.options.gallery, this.options.gallerySelector).forEach((i) => {
      i.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
/*!
  * PhotoSwipe 5.4.2 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function rt(e, t, i) {
  const n = document.createElement(t);
  return e && (n.className = e), i && i.appendChild(n), n;
}
function X(e, t) {
  return e.x = t.x, e.y = t.y, t.id !== void 0 && (e.id = t.id), e;
}
function Ko(e) {
  e.x = Math.round(e.x), e.y = Math.round(e.y);
}
function gn(e, t) {
  const i = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
  return Math.sqrt(i * i + n * n);
}
function Pe(e, t) {
  return e.x === t.x && e.y === t.y;
}
function Xe(e, t, i) {
  return Math.min(Math.max(e, t), i);
}
function Ne(e, t, i) {
  let n = `translate3d(${e}px,${t || 0}px,0)`;
  return i !== void 0 && (n += ` scale3d(${i},${i},1)`), n;
}
function Wt(e, t, i, n) {
  e.style.transform = Ne(t, i, n);
}
const oh = "cubic-bezier(.4,0,.22,1)";
function Go(e, t, i, n) {
  e.style.transition = t ? `${t} ${i}ms ${n || oh}` : "none";
}
function yn(e, t, i) {
  e.style.width = typeof t == "number" ? `${t}px` : t, e.style.height = typeof i == "number" ? `${i}px` : i;
}
function ah(e) {
  Go(e);
}
function lh(e) {
  return "decode" in e ? e.decode().catch(() => {
  }) : e.complete ? Promise.resolve(e) : new Promise((t, i) => {
    e.onload = () => t(e), e.onerror = i;
  });
}
const at = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function ch(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function uh(e, t, i = document) {
  let n = [];
  if (e instanceof Element)
    n = [e];
  else if (e instanceof NodeList || Array.isArray(e))
    n = Array.from(e);
  else {
    const s = typeof e == "string" ? e : t;
    s && (n = Array.from(i.querySelectorAll(s)));
  }
  return n;
}
function Ks() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
let qo = !1;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: () => {
      qo = !0;
    }
  }));
} catch {
}
class hh {
  constructor() {
    this._pool = [];
  }
  /**
   * Adds event listeners
   *
   * @param {PoolItem['target']} target
   * @param {PoolItem['type']} type Can be multiple, separated by space.
   * @param {PoolItem['listener']} listener
   * @param {PoolItem['passive']} [passive]
   */
  add(t, i, n, s) {
    this._toggleListener(t, i, n, s);
  }
  /**
   * Removes event listeners
   *
   * @param {PoolItem['target']} target
   * @param {PoolItem['type']} type
   * @param {PoolItem['listener']} listener
   * @param {PoolItem['passive']} [passive]
   */
  remove(t, i, n, s) {
    this._toggleListener(t, i, n, s, !0);
  }
  /**
   * Removes all bound events
   */
  removeAll() {
    this._pool.forEach((t) => {
      this._toggleListener(t.target, t.type, t.listener, t.passive, !0, !0);
    }), this._pool = [];
  }
  /**
   * Adds or removes event
   *
   * @private
   * @param {PoolItem['target']} target
   * @param {PoolItem['type']} type
   * @param {PoolItem['listener']} listener
   * @param {PoolItem['passive']} [passive]
   * @param {boolean} [unbind] Whether the event should be added or removed
   * @param {boolean} [skipPool] Whether events pool should be skipped
   */
  _toggleListener(t, i, n, s, r, o) {
    if (!t)
      return;
    const a = r ? "removeEventListener" : "addEventListener";
    i.split(" ").forEach((c) => {
      if (c) {
        o || (r ? this._pool = this._pool.filter((d) => d.type !== c || d.listener !== n || d.target !== t) : this._pool.push({
          target: t,
          type: c,
          listener: n,
          passive: s
        }));
        const u = qo ? {
          passive: s || !1
        } : !1;
        t[a](c, n, u);
      }
    });
  }
}
function jo(e, t) {
  if (e.getViewportSizeFn) {
    const i = e.getViewportSizeFn(e, t);
    if (i)
      return i;
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function we(e, t, i, n, s) {
  let r = 0;
  if (t.paddingFn)
    r = t.paddingFn(i, n, s)[e];
  else if (t.padding)
    r = t.padding[e];
  else {
    const o = "padding" + e[0].toUpperCase() + e.slice(1);
    t[o] && (r = t[o]);
  }
  return Number(r) || 0;
}
function Xo(e, t, i, n) {
  return {
    x: t.x - we("left", e, t, i, n) - we("right", e, t, i, n),
    y: t.y - we("top", e, t, i, n) - we("bottom", e, t, i, n)
  };
}
class dh {
  /**
   * @param {Slide} slide
   */
  constructor(t) {
    this.slide = t, this.currZoomLevel = 1, this.center = /** @type {Point} */
    {
      x: 0,
      y: 0
    }, this.max = /** @type {Point} */
    {
      x: 0,
      y: 0
    }, this.min = /** @type {Point} */
    {
      x: 0,
      y: 0
    };
  }
  /**
   * _getItemBounds
   *
   * @param {number} currZoomLevel
   */
  update(t) {
    this.currZoomLevel = t, this.slide.width ? (this._updateAxis("x"), this._updateAxis("y"), this.slide.pswp.dispatch("calcBounds", {
      slide: this.slide
    })) : this.reset();
  }
  /**
   * _calculateItemBoundsForAxis
   *
   * @param {Axis} axis
   */
  _updateAxis(t) {
    const {
      pswp: i
    } = this.slide, n = this.slide[t === "x" ? "width" : "height"] * this.currZoomLevel, r = we(t === "x" ? "left" : "top", i.options, i.viewportSize, this.slide.data, this.slide.index), o = this.slide.panAreaSize[t];
    this.center[t] = Math.round((o - n) / 2) + r, this.max[t] = n > o ? Math.round(o - n) + r : this.center[t], this.min[t] = n > o ? r : this.center[t];
  }
  // _getZeroBounds
  reset() {
    this.center.x = 0, this.center.y = 0, this.max.x = 0, this.max.y = 0, this.min.x = 0, this.min.y = 0;
  }
  /**
   * Correct pan position if it's beyond the bounds
   *
   * @param {Axis} axis x or y
   * @param {number} panOffset
   * @returns {number}
   */
  correctPan(t, i) {
    return Xe(i, this.max[t], this.min[t]);
  }
}
const Gs = 4e3;
class Yo {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(t, i, n, s) {
    this.pswp = s, this.options = t, this.itemData = i, this.index = n, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(t, i, n) {
    const s = {
      x: t,
      y: i
    };
    this.elementSize = s, this.panAreaSize = n;
    const r = n.x / s.x, o = n.y / s.y;
    this.fit = Math.min(1, r < o ? r : o), this.fill = Math.min(1, r > o ? r : o), this.vFill = Math.min(1, o), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(t) {
    const i = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      t + "ZoomLevel"
    ), n = this.options[i];
    if (n)
      return typeof n == "function" ? n(this) : n === "fill" ? this.fill : n === "fit" ? this.fit : Number(n);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let t = this._parseZoomLevelOption("secondary");
    return t || (t = Math.min(1, this.fit * 3), this.elementSize && t * this.elementSize.x > Gs && (t = Gs / this.elementSize.x), t);
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
}
class fh {
  /**
   * @param {SlideData} data
   * @param {number} index
   * @param {PhotoSwipe} pswp
   */
  constructor(t, i, n) {
    this.data = t, this.index = i, this.pswp = n, this.isActive = i === n.currIndex, this.currentResolution = 0, this.panAreaSize = {
      x: 0,
      y: 0
    }, this.pan = {
      x: 0,
      y: 0
    }, this.isFirstSlide = this.isActive && !n.opener.isOpen, this.zoomLevels = new Yo(n.options, t, i, n), this.pswp.dispatch("gettingData", {
      slide: this,
      data: this.data,
      index: i
    }), this.content = this.pswp.contentLoader.getContentBySlide(this), this.container = rt("pswp__zoom-wrap", "div"), this.holderElement = null, this.currZoomLevel = 1, this.width = this.content.width, this.height = this.content.height, this.heavyAppended = !1, this.bounds = new dh(this), this.prevDisplayedWidth = -1, this.prevDisplayedHeight = -1, this.pswp.dispatch("slideInit", {
      slide: this
    });
  }
  /**
   * If this slide is active/current/visible
   *
   * @param {boolean} isActive
   */
  setIsActive(t) {
    t && !this.isActive ? this.activate() : !t && this.isActive && this.deactivate();
  }
  /**
   * Appends slide content to DOM
   *
   * @param {HTMLElement} holderElement
   */
  append(t) {
    this.holderElement = t, this.container.style.transformOrigin = "0 0", this.data && (this.calculateSize(), this.load(), this.updateContentSize(), this.appendHeavy(), this.holderElement.appendChild(this.container), this.zoomAndPanToInitial(), this.pswp.dispatch("firstZoomPan", {
      slide: this
    }), this.applyCurrentZoomPan(), this.pswp.dispatch("afterSetContent", {
      slide: this
    }), this.isActive && this.activate());
  }
  load() {
    this.content.load(!1), this.pswp.dispatch("slideLoad", {
      slide: this
    });
  }
  /**
   * Append "heavy" DOM elements
   *
   * This may depend on a type of slide,
   * but generally these are large images.
   */
  appendHeavy() {
    const {
      pswp: t
    } = this, i = !0;
    this.heavyAppended || !t.opener.isOpen || t.mainScroll.isShifted() || !this.isActive && !i || this.pswp.dispatch("appendHeavy", {
      slide: this
    }).defaultPrevented || (this.heavyAppended = !0, this.content.append(), this.pswp.dispatch("appendHeavyContent", {
      slide: this
    }));
  }
  /**
   * Triggered when this slide is active (selected).
   *
   * If it's part of opening/closing transition -
   * activate() will trigger after the transition is ended.
   */
  activate() {
    this.isActive = !0, this.appendHeavy(), this.content.activate(), this.pswp.dispatch("slideActivate", {
      slide: this
    });
  }
  /**
   * Triggered when this slide becomes inactive.
   *
   * Slide can become inactive only after it was active.
   */
  deactivate() {
    this.isActive = !1, this.content.deactivate(), this.currZoomLevel !== this.zoomLevels.initial && this.calculateSize(), this.currentResolution = 0, this.zoomAndPanToInitial(), this.applyCurrentZoomPan(), this.updateContentSize(), this.pswp.dispatch("slideDeactivate", {
      slide: this
    });
  }
  /**
   * The slide should destroy itself, it will never be used again.
   * (unbind all events and destroy internal components)
   */
  destroy() {
    this.content.hasSlide = !1, this.content.remove(), this.container.remove(), this.pswp.dispatch("slideDestroy", {
      slide: this
    });
  }
  resize() {
    this.currZoomLevel === this.zoomLevels.initial || !this.isActive ? (this.calculateSize(), this.currentResolution = 0, this.zoomAndPanToInitial(), this.applyCurrentZoomPan(), this.updateContentSize()) : (this.calculateSize(), this.bounds.update(this.currZoomLevel), this.panTo(this.pan.x, this.pan.y));
  }
  /**
   * Apply size to current slide content,
   * based on the current resolution and scale.
   *
   * @param {boolean} [force] if size should be updated even if dimensions weren't changed
   */
  updateContentSize(t) {
    const i = this.currentResolution || this.zoomLevels.initial;
    if (!i)
      return;
    const n = Math.round(this.width * i) || this.pswp.viewportSize.x, s = Math.round(this.height * i) || this.pswp.viewportSize.y;
    !this.sizeChanged(n, s) && !t || this.content.setDisplayedSize(n, s);
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  sizeChanged(t, i) {
    return t !== this.prevDisplayedWidth || i !== this.prevDisplayedHeight ? (this.prevDisplayedWidth = t, this.prevDisplayedHeight = i, !0) : !1;
  }
  /** @returns {HTMLImageElement | HTMLDivElement | null | undefined} */
  getPlaceholderElement() {
    var t;
    return (t = this.content.placeholder) === null || t === void 0 ? void 0 : t.element;
  }
  /**
   * Zoom current slide image to...
   *
   * @param {number} destZoomLevel Destination zoom level.
   * @param {Point} [centerPoint]
   * Transform origin center point, or false if viewport center should be used.
   * @param {number | false} [transitionDuration] Transition duration, may be set to 0.
   * @param {boolean} [ignoreBounds] Minimum and maximum zoom levels will be ignored.
   */
  zoomTo(t, i, n, s) {
    const {
      pswp: r
    } = this;
    if (!this.isZoomable() || r.mainScroll.isShifted())
      return;
    r.dispatch("beforeZoomTo", {
      destZoomLevel: t,
      centerPoint: i,
      transitionDuration: n
    }), r.animations.stopAllPan();
    const o = this.currZoomLevel;
    s || (t = Xe(t, this.zoomLevels.min, this.zoomLevels.max)), this.setZoomLevel(t), this.pan.x = this.calculateZoomToPanOffset("x", i, o), this.pan.y = this.calculateZoomToPanOffset("y", i, o), Ko(this.pan);
    const a = () => {
      this._setResolution(t), this.applyCurrentZoomPan();
    };
    n ? r.animations.startTransition({
      isPan: !0,
      name: "zoomTo",
      target: this.container,
      transform: this.getCurrentTransform(),
      onComplete: a,
      duration: n,
      easing: r.options.easing
    }) : a();
  }
  /**
   * @param {Point} [centerPoint]
   */
  toggleZoom(t) {
    this.zoomTo(this.currZoomLevel === this.zoomLevels.initial ? this.zoomLevels.secondary : this.zoomLevels.initial, t, this.pswp.options.zoomAnimationDuration);
  }
  /**
   * Updates zoom level property and recalculates new pan bounds,
   * unlike zoomTo it does not apply transform (use applyCurrentZoomPan)
   *
   * @param {number} currZoomLevel
   */
  setZoomLevel(t) {
    this.currZoomLevel = t, this.bounds.update(this.currZoomLevel);
  }
  /**
   * Get pan position after zoom at a given `point`.
   *
   * Always call setZoomLevel(newZoomLevel) beforehand to recalculate
   * pan bounds according to the new zoom level.
   *
   * @param {'x' | 'y'} axis
   * @param {Point} [point]
   * point based on which zoom is performed, usually refers to the current mouse position,
   * if false - viewport center will be used.
   * @param {number} [prevZoomLevel] Zoom level before new zoom was applied.
   * @returns {number}
   */
  calculateZoomToPanOffset(t, i, n) {
    if (this.bounds.max[t] - this.bounds.min[t] === 0)
      return this.bounds.center[t];
    i || (i = this.pswp.getViewportCenterPoint()), n || (n = this.zoomLevels.initial);
    const r = this.currZoomLevel / n;
    return this.bounds.correctPan(t, (this.pan[t] - i[t]) * r + i[t]);
  }
  /**
   * Apply pan and keep it within bounds.
   *
   * @param {number} panX
   * @param {number} panY
   */
  panTo(t, i) {
    this.pan.x = this.bounds.correctPan("x", t), this.pan.y = this.bounds.correctPan("y", i), this.applyCurrentZoomPan();
  }
  /**
   * If the slide in the current state can be panned by the user
   * @returns {boolean}
   */
  isPannable() {
    return !!this.width && this.currZoomLevel > this.zoomLevels.fit;
  }
  /**
   * If the slide can be zoomed
   * @returns {boolean}
   */
  isZoomable() {
    return !!this.width && this.content.isZoomable();
  }
  /**
   * Apply transform and scale based on
   * the current pan position (this.pan) and zoom level (this.currZoomLevel)
   */
  applyCurrentZoomPan() {
    this._applyZoomTransform(this.pan.x, this.pan.y, this.currZoomLevel), this === this.pswp.currSlide && this.pswp.dispatch("zoomPanUpdate", {
      slide: this
    });
  }
  zoomAndPanToInitial() {
    this.currZoomLevel = this.zoomLevels.initial, this.bounds.update(this.currZoomLevel), X(this.pan, this.bounds.center), this.pswp.dispatch("initialZoomPan", {
      slide: this
    });
  }
  /**
   * Set translate and scale based on current resolution
   *
   * @param {number} x
   * @param {number} y
   * @param {number} zoom
   * @private
   */
  _applyZoomTransform(t, i, n) {
    n /= this.currentResolution || this.zoomLevels.initial, Wt(this.container, t, i, n);
  }
  calculateSize() {
    const {
      pswp: t
    } = this;
    X(this.panAreaSize, Xo(t.options, t.viewportSize, this.data, this.index)), this.zoomLevels.update(this.width, this.height, this.panAreaSize), t.dispatch("calcSlideSize", {
      slide: this
    });
  }
  /** @returns {string} */
  getCurrentTransform() {
    const t = this.currZoomLevel / (this.currentResolution || this.zoomLevels.initial);
    return Ne(this.pan.x, this.pan.y, t);
  }
  /**
   * Set resolution and re-render the image.
   *
   * For example, if the real image size is 2000x1500,
   * and resolution is 0.5 - it will be rendered as 1000x750.
   *
   * Image with zoom level 2 and resolution 0.5 is
   * the same as image with zoom level 1 and resolution 1.
   *
   * Used to optimize animations and make
   * sure that browser renders image in the highest quality.
   * Also used by responsive images to load the correct one.
   *
   * @param {number} newResolution
   */
  _setResolution(t) {
    t !== this.currentResolution && (this.currentResolution = t, this.updateContentSize(), this.pswp.dispatch("resolutionChanged"));
  }
}
const ph = 0.35, mh = 0.6, qs = 0.4, js = 0.5;
function vh(e, t) {
  return e * t / (1 - t);
}
class _h {
  /**
   * @param {Gestures} gestures
   */
  constructor(t) {
    this.gestures = t, this.pswp = t.pswp, this.startPan = {
      x: 0,
      y: 0
    };
  }
  start() {
    this.pswp.currSlide && X(this.startPan, this.pswp.currSlide.pan), this.pswp.animations.stopAll();
  }
  change() {
    const {
      p1: t,
      prevP1: i,
      dragAxis: n
    } = this.gestures, {
      currSlide: s
    } = this.pswp;
    if (n === "y" && this.pswp.options.closeOnVerticalDrag && s && s.currZoomLevel <= s.zoomLevels.fit && !this.gestures.isMultitouch) {
      const r = s.pan.y + (t.y - i.y);
      if (!this.pswp.dispatch("verticalDrag", {
        panY: r
      }).defaultPrevented) {
        this._setPanWithFriction("y", r, mh);
        const o = 1 - Math.abs(this._getVerticalDragRatio(s.pan.y));
        this.pswp.applyBgOpacity(o), s.applyCurrentZoomPan();
      }
    } else
      this._panOrMoveMainScroll("x") || (this._panOrMoveMainScroll("y"), s && (Ko(s.pan), s.applyCurrentZoomPan()));
  }
  end() {
    const {
      velocity: t
    } = this.gestures, {
      mainScroll: i,
      currSlide: n
    } = this.pswp;
    let s = 0;
    if (this.pswp.animations.stopAll(), i.isShifted()) {
      const o = (i.x - i.getCurrSlideX()) / this.pswp.viewportSize.x;
      t.x < -js && o < 0 || t.x < 0.1 && o < -0.5 ? (s = 1, t.x = Math.min(t.x, 0)) : (t.x > js && o > 0 || t.x > -0.1 && o > 0.5) && (s = -1, t.x = Math.max(t.x, 0)), i.moveIndexBy(s, !0, t.x);
    }
    n && n.currZoomLevel > n.zoomLevels.max || this.gestures.isMultitouch ? this.gestures.zoomLevels.correctZoomPan(!0) : (this._finishPanGestureForAxis("x"), this._finishPanGestureForAxis("y"));
  }
  /**
   * @private
   * @param {'x' | 'y'} axis
   */
  _finishPanGestureForAxis(t) {
    const {
      velocity: i
    } = this.gestures, {
      currSlide: n
    } = this.pswp;
    if (!n)
      return;
    const {
      pan: s,
      bounds: r
    } = n, o = s[t], a = this.pswp.bgOpacity < 1 && t === "y", l = 0.995, c = o + vh(i[t], l);
    if (a) {
      const f = this._getVerticalDragRatio(o), v = this._getVerticalDragRatio(c);
      if (f < 0 && v < -qs || f > 0 && v > qs) {
        this.pswp.close();
        return;
      }
    }
    const u = r.correctPan(t, c);
    if (o === u)
      return;
    const d = u === c ? 1 : 0.82, h = this.pswp.bgOpacity, m = u - o;
    this.pswp.animations.startSpring({
      name: "panGesture" + t,
      isPan: !0,
      start: o,
      end: u,
      velocity: i[t],
      dampingRatio: d,
      onUpdate: (f) => {
        if (a && this.pswp.bgOpacity < 1) {
          const v = 1 - (u - f) / m;
          this.pswp.applyBgOpacity(Xe(h + (1 - h) * v, 0, 1));
        }
        s[t] = Math.floor(f), n.applyCurrentZoomPan();
      }
    });
  }
  /**
   * Update position of the main scroll,
   * or/and update pan position of the current slide.
   *
   * Should return true if it changes (or can change) main scroll.
   *
   * @private
   * @param {'x' | 'y'} axis
   * @returns {boolean}
   */
  _panOrMoveMainScroll(t) {
    const {
      p1: i,
      dragAxis: n,
      prevP1: s,
      isMultitouch: r
    } = this.gestures, {
      currSlide: o,
      mainScroll: a
    } = this.pswp, l = i[t] - s[t], c = a.x + l;
    if (!l || !o)
      return !1;
    if (t === "x" && !o.isPannable() && !r)
      return a.moveTo(c, !0), !0;
    const {
      bounds: u
    } = o, d = o.pan[t] + l;
    if (this.pswp.options.allowPanToNext && n === "x" && t === "x" && !r) {
      const h = a.getCurrSlideX(), m = a.x - h, f = l > 0, v = !f;
      if (d > u.min[t] && f) {
        if (u.min[t] <= this.startPan[t])
          return a.moveTo(c, !0), !0;
        this._setPanWithFriction(t, d);
      } else if (d < u.max[t] && v) {
        if (this.startPan[t] <= u.max[t])
          return a.moveTo(c, !0), !0;
        this._setPanWithFriction(t, d);
      } else if (m !== 0) {
        if (m > 0)
          return a.moveTo(Math.max(c, h), !0), !0;
        if (m < 0)
          return a.moveTo(Math.min(c, h), !0), !0;
      } else
        this._setPanWithFriction(t, d);
    } else
      t === "y" ? !a.isShifted() && u.min.y !== u.max.y && this._setPanWithFriction(t, d) : this._setPanWithFriction(t, d);
    return !1;
  }
  // If we move above - the ratio is negative
  // If we move below the ratio is positive
  /**
   * Relation between pan Y position and third of viewport height.
   *
   * When we are at initial position (center bounds) - the ratio is 0,
   * if position is shifted upwards - the ratio is negative,
   * if position is shifted downwards - the ratio is positive.
   *
   * @private
   * @param {number} panY The current pan Y position.
   * @returns {number}
   */
  _getVerticalDragRatio(t) {
    var i, n;
    return (t - ((i = (n = this.pswp.currSlide) === null || n === void 0 ? void 0 : n.bounds.center.y) !== null && i !== void 0 ? i : 0)) / (this.pswp.viewportSize.y / 3);
  }
  /**
   * Set pan position of the current slide.
   * Apply friction if the position is beyond the pan bounds,
   * or if custom friction is defined.
   *
   * @private
   * @param {'x' | 'y'} axis
   * @param {number} potentialPan
   * @param {number} [customFriction] (0.1 - 1)
   */
  _setPanWithFriction(t, i, n) {
    const {
      currSlide: s
    } = this.pswp;
    if (!s)
      return;
    const {
      pan: r,
      bounds: o
    } = s;
    if (o.correctPan(t, i) !== i || n) {
      const l = Math.round(i - r[t]);
      r[t] += l * (n || ph);
    } else
      r[t] = i;
  }
}
const gh = 0.05, yh = 0.15;
function Xs(e, t, i) {
  return e.x = (t.x + i.x) / 2, e.y = (t.y + i.y) / 2, e;
}
class wh {
  /**
   * @param {Gestures} gestures
   */
  constructor(t) {
    this.gestures = t, this._startPan = {
      x: 0,
      y: 0
    }, this._startZoomPoint = {
      x: 0,
      y: 0
    }, this._zoomPoint = {
      x: 0,
      y: 0
    }, this._wasOverFitZoomLevel = !1, this._startZoomLevel = 1;
  }
  start() {
    const {
      currSlide: t
    } = this.gestures.pswp;
    t && (this._startZoomLevel = t.currZoomLevel, X(this._startPan, t.pan)), this.gestures.pswp.animations.stopAllPan(), this._wasOverFitZoomLevel = !1;
  }
  change() {
    const {
      p1: t,
      startP1: i,
      p2: n,
      startP2: s,
      pswp: r
    } = this.gestures, {
      currSlide: o
    } = r;
    if (!o)
      return;
    const a = o.zoomLevels.min, l = o.zoomLevels.max;
    if (!o.isZoomable() || r.mainScroll.isShifted())
      return;
    Xs(this._startZoomPoint, i, s), Xs(this._zoomPoint, t, n);
    let c = 1 / gn(i, s) * gn(t, n) * this._startZoomLevel;
    if (c > o.zoomLevels.initial + o.zoomLevels.initial / 15 && (this._wasOverFitZoomLevel = !0), c < a)
      if (r.options.pinchToClose && !this._wasOverFitZoomLevel && this._startZoomLevel <= o.zoomLevels.initial) {
        const u = 1 - (a - c) / (a / 1.2);
        r.dispatch("pinchClose", {
          bgOpacity: u
        }).defaultPrevented || r.applyBgOpacity(u);
      } else
        c = a - (a - c) * yh;
    else
      c > l && (c = l + (c - l) * gh);
    o.pan.x = this._calculatePanForZoomLevel("x", c), o.pan.y = this._calculatePanForZoomLevel("y", c), o.setZoomLevel(c), o.applyCurrentZoomPan();
  }
  end() {
    const {
      pswp: t
    } = this.gestures, {
      currSlide: i
    } = t;
    (!i || i.currZoomLevel < i.zoomLevels.initial) && !this._wasOverFitZoomLevel && t.options.pinchToClose ? t.close() : this.correctZoomPan();
  }
  /**
   * @private
   * @param {'x' | 'y'} axis
   * @param {number} currZoomLevel
   * @returns {number}
   */
  _calculatePanForZoomLevel(t, i) {
    const n = i / this._startZoomLevel;
    return this._zoomPoint[t] - (this._startZoomPoint[t] - this._startPan[t]) * n;
  }
  /**
   * Correct currZoomLevel and pan if they are
   * beyond minimum or maximum values.
   * With animation.
   *
   * @param {boolean} [ignoreGesture]
   * Wether gesture coordinates should be ignored when calculating destination pan position.
   */
  correctZoomPan(t) {
    const {
      pswp: i
    } = this.gestures, {
      currSlide: n
    } = i;
    if (!(n != null && n.isZoomable()))
      return;
    this._zoomPoint.x === 0 && (t = !0);
    const s = n.currZoomLevel;
    let r, o = !0;
    s < n.zoomLevels.initial ? r = n.zoomLevels.initial : s > n.zoomLevels.max ? r = n.zoomLevels.max : (o = !1, r = s);
    const a = i.bgOpacity, l = i.bgOpacity < 1, c = X({
      x: 0,
      y: 0
    }, n.pan);
    let u = X({
      x: 0,
      y: 0
    }, c);
    t && (this._zoomPoint.x = 0, this._zoomPoint.y = 0, this._startZoomPoint.x = 0, this._startZoomPoint.y = 0, this._startZoomLevel = s, X(this._startPan, c)), o && (u = {
      x: this._calculatePanForZoomLevel("x", r),
      y: this._calculatePanForZoomLevel("y", r)
    }), n.setZoomLevel(r), u = {
      x: n.bounds.correctPan("x", u.x),
      y: n.bounds.correctPan("y", u.y)
    }, n.setZoomLevel(s);
    const d = !Pe(u, c);
    if (!d && !o && !l) {
      n._setResolution(r), n.applyCurrentZoomPan();
      return;
    }
    i.animations.stopAllPan(), i.animations.startSpring({
      isPan: !0,
      start: 0,
      end: 1e3,
      velocity: 0,
      dampingRatio: 1,
      naturalFrequency: 40,
      onUpdate: (h) => {
        if (h /= 1e3, d || o) {
          if (d && (n.pan.x = c.x + (u.x - c.x) * h, n.pan.y = c.y + (u.y - c.y) * h), o) {
            const m = s + (r - s) * h;
            n.setZoomLevel(m);
          }
          n.applyCurrentZoomPan();
        }
        l && i.bgOpacity < 1 && i.applyBgOpacity(Xe(a + (1 - a) * h, 0, 1));
      },
      onComplete: () => {
        n._setResolution(r), n.applyCurrentZoomPan();
      }
    });
  }
}
function Ys(e) {
  return !!/** @type {HTMLElement} */
  e.target.closest(".pswp__container");
}
class Eh {
  /**
   * @param {Gestures} gestures
   */
  constructor(t) {
    this.gestures = t;
  }
  /**
   * @param {Point} point
   * @param {PointerEvent} originalEvent
   */
  click(t, i) {
    const n = (
      /** @type {HTMLElement} */
      i.target.classList
    ), s = n.contains("pswp__img"), r = n.contains("pswp__item") || n.contains("pswp__zoom-wrap");
    s ? this._doClickOrTapAction("imageClick", t, i) : r && this._doClickOrTapAction("bgClick", t, i);
  }
  /**
   * @param {Point} point
   * @param {PointerEvent} originalEvent
   */
  tap(t, i) {
    Ys(i) && this._doClickOrTapAction("tap", t, i);
  }
  /**
   * @param {Point} point
   * @param {PointerEvent} originalEvent
   */
  doubleTap(t, i) {
    Ys(i) && this._doClickOrTapAction("doubleTap", t, i);
  }
  /**
   * @private
   * @param {Actions} actionName
   * @param {Point} point
   * @param {PointerEvent} originalEvent
   */
  _doClickOrTapAction(t, i, n) {
    var s;
    const {
      pswp: r
    } = this.gestures, {
      currSlide: o
    } = r, a = (
      /** @type {AddPostfix<Actions, 'Action'>} */
      t + "Action"
    ), l = r.options[a];
    if (!r.dispatch(a, {
      point: i,
      originalEvent: n
    }).defaultPrevented) {
      if (typeof l == "function") {
        l.call(r, i, n);
        return;
      }
      switch (l) {
        case "close":
        case "next":
          r[l]();
          break;
        case "zoom":
          o == null || o.toggleZoom(i);
          break;
        case "zoom-or-close":
          o != null && o.isZoomable() && o.zoomLevels.secondary !== o.zoomLevels.initial ? o.toggleZoom(i) : r.options.clickToCloseNonZoomable && r.close();
          break;
        case "toggle-controls":
          (s = this.gestures.pswp.element) === null || s === void 0 || s.classList.toggle("pswp--ui-visible");
          break;
      }
    }
  }
}
const Sh = 10, bh = 300, Ah = 25;
class xh {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, this.dragAxis = null, this.p1 = {
      x: 0,
      y: 0
    }, this.p2 = {
      x: 0,
      y: 0
    }, this.prevP1 = {
      x: 0,
      y: 0
    }, this.prevP2 = {
      x: 0,
      y: 0
    }, this.startP1 = {
      x: 0,
      y: 0
    }, this.startP2 = {
      x: 0,
      y: 0
    }, this.velocity = {
      x: 0,
      y: 0
    }, this._lastStartP1 = {
      x: 0,
      y: 0
    }, this._intervalP1 = {
      x: 0,
      y: 0
    }, this._numActivePoints = 0, this._ongoingPointers = [], this._touchEventEnabled = "ontouchstart" in window, this._pointerEventEnabled = !!window.PointerEvent, this.supportsTouch = this._touchEventEnabled || this._pointerEventEnabled && navigator.maxTouchPoints > 1, this._numActivePoints = 0, this._intervalTime = 0, this._velocityCalculated = !1, this.isMultitouch = !1, this.isDragging = !1, this.isZooming = !1, this.raf = null, this._tapTimer = null, this.supportsTouch || (t.options.allowPanToNext = !1), this.drag = new _h(this), this.zoomLevels = new wh(this), this.tapHandler = new Eh(this), t.on("bindEvents", () => {
      t.events.add(
        t.scrollWrap,
        "click",
        /** @type EventListener */
        this._onClick.bind(this)
      ), this._pointerEventEnabled ? this._bindEvents("pointer", "down", "up", "cancel") : this._touchEventEnabled ? (this._bindEvents("touch", "start", "end", "cancel"), t.scrollWrap && (t.scrollWrap.ontouchmove = () => {
      }, t.scrollWrap.ontouchend = () => {
      })) : this._bindEvents("mouse", "down", "up");
    });
  }
  /**
   * @private
   * @param {'mouse' | 'touch' | 'pointer'} pref
   * @param {'down' | 'start'} down
   * @param {'up' | 'end'} up
   * @param {'cancel'} [cancel]
   */
  _bindEvents(t, i, n, s) {
    const {
      pswp: r
    } = this, {
      events: o
    } = r, a = s ? t + s : "";
    o.add(
      r.scrollWrap,
      t + i,
      /** @type EventListener */
      this.onPointerDown.bind(this)
    ), o.add(
      window,
      t + "move",
      /** @type EventListener */
      this.onPointerMove.bind(this)
    ), o.add(
      window,
      t + n,
      /** @type EventListener */
      this.onPointerUp.bind(this)
    ), a && o.add(
      r.scrollWrap,
      a,
      /** @type EventListener */
      this.onPointerUp.bind(this)
    );
  }
  /**
   * @param {PointerEvent} e
   */
  onPointerDown(t) {
    const i = t.type === "mousedown" || t.pointerType === "mouse";
    if (i && t.button > 0)
      return;
    const {
      pswp: n
    } = this;
    if (!n.opener.isOpen) {
      t.preventDefault();
      return;
    }
    n.dispatch("pointerDown", {
      originalEvent: t
    }).defaultPrevented || (i && (n.mouseDetected(), this._preventPointerEventBehaviour(t, "down")), n.animations.stopAll(), this._updatePoints(t, "down"), this._numActivePoints === 1 && (this.dragAxis = null, X(this.startP1, this.p1)), this._numActivePoints > 1 ? (this._clearTapTimer(), this.isMultitouch = !0) : this.isMultitouch = !1);
  }
  /**
   * @param {PointerEvent} e
   */
  onPointerMove(t) {
    this._preventPointerEventBehaviour(t, "move"), this._numActivePoints && (this._updatePoints(t, "move"), !this.pswp.dispatch("pointerMove", {
      originalEvent: t
    }).defaultPrevented && (this._numActivePoints === 1 && !this.isDragging ? (this.dragAxis || this._calculateDragDirection(), this.dragAxis && !this.isDragging && (this.isZooming && (this.isZooming = !1, this.zoomLevels.end()), this.isDragging = !0, this._clearTapTimer(), this._updateStartPoints(), this._intervalTime = Date.now(), this._velocityCalculated = !1, X(this._intervalP1, this.p1), this.velocity.x = 0, this.velocity.y = 0, this.drag.start(), this._rafStopLoop(), this._rafRenderLoop())) : this._numActivePoints > 1 && !this.isZooming && (this._finishDrag(), this.isZooming = !0, this._updateStartPoints(), this.zoomLevels.start(), this._rafStopLoop(), this._rafRenderLoop())));
  }
  /**
   * @private
   */
  _finishDrag() {
    this.isDragging && (this.isDragging = !1, this._velocityCalculated || this._updateVelocity(!0), this.drag.end(), this.dragAxis = null);
  }
  /**
   * @param {PointerEvent} e
   */
  onPointerUp(t) {
    this._numActivePoints && (this._updatePoints(t, "up"), !this.pswp.dispatch("pointerUp", {
      originalEvent: t
    }).defaultPrevented && (this._numActivePoints === 0 && (this._rafStopLoop(), this.isDragging ? this._finishDrag() : !this.isZooming && !this.isMultitouch && this._finishTap(t)), this._numActivePoints < 2 && this.isZooming && (this.isZooming = !1, this.zoomLevels.end(), this._numActivePoints === 1 && (this.dragAxis = null, this._updateStartPoints()))));
  }
  /**
   * @private
   */
  _rafRenderLoop() {
    (this.isDragging || this.isZooming) && (this._updateVelocity(), this.isDragging ? Pe(this.p1, this.prevP1) || this.drag.change() : (!Pe(this.p1, this.prevP1) || !Pe(this.p2, this.prevP2)) && this.zoomLevels.change(), this._updatePrevPoints(), this.raf = requestAnimationFrame(this._rafRenderLoop.bind(this)));
  }
  /**
   * Update velocity at 50ms interval
   *
   * @private
   * @param {boolean} [force]
   */
  _updateVelocity(t) {
    const i = Date.now(), n = i - this._intervalTime;
    n < 50 && !t || (this.velocity.x = this._getVelocity("x", n), this.velocity.y = this._getVelocity("y", n), this._intervalTime = i, X(this._intervalP1, this.p1), this._velocityCalculated = !0);
  }
  /**
   * @private
   * @param {PointerEvent} e
   */
  _finishTap(t) {
    const {
      mainScroll: i
    } = this.pswp;
    if (i.isShifted()) {
      i.moveIndexBy(0, !0);
      return;
    }
    if (t.type.indexOf("cancel") > 0)
      return;
    if (t.type === "mouseup" || t.pointerType === "mouse") {
      this.tapHandler.click(this.startP1, t);
      return;
    }
    const n = this.pswp.options.doubleTapAction ? bh : 0;
    this._tapTimer ? (this._clearTapTimer(), gn(this._lastStartP1, this.startP1) < Ah && this.tapHandler.doubleTap(this.startP1, t)) : (X(this._lastStartP1, this.startP1), this._tapTimer = setTimeout(() => {
      this.tapHandler.tap(this.startP1, t), this._clearTapTimer();
    }, n));
  }
  /**
   * @private
   */
  _clearTapTimer() {
    this._tapTimer && (clearTimeout(this._tapTimer), this._tapTimer = null);
  }
  /**
   * Get velocity for axis
   *
   * @private
   * @param {'x' | 'y'} axis
   * @param {number} duration
   * @returns {number}
   */
  _getVelocity(t, i) {
    const n = this.p1[t] - this._intervalP1[t];
    return Math.abs(n) > 1 && i > 5 ? n / i : 0;
  }
  /**
   * @private
   */
  _rafStopLoop() {
    this.raf && (cancelAnimationFrame(this.raf), this.raf = null);
  }
  /**
   * @private
   * @param {PointerEvent} e
   * @param {'up' | 'down' | 'move'} pointerType Normalized pointer type
   */
  _preventPointerEventBehaviour(t, i) {
    this.pswp.applyFilters("preventPointerEvent", !0, t, i) && t.preventDefault();
  }
  /**
   * Parses and normalizes points from the touch, mouse or pointer event.
   * Updates p1 and p2.
   *
   * @private
   * @param {PointerEvent | TouchEvent} e
   * @param {'up' | 'down' | 'move'} pointerType Normalized pointer type
   */
  _updatePoints(t, i) {
    if (this._pointerEventEnabled) {
      const n = (
        /** @type {PointerEvent} */
        t
      ), s = this._ongoingPointers.findIndex((r) => r.id === n.pointerId);
      i === "up" && s > -1 ? this._ongoingPointers.splice(s, 1) : i === "down" && s === -1 ? this._ongoingPointers.push(this._convertEventPosToPoint(n, {
        x: 0,
        y: 0
      })) : s > -1 && this._convertEventPosToPoint(n, this._ongoingPointers[s]), this._numActivePoints = this._ongoingPointers.length, this._numActivePoints > 0 && X(this.p1, this._ongoingPointers[0]), this._numActivePoints > 1 && X(this.p2, this._ongoingPointers[1]);
    } else {
      const n = (
        /** @type {TouchEvent} */
        t
      );
      this._numActivePoints = 0, n.type.indexOf("touch") > -1 ? n.touches && n.touches.length > 0 && (this._convertEventPosToPoint(n.touches[0], this.p1), this._numActivePoints++, n.touches.length > 1 && (this._convertEventPosToPoint(n.touches[1], this.p2), this._numActivePoints++)) : (this._convertEventPosToPoint(
        /** @type {PointerEvent} */
        t,
        this.p1
      ), i === "up" ? this._numActivePoints = 0 : this._numActivePoints++);
    }
  }
  /** update points that were used during previous rAF tick
   * @private
   */
  _updatePrevPoints() {
    X(this.prevP1, this.p1), X(this.prevP2, this.p2);
  }
  /** update points at the start of gesture
   * @private
   */
  _updateStartPoints() {
    X(this.startP1, this.p1), X(this.startP2, this.p2), this._updatePrevPoints();
  }
  /** @private */
  _calculateDragDirection() {
    if (this.pswp.mainScroll.isShifted())
      this.dragAxis = "x";
    else {
      const t = Math.abs(this.p1.x - this.startP1.x) - Math.abs(this.p1.y - this.startP1.y);
      if (t !== 0) {
        const i = t > 0 ? "x" : "y";
        Math.abs(this.p1[i] - this.startP1[i]) >= Sh && (this.dragAxis = i);
      }
    }
  }
  /**
   * Converts touch, pointer or mouse event
   * to PhotoSwipe point.
   *
   * @private
   * @param {Touch | PointerEvent} e
   * @param {Point} p
   * @returns {Point}
   */
  _convertEventPosToPoint(t, i) {
    return i.x = t.pageX - this.pswp.offset.x, i.y = t.pageY - this.pswp.offset.y, "pointerId" in t ? i.id = t.pointerId : t.identifier !== void 0 && (i.id = t.identifier), i;
  }
  /**
   * @private
   * @param {PointerEvent} e
   */
  _onClick(t) {
    this.pswp.mainScroll.isShifted() && (t.preventDefault(), t.stopPropagation());
  }
}
const Ph = 0.35;
class Ih {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, this.x = 0, this.slideWidth = 0, this._currPositionIndex = 0, this._prevPositionIndex = 0, this._containerShiftIndex = -1, this.itemHolders = [];
  }
  /**
   * Position the scroller and slide containers
   * according to viewport size.
   *
   * @param {boolean} [resizeSlides] Whether slides content should resized
   */
  resize(t) {
    const {
      pswp: i
    } = this, n = Math.round(i.viewportSize.x + i.viewportSize.x * i.options.spacing), s = n !== this.slideWidth;
    s && (this.slideWidth = n, this.moveTo(this.getCurrSlideX())), this.itemHolders.forEach((r, o) => {
      s && Wt(r.el, (o + this._containerShiftIndex) * this.slideWidth), t && r.slide && r.slide.resize();
    });
  }
  /**
   * Reset X position of the main scroller to zero
   */
  resetPosition() {
    this._currPositionIndex = 0, this._prevPositionIndex = 0, this.slideWidth = 0, this._containerShiftIndex = -1;
  }
  /**
   * Create and append array of three items
   * that hold data about slides in DOM
   */
  appendHolders() {
    this.itemHolders = [];
    for (let t = 0; t < 3; t++) {
      const i = rt("pswp__item", "div", this.pswp.container);
      i.setAttribute("role", "group"), i.setAttribute("aria-roledescription", "slide"), i.setAttribute("aria-hidden", "true"), i.style.display = t === 1 ? "block" : "none", this.itemHolders.push({
        el: i
        //index: -1
      });
    }
  }
  /**
   * Whether the main scroll can be horizontally swiped to the next or previous slide.
   * @returns {boolean}
   */
  canBeSwiped() {
    return this.pswp.getNumItems() > 1;
  }
  /**
   * Move main scroll by X amount of slides.
   * For example:
   *   `-1` will move to the previous slide,
   *    `0` will reset the scroll position of the current slide,
   *    `3` will move three slides forward
   *
   * If loop option is enabled - index will be automatically looped too,
   * (for example `-1` will move to the last slide of the gallery).
   *
   * @param {number} diff
   * @param {boolean} [animate]
   * @param {number} [velocityX]
   * @returns {boolean} whether index was changed or not
   */
  moveIndexBy(t, i, n) {
    const {
      pswp: s
    } = this;
    let r = s.potentialIndex + t;
    const o = s.getNumItems();
    if (s.canLoop()) {
      r = s.getLoopedIndex(r);
      const l = (t + o) % o;
      l <= o / 2 ? t = l : t = l - o;
    } else
      r < 0 ? r = 0 : r >= o && (r = o - 1), t = r - s.potentialIndex;
    s.potentialIndex = r, this._currPositionIndex -= t, s.animations.stopMainScroll();
    const a = this.getCurrSlideX();
    if (!i)
      this.moveTo(a), this.updateCurrItem();
    else {
      s.animations.startSpring({
        isMainScroll: !0,
        start: this.x,
        end: a,
        velocity: n || 0,
        naturalFrequency: 30,
        dampingRatio: 1,
        //0.7,
        onUpdate: (c) => {
          this.moveTo(c);
        },
        onComplete: () => {
          this.updateCurrItem(), s.appendHeavy();
        }
      });
      let l = s.potentialIndex - s.currIndex;
      if (s.canLoop()) {
        const c = (l + o) % o;
        c <= o / 2 ? l = c : l = c - o;
      }
      Math.abs(l) > 1 && this.updateCurrItem();
    }
    return !!t;
  }
  /**
   * X position of the main scroll for the current slide
   * (ignores position during dragging)
   * @returns {number}
   */
  getCurrSlideX() {
    return this.slideWidth * this._currPositionIndex;
  }
  /**
   * Whether scroll position is shifted.
   * For example, it will return true if the scroll is being dragged or animated.
   * @returns {boolean}
   */
  isShifted() {
    return this.x !== this.getCurrSlideX();
  }
  /**
   * Update slides X positions and set their content
   */
  updateCurrItem() {
    var t;
    const {
      pswp: i
    } = this, n = this._prevPositionIndex - this._currPositionIndex;
    if (!n)
      return;
    this._prevPositionIndex = this._currPositionIndex, i.currIndex = i.potentialIndex;
    let s = Math.abs(n), r;
    s >= 3 && (this._containerShiftIndex += n + (n > 0 ? -3 : 3), s = 3);
    for (let o = 0; o < s; o++)
      n > 0 ? (r = this.itemHolders.shift(), r && (this.itemHolders[2] = r, this._containerShiftIndex++, Wt(r.el, (this._containerShiftIndex + 2) * this.slideWidth), i.setContent(r, i.currIndex - s + o + 2))) : (r = this.itemHolders.pop(), r && (this.itemHolders.unshift(r), this._containerShiftIndex--, Wt(r.el, this._containerShiftIndex * this.slideWidth), i.setContent(r, i.currIndex + s - o - 2)));
    Math.abs(this._containerShiftIndex) > 50 && !this.isShifted() && (this.resetPosition(), this.resize()), i.animations.stopAllPan(), this.itemHolders.forEach((o, a) => {
      o.slide && o.slide.setIsActive(a === 1);
    }), i.currSlide = (t = this.itemHolders[1]) === null || t === void 0 ? void 0 : t.slide, i.contentLoader.updateLazy(n), i.currSlide && i.currSlide.applyCurrentZoomPan(), i.dispatch("change");
  }
  /**
   * Move the X position of the main scroll container
   *
   * @param {number} x
   * @param {boolean} [dragging]
   */
  moveTo(t, i) {
    if (!this.pswp.canLoop() && i) {
      let n = (this.slideWidth * this._currPositionIndex - t) / this.slideWidth;
      n += this.pswp.currIndex;
      const s = Math.round(t - this.x);
      (n < 0 && s > 0 || n >= this.pswp.getNumItems() - 1 && s < 0) && (t = this.x + s * Ph);
    }
    this.x = t, this.pswp.container && Wt(this.pswp.container, t), this.pswp.dispatch("moveMainScroll", {
      x: t,
      dragging: i ?? !1
    });
  }
}
const Ch = {
  Escape: 27,
  z: 90,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
  Tab: 9
}, Bt = (e, t) => t ? e : Ch[e];
class Th {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, this._wasFocused = !1, t.on("bindEvents", () => {
      t.options.trapFocus && (t.options.initialPointerPos || this._focusRoot(), t.events.add(
        document,
        "focusin",
        /** @type EventListener */
        this._onFocusIn.bind(this)
      )), t.events.add(
        document,
        "keydown",
        /** @type EventListener */
        this._onKeyDown.bind(this)
      );
    });
    const i = (
      /** @type {HTMLElement} */
      document.activeElement
    );
    t.on("destroy", () => {
      t.options.returnFocus && i && this._wasFocused && i.focus();
    });
  }
  /** @private */
  _focusRoot() {
    !this._wasFocused && this.pswp.element && (this.pswp.element.focus(), this._wasFocused = !0);
  }
  /**
   * @private
   * @param {KeyboardEvent} e
   */
  _onKeyDown(t) {
    const {
      pswp: i
    } = this;
    if (i.dispatch("keydown", {
      originalEvent: t
    }).defaultPrevented || ch(t))
      return;
    let n, s, r = !1;
    const o = "key" in t;
    switch (o ? t.key : t.keyCode) {
      case Bt("Escape", o):
        i.options.escKey && (n = "close");
        break;
      case Bt("z", o):
        n = "toggleZoom";
        break;
      case Bt("ArrowLeft", o):
        s = "x";
        break;
      case Bt("ArrowUp", o):
        s = "y";
        break;
      case Bt("ArrowRight", o):
        s = "x", r = !0;
        break;
      case Bt("ArrowDown", o):
        r = !0, s = "y";
        break;
      case Bt("Tab", o):
        this._focusRoot();
        break;
    }
    if (s) {
      t.preventDefault();
      const {
        currSlide: a
      } = i;
      i.options.arrowKeys && s === "x" && i.getNumItems() > 1 ? n = r ? "next" : "prev" : a && a.currZoomLevel > a.zoomLevels.fit && (a.pan[s] += r ? -80 : 80, a.panTo(a.pan.x, a.pan.y));
    }
    n && (t.preventDefault(), i[n]());
  }
  /**
   * Trap focus inside photoswipe
   *
   * @private
   * @param {FocusEvent} e
   */
  _onFocusIn(t) {
    const {
      template: i
    } = this.pswp;
    i && document !== t.target && i !== t.target && !i.contains(
      /** @type {Node} */
      t.target
    ) && i.focus();
  }
}
const Lh = "cubic-bezier(.4,0,.22,1)";
class Oh {
  /**
   * onComplete can be unpredictable, be careful about current state
   *
   * @param {CssAnimationProps} props
   */
  constructor(t) {
    var i;
    this.props = t;
    const {
      target: n,
      onComplete: s,
      transform: r,
      onFinish: o = () => {
      },
      duration: a = 333,
      easing: l = Lh
    } = t;
    this.onFinish = o;
    const c = r ? "transform" : "opacity", u = (i = t[c]) !== null && i !== void 0 ? i : "";
    this._target = n, this._onComplete = s, this._finished = !1, this._onTransitionEnd = this._onTransitionEnd.bind(this), this._helperTimeout = setTimeout(() => {
      Go(n, c, a, l), this._helperTimeout = setTimeout(() => {
        n.addEventListener("transitionend", this._onTransitionEnd, !1), n.addEventListener("transitioncancel", this._onTransitionEnd, !1), this._helperTimeout = setTimeout(() => {
          this._finalizeAnimation();
        }, a + 500), n.style[c] = u;
      }, 30);
    }, 0);
  }
  /**
   * @private
   * @param {TransitionEvent} e
   */
  _onTransitionEnd(t) {
    t.target === this._target && this._finalizeAnimation();
  }
  /**
   * @private
   */
  _finalizeAnimation() {
    this._finished || (this._finished = !0, this.onFinish(), this._onComplete && this._onComplete());
  }
  // Destroy is called automatically onFinish
  destroy() {
    this._helperTimeout && clearTimeout(this._helperTimeout), ah(this._target), this._target.removeEventListener("transitionend", this._onTransitionEnd, !1), this._target.removeEventListener("transitioncancel", this._onTransitionEnd, !1), this._finished || this._finalizeAnimation();
  }
}
const Dh = 12, Rh = 0.75;
class Mh {
  /**
   * @param {number} initialVelocity Initial velocity, px per ms.
   *
   * @param {number} [dampingRatio]
   * Determines how bouncy animation will be.
   * From 0 to 1, 0 - always overshoot, 1 - do not overshoot.
   * "overshoot" refers to part of animation that
   * goes beyond the final value.
   *
   * @param {number} [naturalFrequency]
   * Determines how fast animation will slow down.
   * The higher value - the stiffer the transition will be,
   * and the faster it will slow down.
   * Recommended value from 10 to 50
   */
  constructor(t, i, n) {
    this.velocity = t * 1e3, this._dampingRatio = i || Rh, this._naturalFrequency = n || Dh, this._dampedFrequency = this._naturalFrequency, this._dampingRatio < 1 && (this._dampedFrequency *= Math.sqrt(1 - this._dampingRatio * this._dampingRatio));
  }
  /**
   * @param {number} deltaPosition Difference between current and end position of the animation
   * @param {number} deltaTime Frame duration in milliseconds
   *
   * @returns {number} Displacement, relative to the end position.
   */
  easeFrame(t, i) {
    let n = 0, s;
    i /= 1e3;
    const r = Math.E ** (-this._dampingRatio * this._naturalFrequency * i);
    if (this._dampingRatio === 1)
      s = this.velocity + this._naturalFrequency * t, n = (t + s * i) * r, this.velocity = n * -this._naturalFrequency + s * r;
    else if (this._dampingRatio < 1) {
      s = 1 / this._dampedFrequency * (this._dampingRatio * this._naturalFrequency * t + this.velocity);
      const o = Math.cos(this._dampedFrequency * i), a = Math.sin(this._dampedFrequency * i);
      n = r * (t * o + s * a), this.velocity = n * -this._naturalFrequency * this._dampingRatio + r * (-this._dampedFrequency * t * a + this._dampedFrequency * s * o);
    }
    return n;
  }
}
class zh {
  /**
   * @param {SpringAnimationProps} props
   */
  constructor(t) {
    this.props = t, this._raf = 0;
    const {
      start: i,
      end: n,
      velocity: s,
      onUpdate: r,
      onComplete: o,
      onFinish: a = () => {
      },
      dampingRatio: l,
      naturalFrequency: c
    } = t;
    this.onFinish = a;
    const u = new Mh(s, l, c);
    let d = Date.now(), h = i - n;
    const m = () => {
      this._raf && (h = u.easeFrame(h, Date.now() - d), Math.abs(h) < 1 && Math.abs(u.velocity) < 50 ? (r(n), o && o(), this.onFinish()) : (d = Date.now(), r(h + n), this._raf = requestAnimationFrame(m)));
    };
    this._raf = requestAnimationFrame(m);
  }
  // Destroy is called automatically onFinish
  destroy() {
    this._raf >= 0 && cancelAnimationFrame(this._raf), this._raf = 0;
  }
}
class Nh {
  constructor() {
    this.activeAnimations = [];
  }
  /**
   * @param {SpringAnimationProps} props
   */
  startSpring(t) {
    this._start(t, !0);
  }
  /**
   * @param {CssAnimationProps} props
   */
  startTransition(t) {
    this._start(t);
  }
  /**
   * @private
   * @param {AnimationProps} props
   * @param {boolean} [isSpring]
   * @returns {Animation}
   */
  _start(t, i) {
    const n = i ? new zh(
      /** @type SpringAnimationProps */
      t
    ) : new Oh(
      /** @type CssAnimationProps */
      t
    );
    return this.activeAnimations.push(n), n.onFinish = () => this.stop(n), n;
  }
  /**
   * @param {Animation} animation
   */
  stop(t) {
    t.destroy();
    const i = this.activeAnimations.indexOf(t);
    i > -1 && this.activeAnimations.splice(i, 1);
  }
  stopAll() {
    this.activeAnimations.forEach((t) => {
      t.destroy();
    }), this.activeAnimations = [];
  }
  /**
   * Stop all pan or zoom transitions
   */
  stopAllPan() {
    this.activeAnimations = this.activeAnimations.filter((t) => t.props.isPan ? (t.destroy(), !1) : !0);
  }
  stopMainScroll() {
    this.activeAnimations = this.activeAnimations.filter((t) => t.props.isMainScroll ? (t.destroy(), !1) : !0);
  }
  /**
   * Returns true if main scroll transition is running
   */
  // isMainScrollRunning() {
  //   return this.activeAnimations.some((animation) => {
  //     return animation.props.isMainScroll;
  //   });
  // }
  /**
   * Returns true if any pan or zoom transition is running
   */
  isPanRunning() {
    return this.activeAnimations.some((t) => t.props.isPan);
  }
}
class Fh {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, t.events.add(
      t.element,
      "wheel",
      /** @type EventListener */
      this._onWheel.bind(this)
    );
  }
  /**
   * @private
   * @param {WheelEvent} e
   */
  _onWheel(t) {
    t.preventDefault();
    const {
      currSlide: i
    } = this.pswp;
    let {
      deltaX: n,
      deltaY: s
    } = t;
    if (i && !this.pswp.dispatch("wheel", {
      originalEvent: t
    }).defaultPrevented)
      if (t.ctrlKey || this.pswp.options.wheelToZoom) {
        if (i.isZoomable()) {
          let r = -s;
          t.deltaMode === 1 ? r *= 0.05 : r *= t.deltaMode ? 1 : 2e-3, r = 2 ** r;
          const o = i.currZoomLevel * r;
          i.zoomTo(o, {
            x: t.clientX,
            y: t.clientY
          });
        }
      } else
        i.isPannable() && (t.deltaMode === 1 && (n *= 18, s *= 18), i.panTo(i.pan.x - n, i.pan.y - s));
  }
}
function $h(e) {
  if (typeof e == "string")
    return e;
  if (!e || !e.isCustomSVG)
    return "";
  const t = e;
  let i = '<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 %d %d" width="%d" height="%d">';
  return i = i.split("%d").join(
    /** @type {string} */
    t.size || 32
  ), t.outlineID && (i += '<use class="pswp__icn-shadow" xlink:href="#' + t.outlineID + '"/>'), i += t.inner, i += "</svg>", i;
}
class Zh {
  /**
   * @param {PhotoSwipe} pswp
   * @param {UIElementData} data
   */
  constructor(t, i) {
    var n;
    const s = i.name || i.className;
    let r = i.html;
    if (t.options[s] === !1)
      return;
    typeof t.options[s + "SVG"] == "string" && (r = t.options[s + "SVG"]), t.dispatch("uiElementCreate", {
      data: i
    });
    let o = "";
    i.isButton ? (o += "pswp__button ", o += i.className || `pswp__button--${i.name}`) : o += i.className || `pswp__${i.name}`;
    let a = i.isButton ? i.tagName || "button" : i.tagName || "div";
    a = /** @type {keyof HTMLElementTagNameMap} */
    a.toLowerCase();
    const l = rt(o, a);
    if (i.isButton) {
      a === "button" && (l.type = "button");
      let {
        title: d
      } = i;
      const {
        ariaLabel: h
      } = i;
      typeof t.options[s + "Title"] == "string" && (d = t.options[s + "Title"]), d && (l.title = d);
      const m = h || d;
      m && l.setAttribute("aria-label", m);
    }
    l.innerHTML = $h(r), i.onInit && i.onInit(l, t), i.onClick && (l.onclick = (d) => {
      typeof i.onClick == "string" ? t[i.onClick]() : typeof i.onClick == "function" && i.onClick(d, l, t);
    });
    const c = i.appendTo || "bar";
    let u = t.element;
    c === "bar" ? (t.topBar || (t.topBar = rt("pswp__top-bar pswp__hide-on-close", "div", t.scrollWrap)), u = t.topBar) : (l.classList.add("pswp__hide-on-close"), c === "wrapper" && (u = t.scrollWrap)), (n = u) === null || n === void 0 || n.appendChild(t.applyFilters("uiElement", l, i));
  }
}
function Jo(e, t, i) {
  e.classList.add("pswp__button--arrow"), e.setAttribute("aria-controls", "pswp__items"), t.on("change", () => {
    t.options.loop || (i ? e.disabled = !(t.currIndex < t.getNumItems() - 1) : e.disabled = !(t.currIndex > 0));
  });
}
const Bh = {
  name: "arrowPrev",
  className: "pswp__button--arrow--prev",
  title: "Previous",
  order: 10,
  isButton: !0,
  appendTo: "wrapper",
  html: {
    isCustomSVG: !0,
    size: 60,
    inner: '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-arrow"/>',
    outlineID: "pswp__icn-arrow"
  },
  onClick: "prev",
  onInit: Jo
}, kh = {
  name: "arrowNext",
  className: "pswp__button--arrow--next",
  title: "Next",
  order: 11,
  isButton: !0,
  appendTo: "wrapper",
  html: {
    isCustomSVG: !0,
    size: 60,
    inner: '<use xlink:href="#pswp__icn-arrow"/>',
    outlineID: "pswp__icn-arrow"
  },
  onClick: "next",
  onInit: (e, t) => {
    Jo(e, t, !0);
  }
}, Vh = {
  name: "close",
  title: "Close",
  order: 20,
  isButton: !0,
  html: {
    isCustomSVG: !0,
    inner: '<path d="M24 10l-2-2-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6z" id="pswp__icn-close"/>',
    outlineID: "pswp__icn-close"
  },
  onClick: "close"
}, Wh = {
  name: "zoom",
  title: "Zoom",
  order: 10,
  isButton: !0,
  html: {
    isCustomSVG: !0,
    // eslint-disable-next-line max-len
    inner: '<path d="M17.426 19.926a6 6 0 1 1 1.5-1.5L23 22.5 21.5 24l-4.074-4.074z" id="pswp__icn-zoom"/><path fill="currentColor" class="pswp__zoom-icn-bar-h" d="M11 16v-2h6v2z"/><path fill="currentColor" class="pswp__zoom-icn-bar-v" d="M13 12h2v6h-2z"/>',
    outlineID: "pswp__icn-zoom"
  },
  onClick: "toggleZoom"
}, Hh = {
  name: "preloader",
  appendTo: "bar",
  order: 7,
  html: {
    isCustomSVG: !0,
    // eslint-disable-next-line max-len
    inner: '<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2 16a5.2 5.2 0 1 1-5.2-5.2V8a8 8 0 1 0 8 8h-2.8Z" id="pswp__icn-loading"/>',
    outlineID: "pswp__icn-loading"
  },
  onInit: (e, t) => {
    let i, n = null;
    const s = (a, l) => {
      e.classList.toggle("pswp__preloader--" + a, l);
    }, r = (a) => {
      i !== a && (i = a, s("active", a));
    }, o = () => {
      var a;
      if (!((a = t.currSlide) !== null && a !== void 0 && a.content.isLoading())) {
        r(!1), n && (clearTimeout(n), n = null);
        return;
      }
      n || (n = setTimeout(() => {
        var l;
        r(!!(!((l = t.currSlide) === null || l === void 0) && l.content.isLoading())), n = null;
      }, t.options.preloaderDelay));
    };
    t.on("change", o), t.on("loadComplete", (a) => {
      t.currSlide === a.slide && o();
    }), t.ui && (t.ui.updatePreloaderVisibility = o);
  }
}, Uh = {
  name: "counter",
  order: 5,
  onInit: (e, t) => {
    t.on("change", () => {
      e.innerText = t.currIndex + 1 + t.options.indexIndicatorSep + t.getNumItems();
    });
  }
};
function Js(e, t) {
  e.classList.toggle("pswp--zoomed-in", t);
}
class Kh {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, this.isRegistered = !1, this.uiElementsData = [], this.items = [], this.updatePreloaderVisibility = () => {
    }, this._lastUpdatedZoomLevel = void 0;
  }
  init() {
    const {
      pswp: t
    } = this;
    this.isRegistered = !1, this.uiElementsData = [Vh, Bh, kh, Wh, Hh, Uh], t.dispatch("uiRegister"), this.uiElementsData.sort((i, n) => (i.order || 0) - (n.order || 0)), this.items = [], this.isRegistered = !0, this.uiElementsData.forEach((i) => {
      this.registerElement(i);
    }), t.on("change", () => {
      var i;
      (i = t.element) === null || i === void 0 || i.classList.toggle("pswp--one-slide", t.getNumItems() === 1);
    }), t.on("zoomPanUpdate", () => this._onZoomPanUpdate());
  }
  /**
   * @param {UIElementData} elementData
   */
  registerElement(t) {
    this.isRegistered ? this.items.push(new Zh(this.pswp, t)) : this.uiElementsData.push(t);
  }
  /**
   * Fired each time zoom or pan position is changed.
   * Update classes that control visibility of zoom button and cursor icon.
   *
   * @private
   */
  _onZoomPanUpdate() {
    const {
      template: t,
      currSlide: i,
      options: n
    } = this.pswp;
    if (this.pswp.opener.isClosing || !t || !i)
      return;
    let {
      currZoomLevel: s
    } = i;
    if (this.pswp.opener.isOpen || (s = i.zoomLevels.initial), s === this._lastUpdatedZoomLevel)
      return;
    this._lastUpdatedZoomLevel = s;
    const r = i.zoomLevels.initial - i.zoomLevels.secondary;
    if (Math.abs(r) < 0.01 || !i.isZoomable()) {
      Js(t, !1), t.classList.remove("pswp--zoom-allowed");
      return;
    }
    t.classList.add("pswp--zoom-allowed");
    const o = s === i.zoomLevels.initial ? i.zoomLevels.secondary : i.zoomLevels.initial;
    Js(t, o <= s), (n.imageClickAction === "zoom" || n.imageClickAction === "zoom-or-close") && t.classList.add("pswp--click-to-zoom");
  }
}
function Gh(e) {
  const t = e.getBoundingClientRect();
  return {
    x: t.left,
    y: t.top,
    w: t.width
  };
}
function qh(e, t, i) {
  const n = e.getBoundingClientRect(), s = n.width / t, r = n.height / i, o = s > r ? s : r, a = (n.width - t * o) / 2, l = (n.height - i * o) / 2, c = {
    x: n.left + a,
    y: n.top + l,
    w: t * o
  };
  return c.innerRect = {
    w: n.width,
    h: n.height,
    x: a,
    y: l
  }, c;
}
function jh(e, t, i) {
  const n = i.dispatch("thumbBounds", {
    index: e,
    itemData: t,
    instance: i
  });
  if (n.thumbBounds)
    return n.thumbBounds;
  const {
    element: s
  } = t;
  let r, o;
  if (s && i.options.thumbSelector !== !1) {
    const a = i.options.thumbSelector || "img";
    o = s.matches(a) ? s : (
      /** @type {HTMLElement | null} */
      s.querySelector(a)
    );
  }
  return o = i.applyFilters("thumbEl", o, t, e), o && (t.thumbCropped ? r = qh(o, t.width || t.w || 0, t.height || t.h || 0) : r = Gh(o)), i.applyFilters("thumbBounds", r, t, e);
}
class Xh {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(t, i) {
    this.type = t, this.defaultPrevented = !1, i && Object.assign(this, i);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class Yh {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(t, i, n = 100) {
    var s, r, o;
    this._filters[t] || (this._filters[t] = []), (s = this._filters[t]) === null || s === void 0 || s.push({
      fn: i,
      priority: n
    }), (r = this._filters[t]) === null || r === void 0 || r.sort((a, l) => a.priority - l.priority), (o = this.pswp) === null || o === void 0 || o.addFilter(t, i, n);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(t, i) {
    this._filters[t] && (this._filters[t] = this._filters[t].filter((n) => n.fn !== i)), this.pswp && this.pswp.removeFilter(t, i);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(t, ...i) {
    var n;
    return (n = this._filters[t]) === null || n === void 0 || n.forEach((s) => {
      i[0] = s.fn.apply(this, i);
    }), i[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(t, i) {
    var n, s;
    this._listeners[t] || (this._listeners[t] = []), (n = this._listeners[t]) === null || n === void 0 || n.push(i), (s = this.pswp) === null || s === void 0 || s.on(t, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(t, i) {
    var n;
    this._listeners[t] && (this._listeners[t] = this._listeners[t].filter((s) => i !== s)), (n = this.pswp) === null || n === void 0 || n.off(t, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(t, i) {
    var n;
    if (this.pswp)
      return this.pswp.dispatch(t, i);
    const s = (
      /** @type {AugmentedEvent<T>} */
      new Xh(t, i)
    );
    return (n = this._listeners[t]) === null || n === void 0 || n.forEach((r) => {
      r.call(this, s);
    }), s;
  }
}
class Jh {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(t, i) {
    if (this.element = rt("pswp__img pswp__img--placeholder", t ? "img" : "div", i), t) {
      const n = (
        /** @type {HTMLImageElement} */
        this.element
      );
      n.decoding = "async", n.alt = "", n.src = t, n.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(t, i) {
    this.element && (this.element.tagName === "IMG" ? (yn(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = Ne(0, 0, t / 250)) : yn(this.element, t, i));
  }
  destroy() {
    var t;
    (t = this.element) !== null && t !== void 0 && t.parentNode && this.element.remove(), this.element = null;
  }
}
class Qh {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(t, i, n) {
    this.instance = i, this.data = t, this.index = n, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = at.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(t, i) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const n = this.placeholder.element;
        n && !n.parentElement && this.slide.container.prepend(n);
      } else {
        const n = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new Jh(n, this.slide.container);
      }
    this.element && !i || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: t
    }).defaultPrevented || (this.isImageContent() ? (this.element = rt("pswp__img", "img"), this.displayedImageWidth && this.loadImage(t)) : (this.element = rt("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), i && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(t) {
    var i, n;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented)
      return;
    const s = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (s.srcset = this.data.srcset), s.src = (i = this.data.src) !== null && i !== void 0 ? i : "", s.alt = (n = this.data.alt) !== null && n !== void 0 ? n : "", this.state = at.LOADING, s.complete ? this.onLoaded() : (s.onload = () => {
      this.onLoaded();
    }, s.onerror = () => {
      this.onError();
    });
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(t) {
    this.slide = t, this.hasSlide = !0, this.instance = t.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = at.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === at.LOADED || this.state === at.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = at.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: !0,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === at.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === at.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(t, i) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, i), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: i
    }).defaultPrevented && (yn(this.element, t, i), this.isImageContent() && !this.isError()))) {
      const n = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = i, n ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: i,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== at.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset)
      return;
    const t = (
      /** @type HTMLImageElement */
      this.element
    ), i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || i > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = i + "px", t.dataset.largestUsedSize = String(i));
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(!0);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = !1, this.slide = void 0, !this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented && (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var t, i;
      let n = rt("pswp__error-msg", "div");
      n.innerText = (t = (i = this.instance.options) === null || i === void 0 ? void 0 : i.errorMsg) !== null && t !== void 0 ? t : "", n = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", n, this), this.element = rt("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(n), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === at.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const t = "decode" in this.element;
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || Ks()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
    }).finally(() => {
      this.isDecoding = !1, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !Ks() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = !1, !this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented && (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === at.LOADED || this.state === at.ERROR) && this.removePlaceholder()));
  }
}
const td = 5;
function Qo(e, t, i) {
  const n = t.createContentFromData(e, i);
  let s;
  const {
    options: r
  } = t;
  if (r) {
    s = new Yo(r, e, -1);
    let o;
    t.pswp ? o = t.pswp.viewportSize : o = jo(r, t);
    const a = Xo(r, o, e, i);
    s.update(n.width, n.height, a);
  }
  return n.lazyLoad(), s && n.setDisplayedSize(Math.ceil(n.width * s.initial), Math.ceil(n.height * s.initial)), n;
}
function ed(e, t) {
  const i = t.getItemData(e);
  if (!t.dispatch("lazyLoadSlide", {
    index: e,
    itemData: i
  }).defaultPrevented)
    return Qo(i, t, e);
}
class id {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, this.limit = Math.max(t.options.preload[0] + t.options.preload[1] + 1, td), this._cachedItems = [];
  }
  /**
   * Lazy load nearby slides based on `preload` option.
   *
   * @param {number} [diff] Difference between slide indexes that was changed recently, or 0.
   */
  updateLazy(t) {
    const {
      pswp: i
    } = this;
    if (i.dispatch("lazyLoad").defaultPrevented)
      return;
    const {
      preload: n
    } = i.options, s = t === void 0 ? !0 : t >= 0;
    let r;
    for (r = 0; r <= n[1]; r++)
      this.loadSlideByIndex(i.currIndex + (s ? r : -r));
    for (r = 1; r <= n[0]; r++)
      this.loadSlideByIndex(i.currIndex + (s ? -r : r));
  }
  /**
   * @param {number} initialIndex
   */
  loadSlideByIndex(t) {
    const i = this.pswp.getLoopedIndex(t);
    let n = this.getContentByIndex(i);
    n || (n = ed(i, this.pswp), n && this.addToCache(n));
  }
  /**
   * @param {Slide} slide
   * @returns {Content}
   */
  getContentBySlide(t) {
    let i = this.getContentByIndex(t.index);
    return i || (i = this.pswp.createContentFromData(t.data, t.index), this.addToCache(i)), i.setSlide(t), i;
  }
  /**
   * @param {Content} content
   */
  addToCache(t) {
    if (this.removeByIndex(t.index), this._cachedItems.push(t), this._cachedItems.length > this.limit) {
      const i = this._cachedItems.findIndex((n) => !n.isAttached && !n.hasSlide);
      i !== -1 && this._cachedItems.splice(i, 1)[0].destroy();
    }
  }
  /**
   * Removes an image from cache, does not destroy() it, just removes.
   *
   * @param {number} index
   */
  removeByIndex(t) {
    const i = this._cachedItems.findIndex((n) => n.index === t);
    i !== -1 && this._cachedItems.splice(i, 1);
  }
  /**
   * @param {number} index
   * @returns {Content | undefined}
   */
  getContentByIndex(t) {
    return this._cachedItems.find((i) => i.index === t);
  }
  destroy() {
    this._cachedItems.forEach((t) => t.destroy()), this._cachedItems = [];
  }
}
class nd extends Yh {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var t;
    let i = 0;
    const n = (t = this.options) === null || t === void 0 ? void 0 : t.dataSource;
    n && "length" in n ? i = n.length : n && "gallery" in n && (n.items || (n.items = this._getGalleryDOMElements(n.gallery)), n.items && (i = n.items.length));
    const s = this.dispatch("numItems", {
      dataSource: n,
      numItems: i
    });
    return this.applyFilters("numItems", s.numItems, n);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(t, i) {
    return new Qh(t, this, i);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(t) {
    var i;
    const n = (i = this.options) === null || i === void 0 ? void 0 : i.dataSource;
    let s = {};
    Array.isArray(n) ? s = n[t] : n && "gallery" in n && (n.items || (n.items = this._getGalleryDOMElements(n.gallery)), s = n.items[t]);
    let r = s;
    r instanceof Element && (r = this._domElementToItemData(r));
    const o = this.dispatch("itemData", {
      itemData: r || {},
      index: t
    });
    return this.applyFilters("itemData", o.itemData, t);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(t) {
    var i, n;
    return (i = this.options) !== null && i !== void 0 && i.children || (n = this.options) !== null && n !== void 0 && n.childSelector ? uh(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(t) {
    const i = {
      element: t
    }, n = (
      /** @type {HTMLAnchorElement} */
      t.tagName === "A" ? t : t.querySelector("a")
    );
    if (n) {
      i.src = n.dataset.pswpSrc || n.href, n.dataset.pswpSrcset && (i.srcset = n.dataset.pswpSrcset), i.width = n.dataset.pswpWidth ? parseInt(n.dataset.pswpWidth, 10) : 0, i.height = n.dataset.pswpHeight ? parseInt(n.dataset.pswpHeight, 10) : 0, i.w = i.width, i.h = i.height, n.dataset.pswpType && (i.type = n.dataset.pswpType);
      const r = t.querySelector("img");
      if (r) {
        var s;
        i.msrc = r.currentSrc || r.src, i.alt = (s = r.getAttribute("alt")) !== null && s !== void 0 ? s : "";
      }
      (n.dataset.pswpCropped || n.dataset.cropped) && (i.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", i, t, n);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(t, i) {
    return Qo(t, this, i);
  }
}
const ve = 3e-3;
class sd {
  /**
   * @param {PhotoSwipe} pswp
   */
  constructor(t) {
    this.pswp = t, this.isClosed = !0, this.isOpen = !1, this.isClosing = !1, this.isOpening = !1, this._duration = void 0, this._useAnimation = !1, this._croppedZoom = !1, this._animateRootOpacity = !1, this._animateBgOpacity = !1, this._placeholder = void 0, this._opacityElement = void 0, this._cropContainer1 = void 0, this._cropContainer2 = void 0, this._thumbBounds = void 0, this._prepareOpen = this._prepareOpen.bind(this), t.on("firstZoomPan", this._prepareOpen);
  }
  open() {
    this._prepareOpen(), this._start();
  }
  close() {
    if (this.isClosed || this.isClosing || this.isOpening)
      return;
    const t = this.pswp.currSlide;
    this.isOpen = !1, this.isOpening = !1, this.isClosing = !0, this._duration = this.pswp.options.hideAnimationDuration, t && t.currZoomLevel * t.width >= this.pswp.options.maxWidthToAnimate && (this._duration = 0), this._applyStartProps(), setTimeout(() => {
      this._start();
    }, this._croppedZoom ? 30 : 0);
  }
  /** @private */
  _prepareOpen() {
    if (this.pswp.off("firstZoomPan", this._prepareOpen), !this.isOpening) {
      const t = this.pswp.currSlide;
      this.isOpening = !0, this.isClosing = !1, this._duration = this.pswp.options.showAnimationDuration, t && t.zoomLevels.initial * t.width >= this.pswp.options.maxWidthToAnimate && (this._duration = 0), this._applyStartProps();
    }
  }
  /** @private */
  _applyStartProps() {
    const {
      pswp: t
    } = this, i = this.pswp.currSlide, {
      options: n
    } = t;
    if (n.showHideAnimationType === "fade" ? (n.showHideOpacity = !0, this._thumbBounds = void 0) : n.showHideAnimationType === "none" ? (n.showHideOpacity = !1, this._duration = 0, this._thumbBounds = void 0) : this.isOpening && t._initialThumbBounds ? this._thumbBounds = t._initialThumbBounds : this._thumbBounds = this.pswp.getThumbBounds(), this._placeholder = i == null ? void 0 : i.getPlaceholderElement(), t.animations.stopAll(), this._useAnimation = !!(this._duration && this._duration > 50), this._animateZoom = !!this._thumbBounds && (i == null ? void 0 : i.content.usePlaceholder()) && (!this.isClosing || !t.mainScroll.isShifted()), !this._animateZoom)
      this._animateRootOpacity = !0, this.isOpening && i && (i.zoomAndPanToInitial(), i.applyCurrentZoomPan());
    else {
      var s;
      this._animateRootOpacity = (s = n.showHideOpacity) !== null && s !== void 0 ? s : !1;
    }
    if (this._animateBgOpacity = !this._animateRootOpacity && this.pswp.options.bgOpacity > ve, this._opacityElement = this._animateRootOpacity ? t.element : t.bg, !this._useAnimation) {
      this._duration = 0, this._animateZoom = !1, this._animateBgOpacity = !1, this._animateRootOpacity = !0, this.isOpening && (t.element && (t.element.style.opacity = String(ve)), t.applyBgOpacity(1));
      return;
    }
    if (this._animateZoom && this._thumbBounds && this._thumbBounds.innerRect) {
      var r;
      this._croppedZoom = !0, this._cropContainer1 = this.pswp.container, this._cropContainer2 = (r = this.pswp.currSlide) === null || r === void 0 ? void 0 : r.holderElement, t.container && (t.container.style.overflow = "hidden", t.container.style.width = t.viewportSize.x + "px");
    } else
      this._croppedZoom = !1;
    this.isOpening ? (this._animateRootOpacity ? (t.element && (t.element.style.opacity = String(ve)), t.applyBgOpacity(1)) : (this._animateBgOpacity && t.bg && (t.bg.style.opacity = String(ve)), t.element && (t.element.style.opacity = "1")), this._animateZoom && (this._setClosedStateZoomPan(), this._placeholder && (this._placeholder.style.willChange = "transform", this._placeholder.style.opacity = String(ve)))) : this.isClosing && (t.mainScroll.itemHolders[0] && (t.mainScroll.itemHolders[0].el.style.display = "none"), t.mainScroll.itemHolders[2] && (t.mainScroll.itemHolders[2].el.style.display = "none"), this._croppedZoom && t.mainScroll.x !== 0 && (t.mainScroll.resetPosition(), t.mainScroll.resize()));
  }
  /** @private */
  _start() {
    this.isOpening && this._useAnimation && this._placeholder && this._placeholder.tagName === "IMG" ? new Promise((t) => {
      let i = !1, n = !0;
      lh(
        /** @type {HTMLImageElement} */
        this._placeholder
      ).finally(() => {
        i = !0, n || t(!0);
      }), setTimeout(() => {
        n = !1, i && t(!0);
      }, 50), setTimeout(t, 250);
    }).finally(() => this._initiate()) : this._initiate();
  }
  /** @private */
  _initiate() {
    var t, i;
    (t = this.pswp.element) === null || t === void 0 || t.style.setProperty("--pswp-transition-duration", this._duration + "ms"), this.pswp.dispatch(this.isOpening ? "openingAnimationStart" : "closingAnimationStart"), this.pswp.dispatch(
      /** @type {'initialZoomIn' | 'initialZoomOut'} */
      "initialZoom" + (this.isOpening ? "In" : "Out")
    ), (i = this.pswp.element) === null || i === void 0 || i.classList.toggle("pswp--ui-visible", this.isOpening), this.isOpening ? (this._placeholder && (this._placeholder.style.opacity = "1"), this._animateToOpenState()) : this.isClosing && this._animateToClosedState(), this._useAnimation || this._onAnimationComplete();
  }
  /** @private */
  _onAnimationComplete() {
    const {
      pswp: t
    } = this;
    if (this.isOpen = this.isOpening, this.isClosed = this.isClosing, this.isOpening = !1, this.isClosing = !1, t.dispatch(this.isOpen ? "openingAnimationEnd" : "closingAnimationEnd"), t.dispatch(
      /** @type {'initialZoomInEnd' | 'initialZoomOutEnd'} */
      "initialZoom" + (this.isOpen ? "InEnd" : "OutEnd")
    ), this.isClosed)
      t.destroy();
    else if (this.isOpen) {
      var i;
      this._animateZoom && t.container && (t.container.style.overflow = "visible", t.container.style.width = "100%"), (i = t.currSlide) === null || i === void 0 || i.applyCurrentZoomPan();
    }
  }
  /** @private */
  _animateToOpenState() {
    const {
      pswp: t
    } = this;
    this._animateZoom && (this._croppedZoom && this._cropContainer1 && this._cropContainer2 && (this._animateTo(this._cropContainer1, "transform", "translate3d(0,0,0)"), this._animateTo(this._cropContainer2, "transform", "none")), t.currSlide && (t.currSlide.zoomAndPanToInitial(), this._animateTo(t.currSlide.container, "transform", t.currSlide.getCurrentTransform()))), this._animateBgOpacity && t.bg && this._animateTo(t.bg, "opacity", String(t.options.bgOpacity)), this._animateRootOpacity && t.element && this._animateTo(t.element, "opacity", "1");
  }
  /** @private */
  _animateToClosedState() {
    const {
      pswp: t
    } = this;
    this._animateZoom && this._setClosedStateZoomPan(!0), this._animateBgOpacity && t.bgOpacity > 0.01 && t.bg && this._animateTo(t.bg, "opacity", "0"), this._animateRootOpacity && t.element && this._animateTo(t.element, "opacity", "0");
  }
  /**
   * @private
   * @param {boolean} [animate]
   */
  _setClosedStateZoomPan(t) {
    if (!this._thumbBounds)
      return;
    const {
      pswp: i
    } = this, {
      innerRect: n
    } = this._thumbBounds, {
      currSlide: s,
      viewportSize: r
    } = i;
    if (this._croppedZoom && n && this._cropContainer1 && this._cropContainer2) {
      const o = -r.x + (this._thumbBounds.x - n.x) + n.w, a = -r.y + (this._thumbBounds.y - n.y) + n.h, l = r.x - n.w, c = r.y - n.h;
      t ? (this._animateTo(this._cropContainer1, "transform", Ne(o, a)), this._animateTo(this._cropContainer2, "transform", Ne(l, c))) : (Wt(this._cropContainer1, o, a), Wt(this._cropContainer2, l, c));
    }
    s && (X(s.pan, n || this._thumbBounds), s.currZoomLevel = this._thumbBounds.w / s.width, t ? this._animateTo(s.container, "transform", s.getCurrentTransform()) : s.applyCurrentZoomPan());
  }
  /**
   * @private
   * @param {HTMLElement} target
   * @param {'transform' | 'opacity'} prop
   * @param {string} propValue
   */
  _animateTo(t, i, n) {
    if (!this._duration) {
      t.style[i] = n;
      return;
    }
    const {
      animations: s
    } = this.pswp, r = {
      duration: this._duration,
      easing: this.pswp.options.easing,
      onComplete: () => {
        s.activeAnimations.length || this._onAnimationComplete();
      },
      target: t
    };
    r[i] = n, s.startTransition(r);
  }
}
const rd = {
  allowPanToNext: !0,
  spacing: 0.1,
  loop: !0,
  pinchToClose: !0,
  closeOnVerticalDrag: !0,
  hideAnimationDuration: 333,
  showAnimationDuration: 333,
  zoomAnimationDuration: 333,
  escKey: !0,
  arrowKeys: !0,
  trapFocus: !0,
  returnFocus: !0,
  maxWidthToAnimate: 4e3,
  clickToCloseNonZoomable: !0,
  imageClickAction: "zoom-or-close",
  bgClickAction: "close",
  tapAction: "toggle-controls",
  doubleTapAction: "zoom",
  indexIndicatorSep: " / ",
  preloaderDelay: 2e3,
  bgOpacity: 0.8,
  index: 0,
  errorMsg: "The image cannot be loaded",
  preload: [1, 2],
  easing: "cubic-bezier(.4,0,.22,1)"
};
class od extends nd {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(t) {
    super(), this.options = this._prepareOptions(t || {}), this.offset = {
      x: 0,
      y: 0
    }, this._prevViewportSize = {
      x: 0,
      y: 0
    }, this.viewportSize = {
      x: 0,
      y: 0
    }, this.bgOpacity = 1, this.currIndex = 0, this.potentialIndex = 0, this.isOpen = !1, this.isDestroying = !1, this.hasMouse = !1, this._initialItemData = {}, this._initialThumbBounds = void 0, this.topBar = void 0, this.element = void 0, this.template = void 0, this.container = void 0, this.scrollWrap = void 0, this.currSlide = void 0, this.events = new hh(), this.animations = new Nh(), this.mainScroll = new Ih(this), this.gestures = new xh(this), this.opener = new sd(this), this.keyboard = new Th(this), this.contentLoader = new id(this);
  }
  /** @returns {boolean} */
  init() {
    if (this.isOpen || this.isDestroying)
      return !1;
    this.isOpen = !0, this.dispatch("init"), this.dispatch("beforeOpen"), this._createMainStructure();
    let t = "pswp--open";
    return this.gestures.supportsTouch && (t += " pswp--touch"), this.options.mainClass && (t += " " + this.options.mainClass), this.element && (this.element.className += " " + t), this.currIndex = this.options.index || 0, this.potentialIndex = this.currIndex, this.dispatch("firstUpdate"), this.scrollWheel = new Fh(this), (Number.isNaN(this.currIndex) || this.currIndex < 0 || this.currIndex >= this.getNumItems()) && (this.currIndex = 0), this.gestures.supportsTouch || this.mouseDetected(), this.updateSize(), this.offset.y = window.pageYOffset, this._initialItemData = this.getItemData(this.currIndex), this.dispatch("gettingData", {
      index: this.currIndex,
      data: this._initialItemData,
      slide: void 0
    }), this._initialThumbBounds = this.getThumbBounds(), this.dispatch("initialLayout"), this.on("openingAnimationEnd", () => {
      const {
        itemHolders: i
      } = this.mainScroll;
      i[0] && (i[0].el.style.display = "block", this.setContent(i[0], this.currIndex - 1)), i[2] && (i[2].el.style.display = "block", this.setContent(i[2], this.currIndex + 1)), this.appendHeavy(), this.contentLoader.updateLazy(), this.events.add(window, "resize", this._handlePageResize.bind(this)), this.events.add(window, "scroll", this._updatePageScrollOffset.bind(this)), this.dispatch("bindEvents");
    }), this.mainScroll.itemHolders[1] && this.setContent(this.mainScroll.itemHolders[1], this.currIndex), this.dispatch("change"), this.opener.open(), this.dispatch("afterInit"), !0;
  }
  /**
   * Get looped slide index
   * (for example, -1 will return the last slide)
   *
   * @param {number} index
   * @returns {number}
   */
  getLoopedIndex(t) {
    const i = this.getNumItems();
    return this.options.loop && (t > i - 1 && (t -= i), t < 0 && (t += i)), Xe(t, 0, i - 1);
  }
  appendHeavy() {
    this.mainScroll.itemHolders.forEach((t) => {
      var i;
      (i = t.slide) === null || i === void 0 || i.appendHeavy();
    });
  }
  /**
   * Change the slide
   * @param {number} index New index
   */
  goTo(t) {
    this.mainScroll.moveIndexBy(this.getLoopedIndex(t) - this.potentialIndex);
  }
  /**
   * Go to the next slide.
   */
  next() {
    this.goTo(this.potentialIndex + 1);
  }
  /**
   * Go to the previous slide.
   */
  prev() {
    this.goTo(this.potentialIndex - 1);
  }
  /**
   * @see slide/slide.js zoomTo
   *
   * @param {Parameters<Slide['zoomTo']>} args
   */
  zoomTo(...t) {
    var i;
    (i = this.currSlide) === null || i === void 0 || i.zoomTo(...t);
  }
  /**
   * @see slide/slide.js toggleZoom
   */
  toggleZoom() {
    var t;
    (t = this.currSlide) === null || t === void 0 || t.toggleZoom();
  }
  /**
   * Close the gallery.
   * After closing transition ends - destroy it
   */
  close() {
    !this.opener.isOpen || this.isDestroying || (this.isDestroying = !0, this.dispatch("close"), this.events.removeAll(), this.opener.close());
  }
  /**
   * Destroys the gallery:
   * - instantly closes the gallery
   * - unbinds events,
   * - cleans intervals and timeouts
   * - removes elements from DOM
   */
  destroy() {
    var t;
    if (!this.isDestroying) {
      this.options.showHideAnimationType = "none", this.close();
      return;
    }
    this.dispatch("destroy"), this._listeners = {}, this.scrollWrap && (this.scrollWrap.ontouchmove = null, this.scrollWrap.ontouchend = null), (t = this.element) === null || t === void 0 || t.remove(), this.mainScroll.itemHolders.forEach((i) => {
      var n;
      (n = i.slide) === null || n === void 0 || n.destroy();
    }), this.contentLoader.destroy(), this.events.removeAll();
  }
  /**
   * Refresh/reload content of a slide by its index
   *
   * @param {number} slideIndex
   */
  refreshSlideContent(t) {
    this.contentLoader.removeByIndex(t), this.mainScroll.itemHolders.forEach((i, n) => {
      var s, r;
      let o = ((s = (r = this.currSlide) === null || r === void 0 ? void 0 : r.index) !== null && s !== void 0 ? s : 0) - 1 + n;
      if (this.canLoop() && (o = this.getLoopedIndex(o)), o === t && (this.setContent(i, t, !0), n === 1)) {
        var a;
        this.currSlide = i.slide, (a = i.slide) === null || a === void 0 || a.setIsActive(!0);
      }
    }), this.dispatch("change");
  }
  /**
   * Set slide content
   *
   * @param {ItemHolder} holder mainScroll.itemHolders array item
   * @param {number} index Slide index
   * @param {boolean} [force] If content should be set even if index wasn't changed
   */
  setContent(t, i, n) {
    if (this.canLoop() && (i = this.getLoopedIndex(i)), t.slide) {
      if (t.slide.index === i && !n)
        return;
      t.slide.destroy(), t.slide = void 0;
    }
    if (!this.canLoop() && (i < 0 || i >= this.getNumItems()))
      return;
    const s = this.getItemData(i);
    t.slide = new fh(s, i, this), i === this.currIndex && (this.currSlide = t.slide), t.slide.append(t.el);
  }
  /** @returns {Point} */
  getViewportCenterPoint() {
    return {
      x: this.viewportSize.x / 2,
      y: this.viewportSize.y / 2
    };
  }
  /**
   * Update size of all elements.
   * Executed on init and on page resize.
   *
   * @param {boolean} [force] Update size even if size of viewport was not changed.
   */
  updateSize(t) {
    if (this.isDestroying)
      return;
    const i = jo(this.options, this);
    !t && Pe(i, this._prevViewportSize) || (X(this._prevViewportSize, i), this.dispatch("beforeResize"), X(this.viewportSize, this._prevViewportSize), this._updatePageScrollOffset(), this.dispatch("viewportSize"), this.mainScroll.resize(this.opener.isOpen), !this.hasMouse && window.matchMedia("(any-hover: hover)").matches && this.mouseDetected(), this.dispatch("resize"));
  }
  /**
   * @param {number} opacity
   */
  applyBgOpacity(t) {
    this.bgOpacity = Math.max(t, 0), this.bg && (this.bg.style.opacity = String(this.bgOpacity * this.options.bgOpacity));
  }
  /**
   * Whether mouse is detected
   */
  mouseDetected() {
    if (!this.hasMouse) {
      var t;
      this.hasMouse = !0, (t = this.element) === null || t === void 0 || t.classList.add("pswp--has_mouse");
    }
  }
  /**
   * Page resize event handler
   *
   * @private
   */
  _handlePageResize() {
    this.updateSize(), /iPhone|iPad|iPod/i.test(window.navigator.userAgent) && setTimeout(() => {
      this.updateSize();
    }, 500);
  }
  /**
   * Page scroll offset is used
   * to get correct coordinates
   * relative to PhotoSwipe viewport.
   *
   * @private
   */
  _updatePageScrollOffset() {
    this.setScrollOffset(0, window.pageYOffset);
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setScrollOffset(t, i) {
    this.offset.x = t, this.offset.y = i, this.dispatch("updateScrollOffset");
  }
  /**
   * Create main HTML structure of PhotoSwipe,
   * and add it to DOM
   *
   * @private
   */
  _createMainStructure() {
    this.element = rt("pswp", "div"), this.element.setAttribute("tabindex", "-1"), this.element.setAttribute("role", "dialog"), this.template = this.element, this.bg = rt("pswp__bg", "div", this.element), this.scrollWrap = rt("pswp__scroll-wrap", "section", this.element), this.container = rt("pswp__container", "div", this.scrollWrap), this.scrollWrap.setAttribute("aria-roledescription", "carousel"), this.container.setAttribute("aria-live", "off"), this.container.setAttribute("id", "pswp__items"), this.mainScroll.appendHolders(), this.ui = new Kh(this), this.ui.init(), (this.options.appendToEl || document.body).appendChild(this.element);
  }
  /**
   * Get position and dimensions of small thumbnail
   *   {x:,y:,w:}
   *
   * Height is optional (calculated based on the large image)
   *
   * @returns {Bounds | undefined}
   */
  getThumbBounds() {
    return jh(this.currIndex, this.currSlide ? this.currSlide.data : this._initialItemData, this);
  }
  /**
   * If the PhotoSwipe can have continuous loop
   * @returns Boolean
   */
  canLoop() {
    return this.options.loop && this.getNumItems() > 2;
  }
  /**
   * @private
   * @param {PhotoSwipeOptions} options
   * @returns {PreparedPhotoSwipeOptions}
   */
  _prepareOptions(t) {
    return window.matchMedia("(prefers-reduced-motion), (update: slow)").matches && (t.showHideAnimationType = "none", t.zoomAnimationDuration = 0), {
      ...rd,
      ...t
    };
  }
}
window.Alpine = di;
window.Splide = es;
window.AutoScroll = Ku;
window.PhotoSwipeLightbox = rh;
window.PhotoSwipe = od;
document.addEventListener("alpine:init", () => {
  di.store("cart", {
    count: 0,
    products: [],
    subtotal: 0,
    currency: "",
    init() {
      this.update();
    },
    update() {
      zid.store.cart.fetch().then((e) => {
        e.data.cart.products_count != 0 && (this.count = e.data.cart.products_count, this.products = e.data.cart.products, this.subtotal = e.data.cart.products_subtotal, this.currency = e.data.cart.currency.cart_currency.code);
      });
    }
  }), di.store("all_products", {
    products: [],
    async init() {
      let e = 1, t = 100;
      for (; ; ) {
        const i = await window.zid.store.product.fetchAll(null, { page: e, per_page: t });
        if (this.products = this.products.concat(i.data.products.data), this.products.length >= i.data.products.total)
          break;
        e++;
      }
    },
    getProductBySku(e) {
      return this.products.find((t) => t.sku === e);
    }
  });
});
di.start();
