import { Navigation } from "@/components/navigation"
import { TextEditor } from "@/components/text-editor"

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ferramenta de Estudo</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Cole seu texto, grife o que importa e gere resumos inteligentes
            </p>
          </div>

          <TextEditor />
        </div>
      </div>
    </div>
  )
}
