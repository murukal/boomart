import { request } from '.'

export const getUser = () =>
  request({
    method: 'GET',
    url: '/api/auth'
  })
