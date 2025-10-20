import { schools } from '../data/schools'

export default defineEventHandler(() => {
  return {
    data: schools,
  }
})
