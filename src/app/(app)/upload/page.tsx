"use client";

import { useState, useRef, useEffect } from "react";
import { Video, Sparkles, SwitchCamera, FlipHorizontal, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { songs } from "@/lib/data";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UploadPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true); // Assume true initially
  const [isMirrored, setIsMirrored] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSong, setSelectedSong] = useState<(typeof songs)[0] | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        if ((error as Error).name === 'NotAllowedError') {
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this feature.',
            });
        }
      }
    };

    if (typeof window !== "undefined") {
        getCameraPermission();
    }
  }, [toast]);

  const toggleMirror = () => {
    setIsMirrored(prev => !prev);
  };
  
  const handleRecord = () => {
    setIsRecording(prev => !prev);
    // TODO: Add actual recording logic
    toast({
        title: isRecording ? "Recording Stopped" : "Recording Started!",
        description: isRecording ? "Your video is ready for the next step." : "Capture your moment.",
    });
  }

  return (
    <div className="h-full flex flex-col items-center justify-start p-4 bg-background text-white">
      <div className="w-full max-w-lg space-y-4">
        <div className="absolute top-4 left-4 z-10">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="bg-background/50 backdrop-blur-sm">
                        <Music className="mr-2 h-4 w-4"/>
                        Add Music
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-4/5 flex flex-col bg-background/90 backdrop-blur-sm">
                    <SheetHeader>
                        <SheetTitle className="font-headline">Choose Music</SheetTitle>
                    </SheetHeader>
                     <div className="relative mb-4">
                        <Input placeholder="Search for songs..." className="bg-card/80"/>
                    </div>
                    <ScrollArea className="flex-1">
                       <div className="space-y-2">
                            {songs.map(song => (
                                <div key={song.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card cursor-pointer" onClick={() => setSelectedSong(song)}>
                                    <Image src={song.coverArtUrl} alt={song.title} width={50} height={50} className="rounded-md" data-ai-hint="music album cover" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{song.title}</p>
                                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{song.duration}</p>
                                </div>
                            ))}
                       </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>

        <Card className="overflow-hidden relative shadow-glow">
          <CardContent className="p-0">
            <video ref={videoRef} className={cn("w-full aspect-[9/16] object-cover bg-black", isMirrored && "scale-x-[-1]")} autoPlay muted playsInline />
            
            {!hasCameraPermission && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <Alert variant="destructive" className="w-4/5">
                  <AlertTitle>Camera Access Denied</AlertTitle>
                  <AlertDescription>
                    Please allow camera access to use this feature.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
          <div className="absolute top-4 right-4 flex flex-col gap-4">
            <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={() => {}} disabled={true}>
              <SwitchCamera />
            </Button>
            <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={toggleMirror}>
              <FlipHorizontal />
            </Button>
          </div>
        </Card>

        {selectedSong && (
            <div className="bg-card/80 p-2 rounded-lg text-center text-xs">
                <p>🎵 {selectedSong.title} - {selectedSong.artist}</p>
            </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <Button
            className={cn("w-20 h-20 rounded-full bg-primary shadow-glow flex items-center justify-center transition-all", isRecording && "bg-transparent border-4 border-primary")}
            disabled={!hasCameraPermission}
            onClick={handleRecord}
          >
             <div className={cn("w-16 h-16 rounded-full bg-primary transition-all", isRecording && "w-6 h-6")}></div>
          </Button>
        </div>
      </div>
    </div>
  );
}
