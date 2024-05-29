import { useStore } from '@/store/store';

function Title ({ p, c }) {
  const items = useStore(state => state.items);

  const z = String.fromCharCode(items[6] + items[0]);
  const y = String.fromCharCode(105);
  const x =String.fromCharCode(87);

  const text1 = `${x}i$d${items[5]}m beg${y}ns i${z} w${items[5]}nder`;
  const text2 = `Th2s to0${items[8]} sh@l1 p${items[1]}s$`;

  return(
    <>
      {p === 9999 && <h5>{text1}.</h5>}
      {c === 9999 && <h5>!{text2}</h5>}
    </>
  )
}

export default Title;