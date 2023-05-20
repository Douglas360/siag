import React from 'react';

function CheckboxPermission({ permissao, hasPermissao, handleChange }) {
  return (
    <div>
      <input
        type="checkbox"
        id={`permissao-${permissao.id}`}
        checked={hasPermissao}
        onChange={() => handleChange(permissao.id)}
      />
      <label htmlFor={`permissao-${permissao.id}`}>{permissao.name}</label>
    </div>
  );
}

export default CheckboxPermission;
