import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProperties();
    fetchTransactions();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await api.get("/properties/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ADMIN PROPERTIES =", res.data);

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
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

  const changeRole = async (id, role) => {
    try {
      await api.patch(
        `/users/role/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const approveProperty = async (id) => {
    try {
      await api.patch(
        `/properties/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectProperty = async (id) => {
    const feedback = prompt(
      "Why are you rejecting this property?"
    );

    if (!feedback) return;

    try {
      await api.patch(
        `/properties/reject/${id}`,
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm(
      "Delete property?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/properties/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <h2 className="text-2xl mb-4">
        All Users
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

 <tbody>
   {users.map((user) => (
   <tr key={user._id}>
   <td>{user.name}</td>
   <td>{user.email}</td>
   <td>{user.role}</td>

 <td>
   <button
   className="bg-blue-600 px-2 py-1 mr-2 text-white"
   onClick={() =>
    changeRole(user._id, "Owner")
 }
   >
 Make Owner
 </button>

 <button
     className="bg-green-600 px-2 py-1 text-white"
     onClick={() =>
     changeRole(user._id, "Tenant")
   }
 >
 Make Tenant
    </button>
    </td>
 </tr>
  ))}

 </tbody>

   </table>

 <h2 className="text-2xl mt-10 mb-4"> All Properties </h2>

<table className="w-full border">
  
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>{property.title}</td>
              <td>{property.owner?.name}</td>
              <td>${property.price}</td>
              <td>{property.status}</td>

              <td>
                <button
                  className="bg-green-600 px-2 py-1 mr-2 text-white"
                  onClick={() =>
                    approveProperty(property._id)
                  }
                >
                  Approve
                </button>

                <button
                  className="bg-yellow-500 px-2 py-1 mr-2 text-white"
                  onClick={() =>
                    rejectProperty(property._id)
                  }
                >
                  Reject
                </button>

                <button
                  className="bg-red-600 px-2 py-1 text-white"
                  onClick={() =>
                    deleteProperty(property._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl mt-10 mb-4">
        Transactions
      </h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Property</th>
            <th>Tenant</th>
            <th>Owner</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.transactionId}</td>
              <td>{t.property?.title}</td>
              <td>{t.tenant?.name}</td>
              <td>{t.owner?.name}</td>
              <td>${t.amount}</td>
              <td>
                {new Date(
                  t.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;