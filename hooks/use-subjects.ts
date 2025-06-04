"use client"

import { useState, useEffect } from "react"
import type { Subject, Topic, Summary } from "@/types/subject"

// Função para gerar IDs únicos
const generateId = () => Math.random().toString(36).substring(2, 9)

// Dados iniciais para demonstração
const initialSubjects: Subject[] = [
  {
    id: "s1",
    name: "Matemática",
    topics: [
      {
        id: "t1",
        name: "Álgebra",
        summaries: [],
      },
      {
        id: "t2",
        name: "Geometria",
        summaries: [],
      },
    ],
  },
  {
    id: "s2",
    name: "Português",
    topics: [
      {
        id: "t3",
        name: "Gramática",
        summaries: [],
      },
      {
        id: "t4",
        name: "Literatura",
        summaries: [],
      },
    ],
  },
]

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    // Tenta carregar do localStorage se disponível
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("subjects")
      return saved ? JSON.parse(saved) : initialSubjects
    }
    return initialSubjects
  })

  // Salva no localStorage quando subjects mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("subjects", JSON.stringify(subjects))
    }
  }, [subjects])

  // Adicionar nova disciplina
  const addSubject = (name: string) => {
    const newSubject: Subject = {
      id: generateId(),
      name,
      topics: [],
    }
    setSubjects([...subjects, newSubject])
    return newSubject.id
  }

  // Remover disciplina
  const removeSubject = (subjectId: string) => {
    setSubjects(subjects.filter((s) => s.id !== subjectId))
  }

  // Adicionar matéria a uma disciplina
  const addTopic = (subjectId: string, name: string) => {
    const newTopic: Topic = {
      id: generateId(),
      name,
      summaries: [],
    }

    setSubjects(
      subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            topics: [...subject.topics, newTopic],
          }
        }
        return subject
      }),
    )

    return newTopic.id
  }

  // Remover matéria
  const removeTopic = (subjectId: string, topicId: string) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            topics: subject.topics.filter((topic) => topic.id !== topicId),
          }
        }
        return subject
      }),
    )
  }

  // Adicionar resumo a uma matéria
  const addSummary = (subjectId: string, topicId: string, title: string, content: string, highlights: string[]) => {
    const newSummary: Summary = {
      id: generateId(),
      title,
      content,
      highlights,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSubjects(
      subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            topics: subject.topics.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  summaries: [...topic.summaries, newSummary],
                }
              }
              return topic
            }),
          }
        }
        return subject
      }),
    )

    return newSummary.id
  }

  // Remover resumo
  const removeSummary = (subjectId: string, topicId: string, summaryId: string) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            topics: subject.topics.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  summaries: topic.summaries.filter((summary) => summary.id !== summaryId),
                }
              }
              return topic
            }),
          }
        }
        return subject
      }),
    )
  }

  // Atualizar resumo
  const updateSummary = (
    subjectId: string,
    topicId: string,
    summaryId: string,
    updates: Partial<Omit<Summary, "id" | "createdAt">>,
  ) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            topics: subject.topics.map((topic) => {
              if (topic.id === topicId) {
                return {
                  ...topic,
                  summaries: topic.summaries.map((summary) => {
                    if (summary.id === summaryId) {
                      return {
                        ...summary,
                        ...updates,
                        updatedAt: new Date(),
                      }
                    }
                    return summary
                  }),
                }
              }
              return topic
            }),
          }
        }
        return subject
      }),
    )
  }

  return {
    subjects,
    addSubject,
    removeSubject,
    addTopic,
    removeTopic,
    addSummary,
    removeSummary,
    updateSummary,
  }
}
