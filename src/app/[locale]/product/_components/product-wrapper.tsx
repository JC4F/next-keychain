"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CustomPagination,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { ROLE } from "@/constants";
import { useGlobalStore } from "@/hooks";
import { ProductTable } from "@/lib/database/types";
import { File, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Key, useState } from "react";
import { ProductCard } from "./product-card";
import { ProductDetailDialog } from "./product-detail-dialog";

type ProductWrapperProps = {
  products: ProductTable[];
};

export const ProductWrapper = ({
  products: listProducts,
}: ProductWrapperProps) => {
  const {
    data: { user },
    setData,
  } = useGlobalStore();
  const [products, setProducts] = useState(listProducts);
  const [pageSize, setpageSize] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const curProducts = products.slice(startIndex, endIndex);

  return (
    <main className="flex flex-1 flex-col gap-4">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            {user && user.role === ROLE.ADMIN && (
              <Button size="sm" asChild>
                <Link
                  href="/product/new"
                  className="flex items-center h-8 gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {curProducts.map((product) => (
                  <ProductCard
                    key={product.id as unknown as Key}
                    product={product}
                    width={150}
                    height={150}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <CustomPagination
                pageSize={pageSize}
                setPageSize={setpageSize}
                currentPage={currentPage}
                setCurrentPage={setcurrentPage}
                total={products.length}
              />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <ProductDetailDialog />
    </main>
  );
};
