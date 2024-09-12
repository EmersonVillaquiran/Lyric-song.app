import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string()
    .min(4, "El firstName debe tener al menos 5 caracteres")
    .max(16),
  lastName: z
    .string()
    .min(4, "El lastName debe tener al menos 5 caracteres")
    .max(16),
  email: z.string(),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .regex(/[A-Z]/, {
      message: "El password debe contener al menos una letra mayúscula",
    })
    .regex(/\d/, {
      message: "El password debe contener al menos un número",
    }),
});

export default formSchema;
