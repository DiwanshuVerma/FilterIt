import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

interface productContextType {
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

export const ProductsProvider = ({ children }: { children: ReactNode }) => {

    const [selectedCategory, setSelectedCategory] = useState<string>("")

    
    const [searchInput, setSearchInput] = useState<string>("")
    const [minVal, setMinVal] = useState<number>(0)
    const [maxVal, setMaxVal] = useState<number>(0)
    
    const [selectedKeyword, setSelectedKeyword] = useState<string[]>([])
    const [keywords] = useState([
        "Apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt"
    ])


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

    return (
        <ProductContext.Provider value={{
            keywords,
            handleKeywordSelect,
            selectedKeyword,
            handleResetForm,
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

