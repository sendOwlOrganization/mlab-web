/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { EditorJsContent } from "./editorJsContent"

export interface UpdateBoardReq {
  /** 게시글 id */
  boardId?: number
  /** 게시글 제목 */
  title: string
  editorJsContent?: EditorJsContent
  /** 카테고리 id */
  categoryId: number
}
