// third
import dayjs from 'dayjs'

export const getCategories = () => {
  const categories = []
  const date = dayjs()

  for (let index = 7; index > 0; index--) {
    categories.push(date.add(index * -1, 'day').format('YYYY-MM-DD'))
  }

  return categories
}
