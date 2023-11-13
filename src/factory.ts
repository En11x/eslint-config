import fs from "fs";
import { ConfigItem, OptionsConfig } from "./types";
import gitignore from 'eslint-config-flat-gitignore'
import { combine } from "./utils";
import { ignores, perfectionist } from "./config";

export function Zeus(options:OptionsConfig = {},...useCongigs:(ConfigItem|ConfigItem[])[]){
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

  //base configs
  configs.push(
    ignores(),

    perfectionist()
  )

  return combine(...configs,...useCongigs)
}
