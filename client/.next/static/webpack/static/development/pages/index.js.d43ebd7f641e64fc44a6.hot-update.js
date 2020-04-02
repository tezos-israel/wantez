webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/header.js":
/*!******************************!*\
  !*** ./components/header.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/chaim/repos/eliet/tzgit/components/header.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



Header.propTypes = {
  user: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,
  loading: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};

function Header(_ref) {
  var user = _ref.user,
      loading = _ref.loading;
  return __jsx("header", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, __jsx("nav", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }, __jsx("ul", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 9
    }
  }, __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 11
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 13
    }
  }, __jsx("a", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 15
    }
  }, "Home"))), !loading && (user ? __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 17
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/profile",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 19
    }
  }, __jsx("a", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 21
    }
  }, "Client-rendered profile"))), __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 17
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/advanced/ssr-profile",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 19
    }
  }, __jsx("a", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 21
    }
  }, "Server rendered profile (advanced)"))), __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "/api/logout",
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 19
    }
  }, "Logout"))) : __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "/api/login",
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, "Login"))))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1448351626",
    __self: this
  }, "header.jsx-1448351626{padding:0.2rem;color:#fff;background-color:#333;}nav.jsx-1448351626{max-width:42rem;margin:1.5rem auto;}ul.jsx-1448351626{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;list-style:none;margin-left:0;padding-left:0;}li.jsx-1448351626{margin-right:1rem;}li.jsx-1448351626:nth-child(2){margin-right:auto;}a.jsx-1448351626{color:#fff;-webkit-text-decoration:none;text-decoration:none;}button.jsx-1448351626{font-size:1rem;color:#fff;cursor:pointer;border:none;background:none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NoYWltL3JlcG9zL2VsaWV0L3R6Z2l0L2NvbXBvbmVudHMvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThDa0IsQUFHMEIsQUFLQyxBQUlILEFBTUssQUFHQSxBQUdQLEFBSUksV0FITSxJQXJCVixBQXlCQSxDQXBCUSxFQVVyQixBQUdBLFFBakJ3QixBQXlCUCxTQXBCakIsTUFxQmMsT0F6QmQsS0EwQmtCLFFBTmxCLFFBT0EsS0FwQmtCLGdCQUNGLGNBQ0MsZUFDakIiLCJmaWxlIjoiL2hvbWUvY2hhaW0vcmVwb3MvZWxpZXQvdHpnaXQvY29tcG9uZW50cy9oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgdXNlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5mdW5jdGlvbiBIZWFkZXIoeyB1c2VyLCBsb2FkaW5nIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyPlxuICAgICAgPG5hdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICAgIDxhPkhvbWU8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9saT5cblxuICAgICAgICAgIHshbG9hZGluZyAmJlxuICAgICAgICAgICAgKHVzZXIgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9wcm9maWxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhPkNsaWVudC1yZW5kZXJlZCBwcm9maWxlPC9hPlxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9hZHZhbmNlZC9zc3ItcHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YT5TZXJ2ZXIgcmVuZGVyZWQgcHJvZmlsZSAoYWR2YW5jZWQpPC9hPlxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hcGkvbG9nb3V0XCI+TG9nb3V0PC9hPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXBpL2xvZ2luXCI+TG9naW48L2E+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvbmF2PlxuXG4gICAgICA8c3R5bGUganN4PntgXG4gICAgICAgIGhlYWRlciB7XG4gICAgICAgICAgcGFkZGluZzogMC4ycmVtO1xuICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG4gICAgICAgIH1cbiAgICAgICAgbmF2IHtcbiAgICAgICAgICBtYXgtd2lkdGg6IDQycmVtO1xuICAgICAgICAgIG1hcmdpbjogMS41cmVtIGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgdWwge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgbGkge1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgICAgICAgfVxuICAgICAgICBsaTpudGgtY2hpbGQoMikge1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgICAgfVxuICAgICAgICBhIHtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgYnV0dG9uIHtcbiAgICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC9oZWFkZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiJdfQ== */\n/*@ sourceURL=/home/chaim/repos/eliet/tzgit/components/header.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ })

})
//# sourceMappingURL=index.js.d43ebd7f641e64fc44a6.hot-update.js.map