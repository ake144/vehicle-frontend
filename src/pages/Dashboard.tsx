import AddVehicleForm from '@/components/addVehicleForm';
import VehicleRow from '@/components/vehicleRow';
import { addVehicle, fetchVehicles, updateVehicleStatus, Vehicle } from '@/services/vehicleServices';
import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []); // Empty array ensures this runs only once when the component mounts

  const loadVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchVehicles();

      console.log("Fetched Vehicles:", data); // Log the fetched data
       
      // Only update state if the data has changed
      if (JSON.stringify(data) !== JSON.stringify(vehicles)) {
        setVehicles(data);
      }
         } catch (err) {
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };
  console.log("Vehicles:", vehicles); // Log the vehicles state


  const handleAddVehicle = async (name: string) => {
    try {
      await addVehicle(name);
      loadVehicles(); // Reload vehicles after adding
    } catch {
      setError('Failed to add vehicle');
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateVehicleStatus(id, status);
      loadVehicles(); // Reload vehicles after updating status
    } catch {
      setError('Failed to update vehicle status');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Management Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <AddVehicleForm onAddVehicle={handleAddVehicle} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Vehicle Name</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Last Updated</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody  className=''>
            {vehicles.map((vehicle) => (
              <VehicleRow
                key={vehicle._id}
                vehicle={vehicle}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
