
"use client";

import {
  User,
  Shield,
  Bell,
  Link2,
  Languages,
  Wallet,
  BadgePercent,
  History,
  UserX,
  Palette,
  VolumeX,
  Lock,
  Search,
  MessageSquareWarning,
  HelpCircle,
  Bot,
  LogOut,
  Trash2,
  FileText,
  FlaskConical,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-headline font-semibold text-primary">{title}</h2>
    <div className="space-y-2 divide-y divide-border rounded-lg border bg-card/50 shadow-sm">
      {children}
    </div>
  </div>
);

const SettingsItem = ({ icon, title, subtitle, action, onClick }: { icon: React.ElementType, title: string, subtitle?: string, action: React.ReactNode, onClick?: () => void }) => (
  <div className="flex items-center p-4" onClick={onClick} role={onClick ? 'button' : undefined}>
    <div className="flex items-center gap-4 flex-1">
        <div className="bg-card p-2 rounded-lg">
           {React.createElement(icon, { className: "h-5 w-5 text-primary" })}
        </div>
        <div className="flex-1">
            <p className="font-medium">{title}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
    </div>
    <div>{action}</div>
  </div>
);

const NavAction = () => <ChevronRight className="h-5 w-5 text-muted-foreground" />;
const ToggleAction = ({ id, checked, onCheckedChange }: { id: string, checked: boolean, onCheckedChange: (checked: boolean) => void }) => (
    <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
);

export default function SettingsPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [settings, setSettings] = useState({
      privateAccount: false,
      twoFactorAuth: false,
      appTheme: "dark",
      muteSounds: false,
      language: "en",
      aiSuggestions: true,
      pushNotifications: true,
      adNotifications: false,
      experimentalFeatures: false,
  });

  const handleToggle = (id: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [id]: checked }));
      toast({
          title: "Settings Updated",
          description: `${id.replace(/([A-Z])/g, ' $1').trim()} has been ${checked ? "enabled" : "disabled"}.`
      });
  };

  const handleSelectChange = (id: keyof typeof settings) => (value: string) => {
      setSettings(prev => ({ ...prev, [id]: value }));
      toast({
          title: "Settings Updated",
          description: `${id.replace(/([A-Z])/g, ' $1').trim()} has been set to ${value}.`
      });
  };
  
  const handleAction = (title: string, description?: string) => {
      toast({ title, description: description ?? "This feature is coming soon!" });
  }
  
  const handleLogout = () => {
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push('/login');
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-8">
      <div className="text-center">
          <h1 className="text-2xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <SettingsSection title="Account">
        <SettingsItem icon={User} title="Edit Profile" action={<NavAction />} onClick={() => router.push('/profile')} />
        <SettingsItem icon={Lock} title="Change Password" action={<NavAction />} onClick={() => handleAction("Change Password", "Functionality to change password will be added soon.")} />
      </SettingsSection>

      <SettingsSection title="Privacy & Security">
        <SettingsItem icon={Shield} title="Private Account" action={<ToggleAction id="privateAccount" checked={settings.privateAccount} onCheckedChange={handleToggle('privateAccount')}/>} />
        <SettingsItem icon={UserX} title="Blocked Users" subtitle="2 users" action={<NavAction />} onClick={() => handleAction("Blocked Users")} />
        <SettingsItem icon={Lock} title="Two-Factor Authentication" subtitle={settings.twoFactorAuth ? "On" : "Off"} action={<ToggleAction id="twoFactorAuth" checked={settings.twoFactorAuth} onCheckedChange={handleToggle('twoFactorAuth')} />} />
      </SettingsSection>
      
      <SettingsSection title="Content & Display">
        <SettingsItem icon={Palette} title="App Theme" action={
            <Select value={settings.appTheme} onValueChange={handleSelectChange('appTheme')}>
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
        }/>
        <SettingsItem icon={VolumeX} title="Mute All Sounds" action={<ToggleAction id="muteSounds" checked={settings.muteSounds} onCheckedChange={handleToggle('muteSounds')}/>} />
         <SettingsItem icon={Languages} title="Language" action={
             <Select value={settings.language} onValueChange={handleSelectChange('language')}>
              <SelectTrigger className="w-[120px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
        }/>
        <SettingsItem icon={Bot} title="AI Content Suggestions" action={<ToggleAction id="aiSuggestions" checked={settings.aiSuggestions} onCheckedChange={handleToggle('aiSuggestions')} />} />
      </SettingsSection>


      <SettingsSection title="Notifications">
        <SettingsItem icon={Bell} title="Push Notifications" action={<ToggleAction id="pushNotifications" checked={settings.pushNotifications} onCheckedChange={handleToggle('pushNotifications')} />} />
        <SettingsItem icon={BadgePercent} title="Ad Notifications" action={<ToggleAction id="adNotifications" checked={settings.adNotifications} onCheckedChange={handleToggle('adNotifications')} />} />
      </SettingsSection>
      
      <SettingsSection title="Wallet & Ads">
         <SettingsItem icon={Wallet} title="Earnings & Wallet" subtitle="$1,234.56" action={<NavAction />} onClick={() => router.push('/profile')}/>
         <SettingsItem icon={BadgePercent} title="Ad Preferences" action={<NavAction />} onClick={() => handleAction("Ad Preferences")} />
      </SettingsSection>

      <SettingsSection title="History & Data">
        <SettingsItem icon={History} title="Watch History" action={<Button variant="secondary" size="sm" onClick={() => handleAction("Watch History Cleared", "Your watch history has been cleared.")}>Clear</Button>} />
        <SettingsItem icon={Search} title="Search History" action={<Button variant="secondary" size="sm" onClick={() => handleAction("Search History Cleared", "Your search history has been cleared.")}>Clear</Button>} />
        <SettingsItem icon={Trash2} title="Clear Cache" subtitle="128 MB" action={<Button variant="secondary" size="sm" onClick={() => handleAction("Cache Cleared", "128 MB of data was freed.")}>Clear</Button>} />
      </SettingsSection>
      
       <SettingsSection title="Connections">
        <SettingsItem icon={Link2} title="Linked Accounts" action={<NavAction />} onClick={() => handleAction("Linked Accounts")} />
      </SettingsSection>

      <SettingsSection title="Support & About">
        <SettingsItem icon={MessageSquareWarning} title="Report a Problem" action={<NavAction />} onClick={() => handleAction("Report a Problem")} />
        <SettingsItem icon={HelpCircle} title="Help Center / FAQ" action={<NavAction />} onClick={() => handleAction("Help Center / FAQ")} />
        <SettingsItem icon={FileText} title="Terms & Privacy Policy" action={<NavAction />} onClick={() => handleAction("Terms & Privacy Policy")} />
      </SettingsSection>
      
       <SettingsSection title="Advanced">
        <SettingsItem icon={FlaskConical} title="Experimental Features" subtitle="Access beta features" action={<ToggleAction id="experimentalFeatures" checked={settings.experimentalFeatures} onCheckedChange={handleToggle('experimentalFeatures')} />} />
      </SettingsSection>


      <div className="text-center pt-4">
        <Button variant="destructive" className="w-full max-w-sm shadow-glow" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4"/>
            Log Out
        </Button>
      </div>

       <div className="text-center text-xs text-muted-foreground pt-4">
          <p>Yappzy v1.0.0</p>
          <p>Made with ❤️ in India</p>
        </div>
    </div>
  );
}
