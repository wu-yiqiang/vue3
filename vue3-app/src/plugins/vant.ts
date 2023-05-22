import { App } from 'vue'
import {
  Button,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem,
  ConfigProvider,
  Cell,
  RadioGroup,
  Radio,
  Field,
  Calendar,
  Tabs,
  Tab,
  PullRefresh
} from 'vant'

const components = [
  Button,
  NavBar,
  Tabbar,
  TabbarItem,
  Icon,
  ConfigProvider,
  Cell,
  RadioGroup,
  Radio,
  Field,
  Calendar,
  Tabs,
  Tab,
  PullRefresh
]

export const setupVant = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component)
  })
}
