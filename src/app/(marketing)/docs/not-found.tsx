import Link from "next/link"
import { Terminal, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Card className="w-full max-w-md border-dashed border-2 rounded-none shadow-none">
        <CardHeader className="border-b border-dashed pb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-mono">docs_not_found.md</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6 pb-0 font-mono">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">$</span>
              <span>docs status</span>
            </div>
            <div className="space-y-1 pl-6">
              <p className="text-3xl font-bold">404</p>
              <p className="text-muted-foreground">Documentation page not found</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">$</span>
              <div className="flex items-center">
                <span>search_docs</span>
                <span className="ml-1 h-5 w-2 animate-pulse bg-foreground inline-block" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-6 border-t border-dashed mt-6">
          <div className="w-full space-y-2">
            <Button variant="outline" className="w-full rounded-none border-dashed" asChild>
              <Link href="/docs">$ cd /docs</Link>
            </Button>
            <Button variant="outline" className="w-full rounded-none border-dashed" asChild>
              <Link href="/">$ cd /home</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
