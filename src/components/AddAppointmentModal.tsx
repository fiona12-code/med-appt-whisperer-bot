
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { usePatients } from "@/hooks/usePatients";
import { useDoctors } from "@/hooks/useDoctors";
import { Loader2 } from "lucide-react";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (appointment: any) => void;
}

const AddAppointmentModal = ({ isOpen, onClose, onAdd }: AddAppointmentModalProps) => {
  const { toast } = useToast();
  const { patients, loading: patientsLoading } = usePatients();
  const { doctors, loading: doctorsLoading } = useDoctors();
  
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    appointment_type: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patient_id || !formData.doctor_id || !formData.appointment_date || !formData.appointment_time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await onAdd(formData);
      setFormData({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        appointment_type: ""
      });
      onClose();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleClose = () => {
    setFormData({
      patient_id: "",
      doctor_id: "",
      appointment_date: "",
      appointment_time: "",
      appointment_type: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule New Appointment</DialogTitle>
          <DialogDescription>
            Schedule an appointment between a patient and doctor.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="patient_id">Patient *</Label>
              {patientsLoading ? (
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-500">Loading patients...</span>
                </div>
              ) : (
                <Select 
                  value={formData.patient_id} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, patient_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.first_name} {patient.last_name} - {patient.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div>
              <Label htmlFor="doctor_id">Doctor *</Label>
              {doctorsLoading ? (
                <div className="flex items-center space-x-2 p-2 border rounded">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-500">Loading doctors...</span>
                </div>
              ) : (
                <Select 
                  value={formData.doctor_id} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, doctor_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        Dr. {doctor.first_name} {doctor.last_name} - {doctor.specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appointment_date">Date *</Label>
              <Input
                id="appointment_date"
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData(prev => ({ ...prev, appointment_date: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="appointment_time">Time *</Label>
              <Input
                id="appointment_time"
                type="time"
                value={formData.appointment_time}
                onChange={(e) => setFormData(prev => ({ ...prev, appointment_time: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="appointment_type">Appointment Type</Label>
            <Input
              id="appointment_type"
              value={formData.appointment_type}
              onChange={(e) => setFormData(prev => ({ ...prev, appointment_type: e.target.value }))}
              placeholder="e.g., General Checkup, Follow-up, Consultation"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600"
              disabled={patientsLoading || doctorsLoading}
            >
              {patientsLoading || doctorsLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Schedule Appointment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentModal;
