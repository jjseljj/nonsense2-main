import React, { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import SecondComponent from "@/Sections/SecondComponent/SecondComponent";
import LogoComponent from "@/Sections/LogoComponent/LogoComponent";
import InfoComponent from "@/Sections/InfoComponent/InfoComponent";
import { services } from "@/source";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false); 

  const handleLogoClick = () => {
    console.log("Клик на логотип");
    setIsLogoModalOpen((prevState) => !prevState); 
  };
  
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; 

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    console.log("Событие сработало:", e.deltaY);
    console.log("Скролл", e.deltaY);
    console.log("Текущий индекс:", startIndex);
    if (e.deltaY > 0 && startIndex + itemsPerPage < services.length) {
      setStartIndex((prev) => Math.min(prev + 1, services.length - itemsPerPage));
    } else if (e.deltaY < 0 && startIndex > 0) {
      setStartIndex((prev) => Math.max(prev - 1, 0));
    }
  }; 
  
  

  return (
    <header className={`header ${isModalOpen ? "modal-open" : ""}`}>
      {/* Блок с картинкой и содержимым */}
      <div className="header__image-wrapper">
        <img src="/1.png" alt="Background" className="header__background" />

        {/* Рамка */}
        <div className="header__border">
          {/* Кнопки сверху */}
          <div className="header-top">
            <Link href="/Product">
              <button className="top-btn1">
                  <img src="/Поделиться.png" alt="Поделиться" />
              </button>  
            </Link>


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

          {/* Центральные кнопки */}
          <div className="header-scroll" onWheel={(e) => handleScroll(e)}>
            {[...Array(itemsPerPage)].map((_, index) => {
                const service = services[startIndex + index];
                return (
                <div key={index} className={`button-with-dot${index + 1}`}>
                    <GoDotFill className={`side-btn__dot${index + 1}`} />
                    <button className={`side-btn${index + 1}`}>
                    <div className="side-btn__header">
                        <div className="side-btn__title-wrapper">
                        <span className="side-btn__title">{service?.title || "—"}</span>
                        <BiDownArrow className="side-btn__icon" />
                        </div>
                        <span className="side-btn__price">{service?.price || "—"}</span>
                    </div>
                    <p className="side-btn__description">{service?.description || "—"}</p>
                    </button>
                </div>
                );
            })}
            </div>

           {/* Кнопка сбоку справа */}
           <div className="button-right" onClick={handleToggleModal}>
              <IoIosArrowBack className="button-right__icon" />
            </div>

            {/* Модальное окно с SecondComponent */}
            {isModalOpen && (
              <div className="modal" onClick={handleToggleModal}>
                <div
                  className="modal__content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SecondComponent />
                </div>
              </div>
            )}

          {/* Кнопка снизу */}
          <div className="header-bottom">
            <button className="bottom-btn">
                <img src="/стрелка.png" alt="Стрелка" className="bottom-btn__icon" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

