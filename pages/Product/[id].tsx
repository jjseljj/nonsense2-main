import React, { useEffect, useState } from 'react';
import ProductDetails from '@/Sections/ProductDetails/ProductDetails';
import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { id, view } = router.query; // Получаем id и view из URL
  const [activeView, setActiveView] = useState<string>("description"); // По умолчанию "description"

  useEffect(() => {
    // Обновляем activeView при первом рендере
    if (view === "form") {
      setActiveView("form");
    } else if (view === "description") {
      setActiveView("description");
    }
  }, [view]);

  if (!id) {
    return <div>Загрузка...</div>; 
  }

  return (
    <>
      <ProductDetails productId={id as string} initialView={activeView} />
    </>
  );
};

export default Product;



/*
http://localhost:3001/Product/id?view=form
*/
