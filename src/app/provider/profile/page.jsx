"use client";
import { use } from "react";
import ProviderProfileForm from "./_components/ProviderProfileForm";

const ProfilePage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);

  const isEditMode = action === "edit";

  return (
    <div>
      <ProviderProfileForm isEditMode={isEditMode} id={id} />
    </div>
  );
};

export default ProfilePage;
