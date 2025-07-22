"use client";

import { mainUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckCircle, Grid3x3, Clapperboard, DollarSign, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Link from "next/link";

const earningsData = [
    { month: "Jan", earnings: 1200 },
    { month: "Feb", earnings: 1800 },
    { month: "Mar", earnings: 1500 },
    { month: "Apr", earnings: 2200 },
    { month: "May", earnings: 2500 },
    { month: "Jun", earnings: 3100 },
];

export default function ProfilePage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-primary">
            <AvatarImage src={mainUser.avatar} />
            <AvatarFallback>{mainUser.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-center justify-around">
            <div className="text-center">
              <p className="font-bold text-lg">25</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{(mainUser.followers / 1000).toFixed(1)}k</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{mainUser.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold">{mainUser.username}</h1>
            {mainUser.isVerified && <CheckCircle className="h-4 w-4 text-accent" fill="hsl(var(--background))" />}
          </div>
          <p className="text-sm text-muted-foreground">App Developer | Building cool stuff with code.</p>
        </div>
        <div className="flex gap-2">
            <Button className="flex-1">Edit Profile</Button>
            <Button variant="secondary" className="flex-1">Share Profile</Button>
            <Link href="/settings" className="shrink-0">
              <Button variant="secondary" size="icon"><Settings className="h-4 w-4"/></Button>
            </Link>
        </div>
      </div>
        <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts"><Grid3x3 className="h-5 w-5" /></TabsTrigger>
                <TabsTrigger value="videos"><Clapperboard className="h-5 w-5" /></TabsTrigger>
                <TabsTrigger value="earnings" disabled={!mainUser.isVerified}>
                  <DollarSign className={`h-5 w-5 ${mainUser.isVerified ? 'text-accent' : ''}`} />
                </TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
                 <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="aspect-square bg-card relative">
                            <Image
                                src={`https://placehold.co/300x300.png?text=Post${i+1}`}
                                alt={`User post ${i}`}
                                fill
                                className="object-cover"
                                data-ai-hint="user content"
                            />
                        </div>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="videos">
                <p className="text-center text-muted-foreground p-8">No videos yet.</p>
            </TabsContent>
            <TabsContent value="earnings">
                <Card className="m-2">
                    <CardHeader>
                        <CardTitle className="text-accent font-headline">Creator Earnings</CardTitle>
                        <CardDescription>Your estimated revenue for the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={earningsData}>
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                                <Bar dataKey="earnings" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-muted-foreground">This Month's Total</p>
                            <p className="text-3xl font-bold text-accent">${earningsData[earningsData.length - 1].earnings.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
