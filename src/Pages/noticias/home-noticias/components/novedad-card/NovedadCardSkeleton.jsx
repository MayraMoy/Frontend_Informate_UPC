import React from 'react';

export const NovedadCardSkeleton = () => {
  return (
    <article className="novedad-card novedad-card--skeleton" aria-hidden="true">
      <div className="novedad-card-media">
        <div className="novedad-card-skeleton-media novedad-card-skeleton-shimmer" />
      </div>

      <div className="novedad-card-content">
        <div className="novedad-card-meta d-flex align-items-center mb-2">
          <div className="novedad-card-skeleton-meta novedad-card-skeleton-shimmer" />
        </div>

        <div className="novedad-card-skeleton-title novedad-card-skeleton-shimmer" />
        <div className="novedad-card-skeleton-title--short novedad-card-skeleton-shimmer" />
      </div>
    </article>
  );
};

export default NovedadCardSkeleton;

