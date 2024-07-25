import { readFile } from 'node:fs/promises'

export async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context)
  if (!/unplugin-vue-components\/dist\/chunk-/.test(url))
    return result

  let source = await readFile(new URL(result.responseURL ?? url), { encoding: 'utf-8' })
  source = source
    .replace(/\$\{head\}`/, `\`
if (Object.keys(declarations.component).length > 0) {
  code += \`
declare global {
  \${declarations.component.map(i=> i.replace(/^(.*):/, (_, key) =>\`const \${key} = {} as\`)).join("\\n  ")}
}
\`;
  declarations.component = []
  code += head
}
`)
    .replace(/(?=const parsedFilePath)/, `
for (const extension of options.extensions){
  filePath = filePath.replace(new RegExp(\`(\.\${extension}$)\`), '')
}
`)

  return {
    ...result,
    source,
  }
}
