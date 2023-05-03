export interface IPet {
  id: number
  category_id: number
  user_id: number
  name: string
  breed: string
  description: string
  images?: any
  status: string
  created_at: number
  last_updated_at: number
  age: number
  facts: string
}

export interface IPetCard {
  width: string
  height: string
  pet: IPet
}
