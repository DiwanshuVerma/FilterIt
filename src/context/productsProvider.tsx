import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface productContextType {
    products: Product[],
    filteredProducts: Product[],
    categories: string[],
    keywords: string[],
    selectedKeyword: string[],
    handleKeywordSelect: (keyword: string) => void,
    handleResetForm: () => void,
    setSearchInput: Dispatch<SetStateAction<string>>,
    searchInput: string,

    setMinVal: Dispatch<SetStateAction<number>>,
    setMaxVal: Dispatch<SetStateAction<number>>,
    minVal: number,
    maxVal: number,

    selectedCategory: string,
    setSelectedCategory: Dispatch<SetStateAction<string>>,
}

const ProductContext = createContext<productContextType | null>(null)

interface Product {
    category: string,
    thumbnail: string,
    price: number,
    title: string,
}

interface FetchResponse {
    products: Product[]
}

export const ProductsProvider = ({ children }: { children: ReactNode }) => {

    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    const [selectedKeyword, setSelectedKeyword] = useState<string[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    const [searchInput, setSearchInput] = useState<string>("")
    const [minVal, setMinVal] = useState<number>(0)
    const [maxVal, setMaxVal] = useState<number>(0)

    const [keywords] = useState([
        "Apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt"
    ])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products")
                const data: FetchResponse = await response.json()
                setProducts(data.products)

                const uniqueCategories = [...new Set((data.products).map(item => {
                    return item.category
                }))]

                setCategories(uniqueCategories)
                console.log(uniqueCategories)
            } catch (err) {
                console.log("Error: ", err)
            }
        }

        fetchCategories()
    }, [])

    const handleResetForm = () => {
        setSelectedKeyword([])
        setSelectedCategory("")
    }

    const handleKeywordSelect = (keyword: string) => {
        setSelectedKeyword(prev => (
            prev.some(selected => selected === keyword) ?
                prev.filter(selected => selected !== keyword) :
                [...prev, keyword]
        )
        )
    }

    useEffect(() => {
        let filtered = products

        
        if (searchInput) {
            filtered = filtered.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()))
        }
        
        if (minVal) {
            filtered = filtered.filter(product => product.price >= minVal)
        }
        if (maxVal) {
            filtered = filtered.filter(product => product.price <= maxVal)
        }

        if(selectedCategory){
            filtered = filtered.filter(product => product.category === selectedCategory)
        }

        setFilteredProducts(filtered)
    }, [searchInput, products, minVal, maxVal, selectedCategory])

    return (
        <ProductContext.Provider value={{
            products,
            categories,
            keywords,
            handleKeywordSelect,
            selectedKeyword,
            handleResetForm,
            filteredProducts,
            setSearchInput,
            searchInput,

            minVal,
            maxVal,
            setMinVal,
            setMaxVal,

            selectedCategory, 
            setSelectedCategory
        }
        }>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => {
    const context = useContext(ProductContext)
    if (!context) throw new Error("useProducts must be used within a ProductsProvider")
    return context
}

