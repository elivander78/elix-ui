import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'
import type { App } from 'vue'

Accordion.install = (app: App) => {
  app.component(Accordion.name, Accordion)
  app.component(AccordionItem.name, AccordionItem)
}

AccordionItem.install = (app: App) => {
  app.component(AccordionItem.name, AccordionItem)
}

export { Accordion, AccordionItem }
export type { AccordionProps, AccordionItemProps, AccordionStyle } from './Accordion'
export default Accordion

