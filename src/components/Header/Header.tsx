import React from 'react';
import styles from './Header.module.scss';
import { PageSection } from '../../types/PageSection';
import classNames from 'classnames';

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageSection>>;
  currentPage: PageSection;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  favourites: number[];
}

export const Header: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  setIsMenuOpen,
  favourites,
}) => {
  const pagesToShow = Object.values(PageSection).filter(
    link => link !== PageSection.Favorites && link !== PageSection.Cart,
  );

  return (
    <header className={styles.header}>
      <a href="#" className={styles.header__logo}>
        <img src="img/Logo.svg" alt="" />
      </a>
      <div className={styles.header__toplist}>
        <nav className={styles['header__navigation--pages']}>
          <ul
            className={`${styles.header__list} ${styles['header__list--pages']}`}
          >
            {pagesToShow.map(link => (
              <li
                className={classNames(
                  styles.header__item,
                  styles['header__item--page'],
                  {
                    [styles['header__item--active']]: currentPage === link,
                  },
                )}
                key={link}
                onClick={() => setCurrentPage(link)}
              >
                <a
                  href="#"
                  className={classNames(styles.header__link, {
                    [styles['header__link--active']]: currentPage === link,
                  })}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={styles.header__navigation}>
          <ul className={styles.header__list}>
            <li
              className={classNames(styles.header__button, {
                [styles['header__button--active']]:
                  currentPage === 'Favourites',
              })}
              onClick={() => setCurrentPage(PageSection.Favorites)}
            >
              <button
                className={`${styles.header__link} ${styles['header__link--button']}`}
              >
                <img
                  className={styles.header__image}
                  src="img/header/favorite.svg"
                  alt="favorite"
                />
                {favourites.length > 0 && (
                  <span className={styles.header__span}>
                    {favourites.length}
                  </span>
                )}
              </button>
            </li>
            <li
              className={classNames(styles.header__button, {
                [styles['header__button--active']]: currentPage === 'Cart',
              })}
              onClick={() => setCurrentPage(PageSection.Cart)}
            >
              <button className={styles.header__link}>
                <img src="img/header/cart.svg" alt="cart" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles['header__burger-icon']}>
        <a
          href="#"
          className={styles['header__burger-menu']}
          onClick={() => setIsMenuOpen(true)}
        >
          <img src="img/header/burger-menu.svg" alt="burger-menu" />
        </a>
      </div>
    </header>
  );
};