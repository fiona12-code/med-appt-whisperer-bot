
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bell, Phone, MessageSquare, Mail, Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReminderSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    smsEnabled: true,
    whatsappEnabled: true,
    emailEnabled: false,
    reminderTiming: "24", // hours before appointment
    smsTemplate: "Hi {patientName}, this is a reminder for your appointment with {doctorName} on {date} at {time}. Please reply CONFIRM to confirm or CANCEL to reschedule.",
    whatsappTemplate: "Hello {patientName}! 👋\n\nThis is a friendly reminder about your appointment:\n\n🩺 Doctor: {doctorName}\n📅 Date: {date}\n⏰ Time: {time}\n\nPlease confirm your attendance or let us know if you need to reschedule.",
    emailTemplate: `Dear {patientName},

This is a reminder for your upcoming appointment:

Doctor: {doctorName}
Date: {date}
Time: {time}
Type: {appointmentType}

Please arrive 15 minutes early for check-in.

If you need to reschedule, please contact us at least 24 hours in advance.

Best regards,
The Medical Team`,
    autoRemind: true,
    confirmationRequired: false
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your reminder settings have been updated successfully.",
    });
  };

  const previewReminder = (channel: string) => {
    const template = channel === "sms" ? settings.smsTemplate :
                    channel === "whatsapp" ? settings.whatsappTemplate :
                    settings.emailTemplate;
    
    const preview = template
      .replace("{patientName}", "John Doe")
      .replace("{doctorName}", "Dr. Smith")
      .replace("{date}", "January 15, 2024")
      .replace("{time}", "10:00 AM")
      .replace("{appointmentType}", "General Checkup");
    
    toast({
      title: `${channel.toUpperCase()} Preview`,
      description: preview.substring(0, 100) + "...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reminder Settings</h2>
        <p className="text-gray-600">Configure automatic reminder notifications for appointments</p>
      </div>

      {/* Channel Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Notification Channels</span>
          </CardTitle>
          <CardDescription>
            Enable and configure different communication channels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* SMS Settings */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium">SMS Reminders</h3>
                <p className="text-sm text-gray-600">Send text message reminders</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={settings.smsEnabled ? "default" : "secondary"}>
                {settings.smsEnabled ? "Active" : "Inactive"}
              </Badge>
              <Switch
                checked={settings.smsEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsEnabled: checked }))}
              />
            </div>
          </div>

          {/* WhatsApp Settings */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium">WhatsApp Reminders</h3>
                <p className="text-sm text-gray-600">Send WhatsApp message reminders</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={settings.whatsappEnabled ? "default" : "secondary"}>
                {settings.whatsappEnabled ? "Active" : "Inactive"}
              </Badge>
              <Switch
                checked={settings.whatsappEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, whatsappEnabled: checked }))}
              />
            </div>
          </div>

          {/* Email Settings */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-purple-600" />
              <div>
                <h3 className="font-medium">Email Reminders</h3>
                <p className="text-sm text-gray-600">Send email reminders</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={settings.emailEnabled ? "default" : "secondary"}>
                {settings.emailEnabled ? "Active" : "Inactive"}
              </Badge>
              <Switch
                checked={settings.emailEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailEnabled: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Timing Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reminderTiming">Send Reminder</Label>
              <Select value={settings.reminderTiming} onValueChange={(value) => setSettings(prev => ({ ...prev, reminderTiming: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour before</SelectItem>
                  <SelectItem value="2">2 hours before</SelectItem>
                  <SelectItem value="6">6 hours before</SelectItem>
                  <SelectItem value="24">24 hours before</SelectItem>
                  <SelectItem value="48">48 hours before</SelectItem>
                  <SelectItem value="72">72 hours before</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Additional Options</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.autoRemind}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRemind: checked }))}
                />
                <span className="text-sm">Auto-send reminders</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.confirmationRequired}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, confirmationRequired: checked }))}
                />
                <span className="text-sm">Require confirmation</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <div className="grid gap-6">
        {/* SMS Template */}
        {settings.smsEnabled && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SMS Template</CardTitle>
              <CardDescription>Customize your SMS reminder message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={settings.smsTemplate}
                onChange={(e) => setSettings(prev => ({ ...prev, smsTemplate: e.target.value }))}
                rows={3}
                placeholder="Enter SMS template..."
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Available variables: {"{patientName}"}, {"{doctorName}"}, {"{date}"}, {"{time}"}
                </p>
                <Button variant="outline" size="sm" onClick={() => previewReminder("sms")}>
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* WhatsApp Template */}
        {settings.whatsappEnabled && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">WhatsApp Template</CardTitle>
              <CardDescription>Customize your WhatsApp reminder message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={settings.whatsappTemplate}
                onChange={(e) => setSettings(prev => ({ ...prev, whatsappTemplate: e.target.value }))}
                rows={6}
                placeholder="Enter WhatsApp template..."
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Available variables: {"{patientName}"}, {"{doctorName}"}, {"{date}"}, {"{time}"}
                </p>
                <Button variant="outline" size="sm" onClick={() => previewReminder("whatsapp")}>
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Email Template */}
        {settings.emailEnabled && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Template</CardTitle>
              <CardDescription>Customize your email reminder message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={settings.emailTemplate}
                onChange={(e) => setSettings(prev => ({ ...prev, emailTemplate: e.target.value }))}
                rows={8}
                placeholder="Enter email template..."
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Available variables: {"{patientName}"}, {"{doctorName}"}, {"{date}"}, {"{time}"}, {"{appointmentType}"}
                </p>
                <Button variant="outline" size="sm" onClick={() => previewReminder("email")}>
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default ReminderSettings;
