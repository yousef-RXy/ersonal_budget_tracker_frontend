import React from 'react';
import Button from './Button';

export default function EditRemoveButtons({ onEdit, onRemove }) {
  return (
    <div className="flex gap-2">
      <Button label="Edit" onClick={onEdit} variant="primary" />
      <Button label="Remove" onClick={onRemove} variant="danger" />
    </div>
  );
}
