
import React from 'react';
import { useCallback, useState } from 'react';

export function useNode() {

 const [ node, setNode ] = useState<HTMLElement | null>(null);

 const attachNode = useCallback((node: HTMLElement | null) => {
   if (node !== null) {
     setNode(node);
   }
 }, []);

 return [ node, attachNode ];
}