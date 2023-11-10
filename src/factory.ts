import { OptionsConfig } from "./types";
import gitignore from 'eslint-config-flat-gitignore'

export function Zeus(options:OptionsConfig = {}){
  const {gitignore:enableGitignore = true} =options

  const configs:any = []

  if(enableGitignore){
    configs.push([gitignore()])
  }

  return configs.flat()
}
