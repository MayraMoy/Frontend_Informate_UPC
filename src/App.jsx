import AppProvider from './Context/AppProvider.jsx'
import { NoticiasHome } from './Pages/noticias/home-noticias/NoticiaHome.jsx'

function App() {

  return (
    <AppProvider>
          <NoticiasHome />
    </AppProvider>
  )
}

export default App
