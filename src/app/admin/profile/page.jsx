"use client";
import ProfileForm from "@/components/shared/ProfileForm";
import { use } from "react";

const ProfilePage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);

  const isEditMode = action === "edit";

  return (
    <div>
      <ProfileForm isEditMode={isEditMode} id={id} />
    </div>
  );
};

export default ProfilePage;
