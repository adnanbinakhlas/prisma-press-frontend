export type UserProfile = {
  profilePhoto: string;
  bio: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  activeStatus: "ACTIVE" | "INACTIVE";
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
};
