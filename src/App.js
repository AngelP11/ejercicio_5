import React from 'react';
import './App.css';

function App() {
  const [rule1, setRule1] = React.useState(false);
	const [rule2, setRule2] = React.useState(false);
	const [rule3, setRule3] = React.useState(false);
  const [rule4, setRule4] = React.useState(false);
  const [rule5, setRule5] = React.useState(false);
  const [rule6, setRule6] = React.useState(false);

  const minCaracters = (passArr) => {
    if (passArr.length < 16) {
      setRule1(false)
      return false
    }

    setRule1(true)
  }

  const letters = (passArr) => {
    const caracters = ['!','@','#','$','%','ˆ','&','*','-','_','+','=','?']
    let mayus = false
    let minus = false

    for (let i = 0; i <= passArr.length - 1; i++) {
        if (isNaN(passArr[i])) {
            // Ignoramos cualquier otro simbolo que no sea una letra
            if (caracters.includes(passArr[i])) continue

            if (passArr[i] === passArr[i].toUpperCase()) {
                mayus = true
            } else {
                minus = true
            }
        }
    }

    if(!mayus || !minus) {
      setRule2(false)
      return false
    }

    setRule2(true)
  }

  const notRepeat = (passArr) => {
    for (let i = 1; i <= passArr.length - 1; i++) {
      if (passArr[i] === passArr[i-1]) {
        setRule3(false)
        return false
      }
    }

    setRule3(true)
  }

  const numbersCounter = (passArr) => {
      let count = 0

      for (let i = 0; i <= passArr.length - 1; i++) {
          if (parseInt(passArr[i])) {
              count++
          }
      }

      if (count < 4) {
        setRule4(false)
        return false
      }

      setRule4(true)
  }

  const specialCaracters = (passArr) => {
      const caracters = ['!','@','#','$','%','ˆ','&','*','-','_','+','=','?']
      let count = 0
      let caracters_counter = []
      let position_counter = []

      // Recorremos el array de caracteres y comprobamos que alguno este dentro del password
      for (let i = 0; i <= caracters.length - 1; i++) {
          for (let j = 0; j <= passArr.length - 1; j++) {
              if (caracters[i] === passArr[j]) {
                  count++
                  caracters_counter.push(caracters[i]) //Guardamos cada uno del caracteres que encontro
                  position_counter.push(j) // Guardamos la posicion donde encontro los caracteres
              }
          }
      }

      if (count >= 2) {
          // Convertimos el contador de caracteres en un Set o Conjunto, que no permite valores repetidos y lo comparamos con la longitud orginal del password
          if (new Set(caracters_counter).size === caracters_counter.length) {
              for (let k = 1; k <= position_counter.length - 1; k++) {
                  // Para comprobar que no estan juntos, restamos las posiciones que tienen dentro del password y si da 1 o -1, entonces estan juntos
                  const ecu = position_counter[k] - position_counter[k-1]

                  if (ecu === 1 || ecu === -1) {
                    setRule5(false)
                    return false
                  }
              }
          } else {
            setRule5(false)
            return false
          }
      } else {
        setRule5(false)
        return false
      }

      setRule5(true)
  }

  const notZeroOrSpace = (passArr) => {
      if (passArr.includes('0') || passArr.includes(' ')) {
        setRule6(false)
        return false
      }

      setRule6(true)
  }

  const handlePassword = (ev) => {
    const value = ev.target.value
    const pass = value.split("")

    minCaracters(pass)
    letters(pass)
    notRepeat(pass)
    numbersCounter(pass)
    specialCaracters(pass)
    notZeroOrSpace(pass)
  }

  return (
    <div className="container">
      <form className="app_form">
        <label htmlFor="password">Password</label>
        <input onChange={handlePassword} type="password" id="password" />
        <button>Enviar</button>
      </form>

      <div className="rules">
        <h3>Por su seguridad, la contraseña debe contener:</h3>
        <ul>
          <li className={ rule1 ? 'isValid' : 'notValid' }>Minimo 16 caracteres</li>
          <li className={ rule2 ? 'isValid' : 'notValid' }>Letras en minusculas y mayusculas</li>
          <li className={ rule3 ? 'isValid' : 'notValid' }>No repetir letras, ni numeros, de forma consecutiva</li>
          <li className={ rule4 ? 'isValid' : 'notValid' }>Minimo 4 numeros</li>
          <li className={ rule5 ? 'isValid' : 'notValid' }>Minimo 2 caracteres especiales, sin repetirse, y sin ir de forma consecutiva</li>
          <li className={ rule6 ? 'isValid' : 'notValid' }>No contener "0" o espacios en blanco</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
