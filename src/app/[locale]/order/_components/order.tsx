"use client";

import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CustomPagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { formatDate } from "@/lib";
import { OrderTable, UserTable } from "@/lib/database/types";
import { Key, useState } from "react";

type OrderItem = OrderTable & {
  user: UserTable;
};

export type OrderProps = {
  orders: OrderItem[];
};

export const Order = ({ orders: listOrders }: OrderProps) => {
  const [orders, setOrders] = useState(listOrders);
  const [pageSize, setpageSize] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const curOrders = orders.slice(startIndex, endIndex);

  return (
    <main>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="">Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {curOrders.map((order) => (
                <TableRow key={order.id as unknown as Key}>
                  <TableCell>
                    <div className="font-medium">{order.user.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${order.totalPrice}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      Fulfilled
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(new Date(order.created_at))}
                  </TableCell>
                  <TableCell className="">{order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <CustomPagination
            pageSize={pageSize}
            setPageSize={setpageSize}
            currentPage={currentPage}
            setCurrentPage={setcurrentPage}
            total={orders.length}
          />
        </CardFooter>
      </Card>
    </main>
  );
};
