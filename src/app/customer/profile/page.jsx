"use client";

import { use } from "react";
import CustomerProfileForm from "./_components/CustomerProfileForm";

const ProfilePage = ({ params, searchParams }) => {
  const { action } = use(params);
  const { id } = use(searchParams);

  const isEditMode = action === "edit";

  return (
    <div>
      <CustomerProfileForm isEditMode={isEditMode} id={id} />
    </div>
  );
};

export default ProfilePage;
