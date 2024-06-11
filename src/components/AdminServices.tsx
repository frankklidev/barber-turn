import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Service = {
  id: number;
  name: string;
  price: number;
};

const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceData, setServiceData] = useState<Service | { name: string; price: number }>({ name: '', price: 0 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');

    if (error) {
      toast.error('Error al cargar los servicios');
    } else {
      setServices(data as Service[]);
    }
  };

  const handleServiceSubmit = async () => {
    if (serviceData.name.trim() === '' || serviceData.price <= 0) {
      toast.error('El nombre del servicio y el precio deben ser válidos');
      return;
    }

    if (isEditing && 'id' in serviceData) {
      const { error } = await supabase
        .from('services')
        .update({ name: serviceData.name, price: serviceData.price })
        .eq('id', serviceData.id);

      if (error) {
        toast.error('Error al actualizar el servicio');
      } else {
        toast.success('Servicio actualizado con éxito');
        setIsEditing(false);
      }
    } else {
      const { error } = await supabase.from('services').insert([serviceData]);

      if (error) {
        toast.error('Error al agregar el servicio');
      } else {
        toast.success('Servicio agregado con éxito');
      }
    }

    setServiceData({ name: '', price: 0 });
    fetchServices();
  };

  const deleteService = async (serviceId: number) => {
    const { error } = await supabase.from('services').delete().eq('id', serviceId);

    if (error) {
      toast.error('Error al eliminar el servicio');
    } else {
      toast.success('Servicio eliminado con éxito');
      fetchServices();
    }
  };

  const startEditingService = (service: Service) => {
    setServiceData(service);
    setIsEditing(true);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Gestión de Servicios</h2>
      <div className="mb-4">
        <input
          type="text"
          value={serviceData.name}
          onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
          placeholder="Nombre del servicio"
          className="input input-bordered mb-2 mr-2"
        />
        <input
          type="number"
          value={serviceData.price}
          onChange={(e) => setServiceData({ ...serviceData, price: parseFloat(e.target.value) })}
          placeholder="Precio del servicio"
          className="input input-bordered mb-2 mr-2"
          step="0.01"
          min="0"
        />
        <button onClick={handleServiceSubmit} className="btn btn-primary">
          {isEditing ? 'Actualizar Servicio' : 'Agregar Servicio'}
        </button>
        {isEditing && (
          <button onClick={() => { setServiceData({ name: '', price: 0 }); setIsEditing(false); }} className="btn ml-2">
            Cancelar
          </button>
        )}
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="p-2">{service.name}</td>
              <td className="p-2">${service.price}</td>
              <td className="p-2">
                <button onClick={() => startEditingService(service)} className="btn btn-warning btn-sm mr-2">Editar</button>
                <button onClick={() => deleteService(service.id)} className="btn btn-error btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminServices;
