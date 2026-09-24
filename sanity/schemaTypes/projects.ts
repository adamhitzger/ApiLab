import { defineField, defineType } from "sanity";

export const projects = defineType({
    type: "document",
    title: "Projekty",
    name: "projects",
    fields: [
        defineField({
            type: "string",
            title: "Nadpis",
            name: "heading",
        }),
        defineField({
            type: "slug",
            title: "Slug",
            name: "slug",
            options: {
                source: "heading"
            }
        }),
        defineField({
            type: "string",
            title: "Podnadpis",
            name: "heading2",
        }),
        defineField({
            type: "string",
            title: "Popis",
            name: "overview",
        }),    
        defineField({
                type: "reference",
                title: "Kategorie",
                name: "category",
                to: [{
                    type: "categories"
                }]
        }),
        defineField({
            type: "array",
            title: "Text",
            name: "text",
            of: [
                {type: "block"}
            ]
        }), 
        defineField({
            type: "array",
            title: "Pilulky",
            name: "pills",
            of: [
                {type: "string"}
            ]
        }), 
    ]
})