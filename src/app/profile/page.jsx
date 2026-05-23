import Profile from "@/components/profile/ProfilePage";
import { useSession } from "@/lib/auth-client";

export const metadata = {
  title: "IdeaVault | Profile",
  description: "This is user profile page",
};

export default function ProfilePage() {
  return (
    <div>
      <Profile></Profile>
    </div>
  );
}
