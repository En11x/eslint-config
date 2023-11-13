import fs from "fs";
import { ConfigItem, OptionsConfig } from "./types";
import gitignore from 'eslint-config-flat-gitignore'
import { combine } from "./utils";
import { ignores, perfectionist, typescript } from "./config";
import { isPackageExists } from "local-pkg";

export function Zeus(options:OptionsConfig = {},...useCongigs:(ConfigItem|ConfigItem[])[]){
  const {componentExts=[],gitignore:enableGitignore = true,overrides={},typescript:enableTypescript = isPackageExists('typescript')} =options

  const configs:ConfigItem[][] = []

  if(enableGitignore){
    if(typeof enableGitignore !== 'boolean'){
    configs.push([gitignore(enableGitignore)])
    }else{
      if(fs.existsSync('.gitignore')){
        configs.push([gitignore()])
      }
    }
  }

  //base configs
  configs.push(
    ignores(),

    perfectionist()
  )

  if(enableTypescript){
    configs.push(typescript({
      ...typeof enableTypescript !=='boolean'?enableTypescript:{},
      componentExts,
      overrides:overrides.typescript
    }))
  }

  return combine(...configs,...useCongigs)
}
