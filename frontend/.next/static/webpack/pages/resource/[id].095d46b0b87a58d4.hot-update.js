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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Main; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/esm/index.js\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../contexts/AuthContext */ \"./contexts/AuthContext.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _ProfileCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProfileCard */ \"./components/resource/subpages/ProfileCard.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction Main() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const { id  } = router.query;\n    const [creator, setCreator] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [commentors, setCommentors] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const commentorsCards = [];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const { id  } = router.query;\n        if (!id) return;\n        const getCreator = async ()=>{\n            const baseURL = \"http://3.89.218.253:8000/app/content/?id=\".concat(id);\n            const res = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(baseURL, {\n                headers: {\n                    Authorization: \"token \".concat(localStorage.getItem(\"token\"))\n                }\n            });\n            setCreator(res.data.owner);\n        };\n        const getCommentors = async ()=>{\n            const baseURL = \"http://3.89.218.253:8000/app/discussion-list/?content_id=\".concat(id);\n            const res = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(baseURL, {\n                headers: {\n                    Authorization: \"token \".concat(localStorage.getItem(\"token\"))\n                }\n            });\n            var peopleIds = [];\n            console.log(\"begin\");\n            for (const comment of res.data.data){\n                console.log(comment.owner.username);\n                commentors.push(comment.owner.id);\n            }\n            console.log(\"end\");\n            setCommentors(peopleIds);\n        };\n        getCreator();\n        getCommentors();\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Box, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                mb: 2,\n                variant: \"h6\",\n                textAlign: \"center\",\n                children: \"Contributors\"\n            }, void 0, false, {\n                fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Card, {\n                sx: {\n                    p: 1.5,\n                    borderRadius: \"16px\",\n                    m: 1\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                        gutterBottom: true,\n                        color: \"text.secondary\"\n                    }, void 0, false, {\n                        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                        lineNumber: 65,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ProfileCard__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        id: creator\n                    }, void 0, false, {\n                        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, this),\n            commentors && commentors.map((person)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Card, {\n                    sx: {\n                        p: 1.5,\n                        borderRadius: \"16px\",\n                        m: 1\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_6__.Typography, {\n                        gutterBottom: true,\n                        color: \"text.secondary\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ProfileCard__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            id: person\n                        }, void 0, false, {\n                            fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                            lineNumber: 73,\n                            columnNumber: 15\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                        lineNumber: 72,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n                    lineNumber: 71,\n                    columnNumber: 11\n                }, this))\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kadir42/Pictures/bounswe2022group1/frontend/components/resource/subpages/Contributors.js\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, this);\n}\n_s(Main, \"z5OIgA3RWsCSK44vb/8Mi6zxd6w=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Main;\nvar _c;\n$RefreshReg$(_c, \"Main\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3Jlc291cmNlL3N1YnBhZ2VzL0NvbnRyaWJ1dG9ycy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUFtQztBQVVaO0FBQ1c7QUFDMEI7QUFDSTtBQUNKO0FBQ2xDO0FBQ2M7QUFDRztBQUNIO0FBRXpCLFNBQVNzQixPQUFPOztJQUM3QixNQUFNQyxTQUFTSixzREFBU0E7SUFDeEIsTUFBTSxFQUFFSyxHQUFFLEVBQUUsR0FBR0QsT0FBT0UsS0FBSztJQUMzQixNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR2YsK0NBQVFBLENBQUMsSUFBSTtJQUMzQyxNQUFNLENBQUNnQixZQUFZQyxjQUFjLEdBQUdqQiwrQ0FBUUEsQ0FBQyxJQUFJO0lBRWpELE1BQU1rQixrQkFBa0IsRUFBRTtJQUUxQmpCLGdEQUFTQSxDQUFDLElBQU07UUFDZCxNQUFNLEVBQUVXLEdBQUUsRUFBRSxHQUFHRCxPQUFPRSxLQUFLO1FBQzNCLElBQUksQ0FBQ0QsSUFBSTtRQUVULE1BQU1PLGFBQWEsVUFBWTtZQUM3QixNQUFNQyxVQUFVLDRDQUErQyxPQUFIUjtZQUM1RCxNQUFNUyxNQUFNLE1BQU1mLGlEQUFTLENBQUNjLFNBQVM7Z0JBQ25DRyxTQUFTO29CQUFFQyxlQUFlLFNBQXVDLE9BQTlCQyxhQUFhQyxPQUFPLENBQUM7Z0JBQVc7WUFDckU7WUFDQVgsV0FBV00sSUFBSU0sSUFBSSxDQUFDQyxLQUFLO1FBQzNCO1FBQ0EsTUFBTUMsZ0JBQWdCLFVBQVk7WUFDaEMsTUFBTVQsVUFBVSw0REFBK0QsT0FBSFI7WUFDNUUsTUFBTVMsTUFBTSxNQUFNZixpREFBUyxDQUFDYyxTQUFTO2dCQUNuQ0csU0FBUztvQkFBRUMsZUFBZSxTQUF1QyxPQUE5QkMsYUFBYUMsT0FBTyxDQUFDO2dCQUFXO1lBQ3JFO1lBQ0EsSUFBSUksWUFBWSxFQUFFO1lBQ2xCQyxRQUFRQyxHQUFHLENBQUM7WUFDWixLQUFLLE1BQU1DLFdBQVdaLElBQUlNLElBQUksQ0FBQ0EsSUFBSSxDQUFFO2dCQUNuQ0ksUUFBUUMsR0FBRyxDQUFDQyxRQUFRTCxLQUFLLENBQUNNLFFBQVE7Z0JBQ2xDbEIsV0FBV21CLElBQUksQ0FBQ0YsUUFBUUwsS0FBSyxDQUFDaEIsRUFBRTtZQUNsQztZQUNBbUIsUUFBUUMsR0FBRyxDQUFDO1lBQ1pmLGNBQWNhO1FBQ2hCO1FBRUFYO1FBQ0FVO0lBQ0YsR0FBRztRQUFDbEI7S0FBTztJQUVYLHFCQUNFLDhEQUFDcEIsOENBQUdBOzswQkFDRiw4REFBQ0YscURBQVVBO2dCQUFDK0MsSUFBSTtnQkFBR0MsU0FBUTtnQkFBS0MsV0FBVTswQkFBUzs7Ozs7OzBCQUduRCw4REFBQzNDLCtDQUFJQTtnQkFBQzRDLElBQUk7b0JBQUVDLEdBQUc7b0JBQUtDLGNBQWM7b0JBQVFDLEdBQUc7Z0JBQUU7O2tDQUM3Qyw4REFBQ3JELHFEQUFVQTt3QkFBQ3NELFlBQVk7d0JBQUNDLE9BQU07Ozs7OztrQ0FDL0IsOERBQUNuQyxvREFBV0E7d0JBQUNHLElBQUlFOzs7Ozs7Ozs7Ozs7WUFHbEJFLGNBQ0NBLFdBQVc2QixHQUFHLENBQUMsQ0FBQ0MsdUJBQ2QsOERBQUNuRCwrQ0FBSUE7b0JBQUM0QyxJQUFJO3dCQUFFQyxHQUFHO3dCQUFLQyxjQUFjO3dCQUFRQyxHQUFHO29CQUFFOzhCQUM3Qyw0RUFBQ3JELHFEQUFVQTt3QkFBQ3NELFlBQVk7d0JBQUNDLE9BQU07a0NBQzdCLDRFQUFDbkMsb0RBQVdBOzRCQUFDRyxJQUFJa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNL0IsQ0FBQztHQTFEdUJwQzs7UUFDUEgsa0RBQVNBOzs7S0FERkciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9yZXNvdXJjZS9zdWJwYWdlcy9Db250cmlidXRvcnMuanM/MjliNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBUeXBvZ3JhcGh5LFxuICBDb250YWluZXIsXG4gIEJveCxcbiAgRGl2aWRlcixcbiAgUGFwZXIsXG4gIEJ1dHRvbixcbiAgQ2FyZCxcbiAgVGV4dEZpZWxkLFxufSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgeyBBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0cy9BdXRoQ29udGV4dFwiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlLCB1c2VQYXJhbXMgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgUmVhY3RNYXJrZG93biBmcm9tIFwicmVhY3QtbWFya2Rvd25cIjtcbmltcG9ydCBQcm9maWxlQ2FyZCBmcm9tIFwiLi9Qcm9maWxlQ2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgeyBpZCB9ID0gcm91dGVyLnF1ZXJ5O1xuICBjb25zdCBbY3JlYXRvciwgc2V0Q3JlYXRvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2NvbW1lbnRvcnMsIHNldENvbW1lbnRvcnNdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgY29uc3QgY29tbWVudG9yc0NhcmRzID0gW107XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB7IGlkIH0gPSByb3V0ZXIucXVlcnk7XG4gICAgaWYgKCFpZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgZ2V0Q3JlYXRvciA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGJhc2VVUkwgPSBgaHR0cDovLzMuODkuMjE4LjI1Mzo4MDAwL2FwcC9jb250ZW50Lz9pZD0ke2lkfWA7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoYmFzZVVSTCwge1xuICAgICAgICBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGB0b2tlbiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9YCB9LFxuICAgICAgfSk7XG4gICAgICBzZXRDcmVhdG9yKHJlcy5kYXRhLm93bmVyKTtcbiAgICB9O1xuICAgIGNvbnN0IGdldENvbW1lbnRvcnMgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBiYXNlVVJMID0gYGh0dHA6Ly8zLjg5LjIxOC4yNTM6ODAwMC9hcHAvZGlzY3Vzc2lvbi1saXN0Lz9jb250ZW50X2lkPSR7aWR9YDtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChiYXNlVVJMLCB7XG4gICAgICAgIGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYHRva2VuICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKX1gIH0sXG4gICAgICB9KTtcbiAgICAgIHZhciBwZW9wbGVJZHMgPSBbXTtcbiAgICAgIGNvbnNvbGUubG9nKFwiYmVnaW5cIik7XG4gICAgICBmb3IgKGNvbnN0IGNvbW1lbnQgb2YgcmVzLmRhdGEuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhjb21tZW50Lm93bmVyLnVzZXJuYW1lKTtcbiAgICAgICAgY29tbWVudG9ycy5wdXNoKGNvbW1lbnQub3duZXIuaWQpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coXCJlbmRcIik7XG4gICAgICBzZXRDb21tZW50b3JzKHBlb3BsZUlkcyk7XG4gICAgfTtcblxuICAgIGdldENyZWF0b3IoKTtcbiAgICBnZXRDb21tZW50b3JzKCk7XG4gIH0sIFtyb3V0ZXJdKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8VHlwb2dyYXBoeSBtYj17Mn0gdmFyaWFudD1cImg2XCIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgIENvbnRyaWJ1dG9yc1xuICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgPENhcmQgc3g9e3sgcDogMS41LCBib3JkZXJSYWRpdXM6IFwiMTZweFwiLCBtOiAxIH19PlxuICAgICAgICA8VHlwb2dyYXBoeSBndXR0ZXJCb3R0b20gY29sb3I9XCJ0ZXh0LnNlY29uZGFyeVwiPjwvVHlwb2dyYXBoeT5cbiAgICAgICAgPFByb2ZpbGVDYXJkIGlkPXtjcmVhdG9yfSAvPlxuICAgICAgPC9DYXJkPlxuXG4gICAgICB7Y29tbWVudG9ycyAmJlxuICAgICAgICBjb21tZW50b3JzLm1hcCgocGVyc29uKSA9PiAoXG4gICAgICAgICAgPENhcmQgc3g9e3sgcDogMS41LCBib3JkZXJSYWRpdXM6IFwiMTZweFwiLCBtOiAxIH19PlxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgZ3V0dGVyQm90dG9tIGNvbG9yPVwidGV4dC5zZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgPFByb2ZpbGVDYXJkIGlkPXtwZXJzb259IC8+XG4gICAgICAgICAgICA8L1R5cG9ncmFwaHk+XG4gICAgICAgICAgPC9DYXJkPlxuICAgICAgICApKX1cbiAgICA8L0JveD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VDb250ZXh0IiwiVHlwb2dyYXBoeSIsIkNvbnRhaW5lciIsIkJveCIsIkRpdmlkZXIiLCJQYXBlciIsIkJ1dHRvbiIsIkNhcmQiLCJUZXh0RmllbGQiLCJmb3JtYXQiLCJBdXRoQ29udGV4dCIsIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VDYWxsYmFjayIsIlJvdXRlcyIsIlJvdXRlIiwidXNlUGFyYW1zIiwiYXhpb3MiLCJ1c2VSb3V0ZXIiLCJSZWFjdE1hcmtkb3duIiwiUHJvZmlsZUNhcmQiLCJNYWluIiwicm91dGVyIiwiaWQiLCJxdWVyeSIsImNyZWF0b3IiLCJzZXRDcmVhdG9yIiwiY29tbWVudG9ycyIsInNldENvbW1lbnRvcnMiLCJjb21tZW50b3JzQ2FyZHMiLCJnZXRDcmVhdG9yIiwiYmFzZVVSTCIsInJlcyIsImdldCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImRhdGEiLCJvd25lciIsImdldENvbW1lbnRvcnMiLCJwZW9wbGVJZHMiLCJjb25zb2xlIiwibG9nIiwiY29tbWVudCIsInVzZXJuYW1lIiwicHVzaCIsIm1iIiwidmFyaWFudCIsInRleHRBbGlnbiIsInN4IiwicCIsImJvcmRlclJhZGl1cyIsIm0iLCJndXR0ZXJCb3R0b20iLCJjb2xvciIsIm1hcCIsInBlcnNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/resource/subpages/Contributors.js\n"));

/***/ })

});