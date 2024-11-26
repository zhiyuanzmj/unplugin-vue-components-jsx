import type { Options } from 'unplugin-vue-components'
import { createPlugin } from 'ts-macro'

const plugin = createPlugin<Options | undefined>(({ ts }, options) => {
  const currentDirectory = ts.sys.getCurrentDirectory()
  const dts = typeof options?.dts === 'string' ? options.dts : `${ts.sys.getCurrentDirectory()}/components.d.ts`
  function getComponents() {
    const configContent = ts.sys.readFile(dts)
    if (!configContent)
      return
    const ast = ts.createSourceFile(dts, configContent, 99 as typeof import('typescript').ScriptTarget.Latest)
    const result: Record<string, string> = {}
    function collect(node: import('typescript').Node, name: string) {
      if (ts.isIndexedAccessTypeNode(node) && ts.isImportTypeNode(node.objectType)) {
        const { indexType, objectType } = node
        result[name] = `import { ${getText(indexType, ast, ts).slice(1, -1)} as ${name} } from ${getText(objectType.argument, ast, ts)}`
      }
    }

    ts.forEachChild(ast, (node) => {
      if (ts.isModuleDeclaration(node) && node.body && ts.isModuleBlock(node.body)) {
        node.body.statements.forEach((statement) => {
          if (getText(node.name, ast, ts) === 'global') {
            if (ts.isVariableStatement(statement)) {
              ts.forEachChild(statement.declarationList, (declaration) => {
                if (ts.isVariableDeclaration(declaration)
                  && declaration.initializer
                  && ts.isAsExpression(declaration.initializer)
                ) {
                  collect(declaration.initializer.type, getText(declaration.name, ast, ts))
                }
              })
            }
          }
          else if (ts.isInterfaceDeclaration(statement) && getText(statement.name, ast, ts) === 'GlobalComponents') {
            statement.members.forEach((member) => {
              if (ts.isPropertySignature(member) && member.type) {
                collect(member.type, getText(member.name, ast, ts))
              }
            })
          }
        })
      }
    })
    return result
  }

  let watched = false
  let components: Record<string, string> | undefined
  return {
    name: 'ts-macro-components-jsx',
    resolveVirtualCode({ codes, ast }) {
      if (!watched) {
        components = getComponents()
        ts.sys.watchFile?.(dts, () => {
          components = getComponents()
        })
        watched = true
      }
      if (!components)
        return
      const nodes: string[] = []
      const imports: string[] = []
      function walk(node: import('typescript').Node) {
        if (ts.isImportDeclaration(node)
          && node.importClause
          && ts.isImportClause(node.importClause)
        ) {
          if (node.importClause.name) {
            imports.push(getText(node.importClause.name, ast, ts))
          }
          else if (node.importClause.namedBindings && ts.isNamedImportBindings(node.importClause.namedBindings)) {
            if (ts.isNamespaceImport(node.importClause.namedBindings)) {
              imports.push(getText(node.importClause.namedBindings.name, ast, ts))
            }
            else {
              node.importClause.namedBindings.elements.forEach((element) => {
                imports.push(getText(element.name, ast, ts))
              })
            }
          }
        }

        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const name = node.tagName.getText(ast)
          if (components?.[name] && !imports.includes(name)) {
            nodes.push(components[name].replace('./', `${currentDirectory}/`))
          }
        }
        ts.forEachChild(node, walk)
      }
      ts.forEachChild(ast, walk)

      if (nodes.length)
        codes.splice(1, 0, nodes.join(';\n'))
    },
  }
})

export default plugin

function getStart(
  node:
    | import('typescript').Node
    | import('typescript').NodeArray<import('typescript').Node>,
  ast: import('typescript').SourceFile,
  ts: typeof import('typescript'),
): number {
  return (ts as any).getTokenPosOfNode(node, ast)
}

function getText(
  node: import('typescript').Node,
  ast: import('typescript').SourceFile,
  ts: typeof import('typescript'),
): string {
  return ast!.text.slice(getStart(node, ast, ts), node.end)
}
