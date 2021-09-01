module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  Object(_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_BasicsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/BasicsPage */ "flarum/components/BasicsPage");
/* harmony import */ var flarum_components_BasicsPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_BasicsPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_registerWidget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/registerWidget */ "./src/common/registerWidget.js");



app.initializers.add('webbinaro/flarum-calendar', function () {
  Object(_common_registerWidget__WEBPACK_IMPORTED_MODULE_2__["default"])(app);
  app.extensionData["for"]('webbinaro-calendar')
  /*.registerSetting(
    {
      setting: 'some-key', // This is the key the settings will be saved under in the settings table in the database.
      label: app.translator.trans('flarum-calendar.admin.title'), // The label to be shown letting the admin know what the setting does.
      type: 'boolean', // What type of setting this is, valid options are: boolean, text (or any other <input> tag type), and select.
    },
    30 // Optional: Priority
  )*/
  .registerPermission({
    icon: 'fas fa-calendar',
    // Font-Awesome Icon
    label: app.translator.trans('flarum-calendar.admin.permissions.view'),
    // Permission Label
    permission: 'event.view',
    // Actual permission name stored in database (and used when checking permission).
    allowGuest: true
  }, 'view', // Category permission will be added to on the grid
  95 // Optional: Priority
  ).registerPermission({
    icon: 'fas fa-calendar-plus',
    // Font-Awesome Icon
    label: app.translator.trans('flarum-calendar.admin.permissions.add'),
    // Permission Label
    permission: 'event.create' // Actual permission name stored in database (and used when checking permission).

  }, 'start', // Category permission will be added to on the grid
  95 // Optional: Priority
  ).registerPermission({
    icon: 'fas fa-calendar-times',
    // Font-Awesome Icon
    label: app.translator.trans('flarum-calendar.admin.permissions.moderate'),
    // Permission Label
    permission: 'event.moderate' // Actual permission name stored in database (and used when checking permission).

  }, 'moderate', // Category permission will be added to on the grid
  95 // Optional: Priority
  );
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_BasicsPage__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'homePageItems', function (items) {
    items.add('events', {
      path: '/events',
      label: app.translator.trans('flarum-calendar.admin.basics.homepage')
    });
  });
});

/***/ }),

/***/ "./src/common/components/EventsWidget.js":
/*!***********************************************!*\
  !*** ./src/common/components/EventsWidget.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventsWidget; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_extensions_afrux_forum_widgets_core_common_components_Widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extensions/afrux-forum-widgets-core/common/components/Widget */ "flarum/extensions/afrux-forum-widgets-core/common/components/Widget");
/* harmony import */ var flarum_extensions_afrux_forum_widgets_core_common_components_Widget__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extensions_afrux_forum_widgets_core_common_components_Widget__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Separator */ "flarum/common/components/Separator");
/* harmony import */ var flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_4__);


/*
 * This file is part of justoverclock/last-tweet.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */





var EventsWidget = /*#__PURE__*/function (_Widget) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EventsWidget, _Widget);

  function EventsWidget() {
    return _Widget.apply(this, arguments) || this;
  }

  var _proto = EventsWidget.prototype;

  _proto.oninit = function oninit(vnode) {
    _Widget.prototype.oninit.call(this, vnode);

    this.loading = true;
  };

  _proto.oncreate = function oncreate(vnode) {
    var _this = this;

    var todayDate = new Date().toISOString().slice(0, 10);
    var NextDayEvents = new Date();
    NextDayEvents.setDate(NextDayEvents.getDate() + 1);
    NextDayEvents = NextDayEvents.toISOString().slice(0, 10);
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default.a.store.find('events', {
      allDay: true,
      start: todayDate,
      end: NextDayEvents
    }).then(function (results) {
      _this.events = results;
      console.log(results);
      _this.loading = false;
      m.redraw();
    });
  };

  _proto.className = function className() {
    return 'events-widget';
  };

  _proto.icon = function icon() {
    // Widget icon.
    return 'far fa-calendar';
  };

  _proto.title = function title() {
    // Widget title.
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_2___default.a.translator.trans('flarum-calendar.forum.widget-title');
  };

  _proto.content = function content() {
    if (this.loading) {
      return m(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3___default.a, null);
    }

    return m("div", {
      className: "events-widget-content"
    }, m("ul", {
      className: "CustomEventsList fa-ul"
    }, this.events.map(function (event) {
      return m("li", null, m("i", {
        className: "far fa-calendar-alt"
      }), event.event_start().toISOString().slice(0, 10), m("br", null), m("i", {
        className: "far fa-check-square"
      }), event.description(), flarum_common_components_Separator__WEBPACK_IMPORTED_MODULE_4___default.a.component());
    })));
  };

  return EventsWidget;
}(flarum_extensions_afrux_forum_widgets_core_common_components_Widget__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/common/registerWidget.js":
/*!**************************************!*\
  !*** ./src/common/registerWidget.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extensions_afrux_forum_widgets_core_common_extend_Widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets */ "flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets");
/* harmony import */ var flarum_extensions_afrux_forum_widgets_core_common_extend_Widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extensions_afrux_forum_widgets_core_common_extend_Widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_EventsWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/EventsWidget */ "./src/common/components/EventsWidget.js");


/* harmony default export */ __webpack_exports__["default"] = (function (app) {
  new flarum_extensions_afrux_forum_widgets_core_common_extend_Widgets__WEBPACK_IMPORTED_MODULE_0___default.a().add({
    key: 'CalEvents',
    component: _components_EventsWidget__WEBPACK_IMPORTED_MODULE_1__["default"],
    isDisabled: false,
    isUnique: true,
    placement: 'end',
    position: 1
  }).extend(app, 'webbinaro-calendar');
});
;

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Separator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['common/components/Separator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Separator'];

/***/ }),

/***/ "flarum/components/BasicsPage":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/BasicsPage']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/BasicsPage'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/extensions/afrux-forum-widgets-core/common/components/Widget":
/*!*****************************************************************************************************!*\
  !*** external "flarum.core.compat['extensions/afrux-forum-widgets-core/common/components/Widget']" ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extensions/afrux-forum-widgets-core/common/components/Widget'];

/***/ }),

/***/ "flarum/extensions/afrux-forum-widgets-core/common/extend/Widgets":
/*!**************************************************************************************************!*\
  !*** external "flarum.core.compat['extensions/afrux-forum-widgets-core/common/extend/Widgets']" ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extensions/afrux-forum-widgets-core/common/extend/Widgets'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/app'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map