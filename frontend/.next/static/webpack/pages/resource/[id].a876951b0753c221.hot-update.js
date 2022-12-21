"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/resource/[id]",{

/***/ "./components/resource/subpages/Contributors.js":
/*!******************************************************!*\
  !*** ./components/resource/subpages/Contributors.js ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Main; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/esm/index.js\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../contexts/AuthContext */ \"./contexts/AuthContext.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ProfileCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProfileCard */ \"./components/resource/subpages/ProfileCard.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction Main() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const { id  } = router.query;\n    const [creator, setCreator] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [commentors, setCommentors] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const commentorsCards = [];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const { id  } = router.query;\n        if (!id) return;\n        const getCreator = async ()=>{\n            const baseURL = \"http://3.89.218.253:8000/app/content/?id=\".concat(id);\n            const res = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(baseURL, {\n                headers: {\n                    Authorization: \"token \".concat(localStorage.getItem(\"token\"))\n                }\n            });\n            setCreator(res.data.owner);\n        };\n        const getCommentors = async ()=>{\n            const baseURL = \"http://3.89.218.253:8000/app/discussion-list/?content_id=\".concat(id);\n            const res = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(baseURL, {\n                headers: {\n                    Authorization: \"token \".concat(localStorage.getItem(\"token\"))\n                }\n            });\n            var peopleIds = [];\n            console.log(\"begin\");\n            for (const comment of res.data.data){\n                console.log(comment.owner.username);\n                peopleIds.push(comment.owner.id);\n            }\n            console.log(\"end\");\n            setCommentors(peopleIds);\n        };\n        getCreator();\n        getCommentors();\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                mb: 2,\n                variant: \"h6\",\n                textAlign: \"center\",\n                children: \"Contributors\"\n            }, void 0, false, {\n                fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Card, {\n                sx: {\n                    p: 1.5,\n                    borderRadius: \"16px\",\n                    m: 1\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                        gutterBottom: true,\n                        color: \"text.secondary\"\n                    }, void 0, false, {\n                        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                        lineNumber: 65,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ProfileCard__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        id: creator\n                    }, void 0, false, {\n                        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this),\n            commentors && commentors.map((person)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Card, {\n                    sx: {\n                        p: 1.5,\n                        borderRadius: \"16px\",\n                        m: 1\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                        gutterBottom: true,\n                        color: \"text.secondary\"\n                    }, void 0, false, {\n                        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                        lineNumber: 72,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                    lineNumber: 71,\n                    columnNumber: 11\n                }, this))\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, this);\n}\n_s(Main, \"z5OIgA3RWsCSK44vb/8Mi6zxd6w=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Main;\nvar _c;\n$RefreshReg$(_c, \"Main\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3Jlc291cmNlL3N1YnBhZ2VzL0NvbnRyaWJ1dG9ycy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUFtQztBQVVaO0FBQ1c7QUFDMEI7QUFDSTtBQUNKO0FBQ2xDO0FBQ2M7QUFDRztBQUNIO0FBRXpCLFNBQVNzQixPQUFPOztJQUM3QixNQUFNQyxTQUFTSixzREFBU0E7SUFDeEIsTUFBTSxFQUFFSyxHQUFFLEVBQUUsR0FBR0QsT0FBT0UsS0FBSztJQUMzQixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQUMsSUFBSTtJQUMzQyxNQUFNLENBQUNnQixZQUFZQyxjQUFjLEdBQUdqQiwrQ0FBUUEsQ0FBQyxJQUFJO0lBRWpELE1BQU1rQixrQkFBa0IsRUFBRTtJQUUxQmpCLGdEQUFTQSxDQUFDLElBQU07UUFDZCxNQUFNLEVBQUVXLEdBQUUsRUFBRSxHQUFHRCxPQUFPRSxLQUFLO1FBQzNCLElBQUksQ0FBQ0QsSUFBSTtRQUVULE1BQU1PLGFBQWEsVUFBWTtZQUM3QixNQUFNQyxVQUFVLDRDQUErQyxPQUFIUjtZQUM1RCxNQUFNUyxNQUFNLE1BQU1mLGlEQUFTLENBQUNjLFNBQVM7Z0JBQ25DRyxTQUFTO29CQUFFQyxlQUFlLFNBQXVDLE9BQTlCQyxhQUFhQyxPQUFPLENBQUM7Z0JBQVc7WUFDckU7WUFDQVgsV0FBV00sSUFBSU0sSUFBSSxDQUFDQyxLQUFLO1FBQzNCO1FBQ0EsTUFBTUMsZ0JBQWdCLFVBQVk7WUFDaEMsTUFBTVQsVUFBVSw0REFBK0QsT0FBSFI7WUFDNUUsTUFBTVMsTUFBTSxNQUFNZixpREFBUyxDQUFDYyxTQUFTO2dCQUNuQ0csU0FBUztvQkFBRUMsZUFBZSxTQUF1QyxPQUE5QkMsYUFBYUMsT0FBTyxDQUFDO2dCQUFXO1lBQ3JFO1lBQ0EsSUFBSUksWUFBWSxFQUFFO1lBQ2xCQyxRQUFRQyxHQUFHLENBQUM7WUFDWixLQUFLLE1BQU1DLFdBQVdaLElBQUlNLElBQUksQ0FBQ0EsSUFBSSxDQUFFO2dCQUNuQ0ksUUFBUUMsR0FBRyxDQUFDQyxRQUFRTCxLQUFLLENBQUNNLFFBQVE7Z0JBQ2xDSixVQUFVSyxJQUFJLENBQUNGLFFBQVFMLEtBQUssQ0FBQ2hCLEVBQUU7WUFDakM7WUFDQW1CLFFBQVFDLEdBQUcsQ0FBQztZQUNaZixjQUFjYTtRQUNoQjtRQUVBWDtRQUNBVTtJQUNGLEdBQUc7UUFBQ2xCO0tBQU87SUFFWCxxQkFDRSw4REFBQ3BCLDhDQUFHQTs7MEJBQ0YsOERBQUNGLHFEQUFVQTtnQkFBQytDLElBQUk7Z0JBQUdDLFNBQVE7Z0JBQUtDLFdBQVU7MEJBQVM7Ozs7OzswQkFHbkQsOERBQUMzQywrQ0FBSUE7Z0JBQUM0QyxJQUFJO29CQUFFQyxHQUFHO29CQUFLQyxjQUFjO29CQUFRQyxHQUFHO2dCQUFFOztrQ0FDN0MsOERBQUNyRCxxREFBVUE7d0JBQUNzRCxZQUFZO3dCQUFDQyxPQUFNOzs7Ozs7a0NBQy9CLDhEQUFDbkMsb0RBQVdBO3dCQUFDRyxJQUFJRTs7Ozs7Ozs7Ozs7O1lBR2xCRSxjQUNDQSxXQUFXNkIsR0FBRyxDQUFDLENBQUNDLHVCQUNkLDhEQUFDbkQsK0NBQUlBO29CQUFDNEMsSUFBSTt3QkFBRUMsR0FBRzt3QkFBS0MsY0FBYzt3QkFBUUMsR0FBRztvQkFBRTs4QkFDN0MsNEVBQUNyRCxxREFBVUE7d0JBQUNzRCxZQUFZO3dCQUFDQyxPQUFNOzs7Ozs7Ozs7Ozs7Ozs7OztBQUszQyxDQUFDO0dBeER1QmxDOztRQUNQSCxrREFBU0E7OztLQURGRyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL3Jlc291cmNlL3N1YnBhZ2VzL0NvbnRyaWJ1dG9ycy5qcz8yOWI0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIFR5cG9ncmFwaHksXG4gIENvbnRhaW5lcixcbiAgQm94LFxuICBEaXZpZGVyLFxuICBQYXBlcixcbiAgQnV0dG9uLFxuICBDYXJkLFxuICBUZXh0RmllbGQsXG59IGZyb20gXCJAbXVpL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7IEF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHRzL0F1dGhDb250ZXh0XCI7XG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJvdXRlcywgUm91dGUsIHVzZVBhcmFtcyB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCBSZWFjdE1hcmtkb3duIGZyb20gXCJyZWFjdC1tYXJrZG93blwiO1xuaW1wb3J0IFByb2ZpbGVDYXJkIGZyb20gXCIuL1Byb2ZpbGVDYXJkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW4oKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IGlkIH0gPSByb3V0ZXIucXVlcnk7XG4gIGNvbnN0IFtjcmVhdG9yLCBzZXRDcmVhdG9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbY29tbWVudG9ycywgc2V0Q29tbWVudG9yc10gPSB1c2VTdGF0ZShudWxsKTtcblxuICBjb25zdCBjb21tZW50b3JzQ2FyZHMgPSBbXTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHsgaWQgfSA9IHJvdXRlci5xdWVyeTtcbiAgICBpZiAoIWlkKSByZXR1cm47XG5cbiAgICBjb25zdCBnZXRDcmVhdG9yID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYmFzZVVSTCA9IGBodHRwOi8vMy44OS4yMTguMjUzOjgwMDAvYXBwL2NvbnRlbnQvP2lkPSR7aWR9YDtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChiYXNlVVJMLCB7XG4gICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYHRva2VuICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKX1gIH0sXG4gICAgICB9KTtcbiAgICAgIHNldENyZWF0b3IocmVzLmRhdGEub3duZXIpO1xuICAgIH07XG4gICAgY29uc3QgZ2V0Q29tbWVudG9ycyA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGJhc2VVUkwgPSBgaHR0cDovLzMuODkuMjE4LjI1Mzo4MDAwL2FwcC9kaXNjdXNzaW9uLWxpc3QvP2NvbnRlbnRfaWQ9JHtpZH1gO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGJhc2VVUkwsIHtcbiAgICAgICAgaGVhZGVyczogeyBBdXRob3JpemF0aW9uOiBgdG9rZW4gJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpfWAgfSxcbiAgICAgIH0pO1xuICAgICAgdmFyIHBlb3BsZUlkcyA9IFtdO1xuICAgICAgY29uc29sZS5sb2coXCJiZWdpblwiKTtcbiAgICAgIGZvciAoY29uc3QgY29tbWVudCBvZiByZXMuZGF0YS5kYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbW1lbnQub3duZXIudXNlcm5hbWUpO1xuICAgICAgICBwZW9wbGVJZHMucHVzaChjb21tZW50Lm93bmVyLmlkKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwiZW5kXCIpO1xuICAgICAgc2V0Q29tbWVudG9ycyhwZW9wbGVJZHMpO1xuICAgIH07XG5cbiAgICBnZXRDcmVhdG9yKCk7XG4gICAgZ2V0Q29tbWVudG9ycygpO1xuICB9LCBbcm91dGVyXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Qm94PlxuICAgICAgPFR5cG9ncmFwaHkgbWI9ezJ9IHZhcmlhbnQ9XCJoNlwiIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICBDb250cmlidXRvcnNcbiAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgIDxDYXJkIHN4PXt7IHA6IDEuNSwgYm9yZGVyUmFkaXVzOiBcIjE2cHhcIiwgbTogMSB9fT5cbiAgICAgICAgPFR5cG9ncmFwaHkgZ3V0dGVyQm90dG9tIGNvbG9yPVwidGV4dC5zZWNvbmRhcnlcIj48L1R5cG9ncmFwaHk+XG4gICAgICAgIDxQcm9maWxlQ2FyZCBpZD17Y3JlYXRvcn0gLz5cbiAgICAgIDwvQ2FyZD5cblxuICAgICAge2NvbW1lbnRvcnMgJiZcbiAgICAgICAgY29tbWVudG9ycy5tYXAoKHBlcnNvbikgPT4gKFxuICAgICAgICAgIDxDYXJkIHN4PXt7IHA6IDEuNSwgYm9yZGVyUmFkaXVzOiBcIjE2cHhcIiwgbTogMSB9fT5cbiAgICAgICAgICAgIDxUeXBvZ3JhcGh5IGd1dHRlckJvdHRvbSBjb2xvcj1cInRleHQuc2Vjb25kYXJ5XCI+PC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIDwvQ2FyZD5cbiAgICAgICAgKSl9XG4gICAgPC9Cb3g+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlQ29udGV4dCIsIlR5cG9ncmFwaHkiLCJDb250YWluZXIiLCJCb3giLCJEaXZpZGVyIiwiUGFwZXIiLCJCdXR0b24iLCJDYXJkIiwiVGV4dEZpZWxkIiwiZm9ybWF0IiwiQXV0aENvbnRleHQiLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlQ2FsbGJhY2siLCJSb3V0ZXMiLCJSb3V0ZSIsInVzZVBhcmFtcyIsImF4aW9zIiwidXNlUm91dGVyIiwiUmVhY3RNYXJrZG93biIsIlByb2ZpbGVDYXJkIiwiTWFpbiIsInJvdXRlciIsImlkIiwicXVlcnkiLCJjcmVhdG9yIiwic2V0Q3JlYXRvciIsImNvbW1lbnRvcnMiLCJzZXRDb21tZW50b3JzIiwiY29tbWVudG9yc0NhcmRzIiwiZ2V0Q3JlYXRvciIsImJhc2VVUkwiLCJyZXMiLCJnZXQiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkYXRhIiwib3duZXIiLCJnZXRDb21tZW50b3JzIiwicGVvcGxlSWRzIiwiY29uc29sZSIsImxvZyIsImNvbW1lbnQiLCJ1c2VybmFtZSIsInB1c2giLCJtYiIsInZhcmlhbnQiLCJ0ZXh0QWxpZ24iLCJzeCIsInAiLCJib3JkZXJSYWRpdXMiLCJtIiwiZ3V0dGVyQm90dG9tIiwiY29sb3IiLCJtYXAiLCJwZXJzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/resource/subpages/Contributors.js\n"));

/***/ })

});