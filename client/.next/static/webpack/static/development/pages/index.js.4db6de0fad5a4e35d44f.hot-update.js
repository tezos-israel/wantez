webpackHotUpdate("static/development/pages/index.js",{

/***/ "./hooks/use-user.js":
/*!***************************!*\
  !*** ./hooks/use-user.js ***!
  \***************************/
/*! exports provided: fetchUser, useFetchUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUser", function() { return fetchUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFetchUser", function() { return useFetchUser; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/next/dist/build/polyfills/fetch/index.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_2__);



function fetchUser() {
  var cookie,
      res,
      json,
      _args = arguments;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function fetchUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cookie = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";

          if (!( true && window.__user)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", window.__user);

        case 3:
          _context.next = 5;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_2___default()("/api/me", cookie ? {
            headers: {
              cookie: cookie
            }
          } : {}));

        case 5:
          res = _context.sent;

          if (res.ok) {
            _context.next = 9;
            break;
          }

          delete window.__user;
          return _context.abrupt("return", null);

        case 9:
          _context.next = 11;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(res.json());

        case 11:
          json = _context.sent;

          if (true) {
            window.__user = json;
          }

          return _context.abrupt("return", json);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, null, Promise);
}
function useFetchUser() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      required = _ref.required;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(function () {
    return !( true && window.__user);
  }),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(function () {
    if (false) {}

    return window.__user || null;
  }),
      user = _useState2[0],
      setUser = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!loading && user) {
      return;
    }

    setLoading(true);
    var isMounted = true;
    fetchUser().then(function (user) {
      // Only set the user if the component is still mounted
      if (isMounted) {
        // When the user is not logged in but login is required
        if (required && !user) {
          window.location.href = "/api/login";
          return;
        }

        setUser(user);
        setLoading(false);
      }
    });
    return function () {
      isMounted = false;
    };
  }, []);
  return {
    user: user,
    loading: loading
  };
}

/***/ })

})
//# sourceMappingURL=index.js.4db6de0fad5a4e35d44f.hot-update.js.map