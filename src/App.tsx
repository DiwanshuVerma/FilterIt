

import { BrowserRouter } from "react-router-dom"
import Filters from "./components/Filters"
import { ProductsProvider } from "./context/productsProvider"
import Products from "./components/Products"

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider >
        <div className="flex gap-4">
          <Filters />
          <Products />
        </div>
      </ProductsProvider>
    </BrowserRouter>
  )
}

export default App
