// project
import arq from '.'
import { MenuTree } from '../typings/menu'

/**
 * 获取单个客户端对应的菜单树
 */
export const getMenuTrees = (tenantCodes: string[]) =>
  arq.get<MenuTree[]>(`/api/menu/menu-tree/${tenantCodes.join(',')}`)
