
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, MessageSquare, Mail, Plus } from "lucide-react";
import AddAppointmentModal from "./AddAppointmentModal";

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "today" | "missed";
  reminderSent: boolean;
  contactMethod: "sms" | "whatsapp" | "email";
  phone: string;
}

const AppointmentDashboard = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      doctorName: "Dr. Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "General Checkup",
      status: "upcoming",
      reminderSent: true,
      contactMethod: "sms",
      phone: "+1234567890"
    },
    {
      id: "2",
      patientName: "Mike Wilson",
      doctorName: "Dr. Brown",
      date: "2024-01-15",
      time: "2:30 PM",
      type: "Dental Cleaning",
      status: "today",
      reminderSent: false,
      contactMethod: "whatsapp",
      phone: "+1234567891"
    },
    {
      id: "3",
      patientName: "Emily Davis",
      doctorName: "Dr. Johnson",
      date: "2024-01-16",
      time: "9:15 AM",
      type: "Follow-up",
      status: "upcoming",
      reminderSent: false,
      contactMethod: "email",
      phone: "+1234567892"
    }
  ]);

  const sendReminder = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, reminderSent: true }
          : apt
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "today": return "bg-green-100 text-green-800";
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "missed": return "bg-red-100 text-red-800";
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

  const todayAppointments = appointments.filter(apt => apt.status === "today");
  const upcomingAppointments = appointments.filter(apt => apt.status === "upcoming");

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
              {appointments.filter(apt => apt.reminderSent).length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
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
                    <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                    <p className="text-gray-600">with {appointment.doctorName}</p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-gray-600">{appointment.time}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getContactIcon(appointment.contactMethod)}
                    <span className="text-sm capitalize">{appointment.contactMethod}</span>
                  </div>
                  
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  
                  {appointment.reminderSent ? (
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
      </div>

      <AddAppointmentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newAppointment) => {
          setAppointments(prev => [...prev, newAppointment]);
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
};

export default AppointmentDashboard;
