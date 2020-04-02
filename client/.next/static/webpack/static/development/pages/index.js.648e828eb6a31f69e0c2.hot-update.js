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
      lineNumber: 24,
      columnNumber: 17
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/profile",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 19
    }
  }, __jsx("a", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 21
    }
  }, "Client-rendered profile"))), __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 17
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/ssr-profile",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 19
    }
  }, __jsx("a", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 21
    }
  }, "Server rendered profile (advanced)"))), __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "/api/logout",
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 19
    }
  }, "Logout"))) : __jsx("li", {
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 15
    }
  }, __jsx("a", {
    href: "/api/login",
    className: "jsx-1448351626",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 17
    }
  }, "Login"))))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "1448351626",
    __self: this
  }, "header.jsx-1448351626{padding:0.2rem;color:#fff;background-color:#333;}nav.jsx-1448351626{max-width:42rem;margin:1.5rem auto;}ul.jsx-1448351626{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;list-style:none;margin-left:0;padding-left:0;}li.jsx-1448351626{margin-right:1rem;}li.jsx-1448351626:nth-child(2){margin-right:auto;}a.jsx-1448351626{color:#fff;-webkit-text-decoration:none;text-decoration:none;}button.jsx-1448351626{font-size:1rem;color:#fff;cursor:pointer;border:none;background:none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NoYWltL3JlcG9zL2VsaWV0L3R6Z2l0L2NvbXBvbmVudHMvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDa0IsQUFHMEIsQUFLQyxBQUlILEFBTUssQUFHQSxBQUdQLEFBSUksV0FITSxJQXJCVixBQXlCQSxDQXBCUSxFQVVyQixBQUdBLFFBakJ3QixBQXlCUCxTQXBCakIsTUFxQmMsT0F6QmQsS0EwQmtCLFFBTmxCLFFBT0EsS0FwQmtCLGdCQUNGLGNBQ0MsZUFDakIiLCJmaWxlIjoiL2hvbWUvY2hhaW0vcmVwb3MvZWxpZXQvdHpnaXQvY29tcG9uZW50cy9oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcbiAgdXNlcjogUHJvcFR5cGVzLm9iamVjdCxcbiAgbG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXG59O1xuXG5mdW5jdGlvbiBIZWFkZXIoeyB1c2VyLCBsb2FkaW5nIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8aGVhZGVyPlxuICAgICAgPG5hdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICAgIDxhPkhvbWU8L2E+XG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgICB7IWxvYWRpbmcgJiZcbiAgICAgICAgICAgICh1c2VyID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvcHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8YT5DbGllbnQtcmVuZGVyZWQgcHJvZmlsZTwvYT5cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvc3NyLXByb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGE+U2VydmVyIHJlbmRlcmVkIHByb2ZpbGUgKGFkdmFuY2VkKTwvYT5cbiAgICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXBpL2xvZ291dFwiPkxvZ291dDwvYT5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FwaS9sb2dpblwiPkxvZ2luPC9hPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L25hdj5cblxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICBoZWFkZXIge1xuICAgICAgICAgIHBhZGRpbmc6IDAuMnJlbTtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xuICAgICAgICB9XG4gICAgICAgIG5hdiB7XG4gICAgICAgICAgbWF4LXdpZHRoOiA0MnJlbTtcbiAgICAgICAgICBtYXJnaW46IDEuNXJlbSBhdXRvO1xuICAgICAgICB9XG4gICAgICAgIHVsIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICB9XG4gICAgICAgIGxpIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgICAgIH1cbiAgICAgICAgbGk6bnRoLWNoaWxkKDIpIHtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgYSB7XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvaGVhZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iXX0= */\n/*@ sourceURL=/home/chaim/repos/eliet/tzgit/components/header.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ })

})
//# sourceMappingURL=index.js.648e828eb6a31f69e0c2.hot-update.js.map