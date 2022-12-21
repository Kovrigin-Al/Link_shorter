//pop-up message

import { useCallback } from "react";

export const useMessage = () => {
  return useCallback((text) => {
    if(window.M && text) {
        //M.toast - method provided by Materialize lib. 
        window.M.toast({html: text});
    }
  }, []);
};
