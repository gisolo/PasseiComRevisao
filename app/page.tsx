import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Zap, BookOpen, Highlighter } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Transforme seus estudos com{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent2">
              grifos inteligentes
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Cole seu texto ou envie um PDF, grife o que importa, e revise apenas o que interessa. Simples assim.
          </p>

          {/* Imagem do estudante */}
          <div className="mb-12">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Estudante estudando com livros e computador"
              width={600}
              height={400}
              className="mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* CTA Principal */}
          <Link href="/study">
            <Button
              size="lg"
              className="bg-brand-primary hover:bg-brand-accent1 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Zap className="mr-2 h-5 w-5" />
              Comece grátis por 7 dias
            </Button>
          </Link>
        </div>
      </section>

      {/* Planos */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Escolha seu plano</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Grátis */}
          <Card className="relative border-2 border-gray-200 hover:border-brand-primary transition-colors">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Plano Grátis</CardTitle>
              <div className="text-4xl font-bold text-brand-primary">7 dias</div>
              <p className="text-gray-600 dark:text-gray-300">Teste todas as funcionalidades</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Grifos ilimitados</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Paletas de cores</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Geração de resumos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Upload de arquivos</span>
                </div>
              </div>
              <Link href="/study" className="block">
                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300">
                  Começar grátis
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Plano Pro */}
          <Card className="relative border-2 border-brand-primary shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-brand-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </span>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Plano Pro</CardTitle>
              <div className="text-4xl font-bold text-brand-primary">
                R$ 7,99
                <span className="text-lg text-gray-600 dark:text-gray-300">/mês</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Para estudantes dedicados</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Tudo do plano grátis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Sincronização na nuvem</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Histórico ilimitado</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Suporte prioritário</span>
                </div>
              </div>
              <Link href="/study" className="block">
                <Button className="w-full bg-brand-primary hover:bg-brand-accent1 text-white">Começar agora</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-white/50 dark:bg-gray-800/50 rounded-3xl mx-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Por que escolher o PasseiComRevisão?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-brand-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Highlighter className="h-8 w-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Grifos Inteligentes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Selecione e grife textos com cores personalizadas para organizar melhor seus estudos.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-brand-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-brand-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Resumos Automáticos</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Gere resumos instantâneos com base nos trechos que você grifou.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-brand-accent1/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-brand-accent1" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Rápido e Simples</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Interface intuitiva que permite focar no que realmente importa: seus estudos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Pronto para revolucionar seus estudos?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Comece agora mesmo e veja a diferença!</p>
        <Link href="/study">
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-brand-accent1 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Zap className="mr-2 h-5 w-5" />
            Comece grátis por 7 dias
          </Button>
        </Link>
      </section>
    </div>
  )
}
