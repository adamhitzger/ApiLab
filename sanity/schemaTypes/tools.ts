import { defineField, defineType } from "sanity";

export const tools = defineType({
    type: "document",
    title: "Integrační nástroje",
    name: "tools",
    fields: [
        defineField({
            type: "image",
            title: "Obrázek",
            name: "api_image",
        }),
        defineField({
            type: "string",
            title: "Název",
            name: "name",
        }),
        defineField({
            type: "url",
            title: "Url",
            name: "url",
        }),
        defineField({
                type: "reference",
                title: "Kategorie",
                name: "category",
                to: [{
                    type: "categories"
                }]
        }),
    ]
})