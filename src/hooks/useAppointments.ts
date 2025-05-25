
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  reminder_sent: boolean;
  patients: {
    first_name: string;
    last_name: string;
    phone: string;
    preferred_contact_method: 'sms' | 'whatsapp' | 'email';
  };
  doctors: {
    first_name: string;
    last_name: string;
    specialty?: string;
  };
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patients (
            first_name,
            last_name,
            phone,
            preferred_contact_method
          ),
          doctors (
            first_name,
            last_name,
            specialty
          )
        `)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointmentData: {
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    appointment_type?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select(`
          *,
          patients (
            first_name,
            last_name,
            phone,
            preferred_contact_method
          ),
          doctors (
            first_name,
            last_name,
            specialty
          )
        `)
        .single();

      if (error) throw error;
      
      setAppointments(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      });
      return data;
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
      });
      throw error;
    }
  };

  const sendReminder = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ 
          reminder_sent: true,
          reminder_sent_at: new Date().toISOString()
        })
        .eq('id', appointmentId);

      if (error) throw error;

      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, reminder_sent: true }
            : apt
        )
      );

      toast({
        title: "Success",
        description: "Reminder sent successfully",
      });
    } catch (error) {
      console.error('Error sending reminder:', error);
      toast({
        title: "Error",
        description: "Failed to send reminder",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    loading,
    addAppointment,
    sendReminder,
    refetch: fetchAppointments
  };
};
