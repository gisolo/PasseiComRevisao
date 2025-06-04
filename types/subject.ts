export interface Subject {
  id: string
  name: string
  topics: Topic[]
}

export interface Topic {
  id: string
  name: string
  summaries: Summary[]
}

export interface Summary {
  id: string
  title: string
  content: string
  highlights: string[]
  createdAt: Date
  updatedAt: Date
}
