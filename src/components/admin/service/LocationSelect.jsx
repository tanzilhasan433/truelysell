"use client";
// https://claude.ai/chat/ba94e0a8-7988-4548-a2fb-8a4d020c714a
import Select from "react-select";
import { useState, useEffect } from "react";

const LocationSelect = ({
  allDivision,
  allDistrict,
  allUpazila,
  getDistrictByDivision,
  getUpazilaByDistrict,
  register,
  setValue,
  watch,
  errors,
}) => {
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedUpazilas, setSelectedUpazilas] = useState([]);

  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [isUpazilaDisabled, setIsUpazilaDisabled] = useState(true);

  // Watch form values to sync with edit mode
  const divisionId = watch?.("divisionId");
  const districtId = watch?.("districtId");
  const upazilaId = watch?.("upazilaId");

  // Sync selected options when form values change (for edit mode)
  useEffect(() => {
    if (divisionId && allDivision.length > 0) {
      // Handle both array and single value
      const ids = Array.isArray(divisionId) ? divisionId : [divisionId];
      const selected = allDivision
        .filter(
          (div) =>
            ids.includes(div.id) ||
            ids.includes(div.id.toString()) ||
            ids.includes(Number(div.id))
        )
        .map((div) => ({ value: div.id, label: div.name }));
      setSelectedDivisions(selected);
      if (selected.length > 0) {
        setIsDistrictDisabled(false);
      }
    }
  }, [divisionId, allDivision]);

  useEffect(() => {
    if (districtId && allDistrict.length > 0) {
      // Handle both array and single value
      const ids = Array.isArray(districtId) ? districtId : [districtId];
      const selected = allDistrict
        .filter(
          (dist) =>
            ids.includes(dist.id) ||
            ids.includes(dist.id.toString()) ||
            ids.includes(Number(dist.id))
        )
        .map((dist) => ({ value: dist.id, label: dist.name }));
      setSelectedDistricts(selected);
      if (selected.length > 0) {
        setIsUpazilaDisabled(false);
      }
    }
  }, [districtId, allDistrict]);

  useEffect(() => {
    if (upazilaId && allUpazila.length > 0) {
      // Handle both array and single value
      const ids = Array.isArray(upazilaId) ? upazilaId : [upazilaId];
      const selected = allUpazila
        .filter(
          (upz) =>
            ids.includes(upz.id) ||
            ids.includes(upz.id.toString()) ||
            ids.includes(Number(upz.id))
        )
        .map((upz) => ({ value: upz.id, label: upz.name }));
      setSelectedUpazilas(selected);
    }
  }, [upazilaId, allUpazila]);

  // ✅ Handle Division Change
  const handleDivisionChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedDivisions(selectedOptions || []);

    // Set array of IDs
    setValue("divisionId", ids);

    if (ids.length > 0) {
      getDistrictByDivision(ids);
      setIsDistrictDisabled(false);
    } else {
      setIsDistrictDisabled(true);
    }

    // Reset dependent selects
    setSelectedDistricts([]);
    setSelectedUpazilas([]);
    setValue("districtId", []);
    setValue("upazilaId", []);
    setIsUpazilaDisabled(true);
  };

  // ✅ Handle District Change
  const handleDistrictChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedDistricts(selectedOptions || []);

    // Set array of IDs
    setValue("districtId", ids);

    if (ids.length > 0) {
      getUpazilaByDistrict(ids);
      setIsUpazilaDisabled(false);
    } else {
      setIsUpazilaDisabled(true);
    }

    // Reset upazila
    setSelectedUpazilas([]);
    setValue("upazilaId", []);
  };

  // ✅ Handle Upazila Change
  const handleUpazilaChange = (selectedOptions) => {
    const ids = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];
    setSelectedUpazilas(selectedOptions || []);

    // Set array of IDs
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
        {errors?.divisionId && (
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
        {errors?.districtId && (
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
        {errors?.upazilaId && (
          <p className="mt-1 text-sm text-red-600">
            {errors.upazilaId.message}
          </p>
        )}
      </div>
    </>
  );
};

export default LocationSelect;
