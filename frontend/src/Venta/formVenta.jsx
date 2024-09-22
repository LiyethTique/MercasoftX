import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Puedes eliminar Swal si ya no lo vas a usar
import axios from 'axios'; // Asegúrate de tener axios importado

const URI_PEDIDO = process.env.REACT_APP_SERVER_BACK + '/pedido/';

const FormVenta = ({ buttonForm, venta, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });

  const [initialData, setInitialData] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });

  const [errors, setErrors] = useState({
    Fec_Venta: '',
    Val_Venta: '',
    Id_Pedido: ''
  });

  const [pedidos, setPedidos] = useState([]); // Estado para almacenar los pedidos

  useEffect(() => {
    if (venta) {
      setFormData(venta);
      setInitialData(venta); // Guardar los datos iniciales
    }
  }, [venta]);

  // Obtener los pedidos de la base de datos cuando se carga el componente
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(URI_PEDIDO); // Cambia la URL según tu API
        setPedidos(response.data);
      } catch (error) {
        Swal.fire('Error', 'No se pudieron cargar los pedidos', 'error');
      }
    };

    fetchPedidos();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Fec_Venta) newErrors.Fec_Venta = 'La fecha es requerida.';
    if (!formData.Val_Venta) {
      newErrors.Val_Venta = 'El valor es requerido.';
    } else if (isNaN(parseFloat(formData.Val_Venta.replace(/,/g, '')))) {
      newErrors.Val_Venta = 'El valor debe ser un número.';
    } else if (parseFloat(formData.Val_Venta.replace(/,/g, '')) < 0) {
      newErrors.Val_Venta = 'El valor no puede ser negativo.';
    } else if (formData.Val_Venta.replace(/,/g, '').length > 8) {
      newErrors.Val_Venta = 'El valor no puede exceder los 8 dígitos.'; // Nueva validación para el límite de 8 dígitos
    }

    if (!formData.Id_Pedido) newErrors.Id_Pedido = 'El Valor del Pedido es requerido.';

    return newErrors;
  };

  const hasChanges = () => {
    return Object.keys(formData).some(key => formData[key] !== initialData[key]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si es el campo de valor de venta, formatear el valor
    if (name === 'Val_Venta') {
      // Verificar si el valor es vacío
      if (!value) {
        setFormData({ ...formData, [name]: '' }); // Si está vacío, no hacer nada
      } else {
        // Remover cualquier coma existente antes de intentar formatear
        const numericValue = parseFloat(value.replace(/,/g, ''));

        // Si el valor no es un número válido, no intentar formatear
        if (!isNaN(numericValue)) {
          const formattedValue = numericValue.toLocaleString('en-US'); // Agrega las comas
          setFormData({ ...formData, [name]: formattedValue });
        } else {
          setFormData({ ...formData, [name]: value }); // Si es NaN, mantener el valor actual
        }
      }
    } else {
      // Para los otros campos, no se formatea
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Enviar el valor de venta sin comas a la función onSubmit
    const cleanFormData = { ...formData, Val_Venta: formData.Val_Venta.replace(/,/g, '') };
    onSubmit(cleanFormData);
  };

  const handleClose = () => {
    if (onClose) {
      onClose(); // Llama a la función de cierre pasada por props
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="mb-3">
        <label htmlFor="Fec_Venta" className="form-label">Fecha de Venta</label>
        <input
          type="date"
          className={`form-control ${errors.Fec_Venta ? 'is-invalid' : ''}`}
          id="Fec_Venta"
          name="Fec_Venta"
          value={formData.Fec_Venta}
          onChange={handleChange}
        />
        {errors.Fec_Venta && <div className="invalid-feedback">{errors.Fec_Venta}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="Val_Venta" className="form-label">Valor de Venta</label>
        {/* Mostrar el mensaje de error encima del campo */}
        {errors.Val_Venta && <div className="text-danger mb-2">{errors.Val_Venta}</div>}
        <input
          type="text"
          className={`form-control ${errors.Val_Venta ? 'is-invalid' : ''}`}
          id="Val_Venta"
          name="Val_Venta"
          value={formData.Val_Venta}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Id_Pedido" className="form-label">Valor del Pedido</label>
        <select
          className={`form-control ${errors.Id_Pedido ? 'is-invalid' : ''}`}
          id="Id_Pedido"
          name="Id_Pedido"
          value={formData.Id_Pedido}
          onChange={handleChange}
        >
          <option value="">Selecciona un pedido</option>
          {Array.isArray(pedidos) && pedidos.map((pedido) => (
            <option key={pedido.Id_Pedido} value={pedido.Id_Pedido}>
              {pedido.Id_Pedido} - {pedido.Val_Pedido} {/* O cualquier otro campo */}
            </option>
          ))}
        </select>
        {errors.Id_Pedido && <div className="invalid-feedback">{errors.Id_Pedido}</div>}
      </div>
      <div className="mb-3 text-center">
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: '#ff9800', // Color naranja
            borderColor: '#ff9800', // Color del borde
            color: 'white', // Color del texto
            fontWeight: 'bold', // Opcional: hacer el texto en negrita
            borderRadius: '5px' // Opcional: bordes redondeados
          }}
        >
          {buttonForm}
        </Button>
      </div>
    </div>
  );
};

export default FormVenta;
