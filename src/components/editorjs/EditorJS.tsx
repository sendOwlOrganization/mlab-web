import { LogLevels, OutputData, default as _EditorJS } from "@editorjs/editorjs"
import { useEffect, useRef } from "react"
import { i18nKorean } from "./i18n"
import { EDITOR_JS_TOOLS } from "./plugins"

interface EditorJSProps {
  /**
   * Editor.js 데이터 객체
   */
  data: OutputData
  /**
   * 데이터 객체가 바뀔 때 실행되는 콜백. 콜백이 없으면 에디터가 읽기전용
   * @param data
   */
  onChangeData?: (data: OutputData) => void
}

/**
 * Editor.js 래핑 컴포넌트, `next/dynamic` + `{ ssr: false }`으로 불러와주세요
 */
const EditorJS = ({ data, onChangeData }: EditorJSProps) => {
  const editor = useRef<_EditorJS | null>(null)

  useEffect(() => {
    if (editor.current) {
      return
    }

    editor.current = new _EditorJS({
      holder: "editorjs",
      data: data,
      logLevel: "ERROR" as LogLevels,
      placeholder: "새로운 소식이나 나누고 싶은 이야기를 적어주세요",
      i18n: i18nKorean,
      onChange: async (api) => {
        const content = await api.saver.save()
        onChangeData?.(content)
      },
      onReady() {
        console.log("Editor.js loaded")
      },
      readOnly: !onChangeData,
      tools: EDITOR_JS_TOOLS,
      inlineToolbar: ["bold", "italic", "underline", "link", "marker", "inlineCode"]
    })

    return () => {
      editor.current?.destroy?.()
    }
  }, [data, onChangeData])

  return <div id={"editorjs"} />
}

export default EditorJS
