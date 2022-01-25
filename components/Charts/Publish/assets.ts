// third
import dayjs from 'dayjs'

export const format = 'YYYY-MM-DD'

export const getCategories = () => {
  const categories = []
  const date = dayjs()

  for (let index = 7; index > 0; index--) {
    categories.push(date.subtract(index, 'day').format(format))
  }

  return categories
}
