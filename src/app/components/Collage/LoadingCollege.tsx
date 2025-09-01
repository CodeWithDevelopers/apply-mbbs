import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingCollege = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 36, color: "#5c3a00" }} spin />
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <Spin indicator={antIcon} size="large" className="mb-6" />

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 animate-pulse">
        Fetching College Details...
      </h2>

      {/* Skeleton blocks */}
      <div className="mt-10 w-full max-w-3xl px-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3"></div>
        <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingCollege;
