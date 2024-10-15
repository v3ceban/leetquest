import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex overflow-hidden flex-col rounded w-[30ch] h-[10em]">
        <div className="flex justify-between text-white bg-gray-800 [&>*]:px-4">
          <div>Login</div>
          <div>?</div>
        </div>
        <div className="flex gap-4 justify-center items-center h-full bg-gray-500">
          <div>Google</div>
          <div>GitHub</div>
        </div>
      </div>
    </div>
  );
}
