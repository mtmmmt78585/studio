
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Video, Sparkles, SwitchCamera, FlipHorizontal, Music, Library, X, Timer, Clock, Zap, FolderUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { songs } from "@/lib/data";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const { toast } = useToast();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSong, setSelectedSong] = useState<(typeof songs)[0] | null>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const getCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      if ((error as Error).name === 'NotAllowedError' || (error as Error).name === 'PermissionDeniedError') {
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this feature.',
          });
      }
    }
  }, [toast]);

  useEffect(() => {
    getCameraPermission();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [getCameraPermission]);

  const toggleMirror = () => setIsMirrored(prev => !prev);
  
  const handleRecord = () => {
    setIsRecording(prev => !prev);
    toast({
        title: isRecording ? "Recording Stopped" : "Recording Started!",
        description: isRecording ? "Your video is ready for the next step." : "Capture your moment.",
    });
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please select a valid video file.",
      });
    }
  };

  const handleUpload = () => {
    if (!videoFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete!",
            description: "Your video is ready to be published.",
          });
          router.push('/feed');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (videoFile) {
    return (
       <div className="h-full flex flex-col items-center justify-start p-4 space-y-4 bg-background">
            <div className="w-full max-w-lg">
                 <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold font-headline">Edit & Post</h1>
                    <Button variant="ghost" size="icon" onClick={() => setVideoFile(null)}><X className="h-5 w-5"/></Button>
                 </div>

                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <video src={URL.createObjectURL(videoFile)} className="w-full h-full object-cover" controls />
                </div>

                {isUploading && (
                    <div className="my-4">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-center text-sm mt-2">{uploadProgress}%</p>
                    </div>
                )}
                
                <div className="space-y-4 my-4">
                    <Textarea placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <Input placeholder="Add #tags, separated by commas..." value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                
                <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                    {isUploading ? "Uploading..." : "Post Video"}
                </Button>
            </div>
       </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col bg-black text-white relative">
      {/* Camera View */}
      <div className="relative flex-1 w-full h-full">
        <video 
            ref={videoRef} 
            className={cn("w-full h-full object-cover", isMirrored && "scale-x-[-1]")} 
            autoPlay 
            muted 
            playsInline 
        />
        {!hasCameraPermission && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4">
                <Alert variant="destructive" className="w-full max-w-sm">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                    Please allow camera access in your browser settings to use this feature.
                </AlertDescription>
                </Alert>
            </div>
        )}
      </div>

      {/* Top Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <Button variant="ghost" size="icon" className="bg-black/30 rounded-full" onClick={() => router.back()}>
            <X className="h-6 w-6"/>
        </Button>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="bg-black/30 text-sm h-9 rounded-full px-4">
                    <Music className="mr-2 h-4 w-4"/>
                    Add sound
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
        <div className="w-10 h-10"></div>
      </div>
      
       {/* Right Sidebar Controls */}
       <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-6 p-3 bg-black/30 rounded-full backdrop-blur-sm z-10">
            <button className="flex flex-col items-center gap-1 text-xs" disabled={!hasCameraPermission}>
              <SwitchCamera />
            </button>
            <button className="flex flex-col items-center gap-1 text-xs" onClick={toggleMirror} disabled={!hasCameraPermission}>
              <FlipHorizontal />
            </button>
             <button className="flex flex-col items-center gap-1 text-xs" disabled={!hasCameraPermission}>
              <Clock />
            </button>
            <button className="flex flex-col items-center gap-1 text-xs" disabled={!hasCameraPermission}>
              <Sparkles />
            </button>
      </div>

      {/* Bottom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center z-10">
        {selectedSong && (
            <div className="bg-black/50 backdrop-blur-sm py-1 px-3 rounded-full text-center text-xs mb-4">
                <p>🎵 {selectedSong.title} - {selectedSong.artist}</p>
            </div>
        )}
        <div className="flex items-center justify-around w-full max-w-xs">
            <div className="flex flex-col items-center">
                 <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                />
                <Button variant="ghost" className="h-12 w-12 rounded-lg bg-black/30" onClick={() => fileInputRef.current?.click()}>
                    <FolderUp/>
                </Button>
                <span className="text-xs mt-1">Add</span>
            </div>
            
            <button
                className={cn("w-20 h-20 rounded-full bg-white flex items-center justify-center transition-all ring-4 ring-offset-4 ring-offset-black ring-white", isRecording && "bg-red-500 ring-red-500")}
                disabled={!hasCameraPermission}
                onClick={handleRecord}
            >
                <div className={cn("w-18 h-18 rounded-full bg-red-500 transition-all", isRecording ? "w-8 h-8 rounded-md" : "w-16 h-16 rounded-full")}></div>
            </button>

            <div className="flex flex-col items-center">
                 <Button variant="ghost" className="h-12 w-12 rounded-lg bg-black/30" disabled={!hasCameraPermission}>
                    <Zap/>
                </Button>
                <span className="text-xs mt-1">Effects</span>
            </div>
        </div>
      </div>
    </div>
  );
}
