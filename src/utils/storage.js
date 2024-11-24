
const keyinfo = 'shopping_info'
const historykey = 'history-search'
export const getInfo = () => {
  const result = localStorage.setItem(keyinfo)
  return result
    ? JSON.parse(result)
    : {
        userId: '',
        token: ''
      }
}
export const setInfo = (obj) => {
  localStorage.setItem(keyinfo, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(keyinfo)
}

export const sethistory = (arr) => {
  localStorage.setItem(historykey, JSON.stringify(arr))
}

export const gethistory = () => {
  const result = localStorage.getItem(historykey)
  return result ? JSON.parse(result) : []
}
