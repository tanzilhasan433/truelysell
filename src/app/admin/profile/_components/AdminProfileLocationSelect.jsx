"use client";

import Select from "react-select";
import { useState, useEffect } from "react";

const AdminProfileLocationSelect = ({
  prefix,
  allDivision,
  allDistrict,
  getDistrictByDivision,
  setValue,
  watch,
}) => {
  const divisionField = `${prefix}DivisionId`;
  const districtField = `${prefix}DistrictId`;

  const divisionId = watch?.(divisionField);
  const districtId = watch?.(districtField);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    if (divisionId && allDivision.length) {
      const found = allDivision.find((d) => d.id === divisionId);
      found && setSelectedDivision({ value: found.id, label: found.name });
    }
  }, [divisionId, allDivision]);

  useEffect(() => {
    if (districtId && allDistrict.length) {
      const found = allDistrict.find((d) => d.id === districtId);
      found && setSelectedDistrict({ value: found.id, label: found.name });
    }
  }, [districtId, allDistrict]);

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
            setSelectedDistrict(null);
            setValue(districtField, null);

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
          }}
          options={allDistrict.map((d) => ({ value: d.id, label: d.name }))}
          className="mt-1"
        />
      </div>
    </>
  );
};

export default AdminProfileLocationSelect;
