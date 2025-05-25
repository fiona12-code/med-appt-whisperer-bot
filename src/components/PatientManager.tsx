
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MessageSquare, Search, Plus, Edit, Loader2 } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { format } from "date-fns";

const PatientManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { patients, loading } = usePatients();

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
            <CardTitle className="text-sm font-medium">SMS Preferred</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter(p => p.preferred_contact_method === "sms").length}
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
              {patients.filter(p => p.preferred_contact_method === "whatsapp").length}
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
                    <h3 className="font-semibold text-lg">
                      {patient.first_name} {patient.last_name}
                    </h3>
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
                    {patient.date_of_birth && (
                      <p className="text-sm text-gray-500">
                        Born: {format(new Date(patient.date_of_birth), 'MMM dd, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Registered</p>
                    <p className="font-medium">
                      {format(new Date(patient.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  
                  <Badge className={getContactColor(patient.preferred_contact_method)}>
                    <div className="flex items-center space-x-1">
                      {getContactIcon(patient.preferred_contact_method)}
                      <span className="capitalize">{patient.preferred_contact_method}</span>
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
        
        {filteredPatients.length === 0 && patients.length > 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No patients found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </CardContent>
          </Card>
        )}
        
        {patients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No patients registered</h3>
              <p className="text-gray-500 mb-4">Start by adding your first patient</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Patient
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientManager;
