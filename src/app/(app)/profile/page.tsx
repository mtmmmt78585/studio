
"use client";

import { mainUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid3x3, Bookmark, Heart, UserPlus, Eye, Menu, Camera, Plus, ChevronDown, User, Shield, Bell, Link2, Languages, Wallet, BadgePercent, History, UserX, Palette, VolumeX, Lock, Search, MessageSquareWarning, HelpCircle, Bot, LogOut, Trash2, FileText, FlaskConical, ChevronRight, UploadCloud, } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";


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

const ProfilePostTile = React.memo(function ProfilePostTile({ index }: { index: number }) {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        setViewCount(Math.floor(Math.random() * 100000) + 100);
    }, []);

    const formatViews = (num: number) => {
        if (num >= 10000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toLocaleString();
    }

    return (
        <div className="aspect-video bg-card relative">
            <Image
                src={`https://placehold.co/300x500.png?text=Post${index + 1}`}
                alt={`User post ${index}`}
                fill
                className="object-cover"
                data-ai-hint="user content"
            />
            {viewCount > 0 ? (
                <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/30 text-white text-xs px-1 rounded">
                    <Eye className="h-3 w-3" />
                    <span>{formatViews(viewCount)}</span>
                </div>
            ) : (
                <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-black/30 text-white text-xs px-1 rounded">
                    <Skeleton className="h-3 w-8" />
                </div>
            )}
        </div>
    );
});


const SettingsContent = dynamic(() => Promise.resolve(({ settings, handleToggle, handleSelectChange, handleAction, handleLogout, router }: any) => (
    <ScrollArea className="flex-1 -mx-6 px-6">
        <div className="space-y-8 pb-8">
            <SettingsSection title="Account">
                <SettingsItem icon={User} title="Edit Profile" action={<NavAction />} onClick={() => router.push('/profile')} />
                <SettingsItem icon={Lock} title="Change Password" action={<NavAction />} onClick={() => router.push('/forgot-password')} />
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
    </ScrollArea>
)), {
    loading: () => <div className="flex-1 flex items-center justify-center"><p>Loading settings...</p></div>
});


export default function ProfilePage() {
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
    <div className="h-full flex flex-col">
       {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
            <UserPlus className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1 font-bold">
            <span>{mainUser.username}</span>
            <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-4">
          <Eye className="h-6 w-6" />
          <Sheet>
            <SheetTrigger asChild>
                <button><Menu className="h-6 w-6" /></button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle className="font-headline text-2xl">Settings</SheetTitle>
                </SheetHeader>
                <SettingsContent 
                    settings={settings} 
                    handleToggle={handleToggle} 
                    handleSelectChange={handleSelectChange} 
                    handleAction={handleAction} 
                    handleLogout={handleLogout} 
                    router={router} 
                />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-2">
                <Avatar className="h-28 w-28 border-2 border-muted">
                    <div className="bg-muted h-full w-full flex items-center justify-center">
                       <Camera className="h-10 w-10 text-muted-foreground"/>
                    </div>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-background">
                    <Plus className="h-4 w-4 text-primary-foreground"/>
                </div>
            </div>
            <p className="font-semibold mb-4">@{mainUser.username}</p>

            {/* Stats */}
            <div className="flex justify-around w-full max-w-sm mb-4">
                <div className="text-center">
                    <p className="font-bold text-lg">{mainUser.following}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg">{(mainUser.followers / 1000).toFixed(1)}k</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-lg">{mainUser.uploads}</p>
                    <p className="text-sm text-muted-foreground">Uploads</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mb-4">
                <Button variant="outline" className="flex-1 px-8">Edit profile</Button>
                <Button variant="outline" className="px-4">
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </div>
            <Button variant="link" size="sm" className="text-muted-foreground">+ Add bio</Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-t">
                <TabsTrigger value="posts" className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"><Grid3x3 className="h-6 w-6" /></TabsTrigger>
                <TabsTrigger value="saved" className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"><Bookmark className="h-6 w-6" /></TabsTrigger>
                <TabsTrigger value="liked" className="py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"><Heart className="h-6 w-6" /></TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-0">
                 <div className="grid grid-cols-3 gap-0.5">
                    {Array.from({ length: mainUser.uploads }).map((_, i) => (
                        <ProfilePostTile key={i} index={i} />
                    ))}
                </div>
                 {mainUser.uploads === 0 && (
                    <div className="text-center text-muted-foreground p-8">
                        <UploadCloud className="h-12 w-12 mx-auto mb-2"/>
                        <h3 className="font-bold text-lg">No Posts Yet</h3>
                        <p className="text-sm">Your posts will appear here.</p>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="saved" className="mt-0">
                <div className="text-center text-muted-foreground p-8">
                    <Bookmark className="h-12 w-12 mx-auto mb-2"/>
                    <h3 className="font-bold text-lg">Your Saved Videos</h3>
                    <p className="text-sm">These videos are only visible to you.</p>
                </div>
            </TabsContent>
            <TabsContent value="liked" className="mt-0">
                 <div className="text-center text-muted-foreground p-8">
                    <Heart className="h-12 w-12 mx-auto mb-2"/>
                    <h3 className="font-bold text-lg">Your Liked Videos</h3>
                    <p className="text-sm">Your liked videos will appear here.</p>
                </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
