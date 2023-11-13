import { GLOB_EXCLUDE } from "src/globs";
import { ConfigItem } from "src/types";

export function ignores():ConfigItem[]{
  return [
    {
      ignores:GLOB_EXCLUDE
    }
  ]
}
