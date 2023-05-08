const asyncPostCall = async (path,headersBody) => {
 
    try {
        const response = await fetch(`https://dobby-ads-api.onrender.com${path}`, headersBody);
         const data = await response.json();
         return data;
       } catch(error) {
          console.log(error)
         } 
    }
    
    export default asyncPostCall;