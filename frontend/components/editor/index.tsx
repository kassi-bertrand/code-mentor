// This component defines the "Playground". It is the place
// where the user sees their generated exercises, alongside
// the code editor
"use client"

import { useState, useEffect, useRef } from "react"
import monaco from "monaco-editor"
import Editor, { BeforeMount, OnMount } from "@monaco-editor/react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { User } from "@/lib/types"
import { ImperativePanelHandle } from "react-resizable-panels"
import { CodeXml, Plus, Swords, Terminal } from "lucide-react"
import Button from "../ui/customButton"

// TODO: This component needs three props
//  - Information about the playground itself
//  - Starter code?
export default function Playground({
  userData,
}: {
  userData: User
}){

  // File states?
  const [activeFileId, setActiveFileId] = useState<string>("")
  const [activeFileContent, setActiveFileContent] = useState("")

  // Monaco code editor state
  const [editorLanguage, setEditorLanguage] = useState("plaintext")
  const [cursorLine, setCursorLine] = useState(0)
  const [editorRef, setEditorRef] = useState<monaco.editor.IStandaloneCodeEditor>()

  // Refs for libraries / features
  const editorContainerRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<typeof monaco | null>(null)
  const generateRef = useRef<HTMLDivElement>(null)
  const generateWidgetRef = useRef<HTMLDivElement>(null)
  const previewPanelRef = useRef<ImperativePanelHandle>(null)
  const editorPanelRef = useRef<ImperativePanelHandle>(null)

  // Pre-mount editor keybindings
  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.addKeybindingRules([
      {
        keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG,
        command: "null",
      },
    ])
  }

  // Post-mount editor keybindings and actions
  const handleEditorMount: OnMount = (editor, monaco) => {
    setEditorRef(editor)
    monacoRef.current = monaco

    editor.onDidChangeCursorPosition((e) => {
      const { column, lineNumber } = e.position
      if (lineNumber === cursorLine) return
      setCursorLine(lineNumber)

      const model = editor.getModel()
      const endColumn = model?.getLineContent(lineNumber).length || 0
    })

    editor.onDidBlurEditorText((e) => {
    })
  }

  return(
    <ResizablePanelGroup direction="horizontal" className="h-screen bg-gray-200">
      <ResizablePanel defaultSize={50} className="bg-white m-1 rounded-md">

        <div className="bg-gray-50 p-1 flex justify-between items-center">
          <div className="flex divide-x divide-gray-300/50">
            <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
              <Swords className="mr-1 h-5 w-5" color="#3a88fe"/> Challenge
            </Button>

            <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
              <Plus className="h-5 w-5" color="#aaaaaa"/>
            </Button>
          </div>
        </div>
        {/* Problem description panel */}
        <div className="h-full p-4 overflow-auto">
          Problem statement comes here.
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75} minSize={30} className="bg-white m-1 rounded-md">
            {/* Code editor panel */}
            <div className="h-full">
              <div className="bg-gray-50 p-1 flex justify-between items-center">
                <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
                  <CodeXml className="mr-1 h-5 w-5" color="#02b028"/> Code
                </Button>
              </div>
              <Editor
                height="calc(100% - 40px)"
                language={editorLanguage}
                value={activeFileContent}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorMount}
                options={{
                  tabSize: 4,
                  minimap:{
                    enabled: false
                  },
                  padding: {
                    bottom: 4,
                    top: 4
                  },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  fixedOverflowWidgets: true,
                  fontFamily: "var(--font-geist-mono)"
                }}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25} className="bg-white m-1 rounded-md">
            {/* Terminal panel */}
            <div className="h-full">
              <div className="bg-gray-50 p-1 flex justify-between items-center">
                <Button className="bg-transparent px-2 py-1 hover:bg-gray-200 ">
                  <Terminal className="mr-1 h-5 w-5" color="#02b028"/> Terminal
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
