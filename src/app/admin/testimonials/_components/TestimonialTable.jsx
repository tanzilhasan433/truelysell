import DeleteButton from "@/components/shared/DeleteButton";
import Pagination from "@/components/shared/Pagination";
import { useAppContext } from "@/context/AppContext";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const TestimonialTable = ({ allData, setAllData, pageSize }) => {
  const {
    setSelectedId,
    currentPage,
    setCurrentPage,
    totalRecords,
    setIsModalOpen,
  } = useAppContext();
  return (
    <div className=" mb-10">
      <div className="overflow-x-auto mb-5">
        <table className="max-w-7xl w-full text-sm text-left text-gray-600">
          <thead className="bg-sky-600/10 text-gray-800 text-sm uppercase">
            <tr>
              <th className="py-5 px-3">#</th>
              <th className="py-5 px-3">User Name </th>
              <th className="py-5 px-3">Rating </th>
              <th className="py-5 px-3">Content </th>

              <th className="py-5 px-3">Status</th>
              <th className="py-5 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {allData.map((item, index) => (
              <tr
                key={item.id}
                className="border-t border-gray-200/80 hover:bg-gray-100 transition"
              >
                <td className="py-4 px-3">{index + 1}</td>

                <td className="py-4 px-3 flex items-center gap-2">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/testimonial/${item.imageUrl}`}
                    alt={item.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        className={`h-4 w-4 ${
                          index < item.ratings
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-3">{item.content}</td>

                <td
                  className={`py-4 px-3 font-semibold ${
                    item.status == "Active" ? "text-green-700" : "text-blue-700"
                  }`}
                >
                  {item.status}
                </td>
                <td className="py-4 px-2 font-medium">
                  <div className=" flex items-center gap-2">
                    {" "}
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-gray-200 text-gray-500 hover:bg-(--primary-blue) hover:text-white p-2 h-8 w-8 rounded-full flex items-center justify-center gap-2"
                    >
                      <FiEdit size={25} />
                    </button>
                    <DeleteButton
                      endpoint={`testimonial/delete/${item?.id}`}
                      type="testimonial"
                      onComplete={(status) => {
                        if (status) {
                          setAllData((prev) =>
                            prev.filter((b) => b.id !== item.id)
                          );
                        } else {
                        }
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TestimonialTable;
