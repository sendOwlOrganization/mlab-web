/**
 * Generated by orval v6.12.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { UserSelfResGender } from "./userSelfResGender";

export interface UserSelfRes {
  id?: number;
  nickName?: string;
  mbti?: string;
  gender?: UserSelfResGender;
  age?: number;
  email?: string;
  profileImage?: string;
  introduction?: string;
}
