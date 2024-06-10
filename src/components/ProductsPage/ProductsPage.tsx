import React, { useRef, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { ModelItem } from '../HomePage/Models/ModelItem';
import { Products } from '../../types/Products';
import { FilterBy } from '../../types/FilterBy';
import { PageSection } from '../../types/PageSection';
import { PerPage } from '../../types/ItemsPerPage';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import { Pagination } from './Pagination';

interface Props {
  product: Products[];
  currentPage: PageSection;
}

export const ProductsPage: React.FC<Props> = ({ product, currentPage }) => {
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.age);
  const [itemsPerPage, setItemsPerPage] = useState<PerPage>(PerPage.All);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeDropdownPage, setActiveDropdownPage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startEl =
    itemsPerPage === PerPage.All ? 0 : currentIndex * Number(itemsPerPage);
  const endEl =
    itemsPerPage === PerPage.All
      ? product.length
      : Math.min(startEl + Number(itemsPerPage), product.length);

  const handleSetFilter = (item: FilterBy) => {
    setFilterBy(item);
    setActiveDropdown(false);
  };

  const handleSetPerPage = (item: PerPage) => {
    setItemsPerPage(item);
    setActiveDropdownPage(false);
  };

  const sortedProduct = (
    products: Products[],
    newFilter: FilterBy,
  ): Products[] => {
    switch (newFilter) {
      case FilterBy.age:
        return [...products].sort((a, b) => b.year - a.year);
      case FilterBy.title:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case FilterBy.price:
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.page__container}>
        <div className={styles.page__main}>
          {currentPage === PageSection.Phones ? (
            <h2 className={styles.page__title}>Mobile phones</h2>
          ) : (
            <h2 className={styles.page__title}>{currentPage}</h2>
          )}
          <p className={styles.page__subtitle}>{`${product.length} models`}</p>
        </div>
        <div className={styles.page__content}>
          <div className={styles.page__filter}>
            <div
              className={`${styles['page__filter-by--per-page']} ${styles['page__filter-by']}`}
            >
              <h3 className={styles['page__filter-name']}>Sort by</h3>
              <div
                className={classNames('dropdown', styles.page__dropdown, {
                  'is-active': activeDropdown,
                })}
                onClick={() => setActiveDropdown(!activeDropdown)}
                ref={dropdownRef}
              >
                <div className="dropdown-trigger">
                  <button
                    className={`button ${styles.page__button}`}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span className={styles.page__item}>{filterBy}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    {Object.values(FilterBy).map(item => (
                      <a
                        href="#"
                        className={classNames(
                          'dropdown-item',
                          styles.page__item,
                          {
                            'is-active': item === filterBy,
                          },
                        )}
                        key={item}
                        onClick={() => handleSetFilter(item)}
                      >
                        {' '}
                        {item}{' '}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles['page__filter-by--per-page']} ${styles['page__filter-by']}`}
            >
              <h3 className={styles['page__filter-name']}>Items per page</h3>
              <div
                className={classNames('dropdown', {
                  'is-active': activeDropdownPage,
                })}
                onClick={() => setActiveDropdownPage(!activeDropdownPage)}
                ref={dropdownRef}
              >
                <div className="dropdown-trigger">
                  <button
                    className={`button ${styles.page__button}`}
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span className={styles.page__item}>{itemsPerPage}</span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    {Object.values(PerPage).map(item => (
                      <a
                        href="#"
                        className={classNames(
                          'dropdown-item',
                          styles.page__item,
                          {
                            'is-active': item === itemsPerPage,
                          },
                        )}
                        key={item}
                        onClick={() => handleSetPerPage(item)}
                      >
                        {' '}
                        {item}{' '}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.page__items}>
            {sortedProduct(product, filterBy)
              .slice(startEl, endEl)
              .map(phone => (
                <ModelItem
                  model={phone}
                  modelsTitle="Hot prices"
                  key={phone.id}
                />
              ))}
          </div>
        </div>
        {itemsPerPage !== PerPage.All && (
          <Pagination
            products={product}
            perPage={itemsPerPage}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </div>
    </main>
  );
};