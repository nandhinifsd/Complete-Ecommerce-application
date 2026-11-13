import React ,{ useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ImagePlus, ShoppingCart, ArrowLeft, Package } from "lucide-react";
import api from "../api/apiinstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const PlaceOrder = () => {
 const  productid  = useParams();
  const navigate = useNavigate();
  const [product,setProduct]=useState({});
  const [quantity, setQuantity] = useState(1);
  const [designImage, setDesignImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
   const [currentImage, setCurrentImage]=useState();
   const [color, setColor] = useState("");
const [instructions, setInstructions] = useState("");

const colors = [
  { name: "Red", value: "#DC2626" },
  { name: "Blue", value: "#2563EB" },
  { name: "Violet", value: "#7C3AED" },
  { name: "Black", value: "#171717" },
  { name: "Green", value: "#16A34A" }
];
    
 const token = localStorage.getItem("token");
const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
function changeImage()
    {
      if (currentImage==product.productImage)
      setCurrentImage(product.sealImage);
    else
      setCurrentImage(product.productImage);
    }
  async function getProductDetails()
  {
    try{
      console.log(productid);
      const res =await api.get(`/products/view/${productid.id}`,axiosConfig);
      console.log("response: ",res.data);
      setProduct(res.data.product);
      setCurrentImage(res.data.product.productImage);
    
      console.log(product);
    }
    catch(err)
    {
      console.log(err);
    }

  }

   const totalAmount = product
    ? Number(product.price) * Number(quantity)
    : 0;
useEffect(()=>
{
  getProductDetails();
},[productid]);

// Preview uploaded design
  useEffect(() => {
    if (!designImage) {
      setPreview("");
      return;
    }

    const imageURL = URL.createObjectURL(designImage);
    setPreview(imageURL);

    return () => URL.revokeObjectURL(imageURL);
  }, [designImage]);

  // Handle image upload
  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    setDesignImage(file);
  }
  // Add product to cart
  async function addToCart(e) {

    e.preventDefault();

    if (!quantity || Number(quantity) < 1) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!designImage) {
      alert("Please upload your stamp design.");
      return;
    }
    if (!color) {
  alert("Please select a stamp ink colour.");
  return;
}

    try {

      setLoading(true);

      const formData = new FormData();

formData.append("productId", productid.id);
formData.append("quantity", quantity);
formData.append("color", color);
formData.append("price", totalAmount);
formData.append("designImage", designImage);
formData.append("instructions", instructions);

      

      // Change this URL to match your cart router
      const response = await api.post(
        "/cart/add",
        formData,
        axiosConfig
      );

      alert(
        response.data.message || "Product added to cart successfully!"
      );

      navigate("/cart");

    }
    catch (err) {

      console.log("Add to Cart Error:", err);

      alert(
        err.response?.data?.message ||
        "Unable to add product to cart."
      );

    }
    finally {
      setLoading(false);
    }
  }

// Handle missing product
  if (!product) {
    return (
      <>
        <Navbar />

        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <Package size={50} className="text-blue-900" />

          <h2 className="text-xl font-bold text-blue-900">
            Product Details Not Found
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg"
          >
            Browse Products
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
     <>
     <header className="min-w-screen w-full h-auto z-500">
              <Navbar />
            </header>
    <main className="min-h-screen bg-gradient-to-r from-cyan-50 via-teal-50 to-yellow-50 py-12 px-4">
    <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-black font-serif text-blue-900">
              Customize Your Stamp
            </h1>

            <p className="text-gray-600 mt-3">
              Upload your design and personalize your order.
            </p>

          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-900 font-semibold mb-6 hover:text-teal-700"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>

          <form
            onSubmit={addToCart}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">

              {/* Product Details */}

              <section>

                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                  Product Details
                </h2>

                <div className="bg-gray-50 rounded-xl p-5">

                  <div className="flex justify-center bg-white rounded-xl p-4 group relative hover:bg-teal-50 cursor-pointer">
                    <img
                      src={currentImage}
                      alt={product.name}
                      className="w-full max-w-sm h-64 object-contain"
                      onClick={changeImage}
                    />
                      <div className=" hidden group-hover:block absolute right-4 top-1/2-translate-y-1/2
        bg-white border border-gray-300 rounded-md shadow-md px-3 py-2 text-sm text-gray-700">
                        Click on image to see seal Image
                      </div>
                      
                  </div>

                  <h3 className="text-xl font-bold text-blue-900 mt-5">
                    {product.name}
                  </h3>

                  <div className="space-y-2 text-gray-600 mt-3">

                    <p>
                      <strong>Brand:</strong> {product.brand}
                    </p>

                    <p>
                      <strong>Category:</strong> {product.catagory}
                    </p>

                    <p>
                      <strong>Shape:</strong> {product.shape}
                    </p>

                    <p>
                      <strong>Dimension:</strong> {product.dimension}
                    </p>

                    <p className="text-2xl font-black text-blue-900 pt-3">
                      ₹{product.price}
                      <span className="text-sm font-normal text-gray-500">
                        {" "} / item
                      </span>
                    </p>

                  </div>

                </div>

              </section>

              {/* Customization Section */}

              <section>

                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                  Customize Your Order
                </h2>

                {/* Quantity */}

                <div className="mb-7">

                  <label className="block text-blue-900 font-semibold mb-2">
                    Enter Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400"
                    required
                  />

                </div>
                {/* Stamp Ink Colour */}

<div className="mb-8">

  <label className="block text-blue-900 font-bold mb-4">
    Choose Your Stamp Ink Colour
  </label>

  <div className="grid grid-cols-5 gap-3">

    {colors.map((item) => (

      <label
        key={item.name}
        className="flex flex-col items-center gap-2 cursor-pointer"
      >

        <input
          type="radio"
          name="stampColor"
          value={item.name}
          checked={color === item.name}
          onChange={(e) => setColor(e.target.value)}
          className="sr-only"
        />

        <span
          style={{ backgroundColor: item.value }}
          className={`w-10 h-10 rounded-full border-4
            ${color === item.name
              ? "border-teal-500 ring-2 ring-teal-200"
              : "border-gray-200"
            }`}
        />

        <span className={`text-xs font-semibold ${
          color === item.name
            ? "text-teal-700"
            : "text-gray-600"
        }`}>
          {item.name}
        </span>

      </label>

    ))}

  </div>

</div>

                {/* Image Upload */}

                <div className="mb-7">

                  <label className="block text-blue-900 font-semibold mb-3">
                    Upload Your Stamp Design
                  </label>

                  <label className="border-2 border-dashed border-teal-500 rounded-xl min-h-52 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50 transition p-5">

                    {preview ? (

                      <img
                        src={preview}
                        alt="Design Preview"
                        className="max-h-48 max-w-full object-contain rounded-lg"
                      />

                    ) : (

                      <>
                        <ImagePlus
                          size={50}
                          className="text-teal-600 mb-3"
                        />

                        <p className="font-semibold text-blue-900">
                          Click to upload your design
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                          PNG, JPG, JPEG or WEBP
                        </p>
                      </>

                    )}

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                  </label>

                  {designImage && (
                    <p className="text-sm text-green-700 mt-2">
                      Selected: {designImage.name}
                    </p>
                  )}

                </div>
                {/* Image Upload Guidelines */}

<div className="bg-amber-50 border border-amber-200
                rounded-xl p-5 mb-7">

  <div className="flex items-center gap-2 mb-3">

    <ImagePlus className="text-amber-700" size={22} />

    <h3 className="font-bold text-amber-900">
      Image Upload Instructions
    </h3>

  </div>

  <ul className="list-disc list-inside text-sm
                 text-amber-900 space-y-2">

    <li>Upload a clear, high-resolution image.</li>

    <li>Avoid blurry images and very small text.</li>

    <li>Keep your design properly aligned and centered.</li>

    <li>Ensure your design is suitable for rubber-stamp printing.</li>

    <li>Supported formats: PNG, JPG, JPEG and WEBP.</li>

  </ul>

</div>

{/* Additional Instructions */}

<div className="mb-7">

  <label className="block text-blue-900 font-bold mb-3">
    Additional Instructions
  </label>

  <textarea
    rows={5}
    value={instructions}
    onChange={(e) => setInstructions(e.target.value)}
    placeholder="Enter any special instructions for your stamp...

Example: Please print my company name in bold letters and align the logo to the center."
    className="w-full border border-gray-300 rounded-xl
               p-4 outline-none resize-y
               focus:ring-2 focus:ring-teal-400
               focus:border-teal-400"
  />

  <p className="text-xs text-gray-500 mt-2">
    Specify any additional requirements regarding text,
    font, alignment or design placement.
  </p>

</div>


                {/* Price Summary */}

                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-5 mb-7">

                  <h3 className="text-lg font-bold text-blue-900 mb-4">
                    Order Summary
                  </h3>

                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Price per item</span>
                    <span>₹{product.price}</span>
                  </div>

                  <div className="flex justify-between mb-3 text-gray-600">
                    <span>Quantity</span>
                    <span>{quantity || 0}</span>
                  </div>

                  <hr className="border-gray-300 my-3" />

                  <div className="flex justify-between items-center">

                    <span className="font-bold text-blue-900">
                      Total Amount
                    </span>

                    <span className="text-2xl font-black text-blue-900">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                {/* Add to Cart */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-blue-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition disabled:opacity-50"
                >

                  <ShoppingCart size={22} />

                  {loading ? "Adding to Cart..." : "Add to Cart"}

                </button>

              </section>

            </div>

          </form>

        </div>

      </main>

      <Footer />

    </>
  );
};

export default PlaceOrder;
     