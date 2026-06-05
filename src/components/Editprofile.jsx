import React, { useState } from "react";
import { User, Mail, Lock, Camera, Save } from "lucide-react";

const ProfileContent = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(storedUser.name || "");

  const [email, setEmail] = useState(storedUser.email || "");

  const [password, setPassword] = useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // connect backend later

      const updatedUser = {
        ...storedUser,
        name,
        email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
   <br/>
   <br/>
   <br/>
      {/* Profile Card */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
        "
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div
              className="
                relative
                w-28
                h-28
                rounded-full
                bg-gradient-to-r
                from-indigo-600
                to-cyan-500
                flex
                items-center
                justify-center
                text-white
                text-4xl
                font-bold
              "
            >
              {name?.charAt(0)?.toUpperCase()}

              <label
                className="
                  absolute
                  bottom-0
                  right-0
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  shadow
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                "
              >
                <Camera size={18} className="text-black" />

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            {image && (
              <p className="mt-3 text-sm text-slate-500">{image.name}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              Full Name
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  border
                  rounded-2xl
                  outline-none
                  text-black
                "
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  border
                  rounded-2xl
                  outline-none
                  text-black
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-600">
              New Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  border
                  rounded-2xl
                  outline-none
                  text-black
                "
              />
            </div>
          </div>

          {/* Save Button */}
          <button
          
            type="submit"
            className="
              bg-gradient-to-r
              from-indigo-600
              to-cyan-500
              text-white
              px-8
              py-4
              rounded-2xl
              flex
              items-center
              gap-2
              shadow-lg
            "
          >
            <Save size={18} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileContent;
