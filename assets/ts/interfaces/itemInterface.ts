export interface IItem {
  id: number
  user_id: number
  category: { id: number; name: string }
  name: string
  price: number
  quantity: number
  description: string
  state: string
  images: any
  created_at: number
  last_updated_at: number
  status: string
  discount?: number
}
