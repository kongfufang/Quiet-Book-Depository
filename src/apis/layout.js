import instance from '@/utils/request'

export const getNovel = (num) => {
  return instance.get(`/novel/${num}`, {
    headers: {
      token: JSON.parse(localStorage.getItem('token'))
    }
  }
  )
}

export const getSwipe = (flag) => {
  return instance.get(`/novel/random?flag=${flag}`, {
    headers: {
      token: JSON.parse(localStorage.getItem('token'))
    }
  })
}
