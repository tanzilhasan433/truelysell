"use client";
import { use } from "react";
import AdminProfileForm from "./_components/AdminProfileForm";

const ProfilePage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);

  const isEditMode = action === "edit";

  return (
    <div>
      <AdminProfileForm isEditMode={isEditMode} id={id} />
    </div>
  );
};

export default ProfilePage;
