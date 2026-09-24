import { defineField, defineType } from "sanity";

export const categories = defineType({
    type: "document",
    title: "Kategorie integračních nástrojů",
    name: "categories",
    fields: [
        defineField({
            type: "string",
            title: "Název",
            name: "name",
        }),
        defineField({
            type: "slug",
            title: "Slug",
            name: "slug",
            options: {
                source: "name"
            }
        }),
    ]
})