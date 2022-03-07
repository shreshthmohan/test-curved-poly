/* global document canvg window */

import { select } from 'd3'
import { roundedPolygonByCircumRadius } from '../esm'

const svg = select('body')
  .append('svg')
  .attr('width', 400)
  .attr('height', 400)
  .attr('viewBox', '0 0 400 400')
  .style('border', '1px solid gray')

const dForPolygon = roundedPolygonByCircumRadius({
  circumRadius: 200,
  sideCount: 6,
  borderRadius: 30,
  cx: 200,
  cy: 200,
})

svg
  .append('clipPath')
  .attr('id', 'curved-poly')
  .append('path')
  .attr('d', dForPolygon)
// .attr('fill', '#eee')
// .attr('stroke', 'gray')
// .attr('stroke-width', 5)

svg
  .append('image')
  .attr('href', './image.jpg')
  .attr('clip-path', 'url(#curved-poly)')
  .attr('width', 400)
  .attr('height', 400)
  .attr('x', 0)
  .attr('y', 0)

svg.append('path').attr('d', dForPolygon).attr('fill', 'none')

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const svgo = svg.node().outerHTML
const v = canvg.Canvg.fromString(ctx, svgo)

// Start SVG rendering with animations and mouse handling.
v.start()

window.downloadImage = () => {
  var link = document.createElement('a')
  link.download = 'filename.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
