/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */

export interface CommentReq {
  /** 게시글 id */
  boardId?: number;
  /** 부모 댓글 id */
  parentId?: number | null;
  /** 댓글 내용 */
  content?: string;
}