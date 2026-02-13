import type { GroceryProduct } from '../../../types/grocery';
import { Shelf } from './Shelf';
import { ProductMesh } from './ProductMesh';
import { CategorySignage } from './CategorySignage';

const SHELF_WIDTH = 2;
const SHELF_HEIGHT = 2.5;
const SHELF_DEPTH = 0.6;
const TIER_COUNT = 4;
const PRODUCTS_PER_TIER = 5;
const PRODUCT_SPACING = 0.38;

interface ShelfGroupProps {
  categoryName: string;
  categoryColor: string;
  products: GroceryProduct[];
  position: [number, number, number];
}

export function ShelfGroup({
  categoryName,
  categoryColor,
  products,
  position,
}: ShelfGroupProps) {
  const shelfSpacing = SHELF_HEIGHT / TIER_COUNT;

  return (
    <group position={position}>
      {/* Category sign */}
      <CategorySignage
        text={categoryName}
        position={[0, SHELF_HEIGHT + 0.4, 0]}
        color={categoryColor}
      />

      {/* The shelf structure */}
      <Shelf
        width={SHELF_WIDTH}
        height={SHELF_HEIGHT}
        depth={SHELF_DEPTH}
        tierCount={TIER_COUNT}
      />

      {/* Products on shelves */}
      {products.slice(0, TIER_COUNT * PRODUCTS_PER_TIER).map((product, idx) => {
        const tier = Math.floor(idx / PRODUCTS_PER_TIER);
        const posOnTier = idx % PRODUCTS_PER_TIER;
        const xOffset = (posOnTier - (PRODUCTS_PER_TIER - 1) / 2) * PRODUCT_SPACING;
        const yOffset = tier * shelfSpacing + shelfSpacing * 0.5;

        return (
          <ProductMesh
            key={product.id}
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            position={[xOffset, yOffset, 0]}
            color={categoryColor}
          />
        );
      })}
    </group>
  );
}
