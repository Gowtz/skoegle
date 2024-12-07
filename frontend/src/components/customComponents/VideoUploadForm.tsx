import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function VideoUploadForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof fileSchema>>({
    resolver: zodResolver(fileSchema),
    defaultValues:{
      file:null
    }
  });

  // 2. Define a submit handler.

  const [video, setVideo] = useState<string | null>(null);
  const videoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setVideo(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    console.log(video);
  }, [video]);

  function onSubmit(values: z.infer<typeof fileSchema>) {
    console.log(values);
  }
  return (
    <div className="container w-10/12 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-10">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-2xl">Video</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    name="file"
                    className="cursor-pointer"
                    onChange={videoChange}
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
