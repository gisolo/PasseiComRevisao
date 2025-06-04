"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Trash2, RefreshCw, Eye, Edit } from "lucide-react"
import { useHighlights } from "@/hooks/use-highlights"
import { ColorPickerCompact } from "./color-picker-compact"
import { SubjectManager } from "./subject-manager"
import { SaveSummaryDialog } from "./save-summary-dialog"

export function TextEditor() {
  const [content, setContent] = useState("")
  const [showSummary, setShowSummary] = useState(false)
  const [summaryTitle, setSummaryTitle] = useState("Meu Resumo")
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>()
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>()
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    highlights,
    selectedColor,
    selectedHighlightId,
    setSelectedColor,
    addHighlight,
    removeHighlight,
    selectHighlight,
    generateSummary,
  } = useHighlights()

  const handleTextSelection = useCallback(() => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    if (start === end) return // Nenhum texto selecionado

    const selectedText = content.substring(start, end)
    if (selectedText.trim()) {
      addHighlight(selectedText, start, end)
      // Mudar para modo preview após grifar
      setViewMode("preview")
    }
  }, [content, addHighlight])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type === "text/plain") {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        setContent(text)
      }
      reader.readAsText(file)
    } else {
      alert("Por enquanto, apenas arquivos de texto são suportados. Em breve suportaremos PDFs!")
    }
  }, [])

  const handleHighlightClick = useCallback(
    (id: string) => {
      selectHighlight(id === selectedHighlightId ? null : id)
    },
    [selectHighlight, selectedHighlightId],
  )

  const handleDeleteHighlight = useCallback(() => {
    if (selectedHighlightId) {
      removeHighlight(selectedHighlightId)
    }
  }, [removeHighlight, selectedHighlightId])

  const handleNewSummary = useCallback(() => {
    setShowSummary(false)
    setSummaryTitle("Novo Resumo")
    setTimeout(() => setShowSummary(true), 100)
  }, [])

  const handleSaveSummaryComplete = useCallback(() => {
    alert("Resumo salvo com sucesso!")
  }, [])

  const renderHighlightedText = () => {
    if (!content || highlights.length === 0) {
      return content
    }

    const sortedHighlights = [...highlights].sort((a, b) => a.startOffset - b.startOffset)
    const result = []
    let lastIndex = 0

    sortedHighlights.forEach((highlight) => {
      // Adiciona texto antes do grifo
      if (highlight.startOffset > lastIndex) {
        result.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex, highlight.startOffset)}</span>)
      }

      // Adiciona texto grifado
      result.push(
        <span
          key={highlight.id}
          className={`px-1 rounded cursor-pointer transition-all ${
            selectedHighlightId === highlight.id ? "ring-2 ring-brand-primary" : ""
          }`}
          style={{ backgroundColor: highlight.color }}
          onClick={() => handleHighlightClick(highlight.id)}
        >
          {highlight.text}
        </span>,
      )

      lastIndex = highlight.endOffset
    })

    // Adiciona texto restante
    if (lastIndex < content.length) {
      result.push(<span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>)
    }

    return result
  }

  const summary = generateSummary()

  // Adicionar event listener para tecla Delete
  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedHighlightId) {
        removeHighlight(selectedHighlightId)
      }
    }

    window.addEventListener("keydown", handleKeyDownEvent)
    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent)
    }
  }, [selectedHighlightId, removeHighlight])

  return (
    <div className="space-y-6">
      {/* Organização de Disciplinas */}
      <SubjectManager
        onSelectSubjectTopic={(subjectId, topicId) => {
          setSelectedSubjectId(subjectId)
          setSelectedTopicId(topicId)
        }}
        selectedSubjectId={selectedSubjectId}
        selectedTopicId={selectedTopicId}
      />

      {/* Área de Input */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Adicionar Conteúdo
            </CardTitle>
            {content && (
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "edit" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("edit")}
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button
                  variant={viewMode === "preview" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("preview")}
                >
                  <Eye className="h-4 w-4 mr-1" /> Visualizar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Carregue PDF/Texto
            </Button>
            <input ref={fileInputRef} type="file" accept=".txt,.pdf" onChange={handleFileUpload} className="hidden" />
          </div>

          {content && <ColorPickerCompact selectedColor={selectedColor} onColorSelect={setSelectedColor} />}

          {viewMode === "edit" ? (
            <Textarea
              ref={textareaRef}
              placeholder="Cole seu texto aqui ou faça upload de um arquivo..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onMouseUp={handleTextSelection}
              className="min-h-[300px] resize-none"
            />
          ) : (
            <div className="min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm whitespace-pre-wrap">
              {renderHighlightedText()}
            </div>
          )}

          {viewMode === "edit" && (
            <p className="text-sm text-muted-foreground">
              Selecione o texto acima para grifar com a cor escolhida. Clique em "Visualizar" para ver os grifos.
            </p>
          )}

          {viewMode === "preview" && selectedHighlightId && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDeleteHighlight} className="text-red-500">
                <Trash2 className="h-4 w-4 mr-1" /> Remover Grifo Selecionado
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões de Resumo */}
      {highlights.length > 0 && (
        <div className="flex justify-center gap-2">
          <Button onClick={() => setShowSummary(!showSummary)} className="bg-brand-primary hover:bg-brand-accent1">
            {showSummary ? "Ocultar Resumo" : "Gerar Resumo"}
          </Button>

          <Button variant="outline" onClick={handleNewSummary}>
            <RefreshCw className="h-4 w-4 mr-2" /> Novo Resumo
          </Button>

          {showSummary && summary && (
            <SaveSummaryDialog
              summaryContent={summary}
              highlightIds={highlights.map((h) => h.id)}
              onSave={handleSaveSummaryComplete}
            />
          )}
        </div>
      )}

      {/* Resumo */}
      {showSummary && summary && (
        <Card className="border-brand-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-brand-primary">📝 {summaryTitle}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowSummary(false)}>
              <Trash2 className="h-4 w-4 mr-1" /> Fechar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              {summary}
            </div>
            <p className="text-sm text-muted-foreground mt-2">{highlights.length} trecho(s) grifado(s)</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
