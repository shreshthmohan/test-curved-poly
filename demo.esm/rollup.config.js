import resolve from '@rollup/plugin-node-resolve'

export default {
  input: './index.js',
  output: [
    {
      file: './bundle.js',
      format: 'umd',
      name: 'curved-poly', // use this global var when using in the browser
      // globals: {
      //   'lodash-es': '_',
      //   'd3': 'd3',
      //   // when UMD script accesses sankey it's done as d3.sankey
      //   'd3-sankey': 'd3',
      //   'topojson': 'topojson',
      // },
    },
    // not sure if cjs will work if d3 doesn't support cjs
    // { file: 'dist/bundle.cjs.js', format: 'cjs' },
  ],
  plugins: [resolve()],
}
