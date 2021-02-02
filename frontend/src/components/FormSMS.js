import { useEffect, useState, useRef } from 'react';
import './FormSMS.css';
import sendMessage from '../services/Message'

function App() {

   const [data, setData] = useState({
      code: "",
      phone: "",
      message: ""
   });
   const [errors, setErrors] = useState({
      code: false,
      phone: false,
      message: false
   })
   const [loading, setLoading] = useState(false);

   const [notify, setNotify] = useState({
      message: "", isError: false, show: false
   });

   const timer = useRef();


   const handleSubmit = (event) => {
      event.preventDefault();

      if (data.code === "") {
         setErrors({ errors, "code": true });
         return;
      }


      if (!data.phone.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
         | data.phone.trim().length === 0) {
         setErrors({ errors, "phone": true });
         return;
      }

      if (data.message === "") {
         setErrors({ errors, "message": true });
         return;
      }

      setLoading(true);
      sendMessage(data).then((response) => {
         setLoading(false);
         if (!response.error) {
            setData({ code: "", phone: "", message: "" });
            setNotify({
               message: response.msg, isError: false, show: true
            });
         }
         else {
            setNotify({ message: response.msg, isError: true, show: true });
         }

      });
   }

   const handleChange = ({ target }) => {
      const value = target.value;
      const name = target.name;
      setData({ ...data, [name]: value });
      setErrors({ ...errors, [name]: false });
   }

   useEffect(() => {
      if (notify.show) {
         timer.current = setTimeout(() => {
            setNotify((oldState) => {
               return { ...oldState, show: false }
            })
         }, 2000);
      }
   }, [notify])

   return (
      <div className="container main-container">
         <form className="container part-container" onSubmit={handleSubmit}>
            <h1>Envia un mensaje</h1>

            <div className="input-container">
               <label className="input-label">Pais</label>
               <select
                  className="type-base input-base"
                  name="code"
                  value={data.code}
                  onChange={handleChange}>
                  <option value="" disabled>Selecciona</option>
                  {countryCode.map((item, index) => <option
                     key={`option-country-${index}`}
                     value={item.code}>
                     {item.name}
                  </option>)}
               </select>
               {errors.code && <span className="input-helper error-alert">Selecciona un código</span>}
            </div>

            <div className="input-container">
               <label className="input-label">Telefono</label>
               <input
                  value={data.phone}
                  name="phone"
                  type="text"
                  className="type-base input-base"
                  placeholder="123 123 1234"
                  onChange={handleChange} />
               {errors.phone && <span
                  className="input-helper error-alert">
                  No puede tener caracteres especiales
          </span>
               }
            </div>

            <div className="input-container">
               <label className="input-label">Mensaje</label>
               <textarea
                  value={data.message}
                  onChange={handleChange}
                  name="message"
                  className="type-base input-base"
                  placeholder="Ingresa el mensaje"
                  rows="10" />
               {errors.message && <span className="input-helper error-alert">El mensaje no puede estar vacio</span>}
            </div>

            <button
               type="submit"
               className="type-base button-base"
               disabled={loading}>Enviar</button>
         </form>

         {
            notify.show &&
            <div className={`notify ${notify.isError ? 'notify-error' : 'notify-success'}`}>
               <p>{notify.message}</p>
            </div>
         }
      </div>
   );
}


const countryCode = [
   { name: "México", code: "+52" },
   { name: "United States", code: "+1" },
   { name: "España", code: "+34" },
   { name: "Colombia", code: "+57" }
];

export default App;
