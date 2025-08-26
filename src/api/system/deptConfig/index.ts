import request from '@/config/axios'

export interface DeptConfigVO {
  id?: number
  deptId: number
  configCode: string
  configContent: string
  // createTime: Date
  // updateTime: Date
}

// 查询组织（精简)列表
// export const getSimpleDeptList = async (status: number) => {
//   return await request.get({ url: `/system/dept/simple-list?status=${status}` })
// }

// 查询组织列表
// export const getDeptPage = async (params: PageParam) => {
//   return await request.get({ url: '/system/dept/list', params })
// }

// 查询组织配置详情
export const getDeptConfig = async (deptId: number, configCode: string) => {
  return await request.get({
    url: '/system/dept-config/get?deptId=' + deptId + '&configCode=' + configCode
  })
}

// 修改组织
export const updateDeptConfig = async (params: DeptConfigVO) => {
  return await request.put({ url: '/system/dept-config/update', data: params })
}
