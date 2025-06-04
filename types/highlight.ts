export interface Highlight {
  id: string
  text: string
  color: string
  startOffset: number
  endOffset: number
  timestamp: number
}

export interface HighlightColor {
  name: string
  value: string
  class: string
}

export const PASTEL_COLORS: HighlightColor[] = [
  { name: "Rosa Pastel", value: "#fce7f3", class: "bg-pink-100" },
  { name: "Amarelo Pastel", value: "#fef3c7", class: "bg-yellow-100" },
  { name: "Verde Pastel", value: "#d1fae5", class: "bg-green-100" },
  { name: "Azul Pastel", value: "#dbeafe", class: "bg-blue-100" },
  { name: "Lavanda", value: "#ede9fe", class: "bg-purple-100" },
  { name: "Pêssego", value: "#ffedd5", class: "bg-orange-100" },
]

export const STANDARD_COLORS: HighlightColor[] = [
  { name: "Amarelo Neon", value: "#fbbf24", class: "bg-yellow-400" },
  { name: "Azul", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Laranja", value: "#f97316", class: "bg-orange-500" },
  { name: "Verde", value: "#22c55e", class: "bg-green-500" },
  { name: "Rosa", value: "#ec4899", class: "bg-pink-500" },
  { name: "Roxo", value: "#8b5cf6", class: "bg-purple-500" },
]
