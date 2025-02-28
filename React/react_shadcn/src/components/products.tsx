import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetProducts } from "@/servieses/productService";
import { useCartStore } from "@/store/cartStore";

export default function ProductList() {
  const { data: products, isLoading, error } = useGetProducts();
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products?.map((product) => (
        <Card
          key={product.id}
          className="w-[300px] h-full flex flex-col group relative space-y-4 overflow-hidden"
        >
          <figure className="group-hover:opacity-90">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black"
            >
              <HeartIcon className="size-4" />
            </Button>
          </figure>
          <CardContent className="px-4 py-0 flex-grow">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              </div>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
          </CardContent>
          <CardFooter className="mt-auto p-0 border-t">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                addToCart(product);
                alert("Added to cart");
              }}
            >
              <PlusIcon className="size-4 me-1" /> Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
