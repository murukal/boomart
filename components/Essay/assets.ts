// project
import { getEssays } from '../../apis/essay'
import type { Essay } from '../../typings/essay'

export interface LatestResult {
  essays: Essay[]
  totalPages: number
}

export const onFetchLatest = async (page: number = 1) => {
  const res = await getEssays({
    pagination: {
      limit: 4,
      page
    },
    populate: ['tags', 'createdBy', 'isThumbUp', 'isFavorite']
  })

  return {
    essays: res.data?.docs || [],
    totalPages: res.data?.totalPages || 0
  }
}
