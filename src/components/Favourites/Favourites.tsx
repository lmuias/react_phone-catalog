import React from 'react';
import styles from './Favourites.module.scss';
import { Products } from '../../types/Products';
import { ModelItem } from '../HomePage/Models/ModelItem';
import { Footer } from '../Footer';
import { useAppContext } from '../../AppContext';

interface Props {
  models: Products[];
}

export const Favourites: React.FC<Props> = ({ models }) => {
  const { favourites } = useAppContext();

  const visiblFavourites = models.filter(product =>
    favourites.includes(product),
  );

  return (
    <div className="page">
      <section className={styles.favourites}>
        {favourites.length === 0 ? (
          <div className={styles.favourites__empty}>
            <img
              className={styles['favourites__empty-image']}
              src="img/cart-is-empty.png"
              alt="favouritesEmpty"
            />
            <h2 className={styles.favourites__title}>
              Ooop`s, seems favourites is still empty!
            </h2>
          </div>
        ) : (
          <div className={styles.favourites__container}>
            <div className={styles.favourites__main}>
              <h2 className={styles.favourites__title}>Favourites</h2>
              <p className={styles.favourites__subtitle}>
                {`${favourites.length} items`}
              </p>
            </div>
            <div className={styles.favourites__items}>
              {visiblFavourites.map(model => (
                <ModelItem
                  model={model}
                  key={model.id}
                  modelsTitle="Hot prices"
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};