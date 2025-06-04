"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import type { Highlight } from "@/types/highlight"

export function useHighlights() {
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [selectedColor, setSelectedColor] = useState("#fef3c7")
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const addHighlight = useCallback(
    (text: string, startOffset: number, endOffset: number) => {
      // Evitar grifos duplicados na mesma posição
      const existingHighlight = highlights.find((h) => h.startOffset === startOffset && h.endOffset === endOffset)

      if (existingHighlight) return existingHighlight.id

      const newHighlight: Highlight = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        color: selectedColor,
        startOffset,
        endOffset,
        timestamp: Date.now(),
      }
      setHighlights((prev) => [...prev, newHighlight])
      return newHighlight.id
    },
    [selectedColor, highlights],
  )

  const removeHighlight = useCallback(
    (id: string) => {
      setHighlights((prev) => prev.filter((h) => h.id !== id))
      if (selectedHighlightId === id) {
        setSelectedHighlightId(null)
      }
    },
    [selectedHighlightId],
  )

  const selectHighlight = useCallback((id: string | null) => {
    setSelectedHighlightId(id)
  }, [])

  const updateHighlightColor = useCallback((id: string, color: string) => {
    setHighlights((prev) => prev.map((h) => (h.id === id ? { ...h, color } : h)))
  }, [])

  const generateSummary = useCallback(() => {
    if (highlights.length === 0) return ""

    return highlights
      .sort((a, b) => a.startOffset - b.startOffset)
      .map((h) => h.text.trim())
      .filter((text) => text.length > 0)
      .join(" ")
  }, [highlights])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Delete" && selectedHighlightId) {
        removeHighlight(selectedHighlightId)
      }
    },
    [removeHighlight, selectedHighlightId],
  )

  return {
    highlights,
    selectedColor,
    selectedHighlightId,
    setSelectedColor,
    addHighlight,
    removeHighlight,
    selectHighlight,
    updateHighlightColor,
    generateSummary,
    handleKeyDown,
    contentRef,
  }
}
