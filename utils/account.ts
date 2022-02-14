// third
import { stringify } from 'qs'

export const onLogin = () => {
  const params = {
    redirect: window.location.href
  }
  window.location.href = `http://admin.r2boom.com/account/login?${stringify(params)}`
}
