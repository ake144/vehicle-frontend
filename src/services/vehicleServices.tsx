const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/vehicles/';

export interface Vehicle {
  _id: string;
  name: string;
  status: string;
  lastUpdated: string;
}

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch vehicles');

  const data = await response.json();

  // Ensure the response is structured as expected
  if (!data.vehicles || !Array.isArray(data.vehicles)) {
    console.error("Invalid response format", data);
    throw new Error("Invalid response format");
  }

  return data.vehicles;
};





export const addVehicle = async (name: string): Promise<void> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, status: 'Available' }),
  });
  if (!response.ok) throw new Error('Failed to add vehicle');
};

export const updateVehicleStatus = async (id: string, status: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update vehicle status');
};
