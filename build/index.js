import { createContext, useContext } from 'react';
import { I18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { jsx } from 'react/jsx-runtime';
import Logger from 'js-logger';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/moo/moo.js
var require_moo = __commonJS({
  "node_modules/moo/moo.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.moo = factory();
      }
    })(exports, function() {
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var toString = Object.prototype.toString;
      var hasSticky = typeof new RegExp().sticky === "boolean";
      function isRegExp(o) {
        return o && toString.call(o) === "[object RegExp]";
      }
      __name(isRegExp, "isRegExp");
      function isObject(o) {
        return o && typeof o === "object" && !isRegExp(o) && !Array.isArray(o);
      }
      __name(isObject, "isObject");
      function reEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      __name(reEscape, "reEscape");
      function reGroups(s) {
        var re = new RegExp("|" + s);
        return re.exec("").length - 1;
      }
      __name(reGroups, "reGroups");
      function reCapture(s) {
        return "(" + s + ")";
      }
      __name(reCapture, "reCapture");
      function reUnion(regexps) {
        if (!regexps.length) return "(?!)";
        var source = regexps.map(function(s) {
          return "(?:" + s + ")";
        }).join("|");
        return "(?:" + source + ")";
      }
      __name(reUnion, "reUnion");
      function regexpOrLiteral(obj) {
        if (typeof obj === "string") {
          return "(?:" + reEscape(obj) + ")";
        } else if (isRegExp(obj)) {
          if (obj.ignoreCase) throw new Error("RegExp /i flag not allowed");
          if (obj.global) throw new Error("RegExp /g flag is implied");
          if (obj.sticky) throw new Error("RegExp /y flag is implied");
          if (obj.multiline) throw new Error("RegExp /m flag is implied");
          return obj.source;
        } else {
          throw new Error("Not a pattern: " + obj);
        }
      }
      __name(regexpOrLiteral, "regexpOrLiteral");
      function pad(s, length) {
        if (s.length > length) {
          return s;
        }
        return Array(length - s.length + 1).join(" ") + s;
      }
      __name(pad, "pad");
      function lastNLines(string, numLines) {
        var position = string.length;
        var lineBreaks = 0;
        while (true) {
          var idx = string.lastIndexOf("\n", position - 1);
          if (idx === -1) {
            break;
          } else {
            lineBreaks++;
          }
          position = idx;
          if (lineBreaks === numLines) {
            break;
          }
          if (position === 0) {
            break;
          }
        }
        var startPosition = lineBreaks < numLines ? 0 : position + 1;
        return string.substring(startPosition).split("\n");
      }
      __name(lastNLines, "lastNLines");
      function objectToRules(object) {
        var keys = Object.getOwnPropertyNames(object);
        var result = [];
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var thing = object[key];
          var rules = [].concat(thing);
          if (key === "include") {
            for (var j = 0; j < rules.length; j++) {
              result.push({ include: rules[j] });
            }
            continue;
          }
          var match = [];
          rules.forEach(function(rule) {
            if (isObject(rule)) {
              if (match.length) result.push(ruleOptions(key, match));
              result.push(ruleOptions(key, rule));
              match = [];
            } else {
              match.push(rule);
            }
          });
          if (match.length) result.push(ruleOptions(key, match));
        }
        return result;
      }
      __name(objectToRules, "objectToRules");
      function arrayToRules(array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
          var obj = array[i];
          if (obj.include) {
            var include = [].concat(obj.include);
            for (var j = 0; j < include.length; j++) {
              result.push({ include: include[j] });
            }
            continue;
          }
          if (!obj.type) {
            throw new Error("Rule has no type: " + JSON.stringify(obj));
          }
          result.push(ruleOptions(obj.type, obj));
        }
        return result;
      }
      __name(arrayToRules, "arrayToRules");
      function ruleOptions(type, obj) {
        if (!isObject(obj)) {
          obj = { match: obj };
        }
        if (obj.include) {
          throw new Error("Matching rules cannot also include states");
        }
        var options = {
          defaultType: type,
          lineBreaks: !!obj.error || !!obj.fallback,
          pop: false,
          next: null,
          push: null,
          error: false,
          fallback: false,
          value: null,
          type: null,
          shouldThrow: false
        };
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            options[key] = obj[key];
          }
        }
        if (typeof options.type === "string" && type !== options.type) {
          throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')");
        }
        var match = options.match;
        options.match = Array.isArray(match) ? match : match ? [match] : [];
        options.match.sort(function(a, b) {
          return isRegExp(a) && isRegExp(b) ? 0 : isRegExp(b) ? -1 : isRegExp(a) ? 1 : b.length - a.length;
        });
        return options;
      }
      __name(ruleOptions, "ruleOptions");
      function toRules(spec) {
        return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec);
      }
      __name(toRules, "toRules");
      var defaultErrorRule = ruleOptions("error", { lineBreaks: true, shouldThrow: true });
      function compileRules(rules, hasStates) {
        var errorRule = null;
        var fast = /* @__PURE__ */ Object.create(null);
        var fastAllowed = true;
        var unicodeFlag = null;
        var groups = [];
        var parts = [];
        for (var i = 0; i < rules.length; i++) {
          if (rules[i].fallback) {
            fastAllowed = false;
          }
        }
        for (var i = 0; i < rules.length; i++) {
          var options = rules[i];
          if (options.include) {
            throw new Error("Inheritance is not allowed in stateless lexers");
          }
          if (options.error || options.fallback) {
            if (errorRule) {
              if (!options.fallback === !errorRule.fallback) {
                throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')");
              } else {
                throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')");
              }
            }
            errorRule = options;
          }
          var match = options.match.slice();
          if (fastAllowed) {
            while (match.length && typeof match[0] === "string" && match[0].length === 1) {
              var word = match.shift();
              fast[word.charCodeAt(0)] = options;
            }
          }
          if (options.pop || options.push || options.next) {
            if (!hasStates) {
              throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')");
            }
            if (options.fallback) {
              throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')");
            }
          }
          if (match.length === 0) {
            continue;
          }
          fastAllowed = false;
          groups.push(options);
          for (var j = 0; j < match.length; j++) {
            var obj = match[j];
            if (!isRegExp(obj)) {
              continue;
            }
            if (unicodeFlag === null) {
              unicodeFlag = obj.unicode;
            } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
              throw new Error("If one rule is /u then all must be");
            }
          }
          var pat = reUnion(match.map(regexpOrLiteral));
          var regexp = new RegExp(pat);
          if (regexp.test("")) {
            throw new Error("RegExp matches empty string: " + regexp);
          }
          var groupCount = reGroups(pat);
          if (groupCount > 0) {
            throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: \u2026 ) instead");
          }
          if (!options.lineBreaks && regexp.test("\n")) {
            throw new Error("Rule should declare lineBreaks: " + regexp);
          }
          parts.push(reCapture(pat));
        }
        var fallbackRule = errorRule && errorRule.fallback;
        var flags = hasSticky && !fallbackRule ? "ym" : "gm";
        var suffix = hasSticky || fallbackRule ? "" : "|";
        if (unicodeFlag === true) flags += "u";
        var combined = new RegExp(reUnion(parts) + suffix, flags);
        return { regexp: combined, groups, fast, error: errorRule || defaultErrorRule };
      }
      __name(compileRules, "compileRules");
      function compile(rules) {
        var result = compileRules(toRules(rules));
        return new Lexer({ start: result }, "start");
      }
      __name(compile, "compile");
      function checkStateGroup(g, name, map) {
        var state = g && (g.push || g.next);
        if (state && !map[state]) {
          throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')");
        }
        if (g && g.pop && +g.pop !== 1) {
          throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')");
        }
      }
      __name(checkStateGroup, "checkStateGroup");
      function compileStates(states, start) {
        var all = states.$all ? toRules(states.$all) : [];
        delete states.$all;
        var keys = Object.getOwnPropertyNames(states);
        if (!start) start = keys[0];
        var ruleMap = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          ruleMap[key] = toRules(states[key]).concat(all);
        }
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var rules = ruleMap[key];
          var included = /* @__PURE__ */ Object.create(null);
          for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (!rule.include) continue;
            var splice = [j, 1];
            if (rule.include !== key && !included[rule.include]) {
              included[rule.include] = true;
              var newRules = ruleMap[rule.include];
              if (!newRules) {
                throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')");
              }
              for (var k = 0; k < newRules.length; k++) {
                var newRule = newRules[k];
                if (rules.indexOf(newRule) !== -1) continue;
                splice.push(newRule);
              }
            }
            rules.splice.apply(rules, splice);
            j--;
          }
        }
        var map = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          map[key] = compileRules(ruleMap[key], true);
        }
        for (var i = 0; i < keys.length; i++) {
          var name = keys[i];
          var state = map[name];
          var groups = state.groups;
          for (var j = 0; j < groups.length; j++) {
            checkStateGroup(groups[j], name, map);
          }
          var fastKeys = Object.getOwnPropertyNames(state.fast);
          for (var j = 0; j < fastKeys.length; j++) {
            checkStateGroup(state.fast[fastKeys[j]], name, map);
          }
        }
        return new Lexer(map, start);
      }
      __name(compileStates, "compileStates");
      function keywordTransform(map) {
        var isMap = typeof Map !== "undefined";
        var reverseMap = isMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
        var types = Object.getOwnPropertyNames(map);
        for (var i = 0; i < types.length; i++) {
          var tokenType = types[i];
          var item = map[tokenType];
          var keywordList = Array.isArray(item) ? item : [item];
          keywordList.forEach(function(keyword) {
            if (typeof keyword !== "string") {
              throw new Error("keyword must be string (in keyword '" + tokenType + "')");
            }
            if (isMap) {
              reverseMap.set(keyword, tokenType);
            } else {
              reverseMap[keyword] = tokenType;
            }
          });
        }
        return function(k) {
          return isMap ? reverseMap.get(k) : reverseMap[k];
        };
      }
      __name(keywordTransform, "keywordTransform");
      var Lexer = /* @__PURE__ */ __name(function(states, state) {
        this.startState = state;
        this.states = states;
        this.buffer = "";
        this.stack = [];
        this.reset();
      }, "Lexer");
      Lexer.prototype.reset = function(data, info) {
        this.buffer = data || "";
        this.index = 0;
        this.line = info ? info.line : 1;
        this.col = info ? info.col : 1;
        this.queuedToken = info ? info.queuedToken : null;
        this.queuedText = info ? info.queuedText : "";
        this.queuedThrow = info ? info.queuedThrow : null;
        this.setState(info ? info.state : this.startState);
        this.stack = info && info.stack ? info.stack.slice() : [];
        return this;
      };
      Lexer.prototype.save = function() {
        return {
          line: this.line,
          col: this.col,
          state: this.state,
          stack: this.stack.slice(),
          queuedToken: this.queuedToken,
          queuedText: this.queuedText,
          queuedThrow: this.queuedThrow
        };
      };
      Lexer.prototype.setState = function(state) {
        if (!state || this.state === state) return;
        this.state = state;
        var info = this.states[state];
        this.groups = info.groups;
        this.error = info.error;
        this.re = info.regexp;
        this.fast = info.fast;
      };
      Lexer.prototype.popState = function() {
        this.setState(this.stack.pop());
      };
      Lexer.prototype.pushState = function(state) {
        this.stack.push(this.state);
        this.setState(state);
      };
      var eat = hasSticky ? function(re, buffer) {
        return re.exec(buffer);
      } : function(re, buffer) {
        var match = re.exec(buffer);
        if (match[0].length === 0) {
          return null;
        }
        return match;
      };
      Lexer.prototype._getGroup = function(match) {
        var groupCount = this.groups.length;
        for (var i = 0; i < groupCount; i++) {
          if (match[i + 1] !== void 0) {
            return this.groups[i];
          }
        }
        throw new Error("Cannot find token type for matched text");
      };
      function tokenToString() {
        return this.value;
      }
      __name(tokenToString, "tokenToString");
      Lexer.prototype.next = function() {
        var index = this.index;
        if (this.queuedGroup) {
          var token = this._token(this.queuedGroup, this.queuedText, index);
          this.queuedGroup = null;
          this.queuedText = "";
          return token;
        }
        var buffer = this.buffer;
        if (index === buffer.length) {
          return;
        }
        var group = this.fast[buffer.charCodeAt(index)];
        if (group) {
          return this._token(group, buffer.charAt(index), index);
        }
        var re = this.re;
        re.lastIndex = index;
        var match = eat(re, buffer);
        var error = this.error;
        if (match == null) {
          return this._token(error, buffer.slice(index, buffer.length), index);
        }
        var group = this._getGroup(match);
        var text = match[0];
        if (error.fallback && match.index !== index) {
          this.queuedGroup = group;
          this.queuedText = text;
          return this._token(error, buffer.slice(index, match.index), index);
        }
        return this._token(group, text, index);
      };
      Lexer.prototype._token = function(group, text, offset) {
        var lineBreaks = 0;
        if (group.lineBreaks) {
          var matchNL = /\n/g;
          var nl = 1;
          if (text === "\n") {
            lineBreaks = 1;
          } else {
            while (matchNL.exec(text)) {
              lineBreaks++;
              nl = matchNL.lastIndex;
            }
          }
        }
        var token = {
          type: typeof group.type === "function" && group.type(text) || group.defaultType,
          value: typeof group.value === "function" ? group.value(text) : text,
          text,
          toString: tokenToString,
          offset,
          lineBreaks,
          line: this.line,
          col: this.col
        };
        var size = text.length;
        this.index += size;
        this.line += lineBreaks;
        if (lineBreaks !== 0) {
          this.col = size - nl + 1;
        } else {
          this.col += size;
        }
        if (group.shouldThrow) {
          var err = new Error(this.formatError(token, "invalid syntax"));
          throw err;
        }
        if (group.pop) this.popState();
        else if (group.push) this.pushState(group.push);
        else if (group.next) this.setState(group.next);
        return token;
      };
      if (typeof Symbol !== "undefined" && Symbol.iterator) {
        var LexerIterator = /* @__PURE__ */ __name(function(lexer) {
          this.lexer = lexer;
        }, "LexerIterator");
        LexerIterator.prototype.next = function() {
          var token = this.lexer.next();
          return { value: token, done: !token };
        };
        LexerIterator.prototype[Symbol.iterator] = function() {
          return this;
        };
        Lexer.prototype[Symbol.iterator] = function() {
          return new LexerIterator(this);
        };
      }
      Lexer.prototype.formatError = function(token, message) {
        if (token == null) {
          var text = this.buffer.slice(this.index);
          var token = {
            text,
            offset: this.index,
            lineBreaks: text.indexOf("\n") === -1 ? 0 : 1,
            line: this.line,
            col: this.col
          };
        }
        var numLinesAround = 2;
        var firstDisplayedLine = Math.max(token.line - numLinesAround, 1);
        var lastDisplayedLine = token.line + numLinesAround;
        var lastLineDigits = String(lastDisplayedLine).length;
        var displayedLines = lastNLines(
          this.buffer,
          this.line - token.line + numLinesAround + 1
        ).slice(0, 5);
        var errorLines = [];
        errorLines.push(message + " at line " + token.line + " col " + token.col + ":");
        errorLines.push("");
        for (var i = 0; i < displayedLines.length; i++) {
          var line = displayedLines[i];
          var lineNo = firstDisplayedLine + i;
          errorLines.push(pad(String(lineNo), lastLineDigits) + "  " + line);
          if (lineNo === token.line) {
            errorLines.push(pad("", lastLineDigits + token.col + 1) + "^");
          }
        }
        return errorLines.join("\n");
      };
      Lexer.prototype.clone = function() {
        return new Lexer(this.states, this.state);
      };
      Lexer.prototype.has = function(tokenType) {
        return true;
      };
      return {
        compile,
        states: compileStates,
        error: Object.freeze({ error: true }),
        fallback: Object.freeze({ fallback: true }),
        keywords: keywordTransform
      };
    });
  }
});

// node_modules/@messageformat/parser/lib/lexer.js
var require_lexer = __commonJS({
  "node_modules/@messageformat/parser/lib/lexer.js"(exports) {
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.lexer = exports.states = void 0;
    var moo_1 = __importDefault(require_moo());
    exports.states = {
      body: {
        doubleapos: { match: "''", value: /* @__PURE__ */ __name(() => "'", "value") },
        quoted: {
          lineBreaks: true,
          match: /'[{}#](?:[^]*?[^'])?'(?!')/u,
          value: /* @__PURE__ */ __name((src) => src.slice(1, -1).replace(/''/g, "'"), "value")
        },
        argument: {
          lineBreaks: true,
          match: /\{\s*[^\p{Pat_Syn}\p{Pat_WS}]+\s*/u,
          push: "arg",
          value: /* @__PURE__ */ __name((src) => src.substring(1).trim(), "value")
        },
        octothorpe: "#",
        end: { match: "}", pop: 1 },
        content: { lineBreaks: true, match: /[^][^{}#']*/u }
      },
      arg: {
        select: {
          lineBreaks: true,
          match: /,\s*(?:plural|select|selectordinal)\s*,\s*/u,
          next: "select",
          value: /* @__PURE__ */ __name((src) => src.split(",")[1].trim(), "value")
        },
        "func-args": {
          lineBreaks: true,
          match: /,\s*[^\p{Pat_Syn}\p{Pat_WS}]+\s*,/u,
          next: "body",
          value: /* @__PURE__ */ __name((src) => src.split(",")[1].trim(), "value")
        },
        "func-simple": {
          lineBreaks: true,
          match: /,\s*[^\p{Pat_Syn}\p{Pat_WS}]+\s*/u,
          value: /* @__PURE__ */ __name((src) => src.substring(1).trim(), "value")
        },
        end: { match: "}", pop: 1 }
      },
      select: {
        offset: {
          lineBreaks: true,
          match: /\s*offset\s*:\s*\d+\s*/u,
          value: /* @__PURE__ */ __name((src) => src.split(":")[1].trim(), "value")
        },
        case: {
          lineBreaks: true,
          match: /\s*(?:=\d+|[^\p{Pat_Syn}\p{Pat_WS}]+)\s*\{/u,
          push: "body",
          value: /* @__PURE__ */ __name((src) => src.substring(0, src.indexOf("{")).trim(), "value")
        },
        end: { match: /\s*\}/u, pop: 1 }
      }
    };
    exports.lexer = moo_1.default.states(exports.states);
  }
});

// node_modules/@messageformat/parser/lib/parser.js
var require_parser = __commonJS({
  "node_modules/@messageformat/parser/lib/parser.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = exports.ParseError = void 0;
    var lexer_js_1 = require_lexer();
    var getContext = /* @__PURE__ */ __name((lt) => ({
      offset: lt.offset,
      line: lt.line,
      col: lt.col,
      text: lt.text,
      lineBreaks: lt.lineBreaks
    }), "getContext");
    var isSelectType = /* @__PURE__ */ __name((type) => type === "plural" || type === "select" || type === "selectordinal", "isSelectType");
    function strictArgStyleParam(lt, param) {
      let value = "";
      let text = "";
      for (const p of param) {
        const pText = p.ctx.text;
        text += pText;
        switch (p.type) {
          case "content":
            value += p.value;
            break;
          case "argument":
          case "function":
          case "octothorpe":
            value += pText;
            break;
          default:
            throw new ParseError(lt, `Unsupported part in strict mode function arg style: ${pText}`);
        }
      }
      const c = {
        type: "content",
        value: value.trim(),
        ctx: Object.assign({}, param[0].ctx, { text })
      };
      return [c];
    }
    __name(strictArgStyleParam, "strictArgStyleParam");
    var strictArgTypes = [
      "number",
      "date",
      "time",
      "spellout",
      "ordinal",
      "duration"
    ];
    var defaultPluralKeys = ["zero", "one", "two", "few", "many", "other"];
    var _ParseError = class _ParseError extends Error {
      /** @internal */
      constructor(lt, msg) {
        super(lexer_js_1.lexer.formatError(lt, msg));
      }
    };
    __name(_ParseError, "ParseError");
    var ParseError = _ParseError;
    exports.ParseError = ParseError;
    var _Parser = class _Parser {
      constructor(src, opt) {
        var _a, _b, _c, _d;
        this.lexer = lexer_js_1.lexer.reset(src);
        this.cardinalKeys = (_a = opt === null || opt === void 0 ? void 0 : opt.cardinal) !== null && _a !== void 0 ? _a : defaultPluralKeys;
        this.ordinalKeys = (_b = opt === null || opt === void 0 ? void 0 : opt.ordinal) !== null && _b !== void 0 ? _b : defaultPluralKeys;
        this.strict = (_c = opt === null || opt === void 0 ? void 0 : opt.strict) !== null && _c !== void 0 ? _c : false;
        this.strictPluralKeys = (_d = opt === null || opt === void 0 ? void 0 : opt.strictPluralKeys) !== null && _d !== void 0 ? _d : true;
      }
      parse() {
        return this.parseBody(false, true);
      }
      checkSelectKey(lt, type, key) {
        if (key[0] === "=") {
          if (type === "select")
            throw new ParseError(lt, `The case ${key} is not valid with select`);
        } else if (type !== "select") {
          const keys = type === "plural" ? this.cardinalKeys : this.ordinalKeys;
          if (this.strictPluralKeys && keys.length > 0 && !keys.includes(key)) {
            const msg = `The ${type} case ${key} is not valid in this locale`;
            throw new ParseError(lt, msg);
          }
        }
      }
      parseSelect({ value: arg }, inPlural, ctx, type) {
        const sel = { type, arg, cases: [], ctx };
        if (type === "plural" || type === "selectordinal")
          inPlural = true;
        else if (this.strict)
          inPlural = false;
        for (const lt of this.lexer) {
          switch (lt.type) {
            case "offset":
              if (type === "select")
                throw new ParseError(lt, "Unexpected plural offset for select");
              if (sel.cases.length > 0)
                throw new ParseError(lt, "Plural offset must be set before cases");
              sel.pluralOffset = Number(lt.value);
              ctx.text += lt.text;
              ctx.lineBreaks += lt.lineBreaks;
              break;
            case "case": {
              this.checkSelectKey(lt, type, lt.value);
              sel.cases.push({
                key: lt.value,
                tokens: this.parseBody(inPlural),
                ctx: getContext(lt)
              });
              break;
            }
            case "end":
              return sel;
            /* istanbul ignore next: never happens */
            default:
              throw new ParseError(lt, `Unexpected lexer token: ${lt.type}`);
          }
        }
        throw new ParseError(null, "Unexpected message end");
      }
      parseArgToken(lt, inPlural) {
        const ctx = getContext(lt);
        const argType = this.lexer.next();
        if (!argType)
          throw new ParseError(null, "Unexpected message end");
        ctx.text += argType.text;
        ctx.lineBreaks += argType.lineBreaks;
        if (this.strict && (argType.type === "func-simple" || argType.type === "func-args") && !strictArgTypes.includes(argType.value)) {
          const msg = `Invalid strict mode function arg type: ${argType.value}`;
          throw new ParseError(lt, msg);
        }
        switch (argType.type) {
          case "end":
            return { type: "argument", arg: lt.value, ctx };
          case "func-simple": {
            const end = this.lexer.next();
            if (!end)
              throw new ParseError(null, "Unexpected message end");
            if (end.type !== "end")
              throw new ParseError(end, `Unexpected lexer token: ${end.type}`);
            ctx.text += end.text;
            if (isSelectType(argType.value.toLowerCase()))
              throw new ParseError(argType, `Invalid type identifier: ${argType.value}`);
            return {
              type: "function",
              arg: lt.value,
              key: argType.value,
              ctx
            };
          }
          case "func-args": {
            if (isSelectType(argType.value.toLowerCase())) {
              const msg = `Invalid type identifier: ${argType.value}`;
              throw new ParseError(argType, msg);
            }
            let param = this.parseBody(this.strict ? false : inPlural);
            if (this.strict && param.length > 0)
              param = strictArgStyleParam(lt, param);
            return {
              type: "function",
              arg: lt.value,
              key: argType.value,
              param,
              ctx
            };
          }
          case "select":
            if (isSelectType(argType.value))
              return this.parseSelect(lt, inPlural, ctx, argType.value);
            else
              throw new ParseError(argType, `Unexpected select type ${argType.value}`);
          /* istanbul ignore next: never happens */
          default:
            throw new ParseError(argType, `Unexpected lexer token: ${argType.type}`);
        }
      }
      parseBody(inPlural, atRoot) {
        const tokens = [];
        let content = null;
        for (const lt of this.lexer) {
          if (lt.type === "argument") {
            if (content)
              content = null;
            tokens.push(this.parseArgToken(lt, inPlural));
          } else if (lt.type === "octothorpe" && inPlural) {
            if (content)
              content = null;
            tokens.push({ type: "octothorpe", ctx: getContext(lt) });
          } else if (lt.type === "end" && !atRoot) {
            return tokens;
          } else {
            let value = lt.value;
            if (!inPlural && lt.type === "quoted" && value[0] === "#") {
              if (value.includes("{")) {
                const errMsg = `Unsupported escape pattern: ${value}`;
                throw new ParseError(lt, errMsg);
              }
              value = lt.text;
            }
            if (content) {
              content.value += value;
              content.ctx.text += lt.text;
              content.ctx.lineBreaks += lt.lineBreaks;
            } else {
              content = { type: "content", value, ctx: getContext(lt) };
              tokens.push(content);
            }
          }
        }
        if (atRoot)
          return tokens;
        throw new ParseError(null, "Unexpected message end");
      }
    };
    __name(_Parser, "Parser");
    var Parser = _Parser;
    function parse2(src, options = {}) {
      const parser = new Parser(src, options);
      return parser.parse();
    }
    __name(parse2, "parse");
    exports.parse = parse2;
  }
});

// node_modules/@lingui/message-utils/dist/compileMessage.mjs
var import_parser = __toESM(require_parser());
function processTokens(tokens, mapText) {
  if (!tokens.filter((token) => token.type !== "content").length) {
    return tokens.map((token) => mapText(token.value));
  }
  return tokens.map((token) => {
    if (token.type === "content") {
      return mapText(token.value);
    } else if (token.type === "octothorpe") {
      return "#";
    } else if (token.type === "argument") {
      return [token.arg];
    } else if (token.type === "function") {
      const _param = token?.param?.[0];
      if (_param) {
        return [token.arg, token.key, _param.value.trim()];
      } else {
        return [token.arg, token.key];
      }
    }
    const offset = token.pluralOffset;
    const formatProps = {};
    token.cases.forEach(({ key, tokens: tokens2 }) => {
      const prop = key[0] === "=" ? key.slice(1) : key;
      formatProps[prop] = processTokens(tokens2, mapText);
    });
    return [
      token.arg,
      token.type,
      {
        offset,
        ...formatProps
      }
    ];
  });
}
__name(processTokens, "processTokens");
function compileMessage(message, mapText = (v) => v) {
  try {
    return processTokens((0, import_parser.parse)(message), mapText);
  } catch (e) {
    console.error(`${e.message} 

Message: ${message}`);
    return [message];
  }
}
__name(compileMessage, "compileMessage");
function toCompiledMessages(rawMessages) {
  const compiledMessages = {};
  Object.keys(rawMessages).forEach((key) => {
    const message = rawMessages[key];
    compiledMessages[key] = compileMessage(message);
  });
  return compiledMessages;
}
__name(toCompiledMessages, "toCompiledMessages");
var _LuwioInternationalization = class _LuwioInternationalization {
  constructor(config, logger) {
    this.load = /* @__PURE__ */ __name(async (language) => {
      return await this._load(language);
    }, "load");
    this._logger = logger;
    this._internationalization = config.i18n;
    this._load = config.load;
    this.change(config.initialLanguage);
  }
  current() {
    return this._internationalization.locale;
  }
  change(language) {
    this._logger.info(`Changing language to ${language}`);
    if (this.current() === language) {
      this._logger.info(`Language is already ${language}`);
      return;
    }
    this.load(language).then((messages) => {
      this._logger.info(`Changing language to ${language}`);
      this._logger.info(messages);
      const compiledMessages = toCompiledMessages(messages);
      this._internationalization.load(language, compiledMessages);
      this._internationalization.activate(language);
    }).catch((error) => {
      this._logger.error(`Failed to change language to ${language}`);
      this._logger.error(error);
    });
  }
  t(key, variables) {
    return this._internationalization._(key, variables);
  }
  tdate(value, format) {
    return this._internationalization.date(value, format);
  }
  tnumber(value, format) {
    return this._internationalization.number(value, format);
  }
  getProvider({ children }) {
    return /* @__PURE__ */ jsx(I18nProvider, { i18n: this._internationalization, children });
  }
};
__name(_LuwioInternationalization, "LuwioInternationalization");
var LuwioInternationalization = _LuwioInternationalization;
Logger.useDefaults({
  defaultLevel: Logger.TRACE,
  formatter: /* @__PURE__ */ __name(function(messages, context) {
    messages.unshift((/* @__PURE__ */ new Date()).toUTCString());
    messages.unshift("Internationalization");
  }, "formatter")
});
var InternationalizationLogger = Logger.get("Internationalization");
InternationalizationLogger.setLevel(Logger.OFF);
function enableInternationalizationLogger() {
  InternationalizationLogger.setLevel(Logger.TRACE);
}
__name(enableInternationalizationLogger, "enableInternationalizationLogger");
var InternationalizationContext = createContext(void 0);
var InternationalizationProvider = /* @__PURE__ */ __name((props) => {
  const { children, initialLanguage, loadMessages } = props;
  const i18n = new I18n({
    missing: /* @__PURE__ */ __name((locale, key) => {
      return `MISSING TRANSLATION: ${key} in ${locale}`;
    }, "missing")
  });
  const Internationalization = new LuwioInternationalization(
    {
      i18n,
      load: loadMessages,
      initialLanguage
    },
    InternationalizationLogger
  );
  return /* @__PURE__ */ jsx(InternationalizationContext.Provider, { value: Internationalization, children: Internationalization.getProvider({ children }) });
}, "InternationalizationProvider");

// src/hooks/use-internationalization.ts
var useInternationalization = /* @__PURE__ */ __name(() => {
  const context = useContext(InternationalizationContext);
  if (!context) {
    throw new Error(
      "useInternationalization must be used within a InternationalizationProvider"
    );
  }
  return context;
}, "useInternationalization");
var LanguageDetectionDefault = {
  detectedLanguage: "en"
};
var LanguageDetectionContext = createContext(LanguageDetectionDefault);
var LanguageDetectionProvider = /* @__PURE__ */ __name((props) => {
  const { children, fallbackLanguage, detectLanguage } = props;
  return /* @__PURE__ */ jsx(
    LanguageDetectionContext.Provider,
    {
      value: {
        detectedLanguage: detectLanguage(fallbackLanguage)
      },
      children
    }
  );
}, "LanguageDetectionProvider");
var detectLanguageFromUrl = /* @__PURE__ */ __name((fallback) => {
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const code = pathname.split("/")[1];
  if (code.length !== 2) {
    InternationalizationLogger.warn(
      `Invalid length of language code detected from url: ${code}`
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`
    );
    return fallback;
  }
  if (!/^[a-zA-Z]{2}$/.test(code)) {
    InternationalizationLogger.warn(
      `Invalid language code detected from url: ${code}`
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`
    );
    return fallback;
  }
  if (code.toLowerCase() !== code) {
    InternationalizationLogger.warn(
      `Invalid language code containing uppercase values detected from url: ${code}`
    );
    InternationalizationLogger.info(
      `fallback detected language to ${fallback}`
    );
    return fallback;
  }
  return code;
}, "detectLanguageFromUrl");
var useLanguageDetection = /* @__PURE__ */ __name(() => {
  const context = useContext(LanguageDetectionContext);
  return context.detectedLanguage;
}, "useLanguageDetection");

export { InternationalizationProvider, LanguageDetectionProvider, LuwioInternationalization, detectLanguageFromUrl, enableInternationalizationLogger, useInternationalization, useLanguageDetection };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map