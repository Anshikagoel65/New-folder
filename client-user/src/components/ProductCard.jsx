const ProductCard = ({ product }) => {
  return (
    <div className="min-w-[180px] max-w-[180px] bg-white border rounded-xl p-3 flex-shrink-0">
      {/* Image */}
      <div className="h-36 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Image</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium mb-1 truncate">{product.name}</h3>

      {/* Quantity */}
      <p className="text-xs text-gray-500 mb-2">Qty: {product.quantity}</p>

      {/* Price + Button */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-sm">₹{product.price}</span>

        <button className="h-8 px-3 border border-green-600 text-green-600 rounded-lg text-sm">
          ADD
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
