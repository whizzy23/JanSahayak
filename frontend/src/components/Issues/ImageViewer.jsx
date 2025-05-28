const ImageViewer = ({ imageUrl }) => {
  if (!imageUrl) {
    return <p className="text-gray-500">No image available</p>;
  }

  const proxyUrl = `${import.meta.env.VITE_API_BASE_URL}/api/media?url=${encodeURIComponent(imageUrl)}`;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Attached Image:
      </h3>
      <div className="border rounded-lg overflow-hidden max-w-full max-h-[400px]">
        <img
          src={proxyUrl}
          alt="Issue"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ImageViewer;
