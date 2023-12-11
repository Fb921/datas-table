import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'

export default {
    input: "src/index.js",
    output:[
      {
         file: 'dist/index.js',
         format: 'cjs'
      },{
         file: "dist/index.es.js",
         format:"es",
         exports: 'named',
      }
   ],
   external: ['react'],
   plugins: [
      postcss({
         plugins: [],
         minimize: true,
     }),
     svg(),
     resolve(),
     babel({
         exclude: 'node_modules/**',
         presets: ['@babel/preset-react']
     })
   ]
}