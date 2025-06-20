declare module 'react-rating' {
  import * as React from 'react';

  export interface RatingProps {
    readonly?: boolean;
    initialRating?: number;
    onChange?: (value: number) => void;
    emptySymbol?: React.ReactNode;
    fullSymbol?: React.ReactNode;
    fractions?: number;
    stop?: number;
  }

  const Rating: React.FC<RatingProps>;

  export default Rating;
}