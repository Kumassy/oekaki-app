'use strict';


export function getBase64(file) {
   const reader = new FileReader();

   return new Promise((resolve, reject) => {
     if (file) {
       reader.readAsDataURL(file);
     } else {
       reject('FILE_IS_NOT_DEFINED');
     }
     
     reader.onload = function () {
       resolve(reader.result);
     };
     reader.onerror = reject;
   });
}
