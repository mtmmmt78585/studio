// src/app/(app)/settings/page.tsx
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
import React from "react";

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-headline font-semibold text-primary">{title}</h2>
    <div className="space-y-2 divide-y divide-border rounded-lg border bg-card/50 shadow-sm">
      {children}
    </div>
  </div>
);

const SettingsItem = ({ icon, title, subtitle, action }: { icon: React.ElementType, title: string, subtitle?: string, action: React.ReactNode }) => (
  <div className="flex items-center p-4">
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
const ToggleAction = ({ id }: { id: string }) => <Switch id={id} />;

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-8">
      <div className="text-center">
          <h1 className="text-2xl font-bold font-headline">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <SettingsSection title="Account">
        <SettingsItem icon={User} title="Edit Profile" action={<NavAction />} />
        <SettingsItem icon={Lock} title="Change Password" action={<NavAction />} />
      </SettingsSection>

      <SettingsSection title="Privacy & Security">
        <SettingsItem icon={Shield} title="Private Account" action={<ToggleAction id="private-account"/>} />
        <SettingsItem icon={UserX} title="Blocked Users" subtitle="2 users" action={<NavAction />} />
        <SettingsItem icon={Lock} title="Two-Factor Authentication" subtitle="Off" action={<NavAction />} />
      </SettingsSection>
      
      <SettingsSection title="Content & Display">
        <SettingsItem icon={Palette} title="App Theme" action={
            <Select defaultValue="dark">
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
        <SettingsItem icon={VolumeX} title="Mute All Sounds" action={<ToggleAction id="mute-sounds"/>} />
         <SettingsItem icon={Languages} title="Language" action={
             <Select defaultValue="en">
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
        <SettingsItem icon={Bot} title="AI Content Suggestions" action={<ToggleAction id="ai-suggestions" defaultChecked />} />
      </SettingsSection>


      <SettingsSection title="Notifications">
        <SettingsItem icon={Bell} title="Push Notifications" action={<ToggleAction id="push-notifs" defaultChecked />} />
        <SettingsItem icon={BadgePercent} title="Ad Notifications" action={<ToggleAction id="ad-notifs" />} />
      </SettingsSection>
      
      <SettingsSection title="Wallet & Ads">
         <SettingsItem icon={Wallet} title="Earnings & Wallet" subtitle="$1,234.56" action={<NavAction />} />
         <SettingsItem icon={BadgePercent} title="Ad Preferences" action={<NavAction />} />
      </SettingsSection>

      <SettingsSection title="History & Data">
        <SettingsItem icon={History} title="Watch History" action={<Button variant="secondary" size="sm">Clear</Button>} />
        <SettingsItem icon={Search} title="Search History" action={<Button variant="secondary" size="sm">Clear</Button>} />
        <SettingsItem icon={Trash2} title="Clear Cache" subtitle="128 MB" action={<Button variant="secondary" size="sm">Clear</Button>} />
      </SettingsSection>
      
       <SettingsSection title="Connections">
        <SettingsItem icon={Link2} title="Linked Accounts" action={<NavAction />} />
      </SettingsSection>

      <SettingsSection title="Support & About">
        <SettingsItem icon={MessageSquareWarning} title="Report a Problem" action={<NavAction />} />
        <SettingsItem icon={HelpCircle} title="Help Center / FAQ" action={<NavAction />} />
        <SettingsItem icon={FileText} title="Terms & Privacy Policy" action={<NavAction />} />
      </SettingsSection>
      
       <SettingsSection title="Advanced">
        <SettingsItem icon={FlaskConical} title="Experimental Features" subtitle="Access beta features" action={<ToggleAction id="beta-features"/>} />
      </SettingsSection>


      <div className="text-center pt-4">
        <Button variant="destructive" className="w-full max-w-sm shadow-glow">
            <LogOut className="mr-2 h-4 w-4"/>
            Log Out
        </Button>
      </div>

       <div className="text-center text-xs text-muted-foreground pt-4">
          <p>Pixgram v1.0.0</p>
          <p>Made with ❤️ in India</p>
        </div>
    </div>
  );
}
