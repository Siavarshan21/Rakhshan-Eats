import { Html } from '@react-three/drei';

interface ProductLabelProps {
  name: string;
  price: number;
  position: [number, number, number];
}

export function ProductLabel({ name, price, position }: ProductLabelProps) {
  return (
    <Html position={position} center distanceFactor={8} occlude={false}>
      <div
        className="pointer-events-none select-none whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-lg"
        style={{ minWidth: '100px', textAlign: 'center' }}
      >
        <p className="text-xs font-semibold text-gray-900">{name}</p>
        <p className="text-xs font-bold text-emerald-600">${price.toFixed(2)}</p>
      </div>
    </Html>
  );
}
