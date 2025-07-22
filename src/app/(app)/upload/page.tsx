
"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Settings2, Video, FileUp, X, Camera, Sparkles, SwitchCamera, FlipHorizontal, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { effects } from "@/lib/data";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { generateCaptionsAndTags, type GenerateCaptionsAndTagsOutput } from "@/ai/flows/ai-content-generation-captions";
import { Skeleton } from "@/components/ui/skeleton";

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const { toast } = useToast();
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<GenerateCaptionsAndTagsOutput | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        toast({
            variant: "destructive",
            title: "File too large",
            description: "Please select a video file smaller than 500MB.",
        });
        return;
      }
      setVideoFile(file);
    }
  };

  const handleGenerateSuggestions = async () => {
      if (!description) return;
      setIsGenerating(true);
      setAiSuggestions(null);
      try {
          const result = await generateCaptionsAndTags({ videoDescription: description });
          setAiSuggestions(result);
      } catch (error) {
          console.error("Error generating suggestions:", error);
          toast({
              variant: "destructive",
              title: "AI Suggestion Failed",
              description: "Could not generate suggestions. Please try again."
          });
      } finally {
          setIsGenerating(false);
      }
  }

  const handleUpload = () => {
    if (!videoFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete!",
            description: "Your video has been successfully posted.",
          });
          setVideoFile(null); // Reset after upload
          setCaption("");
          setTags("");
          setDescription("");
          setAiSuggestions(null);
          setSelectedEffect(null);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [isMirrored, setIsMirrored] = useState(true);


  useEffect(() => {
    const getDevicesAndSetStream = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }

      try {
        // Get initial stream to prompt for permissions
        const initialStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setHasCameraPermission(true);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputs);

        // Find front camera ('user' facing) and set it as default
        const frontCameraIndex = videoInputs.findIndex(d => d.label.toLowerCase().includes('front'));
        const initialIndex = frontCameraIndex !== -1 ? frontCameraIndex : 0;
        setCurrentDeviceIndex(initialIndex);
        
        // Stop initial stream, we'll get a new one with the specific device
        initialStream.getTracks().forEach(track => track.stop());

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        if (error instanceof Error && error.name === "NotAllowedError") {
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this app.',
            });
        }
      }
    };

    getDevicesAndSetStream();
  }, [toast]);

  useEffect(() => {
    if (!hasCameraPermission || videoDevices.length === 0) {
      return;
    }
    
    let isCancelled = false;
    
    const startStream = async () => {
        const currentDeviceId = videoDevices[currentDeviceIndex]?.deviceId;
        if (!currentDeviceId) return;

        // Stop previous stream if it exists
        if (videoRef.current?.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }

        const constraints: MediaStreamConstraints = {
            video: { deviceId: { exact: currentDeviceId } }
        };

        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (!isCancelled && videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch(error) {
            console.error('Error switching camera:', error);
            setHasCameraPermission(false);
        }
    };
    
    startStream();
    
    return () => {
        isCancelled = true;
        if (videoRef.current?.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
    };
  }, [currentDeviceIndex, videoDevices, hasCameraPermission]);


  const switchCamera = () => {
    if(videoDevices.length > 1) {
        setCurrentDeviceIndex(prevIndex => (prevIndex + 1) % videoDevices.length);
        setIsMirrored(videoDevices[(currentDeviceIndex + 1) % videoDevices.length].label.toLowerCase().includes('front') || videoDevices.length === 1);
    }
  };
  
  const toggleMirror = () => {
      setIsMirrored(prev => !prev);
  }


  if (videoFile) {
    const effectClass = selectedEffect ? `filter-${selectedEffect.split(/_[0-9]+/)[0]}` : "";
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-card text-white overflow-y-auto">
            <div className="w-full max-w-md space-y-4">
                <Card>
                    <CardContent className="p-2">
                        <video key={selectedEffect} src={URL.createObjectURL(videoFile)} controls className={cn("w-full rounded-md aspect-video", effectClass)} />
                    </CardContent>
                </Card>
                 <div className="flex justify-between items-center">
                    <p className="text-sm font-medium truncate">{videoFile.name}</p>
                    <Button variant="ghost" size="icon" onClick={() => { setVideoFile(null); setSelectedEffect(null); }}><X className="h-5 w-5"/></Button>
                 </div>
                 
                 {isUploading && <Progress value={uploadProgress} className="w-full" />}
                
                <div className="space-y-2">
                    <Label htmlFor="description">Video Description</Label>
                    <Textarea id="description" placeholder="Describe your video for the AI..." value={description} onChange={e => setDescription(e.target.value)} disabled={isUploading || isGenerating} />
                    <Button onClick={handleGenerateSuggestions} disabled={isUploading || isGenerating || !description} className="w-full" size="sm">
                        <Bot className="mr-2 h-4 w-4"/>
                        {isGenerating ? "Generating..." : "Generate Captions & Tags"}
                    </Button>
                </div>
                
                {isGenerating && (
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                         <Skeleton className="h-6 w-1/4 mt-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                )}

                {aiSuggestions && (
                    <div className="space-y-4 text-sm p-3 border rounded-md">
                        <div>
                            <h4 className="font-bold mb-2">Suggested Captions:</h4>
                            <div className="space-y-2">
                            {aiSuggestions.captions.map((c, i) => (
                                <button key={i} onClick={() => setCaption(c)} className="w-full text-left p-2 bg-background rounded-md hover:bg-primary/20 text-xs">
                                    {c}
                                </button>
                            ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Suggested Tags:</h4>
                             <button onClick={() => setTags(aiSuggestions.tags.join(', '))} className="w-full text-left p-2 bg-background rounded-md hover:bg-primary/20 text-xs">
                                {aiSuggestions.tags.join(', ')}
                            </button>
                        </div>
                    </div>
                )}


                <div className="space-y-2">
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea id="caption" placeholder="Write a catchy caption..." value={caption} onChange={e => setCaption(e.target.value)} disabled={isUploading} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="#viral, #dance, #challenge" value={tags} onChange={e => setTags(e.target.value)} disabled={isUploading} />
                </div>

                <div className="flex justify-between items-center">
                    <Button variant="outline" disabled={isUploading}><Music className="mr-2 h-4 w-4"/> Add Music</Button>
                    <Sheet>
                      <SheetTrigger asChild>
                         <Button variant="outline" disabled={isUploading}><Settings2 className="mr-2 h-4 w-4"/> Effects</Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="bg-background/90 backdrop-blur-sm">
                        <SheetHeader>
                          <SheetTitle className="text-primary font-headline">Premium Effects</SheetTitle>
                        </SheetHeader>
                        <div className="grid grid-cols-4 gap-4 py-4 h-[50vh] overflow-y-auto">
                          {effects.map((effect) => (
                            <div key={effect.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setSelectedEffect(effect.id)}>
                              <div className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedEffect === effect.id ? 'border-primary' : 'border-transparent'}`}>
                                <Image src={effect.thumbnailUrl} alt={effect.name} fill className="object-cover" />
                              </div>
                              <p className="text-xs text-center truncate w-16">{effect.name}</p>
                              {effect.isPremium && <Badge variant="default" className="text-xs px-1 py-0 h-4 bg-primary/80">PRO</Badge>}
                            </div>
                          ))}
                        </div>
                      </SheetContent>
                    </Sheet>
                </div>

                <Button onClick={handleUpload} disabled={isUploading || !caption} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold">
                    {isUploading ? `Uploading... ${uploadProgress}%` : "Post Now"}
                </Button>
            </div>
        </div>
    )
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
                     <video ref={videoRef} className={cn("w-full aspect-[9/16] object-cover bg-black", isMirrored && "scale-x-[-1]")} autoPlay muted playsInline />
                </CardContent>
                 <div className="absolute top-4 right-4 flex flex-col gap-4">
                    <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={switchCamera} disabled={videoDevices.length < 2}>
                        <SwitchCamera />
                    </Button>
                     <Button size="icon" variant="ghost" className="bg-black/30 text-white hover:bg-black/50" onClick={toggleMirror}>
                        <FlipHorizontal />
                    </Button>
                </div>
            </Card>

            { !hasCameraPermission && (
                <Alert variant="destructive">
                    <Camera className="h-4 w-4" />
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to record video. You can still upload from your gallery.
                    </AlertDescription>
                </Alert>
            )}

             <div className="flex items-center gap-4">
                <label htmlFor="gallery-upload" className="flex-1">
                    <Button variant="outline" className="w-full text-lg py-6" asChild>
                       <div>
                            <FileUp className="mr-2 h-5 w-5"/> Gallery
                       </div>
                    </Button>
                    <input id="gallery-upload" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                </label>
                <Button className="w-20 h-20 rounded-full bg-primary shadow-glow flex items-center justify-center" disabled={!hasCameraPermission}>
                    <Video className="h-8 w-8 text-primary-foreground"/>
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex-1 text-lg py-6" disabled={!hasCameraPermission}>
                        <Sparkles className="mr-2 h-5 w-5"/> Effects
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="bg-background/90 backdrop-blur-sm">
                    <SheetHeader>
                      <SheetTitle className="text-primary font-headline">Premium Effects</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-4 gap-4 py-4 h-[50vh] overflow-y-auto">
                      {effects.map((effect) => (
                        <div key={effect.id} className="flex flex-col items-center gap-2">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent">
                            <Image src={effect.thumbnailUrl} alt={effect.name} fill className="object-cover" />
                          </div>
                          <p className="text-xs text-center truncate w-16">{effect.name}</p>
                          {effect.isPremium && <Badge variant="default" className="text-xs px-1 py-0 h-4 bg-primary/80">PRO</Badge>}
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>
  );
}
