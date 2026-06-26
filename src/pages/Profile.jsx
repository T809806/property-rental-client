const Profile = () => {

  const user = JSON.parse(

    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white p-8">
     <h1 className="text-3xl font-bold text-[#d6b46d] mb-6"> Profile </h1>

 <div className="bg-[#111827] p-6 rounded-xl">

<p className="mb-3">
   <strong>Name:</strong> {user?.name}
 </p>
  <p className="mb-3">
   <strong>Email:</strong> {user?.email}
 </p>

 <p className="mb-3">
   <strong>Role:</strong> {user?.role}

  </p>

      </div>

    </div>
  );
};

export default Profile;