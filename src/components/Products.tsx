import { useProducts } from "../context/productsProvider"

interface ProductType {
    image: string,
    title: string,
    price: number
}

const Products = () => {
        const { filteredProducts } = useProducts()

    return (
        <section className="mt-6">
            <div>
                filters
            </div>

            <div className="grid grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.title}> 
                        <Product image={product.thumbnail} title={product.title} price={product.price} />
                    </div>
                ))}
            </div>

        </section>
    )
}

const Product = ({ image, title, price }: ProductType) => {
    return (
        <div className="w-48 h-56 border border-neutral-200 shadow-lg rounded">
            <img src={image} alt="productImg" className="h-[60%] m-auto" />

            <div className="py-2 px-3 h-2/5">
                <h2 className="text-sm font-semibold">{title}</h2>
                <p className="text-sm ">$ {price}</p>
            </div>
        </div>
    )
}


export default Products