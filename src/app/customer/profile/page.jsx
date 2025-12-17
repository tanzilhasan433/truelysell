"use client";

import { use } from "react";
import ProfileForm from "./_components/ProfileForm";

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
