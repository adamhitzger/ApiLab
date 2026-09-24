import * as z from "zod";

const phoneRegex = new RegExp(/^\+?\d{1,4}[\s-]?(\d[\s-]?){6,14}\d$/)

export const contact_schema = z.object({
    fullname: z.string().min(3, {message: "Celé jméno je moc krátké"}).trim(),
    email: z.email({message: "Zadaný formát e-mailu je nespravný"}).min(3, {message: "E-mail je moc krátký"}).trim(),
    phone: z.string().min(1, {message: "Telefonní číslo je moc krátké"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    msg: z.string().optional()
});

export type ContactType = z.infer<typeof contact_schema>