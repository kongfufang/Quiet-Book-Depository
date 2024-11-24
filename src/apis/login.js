import instance from '@/utils/request'
export const getLogin = (username, password) => {
  return instance.post('/user/login',
    {
      username,
      password
    }
  )
}

export const getRegister = (username, password, ensurepassword) => {
  return instance.post('/user/register', {
    username,
    password,
    ensurepassword
  })
}
