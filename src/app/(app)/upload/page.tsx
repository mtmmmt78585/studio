"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, Music, Settings2, Video, FileUp, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function UploadPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const { toast } = useToast();

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
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, []);


  if (videoFile) {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-card text-white">
            <div className="w-full max-w-md space-y-4">
                <Card>
                    <CardContent className="p-2">
                        <video src={URL.createObjectURL(videoFile)} controls className="w-full rounded-md aspect-video" />
                    </CardContent>
                </Card>
                 <div className="flex justify-between items-center">
                    <p className="text-sm font-medium truncate">{videoFile.name}</p>
                    <Button variant="ghost" size="icon" onClick={() => setVideoFile(null)}><X className="h-5 w-5"/></Button>
                 </div>
                 
                 {isUploading && <Progress value={uploadProgress} className="w-full" />}
                
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
                    <Button variant="outline" disabled={isUploading}><Settings2 className="mr-2 h-4 w-4"/> Effects</Button>
                </div>

                <Button onClick={handleUpload} disabled={isUploading} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold">
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

            <Card className="overflow-hidden">
                <CardContent className="p-0">
                     <video ref={videoRef} className="w-full aspect-[9/16] object-cover bg-black" autoPlay muted playsInline />
                </CardContent>
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
                 <Button variant="outline" className="flex-1 text-lg py-6" disabled={!hasCameraPermission}>
                    <Settings2 className="mr-2 h-5 w-5"/> Effects
                </Button>
            </div>
        </div>
    </div>
  );
}
