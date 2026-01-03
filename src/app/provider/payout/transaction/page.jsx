"use client";

import PayoutHistory from "../_components/PayoutHistory";

const ProviderTransactionPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4>Transaction</h4>
      </div>

      {/* table */}
      <PayoutHistory />
    </div>
  );
};

export default ProviderTransactionPage;
