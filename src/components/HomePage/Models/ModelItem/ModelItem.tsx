import React from 'react';
import styles from './ModelItem.module.scss';
import '../../../../styles/variables.scss';
import { Products } from '../../../../types/Products';

interface Props {
  model: Products;
  modelsTitle: string;
  setFavourites: React.Dispatch<React.SetStateAction<number[]>>;
  favourites: number[];
  cart: number[];
  setCart: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ModelItem: React.FC<Props> = ({
  model,
  modelsTitle,
  setFavourites,
  favourites,
  cart,
  setCart,
}) => {
  const selected = favourites.find(number => number === model.id);
  const added = cart.find(number => number === model.id);
  const handleAddFavourite = () => {
    if (selected) {
      setFavourites(prevFavourites =>
        prevFavourites.filter(number => number !== model.id),
      );
    } else {
      setFavourites(prevFavourites => [...prevFavourites, model.id]);
    }
  };

  const handleAddCart = () => {
    if (added) {
      setCart(prevCart => prevCart.filter(number => number !== model.id));
    } else {
      setCart(prevCart => [...prevCart, model.id]);
    }
  };

  return (
    <div className={`models__item ${styles.item}`}>
      <div className={styles.item__wrapper}>
        <div className={styles.item__photo}>
          <img className={styles.item__image} src={model.image} alt="" />
        </div>
        <div className={styles.item__content}>
          <div className={styles.item__title}>
            <p>{model.name}</p>
          </div>
          <div className={styles.item__price}>
            {modelsTitle === 'Hot prices' ? (
              <>
                <h3
                  className={styles['item__price-num']}
                >{`$${model.price}`}</h3>
                <h3 className={styles['item__price--discount']}>
                  {`$${model.fullPrice}`}
                </h3>
              </>
            ) : (
              <h3
                className={styles['item__price-num']}
              >{`$${model.fullPrice}`}</h3>
            )}
          </div>
          <div className={styles.item__info}>
            <div className={styles.item__block}>
              <p className={styles.item__name}>Screen</p>
              <p className={styles.item__value}>{model.screen}</p>
            </div>
            <div className={styles.item__block}>
              <p className={styles.item__name}>Capacity</p>
              <p className={styles.item__value}>{model.capacity}</p>
            </div>
            <div className={styles.item__block}>
              <p className={styles.item__name}>Ram</p>
              <p className={styles.item__value}>{model.ram}</p>
            </div>
          </div>
          <div className={styles.item__buttons}>
            {!added ? (
              <button
                className={styles['item__add-to-cart']}
                onClick={handleAddCart}
              >
                Add to cart
              </button>
            ) : (
              <button
                className={`${styles['item__add-to-cart']} ${styles['item__add-to-cart--added']}`}
                onClick={handleAddCart}
              >
                Added
              </button>
            )}
            {!selected ? (
              <button
                className={`${styles['item__add-to-favorite']} ${styles['item__add-to-favorite--default']}`}
                onClick={handleAddFavourite}
              ></button>
            ) : (
              <button
                className={`${styles['item__add-to-favorite']} ${styles['item__add-to-favorite--selected']}`}
                onClick={handleAddFavourite}
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};