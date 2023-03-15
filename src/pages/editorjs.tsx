import { OutputData } from "@editorjs/editorjs"
import dynamic from "next/dynamic"
import { Suspense, useState } from "react"

const EditorJS = dynamic(() => import("@/components/editorjs/EditorJS"), {
  ssr: false,
  suspense: true
})

const EditorjsPage = () => {
  const [data, setData] = useState<OutputData>({ time: new Date().getTime(), blocks: [] })

  console.log(data)

  return (
    <>
      <Suspense fallback={""}>
        <EditorJS data={data} onChangeData={setData} />
      </Suspense>
    </>
  )
}

export default EditorjsPage
