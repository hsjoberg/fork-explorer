import "styled-components";
import { ITheme } from "./index.ts";

declare module "https://esm.sh/styled-component" {
  // deno-lint-ignore no-empty-interface
  export interface DefaultTheme extends ITheme {}
}
