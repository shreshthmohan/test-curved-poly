self.testCurvedPoly = (function (exports) {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // TODO alt function with input  circumCircleRadius instead of sideLength
  var PI = Math.PI; // returns the d attribute used for SVG <path> element

  function roundedPolygonBySideLength(_ref) {
    var sideLength = _ref.sideLength,
        _ref$sideCount = _ref.sideCount,
        sideCount = _ref$sideCount === void 0 ? 3 : _ref$sideCount,
        _ref$borderRadius = _ref.borderRadius,
        borderRadius = _ref$borderRadius === void 0 ? 0 : _ref$borderRadius,
        _ref$cx = _ref.cx,
        cx = _ref$cx === void 0 ? 0 : _ref$cx,
        _ref$cy = _ref.cy,
        cy = _ref$cy === void 0 ? 0 : _ref$cy;

    var _polygonSideToCircleR = polygonSideToCircleRadius({
      sideLength: sideLength,
      sideCount: sideCount
    }),
        r = _polygonSideToCircleR.circumcircleRadius,
        alpha = _polygonSideToCircleR.angleIntendedBySide; // polygon on which the centres of border circles lie


    var radiusOfInnerPolygon = r - borderRadius / Math.cos(alpha / 2);
    var allPoints = getAllPointsOnCurvedPolygon({
      sideCount: sideCount,
      radiusOfInnerPolygon: radiusOfInnerPolygon,
      borderRadius: borderRadius,
      alpha: alpha,
      cx: cx,
      cy: cy
    });
    var dForPath = pointsToDForPath({
      allPoints: allPoints,
      borderRadius: borderRadius,
      alpha: alpha
    });
    return dForPath;
  } // returns d attribute used in the SVG <path> element

  function pointsToDForPath(_ref2) {
    var allPoints = _ref2.allPoints,
        borderRadius = _ref2.borderRadius,
        alpha = _ref2.alpha;
    // M move to first point
    // A draw elleptical arc to point
    // L draw straight line to point
    if (!allPoints.length) return '';
    return "M ".concat(allPoints[0].join(' '), "\n    ").concat(allPoints.slice(1).map(function (p, i) {
      return i % 2 === 0 ? "A ".concat(borderRadius, " ").concat(borderRadius, " ").concat(alpha, " 0 0 ").concat(p.join(' ')) : "L ".concat(p.join(' '));
    }).join(' '), "\n    z\n    ");
  }

  function getAllPointsOnCurvedPolygon(_ref3) {
    var sideCount = _ref3.sideCount,
        radiusOfInnerPolygon = _ref3.radiusOfInnerPolygon,
        borderRadius = _ref3.borderRadius,
        alpha = _ref3.alpha,
        _ref3$cx = _ref3.cx,
        cx = _ref3$cx === void 0 ? 0 : _ref3$cx,
        _ref3$cy = _ref3.cy,
        cy = _ref3$cy === void 0 ? 0 : _ref3$cy;
    var allPoints = [];

    for (var i = 0; i < sideCount; i++) {
      var curveStartPoint = addPolarPointVectorsAndConvertToCartesian([i * alpha + alpha / 2, radiusOfInnerPolygon], [i * alpha, borderRadius]);
      var curveEndPoint = addPolarPointVectorsAndConvertToCartesian([i * alpha + alpha / 2, radiusOfInnerPolygon], [(i + 1) * alpha, borderRadius]);
      allPoints.push(curveStartPoint, curveEndPoint);
    }

    var allShiftedPoints = allPoints.map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          x = _ref5[0],
          y = _ref5[1];

      return [x + cx, y + cy];
    });
    return allShiftedPoints;
  }

  function polygonSideToCircleRadius(_ref6) {
    var sideLength = _ref6.sideLength,
        sideCount = _ref6.sideCount;
    // angle intended by size of polygon onto the circumscribed circle
    // unit: radians
    // alias: alpha
    var angleIntendedBySide = 2 * PI / sideCount;
    var circumcircleRadius = sideLength / (2 * Math.sin(angleIntendedBySide / 2));
    return {
      circumcircleRadius: circumcircleRadius,
      angleIntendedBySide: angleIntendedBySide
    };
  } // Did not keep it in polar, because the calculation gets complicated


  function addPolarPointVectorsAndConvertToCartesian(p1, p2) {
    // angle 0 corresponds to 12 o'clock
    var _p = _slicedToArray(p1, 2),
        a1 = _p[0],
        r1 = _p[1];

    var _p2 = _slicedToArray(p2, 2),
        a2 = _p2[0],
        r2 = _p2[1];

    var y1 = r1 * Math.cos(a1);
    var y2 = r2 * Math.cos(a2);
    var x1 = r1 * Math.sin(a1);
    var x2 = r2 * Math.sin(a2);
    return [x1 + x2, y1 + y2];
  }

  exports.roundedPolygonBySideLength = roundedPolygonBySideLength;

  return exports;

})({});
