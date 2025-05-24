import { useEffect, useState } from "react"
import { useProducts } from "../context/productsProvider"


interface Product {
    category: string,
    thumbnail: string,
    price: number,
    title: string,
}

interface FetchResponse {
    products: Product[]
}

const Filters = () => {

    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const response = await fetch("https://dummyjson.com/products")
                    const data: FetchResponse = await response.json()
    
                    const uniqueCategories = [...new Set((data.products).map(item => {
                        return item.category
                    }))]
    
                    setCategories(uniqueCategories)
                } catch (err) {
                    console.log("Error: ", err)
                }
            }
    
            fetchCategories()
        }, [])

    const {
        keywords,
        handleKeywordSelect,
        handleResetForm,
        selectedKeyword,
        searchInput,
        setSearchInput,

        setMinVal,
        setMaxVal,

        setSelectedCategory
    } = useProducts()


    return (
        <section className="w-64 sm:w-72 px-4 mt-6">
            <h1 className="text-xl sm:text-3xl font-semibold mb-4">FilterIt</h1>

            <form
            onReset={() => setSearchInput("")}
            className=" space-y-3">

                {/* ---------> Search and min max <------ */}
                <div className="space-y-2">
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="search" className="border border-neutral-300 py-1 px-2 rounded w-full" placeholder="Search product..." />

                    <div className="flex justi  fy-between gap-2">
                        <input
                            // value={minVal}
                            onChange={(e) => setMinVal(Number(e.target.value))}
                            type="number" className="border border-neutral-300 py-1 px-2 rounded w-full" placeholder="Min" />
                        <input
                            // value={maxVal}
                            onChange={(e) => setMaxVal(Number(e.target.value))}
                            type="number" className="border border-neutral-300 py-1 px-2 rounded w-full" placeholder="Max" />
                    </div>
                </div>

                {/* --------------> Categories <--------------- */}
                <div>
                    <h2 className="text-base sm:text-lg mb-2 font-medium">Categories</h2>
                    <div className="flex flex-col ">
                        {categories.map(category => {
                            return (
                                <div key={category} className="space-x-2 space-y-3 text-nowrap uppercase text-[12px] sm:text-sm text-neutral-800" >
                                    <input id={category} type="radio" name="cat" onChange={(e) => setSelectedCategory(e.target.value)} value={category} />
                                    <label htmlFor={category}>{category}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* ---------------> Keywords <-------------------- */}
                <div className="text-left">
                    <h2 className="text-base sm:text-lg  mb-2">Keywords</h2>
                    <div className="flex flex-col gap-1 text-left">
                        {keywords.map(keyword => (
                            <button
                                type="button"
                                className={`flex  text-[12px] sm:text-sm justify-between border border-neutral-200 text-left px-2 py-1 rounded  text-neutral-800
                                ${selectedKeyword.some(selected => selected === keyword) ? 'bg-gray-300' : 'bg-white'}`}
                                onClick={() => handleKeywordSelect(keyword)}
                                key={keyword}
                            >{keyword}

                                {selectedKeyword.some(selected => selected === keyword) ? <span className="text-red-600 cursor-pointer">X</span> : null}

                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={handleResetForm} type="reset" className="bg-black text-white w-full px-2 py-1 border border-neutral-400 rounded">Reset Filters</button>
            </form>
        </section>
    )
}

export default Filters