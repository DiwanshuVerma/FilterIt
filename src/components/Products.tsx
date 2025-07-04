import { useEffect, useState } from "react"
import { useProducts } from "../context/productsProvider"
import { Pagination } from "./Pagination"

interface ProductType {
    title: string,
    price: number,
    thumbnail: string,
    category?: string,
    // keyword: string
}

const Products = () => {

    const { searchInput, selectedCategory, selectedKeyword, minVal, maxVal } = useProducts()

    const [products, setProducts] = useState<ProductType[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)

    const [currentPage, setCurrentPage] = useState<number>(1)

    const itemsPerPage = 12

    useEffect(() => {
        const fetchProducts = async () => {
            let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`

            if (selectedKeyword.length > 0) {
                const keywordQuery = selectedKeyword.join(" ");
                url = `https://dummyjson.com/products/search?q=${keywordQuery}`;
            }

            const res = await fetch(url)

            const data = await res.json()

            setProducts(data.products)
            console.log(data)
            setTotalPages(Math.ceil(data.total / itemsPerPage))
        }

        fetchProducts()
        console.log(currentPage)
    }, [currentPage, selectedKeyword])

    const filteredProducts = products.filter(product => {
        const matchSearch = product.title.toLowerCase().includes(searchInput)
        const matchCategory = selectedCategory ? product.category === selectedCategory : true
        // const matchKeyword = selectedKeyword === product.keyword ? selectedKeyword : true

        const matchMin = minVal ? product.price >= minVal : true
        const matchMax = maxVal ? product.price <= maxVal : true

        return matchSearch && matchCategory && matchMin && matchMax
    })


    return (
        <section className="mt-6">
            {/* <button onClick={() => setMaxPageSize(pre => pre + 2)}>
                filters
            </button> */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.title}>
                        <Product thumbnail={product.thumbnail} title={product.title} price={product.price} />
                    </div>
                ))}
            </div>

            <div className=" flex justify-between w-full">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </section>
    )
}

const Product = ({ thumbnail, title, price }: ProductType) => {
    return (
        <div className=" w-60 h-44 border border-neutral-200 shadow-lg rounded">
            <img src={thumbnail} alt="productImg" className="h-[60%] m-auto" />

            <div className="py-2 px-3 h-2/5">
                <h2 className="text-[13px] font-semibold">{title}</h2>
                <p className="text-sm ">$ {price}</p>
            </div>
        </div>
    )
}


export default Products