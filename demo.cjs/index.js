var curvedPoly = require('test-curved-poly')

var d = curvedPoly.roundedPolygonBySideLength({
  sideLength: 150,
  sideCount: 3,
  borderRadius: 20,
  cx: 400,
  cy: 300,
})
console.log(d)
