/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { ListRes } from "./listRes"
import type { PageableObject } from "./pageableObject"

export interface BoardsRes {
  boards?: ListRes[]
  totalElement?: number
  totalPages?: number
  pageable?: PageableObject
}
