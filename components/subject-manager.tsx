"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSubjects } from "@/hooks/use-subjects"
import { PlusCircle, Trash2, BookOpen, Book } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface SubjectManagerProps {
  onSelectSubjectTopic?: (subjectId: string, topicId: string) => void
  selectedSubjectId?: string
  selectedTopicId?: string
}

export function SubjectManager({ onSelectSubjectTopic, selectedSubjectId, selectedTopicId }: SubjectManagerProps) {
  const { subjects, addSubject, removeSubject, addTopic, removeTopic } = useSubjects()

  const [newSubjectName, setNewSubjectName] = useState("")
  const [newTopicName, setNewTopicName] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(selectedSubjectId || null)

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      addSubject(newSubjectName.trim())
      setNewSubjectName("")
    }
  }

  const handleAddTopic = (subjectId: string) => {
    if (newTopicName.trim()) {
      addTopic(subjectId, newTopicName.trim())
      setNewTopicName("")
    }
  }

  const handleSelectSubjectTopic = (subjectId: string, topicId: string) => {
    if (onSelectSubjectTopic) {
      onSelectSubjectTopic(subjectId, topicId)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Disciplinas e Matérias
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Adicionar Nova Disciplina */}
        <div className="flex gap-2">
          <Input
            placeholder="Nova disciplina..."
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddSubject} size="sm">
            <PlusCircle className="h-4 w-4 mr-1" /> Adicionar
          </Button>
        </div>

        {/* Lista de Disciplinas */}
        <Accordion type="single" collapsible className="w-full">
          {subjects.map((subject) => (
            <AccordionItem key={subject.id} value={subject.id}>
              <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-md">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>{subject.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 space-y-4">
                  {/* Adicionar Nova Matéria */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nova matéria..."
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => handleAddTopic(subject.id)} size="sm" variant="outline">
                      <PlusCircle className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
                  </div>

                  {/* Lista de Matérias */}
                  <div className="space-y-2">
                    {subject.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          selectedSubjectId === subject.id && selectedTopicId === topic.id
                            ? "bg-brand-primary/10"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        <button
                          className="flex-1 text-left flex items-center gap-2"
                          onClick={() => handleSelectSubjectTopic(subject.id, topic.id)}
                        >
                          <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                          <span>{topic.name}</span>
                          <span className="text-xs text-gray-500">({topic.summaries.length} resumos)</span>
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTopic(subject.id, topic.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))}
                    {subject.topics.length === 0 && (
                      <p className="text-sm text-gray-500 italic">Nenhuma matéria adicionada</p>
                    )}
                  </div>

                  {/* Remover Disciplina */}
                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSubject(subject.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remover Disciplina
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {subjects.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">Nenhuma disciplina adicionada</p>
            <p className="text-sm text-gray-400">Adicione disciplinas para organizar seus estudos</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
