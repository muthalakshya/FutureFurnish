import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../content/ShopContext";
import { assets } from "../assets copy/assets"; // Star icons
import ShowModel from "../conultant/ShowModel"; // Assume you have this component
import ShowTableModel from "../conultant/ShowTableModel";

const ProdDetail = () => {
  const { pd } = useParams();
  const { backendUrl, token, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [size, setSize] = useState("");

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!token) {
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${backendUrl}/api/product3model/getAllProducts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const allProducts = response.data.data.flatMap(prod => {
          if (Array.isArray(prod.items) && prod.items.length > 0) {
            return prod.items.map(item => ({
              ...item,
              productId: prod._id || prod.id,
              title: prod.title,
              description: prod.description,
              price: prod.price,
              imageUrl: prod.imageUrl || (item.image && item.image[0]),
              sizes: prod.sizes || ['S', 'M', 'L'],
              type: prod.type,
              fullProductData: prod,
              sides:prod.sides
            }));
          }
          
          return [{
            ...prod,
            productId: prod._id || prod.id,
            imageUrl: prod.imageUrl || (prod.image && prod.image[0]),
            sizes: prod.sizes || ['S', 'M', 'L'],
            type: prod.type,
            fullProductData: prod,
            sides:prod.sides
          }];
        });

        const foundProduct = allProducts.find(product => product.productId === pd);
        console.log(foundProduct,"dff")
        if (foundProduct) {
          setProduct(foundProduct);
          console.log(foundProduct,"dffss")
        } else {
          setError("Product not found");
          toast.error("Product not found");
        }
      } else {
        setError(response.data.message || "Failed to load products");
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError(error.message || "An unexpected error occurred");
      toast.error(error.message || "Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [pd, token, backendUrl]);

  // Render loading state
  if (loading) {
    return <div className="text-center py-20">Loading Product Details...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  // Render product details
  return (
    <div className="container mx-auto px-16 py-24">
      {product ? (
        <div className="grid md:grid-cols-2 gap-10">
          <div className="w-full sm:w-[80%]">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-auto object-cover"
              />
            ) : product.type === "table" ? ( // ✅ Use `===` for strict comparison
            <ShowTableModel d3sides={product.sides} />
          ) : (
            <ShowModel d3sides={product.sides} />
          )}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title || 'Single Couch'}</h1>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1 mt-2">
              {[...Array(4)].map((_, index) => (
                <img 
                  key={index} 
                  src={assets.star_icon} 
                  alt="star" 
                  className="w-4 h-4" 
                />
              ))}
              <img 
                src={assets.star_dull_icon} 
                alt="half star" 
                className="w-4 h-4" 
              />
              <p className="pl-2">(122)</p>
            </div>

            <p className="text-3xl font-medium mt-5">
              ₹ {product.price }
            </p>

            <p className="mt-5 text-gray-500 md:w-4/5">
              {product.description || 'Sofa kecil untuk satu orang yang sangat cocok untuk santai serambi membaca buku atau menyeduh teh hangat'}
            </p>

            {/* Size Selection */}
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {product.sizes.map((sizeOption, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(sizeOption)}
                    className={`
                      border py-2 px-4 bg-gray-300
                      ${size === sizeOption ? 'bg-black text-white' : ''}
                    `}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={() => {
                if (!size) {
                  toast.error("Select Product Size");
                  return;
                }
                addToCart(product.productId, size);
              }}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>

            {/* Product Guarantees */}
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No product details available</div>
      )}
    </div>
  );
};

export default ProdDetail;