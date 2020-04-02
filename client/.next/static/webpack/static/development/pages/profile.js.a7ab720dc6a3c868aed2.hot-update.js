webpackHotUpdate("static/development/pages/profile.js",{

/***/ "./pages/profile.js":
/*!**************************!*\
  !*** ./pages/profile.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/use-user */ "./hooks/use-user.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/layout */ "./components/layout.js");
var _jsxFileName = "/home/chaim/repos/eliet/tzgit/pages/profile.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




ProfileCard.propTypes = {
  user: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    picture: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    nickname: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  })
};

function ProfileCard(_ref) {
  var user = _ref.user;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }
  }, "Profile"), __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 7
    }
  }, __jsx("h3", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }, "Profile (client rendered)"), __jsx("img", {
    src: user.picture,
    alt: "user picture",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, "nickname: ", user.nickname), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }
  }, "name: ", user.name)));
}

function Profile() {
  var _useFetchUser = Object(_hooks_use_user__WEBPACK_IMPORTED_MODULE_2__["useFetchUser"])({
    required: true
  }),
      user = _useFetchUser.user,
      loading = _useFetchUser.loading;

  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_3__["default"], {
    user: user,
    loading: loading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 5
    }
  }, loading ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Loading...") : __jsx(ProfileCard, {
    user: user,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 36
    }
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (Profile);

/***/ })

})
//# sourceMappingURL=profile.js.a7ab720dc6a3c868aed2.hot-update.js.map