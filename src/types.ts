export interface Data {
  data: Anime[]
  total: number
  limit: number
  offset: number
}

export interface Anime {
  updated_at: string
  comment: string | null
  tags: string[]
  subject: Subject
  subject_id: number
  vol_status: number
  ep_status: number
  subject_type: number
  type: number
  rate: number
  private: boolean
  index?: number
}

export interface Subject {
  date: string
  images: {
    small: string
    grid: string
    large: string
    medium: string
    common: string
  }
  name: string
  name_cn: string
  short_summary: string
  tags: {
    name: string
    count: number
    total_cont: number
  }[]
  score: number
  type: number
  id: number
  eps: number
  volumes: number
  collection_total: number
  rank: number
}

export interface UserConfig {
  replace: Record<string, string>
}
