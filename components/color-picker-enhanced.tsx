"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PASTEL_COLORS, STANDARD_COLORS, type HighlightColor } from "@/types/highlight"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette } from "lucide-react"

interface ColorPickerEnhancedProps {
  selectedColor: string
  onColorSelect: (color: string) => void
}

export function ColorPickerEnhanced({ selectedColor, onColorSelect }: ColorPickerEnhancedProps) {
  const [customColor, setCustomColor] = useState("#ffffff")

  const renderColorGroup = (colors: HighlightColor[], title: string) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="flex flex-wrap gap-2">
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
        <CardTitle className="flex items-center gap-2 text-sm">
          <Palette className="h-4 w-4" />
          Cores de Grifo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Cores Predefinidas</TabsTrigger>
            <TabsTrigger value="custom">Cor Personalizada</TabsTrigger>
          </TabsList>
          <TabsContent value="presets" className="space-y-4 pt-4">
            {renderColorGroup(PASTEL_COLORS, "Pastel")}
            {renderColorGroup(STANDARD_COLORS, "Padrão")}
          </TabsContent>
          <TabsContent value="custom" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-md border-2 border-gray-300"
                  style={{ backgroundColor: customColor }}
                ></div>
                <div className="flex-1">
                  <Input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
              <Button
                onClick={() => onColorSelect(customColor)}
                className="w-full"
                variant={selectedColor === customColor ? "default" : "outline"}
              >
                Aplicar Cor Personalizada
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
