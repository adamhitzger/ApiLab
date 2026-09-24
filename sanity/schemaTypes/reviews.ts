import { defineField, defineType } from "sanity";

export const reviews = defineType({
    type: "document",
    title: "Hodnocení",
    name: "reviews",
    fields: [
        defineField({
            type: "text",
            title: "Text",
            name: "text",
            rows: 4,
        }),
        defineField({
            type: "string",
            title: "Jméno osoby",
            name: "person",
        }),
        defineField({
                type: "string",
                title: "Pozice osoby",
                name: "role",
        }),
        defineField({
                type: "string",
                title: "Firma osoby",
                name: "company",
        }),
    ],
    preview: {
        select: { title: "person", subtitle: "company" },
    },
})
