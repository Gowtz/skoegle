import { z } from "zod";

export function checkVideoFromat(file: File) {
    return file.type === "video/mp4";
}


export const fileSchema = z.object({
  file:z
  .custom<File>((file) => file instanceof File, {
    message: "Please upload a valid file",
  })
  .refine((file) => checkVideoFromat(file), "Only .mp4 formats are supported.")
})
