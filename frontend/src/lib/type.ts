import { z } from "zod";

export const fileSchema = z.object({
  file: z
    .custom<File>((value) => value instanceof File, {
      message: "Please upload a valid file.",
    })
    .refine((file) => file.size > 0, { message: "File is required." }) // Ensure a file is uploaded
    .refine(
      (file) => file.size <= 100 * 1024 * 1024, // 5 MB size limit
      { message: "File size must be less than 100MB." },
    )
    .refine((file) => file.type == "video/mp4", {
      message: "File type must be mp4",
    })
    .refine(
      (file) =>
        /^\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}-\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}\.mp4$/.test(
          file.name,
        ),
      {
        message:
          "File Name should be in DDMMYYYYHHMMSS-DDMMYYYYHHMMSS.mp4 format",
      },
    ),
});
