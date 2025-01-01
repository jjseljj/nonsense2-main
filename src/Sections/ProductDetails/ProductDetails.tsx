import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoComponent from "@/Sections/LogoComponent/LogoComponent";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { LuPower } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { services } from "@/source";


interface ProductDetailsProps {
  productId: string | string[] | undefined;
  initialView?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, initialView = "description" }) => {
  const [view, setView] = useState<string>(initialView);

  const parsedProductId = Array.isArray(productId) ? productId[0] : productId;

if (!parsedProductId) {
  return <div>Товар не найден</div>;
}

 // Получаем информацию о выбранном товаре
const product = services.find((service) => service.id === parseInt(parsedProductId, 10));


  useEffect(() => {
    setView(initialView); // Синхронизация состояния
  }, [initialView]);

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const handleLogoClick = () => {
    setIsLogoModalOpen((prevState) => !prevState);
  };

  //чек
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);

  const [isChecked, setIsChecked] = useState(false);




  // Если товара с таким ID нет
  if (!product) {
    return <div>Товар не найден</div>;
  }

  
  return (
    <div className="product-details">
      <div className="product-details__image-wrapper">
        <img src="/images/3.png" alt="Background" className="header__background" />
        <div className="product-details__border">
          <div className="header-top">
            <button className="top-btn1">
              <img src="/Поделиться.png" alt="Поделиться" />
            </button>
            <div className="top-btn2" onClick={handleLogoClick}>
              <img src="/лого.png" alt="Лого" />
            </div>
            {isLogoModalOpen && (
              <div className="modal-logo" onClick={handleLogoClick}>
                <div
                  className="modal-logo__content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LogoComponent />
                </div>
              </div>
            )}
            <button className="top-btn3">
              <Link href="/Info">
                <img src="/Информация.png" alt="Информация" />
              </Link>
            </button>
          </div>

          <div className="product-details__wrapper">
            <div className="product-details__header">
              <button
                className={`product-details__tab1 ${
                  view === "description" ? "active" : ""
                }`}
                onClick={() => setView("description")}
              >
                На заказ               
              </button>
              <button
                className={`product-details__tab2 ${view === "form" ? "active" : ""}`}
                onClick={() => setView("form")}
              >
                Прайс                
              </button>
            </div>

            <div className="product-details__content">
              {view === "description" ? (
                <div className="product-details__price">
                  <div className="product-details__price-section">
                    <div className="product-details__price-name">
                      <h2>Написать</h2>
                    </div>
                    <div className="product-details__price-amount">
                      <span>100</span>
                    </div>
                  </div>
                  <div className="product-details__price-description">
                    <textarea
                      placeholder="Введите текст"
                      rows={4}
                      className="product-details__price-textarea"
                    ></textarea>
                  </div>
                  <div className="product-details__price-actions">
                    <button className="price-actions__button-rate">Оценить</button>
                    <button className="price-actions__button-empty"></button>
                  </div>

                  <div className="product-details__price-delivery-option">
                    <div
                      className="item"
                      onClick={() => setIsFirstChecked(!isFirstChecked)}
                    >
                      {isFirstChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}

                      <span className="text text-first">Отпустить, пусть летит</span>
                    </div>
                    <div
                      className="item"
                      onClick={() => setIsSecondChecked(!isSecondChecked)}
                    >
                      {isSecondChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text text-second">Отправить по адресу</span>
                    </div>
                  </div>

                  <div className="product-details__price-email">
                  <div className="product-details__email-prefix">
                    <input
                      type="text"
                      placeholder="example"
                      className="product-details__email-prefix-input"
                    />
                  </div>
                    <div className="product-details__email-symbol">
                    <MdOutlineAlternateEmail className="email-icon" />
                    </div>
                    <div className="product-details__email-domain">
                      <input
                        type="text"
                        placeholder="domain.com"
                        className="product-details__email-domain-input"
                      />
                    </div>
                  </div>

                  <div
                      className="item2"
                      onClick={() => setIsChecked(!isChecked)}
                    >
                      {isChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text">Запомнить</span>
                  </div>      

                   <div className="product-details__price-actions-bottom">
                    <div className="product-details__back-home">
                      <Link href="/" className="back-home__button">На главную</Link>
                    </div>
                    
                    <button className="product-details__price-icon">
                      <div className="payment-button__content">
                        <div className="payment-button__text">Оплатить</div>
                        <div className="payment-button__icon">
                          <LuPower className="power-icon" />
                        </div>
                      </div>
                    </button>

                  </div>

                </div>
              ) : (
                <div className="product-details__description">
                  <div className="product-details__description-title">                
                    <h2>{product.title}</h2>
                  </div>
                  <div className="product-details__description-text">
                    <p className="product-details__description-paragraph">
                      {product.description}
                    </p>           
                  </div>    
                  <div className="product-details__price-actions">
                    <button className="price-actions__button-rate">Оценить</button>
                    <button className="price-actions__button-empty"></button>
                  </div>

                  <div className="product-details__price-delivery-option">
                    <div
                      className="item"
                      onClick={() => setIsFirstChecked(!isFirstChecked)}
                    >
                      {isFirstChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}

                      <span className="text text-first">Отпустить, пусть летит</span>
                    </div>
                    <div
                      className="item"
                      onClick={() => setIsSecondChecked(!isSecondChecked)}
                    >
                      {isSecondChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text text-second">Отправить по адресу</span>
                    </div>
                  </div>

                  <div className="product-details__price-email">
                  <div className="product-details__email-prefix">
                    <input
                      type="text"
                      placeholder="example"
                      className="product-details__email-prefix-input"
                    />
                  </div>
                    <div className="product-details__email-symbol">
                    <MdOutlineAlternateEmail className="email-icon" />
                    </div>
                    <div className="product-details__email-domain">
                      <input
                        type="text"
                        placeholder="domain.com"
                        className="product-details__email-domain-input"
                      />
                    </div>
                  </div>

                  <div
                      className="item2"
                      onClick={() => setIsChecked(!isChecked)}
                    >
                      {isChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text">Запомнить</span>
                  </div>      

                   <div className="product-details__price-actions-bottom">
                    <div className="product-details__back-home">
                      <Link href="/" className="back-home__button">На главную</Link>
                    </div>
                    <button className="product-details__price-icon">
                      <div className="payment-button__content">
                        <div className="payment-button__text">Оплатить</div>
                        <div className="payment-button__icon">
                          <LuPower className="power-icon" />
                        </div>
                      </div>
                    </button>

                  </div>
                               
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;



