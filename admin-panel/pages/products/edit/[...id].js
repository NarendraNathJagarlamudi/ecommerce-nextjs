import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get('/api/products?id=' + id)
                .then(response => {
                    setProductInfo(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Layout>
            <h1><b>Edit Product</b></h1>
            {productInfo ? (
                <ProductForm {...productInfo} />
            ) : (
                <p>No product found.</p>
            )}
        </Layout>
    );
}
