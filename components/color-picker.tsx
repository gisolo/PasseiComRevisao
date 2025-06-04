"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PASTEL_COLORS, STANDARD_COLORS, type HighlightColor } from "@/types/highlight"

interface ColorPickerProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  const renderColorGroup = (colors: HighlightColor[], title: string) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="flex gap-2">
        {colors.map((color) => (
          <Button
            key={color.value}
            variant="outline"
            size="sm"
            className={`w-8 h-8 p-0 border-2 ${
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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Cores de Grifo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderColorGroup(PASTEL_COLORS, "Pastel")}
        {renderColorGroup(STANDARD_COLORS, "Padrão")}
      </CardContent>
    </Card>
  )
}
