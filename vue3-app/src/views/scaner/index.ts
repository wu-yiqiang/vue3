type UserInfo = {
  id: Number
  name: string
  pasword: string
  nickname: string
  token: string
  email: string
}
type ReqUser = Uppercase<keyof Omit<UserInfo, 'id' | 'token'>>
type UpdateUser = Pick<UserInfo, 'id' | 'pasword' | 'nickname' | 'email'>
type DelUser = Exclude<keyof UserInfo, 'id' | 'pasword'>
type Picks<T, K extends keyof T> = { [S in K]: T[S] }
export function getAttr() {
  // const reqUser: ReqUser = {
  //   NAME: 'asd',
  //   PASWORD: 'asd',
  //   NICKNAME: 'sad',
  //   EMA: 'sada'
  // }
  // console.log('reqUser', reqUser)
  const updateUser: UpdateUser = {
    id: 12,
    pasword: 'll',
    nickname: 'asd',
    email: 'asda'
  }
  const delUser: Picks<UserInfo, 'id' | 'name'> = {
    id: 12,
    name: 'asda'
  }
  console.log('DelUSer', delUser)
}
