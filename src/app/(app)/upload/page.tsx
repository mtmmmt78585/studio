
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Video, Sparkles, SwitchCamera, FlipHorizontal, Music, Library, X, Timer, Clock, Zap, FolderUp, GalleryHorizontal } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MAX_RECORDING_TIME_MS = 15000; // 15 seconds

export default function UploadPage() {
  const { toast } = useToast();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedSong, setSelectedSong] = useState<(typeof songs)[0] | null>(null);
  
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [videoCategory, setVideoCategory] = useState("short");

  const getCameraPermission = useCallback(async () => {
    try {
        const videoConstraints = {
            width: { ideal: 1920, max: 1920 },
            height: { ideal: 1080, max: 1080 },
            frameRate: { ideal: 30, max: 30 },
            facingMode: 'user'
        };
      const stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
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
      } else {
        toast({
            variant: 'destructive',
            title: 'Camera Error',
            description: 'Could not access the camera. Please ensure it is not in use by another application.',
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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [getCameraPermission]);
  
  const startRecording = () => {
    if (videoRef.current?.srcObject && hasCameraPermission) {
      const stream = videoRef.current.srcObject as MediaStream;
      const options = { 
          mimeType: 'video/webm; codecs=vp9',
          videoBitsPerSecond: 2500000, // 2.5 Mbps for better quality
      };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      const chunks: Blob[] = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const file = new File([blob], `yappzy-recording-${Date.now()}.webm`, { type: 'video/webm' });
        setVideoFile(file);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      setRecordingProgress(0);

      timerRef.current = setInterval(() => {
          setRecordingTime(prevTime => {
              const newTime = prevTime + 1;
              setRecordingProgress((newTime * 1000 / MAX_RECORDING_TIME_MS) * 100);
              if (newTime * 1000 >= MAX_RECORDING_TIME_MS) {
                  stopRecording();
              }
              return newTime;
          });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingProgress(0);
    }
  };

  const handleRecordButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };


  const toggleMirror = () => setIsMirrored(prev => !prev);
  

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
            description: `Your ${videoCategory} is ready to be published.`,
          });
          router.push(videoCategory === 'short' ? '/shorts' : '/feed');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  const formatTime = (seconds: number) => {
    const secs = seconds % 60;
    return `00:${String(secs).padStart(2, '0')}`;
  }

  if (videoFile) {
    return (
       <div className="h-full flex flex-col items-center justify-start p-4 space-y-4 bg-background">
            <div className="w-full max-w-lg">
                 <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold font-headline">Edit & Post {videoCategory === 'short' ? 'Short' : 'Video'}</h1>
                    <Button variant="ghost" size="icon" onClick={() => setVideoFile(null)}><X className="h-5 w-5"/></Button>
                 </div>

                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <video src={URL.createObjectURL(videoFile)} className="w-full h-full object-cover" controls autoPlay loop/>
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
                    {isUploading ? "Uploading..." : `Post ${videoCategory === 'short' ? 'Short' : 'Video'}`}
                </Button>
            </div>
       </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col bg-black text-white relative">
       {/* Top Controls Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <Button variant="ghost" size="icon" className="bg-black/30 rounded-full" onClick={() => router.back()}>
            <X className="h-6 w-6"/>
        </Button>
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="bg-black/30 text-sm h-9 rounded-full px-4 border-white/20 hover:bg-black/50">
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

        <div className="flex-1 relative w-full h-full m-0">
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

            {/* Recording Indicator */}
            {isRecording && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 w-11/12 space-y-2">
                    <Progress value={recordingProgress} className="h-1 bg-red-500/50" />
                    <div className="text-center">
                        <p className="text-sm font-mono bg-black/30 px-2 py-0.5 rounded-full inline-block">{formatTime(recordingTime)}</p>
                    </div>
                </div>
            )}
        </div>
        
        {/* Bottom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent pt-12">
            {selectedSong && (
                <div className="bg-black/50 backdrop-blur-sm py-1 px-3 rounded-full text-center text-xs mb-4 w-max mx-auto">
                    <p>🎵 {selectedSong.title} - {selectedSong.artist}</p>
                </div>
            )}
            
            <div className="flex items-end justify-around pb-8">
                <div className="w-16 h-16" />
                
                <div className="flex flex-col items-center">
                    <button
                        className={cn(
                            "w-16 h-16 rounded-full bg-transparent flex items-center justify-center transition-all ring-4 ring-white",
                            isRecording && "animate-pulse"
                        )}
                        disabled={!hasCameraPermission}
                        onClick={handleRecordButtonClick}
                    >
                        <div className={cn("w-[58px] h-[58px] rounded-full bg-red-500 transition-all flex items-center justify-center", 
                            isRecording && "w-12 h-12"
                        )}>
                            {isRecording && <div className="w-6 h-6 bg-red-700 rounded-lg" />}
                        </div>
                    </button>
                    <div className="flex items-center gap-4 mt-2">
                        <button 
                            onClick={() => setVideoCategory('short')}
                            className={cn("font-semibold text-sm", videoCategory === 'short' ? 'text-white' : 'text-white/50')}
                        >Shorts</button>
                         <button 
                            onClick={() => setVideoCategory('video')}
                            className={cn("font-semibold text-sm", videoCategory === 'video' ? 'text-white' : 'text-white/50')}
                        >Video</button>
                    </div>
                </div>

                <button className="flex flex-col items-center justify-center w-16 h-16" onClick={() => fileInputRef.current?.click()}>
                    <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm">
                        <GalleryHorizontal className="h-6 w-6" />
                    </div>
                     <p className="text-xs mt-1">Upload</p>
                </button>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
            />
        </div>
    </div>
  );
}

    