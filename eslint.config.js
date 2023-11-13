// @ts-check
import Zeus from './dist/index.js'

const config =  Zeus(
  {
    gitignore:true
  },
  {
    files:['src/**/*.ts'],
    rules:{
      'perfectionist/sort-objects': 'error',  //对象key排序
    }
  }
)

console.log(config,'eslint')

export default config
