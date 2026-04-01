import * as React from "react"
import Editor from "@monaco-editor/react"
import { cn } from "#/lib/utils"

// ---------- Types ----------

type FileNode = {
  name: string
  children?: FileNode[]
}

interface CodeEditorProps {
  /** Tree of files and folders. Leaf nodes (no `children`) are files. */
  files: FileNode[]
  /**
   * Map of file path to its content.
   * Paths are built by joining node names with "/" (e.g. `"src/index.ts"`).
   */
  contents: Record<string, string>
  /** Initially selected file path */
  defaultSelectedFile?: string
  className?: string
}

// ---------- Helpers ----------

function inferLanguage(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? ""
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "typescript",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    md: "markdown",
    css: "css",
    scss: "scss",
    html: "html",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
    py: "python",
    rb: "ruby",
    go: "go",
    rs: "rust",
    java: "java",
    sql: "sql",
    sh: "shell",
    bash: "shell",
    zsh: "shell",
    graphql: "graphql",
    svg: "xml",
    toml: "ini",
    env: "ini",
  }
  return map[ext] ?? "plaintext"
}

function getFileIcon(name: string, isFolder: boolean, isOpen: boolean) {
  if (isFolder) {
    return isOpen ? (
      <FolderOpenIcon className="size-4 shrink-0 text-amber-400" />
    ) : (
      <FolderIcon className="size-4 shrink-0 text-amber-400" />
    )
  }
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  const colors: Record<string, string> = {
    ts: "text-blue-400",
    tsx: "text-blue-400",
    js: "text-yellow-400",
    jsx: "text-yellow-400",
    json: "text-yellow-600",
    css: "text-purple-400",
    html: "text-orange-400",
    md: "text-gray-400",
    py: "text-green-400",
  }
  return <FileIcon className={cn("size-4 shrink-0", colors[ext] ?? "text-gray-400")} />
}

// ---------- Inline SVG icons ----------

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      className={cn("size-3 shrink-0 transition-transform", open && "rotate-90", className)}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  )
}

function FolderOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v1H8.5a2.5 2.5 0 00-2.4 1.8L4 16H4a2 2 0 01-2-2V6z"
        clipRule="evenodd"
      />
      <path d="M6 12.8A1.5 1.5 0 017.5 11H18l-2.5 5H4l2-3.2z" />
    </svg>
  )
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

// ---------- Tree item ----------

function TreeItem({
  node,
  path,
  depth,
  selectedFile,
  expandedFolders,
  onSelectFile,
  onToggleFolder,
}: {
  node: FileNode
  path: string
  depth: number
  selectedFile: string | null
  expandedFolders: Set<string>
  onSelectFile: (path: string) => void
  onToggleFolder: (path: string) => void
}) {
  const isFolder = !!node.children
  const isOpen = expandedFolders.has(path)
  const isSelected = selectedFile === path

  return (
    <div>
      <button
        type="button"
        onClick={() => (isFolder ? onToggleFolder(path) : onSelectFile(path))}
        className={cn(
          "flex w-full items-center gap-1 py-[3px] pr-3 text-left text-[13px] leading-snug hover:bg-white/8",
          isSelected && !isFolder && "bg-white/12 text-white",
          !isSelected && "text-neutral-300"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isFolder ? (
          <ChevronIcon open={isOpen} className="text-neutral-500" />
        ) : (
          <span className="w-3" />
        )}
        {getFileIcon(node.name, isFolder, isOpen)}
        <span className="truncate">{node.name}</span>
      </button>

      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child) => {
            const childPath = path ? `${path}/${child.name}` : child.name
            return (
              <TreeItem
                key={childPath}
                node={child}
                path={childPath}
                depth={depth + 1}
                selectedFile={selectedFile}
                expandedFolders={expandedFolders}
                onSelectFile={onSelectFile}
                onToggleFolder={onToggleFolder}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// ---------- Main component ----------

function CodeEditor({ files, contents, defaultSelectedFile, className }: CodeEditorProps) {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(
    defaultSelectedFile ?? null
  )
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(() => {
    // Auto-expand root-level folders
    const initial = new Set<string>()
    for (const node of files) {
      if (node.children) initial.add(node.name)
    }
    return initial
  })

  const toggleFolder = React.useCallback((path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  const fileContent = selectedFile ? (contents[selectedFile] ?? "") : ""
  const language = selectedFile ? inferLanguage(selectedFile) : "plaintext"
  const fileName = selectedFile?.split("/").pop() ?? null

  return (
    <div
      data-slot="code-editor"
      className={cn(
        "flex overflow-hidden rounded-lg border border-neutral-700 bg-[#1e1e1e]",
        className
      )}
    >
      {/* Sidebar */}
      <div className="flex w-56 shrink-0 flex-col border-r border-neutral-700 bg-[#252526]">
        <div className="px-4 py-2 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
          Explorer
        </div>
        <nav className="flex-1 overflow-y-auto pb-2">
          {files.map((node) => {
            const path = node.name
            return (
              <TreeItem
                key={path}
                node={node}
                path={path}
                depth={0}
                selectedFile={selectedFile}
                expandedFolders={expandedFolders}
                onSelectFile={setSelectedFile}
                onToggleFolder={toggleFolder}
              />
            )
          })}
        </nav>
      </div>

      {/* Editor pane */}
      <div className="flex flex-1 flex-col">
        {/* Tab bar */}
        {fileName && (
          <div className="flex items-center border-b border-neutral-700 bg-[#2d2d2d]">
            <div className="flex items-center gap-1.5 border-b-2 border-blue-500 bg-[#1e1e1e] px-3 py-1.5 text-[13px] text-neutral-200">
              {getFileIcon(fileName, false, false)}
              <span>{fileName}</span>
            </div>
          </div>
        )}

        {/* Monaco */}
        <div className="flex-1">
          {selectedFile ? (
            <Editor
              theme="vs-dark"
              language={language}
              value={fileContent}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 13,
                lineNumbers: "on",
                renderLineHighlight: "none",
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
                padding: { top: 12 },
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-500">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { CodeEditor }
export type { CodeEditorProps, FileNode }
