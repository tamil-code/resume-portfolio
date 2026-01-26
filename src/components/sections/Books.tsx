import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import booksData from "@/data/books.json"
import { motion } from "framer-motion"

export function Books() {
  return (
    <section id="books" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Bookshelf</h2>
          <p className="text-muted-foreground">Books that shaped my thinking.</p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap rounded-lg pb-4">
          <div className="flex w-max space-x-6 p-4">
            {booksData.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative w-[200px] space-y-3"
              >
                <div className="overflow-hidden rounded-md border bg-muted shadow-sm transition-all hover:scale-105 hover:shadow-md">
                  <img
                    src={`${import.meta.env.BASE_URL}${book.pic.slice(1)}`}
                    alt={book.title}
                    className="aspect-[2/3] h-full w-full object-cover transition-transform"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <h3 className="font-medium leading-none truncate" title={book.title}>{book.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 whitespace-normal h-8" title={book.description}>{book.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </motion.div>
    </section>
  )
}
