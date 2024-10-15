export default function Login() {
  return (
    <div className="flex justify-center items-center h-[calc(100dvh-72px)]">
      <div className="flex flex-col rounded w-[30ch] h-[10em] overflow-hidden">
        <div className="flex justify-between text-white bg-gray-800 [&>*]:px-4">
          <div>Login</div>
          <div>?</div>
        </div>
        <div className="bg-gray-500 h-full flex justify-center items-center gap-4">
          <div>Google</div>
          <div>GitHub</div>
        </div>
      </div>
    </div>
  );
}