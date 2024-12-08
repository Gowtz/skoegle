import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { fileSchema } from "../../lib/type";
import { useToast } from "../../hooks/use-toast";

export default function VideoUploadForm() {
  const BACKEND_URL = "http://localhost:6969/";
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues:null
  });

  const [video, setVideo] = useState<string | null>(null);
  const [clear,setClear] = useState<string | null>(null);
// 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof fileSchema>) {
    const formData = new FormData();
    formData.append("video", values.file);
    axios
      .post(`${BACKEND_URL}api/v1/upload`, formData)
      .then((res) => {
        toast({
          title: "Sucess",
          description: "Video Uploaded sucess fully",
        });
      })
      .catch((res) => {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "Video Upload failed in the server",
        });
        console.log(res.message);
      });
    setVideo(null)
    form.reset()
    setClear(prev => prev + 1)

  }
  return (
    <div className="container w-10/12 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mb-10"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Video</FormLabel>
                <FormControl>
                  <Input
                    key={clear}
                    type="file"
                    name="file"
                    accept="video/mp4, video/mov"
                    className="cursor-pointer"
                    onChange={(event) => {
                      field.onChange(event.target.files?.[0]);
                      if (event.target.files && event.target.files[0]) {
                        const file = event.target.files[0];
                        setVideo(prev =>  URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {video && (
        <video width="full" height="full" controls className="rounded-lg">
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
