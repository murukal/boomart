export interface Menu {
  _id: string
  description: string
  sort: number
  icon: string
  to: string
  componentPath: string
  parent?: Menu | string
  tenant: string
}

export interface MenuTreeNode extends Omit<Menu, 'parent' | 'tenant'> {
  children?: MenuTreeNode[]
}

export interface MenuTree {
  tenantCode: string
  nodes: MenuTreeNode[] | null
}
