import { type SchemaTypeDefinition } from 'sanity'
import { reviews } from './reviews'
import { categories } from './categories'
import { tools } from './tools'
import { projects } from './projects'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [reviews, categories, tools, projects],
}
