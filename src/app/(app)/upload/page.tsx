
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Video, Sparkles, SwitchCamera, FlipHorizontal, Music, Library, X } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

type UploadMode = "camera" | "gallery";

export default function UploadPage() {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadMode, setUploadMode] = useState<UploadMode>("camera");
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSong, setSelectedSong] = useState<(typeof songs)[0] | null>(null);

  // States for Gallery Upload
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");


  const getCameraPermission = useCallback(async () => {
    if (uploadMode !== "camera") return;
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
  }, [toast, uploadMode]);

  useEffect(() => {
    if (uploadMode === "camera") {
      getCameraPermission();
    } else {
      // Stop camera stream when switching away
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [uploadMode, getCameraPermission]);


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
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (videoFile && uploadMode === 'gallery') {
    return (
       <div className="h-full flex flex-col items-center justify-start p-4 space-y-4">
            <div className="w-full max-w-lg">
                 <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold font-headline">Edit & Post</h1>
                    <Button variant="ghost" size="icon" onClick={() => setVideoFile(null)}><X className="h-5 w-5"/></Button>
                 </div>

                 <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <video src={URL.createObjectURL(videoFile)} className="w-full aspect-[9/16] object-cover bg-black" controls />
                    </CardContent>
                 </Card>

                {isUploading && (
                    <div className="my-4">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-center text-sm mt-2">{uploadProgress}%</p>
                    </div>
                )}
                
                <div className="space-y-4 my-4">
                    <Textarea placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <Input placeholder="Add tags, separated by commas..." value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                
                <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                    {isUploading ? "Uploading..." : "Post Video"}
                </Button>
            </div>
       </div>
    )
  }

  return (
    <div className="h-full flex flex-col items-center justify-between p-4 bg-background text-white">
      {/* Top controls */}
       <div className="w-full max-w-lg flex justify-between items-center absolute top-4 left-1/2 -translate-x-1/2 px-4 z-10">
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
           <div className="flex flex-col gap-4 items-center">
            <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={() => {}} disabled={true}>
              <SwitchCamera />
            </Button>
            <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={toggleMirror}>
              <FlipHorizontal />
            </Button>
          </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-lg space-y-4 flex-1 flex flex-col justify-center">
        
        {uploadMode === 'camera' && (
            <Card className="overflow-hidden relative shadow-glow">
            <CardContent className="p-0">
                <video ref={videoRef} className={cn("w-full aspect-[9/16] object-cover bg-black", isMirrored && "scale-x-[-1]")} autoPlay muted playsInline />
                
                {!hasCameraPermission && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <Alert variant="destructive" className="w-4/5">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature.
                    </AlertDescription>
                    </Alert>
                </div>
                )}
            </CardContent>
            </Card>
        )}

        {uploadMode === 'gallery' && (
            <div className="flex flex-col items-center justify-center aspect-[9/16] border-2 border-dashed border-border rounded-lg bg-card/50">
                <Library className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-lg font-semibold">Upload from Gallery</h2>
                <p className="text-sm text-muted-foreground">Select a video file from your device.</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                />
                <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>
                    Select File
                </Button>
            </div>
        )}

        {selectedSong && (
            <div className="bg-card/80 p-2 rounded-lg text-center text-xs">
                <p>🎵 {selectedSong.title} - {selectedSong.artist}</p>
            </div>
        )}

        {uploadMode === 'camera' && (
            <div className="flex items-center justify-center gap-4">
            <Button
                className={cn("w-20 h-20 rounded-full bg-primary shadow-glow flex items-center justify-center transition-all", isRecording && "bg-transparent border-4 border-primary")}
                disabled={!hasCameraPermission}
                onClick={handleRecord}
            >
                <div className={cn("w-16 h-16 rounded-full bg-primary transition-all", isRecording && "w-6 h-6")}></div>
            </Button>
            </div>
        )}
      </div>

      {/* Bottom Tabs */}
      <div className="w-full max-w-lg flex justify-center gap-4 p-4 rounded-full bg-card/50 backdrop-blur-sm">
            <Button 
                variant={uploadMode === 'camera' ? 'default' : 'ghost'} 
                onClick={() => setUploadMode('camera')}
                className="flex-1"
            >
                <Video className="mr-2 h-5 w-5"/> Camera
            </Button>
             <Button 
                variant={uploadMode === 'gallery' ? 'default' : 'ghost'}
                onClick={() => setUploadMode('gallery')}
                className="flex-1"
            >
                <Library className="mr-2 h-5 w-5"/> Gallery
            </Button>
      </div>

    </div>
  );
}

    