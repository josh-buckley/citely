"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/css-box-model";
exports.ids = ["vendor-chunks/css-box-model"];
exports.modules = {

/***/ "(ssr)/./node_modules/css-box-model/dist/css-box-model.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-box-model/dist/css-box-model.esm.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculateBox: () => (/* binding */ calculateBox),\n/* harmony export */   createBox: () => (/* binding */ createBox),\n/* harmony export */   expand: () => (/* binding */ expand),\n/* harmony export */   getBox: () => (/* binding */ getBox),\n/* harmony export */   getRect: () => (/* binding */ getRect),\n/* harmony export */   offset: () => (/* binding */ offset),\n/* harmony export */   shrink: () => (/* binding */ shrink),\n/* harmony export */   withScroll: () => (/* binding */ withScroll)\n/* harmony export */ });\n/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ \"(ssr)/./node_modules/tiny-invariant/dist/esm/tiny-invariant.js\");\n\n\nvar getRect = function getRect(_ref) {\n  var top = _ref.top,\n      right = _ref.right,\n      bottom = _ref.bottom,\n      left = _ref.left;\n  var width = right - left;\n  var height = bottom - top;\n  var rect = {\n    top: top,\n    right: right,\n    bottom: bottom,\n    left: left,\n    width: width,\n    height: height,\n    x: left,\n    y: top,\n    center: {\n      x: (right + left) / 2,\n      y: (bottom + top) / 2\n    }\n  };\n  return rect;\n};\nvar expand = function expand(target, expandBy) {\n  return {\n    top: target.top - expandBy.top,\n    left: target.left - expandBy.left,\n    bottom: target.bottom + expandBy.bottom,\n    right: target.right + expandBy.right\n  };\n};\nvar shrink = function shrink(target, shrinkBy) {\n  return {\n    top: target.top + shrinkBy.top,\n    left: target.left + shrinkBy.left,\n    bottom: target.bottom - shrinkBy.bottom,\n    right: target.right - shrinkBy.right\n  };\n};\n\nvar shift = function shift(target, shiftBy) {\n  return {\n    top: target.top + shiftBy.y,\n    left: target.left + shiftBy.x,\n    bottom: target.bottom + shiftBy.y,\n    right: target.right + shiftBy.x\n  };\n};\n\nvar noSpacing = {\n  top: 0,\n  right: 0,\n  bottom: 0,\n  left: 0\n};\nvar createBox = function createBox(_ref2) {\n  var borderBox = _ref2.borderBox,\n      _ref2$margin = _ref2.margin,\n      margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin,\n      _ref2$border = _ref2.border,\n      border = _ref2$border === void 0 ? noSpacing : _ref2$border,\n      _ref2$padding = _ref2.padding,\n      padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;\n  var marginBox = getRect(expand(borderBox, margin));\n  var paddingBox = getRect(shrink(borderBox, border));\n  var contentBox = getRect(shrink(paddingBox, padding));\n  return {\n    marginBox: marginBox,\n    borderBox: getRect(borderBox),\n    paddingBox: paddingBox,\n    contentBox: contentBox,\n    margin: margin,\n    border: border,\n    padding: padding\n  };\n};\n\nvar parse = function parse(raw) {\n  var value = raw.slice(0, -2);\n  var suffix = raw.slice(-2);\n\n  if (suffix !== 'px') {\n    return 0;\n  }\n\n  var result = Number(value);\n  !!isNaN(result) ?  true ? (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(false, \"Could not parse value [raw: \" + raw + \", without suffix: \" + value + \"]\") : 0 : void 0;\n  return result;\n};\n\nvar getWindowScroll = function getWindowScroll() {\n  return {\n    x: window.pageXOffset,\n    y: window.pageYOffset\n  };\n};\n\nvar offset = function offset(original, change) {\n  var borderBox = original.borderBox,\n      border = original.border,\n      margin = original.margin,\n      padding = original.padding;\n  var shifted = shift(borderBox, change);\n  return createBox({\n    borderBox: shifted,\n    border: border,\n    margin: margin,\n    padding: padding\n  });\n};\nvar withScroll = function withScroll(original, scroll) {\n  if (scroll === void 0) {\n    scroll = getWindowScroll();\n  }\n\n  return offset(original, scroll);\n};\nvar calculateBox = function calculateBox(borderBox, styles) {\n  var margin = {\n    top: parse(styles.marginTop),\n    right: parse(styles.marginRight),\n    bottom: parse(styles.marginBottom),\n    left: parse(styles.marginLeft)\n  };\n  var padding = {\n    top: parse(styles.paddingTop),\n    right: parse(styles.paddingRight),\n    bottom: parse(styles.paddingBottom),\n    left: parse(styles.paddingLeft)\n  };\n  var border = {\n    top: parse(styles.borderTopWidth),\n    right: parse(styles.borderRightWidth),\n    bottom: parse(styles.borderBottomWidth),\n    left: parse(styles.borderLeftWidth)\n  };\n  return createBox({\n    borderBox: borderBox,\n    margin: margin,\n    padding: padding,\n    border: border\n  });\n};\nvar getBox = function getBox(el) {\n  var borderBox = el.getBoundingClientRect();\n  var styles = window.getComputedStyle(el);\n  return calculateBox(borderBox, styles);\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY3NzLWJveC1tb2RlbC9kaXN0L2Nzcy1ib3gtbW9kZWwuZXNtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsS0FBcUMsR0FBRywwREFBUyxxRkFBcUYsQ0FBZ0I7QUFDMUs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3RiIsInNvdXJjZXMiOlsiL1VzZXJzL2pvc2hidWNrbGV5L0RvY3VtZW50cy9jaXRlbHkvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL2Nzcy1ib3gtbW9kZWwvZGlzdC9jc3MtYm94LW1vZGVsLmVzbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW52YXJpYW50IGZyb20gJ3RpbnktaW52YXJpYW50JztcblxudmFyIGdldFJlY3QgPSBmdW5jdGlvbiBnZXRSZWN0KF9yZWYpIHtcbiAgdmFyIHRvcCA9IF9yZWYudG9wLFxuICAgICAgcmlnaHQgPSBfcmVmLnJpZ2h0LFxuICAgICAgYm90dG9tID0gX3JlZi5ib3R0b20sXG4gICAgICBsZWZ0ID0gX3JlZi5sZWZ0O1xuICB2YXIgd2lkdGggPSByaWdodCAtIGxlZnQ7XG4gIHZhciBoZWlnaHQgPSBib3R0b20gLSB0b3A7XG4gIHZhciByZWN0ID0ge1xuICAgIHRvcDogdG9wLFxuICAgIHJpZ2h0OiByaWdodCxcbiAgICBib3R0b206IGJvdHRvbSxcbiAgICBsZWZ0OiBsZWZ0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICB4OiBsZWZ0LFxuICAgIHk6IHRvcCxcbiAgICBjZW50ZXI6IHtcbiAgICAgIHg6IChyaWdodCArIGxlZnQpIC8gMixcbiAgICAgIHk6IChib3R0b20gKyB0b3ApIC8gMlxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHJlY3Q7XG59O1xudmFyIGV4cGFuZCA9IGZ1bmN0aW9uIGV4cGFuZCh0YXJnZXQsIGV4cGFuZEJ5KSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiB0YXJnZXQudG9wIC0gZXhwYW5kQnkudG9wLFxuICAgIGxlZnQ6IHRhcmdldC5sZWZ0IC0gZXhwYW5kQnkubGVmdCxcbiAgICBib3R0b206IHRhcmdldC5ib3R0b20gKyBleHBhbmRCeS5ib3R0b20sXG4gICAgcmlnaHQ6IHRhcmdldC5yaWdodCArIGV4cGFuZEJ5LnJpZ2h0XG4gIH07XG59O1xudmFyIHNocmluayA9IGZ1bmN0aW9uIHNocmluayh0YXJnZXQsIHNocmlua0J5KSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiB0YXJnZXQudG9wICsgc2hyaW5rQnkudG9wLFxuICAgIGxlZnQ6IHRhcmdldC5sZWZ0ICsgc2hyaW5rQnkubGVmdCxcbiAgICBib3R0b206IHRhcmdldC5ib3R0b20gLSBzaHJpbmtCeS5ib3R0b20sXG4gICAgcmlnaHQ6IHRhcmdldC5yaWdodCAtIHNocmlua0J5LnJpZ2h0XG4gIH07XG59O1xuXG52YXIgc2hpZnQgPSBmdW5jdGlvbiBzaGlmdCh0YXJnZXQsIHNoaWZ0QnkpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IHRhcmdldC50b3AgKyBzaGlmdEJ5LnksXG4gICAgbGVmdDogdGFyZ2V0LmxlZnQgKyBzaGlmdEJ5LngsXG4gICAgYm90dG9tOiB0YXJnZXQuYm90dG9tICsgc2hpZnRCeS55LFxuICAgIHJpZ2h0OiB0YXJnZXQucmlnaHQgKyBzaGlmdEJ5LnhcbiAgfTtcbn07XG5cbnZhciBub1NwYWNpbmcgPSB7XG4gIHRvcDogMCxcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgbGVmdDogMFxufTtcbnZhciBjcmVhdGVCb3ggPSBmdW5jdGlvbiBjcmVhdGVCb3goX3JlZjIpIHtcbiAgdmFyIGJvcmRlckJveCA9IF9yZWYyLmJvcmRlckJveCxcbiAgICAgIF9yZWYyJG1hcmdpbiA9IF9yZWYyLm1hcmdpbixcbiAgICAgIG1hcmdpbiA9IF9yZWYyJG1hcmdpbiA9PT0gdm9pZCAwID8gbm9TcGFjaW5nIDogX3JlZjIkbWFyZ2luLFxuICAgICAgX3JlZjIkYm9yZGVyID0gX3JlZjIuYm9yZGVyLFxuICAgICAgYm9yZGVyID0gX3JlZjIkYm9yZGVyID09PSB2b2lkIDAgPyBub1NwYWNpbmcgOiBfcmVmMiRib3JkZXIsXG4gICAgICBfcmVmMiRwYWRkaW5nID0gX3JlZjIucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfcmVmMiRwYWRkaW5nID09PSB2b2lkIDAgPyBub1NwYWNpbmcgOiBfcmVmMiRwYWRkaW5nO1xuICB2YXIgbWFyZ2luQm94ID0gZ2V0UmVjdChleHBhbmQoYm9yZGVyQm94LCBtYXJnaW4pKTtcbiAgdmFyIHBhZGRpbmdCb3ggPSBnZXRSZWN0KHNocmluayhib3JkZXJCb3gsIGJvcmRlcikpO1xuICB2YXIgY29udGVudEJveCA9IGdldFJlY3Qoc2hyaW5rKHBhZGRpbmdCb3gsIHBhZGRpbmcpKTtcbiAgcmV0dXJuIHtcbiAgICBtYXJnaW5Cb3g6IG1hcmdpbkJveCxcbiAgICBib3JkZXJCb3g6IGdldFJlY3QoYm9yZGVyQm94KSxcbiAgICBwYWRkaW5nQm94OiBwYWRkaW5nQm94LFxuICAgIGNvbnRlbnRCb3g6IGNvbnRlbnRCb3gsXG4gICAgbWFyZ2luOiBtYXJnaW4sXG4gICAgYm9yZGVyOiBib3JkZXIsXG4gICAgcGFkZGluZzogcGFkZGluZ1xuICB9O1xufTtcblxudmFyIHBhcnNlID0gZnVuY3Rpb24gcGFyc2UocmF3KSB7XG4gIHZhciB2YWx1ZSA9IHJhdy5zbGljZSgwLCAtMik7XG4gIHZhciBzdWZmaXggPSByYXcuc2xpY2UoLTIpO1xuXG4gIGlmIChzdWZmaXggIT09ICdweCcpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBOdW1iZXIodmFsdWUpO1xuICAhIWlzTmFOKHJlc3VsdCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBpbnZhcmlhbnQoZmFsc2UsIFwiQ291bGQgbm90IHBhcnNlIHZhbHVlIFtyYXc6IFwiICsgcmF3ICsgXCIsIHdpdGhvdXQgc3VmZml4OiBcIiArIHZhbHVlICsgXCJdXCIpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBnZXRXaW5kb3dTY3JvbGwgPSBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGwoKSB7XG4gIHJldHVybiB7XG4gICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9O1xufTtcblxudmFyIG9mZnNldCA9IGZ1bmN0aW9uIG9mZnNldChvcmlnaW5hbCwgY2hhbmdlKSB7XG4gIHZhciBib3JkZXJCb3ggPSBvcmlnaW5hbC5ib3JkZXJCb3gsXG4gICAgICBib3JkZXIgPSBvcmlnaW5hbC5ib3JkZXIsXG4gICAgICBtYXJnaW4gPSBvcmlnaW5hbC5tYXJnaW4sXG4gICAgICBwYWRkaW5nID0gb3JpZ2luYWwucGFkZGluZztcbiAgdmFyIHNoaWZ0ZWQgPSBzaGlmdChib3JkZXJCb3gsIGNoYW5nZSk7XG4gIHJldHVybiBjcmVhdGVCb3goe1xuICAgIGJvcmRlckJveDogc2hpZnRlZCxcbiAgICBib3JkZXI6IGJvcmRlcixcbiAgICBtYXJnaW46IG1hcmdpbixcbiAgICBwYWRkaW5nOiBwYWRkaW5nXG4gIH0pO1xufTtcbnZhciB3aXRoU2Nyb2xsID0gZnVuY3Rpb24gd2l0aFNjcm9sbChvcmlnaW5hbCwgc2Nyb2xsKSB7XG4gIGlmIChzY3JvbGwgPT09IHZvaWQgMCkge1xuICAgIHNjcm9sbCA9IGdldFdpbmRvd1Njcm9sbCgpO1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldChvcmlnaW5hbCwgc2Nyb2xsKTtcbn07XG52YXIgY2FsY3VsYXRlQm94ID0gZnVuY3Rpb24gY2FsY3VsYXRlQm94KGJvcmRlckJveCwgc3R5bGVzKSB7XG4gIHZhciBtYXJnaW4gPSB7XG4gICAgdG9wOiBwYXJzZShzdHlsZXMubWFyZ2luVG9wKSxcbiAgICByaWdodDogcGFyc2Uoc3R5bGVzLm1hcmdpblJpZ2h0KSxcbiAgICBib3R0b206IHBhcnNlKHN0eWxlcy5tYXJnaW5Cb3R0b20pLFxuICAgIGxlZnQ6IHBhcnNlKHN0eWxlcy5tYXJnaW5MZWZ0KVxuICB9O1xuICB2YXIgcGFkZGluZyA9IHtcbiAgICB0b3A6IHBhcnNlKHN0eWxlcy5wYWRkaW5nVG9wKSxcbiAgICByaWdodDogcGFyc2Uoc3R5bGVzLnBhZGRpbmdSaWdodCksXG4gICAgYm90dG9tOiBwYXJzZShzdHlsZXMucGFkZGluZ0JvdHRvbSksXG4gICAgbGVmdDogcGFyc2Uoc3R5bGVzLnBhZGRpbmdMZWZ0KVxuICB9O1xuICB2YXIgYm9yZGVyID0ge1xuICAgIHRvcDogcGFyc2Uoc3R5bGVzLmJvcmRlclRvcFdpZHRoKSxcbiAgICByaWdodDogcGFyc2Uoc3R5bGVzLmJvcmRlclJpZ2h0V2lkdGgpLFxuICAgIGJvdHRvbTogcGFyc2Uoc3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKSxcbiAgICBsZWZ0OiBwYXJzZShzdHlsZXMuYm9yZGVyTGVmdFdpZHRoKVxuICB9O1xuICByZXR1cm4gY3JlYXRlQm94KHtcbiAgICBib3JkZXJCb3g6IGJvcmRlckJveCxcbiAgICBtYXJnaW46IG1hcmdpbixcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGJvcmRlcjogYm9yZGVyXG4gIH0pO1xufTtcbnZhciBnZXRCb3ggPSBmdW5jdGlvbiBnZXRCb3goZWwpIHtcbiAgdmFyIGJvcmRlckJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICByZXR1cm4gY2FsY3VsYXRlQm94KGJvcmRlckJveCwgc3R5bGVzKTtcbn07XG5cbmV4cG9ydCB7IGNhbGN1bGF0ZUJveCwgY3JlYXRlQm94LCBleHBhbmQsIGdldEJveCwgZ2V0UmVjdCwgb2Zmc2V0LCBzaHJpbmssIHdpdGhTY3JvbGwgfTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/css-box-model/dist/css-box-model.esm.js\n");

/***/ })

};
;