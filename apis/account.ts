import arq from '.'

export const getUser = () => arq.get('/api/authentication')
