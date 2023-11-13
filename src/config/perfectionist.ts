import { pluginPerfectionist } from "../plugins";
import { ConfigItem } from "src/types";

export function perfectionist():ConfigItem[]{
  return [{
    name: 'Zeus:perfectionist',
    plugins:{
      perfectionist:pluginPerfectionist
    }
  }]
}
