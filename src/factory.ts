import fs from "fs";
import { ConfigItem, OptionsConfig } from "./types";
import gitignore from 'eslint-config-flat-gitignore'

export function Zeus(options:OptionsConfig = {}){
  const {gitignore:enableGitignore = true} =options

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

  return configs.flat()
}
