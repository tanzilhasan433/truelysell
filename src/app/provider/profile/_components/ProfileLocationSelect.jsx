"use client";

import Select from "react-select";
import { useState, useEffect } from "react";

const ProfileLocationSelect = ({
  prefix,
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
  const divisionField = `${prefix}DivisionId`;
  const districtField = `${prefix}DistrictId`;
  const upazilaField = `${prefix}UpazilaId`;

  const divisionId = watch?.(divisionField);
  const districtId = watch?.(districtField);
  const upazilaId = watch?.(upazilaField);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);

  // Load Division (edit mode)
  useEffect(() => {
    if (divisionId && allDivision.length) {
      const found = allDivision.find((d) => d.id === divisionId);
      found && setSelectedDivision({ value: found.id, label: found.name });
    }
  }, [divisionId, allDivision]);

  // Load District (edit mode)
  useEffect(() => {
    if (districtId && allDistrict.length) {
      const found = allDistrict.find((d) => d.id === districtId);
      found && setSelectedDistrict({ value: found.id, label: found.name });
    }
  }, [districtId, allDistrict]);

  // Load Upazila (edit mode)
  useEffect(() => {
    if (upazilaId && allUpazila.length) {
      const found = allUpazila.find((u) => u.id === upazilaId);
      found && setSelectedUpazila({ value: found.id, label: found.name });
    }
  }, [upazilaId, allUpazila]);

  return (
    <>
      {/* Division */}
      <div>
        <label className="block text-sm text-gray-800">Division</label>
        <Select
          placeholder="Select Division"
          value={selectedDivision}
          onChange={(opt) => {
            setSelectedDivision(opt);
            setValue(divisionField, opt?.value);

            // reset lower fields
            setSelectedDistrict(null);
            setSelectedUpazila(null);
            setValue(districtField, null);
            setValue(upazilaField, null);

            getDistrictByDivision([opt?.value]);
          }}
          options={allDivision.map((d) => ({ value: d.id, label: d.name }))}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-800">District</label>
        <Select
          placeholder="Select District"
          value={selectedDistrict}
          onChange={(opt) => {
            setSelectedDistrict(opt);
            setValue(districtField, opt?.value);

            // reset upazila
            setSelectedUpazila(null);
            setValue(upazilaField, null);

            getUpazilaByDistrict([opt?.value]);
          }}
          options={allDistrict.map((d) => ({ value: d.id, label: d.name }))}
          className="mt-1"
        />
      </div>
      <div>
        {/* Upazila */}
        <label className="block text-sm text-gray-800">Upazila</label>
        <Select
          placeholder="Select Upazila"
          value={selectedUpazila}
          onChange={(opt) => {
            setSelectedUpazila(opt);
            setValue(upazilaField, opt?.value);
          }}
          options={allUpazila.map((u) => ({ value: u.id, label: u.name }))}
          className="mt-1"
        />
      </div>
    </>
  );
};

export default ProfileLocationSelect;
