import { z } from 'zod';

const positionSchema = z.object({
  lati: z.coerce.number().refine(value => Math.abs(value) <= 90, {
    message: "Latitude must be between -90 and 90.",
  }),
  lngi: z.coerce.number().refine(value => Math.abs(value) <= 180, {
    message: "Longitude must be between -180 and 180.",
  }),
});

export const deviceCreateSchema = z.object({
    serialNo: z.string().min(4, { message: "Serial number is required." }),
    type: z.enum(["STATIONERY", "MOBILE"]),
  positionDto: positionSchema,
});

export type DeviceCreateType = z.infer<typeof deviceCreateSchema>;




export const ownerSchema = z.object({
  owner: z.coerce.number().refine(value => Number.isInteger(value), {
    message: "Owner ID must be an integer.",
  }),
  id: z.string().min(4, { message: "Device Id number is required." }),
});

export type OwnerType = z.infer<typeof ownerSchema>;
