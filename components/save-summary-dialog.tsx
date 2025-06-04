"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSubjects } from "@/hooks/use-subjects"
import { Save, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SaveSummaryDialogProps {
  summaryContent: string
  highlightIds: string[]
  onSave: () => void
}

export function SaveSummaryDialog({ summaryContent, highlightIds, onSave }: SaveSummaryDialogProps) {
  const { subjects, addSummary } = useSubjects()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")

  const handleSave = () => {
    if (title && selectedSubject && selectedTopic) {
      addSummary(selectedSubject, selectedTopic, title, summaryContent, highlightIds)
      setOpen(false)
      setTitle("")
      setSelectedSubject("")
      setSelectedTopic("")
      onSave()
    }
  }

  const selectedSubjectTopics = subjects.find((s) => s.id === selectedSubject)?.topics || []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary hover:bg-brand-accent1">
          <Save className="h-4 w-4 mr-2" /> Salvar Resumo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Salvar Resumo</DialogTitle>
          <DialogDescription>Escolha onde deseja salvar seu resumo para acessá-lo posteriormente.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título do Resumo
            </label>
            <Input
              id="title"
              placeholder="Digite um título para o resumo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Disciplina
            </label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Selecione uma disciplina" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Matéria
            </label>
            <Select
              value={selectedTopic}
              onValueChange={setSelectedTopic}
              disabled={!selectedSubject || selectedSubjectTopics.length === 0}
            >
              <SelectTrigger id="topic">
                <SelectValue placeholder="Selecione uma matéria" />
              </SelectTrigger>
              <SelectContent>
                {selectedSubjectTopics.map((topic) => (
                  <SelectItem key={topic.id} value={topic.id}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            <X className="h-4 w-4 mr-2" /> Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!title || !selectedSubject || !selectedTopic}>
            <Save className="h-4 w-4 mr-2" /> Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
