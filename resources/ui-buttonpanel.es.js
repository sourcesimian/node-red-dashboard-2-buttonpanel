(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode('@import"https://fonts.googleapis.com/icon?family=Material+Icons";.bp-widget[data-v-cd173103]{--bp-font-color: #aaa;--bp-title-color: #bdbdbd;--bp-font-muted: #969696;--bp-bg: #32383e;--bp-bg-disabled: #232628;--bp-disabled-color: #606060;--bp-meter-bg: #444;--bp-fader-empty: #25292d;--bp-waiting: #f89406;--bp-sending: #26c6da;--bp-active: #26c6da;position:relative;display:flex;flex-direction:column;width:100%;min-width:0;max-width:100%;min-height:65px;height:100%;box-sizing:border-box;padding:6px 8px 14px;overflow:hidden;border-radius:4px;border:0;background:var(--bp-bg);color:var(--bp-font-color);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;line-height:1.25;-webkit-user-select:none;user-select:none}.bp-title[data-v-cd173103]{width:100%;flex:0 0 auto;overflow:hidden;text-align:left;color:var(--bp-title-color);font-size:1rem;font-weight:400;white-space:nowrap;text-overflow:clip}.bp-main[data-v-cd173103]{display:flex;flex:1 1 auto;align-items:center;min-width:0;min-height:0;gap:6px;padding-top:0;color:#f5f5f5;font-size:1.25rem}.bp-icon[data-v-cd173103],.bp-button-icon[data-v-cd173103],.bp-text-quote[data-v-cd173103]{display:inline-block;font-family:Material Icons,sans-serif;font-weight:400;font-style:normal;line-height:1;text-align:center;text-transform:none;letter-spacing:normal;white-space:nowrap;direction:ltr;word-wrap:normal;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased;font-feature-settings:"liga";text-rendering:optimizeLegibility}.bp-icon[data-v-cd173103]{min-width:28px;font-size:32px}.bp-gauge-body>.bp-icon[data-v-cd173103]{grid-column:1}.bp-text[data-v-cd173103],.bp-text-value[data-v-cd173103]{overflow:hidden;white-space:nowrap;text-overflow:clip}.bp-text-body[data-v-cd173103]{display:flex;flex:1 1 auto;align-items:center;min-width:0;min-height:0;gap:6px;padding-top:0}.bp-text-quote[data-v-cd173103]{min-width:28px;font-size:32px}.bp-text-value[data-v-cd173103]{padding-top:1px;color:#fff;font-size:1.25rem;line-height:1.2}.bp-state-body[data-v-cd173103]{gap:6px;padding-top:0}.bp-state-indicator[data-v-cd173103]{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;width:42px;height:34px;border:0;background:transparent}.bp-state-indicator .bp-icon[data-v-cd173103]{min-width:0;font-size:34px}.bp-state-text[data-v-cd173103]{font-size:1.25rem;font-weight:400;text-transform:none}.bp-select-caret[data-v-cd173103]{margin-left:auto;color:var(--bp-font-muted);font-size:22px}.bp-button-body[data-v-cd173103]{display:flex;flex:1 1 auto;align-items:center;gap:6px;min-width:0;min-height:0;padding-top:0;border:0;background:transparent}.bp-button-icon[data-v-cd173103]{flex:0 0 auto;min-width:30px;font-size:31px}.bp-button-text[data-v-cd173103]{flex:1 1 auto;min-width:0;overflow:hidden;font-size:1.25rem;font-weight:400;white-space:nowrap;text-overflow:clip}.bp-gauge-body[data-v-cd173103]{display:grid;grid-template-columns:auto minmax(0,1fr) max-content;align-items:center;align-content:center;padding-right:26px}.bp-gauge-label[data-v-cd173103]{grid-column:2;min-width:0;font-weight:400}.bp-number[data-v-cd173103]{grid-column:3;justify-self:end;min-width:3ch;max-width:100%;padding-right:0;overflow:hidden;color:#bdbdbd;font-size:1.2rem;font-weight:400;text-align:right;text-overflow:clip;white-space:nowrap}.bp-last-update[data-v-cd173103]{position:absolute;right:6px;bottom:4px;color:var(--bp-font-muted);font-size:9px}.bp-clickable[data-v-cd173103]{cursor:pointer}.bp-clickable[data-v-cd173103]:hover{cursor:pointer;filter:brightness(1.05)}.bp-disabled[data-v-cd173103]{background:var(--bp-bg-disabled);color:var(--bp-disabled-color);cursor:not-allowed;filter:none}.bp-disabled .bp-title[data-v-cd173103],.bp-disabled .bp-last-update[data-v-cd173103],.bp-disabled .bp-icon[data-v-cd173103],.bp-disabled .bp-button-icon[data-v-cd173103],.bp-disabled .bp-text-quote[data-v-cd173103],.bp-disabled .bp-text[data-v-cd173103],.bp-disabled .bp-text-value[data-v-cd173103],.bp-disabled .bp-state-text[data-v-cd173103],.bp-disabled .bp-gauge-label[data-v-cd173103],.bp-disabled .bp-number[data-v-cd173103],.bp-disabled .bp-button-body[data-v-cd173103],.bp-disabled .bp-button-text[data-v-cd173103]{color:var(--bp-disabled-color)!important}.bp-disabled .bp-state-indicator[data-v-cd173103]{color:var(--bp-disabled-color)!important;border-color:var(--bp-disabled-color)!important;background-color:transparent!important}.bp-disabled .bp-meter>span[data-v-cd173103]{background-color:var(--bp-disabled-color)!important}.bp-active[data-v-cd173103]{outline:2px solid var(--bp-active);outline-offset:-2px}.bp-sending[data-v-cd173103]{outline:2px solid var(--bp-sending);outline-offset:-2px;cursor:progress}.bp-pending[data-v-cd173103]{outline:2px solid var(--bp-waiting);outline-offset:-2px;background:#35383a;cursor:wait}.bp-sending[data-v-cd173103]>:not(.bp-status-overlay):not(.bp-modal-backdrop),.bp-pending[data-v-cd173103]>:not(.bp-status-overlay):not(.bp-modal-backdrop){opacity:.46}.bp-status-overlay[data-v-cd173103]{position:absolute;right:7px;top:7px;z-index:4;display:flex;align-items:center;justify-content:center;gap:5px;padding:4px 6px;border-radius:3px;color:#1f2124;background:var(--bp-waiting);font-size:.68rem;font-weight:800;text-transform:uppercase}.bp-sending .bp-status-overlay[data-v-cd173103]{background:var(--bp-sending)}.bp-spinner[data-v-cd173103]{width:11px;height:11px;border:2px solid rgba(31,33,36,.35);border-top-color:#1f2124;border-radius:50%;animation:bp-spin-cd173103 .8s linear infinite}.bp-unknown-state[data-v-cd173103]{opacity:.78}.bp-meter[data-v-cd173103]{position:absolute;top:9px;right:7px;width:20px;height:calc(100% - 26px);border:1px solid rgba(0,0,0,.45);background:var(--bp-meter-bg)}@keyframes bp-spin-cd173103{to{transform:rotate(360deg)}}.bp-meter>span[data-v-cd173103]{position:absolute;bottom:0;left:0;display:block;width:100%}.bp-image[data-v-cd173103]{display:flex;flex:1 1 auto;align-items:center;justify-content:center;min-height:0;margin-top:6px;overflow:hidden;line-height:1.2}.bp-image img[data-v-cd173103]{display:block;max-width:100%;max-height:100%;width:auto;height:auto;margin:0;object-fit:contain;object-position:center center}.bp-iframe[data-v-cd173103]{flex:1 1 auto;min-height:0;width:100%;height:100%;margin-top:6px;border:0;overflow:auto}.bp-unknown[data-v-cd173103]{align-self:flex-start;padding-top:2px;color:var(--bp-font-muted);font-size:1rem;line-height:1.2}.bp-modal-backdrop[data-v-cd173103]{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000;display:flex;align-items:center;justify-content:center;background:#00000080}.bp-modal[data-v-cd173103]{position:relative;min-width:330px;max-width:min(90vw,420px);padding:18px;border-radius:4px;background:#272b30;color:#ddd;box-shadow:0 12px 30px #00000059}.bp-modal-title[data-v-cd173103]{margin-bottom:12px;color:#f5f5f5;font-weight:700}.bp-modal-close[data-v-cd173103]{position:absolute;top:8px;right:8px;width:24px;height:24px;min-height:0;padding:0;border:0;background:transparent;cursor:pointer}.bp-modal-close span[data-v-cd173103],.bp-modal-close[data-v-cd173103]:before{position:absolute;top:11px;left:3px;width:18px;height:2px;border-radius:2px;background:#ddd;content:""}.bp-modal-close span[data-v-cd173103]{transform:rotate(45deg)}.bp-modal-close[data-v-cd173103]:before{transform:rotate(-45deg)}.bp-modal-close:hover span[data-v-cd173103],.bp-modal-close[data-v-cd173103]:hover:before{background:#fff}.bp-modal-actions[data-v-cd173103],.bp-select-list[data-v-cd173103]{display:grid;gap:8px}.bp-modal-actions[data-v-cd173103]{grid-template-columns:1fr 1fr;margin-top:16px}.bp-modal-actions button[data-v-cd173103],.bp-select-list button[data-v-cd173103]{min-height:57px;padding:9px 15px;border:1px solid #151719;border-radius:4px;background:#3a3f44;color:#f5f5f5;font-size:1.05rem;cursor:pointer}.bp-select-list button[data-v-cd173103]{display:flex;width:100%;align-items:center;gap:8px;justify-content:flex-start;padding:9px 15px}.bp-value-modal[data-v-cd173103]{display:grid;gap:12px;min-width:240px}.bp-value-input[data-v-cd173103]{width:100%;min-height:40px;box-sizing:border-box;padding:8px 10px;border:1px solid #151719;border-radius:4px;outline:none;background:#32383e;color:#fff;font:inherit}.bp-value-input[data-v-cd173103]:focus{border-color:#888;box-shadow:0 0 0 1px #888}.bp-pin-modal[data-v-cd173103]{display:grid;gap:14px;min-width:240px;padding-top:2px}.bp-pin-message[data-v-cd173103]{padding-right:18px;color:#f5f5f5;line-height:1.35}.bp-pin-dots[data-v-cd173103]{display:flex;justify-content:center;gap:10px;padding:4px 0 6px}.bp-pin-dots span[data-v-cd173103]{width:12px;height:12px;border-radius:50%;background:#50565d;box-shadow:inset 0 0 0 1px #181a1c}.bp-pin-dots span.bp-pin-dot-filled[data-v-cd173103]{background:#f0f36a;box-shadow:0 0 8px #f0f36a8c}.bp-pin-keypad[data-v-cd173103]{display:grid;grid-template-columns:repeat(3,52px);gap:8px;justify-content:center}.bp-pin-keypad button[data-v-cd173103]{width:52px;height:44px;border:1px solid #151719;border-radius:4px;background:#3a3f44;color:#f5f5f5;font:inherit;font-size:1.2rem;cursor:pointer}.bp-pin-keypad button[data-v-cd173103]:hover{background:#474d53}.bp-pin-keypad .bp-pin-key-blank[data-v-cd173103]{visibility:hidden;cursor:default}.bp-pin-keypad .bp-pin-backspace[data-v-cd173103]{font-family:Material Icons,sans-serif;font-size:1.35rem}.bp-fader-modal[data-v-cd173103]{--bp-fader-track-left: 52px;--bp-fader-track-top: 42px;--bp-fader-track-width: 48px;--bp-fader-track-height: 320px;position:relative;width:170px;height:428px;margin:0 auto}.bp-fader-modal input[data-v-cd173103]{position:absolute;top:calc(var(--bp-fader-track-top) + (var(--bp-fader-track-height) - var(--bp-fader-track-width)) / 2);left:calc(var(--bp-fader-track-left) - (var(--bp-fader-track-height) - var(--bp-fader-track-width)) / 2);width:var(--bp-fader-track-height);height:var(--bp-fader-track-width);border:1px solid #232628;background-color:var(--bp-fader-color);box-shadow:inset 0 0 0 1px #ffffff14;cursor:pointer;opacity:1;outline:none;touch-action:none;transform-origin:50% 50%;transform:rotate(270deg);appearance:none;-webkit-appearance:none;-moz-appearance:none}.bp-fader-modal input[data-v-cd173103]:hover,.bp-fader-modal input[data-v-cd173103]:active{opacity:1}.bp-fader-modal input[data-v-cd173103]::-webkit-slider-runnable-track{width:var(--bp-fader-track-height);height:var(--bp-fader-track-width);border:0;background:transparent}.bp-fader-modal input[data-v-cd173103]::-moz-range-track{width:var(--bp-fader-track-height);height:var(--bp-fader-track-width);border:0;background:transparent}.bp-fader-modal input[data-v-cd173103]::-webkit-slider-thumb{width:30px;height:60px;margin-top:-6px;border:0;border-radius:10px;background:#fff;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none}.bp-fader-modal input[data-v-cd173103]::-moz-range-thumb{width:30px;height:60px;border:0;border-radius:10px;background:#fff;cursor:pointer;-moz-appearance:none}.bp-fader-meta[data-v-cd173103]{position:absolute;top:374px;left:20px;display:flex;align-items:center;gap:6px}.bp-fader-value[data-v-cd173103]{position:absolute;top:190px;right:146px;font-size:1.2rem}.bp-fader-bounds[data-v-cd173103]{position:absolute;top:var(--bp-fader-track-top);left:136px;height:var(--bp-fader-track-height);display:flex;flex-direction:column;justify-content:space-between;color:#aaa}')),document.head.appendChild(t)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
import { mapState as C } from "vuex";
import { openBlock as l, createElementBlock as o, normalizeClass as x, createElementVNode as a, toDisplayString as c, normalizeStyle as f, mergeProps as F, Fragment as v, createCommentVNode as d, createBlock as A, Teleport as N, withModifiers as w, renderList as k, withDirectives as _, withKeys as V, vModelText as S } from "vue";
const W = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [u, r] of e)
    n[u] = r;
  return n;
}, D = [
  { value: "OFF", text: "Off", icon: "toggle_off", color: "#7f8790" },
  { value: "ON", text: "On", icon: "toggle_on", color: "#52D017" }
], O = [
  { range: [0, 100], text: "", icon: "", color: "#ccc" }
];
function I(t) {
  const e = String(t).trim();
  return e ? e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1) : e.startsWith("[") && e.endsWith("]") ? e.slice(1, -1).split(",").map((n) => I(n)) : /^-?\d+(\.\d+)?$/.test(e) ? Number(e) : e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : e : "";
}
function T(t, e) {
  const n = e.indexOf(":");
  if (n === -1)
    return;
  const u = e.slice(0, n).trim(), r = e.slice(n + 1).trim();
  u && (t[u] = I(r));
}
function L(t) {
  if (!t || typeof t != "string")
    return {};
  const e = String(t).split(/\r?\n/), n = {};
  let u = null, r = null;
  for (const i of e) {
    if (!i.trim() || i.trim().startsWith("#"))
      continue;
    const s = i.match(/^\s*/)[0].length, h = i.trim();
    s === 0 && h.endsWith(":") && ["values", "ranges", "attributes"].includes(h.slice(0, -1).trim()) ? (u = h.slice(0, -1).trim(), r = null, n[u] = u === "values" || u === "ranges" ? [] : {}) : s === 0 ? (u = null, r = null, T(n, h)) : u && Array.isArray(n[u]) && h.startsWith("- ") ? (r = {}, n[u].push(r), T(r, h.slice(2))) : u && Array.isArray(n[u]) && r ? T(r, h) : u && n[u] && typeof n[u] == "object" && T(n[u], h);
  }
  return n;
}
function g(t) {
  return t === null || typeof t > "u" ? "" : typeof t == "object" ? JSON.stringify(t) : String(t);
}
function M(t) {
  if (t === "" || t === null || typeof t > "u")
    return null;
  const e = Number(t);
  return Number.isFinite(e) ? e : null;
}
function P(t) {
  return t !== null && typeof t < "u" && String(t) !== "";
}
function p(t, e) {
  return Object.prototype.hasOwnProperty.call(t || {}, e);
}
function b(t, e) {
  return p(t, "text") ? g(t.text) : g(e);
}
function m(t, e, n) {
  return p(t, "icon") ? g(t.icon) || (n ? "" : e) : e;
}
function y(t) {
  const e = Number(t);
  return Number.isInteger(e) && e > 0 ? e : 0;
}
const R = {
  name: "UIButtonPanel",
  inject: ["$socket", "$dataTracker"],
  props: ["id", "props", "state"],
  data() {
    return {
      lastSeen: null,
      ticker: Date.now(),
      pending: !1,
      sending: !1,
      modal: null,
      confirmMessage: "",
      confirmCallback: null,
      pinMessage: null,
      pinWaits: !0,
      pinLength: 0,
      pinValue: "",
      pinDigits: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      faderValue: 0,
      editValue: "",
      dialogTimer: null,
      liveTimer: null,
      sendingTimer: null,
      lastLiveValue: null,
      latestMsg: {}
    };
  },
  computed: {
    ...C("data", ["messages"]),
    message() {
      var t;
      return {
        ...((t = this.messages) == null ? void 0 : t[this.id]) || {},
        ...this.latestMsg || {}
      };
    },
    config() {
      var e;
      const t = {
        ...this.props || {},
        ...((e = this.state) == null ? void 0 : e.config) || {}
      };
      return {
        ...t,
        ...L(t.config)
      };
    },
    widgetType() {
      return this.config.widgetType || "text";
    },
    title() {
      return this.config.label || "";
    },
    hasInput() {
      return !(this.widgetType === "button" || this.widgetType === "select" && this.buttonMode);
    },
    hasOutput() {
      return this.widgetType === "text" ? this.editable : this.widgetType === "fader" ? !this.gaugeMode : this.widgetType === "image" ? this.buttonMode : ["button", "switch", "select"].includes(this.widgetType);
    },
    shouldWaitForInput() {
      return this.hasInput && this.hasOutput ? this.config.waitForInput !== !1 && this.config.waitForInput !== "false" : !1;
    },
    isActive() {
      return !!this.modal;
    },
    disabled() {
      var t, e;
      return ((t = this.state) == null ? void 0 : t.enabled) === !1 || ((e = this.state) == null ? void 0 : e.visible) === !1 || this.hasInput && this.message.enabled === !1;
    },
    editable() {
      return this.config.editable === !0 || this.config.editable === "true";
    },
    gaugeMode() {
      return this.config.gauge === !0 || this.config.gauge === "true";
    },
    isActionable() {
      return this.widgetType === "text" ? this.editable : this.widgetType === "fader" ? !this.gaugeMode : this.widgetType === "image" ? this.buttonMode : ["button", "switch", "select"].includes(this.widgetType);
    },
    buttonMode() {
      return this.config.button === !0 || this.config.button === "true";
    },
    displayValue() {
      return this.widgetType === "text" ? g(this.message.payload ?? this.config.text) : g(this.message.payload);
    },
    textValue() {
      return this.displayValue;
    },
    textIcon() {
      return m(this.config, this.editable ? "keyboard" : "article", this.textValue);
    },
    hasValue() {
      const t = this.message.payload;
      return t !== null && typeof t < "u" && t !== "";
    },
    numericValue() {
      const t = Number(this.message.payload);
      return Number.isFinite(t) ? t : null;
    },
    min() {
      const t = M(this.config.min);
      return t !== null ? t : 0;
    },
    max() {
      const t = M(this.config.max);
      return t !== null ? t : 100;
    },
    percent() {
      if (!Number.isFinite(this.numericValue) || this.max === this.min)
        return 0;
      const t = Math.max(this.min, Math.min(this.max, this.numericValue));
      return Math.round((t - this.min) / (this.max - this.min) * 100);
    },
    meterStyle() {
      return {
        height: `${this.percent}%`,
        minHeight: this.percent > 0 ? "1px" : "0",
        backgroundColor: this.currentRange.color || "#ccc"
      };
    },
    configuredStates() {
      return (Array.isArray(this.config.values) ? this.config.values : D).map((t) => {
        const e = b(t, t.value), n = m(this.config, this.defaultStateIcon(t), e);
        return {
          value: t.value,
          valueText: g(t.value),
          text: e,
          icon: m(t, n, e),
          color: t.color || this.defaultStateColor(t),
          topic: p(t, "topic") ? t.topic : this.config.topic || "",
          confirm: p(t, "confirm") ? t.confirm : this.config.confirm || "",
          confirmPin: y(p(t, "confirm_pin") ? t.confirm_pin : this.config.confirm_pin),
          inputTimeout: p(t, "input_timeout") ? t.input_timeout : this.config.input_timeout
        };
      });
    },
    currentState() {
      if (this.widgetType === "select" && this.buttonMode) {
        const n = b(this.config, this.config.value || "Select");
        return {
          value: this.config.value,
          valueText: g(this.config.value),
          text: n,
          icon: m(this.config, "radio_button_checked", n),
          color: this.config.color || void 0
        };
      }
      const t = g(this.message.payload), e = b(this.config, "unknown");
      return this.configuredStates.find((n) => n.valueText === t) || {
        value: "",
        text: e,
        icon: m(this.config, "do_not_disturb", e),
        color: this.config.color || void 0
      };
    },
    isUnknown() {
      return ["lamp", "switch", "select"].includes(this.widgetType) ? this.widgetType === "select" && this.buttonMode ? !1 : this.currentState.valueText === "" || this.currentState.value === "" : this.widgetType === "text" ? !this.displayValue : ["image", "iframe", "fader"].includes(this.widgetType) ? !this.hasValue : !1;
    },
    isStateOn() {
      if (!["lamp", "switch", "select"].includes(this.widgetType))
        return !1;
      const t = `${this.currentState.valueText || g(this.currentState.value)} ${this.currentState.text}`.toLowerCase();
      return t.includes("true") || t.includes("on");
    },
    ranges() {
      return (Array.isArray(this.config.ranges) ? this.config.ranges : O).map((t) => {
        const e = b(t, p(this.config, "text") ? this.config.text : ""), n = m(this.config, "tune", e);
        return {
          range: t.range || [this.min, this.max],
          text: e,
          icon: m(t, n, e),
          color: t.color || "#ccc"
        };
      });
    },
    currentRange() {
      return this.rangeFor(this.numericValue);
    },
    faderRange() {
      return this.rangeFor(Number(this.faderValue));
    },
    faderTrackStyle() {
      const t = Number(this.faderValue), e = Number.isFinite(t) && this.max !== this.min ? Math.max(0, Math.min(100, (t - this.min) / (this.max - this.min) * 100)) : 0;
      return {
        "--bp-fader-color": this.faderRange.color || this.currentRange.color || "#ccc",
        "--bp-fader-percent": `${e}%`
      };
    },
    baseStyle() {
      return this.config.color ? { color: this.config.color } : {};
    },
    imageStyle() {
      const t = this.config.overflow;
      return ["hidden", "visible", "scroll", "auto"].includes(t) ? { overflow: t } : {};
    },
    iframeStyle() {
      var e;
      return { overflow: ((e = this.config.attributes) == null ? void 0 : e.overflow) || "auto" };
    },
    iframeAttributes() {
      const t = this.config.attributes && typeof this.config.attributes == "object" ? this.config.attributes : {}, e = ["src", "style", "class", "frameborder", "overflow"];
      return {
        scrolling: "auto",
        ...Object.fromEntries(
          Object.entries(t).filter(([u]) => !e.includes(String(u).toLowerCase())).map(([u, r]) => [u, g(r)])
        )
      };
    },
    stateStyle() {
      return this.widgetType === "fader" ? this.currentRange.color ? { color: this.currentRange.color } : {} : this.currentState.color || this.currentRange.color ? { color: this.currentState.color || this.currentRange.color } : {};
    },
    indicatorStyle() {
      const t = this.currentState.color || "#7f8790";
      return {
        "--bp-state-color": t,
        color: t,
        borderColor: t
      };
    },
    buttonText() {
      return b(this.config, this.config.value);
    },
    buttonIcon() {
      return m(this.config, "touch_app", this.buttonText);
    },
    lastUpdateText() {
      if (!this.lastSeen)
        return "-";
      const t = Math.max(0, Math.round((this.ticker - this.lastSeen) / 1e3));
      return t < 60 ? "0 minutes ago" : t < 3600 ? `${Math.round(t / 60)} minutes ago` : t < 86400 ? `${Math.round(t / 3600)} hours ago` : `${Math.round(t / 86400)} days ago`;
    }
  },
  watch: {
    message: {
      deep: !0,
      immediate: !0,
      handler(t) {
        t && Object.prototype.hasOwnProperty.call(t, "payload") && (this.lastSeen = Date.now(), this.sending = !1, this.pending = !1, this.widgetType === "fader" && Number.isFinite(this.numericValue) && (this.faderValue = this.numericValue));
      }
    }
  },
  created() {
    this.$dataTracker(this.id);
  },
  mounted() {
    this.ensureMaterialIcons(), this.handleIncomingMessage = (t) => {
      this.latestMsg = t || {};
    }, this.$socket.on(`msg-input:${this.id}`, this.handleIncomingMessage), this.$socket.on(`widget-load:${this.id}`, this.handleIncomingMessage), this.tickInterval = setInterval(() => {
      this.ticker = Date.now();
    }, 3e4), Number.isFinite(this.numericValue) ? this.faderValue = this.numericValue : this.faderValue = this.min;
  },
  unmounted() {
    this.$socket.off(`msg-input:${this.id}`, this.handleIncomingMessage), this.$socket.off(`widget-load:${this.id}`, this.handleIncomingMessage), clearInterval(this.tickInterval), clearTimeout(this.liveTimer), clearTimeout(this.sendingTimer), clearTimeout(this.dialogTimer);
  },
  methods: {
    ensureMaterialIcons() {
      const t = "buttonpanel-material-icons";
      if (document.getElementById(t))
        return;
      const e = document.createElement("link");
      e.id = t, e.rel = "stylesheet", e.href = "https://fonts.googleapis.com/icon?family=Material+Icons", document.head.appendChild(e);
    },
    rangeFor(t) {
      if (Number.isFinite(t)) {
        const n = this.ranges.find((u) => {
          var s, h;
          const r = Number((s = u.range) == null ? void 0 : s[0]), i = Number((h = u.range) == null ? void 0 : h[1]);
          return r <= t && t <= i;
        });
        if (n)
          return n;
      }
      const e = b(this.config, "unknown");
      return {
        text: e,
        icon: m(this.config, "do_not_disturb", e),
        color: this.config.color || void 0
      };
    },
    defaultStateIcon(t) {
      const e = `${t.text || ""} ${t.value || ""}`.toLowerCase();
      return e.includes("on") || e.includes("true") ? this.widgetType === "lamp" ? "emoji_objects" : "toggle_on" : e.includes("off") || e.includes("false") ? this.widgetType === "lamp" ? "emoji_objects" : "toggle_off" : this.widgetType === "select" ? "radio_button_unchecked" : "help_center";
    },
    defaultStateColor(t) {
      const e = `${t.text || ""} ${t.value || ""}`.toLowerCase();
      if (e.includes("on") || e.includes("true")) return this.widgetType === "lamp" ? "yellow" : "#52D017";
      if (e.includes("off") || e.includes("false")) return "#7f8790";
    },
    handleClick() {
      if (!(this.disabled || !this.isActionable || this.pending || this.sending))
        if (this.widgetType === "button")
          this.sendWithOptionalConfirm({
            payload: this.config.value,
            ...this.config.topic ? { topic: this.config.topic } : {}
          }, this.config.confirm, y(this.config.confirm_pin), this.config.input_timeout, !1);
        else if (this.widgetType === "image")
          this.sendWithOptionalConfirm({
            payload: this.config.value,
            ...this.config.topic ? { topic: this.config.topic } : {}
          }, this.config.confirm, y(this.config.confirm_pin), this.config.input_timeout, this.shouldWaitForInput);
        else if (this.widgetType === "text")
          this.editValue = this.hasValue ? this.displayValue : "", this.modal = "value", this.startDialogTimeout(this.config.input_timeout);
        else if (this.widgetType === "switch") {
          const t = this.configuredStates.findIndex((n) => n.valueText === this.currentState.valueText), e = this.configuredStates[(t + 1) % this.configuredStates.length];
          this.sendWithOptionalConfirm({
            payload: e.value,
            ...e.topic ? { topic: e.topic } : {}
          }, e.confirm, e.confirmPin, e.inputTimeout);
        } else this.widgetType === "select" ? (this.modal = "select", this.startDialogTimeout(this.config.input_timeout)) : this.widgetType === "fader" && (this.faderValue = Number.isFinite(this.numericValue) ? this.numericValue : this.min, this.modal = "fader", this.startDialogTimeout(this.config.input_timeout));
    },
    sendSelection(t) {
      this.closeModal(!1), this.sendWithOptionalConfirm({
        payload: t.value,
        ...t.topic ? { topic: t.topic } : {}
      }, t.confirm, t.confirmPin, t.inputTimeout, this.shouldWaitForInput);
    },
    sendWithOptionalConfirm(t, e, n = 0, u = this.config.input_timeout, r = this.shouldWaitForInput) {
      if (n > 0) {
        this.pinMessage = t, this.pinWaits = r, this.pinLength = n, this.pinValue = "", this.confirmMessage = e || "", this.confirmCallback = null, this.modal = "pin", this.startDialogTimeout(u);
        return;
      }
      e ? (this.confirmMessage = e, this.confirmCallback = () => this.emitAction(t, r), this.modal = "confirm", this.startDialogTimeout(u)) : this.emitAction(t, r);
    },
    appendPinDigit(t) {
      if (!(this.pinValue.length >= this.pinLength) && (this.pinValue += String(t), this.resetInputTimeout(), this.pinValue.length >= this.pinLength)) {
        const e = this.pinMessage, n = this.pinValue;
        this.closeModal(!1), e && this.emitAction({
          ...e,
          pin: n
        }, this.pinWaits);
      }
    },
    removePinDigit() {
      this.pinValue && (this.pinValue = this.pinValue.slice(0, -1), this.resetInputTimeout());
    },
    confirmProceed() {
      const t = this.confirmCallback;
      this.closeModal(!1), t && t();
    },
    emitAction(t, e = this.shouldWaitForInput) {
      clearTimeout(this.sendingTimer), this.sending = !0, this.pending = !1;
      const n = { ...t };
      P(n.topic) ? n._buttonpanel_topic = n.topic : delete n.topic, this.$socket.emit("widget-action", this.id, n), this.sendingTimer = setTimeout(() => {
        this.sending = !1, this.pending = e;
      }, 250);
    },
    commitValue() {
      this.closeModal(!1), this.sendWithOptionalConfirm(
        {
          payload: this.editValue,
          ...this.config.topic ? { topic: this.config.topic } : {}
        },
        this.config.confirm,
        y(this.config.confirm_pin)
      );
    },
    timeoutSeconds(t) {
      const e = Number(t);
      return Number.isFinite(e) && e > 0 ? e : 0;
    },
    startDialogTimeout(t) {
      clearTimeout(this.dialogTimer);
      const e = this.timeoutSeconds(t);
      e && (this.dialogTimer = setTimeout(() => {
        this.closeModal(!1);
      }, e * 1e3));
    },
    resetInputTimeout() {
      this.startDialogTimeout(this.config.input_timeout);
    },
    closeModal() {
      clearTimeout(this.dialogTimer), this.dialogTimer = null, this.modal = null, this.confirmCallback = null, this.confirmMessage = "", this.pinMessage = null, this.pinWaits = !0, this.pinLength = 0, this.pinValue = "";
    },
    handleFaderInput() {
      this.resetInputTimeout(), !(this.config.live !== !0 && this.config.live !== "true") && (this.lastLiveValue = this.faderValue, !this.liveTimer && (this.liveTimer = setTimeout(() => {
        this.emitAction({
          payload: this.lastLiveValue,
          ...this.config.topic ? { topic: this.config.topic } : {}
        }), this.liveTimer = null;
      }, 200)));
    },
    commitFader() {
      this.closeModal(!1), this.lastLiveValue !== this.faderValue && this.sendWithOptionalConfirm(
        {
          payload: this.faderValue,
          ...this.config.topic ? { topic: this.config.topic } : {}
        },
        this.config.confirm,
        y(this.config.confirm_pin)
      ), this.lastLiveValue = null;
    }
  }
}, j = { class: "bp-title" }, U = ["src", "alt"], E = {
  key: 1,
  class: "bp-unknown"
}, B = ["src"], K = { class: "bp-main bp-gauge-body" }, z = { class: "bp-number" }, Y = { class: "bp-meter" }, q = {
  key: 3,
  class: "bp-main bp-state-body"
}, G = { class: "bp-icon material-icons" }, H = {
  key: 0,
  class: "bp-button-icon material-icons"
}, J = {
  key: 1,
  class: "bp-button-text"
}, Q = {
  key: 0,
  class: "bp-text-quote material-icons"
}, X = {
  key: 1,
  class: "bp-text-value"
}, Z = { class: "bp-last-update" }, $ = {
  key: 6,
  class: "bp-status-overlay"
}, tt = { class: "bp-modal-title" }, et = {
  key: 0,
  class: "bp-confirm"
}, it = { class: "bp-modal-actions" }, nt = {
  key: 1,
  class: "bp-pin-modal"
}, st = {
  key: 0,
  class: "bp-pin-message"
}, rt = { class: "bp-pin-dots" }, lt = { class: "bp-pin-keypad" }, at = ["onClick"], ot = {
  key: 2,
  class: "bp-select-list"
}, ut = ["onClick"], ct = {
  key: 0,
  class: "bp-icon material-icons"
}, dt = { key: 1 }, ht = {
  key: 3,
  class: "bp-value-modal"
}, ft = { class: "bp-modal-actions" }, gt = {
  key: 4,
  class: "bp-fader-modal"
}, mt = { class: "bp-icon material-icons" }, pt = { class: "bp-fader-value" }, bt = ["min", "max"], yt = { class: "bp-fader-bounds" };
function vt(t, e, n, u, r, i) {
  return l(), o("div", {
    class: x(["bp-widget", [
      `bp-${i.widgetType}`,
      {
        "bp-clickable": i.isActionable,
        "bp-disabled": i.disabled,
        "bp-active": i.isActive,
        "bp-sending": r.sending,
        "bp-pending": r.pending,
        "bp-unknown-state": i.isUnknown,
        "bp-state-on": i.isStateOn
      }
    ]]),
    onClick: e[16] || (e[16] = (...s) => i.handleClick && i.handleClick(...s))
  }, [
    a("div", j, c(i.title), 1),
    i.widgetType === "image" ? (l(), o("div", {
      key: 0,
      class: "bp-image",
      style: f(i.imageStyle)
    }, [
      i.displayValue ? (l(), o("img", {
        key: 0,
        src: i.displayValue,
        alt: i.title
      }, null, 8, U)) : (l(), o("div", E, "unknown"))
    ], 4)) : i.widgetType === "iframe" ? (l(), o("iframe", F({
      key: 1,
      class: "bp-iframe",
      src: i.displayValue,
      style: i.iframeStyle
    }, i.iframeAttributes, { frameborder: "0" }), null, 16, B)) : i.widgetType === "fader" ? (l(), o(v, { key: 2 }, [
      a("div", K, [
        i.currentRange.icon ? (l(), o("span", {
          key: 0,
          class: "bp-icon material-icons",
          style: f(i.stateStyle)
        }, c(i.currentRange.icon), 5)) : d("", !0),
        i.currentRange.text ? (l(), o("span", {
          key: 1,
          class: "bp-text bp-gauge-label",
          style: f(i.stateStyle)
        }, c(i.currentRange.text), 5)) : d("", !0),
        a("span", z, c(i.hasValue ? i.numericValue : "?"), 1)
      ]),
      a("div", Y, [
        a("span", {
          style: f(i.meterStyle)
        }, null, 4)
      ])
    ], 64)) : i.widgetType === "lamp" || i.widgetType === "switch" || i.widgetType === "select" ? (l(), o("div", q, [
      i.currentState.icon ? (l(), o("span", {
        key: 0,
        class: "bp-state-indicator",
        style: f(i.indicatorStyle)
      }, [
        a("span", G, c(i.currentState.icon), 1)
      ], 4)) : d("", !0),
      i.currentState.text ? (l(), o("span", {
        key: 1,
        class: "bp-text bp-state-text",
        style: f(i.stateStyle)
      }, c(i.currentState.text), 5)) : d("", !0)
    ])) : i.widgetType === "button" ? (l(), o("div", {
      key: 4,
      class: "bp-main bp-button-body",
      style: f(i.baseStyle)
    }, [
      i.buttonIcon ? (l(), o("span", H, c(i.buttonIcon), 1)) : d("", !0),
      i.buttonText ? (l(), o("span", J, c(i.buttonText), 1)) : d("", !0)
    ], 4)) : (l(), o("div", {
      key: 5,
      class: "bp-text-body",
      style: f(i.baseStyle)
    }, [
      i.textIcon ? (l(), o("span", Q, c(i.textIcon), 1)) : d("", !0),
      i.textValue ? (l(), o("span", X, c(i.textValue), 1)) : d("", !0)
    ], 4)),
    a("div", Z, c(i.lastUpdateText), 1),
    r.sending || r.pending ? (l(), o("div", $, [
      e[17] || (e[17] = a("span", { class: "bp-spinner" }, null, -1)),
      a("span", null, c(r.sending ? "sending" : "waiting"), 1)
    ])) : d("", !0),
    (l(), A(N, { to: "body" }, [
      r.modal ? (l(), o("div", {
        key: 0,
        class: "bp-modal-backdrop",
        onClick: e[15] || (e[15] = w((s) => i.closeModal(!1), ["stop"]))
      }, [
        a("div", {
          class: "bp-modal",
          onClick: e[14] || (e[14] = w(() => {
          }, ["stop"]))
        }, [
          a("button", {
            class: "bp-modal-close",
            type: "button",
            "aria-label": "Close",
            onClick: e[0] || (e[0] = (s) => i.closeModal(!1))
          }, [...e[18] || (e[18] = [
            a("span", { "aria-hidden": "true" }, null, -1)
          ])]),
          a("div", tt, c(i.title), 1),
          r.modal === "confirm" ? (l(), o("div", et, [
            a("div", null, c(r.confirmMessage), 1),
            a("div", it, [
              a("button", {
                onClick: e[1] || (e[1] = (...s) => i.confirmProceed && i.confirmProceed(...s))
              }, "OK"),
              a("button", {
                onClick: e[2] || (e[2] = (s) => i.closeModal(!1))
              }, "Cancel")
            ])
          ])) : r.modal === "pin" ? (l(), o("div", nt, [
            r.confirmMessage ? (l(), o("div", st, c(r.confirmMessage), 1)) : d("", !0),
            a("div", rt, [
              (l(!0), o(v, null, k(r.pinLength, (s) => (l(), o("span", {
                key: s,
                class: x({ "bp-pin-dot-filled": s <= r.pinValue.length })
              }, null, 2))), 128))
            ]),
            a("div", lt, [
              (l(!0), o(v, null, k(r.pinDigits, (s) => (l(), o("button", {
                key: s,
                type: "button",
                onClick: (h) => i.appendPinDigit(s)
              }, c(s), 9, at))), 128)),
              e[19] || (e[19] = a("button", {
                class: "bp-pin-key-blank",
                type: "button",
                disabled: ""
              }, null, -1)),
              a("button", {
                type: "button",
                onClick: e[3] || (e[3] = (s) => i.appendPinDigit("0"))
              }, "0"),
              a("button", {
                class: "bp-pin-backspace material-icons",
                type: "button",
                "aria-label": "Backspace",
                onClick: e[4] || (e[4] = (...s) => i.removePinDigit && i.removePinDigit(...s))
              }, "backspace")
            ])
          ])) : r.modal === "select" ? (l(), o("div", ot, [
            (l(!0), o(v, null, k(i.configuredStates, (s) => (l(), o("button", {
              key: s.value,
              style: f({ color: s.color || void 0 }),
              onClick: (h) => i.sendSelection(s)
            }, [
              s.icon ? (l(), o("span", ct, c(s.icon), 1)) : d("", !0),
              s.text ? (l(), o("span", dt, c(s.text), 1)) : d("", !0)
            ], 12, ut))), 128))
          ])) : r.modal === "value" ? (l(), o("div", ht, [
            _(a("input", {
              "onUpdate:modelValue": e[5] || (e[5] = (s) => r.editValue = s),
              class: "bp-value-input",
              type: "text",
              onInput: e[6] || (e[6] = (...s) => i.resetInputTimeout && i.resetInputTimeout(...s)),
              onKeydown: [
                e[7] || (e[7] = V((...s) => i.commitValue && i.commitValue(...s), ["enter"])),
                e[8] || (e[8] = V((s) => i.closeModal(!1), ["esc"]))
              ]
            }, null, 544), [
              [S, r.editValue]
            ]),
            a("div", ft, [
              a("button", {
                onClick: e[9] || (e[9] = (...s) => i.commitValue && i.commitValue(...s))
              }, "OK"),
              a("button", {
                onClick: e[10] || (e[10] = (s) => i.closeModal(!1))
              }, "Cancel")
            ])
          ])) : r.modal === "fader" ? (l(), o("div", gt, [
            a("div", {
              class: "bp-fader-meta",
              style: f({ color: i.faderRange.color || void 0 })
            }, [
              a("span", mt, c(i.faderRange.icon), 1),
              a("span", null, c(i.faderRange.text), 1)
            ], 4),
            a("div", pt, c(r.faderValue), 1),
            _(a("input", {
              "onUpdate:modelValue": e[11] || (e[11] = (s) => r.faderValue = s),
              type: "range",
              style: f(i.faderTrackStyle),
              min: i.min,
              max: i.max,
              onInput: e[12] || (e[12] = (...s) => i.handleFaderInput && i.handleFaderInput(...s)),
              onChange: e[13] || (e[13] = (...s) => i.commitFader && i.commitFader(...s))
            }, null, 44, bt), [
              [
                S,
                r.faderValue,
                void 0,
                { number: !0 }
              ]
            ]),
            a("div", yt, [
              a("span", null, c(i.max), 1),
              a("span", null, c(i.min), 1)
            ])
          ])) : d("", !0)
        ])
      ])) : d("", !0)
    ]))
  ], 2);
}
const xt = /* @__PURE__ */ W(R, [["render", vt], ["__scopeId", "data-v-cd173103"]]);
export {
  xt as UIButtonPanel
};
