'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { addVehicle, fetchVehicles, updateVehicleStatus, Vehicle } from '@/services/vehicleServices'
import AddVehicleForm from '@/components/addVehicleForm'
import VehicleRow from '@/components/vehicleRow'

export default function Dashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState<boolean>(false)

  const { toast } = useToast()

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchVehicles()
      if (JSON.stringify(data) !== JSON.stringify(vehicles)) {
        setVehicles(data)
      }
    } catch (err) {
      setError('Failed to load vehicles')
      toast({
        title: "Error Loading Vehicles",
        description: "There was an error while loading the vehicles. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddVehicle = async (name: string) => {
    try {
      await addVehicle(name)
      toast({
        title: "Vehicle Added",
        description: `The vehicle "${name}" was added successfully.`,
        variant: "default",
      })
      loadVehicles()
      setIsAddVehicleOpen(false)
    } catch {
      setError('Failed to add vehicle')
      toast({
        title: "Error Adding Vehicle",
        description: "There was an error while adding the vehicle. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateVehicleStatus(id, status)
      toast({
        title: "Status Updated",
        description: `The status was successfully updated to "${status}".`,
        variant: "default",
      })
      loadVehicles()
    } catch {
      setError('Failed to update vehicle status')
      toast({
        title: "Error Updating Status",
        description: "Failed to update the status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Vehicle Management Dashboard</h1>
        <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>
                Enter the details of the new vehicle below.
              </DialogDescription>
            </DialogHeader>
            <AddVehicleForm onAddVehicle={handleAddVehicle} />
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search vehicles..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={loadVehicles}>Refresh</Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Vehicle Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <VehicleRow
                  key={vehicle._id}
                  vehicle={vehicle}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

