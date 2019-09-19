import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  const template = (
    <div
      className={props.className}
      style={{
        background: props.bg,
        fontSize: props.size,
        color: props.color,
        padding: '6px 10px',
        display: 'inline-block',
        fontFamily: props.font ? props.font : 'Viga',
        borderRadius: '4px',
        marginBottom: props.mb,
        marginTop: props.mt,
        ...props.add
      }}
    >
      {props.text}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(entry => {
    data.push({
      id: entry.key,
      ...entry.val()
    });
  });
  return data;
};

// export const reversingArray = (actualArray) => {
//   let reversedArray =[];

//   for(let i=actualArray.lenght-1; i>=0; i--){
//     reversedArray.push(actualArray[i])
//   }
//   return reversedArray
// }

export const reverseArray = actualArray => {
  return actualArray.sort((a, b) =>
    a.date < b.date ? 1 : b.date < a.date ? -1 : 0
  );
};

export const validate = element => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid && 'Not a vaid email'}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid && 'This field is required'}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.number) {
    const valid = element.value >= 0;
    const message = 'Number cannot be negative';
    error = !valid ? [valid, message] : error;
  }
  return error;
};
