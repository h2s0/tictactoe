import { useStore } from '@/store/store';
import { useRecoilValue } from 'recoil';
import { k } from '@/store/o';
import { m } from '@/store/t';
import { i } from '@/store/h';

function Title ({ p, c }) {
  const o = useRecoilValue(k);
  const z = useRecoilValue(m);
  const y = useRecoilValue(i);
  const items = useStore(state => state.items);

  const text1 = `${o.x}$d${items[5]}m be9${y.y}ns i${z.z} w${items[5]}nd3r`;
  const text2 = `Th${y.y}s to0${items[8]} sh@l1 p${items[1]}s$`;

  return(
    <>
      {p === 786456 && <h5>{text1}.</h5>}
      {c === 543845 && <h5>!{text2}</h5>}
    </>
  )
}

export default Title;