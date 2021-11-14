import { pickStyle } from 'scale'

import MenuDesktop from './desktop/Menu'
import MenuMobile from './mobile/Menu'

const Menu = pickStyle(MenuMobile, MenuDesktop)

export default Menu
