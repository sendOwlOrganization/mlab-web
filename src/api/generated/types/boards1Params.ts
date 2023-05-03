/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { Pageable } from "./pageable";

export type Boards1Params = {
  /**
   * 게시글의 카테고리 id
   */
  categoryId: number;
  /**
   * 게시글 제목의 글자수 제한
   */
  textLength: number;
  /**
   * 페이지네이션을 위한 옵션
   */
  pageable: Pageable;
};
