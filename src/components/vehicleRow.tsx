'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Vehicle } from '@/services/vehicleServices';


interface VehicleRowProps {
  vehicle: Vehicle;
  onUpdateStatus: (id: string, status: string) => void;
}

const VehicleRow: React.FC<VehicleRowProps> = ({ vehicle, onUpdateStatus }) => {
  const { _id, name, status, lastUpdated } = vehicle;

  return (
    <tr>
      <td>{name}</td>
      <td>{status}</td>
      <td>{new Date(lastUpdated).toLocaleString()}</td>
      <td>
        <Button
          onClick={() => onUpdateStatus(_id, 'Available')}
          className="mr-2"
          variant="outline"
        >
          Set Available
        </Button>
        <Button
          onClick={() => onUpdateStatus(_id, 'In Use')}
          variant="outline"
        >
          Set In Use
        </Button>
      </td>
    </tr>
  );
};

export default VehicleRow;
