'use strict';


export function getBase64(file) {
   const reader = new FileReader();
   reader.readAsDataURL(file);

   return new Promise((resolve, reject) => {
     reader.onload = function () {
       resolve(reader.result);
     };
     reader.onerror = reject;
   });
}
