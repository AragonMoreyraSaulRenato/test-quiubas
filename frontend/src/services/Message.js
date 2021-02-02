const sendMessage = async ({ code, phone, message }) => {
   const URL = `http://localhost:4000/api/sms`;
   const method = "POST";
   const body = JSON.stringify({
      to_number: `${code}${phone}`.trim(),
      message: message
   })
   const headers = { "Content-Type": "application/json" }
   const resp = await fetch(URL, { method, body, headers });
   const response = await resp.json();

   return response;
}

export default sendMessage;