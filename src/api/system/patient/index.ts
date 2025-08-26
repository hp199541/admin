import request from '@/config/axios'

export interface PatientVO {
  id: number
  username: string
  nickname: string
  deptId: number
  conversationCount: number
  // postIds: string[]
  // email: string
  mobile: string
  sex: number
  avatar: string
  // loginIp: string
  status: number
  // remark: string
  loginDate: Date
  createTime: Date
}

// 查询用户管理列表
export const getPatientPage = (params: PageParam) => {
  return request.get({ url: '/system/patient/page', params })
}

// 查询用户详情
export const getPatient = (id: number) => {
  return request.get({ url: '/system/patient/get?id=' + id })
}

// 新增用户
export const createPatient = (data: PatientVO) => {
  return request.post({ url: '/system/patient/create', data })
}

// 修改用户
export const updatePatient = (data: PatientVO) => {
  return request.put({ url: '/system/patient/update', data })
}

// 删除用户
export const deletePatient = (id: number) => {
  return request.delete({ url: '/system/patient/delete?id=' + id })
}

// 导出用户
export const exportPatient = (params: any) => {
  return request.download({ url: '/system/patient/export', params })
}

// 下载用户导入模板
export const importPatientTemplate = () => {
  return request.download({ url: '/system/patient/get-import-template' })
}

// 用户密码重置
export const resetPatientPassword = (id: number, password: string) => {
  const data = {
    id,
    password
  }
  return request.put({ url: '/system/patient/update-password', data: data })
}

// 用户状态修改
export const updatePatientStatus = (id: number, status: number) => {
  const data = {
    id,
    status
  }
  return request.put({ url: '/system/patient/update-status', data: data })
}

// 获取用户精简信息列表
export const getSimplePatientList = (): Promise<PatientVO[]> => {
  return request.get({ url: '/system/patient/simple-list' })
}
