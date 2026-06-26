import { useEffect, useState } from "react";
import api from "../../../api/axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/payment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="p-6 text-white">

 <h1 className="text-3xl font-bold mb-6 text-[#d6b46d]"> Transactions </h1>

 <div className="overflow-x-auto bg-[#111827] rounded-xl border border-[#d6b46d]">
 <table className="w-full">
  <thead className="bg-[#0f2f2f]">
 <tr>
     <th className="p-3 text-left">Transaction ID</th>
     <th className="p-3 text-left">Property</th>
     <th className="p-3 text-left">Tenant</th>
     <th className="p-3 text-left">Owner</th>
     <th className="p-3 text-left">Amount</th>
     <th className="p-3 text-left">Date</th>

 </tr>
 </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8">
                  No Transactions Found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-t border-gray-700"
                >
                  <td className="p-3">
                    {transaction.transactionId}
                  </td>

                  <td className="p-3">
                    {transaction.property?.title}
                  </td>

                  <td className="p-3">
                    {transaction.tenant?.name}
                  </td>

                  <td className="p-3">
                    {transaction.owner?.name}
                  </td>

                  <td className="p-3 text-green-400">
                    ৳ {transaction.amount}
                  </td>

                  <td className="p-3">
                    {new Date(
                      transaction.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;