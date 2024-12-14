'use client';

import React, { useState, FormEvent } from 'react';
import  { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

interface AddVehicleFormProps {
  onAddVehicle: (name: string) => void;
}

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ onAddVehicle }) => {
  const [vehicleName, setVehicleName] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!vehicleName.trim()) return;
    onAddVehicle(vehicleName);
    setVehicleName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center">
      <Input
        type="text"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
        placeholder="Enter vehicle name"
        className="mr-2"
      />
      <Button type="submit">Add Vehicle</Button>
    </form>
  );
};

export default AddVehicleForm;
