"use client"

import { Button } from "@/components/ui/button"
import { PASTEL_COLORS, STANDARD_COLORS } from "@/types/highlight"
import { Palette } from "lucide-react"

interface ColorPickerCompactProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export function ColorPickerCompact({ selectedColor, onColorSelect }: ColorPickerCompactProps) {
  const allColors = [...PASTEL_COLORS, ...STANDARD_COLORS]

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <Palette className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-600">Cores:</span>
      <div className="flex gap-1">
        {allColors.map((color) => (
          <Button
            key={color.value}
            variant="outline"
            size="sm"
            className={`w-6 h-6 p-0 border-2 ${
              selectedColor === color.value ? "border-brand-primary" : "border-gray-300"
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => onColorSelect(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}
