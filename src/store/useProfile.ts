import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

interface Profile {
  id: number;
  nickName: string;
  email: string;
  mbti: Mbti | string;
  gender: "MALE" | "FEMALE" | "OTHER";
  age: number;
  profileImage: string;
  introduction: string;
}

const profileStore = atom<Partial<Profile> | null>({
  key: "profile",
  default: null
});

export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileStore);

  const logout = useCallback(() => {
    AuthorizationUtil.saveToken("");
    setProfile(null);
  }, [setProfile]);

  const updateProfile = useCallback(
    (profile: Partial<Profile>) => setProfile((p) => ({ ...p, ...profile })),
    [setProfile]
  );

  return {
    profile,
    updateProfile,
    logout
  };
};
