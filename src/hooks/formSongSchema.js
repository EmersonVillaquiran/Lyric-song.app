import { z } from "zod";

const formSongSchema = z.object({
  artist: z
    .string()
    .min(2, "El lastName debe tener al menos 2 caracteres")
    .max(16),
  name: z
    .string()
    .min(2, "El lastName debe tener al menos 2 caracteres")
    .max(30),
  lyric: z.string().min(10, "El lastName debe tener al menos 10 caracteres"),
  genre: z.string(),
  url: z.string(),
});

export default formSongSchema;
