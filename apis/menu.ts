// project
import { get } from '.'
import { MenuTree } from '../typings/menu'

/**
 * 获取单个客户端对应的菜单树
 */
export const getMenuTree = (tenant: string) => get<MenuTree>(`/api/menu/menu-tree/${tenant}`)
