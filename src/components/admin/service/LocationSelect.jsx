"use client";

import Select from "react-select";
import { useForm } from "react-hook-form";
import { useState } from "react";

const LocationSelect = ({
  allDivision,
  allDistrict,
  allUpazila,
  getDistrictByDivision,
  getUpazilaByDistrict,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedUpazilas, setSelectedUpazilas] = useState([]);

  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [isUpazilaDisabled, setIsUpazilaDisabled] = useState(true);

  // ✅ Handle Division Change
  const handleDivisionChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedDivisions(selectedOptions || []);
    setValue("divisionId", ids);
    getDistrictByDivision(ids);

    // reset dependent selects
    setSelectedDistricts([]);
    setSelectedUpazilas([]);
    setValue("districtId", []);
    setValue("upazilaId", []);
    setIsDistrictDisabled(ids.length === 0);
    setIsUpazilaDisabled(true);
  };

  // ✅ Handle District Change
  const handleDistrictChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedDistricts(selectedOptions || []);
    setValue("districtId", ids);
    getUpazilaByDistrict(ids);

    // reset upazila
    setSelectedUpazilas([]);
    setValue("upazilaId", []);
    setIsUpazilaDisabled(ids.length === 0);
  };

  // ✅ Handle Upazila Change
  const handleUpazilaChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedUpazilas(selectedOptions || []);
    setValue("upazilaId", ids);
  };

  // Convert API data to react-select options
  const divisionOptions = allDivision.map((div) => ({
    value: div.id,
    label: div.name,
  }));

  const districtOptions = allDistrict.map((dist) => ({
    value: dist.id,
    label: dist.name,
  }));

  const upazilaOptions = allUpazila.map((upz) => ({
    value: upz.id,
    label: upz.name,
  }));

  return (
    <>
      {/* Division */}
      <div>
        <label className="block text-sm text-gray-800">Division</label>
        <Select
          id="divisionId"
          options={divisionOptions}
          isMulti
          value={selectedDivisions}
          onChange={handleDivisionChange}
          placeholder="Select Division"
          className="mt-1"
          classNames={{
            control: () =>
              "mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none",
          }}
        />
        {errors.divisionId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.divisionId.message}
          </p>
        )}
      </div>

      {/* District */}
      <div>
        <label className="block text-sm text-gray-800">District</label>
        <Select
          id="districtId"
          options={districtOptions}
          isMulti
          isDisabled={isDistrictDisabled}
          value={selectedDistricts}
          onChange={handleDistrictChange}
          placeholder="Select District"
          className="mt-1"
          classNames={{
            control: () =>
              `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none ${
                isDistrictDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`,
          }}
        />
        {errors.districtId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.districtId.message}
          </p>
        )}
      </div>

      {/* Upazila */}
      <div>
        <label className="block text-sm text-gray-800">
          Thana / Upazila / Area
        </label>
        <Select
          id="upazilaId"
          options={upazilaOptions}
          isMulti
          isDisabled={isUpazilaDisabled}
          value={selectedUpazilas}
          onChange={handleUpazilaChange}
          placeholder="Select Upazila"
          className="mt-1"
          classNames={{
            control: () =>
              `mt-1 block w-full rounded-xl text-gray-600 text-sm border border-gray-300 py-0.5 focus:outline-none ${
                isUpazilaDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              }`,
          }}
        />
        {errors.upazilaId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.upazilaId.message}
          </p>
        )}
      </div>
    </>
  );
};

export default LocationSelect;
