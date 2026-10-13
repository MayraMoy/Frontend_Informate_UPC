import AppProvider from './Context/AppProvider.jsx'
import { NoticiasHome } from './Pages/noticias/home-noticias/NoticiaHome.jsx'
import { ResolucionesPage } from './Pages/resoluciones/ResolucionesPage.jsx'

function App() {

  return (
    <AppProvider>
          <NoticiasHome />
          <ResolucionesPage />
    </AppProvider>
  )
}

export default App
