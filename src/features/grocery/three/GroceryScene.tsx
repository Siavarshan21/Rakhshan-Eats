import { useMemo } from 'react';
import { GroceryStoreScene } from '../../../three/scenes/GroceryStoreScene';
import { Controls } from '../../../three/canvas/Controls';
import { ShelfGroup } from './ShelfGroup';
import { InteractionRaycaster } from './InteractionRaycaster';
import { useProducts, useCategories } from '../hooks/useGroceryData';

const AISLE_SPACING_X = 5;
const AISLE_SPACING_Z = 4;
const SHELVES_PER_ROW = 4;

export function GroceryScene() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();

  const shelfGroups = useMemo(() => {
    if (!products || !categories) return [];

    return categories.map((category, index) => {
      const categoryProducts = products.filter(
        (p) => p.category.slug === category.slug,
      );

      const row = Math.floor(index / SHELVES_PER_ROW);
      const col = index % SHELVES_PER_ROW;
      const x = (col - (SHELVES_PER_ROW - 1) / 2) * AISLE_SPACING_X;
      const z = -row * AISLE_SPACING_Z;

      return {
        category,
        products: categoryProducts,
        position: [x, 0, z] as [number, number, number],
      };
    });
  }, [products, categories]);

  return (
    <GroceryStoreScene>
      <Controls />
      <InteractionRaycaster>
        {shelfGroups.map(({ category, products: catProducts, position }) => (
          <ShelfGroup
            key={category.id}
            categoryName={category.name}
            categoryColor={category.color}
            products={catProducts}
            position={position}
          />
        ))}
      </InteractionRaycaster>
    </GroceryStoreScene>
  );
}
