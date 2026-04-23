import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = React.useState([]);
  let pages = [];
  const handleGetProducts = async () =>{
    try {
        const result = await axios.get("http://localhost:8080/api/products/get", {withCredentials:true});
        setProducts(result.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    handleGetProducts();
  }, []);

  const [currentPage, setCurrentPage] = React.useState(1);
  const productsPerPage = 6;
  const IndexofFirstProduct = (currentPage - 1) * productsPerPage;
  const IndexofLastProduct = currentPage * productsPerPage;
  const currentProducts = products.slice(IndexofFirstProduct, IndexofLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  for(let i = 1; i <= totalPages; i++){
    pages.push(i);
  }
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => navigate('/create')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Add Product
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h1>Product Catalog</h1>
         {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {currentProducts.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                        <div style={{ width: '200px', height: '200px', overflow: 'hidden', display: 'flex', borderRadius: '10px', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ₹{product.price.toFixed(2)}</p>
                        <button style={{width : "100px", color: "white", backgroundColor: "#4CAF50", height : "30px", borderRadius: "50px", display: "flex", border: "2px solid gray", cursor: "pointer", alignItems: "center", justifyContent: "center"}}>add to cart</button>
                    </div>
                ))}
            </div>

        )}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {pages.map((page) => (
          <button            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              backgroundColor: currentPage === page ? '#4CAF50' : '#f1f1f1',
              color: currentPage === page ? 'white' : 'black',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Home