
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MessageSquare, Search, Plus, Edit } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: "sms" | "whatsapp" | "email";
  lastAppointment: string;
  upcomingAppointments: number;
}

const PatientManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState<Patient[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      preferredContact: "sms",
      lastAppointment: "2024-01-10",
      upcomingAppointments: 1
    },
    {
      id: "2",
      name: "Mike Wilson",
      email: "mike.w@email.com",
      phone: "+1 (555) 234-5678",
      preferredContact: "whatsapp",
      lastAppointment: "2024-01-08",
      upcomingAppointments: 1
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+1 (555) 345-6789",
      preferredContact: "email",
      lastAppointment: "2024-01-05",
      upcomingAppointments: 1
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.s@email.com",
      phone: "+1 (555) 456-7890",
      preferredContact: "sms",
      lastAppointment: "2024-01-12",
      upcomingAppointments: 0
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const getContactIcon = (method: string) => {
    switch (method) {
      case "sms": return <Phone className="h-4 w-4" />;
      case "whatsapp": return <MessageSquare className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  const getContactColor = (method: string) => {
    switch (method) {
      case "sms": return "bg-blue-100 text-blue-800";
      case "whatsapp": return "bg-green-100 text-green-800";
      case "email": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage patient information and communication preferences</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patient Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Appointments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.reduce((sum, patient) => sum + patient.upcomingAppointments, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Users</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter(p => p.preferredContact === "whatsapp").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patients List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{patient.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{patient.email}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{patient.phone}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="font-medium">{patient.lastAppointment}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="font-medium text-blue-600">{patient.upcomingAppointments}</p>
                  </div>
                  
                  <Badge className={getContactColor(patient.preferredContact)}>
                    <div className="flex items-center space-x-1">
                      {getContactIcon(patient.preferredContact)}
                      <span className="capitalize">{patient.preferredContact}</span>
                    </div>
                  </Badge>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientManager;
