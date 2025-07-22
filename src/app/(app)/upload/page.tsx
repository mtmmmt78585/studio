
"use client";

import { useState, useRef, useEffect } from "react";
import { Video, Sparkles, SwitchCamera, FlipHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { effects } from "@/lib/data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);
  
  const toggleMirror = () => {
      setIsMirrored(prev => !prev);
  }

  return (
    <div className="h-full flex flex-col items-center justify-start p-4 bg-background text-white">
        <div className="w-full max-w-lg space-y-6 mt-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold font-headline">Create</h1>
                <p className="text-muted-foreground">What will you share today?</p>
            </div>

            <Card className="overflow-hidden relative">
                <CardContent className="p-0">
                     {/* The video element is always rendered to prevent race conditions */}
                     <video ref={videoRef} className={cn("w-full aspect-[9/16] object-cover bg-black", isMirrored && "scale-x-[-1]")} autoPlay muted playsInline />
                </CardContent>
                 <div className="absolute top-4 right-4 flex flex-col gap-4">
                    <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={() => {}} disabled={true}>
                        <SwitchCamera />
                    </Button>
                     <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={toggleMirror}>
                        <FlipHorizontal />
                    </Button>
                </div>

                { !hasCameraPermission && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                        <Alert variant="destructive" className="w-4/5">
                            <AlertTitle>Camera Access Required</AlertTitle>
                            <AlertDescription>
                            Please allow camera access to use this feature.
                            </AlertDescription>
                        </Alert>
                    </div>
                )
                }
            </Card>

             <div className="flex items-center justify-center gap-4">
                <Button className="w-20 h-20 rounded-full bg-primary shadow-glow flex items-center justify-center" disabled={!hasCameraPermission}>
                    <Video className="h-8 w-8 text-primary-foreground"/>
                </Button>
            </div>
        </div>
    </div>
  );
}
