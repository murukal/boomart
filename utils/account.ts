// third
import { stringify } from 'qs'

export const onLogin = () => {
  const params = {
    redirect: window.location.href
  }
  window.location.href = `http://localhost:8000/account/login?${stringify(params)}`
}
