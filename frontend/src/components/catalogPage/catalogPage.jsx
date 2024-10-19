import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPub from '../../NavPub/NavPub.jsx';
import ProductCard from '../productCard/productCard.jsx';
import Swal from 'sweetalert2';


const URI_PRODUCTO = `${process.env.REACT_APP_SERVER_BACK}/producto`;
const IMAGE_URI = `${process.env.REACT_APP_SERVER_BACK}${process.env.REACT_APP_IMAGE_PATH}`;

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cartAnimating, setCartAnimating] = useState(false); // Nuevo estado para la animación
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [minPrice, setMinPrice] = useState(''); // Estado para el precio mínimo
  const [maxPrice, setMaxPrice] = useState(''); // Estado para el precio máximo
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar filtros
  const [noResults, setNoResults] = useState(false); // Estado para manejar si no hay resultados

  const fetchProducts = async () => {
    try {
      const response = await axios.get(URI_PRODUCTO);
      console.log('Respuesta de la API:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
    }
  };

  useEffect(() => {
    fetchProducts(); // Llama a la función fetchProducts al cargar el componente
  }, []);

  const handleAddToCart = (product) => {
    if (product.Exi_Producto === 0) {
      Swal.fire('¡Producto Agotado!', 'Este producto no se puede añadir al carrito.', 'error');
      return;
    }

    const existingProduct = carrito.find(item => item.Id_Producto === product.Id_Producto);
    
    if (existingProduct) {
      if (existingProduct.Can_Producto >= product.Exi_Producto) {
        Swal.fire('¡Sin suficiente Existencia!', 'No puedes agregar más unidades a este producto.', 'error');
        return;
      }
      
      setCarrito(carrito.map(item => 
        item.Id_Producto === product.Id_Producto 
          ? { ...item, Can_Producto: item.Can_Producto + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...product, Can_Producto: 1 }]);
    }

    // Activa la animación
    setCartAnimating(true);
    setTimeout(() => setCartAnimating(false), 600); // Desactiva la animación después de 600ms

    Swal.fire('¡Producto agregado!', 'El producto ha sido agregado al carrito.', 'success');
  };

  const cartItemCount = carrito.reduce((total, item) => total + item.Can_Producto, 0);

  // Filtra los productos según el término de búsqueda y los filtros de precio
  const filteredProducts = products.filter(product => {
    const isNameMatch = product.Nom_Producto.toLowerCase().includes(searchTerm.toLowerCase());
    const isPriceMatch = (minPrice && product.Pre_Producto < Number(minPrice)) || (maxPrice && product.Pre_Producto > Number(maxPrice)) ? false : true;
    
    // Verifica si el searchTerm es un número y se compara con el precio del producto
    const isPriceSearch = !isNaN(searchTerm) && product.Pre_Producto === Number(searchTerm);
    
    return (isNameMatch || isPriceSearch) && isPriceMatch;
  });

  useEffect(() => {
    // Verifica si hay resultados después de filtrar
    setNoResults(filteredProducts.length === 0 && searchTerm !== '');
  }, [filteredProducts, searchTerm]);

  return (
    <div>
      {/* El ícono del carrito que recibe la clase 'bounce' */}
      <NavPub 
        cartItemCount={cartItemCount} 
        carrito={carrito} 
        setCarrito={setCarrito} 
        cartIconClass={cartAnimating ? 'bounce' : ''}  // Se pasa la clase de animación
      />

      <div style={{ padding: '20px' }}>
        {/* Título llamativo */}
        <h1 style={{
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
          letterSpacing: '1px'
        }}>
          <span style={{ color: '#333' }}>¡Los mejores </span> 
          <span style={{ color: '#ff8c42' }}>Productos, </span> 
          <span style={{ color: '#333' }}>con Domicilio y Pago Contraentrega!</span>
        </h1>

        <input
          type="text"
          placeholder="Buscar productos (nombre)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '20px',
          }}
        />
        
        {showFilters && (
          <div style={{ marginBottom: '20px' }}>
            <div>
              <label>
                Precio Mínimo:
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </label>
            </div>
            <div>
              <label>
                Precio Máximo:
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ marginLeft: '10px', padding: '5px' }}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {noResults && (
        <div style={{
          backgroundColor: 'grey',
          color: '#fff',
          padding: '10px',
          textAlign: 'center',
          borderRadius: '5px',
          margin: '20px 0'
        }}>
          No se encontraron productos que coincidan con su búsqueda.
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' }}>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.Id_Producto}
            name={product.Nom_Producto}
            description={product.Car_Producto}
            price={Math.floor(product.Pre_Producto)} // O puedes usar parseInt(product.Pre_Producto)
            stock={product.Exi_Producto}
            imageUrl={product.Ima_Producto ? `${IMAGE_URI}${product.Ima_Producto}` : ''}
            onAddToCart={() => handleAddToCart(product)} 
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
