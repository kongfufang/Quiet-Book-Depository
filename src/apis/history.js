import instance from '@/utils/request'

export const getHistory = (token) => {
  return instance.get('/user/history', {
    headers: {
      token
    }
  })
}
