

import { BrowserRouter } from "react-router-dom"
import Filters from "./components/Filters"
import { ProductsProvider } from "./context/productsProvider"
import Products from "./components/Products"

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider >
        <div className="flex gap-4 h-screen overflow-hidden">
          <Filters />

          <div className="h-full overflow-y-auto">
            <Products />
          </div>
        </div>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default App
