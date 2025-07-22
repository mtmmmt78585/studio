import { UploadCloud, Music, Tag, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function UploadPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 bg-card">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headline">Upload Video</h1>
          <p className="text-muted-foreground">Share your next viral moment with the world.</p>
        </div>
        
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted border-primary/30 hover:border-primary">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">MP4, MOV (MAX. 500MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea id="caption" placeholder="Write a catchy caption..." />
        </div>

        <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" placeholder="#viral, #dance, #challenge" />
        </div>

        <div className="flex justify-between items-center">
            <Button variant="outline"><Music className="mr-2 h-4 w-4"/> Add Music</Button>
            <Button variant="outline"><Settings2 className="mr-2 h-4 w-4"/> Effects</Button>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold">Post Now</Button>
      </div>
    </div>
  );
}
