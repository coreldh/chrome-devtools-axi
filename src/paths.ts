import { extname, isAbsolute, resolve } from "node:path";

/**
 * Resolve local output paths against the invoking CLI's current directory
 * before they are sent to the bridge. Absolute paths pass through unchanged.
 */
export function resolveOutputPath(filePath: string): string {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
}

/**
 * Resolve the path that chrome-devtools-mcp writes for a screenshot. The MCP
 * replaces any existing extension with the extension for the selected format.
 */
export function resolveScreenshotOutputPath(
  filePath: string,
  format: string | undefined,
): string {
  const resolved = resolveOutputPath(filePath);
  const currentExtension = extname(resolved);
  const extension =
    format === "jpeg" ? ".jpeg" : format === "webp" ? ".webp" : ".png";
  return `${resolved.slice(0, resolved.length - currentExtension.length)}${extension}`;
}
