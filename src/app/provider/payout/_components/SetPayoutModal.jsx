"use client";

import { useAppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";
import Image from "next/image";
import nagadLogo from "@/assets/logos/nagad.png";
import bkashLogo from "@/assets/logos/bkash.webp";
import rocketLogo from "@/assets/logos/rocket.png";
import bankLogo from "@/assets/img/icons/bank-transfer.svg";
import { useState } from "react";

const SetPayoutModal = ({ onSubmit }) => {
  const { onClose } = useAppContext();
  const [method, setMethod] = useState("bank");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      payoutMethod: "bank",
    },
  });

  const logos = {
    bkash: bkashLogo,
    nagad: nagadLogo,
    rocket: rocketLogo,
    bank: bankLogo,
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center  bg-black/50 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative my-5 overflow-y-auto sidebar-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-lg font-semibold mx-auto">Set Your Payouts</h6>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        {/* Payment Method Selector */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Object.keys(logos).map((id) => (
            <button
              key={id}
              onClick={() => setMethod(id)}
              className={`border rounded-lg p-1 flex justify-center items-center
                ${
                  method === id
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-gray-300"
                }`}
            >
              <Image
                src={logos[id]}
                alt={`${id} logo`}
                width={50}
                height={30}
                className="object-contain"
              />
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit({ ...data, payoutMethod: method });
            reset();
          })}
          className="space-y-4"
        >
          {/* bKash / Nagad / Rocket Mobile Wallet Form */}
          {(method === "bkash" ||
            method === "nagad" ||
            method === "rocket") && (
            <>
              <div>
                <label className="text-sm text-gray-800">Mobile Number</label>
                <input
                  {...register("walletPhone", { required: true })}
                  placeholder="01XXXXXXXXX"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-800">Account Type</label>
                <select
                  {...register("walletType")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="personal">Personal</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
            </>
          )}

          {/* Bank Form (Your Original Inputs) */}
          {method === "bank" && (
            <>
              <div>
                <label className="block text-sm text-gray-800">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  {...register("accountHolder")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-800">Bank Name</label>
                <input
                  type="text"
                  {...register("bankName")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-800">
                  Account Number
                </label>
                <input
                  type="text"
                  {...register("accountNumber")}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-800">
                  Branch Name
                </label>
                <input
                  type="text"
                  {...register("branchName")}
                  class="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-800">
                  Routing Number
                </label>
                <input
                  type="text"
                  {...register("routingNumber")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="secondaryButton">
              Cancel
            </button>
            <button type="submit" className="darkButton">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetPayoutModal;
