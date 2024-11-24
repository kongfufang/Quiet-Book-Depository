import instance from '@/utils/request'

export const getNovelData = (id, chapter, token) => {
  console.log(token)
  return instance.get(`/common/download?novelId=${id}&chapter=${chapter}`, {
    headers: {
      token
    }
  }
  )
}
