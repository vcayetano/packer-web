export interface PackResult {
  order_amount: number
  pack_sizes: number[]
  packs: Record<string, number>
}

export interface PackSizesResponse {
  sizes: number[]
}
