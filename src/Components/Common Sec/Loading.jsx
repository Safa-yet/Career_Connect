export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <div className="text-center">
        
        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-gray-600 border-t-green-500 animate-spin"></div>
        </div>

        {/* Text */}
        <h1 className="mt-6 text-xl font-semibold text-white tracking-wide">
          Loading, please wait...
        </h1>

        <p className="mt-2 text-gray-400 text-sm">
          Preparing your experience
        </p>

        {/* Dots animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-bounce"></span>
          <span className="h-2 w-2 bg-green-500 rounded-full animate-bounce delay-150"></span>
          <span className="h-2 w-2 bg-green-500 rounded-full animate-bounce delay-300"></span>
        </div>

      </div>
    </div>
  );
}