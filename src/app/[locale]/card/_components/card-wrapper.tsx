"use client";

import { deleteCard } from "@/actions";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CustomPagination,
  Input,
  Label,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "@/components";
import { useModalLayer2 } from "@/hooks";
import { formatDate } from "@/lib";
import { CardTable, ProductTable } from "@/lib/database/types";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Card = CardTable & {
  product: ProductTable;
};

type CardWrapperProps = {
  cards: Card[];
};

export const CardWrapper = ({ cards: listCards }: CardWrapperProps) => {
  const router = useRouter();
  const { onOpen: onOpenModalV2 } = useModalLayer2();
  const [cards, setCards] = useState(() => {
    return listCards.map((card) => ({
      ...card,
      isChosen: true,
    }));
  });
  const [isChoseAll, setIsChoseAll] = useState(true);
  const [pageSize, setpageSize] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [isSubmitCheckout, setIsSubmitCheckout] = useState(false);
  const [address, setAddress] = useState("");

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const curCards = cards.slice(startIndex, endIndex);
  const totalPrice = Number(
    cards.reduce((result, cur) => {
      if (!cur.isChosen) return result;
      return result + cur.product.price * cur.quantity;
    }, 0)
  ).toFixed(2);

  const confirmDelete = async (id: string) => {
    const result = await deleteCard(id);

    if (result.isSuccess) {
      toast.success(result.message);

      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    setCards((pre) =>
      listCards.map((item) => ({
        ...item,
        isChosen:
          pre.find((preCard) => preCard.id === item.id)?.isChosen || false,
      }))
    );
  }, [listCards]);

  useEffect(() => {
    setIsChoseAll(cards.length > 0 && cards.every((card) => card.isChosen));
  }, [cards]);

  useEffect(() => {
    return () => {
      setIsSubmitCheckout(false);
    };
  }, []);

  const handleCheckout = () => {
    const data = {
      address,
      total: totalPrice,
      orders: cards
        .filter((card) => card.isChosen && card.quantity > 0)
        .map((card) => ({
          cardId: card.id,
          externalPriceId: card.product.externalPriceId,
          externalProductId: card.product.externalProductId,
          productId: card.product.id,
          userId: card.userId,
          quantity: card.quantity,
          mainImage: card.product.mainImage,
          images: card.product.images,
          title: card.product.title,
          description: card.product.description,
          price: card.product.price,
        })),
    };

    setIsSubmitCheckout(true);
    fetch("/api/stripe/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => (window.location.href = data.data));
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 overflow-hidden h-fit">
          <CardHeader>
            <CardTitle>Card</CardTitle>
            <CardDescription>
              Manage your card and view their sales performance.
            </CardDescription>
          </CardHeader>

          <CardContent className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      checked={isChoseAll}
                      onCheckedChange={(isCheck: boolean) => {
                        setIsChoseAll(isCheck);
                        setCards((prev) =>
                          prev.map((item) => ({ ...item, isChosen: isCheck }))
                        );
                      }}
                    />
                  </TableHead>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    Image
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {curCards.map((card) => (
                  <TableRow key={card.id as unknown as Key}>
                    <TableCell>
                      <Checkbox
                        checked={card.isChosen}
                        onCheckedChange={(isCheck: boolean) => {
                          setCards((prev) =>
                            prev.map((item) =>
                              item.id === card.id
                                ? { ...item, isChosen: isCheck }
                                : item
                            )
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="100"
                        src={card.product.mainImage}
                        width="100"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {card.product.title}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        className="w-16 h-8 px-2 border rounded-md"
                        value={card.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          setCards((prev) =>
                            prev.map((item) =>
                              item.id === card.id
                                ? { ...item, quantity: value }
                                : item
                            )
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>${card.product.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(new Date(card.product.created_at))}
                    </TableCell>
                    <TableCell>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          onOpenModalV2("confirm", {
                            confirmDialog: {
                              title: "Confirm delete Cart",
                              description: `This action will delete ${card.product.title}`,
                              onConfirm: async () =>
                                await confirmDelete(card.id as string),
                            },
                          });
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
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
              total={cards.length}
            />
          </CardFooter>
        </Card>

        <Card className="h-fit">
          <CardHeader className="bg-muted/50">
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Summary total of product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 mt-6">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                {cards.map((card) => {
                  if (card.quantity === 0 || !card.isChosen) return <></>;

                  return (
                    <li
                      key={card.id as unknown as Key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">
                        {card.product.title} x <span>{card.quantity}</span>
                      </span>
                      <span>
                        ${Number(card.product.price * card.quantity).toFixed(2)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Separator className="my-2" />
              <div className="grid gap-3">
                <Label className="font-semibold text-base" htmlFor="address">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="You are at..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>${totalPrice}</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={isSubmitCheckout || cards.length === 0}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
