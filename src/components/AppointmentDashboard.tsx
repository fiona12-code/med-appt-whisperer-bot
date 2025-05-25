
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, MessageSquare, Mail, Plus, Loader2 } from "lucide-react";
import AddAppointmentModal from "./AddAppointmentModal";
import { useAppointments } from "@/hooks/useAppointments";
import { format } from "date-fns";

const AppointmentDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { appointments, loading, addAppointment, sendReminder } = useAppointments();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "no_show": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getContactIcon = (method: string) => {
    switch (method) {
      case "sms": return <Phone className="h-4 w-4" />;
      case "whatsapp": return <MessageSquare className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  const getTodayAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.appointment_date === today);
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.appointment_date > today);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const todayAppointments = getTodayAppointments();
  const upcomingAppointments = getUpcomingAppointments();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAppointments.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming This Week</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reminders Sent</CardTitle>
            <MessageSquare className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(apt => apt.reminder_sent).length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <User className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Appointment Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Schedule</h2>
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Appointment
        </Button>
      </div>

      {/* Appointments List */}
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {appointment.patients.first_name} {appointment.patients.last_name}
                    </h3>
                    <p className="text-gray-600">
                      with Dr. {appointment.doctors.first_name} {appointment.doctors.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.appointment_type || appointment.doctors.specialty}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-medium">
                      {format(new Date(appointment.appointment_date), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-gray-600">{appointment.appointment_time}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getContactIcon(appointment.patients.preferred_contact_method)}
                    <span className="text-sm capitalize">
                      {appointment.patients.preferred_contact_method}
                    </span>
                  </div>
                  
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.replace('_', ' ')}
                  </Badge>
                  
                  {appointment.reminder_sent ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      ✓ Reminder Sent
                    </Badge>
                  ) : (
                    <Button
                      onClick={() => sendReminder(appointment.id)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-blue-50"
                    >
                      Send Reminder
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {appointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No appointments scheduled</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first appointment</p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Appointment
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AddAppointmentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addAppointment}
      />
    </div>
  );
};

export default AppointmentDashboard;
