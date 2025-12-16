import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardBody from './CardBody.vue'
import CardFooter from './CardFooter.vue'
import type { App } from 'vue'

const components = [Card, CardHeader, CardBody, CardFooter]

const install = (app: App) => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { Card, CardHeader, CardBody, CardFooter, install }
export default { install }

