import { roundedPolygonBySideLength } from 'test-curved-poly'

import { select } from 'd3'

const svg = select('body').append('svg').attr('width', 800).attr('height', 600)

const dForTriangle = roundedPolygonBySideLength({
  sideLength: 150,
  sideCount: 3,
  borderRadius: 20,
  cx: 400,
  cy: 300,
})

svg
  .append('path')
  .attr('d', dForTriangle)
  .attr('fill', '#eee')
  .attr('stroke', 'gray')
